#!/usr/bin/env python3
"""
Figma Agent — single conversational entry point.

Usage:
  python agent.py              # chat mode (default)
  python agent.py --screen 5   # direct screen build (no chat, for automation)
  python agent.py --fix 1      # direct fix run (no chat, for automation)

The Figma Desktop Bridge plugin must be open in Figma Desktop before running.
"""
import argparse
import json
import os
import re as _re
import sys
import time
from datetime import datetime
from pathlib import Path

if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

from dotenv import load_dotenv
load_dotenv()

import anthropic

def _get_anthropic_client():
    """Instancia o cliente Anthropic usando a API key diretamente."""
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        sys.exit("ANTHROPIC_API_KEY não configurada. Verifique o arquivo .env")
    return anthropic.Anthropic(api_key=api_key)

from mcp_client import MCPClient
from memory_store import MemoryStore
from prd_loader import load_context, load_support_files
from rag_store import RAGStore
from validator import ScreenValidator
import github_client as gh

# ── Singletons ────────────────────────────────────────────────────────────────

_validator = ScreenValidator()
_memory    = MemoryStore()
_rag       = RAGStore()

# ── Config ────────────────────────────────────────────────────────────────────

RESOURCES_DIR    = Path(__file__).parent.parent / "Recursos"
AGENT_MEMORY_DIR = Path(__file__).parent.parent / "Agent-Memory"
SESSIONS_DIR     = AGENT_MEMORY_DIR / "chat_sessions"
SECTION_ID       = "3537:18907"
MODEL            = "claude-sonnet-4-6"
MAX_TOKENS       = 8096
MAX_ITERATIONS   = 40
MAX_HISTORY      = 30

for _d in (AGENT_MEMORY_DIR, SESSIONS_DIR):
    _d.mkdir(parents=True, exist_ok=True)

# ── Helpers ───────────────────────────────────────────────────────────────────

_HELPER_JS = """\
await figma.loadFontAsync({family:"Inter", style:"Regular"});
await figma.loadFontAsync({family:"Inter", style:"Medium"});
await figma.loadFontAsync({family:"Inter", style:"Semi Bold"});
await figma.loadFontAsync({family:"Inter", style:"Bold"});
const C={white:{r:1,g:1,b:1},gray50:{r:.980,g:.980,b:.984},gray100:{r:.969,g:.969,b:.973},
  gray200:{r:.886,g:.898,b:.918},gray300:{r:.820,g:.835,b:.855},gray400:{r:.576,g:.604,b:.647},
  gray500:{r:.365,g:.392,b:.435},gray600:{r:.298,g:.329,b:.373},gray700:{r:.216,g:.231,b:.255},
  blue100:{r:.937,g:.953,b:1},blue500:{r:.239,g:.522,b:.957},blue600:{r:.231,g:.447,b:.871},
  red100:{r:1,g:.937,b:.937},red600:{r:.859,g:.196,b:.196},red700:{r:.718,g:.110,b:.110},
  green100:{r:.937,g:.992,b:.949},green600:{r:.133,g:.549,b:.247},
  yellow50:{r:1,g:.980,b:.894},yellow700:{r:.502,g:.392,b:.016},orange:{r:1,g:.502,b:0}};
function T(p,txt,sz,w,col,o={}){const t=figma.createText();t.fontName={family:"Inter",style:w};
  t.fontSize=sz;t.characters=String(txt);t.fills=[{type:"SOLID",color:col}];
  if(o.align)t.textAlignHorizontal=o.align;p.appendChild(t);return t;}
function HF(p,n,gap=0,pt=0,pb=0,pl=0,pr=0,fill=null,r=0){const f=figma.createFrame();
  f.name=n;f.layoutMode="HORIZONTAL";f.itemSpacing=gap;
  f.paddingTop=pt;f.paddingBottom=pb;f.paddingLeft=pl;f.paddingRight=pr;
  f.fills=fill?[{type:"SOLID",color:fill}]:[];f.cornerRadius=r;
  f.primaryAxisSizingMode="AUTO";f.counterAxisSizingMode="AUTO";p.appendChild(f);return f;}
function VF(p,n,gap=0,pad=0,fill=null,r=0){const f=figma.createFrame();
  f.name=n;f.layoutMode="VERTICAL";f.itemSpacing=gap;
  f.paddingTop=pad;f.paddingBottom=pad;f.paddingLeft=pad;f.paddingRight=pad;
  f.fills=fill?[{type:"SOLID",color:fill}]:[];f.cornerRadius=r;
  f.primaryAxisSizingMode="AUTO";f.counterAxisSizingMode="AUTO";p.appendChild(f);return f;}"""


def _load_support():
    return load_support_files(RESOURCES_DIR)


def _build_rag(support):
    _rag.index(support, prd_dir=RESOURCES_DIR / "PRDs")


# ── Screenshot helper ─────────────────────────────────────────────────────────

