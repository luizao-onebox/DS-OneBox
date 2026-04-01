"""
MCP stdio client — newline-delimited JSON protocol.
Each message is a single JSON object terminated by \n.

If mcp_daemon.py is running on localhost:7888, MCPClient automatically
delegates all call_tool() calls to the daemon via HTTP — no process
kill, no plugin reconnect needed.
"""
import json
import os
import queue
import subprocess
import sys
import threading
import time
import urllib.request
import urllib.error

_win = sys.platform == "win32"

DAEMON_URL = "http://127.0.0.1:7888"

# Use node directly to avoid npx signal propagation issues on Windows
_CANDIDATES = [
    r"C:\Users\LuizBaptistella\AppData\Local\npm-cache\_npx\f022f36756ccd7d4\node_modules\figma-console-mcp\dist\local.js",
    r"C:\Users\LuizBaptistella\AppData\Local\npm-cache\_npx\b547afed9fcf6dcb\node_modules\figma-console-mcp\dist\local.js",
]
_MCP_SCRIPT = next((p for p in _CANDIDATES if os.path.exists(p)), None)
MCP_CMD = ["node", _MCP_SCRIPT] if (_win and _MCP_SCRIPT) else (
    ["npx.cmd" if _win else "npx", "--yes", "figma-console-mcp"]
)


def _daemon_alive() -> bool:
    """Return True if mcp_daemon.py is reachable."""
    try:
        with urllib.request.urlopen(DAEMON_URL + "/status", timeout=2) as r:
            data = json.loads(r.read())
            return data.get("alive", False)
    except Exception:
        return False


def _daemon_execute(code: str, timeout_ms: int = 30000) -> dict:
    """Send JS code to the daemon and return the result."""
    payload = json.dumps({"code": code, "timeout": timeout_ms}).encode()
    req = urllib.request.Request(
        DAEMON_URL + "/execute",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=timeout_ms / 1000 + 20) as r:
        resp = json.loads(r.read())
        return resp.get("result", resp)


