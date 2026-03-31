# HELPERS — Funções JS Reutilizáveis para Figma MCP

> **Regra:** Copie este bloco inteiro no início de cada `figma_execute` que cria elementos.
> Não duplique em PRDs. A fonte da verdade é este arquivo.
> Versão: 2.0 · Atualizado: 2026-03-30

---

## Bloco completo — copiar no início de cada execução

```javascript
// ─── TOKEN_HEX ───────────────────────────────────────────────────────────────
// Fallback hex para quando getLocalVariablesAsync() não encontrar a variável.
// Manter sincronizado com DS-TOKENS.md.
const TOKEN_HEX = {
  // Surfaces
  "surface/desktop":           { r:0.969, g:0.969, b:0.973 }, // gray/100  #F7F7F8
  "surface/card":              { r:1,     g:1,     b:1     }, // white
  "surface/application":       { r:1,     g:1,     b:1     }, // white
  "surface/active":            { r:0.937, g:0.953, b:1     }, // blue/100
  "surface/disabled":          { r:0.933, g:0.937, b:0.945 }, // gray/200
  "surface/error":             { r:1,     g:0.937, b:0.937 }, // red/100
  "surface/warning":           { r:1,     g:0.980, b:0.894 }, // yellow/50
  "surface/success":           { r:0.937, g:0.992, b:0.949 }, // green/50
  "surface/action/approve":    { r:0.133, g:0.549, b:0.247 }, // green/600
  "surface/action/disapprove": { r:0.859, g:0.196, b:0.196 }, // red/600
  // Text
  "text/title":    { r:0.216, g:0.231, b:0.255 }, // gray/700
  "text/body":     { r:0.365, g:0.392, b:0.435 }, // gray/500
  "text/nav":      { r:0.298, g:0.329, b:0.373 }, // gray/600
  "text/tool":     { r:0.298, g:0.329, b:0.373 }, // gray/600
  "text/label":    { r:0.365, g:0.392, b:0.435 }, // gray/500
  "text/active":   { r:0.298, g:0.329, b:0.373 }, // gray/600
  "text/disabled": { r:0.576, g:0.604, b:0.647 }, // gray/400
  "text/action":   { r:1,     g:1,     b:1     }, // white
  "text/link":     { r:0.231, g:0.447, b:0.871 }, // blue/600
  "text/error":    { r:0.718, g:0.110, b:0.110 }, // red/700
  "text/success":  { r:0.063, g:0.361, b:0.129 }, // green/800
  "text/warning":  { r:0.502, g:0.392, b:0.016 }, // yellow/700
  // Borders
  "border/application": { r:0.886, g:0.898, b:0.918 }, // gray/200
  "border/active":      { r:0.239, g:0.522, b:0.957 }, // blue/500
  "border/success":     { r:0.733, g:0.898, b:0.773 }, // green/200
  "border/warning":     { r:0.996, g:0.929, b:0.647 }, // yellow/200
  // Forms
  "form/input":      { r:1,     g:1,     b:1     }, // white
  "form/inputborder":{ r:0.820, g:0.835, b:0.855 }, // gray/300
};

// ─── TEXT_STYLE_MAP ──────────────────────────────────────────────────────────
// Mapeia intenção semântica para nome de estilo do DS.
const TEXT_STYLE_MAP = {
  "heading/page":    "text-2xl/font-semibold",
  "heading/section": "text-xl/font-semibold",
  "heading/card":    "text-lg/font-semibold",
  "heading/sub":     "text-base/font-semibold",
  "body/default":    "text-sm/font-normal",
  "body/medium":     "text-sm/font-medium",
  "body/strong":     "text-sm/font-semibold",
  "label/default":   "text-sm/font-medium",
  "label/small":     "text-xs/font-medium",
  "label/muted":     "text-xs/font-normal",
  "data/kpi":        "text-3xl/font-bold",
  "data/stat":       "text-2xl/font-bold",
  "data/value":      "text-base/font-semibold",
  "nav/item":        "text-sm/font-medium",
  "nav/active":      "text-sm/font-semibold",
  "table/header":    "text-xs/font-medium",
  "table/cell":      "text-sm/font-normal",
  "table/cell-em":   "text-sm/font-medium",
  "badge":           "text-xs/font-semibold",
  "button/base":     "text-sm/font-medium",
  "button/sm":       "text-xs/font-medium",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

// tryFont — sobreescreve texto em instâncias de componente com segurança
async function tryFont(node, text) {
  try { await figma.loadFontAsync(node.fontName); }
  catch(e) { await figma.loadFontAsync({ family: node.fontName.family, style: "Regular" }); }
  node.characters = text;
}

// bindToken — aplica token de cor como fill, com bind à variável Figma se disponível
async function bindToken(node, tokenName) {
  const hex = TOKEN_HEX[tokenName];
  if (!hex) return;
  try {
    const vars = await figma.variables.getLocalVariablesAsync();
    const v = vars.find(x => x.name === tokenName);
    if (v) {
      node.fills = [figma.variables.setBoundVariableForPaint({ type:"SOLID", color:hex }, "color", v)];
      return;
    }
  } catch(e) {}
  node.fills = [{ type:"SOLID", color:hex }];
}

// applyTextStyle — vincula text style do DS ao nó de texto
let _tsCache = null;
async function applyTextStyle(node, styleName) {
  const resolved = TEXT_STYLE_MAP[styleName] || styleName;
  if (!_tsCache) _tsCache = await figma.getLocalTextStylesAsync();
  const style = _tsCache.find(s => s.name === resolved);
  if (style) {
    await figma.loadFontAsync(style.fontName);
    await node.setTextStyleIdAsync(style.id);
    return true;
  }
  // Fallback direto
  const SIZE = {"text-xs":12,"text-sm":14,"text-base":16,"text-lg":18,"text-xl":20,"text-2xl":24,"text-3xl":30,"text-4xl":36,"text-5xl":48};
  const WEIGHT = {"font-normal":"Regular","font-medium":"Medium","font-semibold":"Semi Bold","font-bold":"Bold"};
  const parts = resolved.split("/");
  const isUnder = parts[0] === "underline";
  const [sz, wt] = isUnder ? [parts[1], parts[2]] : [parts[0], parts[1]];
  if (SIZE[sz] && WEIGHT[wt]) {
    await figma.loadFontAsync({ family:"Inter", style: WEIGHT[wt] });
    node.fontName = { family:"Inter", style: WEIGHT[wt] };
    node.fontSize = SIZE[sz];
    if (isUnder) node.textDecoration = "UNDERLINE";
  }
  return false;
}

// makeText — cria nó de texto com text style + token de cor do DS
async function makeText(parent, text, styleName, tokenName, uppercase) {
  await figma.loadFontAsync({ family:"Inter", style:"Regular" });
  const t = figma.createText();
  await applyTextStyle(t, styleName);
  t.characters = text;
  if (uppercase) t.textCase = "UPPER";
  if (tokenName) await bindToken(t, tokenName);
  parent.appendChild(t);
  return t;
}
```