def _screenshot_b64(node_id: str, mcp: MCPClient) -> str | None:
    """Get screenshot via Figma REST API — reliable, no plugin dependency."""
    import urllib.request, urllib.error, base64 as _b64
    file_key = os.environ.get("FIGMA_FILE_KEY", "q3mFYxgvpAK1KxeLVvRVKX")
    token = os.environ.get("FIGMA_ACCESS_TOKEN", "")
    if not token:
        return None

    # Normalize node id: "3134:3842" → "3134-3842" for URL
    url_id = node_id.replace(":", "-")
    api_url = f"https://api.figma.com/v1/images/{file_key}?ids={url_id}&format=jpg&scale=1&t={int(time.time())}"
    req = urllib.request.Request(api_url, headers={"X-Figma-Token": token})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read())
    except Exception as e:
        print(f"  Screenshot API error: {e}", flush=True)
        return None

    img_url = (data.get("images") or {}).get(node_id) or (data.get("images") or {}).get(url_id)
    if not img_url:
        print(f"  Screenshot: no image URL returned for {node_id}", flush=True)
        return None

    try:
        with urllib.request.urlopen(img_url, timeout=30) as img_resp:
            img_bytes = img_resp.read()
    except Exception as e:
        print(f"  Screenshot download error: {e}", flush=True)
        return None

    b64 = _b64.b64encode(img_bytes).decode("ascii")
    print(f"  Screenshot: {len(img_bytes)} bytes via REST API", flush=True)
    return b64


# ── Session persistence ───────────────────────────────────────────────────────

def _block_to_dict(b) -> dict | None:
    if isinstance(b, dict):
        t = b.get("type")
        if t == "image":
            return {"type": "text", "text": "[screenshot]"}
        if t == "tool_result":
            inner = [_block_to_dict(x) for x in (b.get("content") or [])]
            return {**b, "content": [x for x in inner if x]}
        return b
    t = getattr(b, "type", None)
    if t == "text":      return {"type": "text", "text": b.text}
    if t == "tool_use":  return {"type": "tool_use", "id": b.id, "name": b.name, "input": b.input}
    if t == "tool_result":
        inner = [_block_to_dict(x) for x in (getattr(b, "content", None) or [])]
        return {"type": "tool_result", "tool_use_id": b.tool_use_id,
                "content": [x for x in inner if x]}
    if t == "image":     return {"type": "text", "text": "[screenshot]"}
    return {"type": "text", "text": str(b)}


def _serializable(messages: list) -> list:
    result = []
    for msg in messages:
        content = msg["content"]
        if isinstance(content, list):
            filtered = [_block_to_dict(b) for b in content]
            result.append({"role": msg["role"], "content": [x for x in filtered if x]})
        else:
            result.append({"role": msg["role"], "content": str(content)})
    return result


def _save_session(name: str, messages: list):
    (SESSIONS_DIR / f"{name}.json").write_text(
        json.dumps({"session": name, "messages": _serializable(messages)},
                   indent=2, ensure_ascii=False), encoding="utf-8")


def _sanitize_messages(messages: list) -> list:
    """
    Scan all messages and fix orphaned tool_use blocks.
    An assistant message with tool_use blocks must be immediately followed by
    a user message containing tool_result blocks for each tool_use id.
    If not, drop the assistant message (and any following non-tool-result user message).
    """
    if not messages:
        return messages

    result = []
    i = 0
    dropped = 0
    while i < len(messages):
        msg = messages[i]
        if msg.get("role") == "assistant":
            content = msg.get("content", [])
            tool_use_ids = [
                b["id"] for b in content
                if isinstance(b, dict) and b.get("type") == "tool_use"
            ]
            if tool_use_ids:
                # Check if next message has tool_results for all ids
                next_msg = messages[i + 1] if i + 1 < len(messages) else None
                if next_msg and next_msg.get("role") == "user":
                    next_content = next_msg.get("content", [])
                    result_ids = {
                        b.get("tool_use_id") for b in next_content
                        if isinstance(b, dict) and b.get("type") == "tool_result"
                    }
                    if tool_use_ids and result_ids.issuperset(tool_use_ids):
                        # Valid pair — keep both
                        result.append(msg)
                        result.append(next_msg)
                        i += 2
                        continue
                # Orphaned tool_use — drop this assistant message (and skip next if it's the result)
                dropped += 1
                i += 1
                if next_msg and _is_tool_result_msg(next_msg):
                    i += 1  # skip the orphaned tool_result too
                continue
        result.append(msg)
        i += 1

    if dropped:
        print(f"  [Session] Removed {dropped} orphaned tool_use block(s).", flush=True)
    return result


def _load_session(name: str) -> list:
    p = SESSIONS_DIR / f"{name}.json"
    if not p.exists(): return []
    try:
        messages = json.loads(p.read_text(encoding="utf-8")).get("messages", [])
        return _sanitize_messages(messages)
    except Exception:
        return []