class MCPClient:
    def __init__(self):
        self.proc: subprocess.Popen | None = None
        self._id = 0
        self._pending: dict[int, queue.Queue] = {}
        self._lock = threading.Lock()
        self._reader: threading.Thread | None = None
        self._port: int = 9223  # cached after start()
        self._using_daemon: bool = False

    # ── lifecycle ────────────────────────────────────────────────────────────

    def _find_port(self) -> int | None:
        """Find the WebSocket port of this MCP server process."""
        import glob, json as _json, tempfile
        if not self.proc:
            return None
        pid = self.proc.pid
        tmp = tempfile.gettempdir()
        files = sorted(
            glob.glob(os.path.join(tmp, "figma-console-mcp-*.json")),
            key=os.path.getmtime,
            reverse=True,
        )
        for fpath in files:
            try:
                data = _json.loads(open(fpath, encoding="utf-8").read())
                if data.get("pid") == pid:
                    return data.get("port")
            except Exception:
                pass
        for fpath in files:
            try:
                data = _json.loads(open(fpath, encoding="utf-8").read())
                p = data.get("pid")
                port = data.get("port")
                if p and port:
                    try:
                        os.kill(p, 0)
                        return port
                    except OSError:
                        pass
            except Exception:
                pass
        return None

    @property
    def port(self) -> int:
        return self._port

    @staticmethod
    def kill_orphans():
        """Kill all previously running figma-console-mcp processes."""
        import glob as _glob, json as _json, tempfile, subprocess as _sp
        tmp = tempfile.gettempdir()
        killed = []
        for fpath in _glob.glob(os.path.join(tmp, "figma-console-mcp-*.json")):
            try:
                data = _json.loads(open(fpath, encoding="utf-8").read())
                pid = data.get("pid")
                port = data.get("port", "?")
                if pid:
                    if _win:
                        _sp.run(["taskkill", "/F", "/PID", str(pid)],
                                capture_output=True)
                    else:
                        try: os.kill(pid, 15)
                        except OSError: pass
                    killed.append(f"pid={pid} port={port}")
                try: os.remove(fpath)
                except: pass
            except Exception:
                pass
        if killed:
            print(f"  Killed: {', '.join(killed)}", flush=True)

    def start(self):
        # If daemon is running, use it — skip kill_orphans and subprocess entirely
        if _daemon_alive():
            self._using_daemon = True
            try:
                with urllib.request.urlopen(DAEMON_URL + "/status", timeout=3) as r:
                    data = json.loads(r.read())
                    self._port = data.get("mcp_port", 9223)
            except Exception:
                pass
            print(f"MCP daemon detected on {DAEMON_URL} — skipping local start.", flush=True)
            print(f"Plugin stays connected (port {self._port}). No reconnect needed.", flush=True)
            return

        # No daemon — start a local MCP process as before
        self._using_daemon = False
        env = os.environ.copy()
        print("Cleaning up previous MCP instances...", flush=True)
        self.kill_orphans()
        time.sleep(1)
        print("Starting figma-console-mcp...", flush=True)
        flags = subprocess.CREATE_NEW_PROCESS_GROUP if _win else 0
        self.proc = subprocess.Popen(
            MCP_CMD,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
            env=env,
            creationflags=flags,
        )
        self._reader = threading.Thread(target=self._read_loop, daemon=True)
        self._reader.start()
        time.sleep(3)
        self._initialize()
        self._port = self._find_port() or 9223
        print(f"MCP ready on port {self._port}.", flush=True)

    def stop(self):
        if self._using_daemon:
            return  # daemon manages its own lifecycle
        if self.proc:
            self.proc.terminate()
            self.proc = None

    # ── I/O ──────────────────────────────────────────────────────────────────

    def _read_loop(self):
        """Read newline-terminated JSON messages from stdout."""
        assert self.proc and self.proc.stdout
        buf = b""
        while True:
            chunk = self.proc.stdout.read(1)
            if not chunk:
                break
            buf += chunk
            if chunk == b"\n":
                line = buf.strip()
                buf = b""
                if not line:
                    continue
                try:
                    msg = json.loads(line.decode("utf-8"))
                except (json.JSONDecodeError, UnicodeDecodeError):
                    continue
                msg_id = msg.get("id")
                if msg_id is not None:
                    with self._lock:
                        q = self._pending.get(msg_id)
                    if q:
                        q.put(msg)

    def _is_alive(self) -> bool:
        if self._using_daemon:
            return _daemon_alive()
        return bool(self.proc and self.proc.poll() is None)

    def _write(self, msg: dict):
        if not self._is_alive():
            raise RuntimeError(
                "MCP process died. Restart the agent and reconnect the Figma plugin."
            )
        assert self.proc and self.proc.stdin
        line = (json.dumps(msg) + "\n").encode("utf-8")
        try:
            self.proc.stdin.write(line)
            self.proc.stdin.flush()
        except OSError as e:
            raise RuntimeError(
                f"MCP write failed (process likely died): {e}\n"
                "Restart the agent and reconnect the Figma plugin."
            ) from e

    # ── RPC ──────────────────────────────────────────────────────────────────

    def _next_id(self) -> int:
        with self._lock:
            self._id += 1
            return self._id

    def _rpc(self, method: str, params: dict | None = None, timeout: float = 60.0) -> dict:
        msg_id = self._next_id()
        q: queue.Queue = queue.Queue()
        with self._lock:
            self._pending[msg_id] = q

        self._write({"jsonrpc": "2.0", "id": msg_id, "method": method,
                     **({"params": params} if params else {})})

        deadline = time.monotonic() + timeout
        while True:
            remaining = deadline - time.monotonic()
            if remaining <= 0:
                raise TimeoutError(f"MCP timeout for '{method}' (id={msg_id}). "
                                   "Is the Figma Desktop Bridge plugin open?")
            try:
                resp = q.get(timeout=min(remaining, 2.0))
                with self._lock:
                    self._pending.pop(msg_id, None)
                if "error" in resp:
                    raise RuntimeError(f"MCP error on '{method}': {resp['error']}")
                return resp.get("result", {})
            except queue.Empty:
                continue

    def _notify(self, method: str):
        self._write({"jsonrpc": "2.0", "method": method})

    def _initialize(self):
        self._rpc("initialize", {
            "protocolVersion": "2024-11-05",
            "capabilities": {},
            "clientInfo": {"name": "figma-agent", "version": "1.0"},
        }, timeout=15)
        self._notify("notifications/initialized")

    # ── public API ───────────────────────────────────────────────────────────

    def call_tool(self, tool_name: str, arguments: dict, timeout: float = 60.0) -> dict:
        # Route through daemon if available
        if self._using_daemon and tool_name == "figma_execute":
            code = arguments.get("code", "")
            timeout_ms = arguments.get("timeout", int(timeout * 1000))
            return _daemon_execute(code, timeout_ms)

        rpc_result = self._rpc(
            "tools/call",
            {"name": tool_name, "arguments": arguments},
            timeout=timeout,
        )
        content = rpc_result.get("content", [])
        if content and content[0].get("type") == "text":
            try:
                parsed = json.loads(content[0]["text"])
                return parsed
            except (json.JSONDecodeError, KeyError):
                return {"raw": content[0].get("text", "")}
        return rpc_result
