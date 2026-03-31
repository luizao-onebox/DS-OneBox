"""
MCP stdio client — newline-delimited JSON protocol.
Each message is a single JSON object terminated by \n.
"""
import json
import os
import queue
import subprocess
import sys
import threading
import time

_win = sys.platform == "win32"

# Use node directly to avoid npx signal propagation issues on Windows
_MCP_SCRIPT = r"C:\Users\LuizBaptistella\AppData\Local\npm-cache\_npx\b547afed9fcf6dcb\node_modules\figma-console-mcp\dist\local.js"
MCP_CMD = ["node", _MCP_SCRIPT] if (_win and os.path.exists(_MCP_SCRIPT)) else (
    ["npx.cmd" if _win else "npx", "--yes", "figma-console-mcp"]
)


class MCPClient:
    def __init__(self):
        self.proc: subprocess.Popen | None = None
        self._id = 0
        self._pending: dict[int, queue.Queue] = {}
        self._lock = threading.Lock()
        self._reader: threading.Thread | None = None
        self._port: int = 9223  # cached after start()

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
        # Try by PID first
        for fpath in files:
            try:
                data = _json.loads(open(fpath, encoding="utf-8").read())
                if data.get("pid") == pid:
                    return data.get("port")
            except Exception:
                pass
        # Fallback: most recent file whose process is alive
        for fpath in files:
            try:
                data = _json.loads(open(fpath, encoding="utf-8").read())
                p = data.get("pid")
                port = data.get("port")
                if p and port:
                    try:
                        os.kill(p, 0)  # 0 = just check if alive
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
        env = os.environ.copy()
        print("Cleaning up previous MCP instances...", flush=True)
        self.kill_orphans()
        time.sleep(1)
        print("Starting figma-console-mcp...", flush=True)
        # CREATE_NEW_PROCESS_GROUP isolates child signals on Windows
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

        # Give the server time to start and write its port file
        time.sleep(3)
        self._initialize()
        self._port = self._find_port() or 9223
        print(f"MCP ready on port {self._port}.", flush=True)

    def stop(self):
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
                break  # EOF / process died
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

    def _write(self, msg: dict):
        assert self.proc and self.proc.stdin
        line = (json.dumps(msg) + "\n").encode("utf-8")
        self.proc.stdin.write(line)
        self.proc.stdin.flush()

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
        rpc_result = self._rpc(
            "tools/call",
            {"name": tool_name, "arguments": arguments},
            timeout=timeout,
        )
        content = rpc_result.get("content", [])
        if content and content[0].get("type") == "text":
            try:
                parsed = json.loads(content[0]["text"])
                # figma_execute wraps result: {"success": true, "result": {...}}
                # Return as-is so callers can inspect both success and result
                return parsed
            except (json.JSONDecodeError, KeyError):
                return {"raw": content[0].get("text", "")}
        return rpc_result