def _pick_session() -> tuple[str, list]:
    sessions = sorted(p.stem for p in SESSIONS_DIR.glob("*.json"))
    if not sessions:
        name = f"session_{datetime.now().strftime('%Y%m%d_%H%M')}"
        print(f"  Nova sessão: {name}")
        return name, []
    print("\n  Sessões salvas:")
    for i, s in enumerate(sessions):
        print(f"    [{i+1}] {s}")
    print(f"    [n] Nova sessão")
    choice = input("\n  Continuar qual sessão? (número ou 'n'): ").strip().lower()
    if choice == "n" or not choice:
        raw = input("  Nome (Enter para automático): ").strip()
        name = raw or f"session_{datetime.now().strftime('%Y%m%d_%H%M')}"
        return name, []
    try:
        idx = int(choice) - 1
        if 0 <= idx < len(sessions):
            name = sessions[idx]
            msgs = _load_session(name)
            print(f"  Continuando '{name}' ({len(msgs)} mensagens)")
            return name, msgs
    except ValueError:
        pass
    return f"session_{datetime.now().strftime('%Y%m%d_%H%M')}", []


# ── Context trimming ──────────────────────────────────────────────────────────

def _is_tool_result_msg(msg: dict) -> bool:
    if msg.get("role") != "user": return False
    content = msg.get("content", [])
    if not isinstance(content, list): return False
    return any(
        (isinstance(b, dict) and b.get("type") == "tool_result") or
        (hasattr(b, "type") and getattr(b, "type", None) == "tool_result")
        for b in content)


def trim_messages(messages: list) -> list:
    if len(messages) <= 1 + MAX_HISTORY:
        return messages
    safe = [i for i in range(2, len(messages))
            if messages[i].get("role") == "assistant"
            and messages[i-1].get("role") == "user"
            and not _is_tool_result_msg(messages[i-1])]
    if not safe: return messages
    target = max(2, len(messages) - MAX_HISTORY)
    best = safe[-1]
    for s in safe:
        if s >= target:
            best = s
            break
    trimmed = messages[:1] + messages[best:]
    dropped = best - 1
    if dropped > 0:
        print(f"  [Context] Trimmed {dropped} old messages.", flush=True)
    return trimmed


# ── Core agentic loop ─────────────────────────────────────────────────────────

def _run_loop(client, system: str, messages: list, mcp: MCPClient,
              tools: list, label: str = "") -> str | None:
    """Generic agentic loop. Returns final ID or None."""
    for iteration in range(1, MAX_ITERATIONS + 1):
        messages = trim_messages(messages)
        tag = f"[{label} turn {iteration}/{MAX_ITERATIONS}]" if label else f"[turn {iteration}]"
        print(f"{tag} Calling Claude... ({len(messages)} msgs)", flush=True)

        response = client.messages.create(
            model=MODEL, max_tokens=MAX_TOKENS,
            system=system, tools=tools, messages=messages)

        messages.append({"role": "assistant", "content": response.content})

        for block in response.content:
            if hasattr(block, "text") and block.text:
                print(f"\n[Claude] {block.text[:400]}", flush=True)

        if response.stop_reason == "end_turn":
            for block in response.content:
                if hasattr(block, "text"):
                    for prefix in ("SCREEN_ID:", "COMPONENT_SET_ID:", "COMPONENT_ID:", "FIX_DONE:"):
                        if prefix in block.text:
                            return block.text.split(prefix)[1].strip().split()[0]
            return None

        if response.stop_reason != "tool_use":
            print(f"Stop: {response.stop_reason}")
            return None

        tool_results = []
        for block in response.content:
            if block.type != "tool_use": continue
            print(f"  → {block.name}({list(block.input.keys())})", flush=True)
            content = _dispatch(block.name, block.input, mcp, client)
            tool_results.append({"type": "tool_result", "tool_use_id": block.id, "content": content})

        messages.append({"role": "user", "content": tool_results})

    print(f"⚠️  MAX_ITERATIONS ({MAX_ITERATIONS}) reached.")
    return None


# ── MCP startup ───────────────────────────────────────────────────────────────

def _start_mcp() -> MCPClient:
    mcp = MCPClient()
    mcp.start()
    port = mcp.port or 9223
    print(f"\n  In Figma Desktop: reopen the 'Figma Desktop Bridge' plugin.")
    print(f"  It will connect to ws://localhost:{port}")
    input("\n  Press Enter when connected... ")
    print("Checking connection...")
    for attempt in range(1, 8):
        test = mcp.call_tool("figma_execute",
            {"code": "return { ok: true, page: figma.currentPage.name }", "timeout": 5000},
            timeout=10)
        result = test.get("result", test)
        if test.get("success") or result.get("ok"):
            print(f"  Connected! Page: {result.get('page','?')}")
            return mcp
        print(f"  Retrying... ({attempt}/7)")
        time.sleep(4)
    mcp.stop()
    sys.exit("Could not connect to Figma.")


