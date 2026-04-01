#!/usr/bin/env python3
"""
Send a JS file or inline code to the running MCP daemon.

Usage:
  python mcp_exec.py fix_sidebar_layout.js
  python mcp_exec.py --code "(() => figma.currentPage.name)()"
"""
import sys
import json
import urllib.request
import urllib.error
from pathlib import Path

DAEMON = "http://127.0.0.1:7888"

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")


def call(endpoint: str, payload: dict) -> dict:
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        DAEMON + endpoint,
        data=data,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=40) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.URLError as e:
        print(f"Cannot reach daemon at {DAEMON}: {e}")
        print("Start it with:  python mcp_daemon.py")
        sys.exit(1)


def main():
    args = sys.argv[1:]
    if not args:
        print("Usage: python mcp_exec.py <file.js>  OR  python mcp_exec.py --code 'js'")
        sys.exit(1)

    if args[0] == "--code":
        code = args[1] if len(args) > 1 else ""
        result = call("/execute", {"code": code, "timeout": 30000})
    else:
        path = Path(args[0])
        if not path.is_absolute():
            path = Path(__file__).parent / path
        result = call("/execute_file", {"path": str(path), "timeout": 30000})

    print(json.dumps(result, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
