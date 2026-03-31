# Spec — Admin / Cadastros / Busca & Lista — Drawer
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #8 de 18 
> Prioridade de execução: **3**

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Cadastros / Busca & Lista — Drawer
Sidebar ativo: Cadastros → Busca & Lista
Plataforma: Desktop 1440 × 880px
DS Skill: SKILL.md (injetado em todas as chamadas)
Memória: Consultar telas já criadas antes de iniciar
```

---

## CAMADA 2 — Referência Visual

> Executar via figma_execute antes de qualquer geração:

```javascript
await figma_execute({
  code: `
    const node = await figma.getNodeByIdAsync("3134:3525");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3134:3525", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3134:3525", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Cadastros > Busca & Lista 
**Objetivo:** Perfil condensado do cadastro — overlay sobre Frame 7. 
**Dimensões:** 1440 × 880px
**Layout:** Topbar (1440px) no topo + Row abaixo com SidebarNav (240px fixo) + Body (FILL)
**Screen:** `layoutMode = VERTICAL`
**Row:** `layoutMode = HORIZONTAL` (sidebar + body)
**Body:** padding 24px, VERTICAL, gap 24px
**Fundo:** `surface/desktop` → token `gray/100` → hex `#F7F7F8`
**Fundo:** `surface/desktop` (gray/100)

---

## CAMADA 4 — Spec de Blocos (sequencial)

### BLOCO 1 · Base
Frame 7 como background com overlay gray/600 40% opacidade

### BLOCO 2 · Drawer lateral direito
Componente base: Drawer/Sidebar-Right node 365:2379
Largura: 480px · Altura: FILL (880px)
Posição: ancorado à direita

### BLOCO 3 · Cabeçalho do Drawer
Avatar circular: node 3010:97645 (foto/selfie circular)
Nome completo + CPF mascarado
Badge status grande + nível de risco node 3010:97638
Botão X fechar (canto superior direito)

### BLOCO 4 · Overview Card
Status biometria · Status documentos · Categorias ativas · Score de risco
Token fundo: surface/card

### BLOCO 5 · Ações rápidas
Botões em linha: "Bloquear" · "Desbloquear" · "Escalar" · "Ver conferência"
Componente: Button sm node 1627:20589

### BLOCO 6 · Tabs dentro do drawer
Componente: Tabs node 1620:23012
| Tab | Conteúdo |
|-----|----------|
| Resumo | Status atual, checklist validações //, integrações pendentes |
| Identidade | Nome, CPF, nascimento, tel, e-mail, consentimentos |
| Biometria | Miniatura selfie, liveness, dedup, Bepass |
| Documentos | Miniatura, OCR/NER resumido, benefícios |
| Categorias | Lista ativas, validade, status |
| Eventos | Timeline/Activity Log node 1625:58679 — últimos 10 eventos |

### BLOCO 7 · Rodapé
"Abrir perfil completo" — link azul, text/link

---

## CAMADA 5 — Execução MCP (código completo)

```javascript
// 
// STEP 0 — Playground + helpers v3 (text styles + tokens)
// 
const buildPage = figma.root.children.find(p => p.id === "1599:18625");
await figma.setCurrentPageAsync(buildPage);
await new Promise(r => setTimeout(r, 300));
// DataTable nodes: 3393:11073 (A), 3393:6548 (B), 3393:9617 (C)
// Probe: figma_get_component({ nodeId: "3393:11073" }) before first use

// TEXT_STYLE_MAP — mapeia intenção semântica para nome de estilo do DS
// Usar sempre que criar texto: makeText(parent, "conteúdo", TEXT_STYLE_MAP["heading/page"], "text/title")
const TEXT_STYLE_MAP = {
  // Headings
  "heading/page":    "text-2xl/font-semibold",   // Título de página (máx 1 por screen)
  "heading/section": "text-xl/font-semibold",    // Seção / card header
  "heading/card":    "text-lg/font-semibold",    // Subseção / painel
  "heading/sub":     "text-base/font-semibold",  // Subtítulo menor

  // Body
  "body/default":    "text-sm/font-normal",      // Texto corrido padrão
  "body/medium":     "text-sm/font-medium",      // Texto com ênfase leve
  "body/strong":     "text-sm/font-semibold",    // Texto destacado

  // Labels (form, input, table)
  "label/default":   "text-sm/font-medium",      // Label de campo
  "label/small":     "text-xs/font-medium",      // Label compacto
  "label/muted":     "text-xs/font-normal",      // Helper / hint text

  // Data & KPIs
  "data/kpi":        "text-3xl/font-bold",       // Número grande de KPI
  "data/stat":       "text-2xl/font-bold",       // Stat secundário
  "data/value":      "text-base/font-semibold",  // Valor em linha

  // Navigation
  "nav/item":        "text-sm/font-medium",      // Item de sidebar
  "nav/active":      "text-sm/font-semibold",    // Item ativo de sidebar

  // Tables
  "table/header":    "text-xs/font-medium",      // Cabeçalho de coluna (aplicar UPPER separadamente)
  "table/cell":      "text-sm/font-normal",      // Célula de dado
  "table/cell-em":   "text-sm/font-medium",      // Célula com ênfase

  // Badges & tags
  "badge":           "text-xs/font-semibold",    // Texto de badge/tag

  // Buttons
  "button/base":     "text-sm/font-medium",      // Botão padrão
  "button/sm":       "text-xs/font-medium",      // Botão pequeno
};

// Cache de text styles — evita múltiplas chamadas async por sessão
let _textStyleCache = null;
async function _getTextStyles() {
  if (!_textStyleCache) _textStyleCache = await figma.getLocalTextStylesAsync();
  return _textStyleCache;
}

// applyTextStyle — vincula o text style do DS a um nó de texto já criado
// Retorna true se o estilo foi encontrado e aplicado; false se usou fallback
async function applyTextStyle(node, styleName) {
  // Normaliza nomes do TEXT_STYLE_MAP para nomes do DS
  const resolved = TEXT_STYLE_MAP[styleName] || styleName;
  const styles = await _getTextStyles();
  const style = styles.find(s => s.name === resolved);
  if (style) {
    // Pré-carrega a fonte do estilo antes de atribuir textStyleId
    await figma.loadFontAsync(style.fontName);
    node.textStyleId = style.id;
    return true;
  }
  // Fallback: aplica via propriedades diretas (sem binding ao DS)
  const SIZE_PX  = {"text-xs":12,"text-sm":14,"text-base":16,"text-lg":18,"text-xl":20,"text-2xl":24,"text-3xl":30,"text-4xl":36,"text-5xl":48};
  const W_MAP    = {"font-normal":"Regular","font-medium":"Medium","font-semibold":"Semi Bold","font-bold":"Bold","font-thin":"Thin","font-light":"Light","font-extralight":"Extra Light","font-extrabold":"Extra Bold","font-black":"Black"};
  const parts    = resolved.split("/");
  const isUnder  = parts[0] === "underline";
  const [sz, wt] = isUnder ? [parts[1], parts[2]] : [parts[0], parts[1]];
  if (SIZE_PX[sz] && W_MAP[wt]) {
    await figma.loadFontAsync({ family:"Inter", style: W_MAP[wt] });
    node.fontName  = { family:"Inter", style: W_MAP[wt] };
    node.fontSize  = SIZE_PX[sz];
    if (isUnder) node.textDecoration = "UNDERLINE";
  }
  return false; // style não encontrado — log para revisão
}

// makeText v3 — sempre vincula text style do DS + token de cor
// styleName: chave do TEXT_STYLE_MAP ("heading/page") OU nome direto do DS ("text-2xl/font-semibold")
// tokenName: token de cor (opcional) — "text/title", "text/body", etc.
// uppercase: passa true para textos em CAIXA ALTA (ex: cabeçalhos de tabela)
async function makeText(parent, text, styleName, tokenName, uppercase) {
  // Cria nó de texto com fonte temporária para evitar erro de fonte não carregada
  await figma.loadFontAsync({ family:"Inter", style:"Regular" });
  const t = figma.createText();

  // Aplica o text style do DS (binding real)
  await applyTextStyle(t, styleName);

  // Define o conteúdo
  t.characters = text;
  if (uppercase) t.textCase = "UPPER";

  // Vincula token de cor
  if (tokenName && TOKEN_HEX[tokenName]) {
    try {
      const vars = await figma.variables.getLocalVariablesAsync();
      const v = vars.find(x => x.name === tokenName);
      if (v) {
        t.fills = [figma.variables.setBoundVariableForPaint(
          { type:"SOLID", color:TOKEN_HEX[tokenName] }, "color", v
        )];
      } else {
        t.fills = [{ type:"SOLID", color:TOKEN_HEX[tokenName] }];
      }
    } catch(e) {
      t.fills = [{ type:"SOLID", color:TOKEN_HEX[tokenName] }];
    }
  }

  parent.appendChild(t);
  return t;
}

const TOKEN_HEX = {
  "surface/desktop":    { r:0.969, g:0.969, b:0.973 },
  "surface/card":       { r:1,     g:1,     b:1     },
  "surface/application":{ r:1,     g:1,     b:1     },
  "surface/active":     { r:0.937, g:0.953, b:1     },
  "surface/disabled":   { r:0.933, g:0.937, b:0.945 },
  "surface/error":      { r:1,     g:0.937, b:0.937 },
  "surface/warning":    { r:1,     g:0.980, b:0.894 },
  "surface/success":    { r:0.937, g:0.992, b:0.949 },
  "surface/action/approve":    { r:0.133, g:0.549, b:0.247 },
  "surface/action/disapprove": { r:0.859, g:0.196, b:0.196 },
  "text/title":   { r:0.216, g:0.231, b:0.255 },
  "text/body":    { r:0.365, g:0.392, b:0.435 },
  "text/nav":     { r:0.298, g:0.329, b:0.373 },
  "text/label":   { r:0.365, g:0.392, b:0.435 },
  "text/active":  { r:0.298, g:0.329, b:0.373 },
  "text/disabled":{ r:0.576, g:0.604, b:0.647 },
  "text/action":  { r:1,     g:1,     b:1     },
  "text/link":    { r:0.231, g:0.447, b:0.871 },
  "text/error":   { r:0.718, g:0.110, b:0.110 },
  "text/success": { r:0.063, g:0.361, b:0.129 },
  "text/warning": { r:0.502, g:0.392, b:0.016 },
  "border/application": { r:0.886, g:0.898, b:0.918 },
  "border/active":      { r:0.239, g:0.522, b:0.957 },
  "border/success":     { r:0.733, g:0.898, b:0.773 },
  "border/warning":     { r:0.996, g:0.929, b:0.647 },
  "form/input":         { r:1,     g:1,     b:1     },
  "form/inputborder":   { r:0.820, g:0.835, b:0.855 },
};

async function tryFont(node, text) {
  try { await figma.loadFontAsync(node.fontName); } catch(e) {
    await figma.loadFontAsync({ family: node.fontName.family, style: "Regular" });
  }
  node.characters = text;
}

async function bindToken(node, tokenName) {
  const hex = TOKEN_HEX[tokenName] || TOKEN_HEX["surface/desktop"];
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

function makeRow(name, gap, parent) {
  const f = figma.createFrame(); f.name = name;
  f.layoutMode = "HORIZONTAL"; f.layoutSizingHorizontal = "FILL";
  f.itemSpacing = gap; f.fills = []; f.counterAxisAlignItems = "CENTER";
  if (parent) parent.appendChild(f);
  return f;
}

function makeCol(name, gap, parent) {
  const f = figma.createFrame(); f.name = name;
  f.layoutMode = "VERTICAL"; f.layoutSizingHorizontal = "FILL";
  f.layoutSizingVertical = "FILL"; f.itemSpacing = gap; f.fills = [];
  if (parent) parent.appendChild(f);
  return f;
}
```

```javascript
// CLEANUP — idempotência: remove frame anterior com mesmo nome se existir
const _existing = figma.currentPage.children.find(n => n.name === "Admin / Cadastros / Busca & Lista — Drawer");
if (_existing) { _existing.remove(); console.log("Removed existing frame: Admin / Cadastros / Busca & Lista — Drawer"); }

// 
// STEP 1 — Frame principal 1440x880
// 
const screen = figma.createFrame();
screen.name = "Admin / Cadastros / Busca & Lista — Drawer";
screen.resize(1440, 880);
screen.layoutMode = "VERTICAL";
screen.itemSpacing = 0;
const TOKEN_HEX = {
  "surface/desktop":    { r:0.969, g:0.969, b:0.973 },  // gray/100
  "surface/card":       { r:1,     g:1,     b:1     },  // white
  "surface/application":{ r:1,     g:1,     b:1     },  // white
  "surface/active":     { r:0.937, g:0.953, b:1     },  // blue/100
  "surface/disabled":   { r:0.933, g:0.937, b:0.945 },  // gray/200
  "surface/error":      { r:1,     g:0.937, b:0.937 },  // red/100
  "surface/warning":    { r:1,     g:0.980, b:0.894 },  // yellow/50
  "surface/success":    { r:0.937, g:0.992, b:0.949 },  // green/50
  "surface/action/approve":    { r:0.133, g:0.549, b:0.247 },  // green/600
  "surface/action/disapprove": { r:0.859, g:0.196, b:0.196 },  // red/600
  "text/title":         { r:0.216, g:0.231, b:0.255 },  // gray/700
  "text/body":          { r:0.365, g:0.392, b:0.435 },  // gray/500
  "text/nav":           { r:0.298, g:0.329, b:0.373 },  // gray/600
  "text/label":         { r:0.365, g:0.392, b:0.435 },  // gray/500
  "text/active":        { r:0.298, g:0.329, b:0.373 },  // gray/600
  "text/disabled":      { r:0.576, g:0.604, b:0.647 },  // gray/400
  "text/action":        { r:1,     g:1,     b:1     },  // white
  "text/link":          { r:0.231, g:0.447, b:0.871 },  // blue/600
  "text/error":         { r:0.718, g:0.110, b:0.110 },  // red/700
  "text/success":       { r:0.063, g:0.361, b:0.129 },  // green/800
  "text/warning":       { r:0.502, g:0.392, b:0.016 },  // yellow/700
  "border/application": { r:0.886, g:0.898, b:0.918 },  // gray/200
  "border/active":      { r:0.239, g:0.522, b:0.957 },  // blue/500
  "border/success":     { r:0.733, g:0.898, b:0.773 },  // green/200
  "border/warning":     { r:0.996, g:0.929, b:0.647 },  // yellow/200
  "form/input":         { r:1,     g:1,     b:1     },  // white
  "form/inputborder":   { r:0.820, g:0.835, b:0.855 },  // gray/300
};

async function bindToken(node,tk){const hex=TOKEN_HEX[tk]||TOKEN_HEX["surface/desktop"];try{const vars=await figma.variables.getLocalVariablesAsync();const v=vars.find(x=>x.name===tk);if(v){node.fills=[figma.variables.setBoundVariableForPaint({type:"SOLID",color:hex},"color",v)];return;}}catch(e){}node.fills=[{type:"SOLID",color:hex}];}

await bindToken(screen, "surface/desktop", { r: 0.969, g: 0.969, b: 0.973 });
figma.currentPage.appendChild(screen);

// 
// STEP 2 — Topbar (primeiro filho do screen, 1440px)
// 
const topbar = (await figma.getNodeByIdAsync("301:1056")).createInstance();
topbar.layoutSizingHorizontal = "FILL";
topbar.setProperties({ "Breadcrumb": true, "Right Content": true });
screen.appendChild(topbar);
const bc = topbar.findOne(n => n.type === "TEXT" && n.name === "Breadcrumb");
if (bc) await tryFont(bc, "Busca & Lista");
const mod = topbar.findOne(n => n.type === "TEXT" && n.name === "Module");
if (mod) await tryFont(mod, "OneDocs Admin");
```

Chamar figma_take_screenshot com o ID do screen.

```javascript
// RE-ACQUIRE — variáveis não persistem entre figma_execute separados
const _screen = figma.currentPage.children.find(n => n.name === "Admin / Cadastros / Busca & Lista — Drawer");
if (!_screen) throw new Error("Frame 'Admin / Cadastros / Busca & Lista — Drawer' nao encontrado — execute STEP 0-4 primeiro");
const screen = _screen;
const row  = screen.findOne(n => n.name === "Row");
const body = screen.findOne(n => n.name === "Body");
if (!body) throw new Error("Body nao encontrado dentro do screen");

// COMPACT RE-DECLARE v3 — paste at top of every content figma_execute block
const TEXT_STYLE_MAP={"heading/page":"text-2xl/font-semibold","heading/section":"text-xl/font-semibold","heading/card":"text-lg/font-semibold","heading/sub":"text-base/font-semibold","body/default":"text-sm/font-normal","body/medium":"text-sm/font-medium","body/strong":"text-sm/font-semibold","label/default":"text-sm/font-medium","label/small":"text-xs/font-medium","label/muted":"text-xs/font-normal","data/kpi":"text-3xl/font-bold","data/stat":"text-2xl/font-bold","data/value":"text-base/font-semibold","nav/item":"text-sm/font-medium","nav/active":"text-sm/font-semibold","table/header":"text-xs/font-medium","table/cell":"text-sm/font-normal","table/cell-em":"text-sm/font-medium","badge":"text-xs/font-semibold","button/base":"text-sm/font-medium","button/sm":"text-xs/font-medium"};
const TOKEN_HEX={"surface/desktop":{r:0.969,g:0.969,b:0.973},"surface/card":{r:1,g:1,b:1},"surface/application":{r:1,g:1,b:1},"surface/active":{r:0.937,g:0.953,b:1},"surface/disabled":{r:0.933,g:0.937,b:0.945},"surface/error":{r:1,g:0.937,b:0.937},"surface/warning":{r:1,g:0.980,b:0.894},"surface/success":{r:0.937,g:0.992,b:0.949},"surface/action/approve":{r:0.133,g:0.549,b:0.247},"surface/action/disapprove":{r:0.859,g:0.196,b:0.196},"text/title":{r:0.216,g:0.231,b:0.255},"text/body":{r:0.365,g:0.392,b:0.435},"text/nav":{r:0.298,g:0.329,b:0.373},"text/label":{r:0.365,g:0.392,b:0.435},"text/active":{r:0.298,g:0.329,b:0.373},"text/disabled":{r:0.576,g:0.604,b:0.647},"text/action":{r:1,g:1,b:1},"text/link":{r:0.231,g:0.447,b:0.871},"text/error":{r:0.718,g:0.110,b:0.110},"text/success":{r:0.063,g:0.361,b:0.129},"text/warning":{r:0.502,g:0.392,b:0.016},"border/application":{r:0.886,g:0.898,b:0.918},"border/active":{r:0.239,g:0.522,b:0.957},"border/success":{r:0.733,g:0.898,b:0.773},"border/warning":{r:0.996,g:0.929,b:0.647},"form/input":{r:1,g:1,b:1},"form/inputborder":{r:0.820,g:0.835,b:0.855}};
let _textStyleCache=null;
async function _getTextStyles(){if(!_textStyleCache)_textStyleCache=await figma.getLocalTextStylesAsync();return _textStyleCache;}
async function applyTextStyle(node,styleName){const resolved=TEXT_STYLE_MAP[styleName]||styleName;const styles=await _getTextStyles();const style=styles.find(s=>s.name===resolved);if(style){await figma.loadFontAsync(style.fontName);node.textStyleId=style.id;return true;}const SP={"text-xs":12,"text-sm":14,"text-base":16,"text-lg":18,"text-xl":20,"text-2xl":24,"text-3xl":30,"text-4xl":36,"text-5xl":48};const WM={"font-normal":"Regular","font-medium":"Medium","font-semibold":"Semi Bold","font-bold":"Bold","font-thin":"Thin","font-light":"Light","font-extralight":"Extra Light","font-extrabold":"Extra Bold","font-black":"Black"};const p=resolved.split("/");const u=p[0]==="underline";const[sz,wt]=u?[p[1],p[2]]:[p[0],p[1]];if(SP[sz]&&WM[wt]){await figma.loadFontAsync({family:"Inter",style:WM[wt]});node.fontName={family:"Inter",style:WM[wt]};node.fontSize=SP[sz];if(u)node.textDecoration="UNDERLINE";}return false;}
async function makeText(parent,text,styleName,tokenName,uppercase){await figma.loadFontAsync({family:"Inter",style:"Regular"});const t=figma.createText();await applyTextStyle(t,styleName);t.characters=text;if(uppercase)t.textCase="UPPER";if(tokenName&&TOKEN_HEX[tokenName]){try{const vars=await figma.variables.getLocalVariablesAsync();const v=vars.find(x=>x.name===tokenName);if(v){t.fills=[figma.variables.setBoundVariableForPaint({type:"SOLID",color:TOKEN_HEX[tokenName]},"color",v)];}else{t.fills=[{type:"SOLID",color:TOKEN_HEX[tokenName]}];}}catch(e){t.fills=[{type:"SOLID",color:TOKEN_HEX[tokenName]}];}}parent.appendChild(t);return t;}
async function tryFont(n,t){try{await figma.loadFontAsync(n.fontName);}catch(e){await figma.loadFontAsync({family:"Inter",style:"Regular"});}n.characters=t;}
async function bindToken(node,tk){const hex=TOKEN_HEX[tk]||TOKEN_HEX["surface/desktop"];try{const vars=await figma.variables.getLocalVariablesAsync();const v=vars.find(x=>x.name===tk);if(v){node.fills=[figma.variables.setBoundVariableForPaint({type:"SOLID",color:hex},"color",v)];return;}}catch(e){}node.fills=[{type:"SOLID",color:hex}];}
function makeRow(name,gap,parent){const f=figma.createFrame();f.name=name;f.layoutMode="HORIZONTAL";f.layoutSizingHorizontal="FILL";f.itemSpacing=gap;f.fills=[];f.counterAxisAlignItems="CENTER";if(parent)parent.appendChild(f);return f;}
function makeCol(name,gap,parent){const f=figma.createFrame();f.name=name;f.layoutMode="VERTICAL";f.layoutSizingHorizontal="FILL";f.layoutSizingVertical="FILL";f.itemSpacing=gap;f.fills=[];if(parent)parent.appendChild(f);return f;}
// RE-ACQUIRE — variáveis não persistem entre figma_execute separados
const _screen = figma.currentPage.children.find(n => n.name === "Admin / Cadastros / Busca & Lista — Drawer");
if (!_screen) throw new Error("Frame 'Admin / Cadastros / Busca & Lista — Drawer' nao encontrado — execute STEP 0-4 primeiro");
const screen = _screen;
const row  = screen.findOne(n => n.name === "Row");
const body = screen.findOne(n => n.name === "Body");
if (!body) throw new Error("Body nao encontrado dentro do screen");

// COMPACT RE-DECLARE v3 — paste at top of every content figma_execute block
const TEXT_STYLE_MAP={"heading/page":"text-2xl/font-semibold","heading/section":"text-xl/font-semibold","heading/card":"text-lg/font-semibold","heading/sub":"text-base/font-semibold","body/default":"text-sm/font-normal","body/medium":"text-sm/font-medium","body/strong":"text-sm/font-semibold","label/default":"text-sm/font-medium","label/small":"text-xs/font-medium","label/muted":"text-xs/font-normal","data/kpi":"text-3xl/font-bold","data/stat":"text-2xl/font-bold","data/value":"text-base/font-semibold","nav/item":"text-sm/font-medium","nav/active":"text-sm/font-semibold","table/header":"text-xs/font-medium","table/cell":"text-sm/font-normal","table/cell-em":"text-sm/font-medium","badge":"text-xs/font-semibold","button/base":"text-sm/font-medium","button/sm":"text-xs/font-medium"};
const TOKEN_HEX={"surface/desktop":{r:0.969,g:0.969,b:0.973},"surface/card":{r:1,g:1,b:1},"surface/application":{r:1,g:1,b:1},"surface/active":{r:0.937,g:0.953,b:1},"surface/disabled":{r:0.933,g:0.937,b:0.945},"surface/error":{r:1,g:0.937,b:0.937},"surface/warning":{r:1,g:0.980,b:0.894},"surface/success":{r:0.937,g:0.992,b:0.949},"surface/action/approve":{r:0.133,g:0.549,b:0.247},"surface/action/disapprove":{r:0.859,g:0.196,b:0.196},"text/title":{r:0.216,g:0.231,b:0.255},"text/body":{r:0.365,g:0.392,b:0.435},"text/nav":{r:0.298,g:0.329,b:0.373},"text/label":{r:0.365,g:0.392,b:0.435},"text/active":{r:0.298,g:0.329,b:0.373},"text/disabled":{r:0.576,g:0.604,b:0.647},"text/action":{r:1,g:1,b:1},"text/link":{r:0.231,g:0.447,b:0.871},"text/error":{r:0.718,g:0.110,b:0.110},"text/success":{r:0.063,g:0.361,b:0.129},"text/warning":{r:0.502,g:0.392,b:0.016},"border/application":{r:0.886,g:0.898,b:0.918},"border/active":{r:0.239,g:0.522,b:0.957},"border/success":{r:0.733,g:0.898,b:0.773},"border/warning":{r:0.996,g:0.929,b:0.647},"form/input":{r:1,g:1,b:1},"form/inputborder":{r:0.820,g:0.835,b:0.855}};
let _textStyleCache=null;
async function _getTextStyles(){if(!_textStyleCache)_textStyleCache=await figma.getLocalTextStylesAsync();return _textStyleCache;}
async function applyTextStyle(node,styleName){const resolved=TEXT_STYLE_MAP[styleName]||styleName;const styles=await _getTextStyles();const style=styles.find(s=>s.name===resolved);if(style){await figma.loadFontAsync(style.fontName);node.textStyleId=style.id;return true;}const SP={"text-xs":12,"text-sm":14,"text-base":16,"text-lg":18,"text-xl":20,"text-2xl":24,"text-3xl":30,"text-4xl":36,"text-5xl":48};const WM={"font-normal":"Regular","font-medium":"Medium","font-semibold":"Semi Bold","font-bold":"Bold","font-thin":"Thin","font-light":"Light","font-extralight":"Extra Light","font-extrabold":"Extra Bold","font-black":"Black"};const p=resolved.split("/");const u=p[0]==="underline";const[sz,wt]=u?[p[1],p[2]]:[p[0],p[1]];if(SP[sz]&&WM[wt]){await figma.loadFontAsync({family:"Inter",style:WM[wt]});node.fontName={family:"Inter",style:WM[wt]};node.fontSize=SP[sz];if(u)node.textDecoration="UNDERLINE";}return false;}
async function makeText(parent,text,styleName,tokenName,uppercase){await figma.loadFontAsync({family:"Inter",style:"Regular"});const t=figma.createText();await applyTextStyle(t,styleName);t.characters=text;if(uppercase)t.textCase="UPPER";if(tokenName&&TOKEN_HEX[tokenName]){try{const vars=await figma.variables.getLocalVariablesAsync();const v=vars.find(x=>x.name===tokenName);if(v){t.fills=[figma.variables.setBoundVariableForPaint({type:"SOLID",color:TOKEN_HEX[tokenName]},"color",v)];}else{t.fills=[{type:"SOLID",color:TOKEN_HEX[tokenName]}];}}catch(e){t.fills=[{type:"SOLID",color:TOKEN_HEX[tokenName]}];}}parent.appendChild(t);return t;}
async function tryFont(n,t){try{await figma.loadFontAsync(n.fontName);}catch(e){await figma.loadFontAsync({family:"Inter",style:"Regular"});}n.characters=t;}
async function bindToken(node,tk){const hex=TOKEN_HEX[tk]||TOKEN_HEX["surface/desktop"];try{const vars=await figma.variables.getLocalVariablesAsync();const v=vars.find(x=>x.name===tk);if(v){node.fills=[figma.variables.setBoundVariableForPaint({type:"SOLID",color:hex},"color",v)];return;}}catch(e){}node.fills=[{type:"SOLID",color:hex}];}
function makeRow(name,gap,parent){const f=figma.createFrame();f.name=name;f.layoutMode="HORIZONTAL";f.layoutSizingHorizontal="FILL";f.itemSpacing=gap;f.fills=[];f.counterAxisAlignItems="CENTER";if(parent)parent.appendChild(f);return f;}
function makeCol(name,gap,parent){const f=figma.createFrame();f.name=name;f.layoutMode="VERTICAL";f.layoutSizingHorizontal="FILL";f.layoutSizingVertical="FILL";f.itemSpacing=gap;f.fills=[];if(parent)parent.appendChild(f);return f;}
// RE-ACQUIRE — variáveis não persistem entre figma_execute separados
const _screen = figma.currentPage.children.find(n => n.name === "Admin / Cadastros / Busca & Lista — Drawer");
if (!_screen) throw new Error("Frame 'Admin / Cadastros / Busca & Lista — Drawer' nao encontrado — execute STEP 0-4 primeiro");
const screen = _screen;
const row  = screen.findOne(n => n.name === "Row");
const body = screen.findOne(n => n.name === "Body");
if (!body) throw new Error("Body nao encontrado dentro do screen");

// COMPACT RE-DECLARE v3 — paste at top of every content figma_execute block
const TEXT_STYLE_MAP={"heading/page":"text-2xl/font-semibold","heading/section":"text-xl/font-semibold","heading/card":"text-lg/font-semibold","heading/sub":"text-base/font-semibold","body/default":"text-sm/font-normal","body/medium":"text-sm/font-medium","body/strong":"text-sm/font-semibold","label/default":"text-sm/font-medium","label/small":"text-xs/font-medium","label/muted":"text-xs/font-normal","data/kpi":"text-3xl/font-bold","data/stat":"text-2xl/font-bold","data/value":"text-base/font-semibold","nav/item":"text-sm/font-medium","nav/active":"text-sm/font-semibold","table/header":"text-xs/font-medium","table/cell":"text-sm/font-normal","table/cell-em":"text-sm/font-medium","badge":"text-xs/font-semibold","button/base":"text-sm/font-medium","button/sm":"text-xs/font-medium"};
const TOKEN_HEX={"surface/desktop":{r:0.969,g:0.969,b:0.973},"surface/card":{r:1,g:1,b:1},"surface/application":{r:1,g:1,b:1},"surface/active":{r:0.937,g:0.953,b:1},"surface/disabled":{r:0.933,g:0.937,b:0.945},"surface/error":{r:1,g:0.937,b:0.937},"surface/warning":{r:1,g:0.980,b:0.894},"surface/success":{r:0.937,g:0.992,b:0.949},"surface/action/approve":{r:0.133,g:0.549,b:0.247},"surface/action/disapprove":{r:0.859,g:0.196,b:0.196},"text/title":{r:0.216,g:0.231,b:0.255},"text/body":{r:0.365,g:0.392,b:0.435},"text/nav":{r:0.298,g:0.329,b:0.373},"text/label":{r:0.365,g:0.392,b:0.435},"text/active":{r:0.298,g:0.329,b:0.373},"text/disabled":{r:0.576,g:0.604,b:0.647},"text/action":{r:1,g:1,b:1},"text/link":{r:0.231,g:0.447,b:0.871},"text/error":{r:0.718,g:0.110,b:0.110},"text/success":{r:0.063,g:0.361,b:0.129},"text/warning":{r:0.502,g:0.392,b:0.016},"border/application":{r:0.886,g:0.898,b:0.918},"border/active":{r:0.239,g:0.522,b:0.957},"border/success":{r:0.733,g:0.898,b:0.773},"border/warning":{r:0.996,g:0.929,b:0.647},"form/input":{r:1,g:1,b:1},"form/inputborder":{r:0.820,g:0.835,b:0.855}};
let _textStyleCache=null;
async function _getTextStyles(){if(!_textStyleCache)_textStyleCache=await figma.getLocalTextStylesAsync();return _textStyleCache;}
async function applyTextStyle(node,styleName){const resolved=TEXT_STYLE_MAP[styleName]||styleName;const styles=await _getTextStyles();const style=styles.find(s=>s.name===resolved);if(style){await figma.loadFontAsync(style.fontName);node.textStyleId=style.id;return true;}const SP={"text-xs":12,"text-sm":14,"text-base":16,"text-lg":18,"text-xl":20,"text-2xl":24,"text-3xl":30,"text-4xl":36,"text-5xl":48};const WM={"font-normal":"Regular","font-medium":"Medium","font-semibold":"Semi Bold","font-bold":"Bold","font-thin":"Thin","font-light":"Light","font-extralight":"Extra Light","font-extrabold":"Extra Bold","font-black":"Black"};const p=resolved.split("/");const u=p[0]==="underline";const[sz,wt]=u?[p[1],p[2]]:[p[0],p[1]];if(SP[sz]&&WM[wt]){await figma.loadFontAsync({family:"Inter",style:WM[wt]});node.fontName={family:"Inter",style:WM[wt]};node.fontSize=SP[sz];if(u)node.textDecoration="UNDERLINE";}return false;}
async function makeText(parent,text,styleName,tokenName,uppercase){await figma.loadFontAsync({family:"Inter",style:"Regular"});const t=figma.createText();await applyTextStyle(t,styleName);t.characters=text;if(uppercase)t.textCase="UPPER";if(tokenName&&TOKEN_HEX[tokenName]){try{const vars=await figma.variables.getLocalVariablesAsync();const v=vars.find(x=>x.name===tokenName);if(v){t.fills=[figma.variables.setBoundVariableForPaint({type:"SOLID",color:TOKEN_HEX[tokenName]},"color",v)];}else{t.fills=[{type:"SOLID",color:TOKEN_HEX[tokenName]}];}}catch(e){t.fills=[{type:"SOLID",color:TOKEN_HEX[tokenName]}];}}parent.appendChild(t);return t;}
async function tryFont(n,t){try{await figma.loadFontAsync(n.fontName);}catch(e){await figma.loadFontAsync({family:"Inter",style:"Regular"});}n.characters=t;}
async function bindToken(node,tk){const hex=TOKEN_HEX[tk]||TOKEN_HEX["surface/desktop"];try{const vars=await figma.variables.getLocalVariablesAsync();const v=vars.find(x=>x.name===tk);if(v){node.fills=[figma.variables.setBoundVariableForPaint({type:"SOLID",color:hex},"color",v)];return;}}catch(e){}node.fills=[{type:"SOLID",color:hex}];}
function makeRow(name,gap,parent){const f=figma.createFrame();f.name=name;f.layoutMode="HORIZONTAL";f.layoutSizingHorizontal="FILL";f.itemSpacing=gap;f.fills=[];f.counterAxisAlignItems="CENTER";if(parent)parent.appendChild(f);return f;}
function makeCol(name,gap,parent){const f=figma.createFrame();f.name=name;f.layoutMode="VERTICAL";f.layoutSizingHorizontal="FILL";f.layoutSizingVertical="FILL";f.itemSpacing=gap;f.fills=[];if(parent)parent.appendChild(f);return f;}
```


---

## CAMADA 6 — Checkpoint

```
[ ] Frame "Admin / Cadastros / Busca & Lista — Drawer" criado: 1440x880px
[ ] screen.layoutMode = "VERTICAL"
[ ] Topbar instanciado de 301:1056 — primeiro filho do screen — FILL horizontal
[ ] Topbar: breadcrumb e module overrideados com tryFont()
[ ] Row: HORIZONTAL, FILL
[ ] Sidebar instanciado de 305:3092 — primeiro filho do row
[ ] Sidebar item "Cadastros" marcado como Active via setProperties
[ ] Body: VERTICAL, FILL, padding 24px, gap 24px
[ ] DataTable nodes 3393:11073/6548/9617 usados para table body — não recriados com primitivos
[ ] Todos os text nodes criados via makeText() — zero fontName/fontSize diretos
[ ] Todos os text styles vinculados ao DS via textStyleId (applyTextStyle retornou true)
[ ] Todos os tokens de cor via bindToken() — ZERO hex hardcoded nos fills
[ ] Nenhum componente DS visual recriado com primitivos (createFrame para layout estrutural E CORRETO)
[ ] Zero texto placeholder visível ("Label", "Value", "Title", "Button", "PH")
[ ] Modal/Drawer appendado ao screen como último filho, visible=false no estado padrão
[ ] Screenshot capturado após cada bloco
```

---

## CAMADA 7 — Validação Visual

Comparar screenshot do frame `Admin / Cadastros / Busca & Lista — Drawer` com referência `3134:3525`:

```
[ ] Dimensões: 1440x880 visíveis, sem overflow
[ ] Topbar: largura total, breadcrumb correto
[ ] Sidebar: item "Cadastros" destacado
[ ] Body: gutter 24px visível nos 4 lados
[ ] Componentes: contagem correta, sem instâncias extras
[ ] Sem frames brutos onde DS components deveriam estar
[ ] Sem texto placeholder visível
[ ] Fills corretos — sem branco-sobre-branco ou fundos ausentes
[ ] Layers condicionais: visible=false no estado padrão
[ ] Overlays: appendados no screen, não no body
```

---

## CAMADA 8 — Memória

```
Frame criado: Admin / Cadastros / Busca & Lista — Drawer
Sidebar ativo: "Cadastros"
Referência: 3134:3525
Shell pattern: screen (VERTICAL) → topbar (301:1056) → row (HORIZONTAL) → sidebar (305:3092) + body (FILL)
Helpers v3: TEXT_STYLE_MAP + applyTextStyle + makeText(parent, text, styleName, tokenName, uppercase?)
Text styles: node.textStyleId via applyTextStyle() — binding real ao DS
DataTable nodes: 3393:11073 (A) · 3393:6548 (B) · 3393:9617 (C) — probe before first use
Color tokens: node.fills via bindToken() — binding a variável de library
```