# ── Specialized workflow prompts ──────────────────────────────────────────────

def _screen_prompt(support, memory_ctx, rag_bootstrap):
    return f"""You are an expert Figma UI screen builder for OneDocs Admin (B2B desktop, 1440px).
Build screens block by block following PRDs exactly.

## Rules
- PRD is law: layout, IDs, colors, content exactly as specified
- Order: Shell → Header/Alerts → Content → Table → Pagination
- After each block: figma_screenshot to validate — max 3 fix attempts per block
- Each figma_execute is isolated: re-declare helpers + re-acquire nodes
- FILL sizing only after parent.appendChild(node)
- counterAxisAlignItems: "MIN"|"MAX"|"CENTER"|"BASELINE" only
- COMPONENT_SET: use set.children[0].createInstance()

## Helpers (use in every figma_execute)
```javascript
{_HELPER_JS}
```

## Registry
{support['REGISTRY.md']}

## Tokens
{support['DS-TOKENS.md']}

## Components
{support['DS-COMPONENTS.md']}

## Memory
{memory_ctx}

## PRD pre-fetch
{rag_bootstrap or "(use retrieve_docs to search)"}

When done: output exactly → SCREEN_ID: <frame_id>
"""


def _component_prompt(support, memory_ctx):
    return f"""You are an expert Figma component designer for OneDocs Admin design system.

## Workflow
1. inspect_figma(list_components) — check existing, avoid duplicates
2. retrieve_docs — understand tokens and patterns
3. Plan variants in text first
4. Build with figma.createComponent() variant by variant
5. Combine: figma.combineAsVariants(components, figma.currentPage)
6. Name variants: "Type=primary, State=default"
7. Screenshot after each variant — max 2 fix attempts per variant
8. save_component tool when done
9. Output: COMPONENT_SET_ID: <node_id>

## Rules
- Auto-layout on all components
- Never hardcode colors outside C palette
- Pre-load fonts in every figma_execute
- Each call is isolated
- Max 2 screenshot/fix per variant — accept minor imperfections
- Once combined, output ID immediately — do NOT iterate further

## Helpers
```javascript
{_HELPER_JS}
```

## Tokens
{support['DS-TOKENS.md']}

## Components
{support['DS-COMPONENTS.md']}

## Memory
{memory_ctx}

When done: COMPONENT_SET_ID: <node_id>
"""


def _fix_prompt(analysis_content: str, support, memory_ctx):
    return f"""You are applying targeted fixes to a Figma screen based on a pre-written analysis report.

## Your ONLY job
Apply the corrections listed in the analysis below, one by one.

## Rules — STRICTLY FOLLOW
- DO NOT take a screenshot before starting — go straight to figma_execute
- DO NOT re-analyze the screen
- DO NOT use inspect_figma at the start
- Apply correction 1 → figma_execute → screenshot to confirm → report result
- Apply correction 2 → repeat
- After all corrections: output FIX_DONE: <frame_id>

## Helpers
```javascript
{_HELPER_JS}
```

## Tokens
{support['DS-TOKENS.md']}

## Memory
{memory_ctx}

## Analysis report (corrections to apply)
{analysis_content}
"""


# ── Sub-workflow functions ────────────────────────────────────────────────────

def _workflow_build_screen(screen_number: int, mcp: MCPClient, client) -> str:
    support = _load_support()
    context = load_context(RESOURCES_DIR, screen_number)
    if not context:
        return f"PRD for screen {screen_number} not found."
    rag_bootstrap = _rag.retrieve_for_prd(context["prd_content"], k=8)
    memory_ctx = _memory.full_context()
    system = _screen_prompt(support, memory_ctx, rag_bootstrap)
    user_content = (
        f"Build screen following PRD below.\n"
        f"Place at x={context['x_position']} inside section {SECTION_ID}.\n"
        f"Delete existing frame named '{context['screen_name']}' first.\n\n"
        f"PRD:\n{context['prd_content']}"
    )
    print(f"\n[BUILD] Screen {screen_number}: {context['screen_name']}\n")
    result_id = _run_loop(client, system,
                          [{"role": "user", "content": user_content}],
                          mcp, _FIGMA_TOOLS, label="BUILD")
    if result_id:
        _memory.save_screen(screen_number, context["screen_name"], result_id)
        gh.on_screen_built(screen_number, context["screen_name"], result_id)
        return f"Screen {screen_number} built. SCREEN_ID: {result_id}"
    return f"Screen {screen_number} build finished (no ID returned)."


