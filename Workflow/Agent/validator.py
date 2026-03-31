"""
Visual validator using Moondream (local inference).

Generates structured visual descriptions for Claude to interpret screenshots.
Model downloads ~1.5GB on first use → cached at ~/.cache/moondream/
"""
from __future__ import annotations
import base64


# ── Questions per block type ──────────────────────────────────────────────────
# Each entry: (question, key) where key is used in the structured output.

BLOCK_QUESTIONS: dict[str, list[tuple[str, str]]] = {
    "shell": [
        ("Describe the topbar at the top of the screen. What elements are visible in it?", "topbar"),
        ("Describe the sidebar on the left. What navigation items are visible? Is any item highlighted as active?", "sidebar"),
        ("How much spacing is there between the sidebar and the main content area?", "spacing"),
    ],
    "header": [
        ("What is the page title or heading visible in the content area? Describe its size and visual weight.", "title"),
        ("Are there any subtitle, breadcrumb, or description text below the title? What does it say?", "subtitle"),
        ("Are there any action buttons or controls in the header row?", "actions"),
    ],
    "kpi": [
        ("Describe each metric card or KPI widget visible. Include the numbers, labels, and any trend indicators.", "cards"),
        ("How are the KPI cards arranged — in a row, grid, or other layout?", "layout"),
        ("Are there any color-coded indicators, arrows, or percentage changes visible on the KPI cards?", "indicators"),
    ],
    "toolbar": [
        ("Describe each filter, dropdown, or input field visible in the toolbar.", "filters"),
        ("Are there any action buttons (e.g. search, apply, export) in the toolbar?", "buttons"),
        ("How is the toolbar visually separated from the content below it?", "separation"),
    ],
    "table": [
        ("List the column headers visible in the table and describe what each column contains.", "columns"),
        ("Describe the first 2-3 rows of the table. What data is shown? Are there badges, avatars, or progress bars?", "rows"),
        ("Are there any visual urgency indicators in the table rows such as colored borders, badges, or highlighted rows?", "urgency"),
    ],
    "pagination": [
        ("Describe the pagination controls. Are there page numbers, Previous/Next buttons, or items-per-page selectors?", "controls"),
    ],
    "full": [
        ("Provide a complete description of this UI screen. Start with the overall layout structure, then describe each visible section from top to bottom.", "overview"),
        ("What is the primary purpose of this screen based on what you see?", "purpose"),
        ("Identify any visual issues: misaligned elements, missing content, placeholder text, broken layouts, or empty areas that should have content.", "issues"),
        ("Describe the color scheme and visual hierarchy. Which elements draw the most attention?", "visual_design"),
    ],
    "decision": [
        ("Describe the two-column layout. What is shown in the left column versus the right column?", "columns"),
        ("Are there action buttons at the bottom? Describe their colors, labels, and visual prominence.", "actions"),
        ("Describe any evidence or document visible in the image viewer area.", "evidence"),
    ],
}


class ScreenValidator:
    """Lazy-loads Moondream on first call."""

    def __init__(self):
        self._model = None

    def _load(self):
        if self._model is not None:
            return
        try:
            import moondream as md  # type: ignore
        except ImportError:
            raise RuntimeError("moondream not installed. Run: pip install moondream")
        print("  [Moondream] Loading model (first run downloads ~1.5GB)...", flush=True)
        self._model = md.vl(model="moondream-2b-int8.mf.gz")
        print("  [Moondream] Model ready.", flush=True)

    def describe(self, image_bytes: bytes, block_type: str = "full") -> str:
        """
        Ask Moondream targeted questions about the screenshot.
        Returns a structured description string for Claude.
        """
        self._load()
        import moondream as md  # type: ignore

        image = md.Image.from_bytes(image_bytes)
        questions = BLOCK_QUESTIONS.get(block_type, BLOCK_QUESTIONS["full"])

        # Always start with a general caption for orientation
        try:
            caption = self._model.caption(image)["caption"]
        except Exception:
            caption = "(caption unavailable)"

        lines = [
            f"=== Moondream Visual Analysis (block: {block_type}) ===",
            f"Caption: {caption}",
            "",
        ]

        for question, key in questions:
            try:
                answer = self._model.query(image, question)["answer"].strip()
            except Exception as e:
                answer = f"[error: {e}]"
            lines.append(f"[{key.upper()}]")
            lines.append(f"Q: {question}")
            lines.append(f"A: {answer}")
            lines.append("")

        # Issue detection — always run regardless of block type
        if block_type != "full":
            try:
                issues_q = "Identify any visual problems: placeholder text like 'Label' or 'Value', empty white boxes, broken layouts, elements that appear cut off, or anything that looks unfinished."
                issues_a = self._model.query(image, issues_q)["answer"].strip()
                lines.append("[ISSUES DETECTED]")
                lines.append(f"Q: {issues_q}")
                lines.append(f"A: {issues_a}")
                lines.append("")
            except Exception:
                pass

        lines.append("=== End of Moondream Analysis ===")
        return "\n".join(lines)

    def describe_base64(self, b64: str, block_type: str = "full") -> str:
        """Describe from base64-encoded JPEG."""
        image_bytes = base64.standard_b64decode(b64)
        return self.describe(image_bytes, block_type)