---

## Shell — padrão de construção de tela

> Usar em TODA tela. Nunca recriar do zero sem consultar aqui.

```javascript
// SHELL PATTERN v2 — 2026-03-30
// screen (VERTICAL, 1440×880, surface/desktop)
//   └── topbar  (instance 301:1056, FILL horizontal)
//   └── row     (HORIZONTAL, FILL)
//         ├── sidebar (instance 305:3092, FILL vertical)
//         └── body    (VERTICAL, padding 24, gap 24, FILL)

async function buildShell(screenName, sectionId) {
  // Limpar frame existente com mesmo nome
  const _ex = figma.currentPage.children.find(n => n.name === screenName);
  if (_ex) _ex.remove();

  // Screen
  const screen = figma.createFrame();
  screen.name = screenName;
  screen.resize(1440, 880);
  screen.layoutMode = "VERTICAL";
  screen.primaryAxisSizingMode = "FIXED";
  screen.itemSpacing = 0;
  screen.paddingTop = 0; screen.paddingBottom = 0;
  screen.paddingLeft = 0; screen.paddingRight = 0;
  await bindToken(screen, "surface/desktop");

  // Colocar na seção
  const section = await figma.getNodeByIdAsync(sectionId);
  section.appendChild(screen);

  // Topbar — CRITICAL: appendChild BEFORE setting FILL
  const topbar = (await figma.getNodeByIdAsync("301:1056")).createInstance();
  screen.appendChild(topbar);
  topbar.layoutSizingHorizontal = "FILL";
  topbar.layoutSizingVertical = "HUG";

  // Row
  const row = figma.createFrame();
  row.name = "row";
  row.layoutMode = "HORIZONTAL";
  row.itemSpacing = 0;
  row.paddingTop = 0; row.paddingBottom = 0;
  row.paddingLeft = 0; row.paddingRight = 0;
  row.fills = [];
  screen.appendChild(row);
  row.layoutSizingHorizontal = "FILL";
  row.layoutSizingVertical = "FILL";

  // Sidebar — appendChild BEFORE FILL
  const sidebar = (await figma.getNodeByIdAsync("305:3092")).createInstance();
  row.appendChild(sidebar);
  sidebar.layoutSizingHorizontal = "HUG";
  sidebar.layoutSizingVertical = "FILL";

  // Body
  const body = figma.createFrame();
  body.name = "body";
  body.layoutMode = "VERTICAL";
  body.itemSpacing = 24;
  body.paddingTop = 24; body.paddingBottom = 24;
  body.paddingLeft = 24; body.paddingRight = 24;
  body.fills = [];
  row.appendChild(body);
  body.layoutSizingHorizontal = "FILL";
  body.layoutSizingVertical = "FILL";

  return { screen, topbar, row, sidebar, body };
}
```