def _workflow_create_component(description: str, mcp: MCPClient, client) -> str:
    support = _load_support()
    memory_ctx = _memory.full_context()
    system = _component_prompt(support, memory_ctx)
    user_content = (
        f"Create this component:\n\n{description}\n\n"
        f"Place on current page. Workflow: inspect → plan → build → validate → save."
    )
    print(f"\n[COMPONENT] {description[:80]}\n")
    _run_loop(client, system,
              [{"role": "user", "content": user_content}],
              mcp, _FIGMA_TOOLS, label="COMP")
    return "Component workflow completed."


def _workflow_analyze_screen(frame_id: str, screen_number: int | None,
                              mcp: MCPClient, client) -> str:
    """Take screenshot, run Moondream, Claude analysis vs PRD, save report."""
    b64 = _screenshot_b64(frame_id, mcp)
    if not b64:
        print("  [Analyze] Screenshot failed, retrying in 5s...")
        time.sleep(5)
        b64 = _screenshot_b64(frame_id, mcp)
    if not b64:
        print("  [Analyze] Screenshot unavailable — proceeding with text-only analysis.")


    prd_content = ""
    screen_name = frame_id
    if screen_number:
        ctx = load_context(RESOURCES_DIR, screen_number)
        if ctx:
            prd_content = ctx["prd_content"]
            screen_name = ctx["screen_name"]

    analysis_system = (
        "You are a senior UI/UX reviewer for OneDocs Admin. "
        "Compare PRD specifications against Figma screenshots and produce actionable reports in Portuguese."
    )

    image_block = (
        [{"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": b64}}]
        if b64 else []
    )
    analysis_user: list = image_block + [
        {"type": "text", "text": f"""Analise a tela Figma{' mostrada na imagem' if b64 else ' (screenshot indisponível — análise baseada apenas no PRD)'}.

## PRD de referência
{prd_content if prd_content else "(nenhum PRD disponível — faça análise visual livre)"}

---

Produza um relatório estruturado com:

### ✅ Implementado corretamente

### ❌ Problemas encontrados
Para cada problema: o que era esperado, o que foi encontrado, severidade (crítico/menor).
Use formato de lista numerada para que possam ser aplicados como correções.

### ⚠️ Necessita revisão manual

### Resumo
Nota de fidelidade (ex: 8/10) e top prioridades.

Ao final do relatório, adicione uma seção:
## Correções para o agente
Liste APENAS as correções acionáveis no formato:
FRAME_ID: {frame_id}
1. [descrição técnica da correção 1]
2. [descrição técnica da correção 2]
"""},
    ]

    response = client.messages.create(
        model=MODEL, max_tokens=4096,
        system=analysis_system,
        messages=[{"role": "user", "content": analysis_user}])

    report_text = response.content[0].text

    # Save to Obsidian
    slug = f"screen_{screen_number:02d}" if screen_number else frame_id.replace(":", "_")
    report_path = AGENT_MEMORY_DIR / f"analysis_{slug}.md"
    report_path.write_text(
        f"# Análise — {screen_name}\n\nFRAME_ID: {frame_id}\n\n{report_text}",
        encoding="utf-8")
    print(f"\n📄 Análise salva: Agent-Memory/analysis_{slug}.md")

    # Open GitHub issue if problems found
    gh.on_analysis_done(screen_name, frame_id, report_text, screen_number)

    return report_text


def _workflow_fix_screen(screen_number: int | None, frame_id: str | None,
                          mcp: MCPClient, client) -> str:
    """Read analysis file and apply fixes."""
    # Find analysis file
    if screen_number:
        analysis_path = AGENT_MEMORY_DIR / f"analysis_screen_{screen_number:02d}.md"
        if not analysis_path.exists():
            analysis_path = AGENT_MEMORY_DIR / f"analysis_screen{screen_number:02d}.md"
    elif frame_id:
        slug = frame_id.replace(":", "_")
        analysis_path = AGENT_MEMORY_DIR / f"analysis_{slug}.md"
    else:
        return "Erro: informe screen_number ou frame_id para o fix."

    if not analysis_path.exists():
        return (
            f"❌ Arquivo de análise não encontrado: {analysis_path.name}\n"
            f"Execute analyze_screen primeiro para gerar o relatório antes de aplicar correções."
        )

    analysis_content = analysis_path.read_text(encoding="utf-8")

    # Extract frame_id from file if not provided
    if not frame_id:
        m = _re.search(r"FRAME_ID:\s*([\d:]+)", analysis_content)
        frame_id = m.group(1) if m else "unknown"

    support = _load_support()
    memory_ctx = _memory.full_context()
    system = _fix_prompt(analysis_content, support, memory_ctx)

    user_content = (
        f"Aplique todas as correções listadas no relatório de análise.\n"
        f"Frame ID alvo: {frame_id}\n"
        f"Execute uma correção por vez com figma_execute, confirme com screenshot, reporte o resultado."
    )

    print(f"\n[FIX] Aplicando correções do arquivo: {analysis_path.name}\n")
    _run_loop(client, system,
              [{"role": "user", "content": user_content}],
              mcp, _FIGMA_TOOLS, label="FIX")
    gh.on_fix_done(analysis_path.stem, frame_id or "unknown", screen_number)
    return f"Fix workflow concluído para {analysis_path.name}."


