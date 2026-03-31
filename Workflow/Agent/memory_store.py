"""
Persistent memory store — survives between agent runs.
Saved to agent_memory.json next to this file.

Tracks:
  - Built screens: frame IDs, names, timestamps
  - Created components: node IDs, descriptions, variants
  - Error/fix patterns: recurring issues and solutions
  - Build notes: observations worth remembering
"""
from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

MEMORY_DIR = Path(__file__).parent.parent.parent / "Workflow" / "Agent-Memory"
MEMORY_DIR.mkdir(parents=True, exist_ok=True)
MEMORY_FILE = MEMORY_DIR / "agent_memory.json"


class MemoryStore:
    def __init__(self):
        self._data = self._load()

    # ── persistence ───────────────────────────────────────────────────────────

    def _load(self) -> dict:
        if MEMORY_FILE.exists():
            try:
                return json.loads(MEMORY_FILE.read_text(encoding="utf-8"))
            except Exception:
                pass
        return {"screens": {}, "components": {}, "error_fixes": [], "notes": []}

    def _save(self):
        # Ensure all keys exist (backwards compat with old memory files)
        self._data.setdefault("components", {})
        MEMORY_FILE.write_text(
            json.dumps(self._data, indent=2, ensure_ascii=False),
            encoding="utf-8",
        )

    # ── screens ───────────────────────────────────────────────────────────────

    def save_screen(self, screen_number: int, screen_name: str, frame_id: str):
        self._data["screens"][str(screen_number)] = {
            "name": screen_name,
            "frame_id": frame_id,
            "built_at": datetime.now().isoformat(),
        }
        self._save()
        print(f"  [Memory] Saved screen {screen_number}: {frame_id}", flush=True)

    def get_screen(self, screen_number: int) -> dict | None:
        return self._data["screens"].get(str(screen_number))

    # ── components ────────────────────────────────────────────────────────────

    def save_component(self, name: str, node_id: str, description: str = "", variants: list[str] | None = None):
        """Save a created component so it can be reused in future PRD builds."""
        self._data.setdefault("components", {})[name] = {
            "node_id": node_id,
            "description": description,
            "variants": variants or [],
            "created_at": datetime.now().isoformat(),
        }
        self._save()
        print(f"  [Memory] Saved component '{name}': {node_id}", flush=True)

    def get_component(self, name: str) -> dict | None:
        return self._data.get("components", {}).get(name)

    def components_summary(self) -> str:
        components = self._data.get("components", {})
        if not components:
            return ""
        lines = ["## Previously created components (reuse these node IDs)"]
        for name, info in sorted(components.items()):
            variants_str = f" — variants: {', '.join(info['variants'])}" if info.get("variants") else ""
            lines.append(
                f"- {name}: node_id={info['node_id']}{variants_str}"
                + (f" ({info.get('description', '')})" if info.get("description") else "")
            )
        return "\n".join(lines)

    # ── error/fix patterns ────────────────────────────────────────────────────

    def add_error_fix(self, error: str, fix: str, context: str = ""):
        self._data["error_fixes"].append({
            "error": error[:600],
            "fix": fix[:600],
            "context": context[:200],
            "at": datetime.now().isoformat(),
        })
        self._data["error_fixes"] = self._data["error_fixes"][-60:]
        self._save()

    # ── notes ─────────────────────────────────────────────────────────────────

    def add_note(self, note: str):
        self._data["notes"].append({"note": note[:500], "at": datetime.now().isoformat()})
        self._data["notes"] = self._data["notes"][-30:]
        self._save()

    # ── summary strings for system prompt ────────────────────────────────────

    def built_screens_summary(self) -> str:
        if not self._data["screens"]:
            return ""
        lines = ["## Previously built screens (use these IDs if referenced)"]
        for num, info in sorted(self._data["screens"].items(), key=lambda x: int(x[0])):
            lines.append(
                f"- Screen {num} — {info['name']}: frame_id={info['frame_id']} "
                f"(built {info['built_at'][:10]})"
            )
        return "\n".join(lines)

    def error_fixes_summary(self, n: int = 15) -> str:
        fixes = self._data["error_fixes"][-n:]
        if not fixes:
            return ""
        lines = ["## Known error patterns and fixes (apply proactively)"]
        for ef in fixes:
            lines.append(f"- ERROR: {ef['error']}")
            lines.append(f"  FIX:   {ef['fix']}")
        return "\n".join(lines)

    def notes_summary(self) -> str:
        notes = self._data["notes"]
        if not notes:
            return ""
        lines = ["## Build notes"]
        for n in notes:
            lines.append(f"- {n['note']}")
        return "\n".join(lines)

    def full_context(self) -> str:
        """All memory formatted for injection into system prompt."""
        parts = [
            self.built_screens_summary(),
            self.components_summary(),
            self.error_fixes_summary(),
            self.notes_summary(),
        ]
        content = "\n\n".join(p for p in parts if p)
        return content if content else "(no persistent memory yet)"
