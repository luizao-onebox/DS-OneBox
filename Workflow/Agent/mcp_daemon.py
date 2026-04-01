#!/usr/bin/env python3
"""
MCP Daemon — keeps figma-console-mcp alive and exposes a local HTTP API.

Start once:  python mcp_daemon.py
Then scripts call http://localhost:7888/execute with {"code": "..."}

Endpoints:
  GET  /status         → {"alive": true, "port": 9224}
  POST /execute        → {"code": "...", "timeout": 30000}
  POST /execute_file   → {"path": "fix_sidebar_layout.js", "timeout": 30000}
"""
import json
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

sys.path.insert(0, str(Path(__file__).parent))
from mcp_client import MCPClient

DAEMON_PORT = 7888
_mcp = MCPClient()
_lock = threading.Lock()


def _ensure_alive():
    if not _mcp._is_alive():
        print("[daemon] MCP died — restarting...", flush=True)
        _mcp.start()


class Handler(BaseHTTPRequestHandler):
    def log_message(self, fmt, *args):
        print(f"[daemon] {fmt % args}", flush=True)

    def _send_json(self, code: int, data: dict):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/status":
            self._send_json(200, {
                "alive": _mcp._is_alive(),
                "mcp_port": _mcp.port,
                "daemon_port": DAEMON_PORT,
            })
        else:
            self._send_json(404, {"error": "not found"})

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        body = json.loads(self.rfile.read(length).decode("utf-8")) if length else {}

        if self.path in ("/execute", "/execute_file"):
            if self.path == "/execute_file":
                fpath = Path(body.get("path", ""))
                if not fpath.is_absolute():
                    fpath = Path(__file__).parent / fpath
                if not fpath.exists():
                    self._send_json(400, {"error": f"File not found: {fpath}"})
                    return
                code = fpath.read_text(encoding="utf-8")
            else:
                code = body.get("code", "")

            if not code:
                self._send_json(400, {"error": "missing 'code'"})
                return

            timeout = float(body.get("timeout", 30000)) / 1000 + 5
            with _lock:
                _ensure_alive()
                try:
                    result = _mcp.call_tool(
                        "figma_execute",
                        {"code": code, "timeout": int(body.get("timeout", 30000))},
                        timeout=timeout,
                    )
                    self._send_json(200, {"ok": True, "result": result})
                except Exception as e:
                    self._send_json(500, {"ok": False, "error": str(e)})
        else:
            self._send_json(404, {"error": "not found"})


def main():
    print("Starting MCP...", flush=True)
    _mcp.start()
    print(f"MCP ready on port {_mcp.port}.", flush=True)
    print(f"Open 'Figma Desktop Bridge' plugin in Figma — connect once, stays connected.", flush=True)

    server = HTTPServer(("127.0.0.1", DAEMON_PORT), Handler)
    print(f"\nDaemon listening on http://127.0.0.1:{DAEMON_PORT}", flush=True)
    print("Leave this running. Scripts will call it automatically.\n", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping daemon...", flush=True)
        _mcp.stop()


if __name__ == "__main__":
    main()