# ── Tool definitions ──────────────────────────────────────────────────────────

# Low-level Figma tools (used by all modes)
_FIGMA_TOOLS = [
    {
        "name": "figma_execute",
        "description": "Execute JavaScript in Figma plugin context.",
        "input_schema": {"type": "object",
            "properties": {
                "code": {"type": "string"},
                "timeout": {"type": "integer", "default": 10000}},
            "required": ["code"]},
    },
    {
        "name": "figma_screenshot",
        "description": "Capture screenshot of a Figma node + Moondream description.",
        "input_schema": {"type": "object",
            "properties": {
                "node_id": {"type": "string"},
                "block_type": {"type": "string", "default": "full"}},
            "required": ["node_id"]},
    },
    {
        "name": "inspect_figma",
        "description": "Inspect Figma canvas: list components, search by name, or inspect a node.",
        "input_schema": {"type": "object",
            "properties": {
                "mode": {"type": "string", "enum": ["list_components", "search", "inspect_node"]},
                "query": {"type": "string"},
                "node_id": {"type": "string"}},
            "required": ["mode"]},
    },
    {
        "name": "retrieve_docs",
        "description": "Search design system docs and PRDs.",
        "input_schema": {"type": "object",
            "properties": {
                "query": {"type": "string"},
                "k": {"type": "integer", "default": 6}},
            "required": ["query"]},
    },
    {
        "name": "save_component",
        "description": "Save a created component to persistent memory.",
        "input_schema": {"type": "object",
            "properties": {
                "name": {"type": "string"},
                "node_id": {"type": "string"},
                "description": {"type": "string"},
                "variants": {"type": "array", "items": {"type": "string"}}},
            "required": ["name", "node_id"]},
    },
]

# High-level orchestrator tools (chat mode only)
_ORCHESTRATOR_TOOLS = _FIGMA_TOOLS + [
    {
        "name": "build_screen",
        "description": (
            "Build a complete Figma screen from its PRD. "
            "Use when user asks to build, create, or rebuild screen N."
        ),
        "input_schema": {"type": "object",
            "properties": {"screen_number": {"type": "integer", "description": "Screen number 1–18"}},
            "required": ["screen_number"]},
    },
    {
        "name": "create_component",
        "description": (
            "Create a new Figma component with variants. "
            "Use when user asks to create a component or design element."
        ),
        "input_schema": {"type": "object",
            "properties": {"description": {"type": "string", "description": "Component description"}},
            "required": ["description"]},
    },
    {
        "name": "analyze_screen",
        "description": (
            "Capture a screenshot, run visual analysis vs PRD, and save a report to Obsidian. "
            "Use when user asks to analyze, review, or check a screen."
        ),
        "input_schema": {"type": "object",
            "properties": {
                "frame_id": {"type": "string", "description": "Figma node ID to analyze"},
                "screen_number": {"type": "integer", "description": "Screen number for PRD comparison (optional)"}},
            "required": ["frame_id"]},
    },
    {
        "name": "fix_screen",
        "description": (
            "Apply corrections to a Figma screen based on a previously saved analysis report. "
            "Use when user asks to apply corrections, fix issues, or execute the analysis."
        ),
        "input_schema": {"type": "object",
            "properties": {
                "screen_number": {"type": "integer", "description": "Screen number (to find analysis file)"},
                "frame_id": {"type": "string", "description": "Frame ID (alternative to screen_number)"}},
            "required": []},
    },
]


# ── Tool dispatch ─────────────────────────────────────────────────────────────