---

## Utilitários de layout

```javascript
// Redimensionar screen para altura do conteúdo
async function fitScreenToContent(screenId) {
  const screen = await figma.getNodeByIdAsync(screenId);
  const topbar = screen.children[0];
  const row = screen.children[1];
  const body = row.children[1];

  body.primaryAxisSizingMode = "AUTO";
  await new Promise(r => setTimeout(r, 200));
  const totalH = topbar.height + body.height;
  screen.resize(1440, totalH);
  screen.primaryAxisSizingMode = "FIXED";
  body.primaryAxisSizingMode = "FIXED";
  body.layoutSizingVertical = "FILL";
  row.layoutSizingVertical = "FILL";

  figma.viewport.scrollAndZoomIntoView([screen]);
  return totalH;
}

// Criar coluna de layout (filho de frame HORIZONTAL)
function makeCol(parent, widthPx, opts = {}) {
  const col = figma.createFrame();
  col.name = opts.name || "col";
  col.layoutMode = "VERTICAL";
  col.itemSpacing = opts.gap || 16;
  col.paddingTop    = opts.padding ?? 16;
  col.paddingBottom = opts.padding ?? 16;
  col.paddingLeft   = opts.padding ?? 16;
  col.paddingRight  = opts.padding ?? 16;
  col.cornerRadius = opts.radius ?? 8;
  col.fills = opts.fill ? [{ type:"SOLID", color: opts.fill }] : [];
  parent.appendChild(col);
  if (widthPx === "FILL") {
    col.layoutSizingHorizontal = "FILL";
  } else {
    col.resize(widthPx, 100);
    col.layoutSizingHorizontal = "FIXED";
  }
  col.layoutSizingVertical = opts.verticalSizing || "HUG";
  return col;
}
```

---

## Avisos importantes

| Situação | Regra |
|----------|-------|
| `setTextStyleIdAsync` | Usar async — `textStyleId =` direto causa erro em `documentAccess: dynamic-page` |
| `layoutSizingHorizontal = "FILL"` | Só funciona APÓS `parent.appendChild(node)` |
| `layoutSizingHorizontal = "HUG"` | Só funciona em auto-layout frames — nunca setar em frame normal (createFrame sem layoutMode) |
| `layoutGrow` | Aceita apenas `0` ou `1` — não usar `2`, `3` etc. |
| Fills em Alert/Badge | Nunca sobrescrever — controlar via prop `Color` |
| Modal/Drawer | Appendar no `screen`, nunca no `body` |
| Topbar breadcrumb node | Nome é `"Flowbite"`, não `"Breadcrumb"` |
| COMPONENT_SET | Não tem `createInstance()` — usar `set.children[N].createInstance()` |
| Fonts em loop | Pré-carregar todas as fonts UMA vez fora do loop, depois `node.characters = text` diretamente |
