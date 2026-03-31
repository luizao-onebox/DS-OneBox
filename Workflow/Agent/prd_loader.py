"""
PRD Loader — reads PRD by screen number and assembles context for the agent.
"""
import re
from pathlib import Path

# 1440px wide + 40px gap between screens
SCREEN_WIDTH = 1440
GAP = 40


def x_for_screen(n: int) -> int:
    return (n - 1) * (SCREEN_WIDTH + GAP)


def load_context(resources_dir: Path, screen_number: int) -> dict | None:
    prd_dir = resources_dir / "PRDs"

    # Find 01_*.md, 02_*.md, etc.
    matches = sorted(prd_dir.glob(f"{screen_number:02d}_*.md"))
    if not matches:
        return None

    prd_file = matches[0]
    prd_content = prd_file.read_text(encoding="utf-8")

    match = re.search(r"# Spec — (.+)", prd_content)
    screen_name = match.group(1).strip() if match else f"Screen {screen_number}"

    return {
        "screen_name": screen_name,
        "prd_content": prd_content,
        "x_position": x_for_screen(screen_number),
        "screen_number": screen_number,
    }


def load_support_files(resources_dir: Path) -> dict:
    """Load HELPERS, DS-TOKENS, DS-COMPONENTS, REGISTRY into a dict."""
    files = ["HELPERS.md", "DS-TOKENS.md", "DS-COMPONENTS.md", "REGISTRY.md"]
    result = {}
    for fname in files:
        path = resources_dir / fname
        result[fname] = path.read_text(encoding="utf-8") if path.exists() else ""
    return result