def _dispatch(name: str, inputs: dict, mcp: MCPClient, client) -> list:

    # ── figma_execute ─────────────────────────────────────────────────────────
    if name == "figma_execute":
        raw = mcp.call_tool("figma_execute", inputs, timeout=35)
        payload = raw.get("result", raw) if raw.get("success") else raw
        return [{"type": "text", "text": json.dumps(payload)}]

    # ── figma_screenshot ──────────────────────────────────────────────────────
    if name == "figma_screenshot":
        node_id = inputs["node_id"]
        block_type = inputs.get("block_type", "full")
        b64 = _screenshot_b64(node_id, mcp)
        if not b64:
            return [{"type": "text", "text": f"Screenshot failed for {node_id}"}]
        content = [{"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": b64}}]
        try:
            desc = _validator.describe_base64(b64, block_type)
            content.append({"type": "text", "text": desc})
        except Exception as e:
            print(f"     Moondream skipped: {e}", flush=True)
        return content

    # ── inspect_figma ─────────────────────────────────────────────────────────
    if name == "inspect_figma":
        mode = inputs.get("mode", "list_components")
        if mode == "list_components":
            code = """const n=figma.currentPage.findAll(n=>n.type==="COMPONENT"||n.type==="COMPONENT_SET");
return n.slice(0,60).map(n=>({id:n.id,name:n.name,type:n.type,
  children:n.type==="COMPONENT_SET"?n.children.length:undefined}));"""
        elif mode == "search":
            q = inputs.get("query", "").replace('"', '\\"')
            code = f"""const q="{q}".toLowerCase();
const n=figma.currentPage.findAll(n=>n.name.toLowerCase().includes(q));
return n.slice(0,30).map(n=>({{id:n.id,name:n.name,type:n.type,parent:n.parent?.name}}));"""
        else:
            nid = inputs.get("node_id", "")
            code = f"""const n=await figma.getNodeByIdAsync("{nid}");
if(!n) return {{error:"not found"}};
return {{id:n.id,name:n.name,type:n.type,width:n.width,height:n.height,
  fills:n.fills,children:n.children?.slice(0,20).map(c=>({{id:c.id,name:c.name,type:c.type}}))}};"""
        raw = mcp.call_tool("figma_execute", {"code": code, "timeout": 10000}, timeout=15)
        result = raw.get("result", raw) if raw.get("success") else raw
        return [{"type": "text", "text": json.dumps(result, indent=2)}]

    # ── retrieve_docs ─────────────────────────────────────────────────────────
    if name == "retrieve_docs":
        query = inputs.get("query", "")
        k = min(int(inputs.get("k", 6)), 12)
        results = _rag.retrieve(query, k=k)
        print(f"     [RAG] '{query[:60]}' → {len(results)} chars", flush=True)
        return [{"type": "text", "text": f"=== RAG: {query} ===\n\n{results}" if results
                 else f"No docs found for: {query}"}]

    # ── save_component ────────────────────────────────────────────────────────
    if name == "save_component":
        _memory.save_component(inputs["name"], inputs["node_id"],
                               inputs.get("description", ""), inputs.get("variants", []))
        return [{"type": "text", "text": f"Component '{inputs['name']}' saved."}]

    # ── ORCHESTRATOR TOOLS ────────────────────────────────────────────────────

    if name == "build_screen":
        result = _workflow_build_screen(inputs["screen_number"], mcp, client)
        return [{"type": "text", "text": result}]

    if name == "create_component":
        result = _workflow_create_component(inputs["description"], mcp, client)
        return [{"type": "text", "text": result}]

    if name == "analyze_screen":
        result = _workflow_analyze_screen(
            inputs["frame_id"],
            inputs.get("screen_number"),
            mcp, client)
        return [{"type": "text", "text": result}]

    if name == "fix_screen":
        result = _workflow_fix_screen(
            inputs.get("screen_number"),
            inputs.get("frame_id"),
            mcp, client)
        return [{"type": "text", "text": result}]

    return [{"type": "text", "text": f"Unknown tool: {name}"}]


# ── Chat system prompt ────────────────────────────────────────────────────────

def _chat_prompt(support, memory_ctx) -> str:
    return f"""Você é um assistente especialista em Figma e no design system OneDocs Admin.
Você tem acesso direto ao Figma e pode construir telas, criar componentes, analisar e corrigir designs.

## Ferramentas disponíveis

- **build_screen(screen_number)** — constrói tela completa a partir do PRD
- **create_component(description)** — cria componente com variantes
- **analyze_screen(frame_id, screen_number?)** — analisa tela, salva relatório no Obsidian
- **fix_screen(screen_number?, frame_id?)** — lê relatório salvo e aplica correções
- **figma_screenshot** — captura screenshot rápido (apenas para consultas visuais pontuais)
- **inspect_figma** — inspeciona nós do canvas
- **retrieve_docs** — busca documentação do design system
- **save_component** — salva componente na memória

## REGRAS CRÍTICAS — leia antes de qualquer ação

### Quando o usuário pedir análise de uma tela:
→ SEMPRE chame **analyze_screen(frame_id)** — nunca faça análise inline
→ O analyze_screen salva o relatório no Obsidian automaticamente
→ Ao terminar, diga: "Análise concluída e salva. Quer que eu aplique as correções?"
→ PARE e aguarde resposta

### Quando o usuário confirmar correções ("sim", "aplica", "pode", "execute"):
→ Chame **fix_screen** IMEDIATAMENTE — sem tirar screenshot, sem re-analisar
→ O fix_screen lê o arquivo salvo e aplica tudo automaticamente
→ NÃO faça nenhuma outra ação antes de chamar fix_screen

### Quando o usuário pedir para construir uma tela:
→ Chame **build_screen(N)**

### Quando o usuário pedir para criar um componente:
→ Chame **create_component(descrição)**

### Regras gerais:
- Responda em português
- Links Figma têm node_id extraído inline: [node_id=X:Y] — use diretamente
- Seja direto — não explique, apenas execute a ferramenta certa

## Memória
{memory_ctx}

## Tokens e Componentes disponíveis
{support['DS-TOKENS.md'][:1000]}...
(use retrieve_docs para detalhes)
"""


