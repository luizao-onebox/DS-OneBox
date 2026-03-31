"""
GitHub Issues integration for the Figma agent.

Uses GITHUB_TOKEN from environment (or .env).
Repo: luizao-onebox/DS-OneBox
"""
from __future__ import annotations

import os
import requests

REPO  = "luizao-onebox/DS-OneBox"
API   = "https://api.github.com"


def _headers() -> dict:
    token = os.environ.get("GITHUB_TOKEN", "")
    if not token:
        return {}
    return {"Authorization": f"Bearer {token}", "Accept": "application/vnd.github+json"}


def _enabled() -> bool:
    return bool(os.environ.get("GITHUB_TOKEN"))


# ── Issues ────────────────────────────────────────────────────────────────────

def find_open_issue(label: str) -> dict | None:
    """Return first open issue with this label, or None."""
    if not _enabled(): return None
    r = requests.get(f"{API}/repos/{REPO}/issues",
                     params={"state": "open", "labels": label, "per_page": 10},
                     headers=_headers(), timeout=10)
    issues = r.json() if r.ok else []
    return issues[0] if issues else None


def create_issue(title: str, body: str, labels: list[str] | None = None) -> int | None:
    """Create an issue. Returns issue number or None."""
    if not _enabled(): return None
    r = requests.post(f"{API}/repos/{REPO}/issues",
                      json={"title": title, "body": body, "labels": labels or []},
                      headers=_headers(), timeout=10)
    if r.ok:
        num = r.json().get("number")
        print(f"  [GitHub] Issue #{num} created: {title[:60]}", flush=True)
        return num
    print(f"  [GitHub] Failed to create issue: {r.status_code}", flush=True)
    return None


def close_issue(number: int, comment: str = "") -> bool:
    """Close an issue with an optional comment."""
    if not _enabled(): return False
    if comment:
        requests.post(f"{API}/repos/{REPO}/issues/{number}/comments",
                      json={"body": comment}, headers=_headers(), timeout=10)
    r = requests.patch(f"{API}/repos/{REPO}/issues/{number}",
                       json={"state": "closed"}, headers=_headers(), timeout=10)
    if r.ok:
        print(f"  [GitHub] Issue #{number} closed.", flush=True)
    return r.ok


def comment_issue(number: int, body: str) -> bool:
    if not _enabled(): return False
    r = requests.post(f"{API}/repos/{REPO}/issues/{number}/comments",
                      json={"body": body}, headers=_headers(), timeout=10)
    return r.ok


# ── Convenience wrappers used by agent ───────────────────────────────────────

def on_screen_built(screen_number: int, screen_name: str, frame_id: str):
    """Close rebuild-needed issue for this screen if it exists."""
    label = f"screen-{str(screen_number).padStart(2, '0') if False else str(screen_number).zfill(2)}"
    issue = find_open_issue(label)
    if issue:
        close_issue(issue["number"],
                    f"✅ Tela reconstruída pelo agente.\n\n"
                    f"**Screen:** {screen_name}\n"
                    f"**Frame ID:** `{frame_id}`")


def on_analysis_done(screen_name: str, frame_id: str, report: str, screen_number: int | None = None):
    """Open a fix-needed issue with the analysis report."""
    # Only create if there are actual problems (look for ❌ in report)
    if "❌" not in report and "CRÍTICO" not in report:
        return
    title = f"🔍 {screen_name} — problemas encontrados na análise"
    body = (
        f"Frame ID: `{frame_id}`\n\n"
        f"{report[:3000]}\n\n"
        f"---\n*Gerado pelo Figma Agent*"
    )
    labels = ["analysis", "fix-needed"]
    if screen_number:
        labels.append(f"screen-{str(screen_number).zfill(2)}")
    create_issue(title, body, labels)


def on_fix_done(screen_name: str, frame_id: str, screen_number: int | None = None):
    """Close fix-needed issue after fixes are applied."""
    label = "fix-needed"
    issue = find_open_issue(label)
    if issue and screen_name in issue.get("title", ""):
        close_issue(issue["number"],
                    f"✅ Correções aplicadas pelo agente.\n\nFrame ID: `{frame_id}`")
