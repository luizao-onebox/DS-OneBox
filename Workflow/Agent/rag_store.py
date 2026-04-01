"""
RAG store — BM25 retrieval over design system docs and PRDs.

Indexes:
  - HELPERS.md, DS-TOKENS.md, DS-COMPONENTS.md, REGISTRY.md
  - All PRD files

Usage:
  store = RAGStore()
  store.index(support_files_dict, prd_dir)
  results = store.retrieve("button badge component", k=6)
"""
from __future__ import annotations

import re
from pathlib import Path


def _tokenize(text: str) -> list[str]:
    return re.findall(r"[a-z0-9_\-]+", text.lower())


def _chunk_markdown(text: str, source: str, max_chars: int = 600) -> list[dict]:
    """
    Split markdown into chunks bounded by headings and max_chars.
    Each chunk: {text, source, heading}
    """
    chunks: list[dict] = []
    current_heading = ""
    current_lines: list[str] = []

    def flush():
        body = "\n".join(current_lines).strip()
        if body:
            chunks.append({
                "text": f"[{source}] {current_heading}\n{body}",
                "source": source,
                "heading": current_heading,
            })

    for line in text.split("\n"):
        if re.match(r"^#{1,3} ", line):
            # New heading — flush current chunk
            flush()
            current_heading = line.strip()
            current_lines = []
        else:
            current_lines.append(line)
            # Flush on size limit to avoid giant chunks
            if sum(len(l) for l in current_lines) > max_chars:
                flush()
                current_lines = []

    flush()
    return chunks


class RAGStore:
    """BM25-based retrieval over chunked markdown documents."""

    def __init__(self):
        self._chunks: list[dict] = []
        self._bm25 = None

    def index(self, support_files: dict[str, str], prd_dir: Path | None = None):
        """
        Build the BM25 index.

        Args:
            support_files: {filename: content} — HELPERS, DS-TOKENS, etc.
            prd_dir: optional directory with PRD .md files
                     Also indexes <prd_dir.parent>/Components/*.md if it exists.
        """
        self._chunks = []

        for source, content in support_files.items():
            if content:
                self._chunks.extend(_chunk_markdown(content, source))

        md_dirs = []
        if prd_dir and prd_dir.exists():
            md_dirs.append(("PRDs", prd_dir))
        if prd_dir:
            components_dir = prd_dir.parent / "Components"
            if components_dir.exists():
                md_dirs.append(("Components", components_dir))

        for label, md_dir in md_dirs:
            for md_file in sorted(md_dir.glob("*.md")):
                try:
                    content = md_file.read_text(encoding="utf-8")
                    self._chunks.extend(_chunk_markdown(content, md_file.name))
                except Exception:
                    pass

        if not self._chunks:
            return

        try:
            from rank_bm25 import BM25Okapi  # type: ignore
        except ImportError:
            raise RuntimeError("rank-bm25 not installed. Run: pip install rank-bm25")

        tokenized = [_tokenize(c["text"]) for c in self._chunks]
        self._bm25 = BM25Okapi(tokenized)
        extra = " + ".join(f"{label}" for label, _ in md_dirs)
        print(f"  [RAG] Indexed {len(self._chunks)} chunks from {len(support_files)} files"
              + (f" + {extra}" if extra else ""), flush=True)

    def retrieve(self, query: str, k: int = 6) -> str:
        """
        Return the top-k most relevant chunks as a formatted string.
        Returns empty string if nothing indexed or no matches.
        """
        if not self._bm25 or not self._chunks:
            return ""

        tokens = _tokenize(query)
        if not tokens:
            return ""

        scores = self._bm25.get_scores(tokens)
        top_indices = sorted(
            range(len(scores)), key=lambda i: scores[i], reverse=True
        )[:k]

        results = []
        for i in top_indices:
            if scores[i] > 0.01:
                results.append(self._chunks[i]["text"])

        return "\n\n---\n\n".join(results) if results else ""

    def retrieve_for_prd(self, prd_content: str, k: int = 8) -> str:
        """
        Extract key terms from a PRD and retrieve the most relevant doc chunks.
        Useful for bootstrapping context before the agent starts building.
        """
        # Pull component names, UI terms, and section types from PRD
        terms = re.findall(
            r"\b(?:Button|Badge|Avatar|Input|Select|Chip|Tag|Icon|Table|Toolbar|"
            r"Sidebar|Header|Pagination|KPI|Card|Progress|Drawer|Modal|Toast|"
            r"Alert|Dropdown|Checkbox|Radio|Toggle|Tabs|Breadcrumb|"
            r"frame|layout|grid|row|column|spacing|padding|margin|color|"
            r"font|text|typography|border|radius|shadow|fill|stroke)\b",
            prd_content,
            re.IGNORECASE,
        )
        if not terms:
            return ""
        query = " ".join(set(t.lower() for t in terms))
        return self.retrieve(query, k=k)