# ── Chat mode ─────────────────────────────────────────────────────────────────

def run_chat():
    support = _load_support()
    print("Building RAG index...", flush=True)
    _build_rag(support)

    session_name, messages = _pick_session()
    mcp = _start_mcp()
    client = _get_anthropic_client()
    system = _chat_prompt(support, _memory.full_context())

    print("\n💬 Figma Agent — fale em português, cole links do Figma.")
    print("   'sair' para encerrar.\n")

    try:
        while True:
            try:
                user_input = input("Você: ").strip()
            except EOFError:
                break
            if not user_input: continue
            if user_input.lower() in ("sair", "exit", "quit"):
                print("Encerrando.")
                break

            processed = _re.sub(
                r'node-id=([\d]+-[\d]+)',
                lambda m: f"{m.group(0)} [node_id={m.group(1).replace('-',':')}]",
                user_input)

            # Inject strong reminder for correction intent
            fix_keywords = ("sim", "aplica", "aplique", "corrij", "execut", "pode", "faça", "faz", "ok")
            if any(k in processed.lower() for k in fix_keywords) and len(messages) >= 2:
                processed += (
                    "\n\n[INSTRUÇÃO DO SISTEMA: chame fix_screen AGORA. "
                    "NÃO tire screenshot. NÃO re-analise. NÃO use inspect_figma. "
                    "Chame fix_screen diretamente — ela já tem tudo que precisa.]"
                )

            messages.append({"role": "user", "content": processed})

            turn_iter = 0
            while True:
                turn_iter += 1
                if turn_iter > MAX_ITERATIONS:
                    print(f"⚠️  Limite atingido.")
                    break
                for attempt in range(1, 4):
                    try:
                        response = client.messages.create(
                            model=MODEL, max_tokens=MAX_TOKENS,
                            system=system, tools=_ORCHESTRATOR_TOOLS,
                            messages=trim_messages(messages))
                        break
                    except Exception as e:
                        if attempt == 3:
                            raise
                        print(f"  ⚠️  API error (attempt {attempt}/3): {e}. Retrying in 5s...", flush=True)
                        time.sleep(5)
                messages.append({"role": "assistant", "content": response.content})
                for block in response.content:
                    if hasattr(block, "text") and block.text:
                        print(f"\nAgente: {block.text}\n")
                if response.stop_reason == "end_turn": break
                if response.stop_reason != "tool_use": break
                tool_results = []
                for block in response.content:
                    if block.type != "tool_use": continue
                    print(f"  → {block.name}({list(block.input.keys())})", flush=True)
                    try:
                        content = _dispatch(block.name, block.input, mcp, client)
                    except RuntimeError as e:
                        if "MCP" in str(e):
                            print(f"\n⚠️  Conexão com Figma perdida: {e}", flush=True)
                            _save_session(session_name, messages)
                            print(f"  💾 Sessão salva: {session_name}")
                            return
                        content = f"Erro: {e}"
                    tool_results.append({"type": "tool_result", "tool_use_id": block.id, "content": content})
                messages.append({"role": "user", "content": tool_results})

            _save_session(session_name, messages)

    finally:
        mcp.stop()
        _save_session(session_name, messages)
        print(f"  💾 Sessão salva: {session_name}")


# ── Direct modes (for automation/CI) ─────────────────────────────────────────

def run_direct_screen(screen_number: int):
    support = _load_support()
    _build_rag(support)
    mcp = _start_mcp()
    client = _get_anthropic_client()
    try:
        _workflow_build_screen(screen_number, mcp, client)
    finally:
        mcp.stop()


def run_direct_fix(screen_number: int):
    support = _load_support()
    mcp = _start_mcp()
    client = _get_anthropic_client()
    try:
        _workflow_fix_screen(screen_number, None, mcp, client)
    finally:
        mcp.stop()


# ── Entry point ───────────────────────────────────────────────────────────────

def main():
    if not os.environ.get("ANTHROPIC_API_KEY"):
        sys.exit("Error: ANTHROPIC_API_KEY not set")
    if not os.environ.get("FIGMA_ACCESS_TOKEN"):
        sys.exit("Error: FIGMA_ACCESS_TOKEN not set")

    parser = argparse.ArgumentParser(description="Figma Agent")
    parser.add_argument("--screen", type=int, help="Direct screen build (automation)")
    parser.add_argument("--fix", type=int, help="Direct fix run (automation)")
    args = parser.parse_args()

    if args.screen:
        run_direct_screen(args.screen)
    elif args.fix:
        run_direct_fix(args.fix)
    else:
        run_chat()


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nInterrupted.")
        sys.exit(0)
