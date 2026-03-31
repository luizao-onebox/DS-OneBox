---
name: design-system
description: Design system token reference for Figma variables, components, templates, and visual styles. Auto-invoke when creating UI components, styling frames, or working with design tokens. Use when user asks about colors, backgrounds, text, borders, typography, spacing, shadows, inputs, forms, navigation, sidebar, topbar, breadcrumb, tabs, modals, drawers, bottom sheet, timeline, stepper, wizard, tooltip, toast, alert, banner, progress, chart, dashboard, bar chart, line chart, donut chart, heatmap, KPI card, data visualization, widgets, metrics, analytics, button, badge, tag, data table, avatar, upload, figma, screen, layout.
---

# Quick Reference

> **Figma file:** `q3mFYxgvpAK1KxeLVvRVKX` · **Dark mode:** not implemented — `Dark Mode=False` everywhere
> **Standard screen size:** 1440×880px · **Build page:** `1599:18625`

## Component Lookup

| What you need | Wrapper node ID | Figma page |
|---------------|----------------|------------|
| Alert / Banner | `1627:22190` | 17 |
| Avatar (solo, stacked, counter) | `3010:97645` | 21 |
| Badge / Status Pill / Dot | `329:1961` · `3010:97638` · `3010:97640` | 20 |
| Button / ButtonGroup / Conference / Zoom | `3048:41684` | 09 |
| Card/Integration Status | `3415:36241` | New components |
| Chart (Bar, Line, Donut, Heatmap, KPI) | `3048:42338` | 18 |
| Clipboard / Copy-to-clipboard | `1625:55574` · `1625:55924` | 22 |
| Dashboard Widgets (stats, list, input…) | `3048:42339` | 19 |
| Data Table (toolbar + pagination + examples) | `3048:41686` | 11 |
| Drawer (filter, sidebar, large) | `3048:42541` | 15 |
| Dropdown / Datepicker / Filter panel | `3010:103259` | 13 |
| Feed/Event Item | `3415:36213` | New components |
| File Upload / Drop zone | `1627:20051` | 22 |
| Form Field Row | `3415:36275` | New components |
| Form Inputs (text, select, toggle, checkbox…) | `3006:97322` | 08 |
| Icons — 34 custom app icons (all 24×24px) | `3010:103285` | 12 |
| Modal (info, form, filter) | `3048:11790` | 14 |
| Modal/Template | `3415:36387` | New components |
| Navigation (sidebar, top bar, breadcrumb, tabs) | `3048:41685` | 10 |
| Overlay (tooltip, popover, toast, progress) | `3048:41691` | 17 |
| PageSection/DataTable | `3415:36051` | New components |
| PageSection/Header | `3415:34529` | New components |
| PageSection/KPI Row | `3415:34634` | New components |
| PageSection/Stats Row | `3415:36116` | New components |
| Pattern (SpeedDial / FAB) | `1625:56797` | 22 |
| Progress Bar / Loader | `1623:45882` | 17 |
| Review Screens (selfie, document, risk) | `3048:42543` | 23 |
| Timeline / Stepper / Wizard | `3048:41690` | 16 |

## Token Quick Lookup

| Use case | Token |
|----------|-------|
| Page / app background | `surface/desktop` |
| Card / panel background | `surface/card` |
| Primary heading text | `text/title` |
| Body / paragraph text | `text/body` |
| Disabled / muted text | `text/disabled` |
| Row dividers / borders | `border/application` |
| Input borders | `form/inputborder` |
| Primary action (blue) | `primary/600` |
| Approve / success action | `surface/action/approve` |
| Warning background | `surface/warning` |
| Error / danger background | `surface/error` |

## How to use this skill with Figma MCP tools

```
# See a component visually
figma_take_screenshot(nodeId="<wrapper-id>", fileKey="q3mFYxgvpAK1KxeLVvRVKX")

# Get code reference + screenshot for a specific variant
figma_get_design_context(nodeId="<variant-id>", fileKey="q3mFYxgvpAK1KxeLVvRVKX")

# Get structure of a large frame
figma_get_component(nodeId="<wrapper-id>", fileKey="q3mFYxgvpAK1KxeLVvRVKX")

# Extract full token + component spec in one call (use before starting a new screen)
figma_get_design_system_kit(fileKey="q3mFYxgvpAK1KxeLVvRVKX")
```

**When to use `figma_get_design_system_kit`:** Call once at the start of a session to load the complete token map and component tree. Avoids repeated individual lookups. Result can be stored as `dsKit` in context and referenced throughout the session.

Start from the Quick Reference above → pick the node ID → screenshot it → read `figma_get_design_context` for implementation detail.

---

# Design System — Color Tokens

All colors are Figma variables. Always use variable names instead of raw hex values.

## Primitives — `Color - Primitive` collection

Tailwind-compatible scale (50–950). Use primitives **only** when no semantic token fits (e.g. chart series colors, illustrations).

| Family | Use for |
|--------|---------|
| `blue/50`–`blue/950` | Primary brand, links, active states |
| `gray/50`–`gray/950` | Neutral UI, text, borders |
| `red/50`–`red/950` | Danger, errors, destructive actions |
| `orange/50`–`orange/950` | Warnings (strong), alerts |
| `yellow/50`–`yellow/950` | Warnings (soft), alerts |
| `green/50`–`green/950` | Success, approve, positive states |
| `darkblue/50`–`darkblue/950` | Secondary brand, dark surfaces |

Special: `white` (#FFFFFF), `black` (#000000)

>  Do not use other Tailwind families (slate, amber, indigo, etc.) for UI work — they have no semantic token mapping and will produce inconsistent results. Reserve them for illustrations and data visualization series only.

---

## Semantic Tokens — always prefer these for all UI work

### Surfaces (backgrounds)
| Token | Primitive | Usage |
|-------|-----------|-------|
| `surface/application` | `white` | Main app background |
| `surface/desktop` | `gray/100` | Page/desktop background |
| `surface/card` | `white` | Card backgrounds |
| `surface/active` | `blue/100` | Active/selected state bg |
| `surface/disabled` | `gray/200` | Disabled element bg |
| `surface/error` | `red/100` | Error state bg |
| `surface/warning` | `yellow/50` | Warning state bg |
| `surface/success` | `green/50` | Success state bg |
| `surface/action/approve` | `green/600` | Approve/confirm button bg |
| `surface/action/disapprove` | `red/600` | Reject/cancel button bg |

### Text
| Token | Primitive | Usage |
|-------|-----------|-------|
| `text/title` | `gray/700` | Page titles, headings |
| `text/body` | `gray/500` | Body text |
| `text/nav` | `gray/600` | Navigation labels |
| `text/tool` | `gray/600` | Toolbar text |
| `text/label` | `gray/500` | Form labels |
| `text/active` | `gray/600` | Active/selected text |
| `text/disabled` | `gray/400` | Disabled text |
| `text/action` | `white` | Text on action buttons |
| `text/link` | `blue/600` | Links |
| `text/error` | `red/700` | Error messages |
| `text/success` | `green/800` | Success messages |
| `text/warning` | `yellow/700` | Warning messages |

### Borders
| Token | Primitive | Usage |
|-------|-----------|-------|
| `border/application` | `gray/200` | Default dividers, borders |
| `border/active` | `blue/500` | Focused inputs, active outline |
| `border/success` | `green/200` | Success state border |
| `border/warning` | `yellow/200` | Warning state border |

### Forms
| Token | Primitive | Usage |
|-------|-----------|-------|
| `form/input` | `white` | Input background |
| `form/inputborder` | `gray/300` | Input border |

---

---

## Typography — DS Text Styles

**Font:** Inter · **Source:** Onebox Design System (flowbite-pro-figma-v2.10.0)

Text styles are bound directly via `node.textStyleId = style.id`.
**Never set `fontName` / `fontSize` manually on a text node that should carry a DS style.**
Use `applyTextStyle(node, styleName)` or `makeText(parent, text, styleName, tokenName)` instead.

### Full catalog — admin-relevant styles (ORIGINAL case)

| Style name | px | Weight | Usage |
|---|---|---|---|
| `text-xs/font-normal` | 12px | Regular | table/cell muted, hint text |
| `text-xs/font-medium` | 12px | Medium | table/header (UPPER), badge, button/sm, label/small |
| `text-xs/font-semibold` | 12px | Semi Bold | badge emphasis |
| `text-xs/font-bold` | 12px | Bold |  |
| `text-sm/font-normal` | 14px | Regular | body/default, table/cell, input value |
| `text-sm/font-medium` | 14px | Medium | label/default, nav/item, button/base |
| `text-sm/font-semibold` | 14px | Semi Bold | body/strong, active nav item |
| `text-sm/font-bold` | 14px | Bold | emphasized cell value |
| `text-base/font-normal` | 16px | Regular | secondary content |
| `text-base/font-medium` | 16px | Medium | form field text |
| `text-base/font-semibold` | 16px | Semi Bold | heading/sub, card sub-header, data/value |
| `text-base/font-bold` | 16px | Bold | strong secondary heading |
| `text-lg/font-normal` | 18px | Regular |  |
| `text-lg/font-medium` | 18px | Medium |  |
| `text-lg/font-semibold` | 18px | Semi Bold | heading/card, section heading in panel |
| `text-lg/font-bold` | 18px | Bold | modal heading |
| `text-xl/font-normal` | 20px | Regular |  |
| `text-xl/font-medium` | 20px | Medium |  |
| `text-xl/font-semibold` | 20px | Semi Bold | heading/section, tab section title |
| `text-xl/font-bold` | 20px | Bold | prominent section heading |
| `text-2xl/font-normal` | 24px | Regular |  |
| `text-2xl/font-medium` | 24px | Medium |  |
| `text-2xl/font-semibold` | 24px | Semi Bold | heading/page (máx 1 por screen) |
| `text-2xl/font-bold` | 24px | Bold | data/stat, prominent KPI secondary |
| `text-3xl/font-normal` | 30px | Regular |  |
| `text-3xl/font-medium` | 30px | Medium |  |
| `text-3xl/font-semibold` | 30px | Semi Bold |  |
| `text-3xl/font-bold` | 30px | Bold | data/kpi — valor numérico grande de KPI |

> All sizes exist with all 9 weights. Only the most-used combinations are shown above.
> Full list of sizes: text-xs (12px) · text-sm (14px) · text-base (16px) · text-lg (18px)
> · text-xl (20px) · text-2xl (24px) · text-3xl (30px) · text-4xl (36px) · text-5xl (48px)
> Underline variants: `underline/text-sm/font-semibold`, etc.
> Uppercase: same style name — set `node.textCase = "UPPER"` after applying style.

### Semantic shortcut map

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

### applyTextStyle() helper

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

### makeText() v3 — always use this to create text nodes

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

### Usage examples

```javascript
// Page heading
await makeText(body, "Dashboard", TEXT_STYLE_MAP["heading/page"], "text/title");

// Section heading
await makeText(section, "Conferências Recentes", TEXT_STYLE_MAP["heading/section"], "text/title");

// Body text with muted token
await makeText(card, "Última atualização: 27/02/2026", TEXT_STYLE_MAP["body/default"], "text/body");

// KPI value (large number)
await makeText(kpiCard, "94,2%", TEXT_STYLE_MAP["data/kpi"], "text/title");

// Table header in uppercase
await makeText(thead, "STATUS", TEXT_STYLE_MAP["table/header"], "text/body", true);

// Badge label
await makeText(badge, "Aprovado", TEXT_STYLE_MAP["badge"], "text/success");

// Direct DS style name (when semantic map doesn't cover it)
await makeText(panel, "Detalhes técnicos", "text-base/font-semibold", "text/nav");
```

### Anti-pattern: never set font properties directly on text nodes

```javascript
// WRONG — bypasses DS, ignores line-height/letter-spacing bound to style
t.fontName = { family:"Inter", style:"Semi Bold" };
t.fontSize = 24;

// CORRECT — binds the actual DS text style (line-height, letter-spacing, all included)
await applyTextStyle(t, "text-2xl/font-semibold");
// or via makeText:
await makeText(parent, "Título", "heading/page", "text/title");
```
---

## Spacing Scale

Standard Tailwind spacing — use these values for padding, margin, gap, width, height.

| Token | rem | px | | Token | rem | px |
|-------|-----|----|-|-------|-----|-----|
| `0` | 0 | 0px | | `14` | 3.5rem | 56px |
| `px` | 1px | 1px | | `16` | 4rem | 64px |
| `0.5` | 0.125rem | 2px | | `20` | 5rem | 80px |
| `1` | 0.25rem | 4px | | `24` | 6rem | 96px |
| `1.5` | 0.375rem | 6px | | `28` | 7rem | 112px |
| `2` | 0.5rem | 8px | | `32` | 8rem | 128px |
| `2.5` | 0.625rem | 10px | | `36` | 9rem | 144px |
| `3` | 0.75rem | 12px | | `40` | 10rem | 160px |
| `3.5` | 0.875rem | 14px | | `44` | 11rem | 176px |
| `4` | 1rem | 16px | | `48` | 12rem | 192px |
| `5` | 1.25rem | 20px | | `52` | 13rem | 208px |
| `6` | 1.5rem | 24px | | `56` | 14rem | 224px |
| `7` | 1.75rem | 28px | | `60` | 15rem | 240px |
| `8` | 2rem | 32px | | `64` | 16rem | 256px |
| `9` | 2.25rem | 36px | | `72` | 18rem | 288px |
| `10` | 2.5rem | 40px | | `80` | 20rem | 320px |
| `11` | 2.75rem | 44px | | `96` | 24rem | 384px |
| `12` | 3rem | 48px | | | | |

---

## Borders

### Border Radius
| Class | Value | | Class | Value |
|-------|-------|-|-------|-------|
| `rounded-sm` | 2px | | `rounded-2xl` | 16px |
| `rounded` | 4px | | `rounded-3xl` | 24px |
| `rounded-md` | 6px | | `rounded-full` | 9999px |
| `rounded-lg` | 8px | | `rounded-none` | 0px |
| `rounded-xl` | 12px | | | |

### Border Width
| Class | Value |
|-------|-------|
| `border-0` | 0px |
| `border` | 1px |
| `border-2` | 2px |
| `border-4` | 4px |
| `border-8` | 8px |

### Border Style
- `border-solid` — default for all visible borders
- `border-dashed` — use for placeholder areas, dropzones, or secondary outlines

---

## Shadows

### Box Shadow Scale
| Class | CSS value |
|-------|-----------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.08)` |
| `shadow` | `0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.10)` |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.05)` |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.05)` |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.04)` |
| `shadow-2xl` | `0 25px 50px rgba(0,0,0,0.25)` |

### Colored Shadows (50% opacity — match element background)
| Class | Color |
|-------|-------|
| `shadow-blue-600/50` | `rgba(28,100,242,0.5)` |
| `shadow-green-500/50` | `rgba(14,159,110,0.5)` |
| `shadow-teal-500/50` | `rgba(6,148,162,0.5)` |
| `shadow-indigo-600/50` | `rgba(88,80,236,0.5)` |
| `shadow-purple-600/50` | `rgba(126,58,242,0.5)` |
| `shadow-red-500/50` | `rgba(240,82,82,0.5)` |
| `shadow-orange-500/50` | `rgba(255,90,31,0.5)` |

Use `shadow-sm` for cards and inputs. Use `shadow-md`/`shadow-lg` for dropdowns and modals. Use colored shadows on action buttons matching the button's background color.

---

## Figma File — Page Index

File key: `q3mFYxgvpAK1KxeLVvRVKX` (Design-system-4-AI)

| Page | Name | Page ID | Status |
|------|------|---------|--------|
| 01 | Colors | `1616:13066` | Documented |
| 02 | Typography | `3002:66649` | Documented |
| 03 | Grids | `3002:66650` | Documented |
| 04 | Spacing | `3002:66651` | Documented |
| 05 | Border | `3002:66652` | Documented |
| 06 | Shadow | `3005:68739` | Documented |
| 07 | Logo | `3002:66640` | Documented |
| 08 | Forms & Inputs | `3006:97322` | Documented |
| 09 | Buttons & Actions | `3010:97327` | Documented |
| 10 | Navigation | `3010:97328` | Documented |
| 11 | Data Tables | `3010:97329` | Documented |
| 12 | Icons | `3010:103281` | Pending review |
| 13 | Dropdown & Filters | `3010:103259` | Documented |
| 14 | Modals | `3048:11790` | Documented |
| 15 | Drawers | `3048:11791` | Documented |
| 16 | Timeline & Steppers | `3010:103271` | Documented |
| 17 | Overlays & Feedback | `3010:97330` | Documented |
| 18 | Charts & Dashboards | `3010:97331` | Documented |
| 19 | Widgets | `3010:103310` | Documented |
| 20 | Indicators & Utilities | `3010:97332` | Documented |
| 21 | Avatar | `3010:97641` | Documented |
| 22 | Patterns | `3010:97334` | Documented |
| 23 | Actual system screens | `3010:97335` | Documented |
| 24 | References | `3048:26434` |  Do not use — reference/inspiration only, not DS components |
| — | Screen development playground | `1599:18625` | **Build page — all new screens go here** |

---

## Layout Patterns (Grid System)

8 layout types, each with Desktop (1536px) / Tablet (768px) / Mobile (375px) breakpoints.
All instances are in the "03 - Grids" page of the Figma file.

| Layout | Nav | Sidebar | Content | Best for |
|--------|-----|---------|---------|----------|
| **Navbar + Collapsible Sidebar** | AppNavbar | Toggle 250px↔60px | Fluid | Dashboards, admin panels |
| **Navbar + Tab Navigation** | AppNavbar | None | Tab-switched sections | Multi-section views |
| **Simple Navbar + Full Width** | Simple | None | Full width | Landing, public pages |
| **Navbar + Constrained Content** | AppNavbar | None | Max 1280px centered | Settings, forms |
| **Navbar + Fixed Sidebar** | AppNavbar | Fixed 316px | Fluid | Data-heavy apps |
| **Sidebar Nav** | None (sidebar only) | Full-height nav | Fluid | App-first, immersive tools |
| **Navbar + Full Width** | AppNavbar | None | Single full-width row | Simple pages, overviews |
| **Dual Sidebar** | None (sidebar only) | Left nav + Right panel | Fluid | Detail views, editors |

### Breakpoints
| Name | Width | Use for |
|------|-------|---------|
| Desktop | 1536px | Large screens, full layout |
| Tablet | 768px | Medium screens, collapsed nav |
| Mobile | 375px | Small screens, stacked layout |

---

## Column Proportions — % to px

In Figma `HORIZONTAL` auto-layout, percentage widths do not work directly. Use one of these approaches:

### Option A — Fixed px (recommended for precision)
Content area width = 1440px − 240px (sidebar) = **1200px**

| Proportion | Left (px) | Right (px) |
|-----------|-----------|------------|
| 60 / 40 | 720px | 480px |
| 50 / 50 | 600px | 600px |
| 70 / 30 | 840px | 360px |
| 75 / 25 | 900px | 300px |

```javascript
leftCol.resize(720, leftCol.height);
leftCol.layoutSizingHorizontal = "FIXED";
rightCol.resize(480, rightCol.height);
rightCol.layoutSizingHorizontal = "FIXED";
```

### Option B — layoutGrow (fluid, ratio-based)
```javascript
leftCol.layoutGrow = 3;  // 60%
rightCol.layoutGrow = 2; // 40%
```

---

## Conditional Rendering — Visibility by State

For components that appear only in certain states (e.g. error banners, empty states):

```javascript
// Create the component and place it normally
const banner = (await figma.getNodeByIdAsync("1627:22199")).createInstance();
parentFrame.appendChild(banner);

// Default state: hidden
banner.visible = false;

// In "Degraded" state variant: set visible = true
// Do this by creating two screen variants (Default / Degraded)
// or by annotating in the layer name: "[state=degraded] Alert Banner"
```

**Convention for state layers:**
- Name layers with state prefix: `[state=error]`, `[state=empty]`, `[state=loading]`
- Default state: `visible = true` for all layers without prefix
- Non-default states: `visible = false` unless that state is being rendered

---

## Mock Data Guidelines

Always populate components with realistic data — never leave DS placeholder text ("Label", "Value", "Title").

| Component type | Mock data approach |
|---------------|-------------------|
| KPI / Stats cards | Use domain-specific numbers with units (e.g. "12.847", "71,8%", "R$ 4.290") |
| Tables | Minimum 5–8 rows; vary status badges across rows |
| Charts | Use realistic relative proportions; label axes with domain terms |
| User lists | Use generic names (e.g. "Ana Costa", "Pedro Lima"); use Avatar placeholder |
| Dates | Use relative dates ("há 2h", "ontem", "14/03/2025") |
| Badges | Distribute status types — do not show all rows with the same badge color |

---

## Component Catalog — Buttons & Actions

**Figma page:** `09 - Buttons & Actions` · Frame: `Button-Components` (`3048:41684`)

---

### Button (main component set)

**Component set:** `1627:20576` · Property encoding: `Color={color}, Size={size}, State={state}, Outline={bool}, Icon only={bool}`

| Property | Values |
|----------|--------|
| `Color` | `Primary` · `Dark` · `Green` · `Red` · `Alternative` · `Alternative Dark` |
| `Size` | `xl` (52px h) · `l` · `base` · `sm` · `xs` |
| `State` | `Default` · `Hover` · `Focus` |
| `Outline` | `False` (filled) · `True` (outlined/ghost) |
| `Icon only` | `False` (with label) · `True` (icon only, square) |

**Common variant node IDs (State=Default) — instantiate directly:**

| Color | `Outline` | `Size` | Node ID |
|-------|-----------|--------|---------|
| `Primary` | `False` | `xl` | `1627:20577` |
| `Primary` | `False` | `l` | `1627:20581` |
| `Primary` | `False` | `base` | `1627:20585` |
| `Primary` | `False` | `sm` | `1627:20589` |
| `Primary` | `False` | `xs` | `1627:20593` |
| `Green` | `False` | `base` | `1627:20705` |
| `Red` | `False` | `base` | `1627:20765` |
| `Alternative` | `True` | `base` | `1627:21065` |

**Color → token mapping:**

| Color | Fill token | Use case |
|-------|-----------|----------|
| `Primary` | `primary/600` | Primary CTA, main actions |
| `Dark` | `gray/900` | Dark/inverted contexts |
| `Green` | `surface/action/approve` | Confirm, approve, success actions |
| `Red` | `surface/action/disapprove` | Destructive, reject, danger actions |
| `Alternative` | `border/application` outline | Secondary actions on light bg |
| `Alternative Dark` | `gray/700` outline | Secondary actions on dark bg |

**Usage rules:**
- `Outline=False` → filled button — use for the most important action per view
- `Outline=True` → ghost/outline button — use for secondary or cancel actions
- `Icon only=True` → square icon button; always pair with a tooltip
- Use `shadow-{color}/50` colored shadow on filled Primary/Green/Red buttons

**When to use each size:**

| Size | Height | Use |
|------|--------|-----|
| `xl` | 52px | Hero CTAs, prominent actions |
| `l` | 44px | Standard page-level actions |
| `base` | 36px | Most common — forms, cards |
| `sm` | 32px | Inline actions, tables, toolbars |
| `xs` | 28px | Dense UIs, tags, chips |

---

### ButtonGroup

**Component set:** `1627:20463` · Property encoding: `Type={type}, Dark Mode=False, State={state}`

| Type | Node ID | Description |
|------|---------|-------------|
| `Type=Default` | `1627:20480` | 3-segment button row — left/center/right |
| `Type=With dropdown` | `1627:20464` | Left action + right dropdown arrow |
| `Type=With stat` | `1627:20469` | Left action + right count/badge |
| `Type=Only Icon` | `1627:20475` | Icon-only segments |
| `Type=With tooltip` | `1627:20494` | Group with floating tooltip above |

>  **ButtonGroup supports exactly 3 segments.** If you need 4+ options (e.g. Hoje / 7d / 30d / Custom), use `Tabs/Pills` instead — it supports any number of options and has the same visual weight. Do not attempt to add a 4th segment to ButtonGroup.

**When to use ButtonGroup vs Pills vs Tabs:**

| Scenario | Component |
|----------|-----------|
| 2–3 toggle options, same visual row | `ButtonGroup/Type=Default` |
| 4+ toggle options | `Tabs/Pills` (`1620:23085`) |
| Page-level section switching | `Tabs/Application UI` |
| Secondary in-page navigation | `Tabs/With underline` |

- Background: `white` · Border: `border/application` · `rounded-md`
- Active segment: `gray/50` bg
- Use `Dark Mode=False` only

---

### ConferenceButton

**Component set:** `352:1439` · Property encoding: `State={state}`

| State | Node ID | Style |
|-------|---------|-------|
| `State=Approve` | `352:1438` | Green filled — `surface/action/approve` |
| `State=Disapprove` | `354:1453` | Red filled — `surface/action/disapprove` |
| `State=Disabled` | `352:1440` | Gray — `surface/disabled` |

- Fixed width 288px × 50px · `rounded` · Use exclusively for approve/reject flows
- Approve maps to `⌘A` shortcut · Disapprove maps to `⌘R`

---

### Token usage summary

| Element | Token |
|---------|-------|
| Primary button bg | `primary/600` |
| Approve button bg | `surface/action/approve` |
| Reject button bg | `surface/action/disapprove` |
| Button label | `text/action` (white) |
| Outline button border | `border/active` or `border/application` |
| Outline button text | `text/title` |
| Disabled button bg | `surface/disabled` |
| Disabled button text | `text/disabled` |
| Button group border | `border/application` |
| Button group active bg | `surface/desktop` (`gray/100`) |

---

## Component Catalog — Forms & Inputs

**Figma page:** `08 - Forms & Inputs` · Frame: `Forms/All-Input-Components`

All input components follow the prop pattern `Size={Small|Regular|Large}, State={Normal|Active|Typing|Value|Disabled|Success|Error}`. Dark mode property: `Dark mode=False` (lowercase m) for Text/Search; `Dark Mode=False` (uppercase M) for Toggle/Checkbox/Radio — property names differ in Figma, match exactly when calling `setProperties()`.

| Component | Figma frame | Sizes | Key variants / types |
|-----------|-------------|-------|----------------------|
| `Input/Text` | `1620:22601` | Small · Regular · Large | Normal, Active, Typing, Value, Disabled, Success, Error |
| `Input/Number` | `1625:48978` | Small · Regular · Large | Default, Left & Right buttons, Currency, Digits, With icon |
| `Input/Select` | `3010:103319` | Small · Regular · Large | Default, With label (floating), Input+Dropdown |
| `Input/Autocomplete` | `1627:25449` | Default · Large | Default, Default (No Icons), Advanced |
| `Input/Search` | `1627:19619` | Small · Regular | Input+Button, Input+Select+Button, 2 Icons+Button |
| `Input/Checkbox` | `1627:20292` | — | Default / Advanced · Initial, Checked, Disabled |
| `Input/Radio` | `1627:20251` | — | Default / Advanced · Initial, Checked, Disabled |
| `Input/Toggle` | `1627:20333` | SM · Default · LG | Initial, Active, Disabled |
| `Input/Textarea` | `1625:48587` | — | Default, CTA+Button, WYSIWYG, Chatroom |
| `Input/Tag` | `1627:20129` | — | With label, Without label |
| `Input/Range` | `1625:48745` | — | Value, Range, Volume, With data |

**State conventions:**
- `Normal` = empty/idle · `Active` = focused · `Typing` = has cursor + input · `Value` = filled · `Disabled` = non-interactive
- `Success` / `Error` = validation feedback states (show below input)

### Key variant node IDs for Forms

**Input/Text (`1620:22601`)** — property name: `Dark mode=False` (lowercase m)

| Variant | Node ID |
|---------|---------|
| `Size=Regular, State=Normal` | `1620:22662` |
| `Size=Regular, State=Value` | `1620:22838` |
| `Size=Regular, State=Active` | `1620:22686` |
| `Size=Regular, State=Error` | `1620:22701` |
| `Size=Small, State=Normal` | `1620:22602` |

**Input/Select (`3010:103319`)**

| Variant | Node ID |
|---------|---------|
| `Select input/Default/False/False/Regular` | `1627:19264` |
| `Select input/Default/True/False/Regular` | `1627:19273` |
| `Select input/Default/False/False/Small` | `1627:19340` |

**Input/Toggle (`1627:20333`)** — property: `Dark Mode=False` (uppercase M)

| Variant | Node ID |
|---------|---------|
| `State=Initial, Size=Default` | `1627:20355` |
| `State=Active, Size=Default` | `1627:20369` |
| `State=Initial, Size=SM` | `1627:20334` |
| `State=Active, Size=SM` | `1627:20348` |

**Input/Checkbox (`1627:20292`)** — property: `Dark Mode=False`

| Variant | Node ID |
|---------|---------|
| `State=Initial, Type=Default` | `1627:20293` |
| `State=Checked, Type=Default` | `1627:20303` |

**Input/Radio (`1627:20251`)** — property: `Dark Mode=False`

| Variant | Node ID |
|---------|---------|
| `State=Initial, Type=Default` | `1627:20252` |
| `State=Checked, Type=Default` | `1627:20257` |

**Input/Search (`1627:19619`)** — property name: `Dark mode=False` (lowercase m)

| Variant | Node ID |
|---------|---------|
| `Type=Input + Button, Size=Regular` | `1627:19713` |
| `Type=Input + Button, Size=Small` | `1627:19629` |

---

## Component Catalog — Dropdown & Filters

**Figma page:** `13 - Dropdown & Filters` · Frame: `Dropdown/All-Components`

| Component | Figma frame | Variants |
|-----------|-------------|----------|
| `Dropdown/Trigger` | `1627:22390` | Default, Only Icon |
| `Dropdown/Menu` | `1627:22517` | Default, With icons, Header, Checkbox, Radio, Toggle, With scrolling, With search |
| `Dropdown/Filter-Panel` | `1631:91326` | Default, Tabs, Accordion, Checkbox & Counter, Categories |
| `Datepicker/Input` | `1627:24054` | Regular · Range · sizes: Default · Large |
| `Datepicker/Panel` | `1627:23239` | Simple, Range, Choose Month, Choose Year, Date of Birth |

**Usage rules:**
- Use `Dropdown/Trigger` + `Dropdown/Menu` together — trigger opens menu
- Use `Dropdown/Filter-Panel` for sidebar/inline filter UIs
- Use `Datepicker/Input` as the form field — `Datepicker/Panel` is the calendar popover
- All dropdown menus: `shadow-md`, `rounded-lg`, border `border/application`

---

## Component Catalog — Navigation

**Figma page:** `10 - Navigation` · Frame: `All-Navigation-Items` (`3048:41685`)

### Left-Navigation-Sidebar

**Component set:** `305:3969`

| Variant | Node ID | Width | Description |
|---------|---------|-------|-------------|
| `Collapsed=False` | `305:3092` | 240px | Expanded sidebar — logo + menu items + sub-items |
| `Collapsed=True` | `305:3970` | 64px | Icon-only collapsed sidebar |

- Height: 824px (full viewport), padding: 16px
- Background: `surface/application` (white), right border: `border/application`
- Label color: `text/nav` · Active item: `surface/active` bg + `text/active` text

**Setting the active sidebar item:**
```javascript
const sidebar = (await figma.getNodeByIdAsync("305:3092")).createInstance();
screen.appendChild(sidebar);
sidebar.layoutSizingVertical = "FILL";

// Find the nav item by its label text and set active state
const navItems = sidebar.findAll(n => n.type === "INSTANCE");
for (const item of navItems) {
  const label = item.findOne(n => n.type === "TEXT");
  if (label && label.characters === "Dashboard") {
    item.setProperties({ "State": "Active" }); // match exact Figma property name
  }
}
```

### Top-Navigation-Bar

**Component:** `301:1056` · Single component, not a component set

| Instance | Properties | Use |
|----------|------------|-----|
| Full navbar | `Breadcrumb=True`, `Right Content=True` | Standard app navbar |
| No breadcrumb | `Breadcrumb=False`, `Right Content=True` | Simple header |
| Minimal | `Breadcrumb=False`, `Right Content=False` | Logo + module only |

- Height: 56px, full-width, background: `surface/application`
- Bottom border: 1px `border/application`

**Overriding Topbar text nodes:**
```javascript
const topbar = (await figma.getNodeByIdAsync("301:1056")).createInstance();
content.appendChild(topbar);
topbar.layoutSizingHorizontal = "FILL";

// Override breadcrumb text
const breadcrumb = topbar.findOne(n => n.type === "TEXT" && n.name === "Breadcrumb");
if (breadcrumb) await tryFont(breadcrumb, "Dashboard");

// Override module name
const moduleName = topbar.findOne(n => n.type === "TEXT" && n.name === "Module");
if (moduleName) await tryFont(moduleName, "OneDocs Admin");
```

### Breadcrumb

**Component set:** `1627:22333`

| Variant | Background | Use |
|---------|------------|-----|
| `Type=Default` | None (inline) | Inside navbar |
| `Type=With background` | `gray/50`, border `gray/200` | Standalone above content |

- Text: `text/nav`, separator: `›`, active crumb: `text/link` (`blue/600`)

### Tabs

**Component set:** `1620:23012`

| Style | Node IDs | Use |
|-------|----------|-----|
| `Tab` | `1620:23013` / `1620:23033` (Icon=F/T) | Bordered tab bar |
| `Pills` | `1620:23085–23166` | Rounded pill buttons — ideal for 4+ options |
| `With underline` | `1620:23107–23141` | Bottom-border only, secondary nav |
| `Application UI` | `1620:23179–23207` | Full card tab (white bg, shadow) |

**Usage rules:**
- `Left-Navigation-Sidebar` + `Top-Navigation-Bar` = standard app shell
- `Tabs/Application UI` = page-level section switching
- `Tabs/With underline` = secondary in-page navigation
- `Tabs/Pills` = filter-style switching, or any group of 4+ options

---

## Component Catalog — Icons

**Figma page:** `12 - Icons`

### Custom App Icons (`3010:103285`) — 34 icons, all 24×24px

| Icon name | Usage |
|-----------|-------|
| `Ico-material/search` | Search bars |
| `Ico-material/left_panel_close` | Collapse sidebar |
| `Ico-material/left_panel_open` | Expand sidebar |
| `Ico-material/notifications` | Notification bell |
| `Ico-material/schedule` | Time/schedule |
| `Ico-material/home` | Home nav link |
| `Ico-material/zoom_in` | Zoom in |
| `Ico-material/zoom_out` | Zoom out |
| `Ico-material/arrows_output` | Expand/fullscreen |
| `Ico-material/arrows_input` | Compress/exit fullscreen |
| `Ico-material/settings` | Settings / config |
| `Ico-material/help` | Help / tooltip trigger |
| `Ico-material/keyboard_arrow_down` | Dropdown chevron |
| `Ico-material/close` | Close / dismiss |
| `Ico-material/plus` | Add / create |
| `Ico-material/minus` | Remove / decrease |
| `Ico-material/cursor` | Pointer / select tool |
| `Ico-material/rotate_90` | Rotate image |
| `Ico-material/flip` | Flip image |
| `Ico-material/crop` | Crop image |
| `Ico-material/apps` | Grid / apps menu |
| `Ico-material/document` | Document / file |
| `Ico-material/conference` | Video conference |
| `Ico-material/check` | Success / confirm |
| `Ico-material/report` | Warning / report |
| `Ico-material/dashboard` | Dashboard nav |
| `Ico-material/database` | Database / data |
| `Ico-material/edit_note` | Edit / notes |

For additional icons use the **Material Icons** library (`3012:4`) — use `Style=Outlined` to match the custom icon visual style.

---

## Component Catalog — Data Tables

**Figma page:** `11 - Data Tables` · Frame: `All-DataTable-Items` (`3048:41686`)

### DataTable-Toolbar (`1631:97339`)

| Type | Description | When to use |
|------|-------------|-------------|
| `Type=CTA + Button Group` | Action button + grouped controls | Primary action + view switching |
| `Type=Stats + Update Button` | Metric summary + refresh CTA | Live/refreshable data |
| `Type=Two Levels` | Two-row header — title + filter row | Tables with many filter options |
| `Type=Heading & Description` | Title with subtitle | Informational tables |
| `Type=With Filters` | Inline filter controls | Filterable data |
| `Type=Tabs` | Tabbed navigation | Categorized table views |

### DataTable-Pagination (`1627:26879`)

| Type | Description |
|------|-------------|
| `Type=Default` | Standard page number list |
| `Type=Previous & Next` | Simple Prev/Next — use for small datasets |
| `Type=More Pages` | With ellipsis — use for 5+ pages |
| `Type=More Pages Advanced` | With page-jump input |
| `Type=Table Data` | Shows row count + page info |

### DataTable Components — Additional nodes (`3393:11073`, `3393:6548`, `3393:9617`)

Three DataTable component nodes added from the DS. Probe with `figma_get_component` at session start to read exact property names and variants before calling `setProperties`.

| Node ID | Role | How to instantiate |
|---|---|---|
| `3393:11073` | DataTable component A | `(await figma.getNodeByIdAsync("3393:11073")).createInstance()` |
| `3393:6548`  | DataTable component B | `(await figma.getNodeByIdAsync("3393:6548")).createInstance()` |
| `3393:9617`  | DataTable component C | `(await figma.getNodeByIdAsync("3393:9617")).createInstance()` |

**Rule:** always run `figma_get_component({ nodeId: "3393:11073" })` (and the other two) at session start to discover actual variant property names. Store results in COMPONENT_REGISTRY under `"DataTable/A"`, `"DataTable/B"`, `"DataTable/C"`.

### Usage rules
- Compose full table: `DataTable-Toolbar` + table body (from new nodes above) + `DataTable-Pagination`
- All cells: `text-sm`, `text/body`, `border/application` row dividers
- Header row: `surface/desktop` bg, `text/title` label color
- **Column type guide:**

| Column content | Render as |
|---------------|-----------|
| Text label | Plain text, `text/body` |
| Status / category | `Badge/Components` (color per status) |
| Number / count | Plain text, right-aligned |
| Relative time | Plain text, `text/body` |
| SLA / deadline | Badge or colored text (red if overdue, yellow if near) |
| Boolean / active | `Input/Toggle` |

---

## Component Catalog — Modals

**Figma page:** `14 - Modals`

### Modal/Content

**Frame:** `3048:14338` · Naming: `Modal/{type}/{size}/False/{breakpoint}`

| Type | Sizes | Use |
|------|-------|-----|
| `Info` | SM / Default / LG / XL | Long-form text + single CTA |
| `Pop-up` | SM | Destructive confirmations (delete, logout) |
| `With forms` | SM | Authentication, short data entry |
| `Crypto wallet` | SM | Any picker/selection list |

- All modals: `shadow-2xl`, `rounded-xl`, `surface/card` bg, overlay: `black` 50%

**When to use each size:**

| Size | Width | Use |
|------|-------|-----|
| SM | 416px | Confirmations, short forms |
| Default | 640px | Standard informational dialogs |
| LG | 864px | Detailed content, multi-field forms |
| XL | 1248px | Full-screen-like overlays, complex editors |

### Modal/Filter

**Frame:** `1631:84238`

| Type | Desktop | Use |
|------|---------|-----|
| `Default` | 448px | Simple checkbox list |
| `Tabs` | 672px | Filtering across 2+ dimensions |
| `Datepicker & Checkboxes` | 448px | Date range + checkboxes |
| `Advanced Inputs` | 672px | Data-heavy views with multiple input types |

- Footer always: `Apply Filters` (primary) + `Reset` (ghost)

---

## Component Catalog — Drawers

**Figma page:** `15 - Drawers` · Frame: `All-Drawer-Items` (`3048:42541`)

### Drawer-Filter variants

| Type | Node ID | Width | Use |
|------|---------|-------|-----|
| `Type=Default` | `1631:88049` | 320px | Starting point for any filter panel |
| `Type=Filter Category` | `1631:87989` | 384px | Category tree expanded |
| `Type=Filter Brand` | `1631:88209` | 384px | Brand checkboxes |
| `Type=Filter Price` | `1631:88334` | 384px | Price range slider |
| `Type=Large Drawer` | `1631:88943` | 512px | Multi-section filters |
| `Type=Advanced` | `1631:89187` | 448px | Complex form controls |

**When to use each drawer type:**

| Scenario | Drawer type |
|----------|-------------|
| Basic checkbox filter | `Type=Default` |
| Single expanded filter dimension | `Type=Filter *` matching the active section |
| 2+ complex filter sections | `Type=Large Drawer` |
| Form inputs (selects, toggles, range) | `Type=Advanced` |
| Custom drawer from scratch | `Drawer/Sidebar-Right` (`365:2379`) |

- All drawers: slide in from right, `shadow-lg`, overlay `black` 50%, close on backdrop click

---

## Component Catalog — Timeline & Steppers

**Figma page:** `16 - Timeline & Steppers`

### Timeline (`1625:58679`)

| Type | Desktop Node ID | Use |
|------|----------------|-----|
| `Type=Default` | `1625:58680` | General event feed, changelog |
| `Type=Activity log` | `1625:58726` | Audit trails, user action logs |
| `Type=Grouped` | `1625:58943` | Multi-day event feeds |
| `Type=Stepper` | `1625:58836` | Process/approval tracking |

### Steppers (`1626:24765`) — indicator strip only

| Type | Desktop Node ID | Use |
|------|----------------|-----|
| `Type=Default` | `1626:24766` | Circle dots + labels |
| `Type=Number & Description` | `1626:24774` | Numbered + description |
| `Type=Progress bar` | `1626:24795` | Filled progress bar |
| `Type=Vertical` | `1626:24808` | Side-panel wizards |

### Stepper-Wizard (`1626:24988`) — complete page template

| Type | Desktop Node ID |
|------|----------------|
| `Type=Default` | `1626:24989` |
| `Type=Number & Description` | `1626:24999` |
| `Type=Progress bar` | `1626:25030` |

### Token usage
| Element | Token |
|---------|-------|
| Step active indicator | `border/active` + `surface/active` |
| Step completed | `surface/action/approve` |
| Step upcoming | `gray/300` |
| Wizard content bg | `surface/application` |

---

## Component Catalog — Dashboard Widgets

**Figma page:** `19 - Widgets` · Frame: `All-Items-Widgets` (`3048:42339`)

### Stats-Widget (`1631:101669`) — KPI tiles

| Type | Node ID | Description | When to use |
|------|---------|-------------|-------------|
| `Type=Default` | `1631:101670` | Label + value only | Simple metric with no trend |
| `Type=With right icon` | `1631:101674` | Value + icon right | Metric with visual category indicator |
| `Type=Stat & Percent` | `1631:101679` | Value + % change badge | **Metric with ↑↓ variation vs period** |
| `Type=Icon + Text + Stats` | `1631:101686` | Icon + label + metric | Metric with strong category icon |
| `Type=Progress bar` | `1631:101697` | Value + linear progress | Metric with completion rate (0–100%) |
| `Type=BG Color` | `1631:101704` | Colored bg KPI tile | High-emphasis metrics, status overview |
| `Type=Dropdown & link` | `1631:101709` | Value + dropdown + link | Metric with period selector |

**Variant selection guide:**
| Dashboard situation | Use this variant |
|--------------------|-----------------|
| "Cadastros Hoje — 12.847 (+18%)" | `Type=Stat & Percent` — `1631:101679` |
| "Taxa de Conclusão — 71,8% (9.234 concluídos)" | `Type=Stat & Percent` — `1631:101679` |
| "Pendências — 2.891 (847 em conferência)" | `Type=Default` or `Type=With right icon` |
| "Reprovações — 722 (312 fraude · 410 qualidade)" | `Type=Icon + Text + Stats` |

### Header-Widget (`1631:100787`) — panel headers

| Type | Node ID | When to use |
|------|---------|-------------|
| `Type=Stats + Changes` | `1631:100788` | Metric + delta ↑↓ in panel header |
| `Type=Link + Title` | `1631:100814` | Title + "Ver tudo" link |
| `Type=Heading` | `1631:100848` | Plain section heading |
| `Type=Tabs` | `1631:100867` | Title + tab switcher |
| `Type=2 dropdowns` | `1631:100851` | Title + 2 filter dropdowns |

### Footer-Widget (`1631:101243`) — panel footers

| Type | Node ID | When to use |
|------|---------|-------------|
| `Type=Button` | `1631:101294` | Single CTA button |
| `Type=2 Buttons` | `1631:101296` | Two action buttons |
| `Type=Stats` | `1631:101258` | Summary stats row |
| `Type=3 Series` | `1631:101284` | 3 legend items with color dots |
| `Type=Days` | `1631:101358` | Day-range selector (7d/30d/90d) |

### List-Widget (`1631:104975`)

| Type | Node ID | Use |
|------|---------|-----|
| `Type=Users + Value` | `1631:104976` | Leaderboard / ranking |
| `Type=Users + Button` | `1631:105050` | User list with action per row |
| `Type=Transactions` | `1631:105630` | Transaction rows with amount + status |

### Usage rules
- **Compose panels:** `Header-Widget` → content → `Footer-Widget`
- **Stats-Widget** tiles: responsive grid at top of dashboard page
- All widgets: `surface/card` bg · `shadow-sm` · `rounded-xl` · `border/application` border

---

## Component Catalog — Overlays & Feedback

**Figma page:** `17 - Overlays & Feedback`

### Alert/Components (`1627:22190`)

5 variants · Property encoding: `Color={color}`

| Color | Node ID | Use case |
|-------|---------|----------|
| `Color=Success` | `1627:22191` | Operation completed |
| `Color=Danger` | `1627:22199` | Error — action failed or blocked |
| `Color=Info` | `1627:22207` | Neutral system message |
| `Color=Warning` | `1627:22215` | Caution — action has consequences |
| `Color=Default` | `1627:22223` | Generic/neutral banner |

>  **Never override fills on Alert instances.** The color is controlled entirely by the `Color` prop. Use `Color=Danger` for errors — do not manually apply `surface/error` or any token to the fill of an Alert instance.

**When to use each Alert color:**

| Situation | Use |
|-----------|-----|
| System degraded, integration offline | `Color=Danger` (`1627:22199`) |
| Pending action, approaching deadline | `Color=Warning` (`1627:22215`) |
| Background sync completed | `Color=Success` (`1627:22191`) |
| Informational message, no urgency | `Color=Info` (`1627:22207`) |
| General neutral message | `Color=Default` (`1627:22223`) |

**Overriding Alert text:**
```javascript
const alert = (await figma.getNodeByIdAsync("1627:22199")).createInstance(); // Color=Danger
parentFrame.appendChild(alert);

const title = alert.findOne(n => n.type === "TEXT" && n.name === "Title");
if (title) await tryFont(title, "Sistema em contingência — 2 integrações offline");

const body = alert.findOne(n => n.type === "TEXT" && n.name === "Description");
if (body) await tryFont(body, "Ver Integrações →");
```

### Toasts (`3046:16253`)

| Variant | Node ID | Use |
|---------|---------|-----|
| `Toast/Default/Dark-Mode=False` | `1627:28061` | Success/error confirmations |
| `Toast/Interactive/Dark-Mode=False` | `1627:28049` | Toast with undo/action buttons |
| `Toast/Push-Notification/Dark-Mode=False` | `1627:28036` | Push notification style |

### Progress/Components (`1623:45882`)

| Key nodes | Node ID | Use |
|-----------|---------|-----|
| `Color=Primary, Value=75` | `1623:45889` | 75% filled |
| `Color=Primary, Value=50` | `1623:45883` | 50% filled |
| `Color=Green, Value=100` | `1623:45925` | Completion/success |

- Use `Color=Primary` as default; `Color=Green` for success; `Color=Orange`/`Yellow` for warning

### Usage rules
- **Tooltip** → hover hints only; never put critical info in a tooltip
- **Popover** → click-triggered panels with richer content
- **Toast** → transient feedback after an action; max 1–2 visible at a time
- **Alert** → persistent inline status messages; place above the affected content area

---

## Component Catalog — Charts & Dashboards

**Figma page:** `18 - Charts & Dashboards` · Frame: `Chart/All-Components` (`3048:42338`)

All charts follow a two-tier sizing:
- **LG** — full dashboard widget (Desktop 1254px)
- **MD** — compact card (~407px), for multi-column dashboard grids

**Chart color series:** Use primitive tokens for chart series only — `blue/500`, `green/500`, `orange/400`, `red/400`, `purple/500`. Never use `brand/primary` (does not exist).

### Chart/Bar-Horizontal (`3010:103251`)

| Component | Node ID | Size |
|-----------|---------|------|
| `LG/Horizontal Bar/Desktop` | `1616:33691` | 1254px |
| `MD/Horizontal` | `1616:31512` | 407px |

### Chart/Bar-Vertical (`3010:103249`)

| Component | Node ID | Size |
|-----------|---------|------|
| `LG/Vertical Bar/Desktop` | `1616:33703` | 1254px |
| `MD/Stacked charts` | `1616:31364` | 407px |
| `MD/2 series column` | `1616:31385` | 407px |

### Chart/Line (`3010:103252`)

| Component | Node ID | Size |
|-----------|---------|------|
| `LG/2 Series Line/Desktop` | `1616:33679` | 1254px |
| `MD/Area chart` | `1616:31188` | 407px |
| `MD/Line chart` | `1616:31491` | 407px |

### Chart/Donut (`3010:103245`)

| Component | Node ID | Size |
|-----------|---------|------|
| `LG/Split + Donut/Desktop` | `1616:33719` | 1254px |
| `MD/Radial + Label` | `1616:31235` | 407px |

### Chart/Heatmap (`3010:103247`)

| Component | Node ID | Size |
|-----------|---------|------|
| `LG/Heatmap/Desktop` | `1616:33715` | 1254px |

### Chart/KPI-Donut (`3010:103255`)

| Component | Node ID | Size |
|-----------|---------|------|
| `LG/Split + Stats/Desktop` | `1616:33829` | 1254px |
| `MD/Radial chart` | `1616:31376` | 407px |

### Chart selection guide

| Data type | Best chart |
|-----------|-----------|
| Funnel / conversion steps | `Chart/Bar-Horizontal` LG |
| Time series trend | `Chart/Line` LG |
| Composition / share | `Chart/Donut` |
| Performance vs target | `Chart/KPI-Donut` |
| Distribution comparison | `Chart/Bar-Vertical` |
| Correlation matrix | `Chart/Heatmap` |
| Dashboard KPI + trend | `Chart/KPI-Line` MD |

### Usage rules
- **LG** → full-width dashboard sections
- **MD** → 2–3 column dashboard grids
- Always pair `LG/*` with `MD/*` equivalent when designing responsive dashboards

---

## Component Catalog — Indicators & Utilities

**Figma page:** `20 - Indicators & Utilities`

### Badge/Components (`3010:97638`) — status labels

| Key nodes | Node ID | Use |
|-----------|---------|-----|
| `Large/Primary/False` | `1625:47571` | Default info label |
| `Large/Green/False` | `1625:47575` | Approved · Active · Success |
| `Large/Red/False` | `1625:47583` | Rejected · Error · Critical |
| `Large/Yellow/True` | `1625:47675` | Pending · Warning · Review |
| `Large/Gray/False` | `1625:47587` | Inactive · Draft · Neutral |
| `Small/Primary/False` | `1625:47603` | Inline table badge |
| `Small/Green/True` | `1625:47703` | Small success with icon |

**Badge color selection guide:**

| Status meaning | Badge color | Token |
|---------------|-------------|-------|
| Approved / Active / Success | Green | `status/success` |
| Rejected / Error / Critical | Red | `status/danger` |
| Pending / Warning / Review | Yellow | `status/warning` |
| Inactive / Draft / Neutral | Gray | `gray/500` |
| Selected / Info | Primary | `primary/600` |

- Default to `Small` for inline table badges; `Large` for standalone labels

---

## Component Catalog — Avatar

**Figma page:** `21 - Avatar`

| Component | Node ID | Size | Use |
|-----------|---------|------|-----|
| `Avatar/Circle/Regular/False/False` | `1628:21363` | 32px | Tables, feeds |
| `Avatar/Circle/SM/False/False` | `1628:21367` | 24px | Compact rows |
| `Avatar/Circle/MD/False/False` | `1628:21364` | 48px | Cards, drawers |
| `Avatar/Circle/Regular/True/False` | `1628:21388` | 32px | Initials placeholder |
| `Avatar/Rounded/Default/False/False` | `1628:21358` | 32px | Profile cards |
| `Avatar/Stacked/Regular/False/False` | `1628:21413` | 32px | Collaboration indicators |
| `Avatar/With counter/Regular/False/False` | `1628:21433` | 32px | Group with overflow (+N) |

---

## Implemented Screens — Verification Review

**Figma page:** `23 - Actual system screens` · Frame: `Screen/All-Verification-Review` (`3048:42543`)

16 production screens (1440×880px). Organized in 4-column semantic grid.

| Column | Flow | Screens |
|--------|------|---------|
| Col 1 | Selfie Review | 10 screens |
| Col 2 | ID Document Review | 3 screens |
| Col 3 | Unstructured Document | 2 screens |
| Col 4 | Risk Analysis | 1 screen |

All use: **Navbar + Fixed Right Sidebar** · Right sidebar: AI rejection suggestions · Bottom: `Approve (⌘A)` / `Reject (⌘R)`

### Col 1 — Selfie Review

| Row | Node ID | Description |
|-----|---------|-------------|
| 0 | `3046:19964` | Default review state |
| 1 | `3046:19935` | Rejection + tooltip overlay |
| 2 | `3046:20024` | Reject reason panel open |
| 3 | `3046:20053` | Crop tool active |
| 4 | `3046:20115` | Split-view compare |
| 5 | `3046:20085` | Rotate tool |
| 6 | `3046:20175` | Zoom in |
| 7 | `3046:20145` | Zoom out |
| 8 | `3046:20236` | Selfie + ID doc, selfie selected |
| 9 | `3046:20205` | Selfie + ID doc, doc selected |

---

## figma-console Tool Reference

All Figma operations use figma-console MCP tools. Running in **Local/Desktop Bridge mode** — 56+ tools available.

### Tool Quick Reference

| Tool | When to use |
|------|-------------|
| `figma_execute` | Create/modify nodes, run any Figma Plugin API code |
| `figma_take_screenshot` | Capture current viewport or a specific node |
| `figma_get_variables` | List all design tokens in the file |
| `figma_get_design_system_kit` | Extract full token + component spec in one call — use at session start |
| `figma_get_selection` | Get IDs of currently selected nodes |
| `figma_get_component` | Get component metadata by node ID |
| `figma_get_styles` | Get color, text, and effect styles |
| `figma_get_console_logs` | Debug errors from `figma_execute` calls |
| `figma_clear_console` | Clear the log buffer before a new operation |
| `figma_get_status` | Check Desktop Bridge connection |
| `figma_batch_create_variables` | Create up to 100 variables in one call |
| `figma_batch_update_variables` | Update up to 100 variable values in one call |
| `figma_navigate` | Open a Figma URL in the desktop app |

### Debugging workflow

If `figma_execute` returns an error or unexpected result:
1. Call `figma_get_console_logs` to see plugin-side errors
2. Call `figma_take_screenshot` to see current visual state
3. Fix and re-run — do not retry the same failing code unchanged

---

## Component Instantiation Patterns

All creation runs through `figma_execute`. Pass the code blocks below as the `code` parameter.

> **Required async APIs:**
> - `await figma.setCurrentPageAsync(page)` — not `figma.currentPage = page`
> - `await figma.variables.getLocalVariablesAsync()` — not `getLocalVariables()`
> - `await figma.getNodeByIdAsync("id")` — not `figma.getNodeById("id")`

```javascript
// 1. Instantiate a component variant by node ID
const comp = await figma.getNodeByIdAsync("VARIANT_NODE_ID");
const inst = comp.createInstance();
parentFrame.appendChild(inst);

// 2. Instantiate and resize
inst.resize(width, height);

// 3. Override text inside an instance
// IMPORTANT: font weight is "Semi Bold" (with space), NOT "SemiBold"
async function tryFont(node, text) {
  try { await figma.loadFontAsync(node.fontName); } catch(e) {
    await figma.loadFontAsync({ family: node.fontName.family, style: "Regular" });
  }
  node.characters = text;
}
const label = inst.findOne(n => n.type === "TEXT" && n.name === "Label");
if (label) await tryFont(label, "New text");

// 4. Set variant properties — property names are case-sensitive, match Figma exactly
inst.setProperties({ "Type": "Default", "Dark Mode": false });

// 5. Standard screen scaffold (Desktop 1440×880px)
// screen is VERTICAL: topbar full-width on top, row (sidebar + body) below
const screen = figma.createFrame();
screen.name = "Screen / Name";
screen.resize(1440, 880);
screen.layoutMode = "VERTICAL";
screen.itemSpacing = 0;
screen.fills = [{ type: "SOLID", color: { r: 0.969, g: 0.969, b: 0.973 } }]; // surface/desktop = gray/100
figma.currentPage.appendChild(screen);

// 6. Topbar (full 1440px) → then row with sidebar + body
const topbar = (await figma.getNodeByIdAsync("301:1056")).createInstance();
topbar.layoutSizingHorizontal = "FILL";
screen.appendChild(topbar);

const row = figma.createFrame();
row.name = "Row";
row.layoutMode = "HORIZONTAL";
row.layoutSizingHorizontal = "FILL";
row.layoutSizingVertical = "FILL";
row.itemSpacing = 0;
row.fills = [];
screen.appendChild(row);

const sidebar = (await figma.getNodeByIdAsync("305:3092")).createInstance();
sidebar.layoutSizingVertical = "FILL";
row.appendChild(sidebar);

const body = figma.createFrame();
body.name = "Body";
body.layoutMode = "VERTICAL";
body.layoutSizingHorizontal = "FILL";
body.layoutSizingVertical = "FILL";
body.paddingTop = 24; body.paddingBottom = 24;
body.paddingLeft = 24; body.paddingRight = 24;
body.itemSpacing = 24;
body.fills = [];
row.appendChild(body);

// 7. Bind a token variable to a fill (async)
const allVars = await figma.variables.getLocalVariablesAsync();
const variable = allVars.find(v => v.name === "surface/card");
node.fills = [figma.variables.setBoundVariableForPaint(
  { type: "SOLID", color: { r: 1, g: 1, b: 1 } }, "color", variable
)];

// 8. Create two-column layout (60/40 = 720px/480px in 1200px content area)
const row = figma.createFrame();
row.layoutMode = "HORIZONTAL";
row.itemSpacing = 24;
row.layoutSizingHorizontal = "FILL";
row.primaryAxisSizingMode = "FIXED";

const leftCol = figma.createFrame();
leftCol.resize(720, 400);
leftCol.layoutSizingHorizontal = "FIXED";

const rightCol = figma.createFrame();
rightCol.resize(456, 400); // 1200 - 720 - 24 (gap) = 456px
rightCol.layoutSizingHorizontal = "FIXED";

row.appendChild(leftCol);
row.appendChild(rightCol);
```

---

## Screen Composition Workflow

1. **Navigate to Screen development playground** (`1599:18625`) — wait 300ms after switching
   ```javascript
   const buildPage = figma.root.children.find(p => p.id === "1599:18625");
   await figma.setCurrentPageAsync(buildPage);
   await new Promise(r => setTimeout(r, 300));
   ```

2. **Create outer screen frame** — 1440×880px, **vertical** auto-layout, `surface/desktop` fill
   ```javascript
   const screen = figma.createFrame();
   screen.name = "Screen / Section / Name";
   screen.resize(1440, 880);
   screen.layoutMode = "VERTICAL";  // ← VERTICAL: topbar on top, row below
   screen.itemSpacing = 0;
   screen.fills = [{ type: "SOLID", color: { r: 0.969, g: 0.969, b: 0.973 } }];
   figma.currentPage.appendChild(screen);
   ```

3. **Instantiate Topbar** — node `301:1056` — first child, full 1440px width
   ```javascript
   const topbar = (await figma.getNodeByIdAsync("301:1056")).createInstance();
   topbar.layoutSizingHorizontal = "FILL";
   screen.appendChild(topbar);
   ```

4. **Create row frame** — horizontal, holds sidebar + body side by side
   ```javascript
   const row = figma.createFrame();
   row.name = "Row";
   row.layoutMode = "HORIZONTAL";
   row.layoutSizingHorizontal = "FILL";
   row.layoutSizingVertical = "FILL";
   row.itemSpacing = 0;
   row.fills = [];
   screen.appendChild(row);
   ```

5. **Instantiate Sidebar** — node `305:3092`, first child of row
   ```javascript
   const sidebar = (await figma.getNodeByIdAsync("305:3092")).createInstance();
   sidebar.layoutSizingVertical = "FILL";
   row.appendChild(sidebar);
   ```

6. **Create Body frame** — padding 24px, gap 24px, vertical — fills remaining width
   ```javascript
   const body = figma.createFrame();
   body.name = "Body";
   body.layoutMode = "VERTICAL";
   body.layoutSizingHorizontal = "FILL";
   body.layoutSizingVertical = "FILL";
   body.paddingTop = 24;
   body.paddingBottom = 24;
   body.paddingLeft = 24;
   body.paddingRight = 24;
   body.itemSpacing = 24;
   body.fills = [];
   row.appendChild(body);
   ```

7. **Instantiate DS components** — use variant node IDs from the catalog above
   ```javascript
   const btn = (await figma.getNodeByIdAsync("1627:20585")).createInstance();
   body.appendChild(btn);
   ```

8. **Override text** — use `tryFont()` (handles font load failures)
   ```javascript
   const label = btn.findOne(n => n.type === "TEXT");
   if (label) await tryFont(label, "Aprovar");
   ```

9. **Screenshot to verify** — after each major section
   Call `figma_take_screenshot` with the screen node ID.

10. **Bind token variables** — via `figma_execute`
    ```javascript
    const allVars = await figma.variables.getLocalVariablesAsync();
    const v = allVars.find(v => v.name === "surface/card");
    const node = await figma.getNodeByIdAsync("NODE_ID");
    node.fills = [figma.variables.setBoundVariableForPaint(
      { type: "SOLID", color: { r: 1, g: 1, b: 1 } }, "color", v
    )];
    ```

**Golden rule: always instantiate DS components from their node ID — never recreate with primitives any component that already exists in the DS (pages 08–22).**

**Structural layout frames are the exception:** `figma.createFrame()` is correct and expected for containers that do not exist as DS components — specifically `screen`, `row`, `body`, and split columns (e.g. a 2-col layout wrapper). These are pure structural scaffolding.

The rule in one sentence: **if it has a node ID in the Component Catalog, instantiate it; if it is layout scaffolding with no DS equivalent, `createFrame()` is correct.**

### PageSection components — NEVER substitute with createFrame()

The components below are **DS components, not layout scaffolding**. They MUST be instantiated from their node IDs. Using `createFrame()` + individual sub-component instances instead is the single most common anti-pattern.

| Screen section | Component | Node ID | Replaces |
|----------------|-----------|---------|----------|
| Page header (title + actions row) | `PageSection/Header` | `3415:34529` | `createFrame()` headerRow + makeText + button |
| KPI metrics row | `PageSection/KPI Row` | `3415:34634` | `createFrame()` kpiRow + N × Stats-Widget |
| Stats grid (3/4/6 stats) | `PageSection/Stats Row` | `3415:36116` | `createFrame()` statsRow + N × Stats-Widget |
| DataTable (toolbar + body + pagination) | `PageSection/DataTable` | `3415:36051` | `createFrame()` tableCard + toolbar + dt + pagin |
| Event/audit feed item | `Feed/Event Item` | `3415:36213` | manual colored-border card |
| Integration status card | `Card/Integration Status` | `3415:36241` | manual status badge card |
| Form field row (label + input) | `Form/Field Row` | `3415:36275` | `createFrame()` row + label text + input |
| Modal overlay | `Modal/Template` | `3415:36387` | `Modal/Content` (3048:14338, FRAME — .clone() only if no alternative) |

```javascript
// ❌ WRONG — building a DataTable section with primitives
const tableCard = figma.createFrame();
tableCard.layoutMode = 'VERTICAL';
const toolbar = (await figma.getNodeByIdAsync('1631:97429')).createInstance();
tableCard.appendChild(toolbar);
const dt = (await figma.getNodeByIdAsync('3393:11140')).createInstance();
tableCard.appendChild(dt);
const pagin = (await figma.getNodeByIdAsync('1627:26880')).createInstance();
tableCard.appendChild(pagin);

// ✅ CORRECT — instantiate the PageSection/DataTable composite component
const tableSection = (await figma.getNodeByIdAsync('3415:36051')).createInstance();
body.appendChild(tableSection);
tableSection.layoutSizingHorizontal = 'FILL';

// ❌ WRONG — building a KPI row with primitives
const kpiRow = figma.createFrame();
kpiRow.layoutMode = 'HORIZONTAL';
const card1 = (await figma.getNodeByIdAsync('1631:101679')).createInstance();
kpiRow.appendChild(card1);

// ✅ CORRECT — instantiate the PageSection/KPI Row composite component
const kpiSection = (await figma.getNodeByIdAsync('3415:34634')).createInstance();
body.appendChild(kpiSection);
kpiSection.layoutSizingHorizontal = 'FILL';

// ❌ WRONG — building a page header with primitives
const headerRow = figma.createFrame();
headerRow.layoutMode = 'HORIZONTAL';
await makeText(headerRow, 'Dashboard', 'heading/page', 'text/title');
const btn = (await figma.getNodeByIdAsync('1627:20589')).createInstance();
headerRow.appendChild(btn);

// ✅ CORRECT — instantiate the PageSection/Header composite component
const pageHeader = (await figma.getNodeByIdAsync('3415:34529')).createInstance();
body.appendChild(pageHeader);
pageHeader.layoutSizingHorizontal = 'FILL';
// Override title text inside the instance using tryFont()
```

---

## Multi-block Execution Pattern

**Critical:** each `figma_execute` call runs in a completely isolated sandbox. Variables defined in one block — including `screen`, `body`, `row`, and all helper functions — do not exist in any subsequent block. Failing to account for this causes `ReferenceError` silently, forcing the model to improvise.

### Rule: every figma_execute block after STEP 0-4 must start with:

```javascript
// 1. RE-ACQUIRE — get the screen and body frames by name
const screen = figma.currentPage.children.find(n => n.name === "EXACT_SCREEN_NAME");
if (!screen) throw new Error("Screen not found — run STEP 0-4 first");
const row  = screen.findOne(n => n.name === "Row");
const body = screen.findOne(n => n.name === "Body");
if (!body) throw new Error("Body not found inside screen");

// 2. RE-DECLARE helpers (compact form — paste at top of every content block)
// [paste TOKEN_HEX + tryFont + bindToken + makeText + makeRow + makeCol]
```

### Rule: STEP 1 (frame creation) must start with a cleanup guard:

```javascript
// CLEANUP — idempotency: remove frame if it already exists (prevents stacking on retry)
const _existing = figma.currentPage.children.find(n => n.name === "EXACT_SCREEN_NAME");
if (_existing) { _existing.remove(); console.log("Removed existing frame"); }
```

### Why figma_execute scope is isolated

The Figma Desktop Bridge wraps each call as a separate plugin execution. There is no persistent JS environment between calls. The only shared state is the Figma document itself (nodes, properties, layers). This means:
- `const body = ...` in block A does not exist in block B
- `function tryFont(...)` in block A does not exist in block B  
- The only way to re-access a node is `getNodeByIdAsync(id)` or `findOne()` from the page


---

## Token Hex Reference

`getLocalVariablesAsync()` only returns variables defined in the current file. Tokens from a shared library are **not** returned. Always use `bindToken(node, tokenName)` from the helpers above — it tries the variable API first and falls back to the table below automatically.

**Never hardcode hex values directly** — always use `bindToken(node, "token/name")` or the TOKEN_HEX map.

```javascript
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
```


---

##  Design Rules & Anti-Patterns

This section defines what NOT to do. Each rule includes the wrong pattern, why it breaks, and the correct alternative. These rules take priority over any implicit assumption or "reasonable" interpretation.

---

### 1. Shell Structure — Layout Hierarchy

####  WRONG: Topbar inside the content column, sharing width with sidebar

```
screen (HORIZONTAL)
 sidebar (240px)
 content (VERTICAL)
     topbar ← 1200px only    ← ERRADO: topbar não cobre o sidebar
     body
```

####  CORRECT: Topbar spans full 1440px at the top; sidebar and body sit below it

```
screen (VERTICAL)
 topbar (FILL horizontal, 1440px, 56px height)
 row (HORIZONTAL, FILL vertical)
     sidebar (240px, FILL vertical)
     body (FILL horizontal, padding 24px, gap 24px)
```

```javascript
// Screen is VERTICAL, not HORIZONTAL
const screen = figma.createFrame();
screen.resize(1440, 880);
screen.layoutMode = "VERTICAL";
screen.itemSpacing = 0;

// Topbar first — full width
const topbar = (await figma.getNodeByIdAsync("301:1056")).createInstance();
topbar.layoutSizingHorizontal = "FILL";
screen.appendChild(topbar);

// Row below topbar — sidebar + body side by side
const row = figma.createFrame();
row.layoutMode = "HORIZONTAL";
row.layoutSizingHorizontal = "FILL";
row.layoutSizingVertical = "FILL";
row.itemSpacing = 0;
row.fills = [];
screen.appendChild(row);

// Sidebar inside the row
const sidebar = (await figma.getNodeByIdAsync("305:3092")).createInstance();
sidebar.layoutSizingVertical = "FILL";
row.appendChild(sidebar);

// Body fills remaining width
const body = figma.createFrame();
body.layoutMode = "VERTICAL";
body.layoutSizingHorizontal = "FILL";
body.layoutSizingVertical = "FILL";
body.paddingTop = 24; body.paddingBottom = 24;
body.paddingLeft = 24; body.paddingRight = 24;
body.itemSpacing = 24;
row.appendChild(body);
```

**Rule:** The Topbar (`301:1056`) is a child of `screen` and spans the full 1440px width — it sits above everything, including the sidebar. The `screen` frame uses `layoutMode = "VERTICAL"`. The sidebar and body content are siblings inside a `row` frame below the topbar.

---

### 2. Shell Structure — Sidebar Position

####  WRONG: Sidebar as a direct child of screen, or spanning behind the topbar

```
screen (VERTICAL)
 sidebar   ← ERRADO: sidebar direto no screen, atrás do topbar
 topbar
```

```
screen (VERTICAL)
 topbar
 sidebar   ← ERRADO: sidebar sem body ao lado, sem row container
```

####  CORRECT: Sidebar inside the row frame, alongside body, below the topbar

```
screen (VERTICAL)
 topbar (FILL horizontal)
 row (HORIZONTAL, FILL)
     sidebar (240px, FILL vertical)   ← dentro do row, não do screen
     body (FILL)
```

**Rule:** The sidebar is always the first child of `row`, not of `screen`. It never appears at screen level. The `row` frame is what holds the sidebar and body side by side — it lives below the topbar as the second child of `screen`.

---

### 3. Body Content — Never Directly in Screen or Row

####  WRONG: Components placed directly into screen or row frames

```javascript
screen.appendChild(kpiCard);   //  direto no screen
row.appendChild(kpiCard);      //  direto no row (sem body)
```

####  CORRECT: All page content goes inside the Body frame

```javascript
// screen → topbar
// screen → row → sidebar
// screen → row → body → your components
body.appendChild(kpiCard);
```

**Rule:** The `Body` frame is the only container for page-level content. It carries all padding (24px all sides) and vertical gap (24px). Placing components directly into `screen` or `row` bypasses padding and produces misaligned layouts.

---

### 4. Topbar — Never Recreate from Scratch

####  WRONG: Building a custom header with logo + text + avatar

```javascript
const header = figma.createFrame();
header.layoutMode = "HORIZONTAL";
// manually adding logo, breadcrumb text, avatar...  ← ERRADO
```

####  CORRECT: Always instantiate the DS Topbar component

```javascript
const topbar = (await figma.getNodeByIdAsync("301:1056")).createInstance();
topbar.layoutSizingHorizontal = "FILL";
content.appendChild(topbar);
// then override text nodes internally with tryFont()
```

**Rule:** The Topbar node `301:1056` already contains logo, breadcrumb, module name, search, notifications, and avatar. Never build a custom header. Override only the text nodes you need to change.

---

### 5. Cards and Panels — Never Use Raw Frames as Cards

####  WRONG: Creating a card with createFrame + manual styling

```javascript
const card = figma.createFrame();
card.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
card.cornerRadius = 12;
// manually adding shadow, border, padding...  ← ERRADO
```

####  CORRECT: Use DS widget components or bind tokens properly

```javascript
// For KPI cards → Stats-Widget variants (1631:101670 etc.)
// For data panels → Header-Widget + content + Footer-Widget composition
// For containers that MUST be raw frames → bind surface/card token + shadow-sm
const allVars = await figma.variables.getLocalVariablesAsync();
const cardToken = allVars.find(v => v.name === "surface/card");
card.fills = [figma.variables.setBoundVariableForPaint(
  { type: "SOLID", color: { r: 1, g: 1, b: 1 } }, "color", cardToken
)];
card.effects = [{ type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.08 },
  offset: { x: 0, y: 1 }, radius: 2, spread: 0, visible: true, blendMode: "NORMAL" }];
card.cornerRadius = 12; // rounded-xl
```

---

### 6. Alerts — Placement and Usage

####  WRONG: Alert used as an inline card or inside a grid column

```
body
 kpiRow
 midRow
     chartCol
     alertCard  ← Alert/Components inside a card container  ← ERRADO
```

####  WRONG: Alert placed inside a card with surface/card background

```javascript
const card = figma.createFrame(); // card background
card.appendChild(alertInstance);  //  alert inside card
```

####  CORRECT: Alert is a full-width banner at body level, or a list of stacked instances

```
body
 [state=degradado] Alert Banner  ← full-width, direct child of body
 headerRow
 kpiRow
 midRow
     chartCol
     alertsCol (vertical stack of Alert instances, no wrapper card)
```

**Rule:** `Alert/Components` is a banner component — it fills its container width. When used as a list in a column (like the "Alertas de sistema" panel), stack instances directly in a VERTICAL frame with no card wrapper. Never nest an alert inside a card that has `surface/card` background.

---

### 7. Multiple Primary CTAs — Forbidden on Same View

####  WRONG: Two or more filled Primary/Green buttons at the same level

```
footer
 Button Primary filled "Salvar"      ←  dois primários
 Button Primary filled "Confirmar"   ←  competindo pela atenção
```

####  CORRECT: One primary CTA; secondary actions use Outline or Alternative

```
footer
 Button Green filled "Ir para Conferências"    ← único primário
 Button Alternative outline "Ver Integrações"  ← secundário
```

**Rule:** Each view or section can have at most **one** filled primary-weight button (Primary/Green/Red). All other actions must be `Outline=True` or `Color=Alternative`. This applies per logical section, not just per screen.

---

### 8. Modals and Drawers — Never in the Layout Flow

####  WRONG: Modal or Drawer appended to body as a layout child

```javascript
body.appendChild(modalInstance);   //  modal inside body flow
body.appendChild(drawerInstance);  //  drawer inside body flow
```

####  CORRECT: Modals and Drawers are screen-level overlays, appended to the screen frame

```javascript
// Modal overlays the entire screen
screen.appendChild(modalInstance);

// Drawer slides in over the content area — append to content or screen
screen.appendChild(drawerInstance);
```

**Rule:** Modals and Drawers are absolutely-positioned overlays. They must be appended to the `screen` frame (or `content` frame for drawers), never inside `body`. In Figma, they sit on top of all layout children and do not participate in auto-layout flow.

---

### 9. Toasts — Never in Auto-Layout Flow

####  WRONG: Toast inside body or any auto-layout frame

```javascript
body.appendChild(toastInstance);  //  toast inside layout
```

####  CORRECT: Toast positioned absolutely at screen level

```javascript
// Append to screen frame, position bottom-right manually
screen.appendChild(toastInstance);
toastInstance.x = 1440 - toastInstance.width - 24;
toastInstance.y = 880 - toastInstance.height - 24;
```

**Rule:** Toasts are floating notifications. They never belong inside an auto-layout container. Always append to `screen` and set absolute `x`/`y` position (bottom-right: `x = 1440 - width - 24`, `y = 880 - height - 24`).

---

### 10. Typography — Size and Weight Misuse

####  WRONG patterns:

```
text-3xl or larger for body content or card labels
text-xs for page-level titles
font-bold for page titles (DS convention is font-semibold)
Multiple text-2xl headings on same screen (only one page title per screen)
text/body token for headings
text/title token for body copy
```

####  CORRECT hierarchy:

| Element | Size | Weight | Token |
|---------|------|--------|-------|
| Page title (one per screen) | `text-2xl` | `font-semibold` | `text/title` |
| Section heading | `text-lg` | `font-semibold` | `text/title` |
| Card / widget title | `text-base` | `font-semibold` | `text/title` |
| Body text | `text-sm` | `font-normal` | `text/body` |
| Table cell | `text-sm` | `font-normal` | `text/body` |
| Label / caption | `text-xs` | `font-medium` | `text/label` |
| Navigation item | `text-sm` | `font-medium` | `text/nav` |

**Rule:** Never use more than one `text-2xl` per screen. Never apply `text-3xl` or larger to anything other than marketing/hero contexts (which don't exist in this admin product).

---

### 11. Color Token Misuse — Surface vs Text vs Border

####  WRONG: Using a surface token for text, or a text token for background

```javascript
//  surface token applied to text fill
textNode.fills = [bindToken("surface/error")];

//  text token applied to frame background
frame.fills = [bindToken("text/title")];

//  border token applied to text
textNode.fills = [bindToken("border/application")];
```

####  CORRECT: Token families match their element type

| Token family | Use on |
|-------------|--------|
| `surface/*` | Frame/container backgrounds only |
| `text/*` | Text node fills only |
| `border/*` | Stroke fills only |
| `form/*` | Input component backgrounds and borders only |
| `primary/*` | Button fills, active accents, links |

---

### 12. Spacing — No Arbitrary Values

####  WRONG: Arbitrary pixel values not in the spacing scale

```javascript
frame.paddingTop = 15;     //  não está na escala
frame.itemSpacing = 10;    //  não está na escala (use 8 or 12)
frame.paddingLeft = 20;    //  use 16 or 24
```

####  CORRECT: Only values from the spacing scale

Common values in this product: `4` `8` `12` `16` `24` `32` `48`

```javascript
frame.paddingTop = 24;     // 
frame.paddingBottom = 24;  // 
frame.paddingLeft = 24;    // 
frame.paddingRight = 24;   // 
frame.itemSpacing = 24;    //  body gap
frame.itemSpacing = 12;    //  tight gap (e.g. button row)
frame.itemSpacing = 8;     //  compact gap (e.g. badge + text inline)
```

---

### 13. DataTable — Never Without Toolbar

####  WRONG: DataTable body alone without toolbar

```
tableSection
 dataTableBody  ← tabela sem toolbar  ← ERRADO
```

####  CORRECT: Always compose DataTable with Toolbar + body + Pagination

```
tableSection
 DataTable-Toolbar  (type matching the use case)
 dataTableBody
 DataTable-Pagination
```

**Rule:** A DataTable without a Toolbar has no title, no actions, and no filter entry point. Always choose a Toolbar type from the catalog. Minimum: `Type=Heading & Description`.

---

### 14. Charts — Never Without Header-Widget

####  WRONG: Chart component dropped directly into body or column

```
leftCol
 chartInstance   ← chart sem header-widget  ← ERRADO
```

####  CORRECT: Always pair a chart with a Header-Widget above it

```
leftCol (VERTICAL, gap 12)
 Header-Widget (Type=Heading or Type=Link + Title)
 chartInstance
```

**Rule:** Charts without context (title, period, legend) are unreadable. Always place a `Header-Widget` above every chart instance. Use `Type=Heading` for simple titles, `Type=Link + Title` when a "Ver tudo" link is needed, `Type=Dropdown + Title` when period filtering is needed.

---

### 15. Placeholder Text — Never in Final Screens

####  WRONG: DS default text left in place

```
"Label", "Value", "Title", "Subtitle", "Description",
"Button", "Header", "Body text", "PH" (avatar placeholder initials)
```

####  CORRECT: Every visible text node must be overridden with domain content

```javascript
// Always override, even if content is generic
const label = card.findOne(n => n.type === "TEXT" && n.name === "Label");
if (label) await tryFont(label, "Cadastros Hoje");
```

**Rule:** No screen delivered for review may contain DS placeholder strings. If real data is unavailable, use realistic mock data (domain-specific values, not generic "Lorem ipsum" or component defaults).

---

### 16. Empty State — Never Leave a Blank Container

####  WRONG: Empty container with no content and no feedback

```
tableSection (visible, but no rows, no message)  ← ERRADO
```

####  CORRECT: Every component that can be empty must have an explicit empty state

Empty state anatomy:
- **Icon** (optional): `Ico-material/document` or relevant icon, `gray/300`
- **Title**: short explanation ("Nenhum resultado encontrado")
- **Body**: helpful next step ("Tente ajustar os filtros ou aguarde novos itens")
- **CTA** (optional): only if there is a clear action to take

```javascript
// Hide the table body, show empty state frame instead
tableBody.visible = false;
emptyState.visible = true;
```

**Rule:** Define the empty state in the PRD. Create it as a separate named layer `[state=empty]` with `visible=false` by default. Never deliver a screen where a data container is simply blank.

---

### 17. Z-order Anti-patterns

####  WRONG: Overlay components placed below content layers

```
screen children (bottom to top):
 sidebar
 content
 ... (modal not present, or placed below content)
```

####  CORRECT: Overlays always on top (last child = highest z-order in Figma)

```
screen children (bottom to top):
 sidebar          ← index 0
 content          ← index 1
 drawer           ← index 2 (overlays content)
 modal            ← index 3 (overlays everything)
```

**Rule:** In Figma, the last child in a frame's children array renders on top. Append overlays (Modal, Drawer, Toast) after all layout children so they visually layer correctly.

---

### 18. Component Detaching — Forbidden Except as Last Resort

####  WRONG: Detaching instances to edit them

```javascript
inst.detachInstance();  //  breaks DS link, prevents future updates
```

####  CORRECT: Override via properties and text nodes, never detach

```javascript
inst.setProperties({ "Type": "Danger", "Dark Mode": false });
const label = inst.findOne(n => n.type === "TEXT" && n.name === "Label");
if (label) await tryFont(label, "Novo texto");
```

**Rule:** Detaching an instance breaks the component link and makes the element invisible to design system updates. Only detach if the component absolutely cannot accommodate the needed change through props or text overrides — and document it as a known deviation.

---

### 19. Text Style Binding — Never Set Font Properties Directly

#### WRONG: setting fontName and fontSize manually

```javascript
const t = figma.createText();
t.fontName = { family:"Inter", style:"Semi Bold" };
t.fontSize = 24;
t.characters = "Título";
```

This bypasses line-height, letter-spacing, and any future DS updates to the style.

#### CORRECT: always bind the DS text style via applyTextStyle()

```javascript
const t = figma.createText();
await applyTextStyle(t, "text-2xl/font-semibold");  // textStyleId bound to DS
t.characters = "Título";
```

Or use the shorthand:

```javascript
await makeText(parent, "Título", TEXT_STYLE_MAP["heading/page"], "text/title");
```

The `_textStyleCache` ensures `getLocalTextStylesAsync()` is called only once per session.

### Summary — Negative Rules Cheatsheet

|  Never do this |  Do this instead |
|---|---|
| Topbar inside content column, partial width | Topbar as first child of screen, full 1440px |
| Sidebar at screen level or after content | Sidebar inside row frame, alongside body |
| Components directly in screen or row | Components inside Body frame only |
| Custom header frame from scratch | Instantiate Topbar node `301:1056` |
| Raw white frame as a card | Use DS Widget or bind `surface/card` token |
| Alert inside a card wrapper | Stack Alert instances directly in VERTICAL frame |
| Two filled primary buttons per section | One primary, rest use Outline/Alternative |
| Modal/Drawer appended to body | Modal/Drawer appended to screen (overlay) |
| Toast inside auto-layout | Toast absolutely positioned on screen |
| Multiple `text-2xl` headings per screen | One page title, use `text-lg` for sections |
| `surface/*` token on text node | Use `text/*` token family for text |
| Arbitrary spacing values (15px, 20px) | Use spacing scale: 4, 8, 12, 16, 24, 32 |
| DataTable without Toolbar | Always compose Toolbar + body + Pagination |
| Chart without Header-Widget | Always pair chart with Header-Widget above |
| DS placeholder text in final screens | Override every visible text node |
| Empty container with no feedback | Always define `[state=empty]` layer |
| Overlay below content in z-order | Append overlays last (highest z-order) |
| Detaching component instances | Override via `setProperties()` + `tryFont()` |

---

---

## Component Catalog — New Components

**Figma page:** `New components` · Section: `3415:34393`

> Componentes criados especificamente para o produto OneDocs Admin. Usar preferencialmente sobre composição manual.

---

### PageSection/Header (`3415:34529`)

Cabeçalho de seção com título, descrição opcional e CTA.

| Type | Node ID | Quando usar |
|------|---------|-------------|
| `Type=Title Only` | `3415:34474` | Seção simples sem ação |
| `Type=Title + CTA` | `3415:34476` | Seção com botão de ação primária |
| `Type=Title + Description` | `3415:34487` | Seção com subtítulo explicativo |
| `Type=Title + Description + CTA` | `3415:34491` | Seção com contexto + ação |
| `Type=Title + Search + CTA` | `3415:34504` | Seção com busca inline |

**Props de texto:** `Title`, `Description`, `Button Label`

```javascript
const header = (await figma.getNodeByIdAsync("3415:34476")).createInstance();
body.appendChild(header);
header.layoutSizingHorizontal = "FILL";
header.setProperties({ "Type": "Title + CTA" });
const title = header.findOne(n => n.type === "TEXT" && n.name === "Title#3415:132");
if (title) await tryFont(title, "Usuários");
```

---

### PageSection/KPI Row (`3415:34634`)

Linha de cartões KPI para dashboards. Substitui a montagem manual de Stats-Widget em grid.

| Type | Node ID | Quando usar |
|------|---------|-------------|
| `Type=Default` | `3415:34531` | KPIs simples (valor + label) |
| `Type=With Percent` | `3415:34548` | KPIs com variação % |
| `Type=With Icon` | `3415:34581` | KPIs com ícone categórico |

```javascript
const kpiRow = (await figma.getNodeByIdAsync("3415:34548")).createInstance();
body.appendChild(kpiRow);
kpiRow.layoutSizingHorizontal = "FILL";
```

---

### PageSection/DataTable (`3415:36051`)

Seção completa de tabela: Toolbar + body + Pagination opcional. Substitui composição manual.

| Type | Node ID | Quando usar |
|------|---------|-------------|
| `Type=Default` | `3415:35099` | Tabela sem seleção nem paginação |
| `Type=With Pagination` | `3415:35400` | Tabela com paginação |
| `Type=Selectable` | `3415:35712` | Tabela com checkboxes de seleção |

```javascript
const table = (await figma.getNodeByIdAsync("3415:35400")).createInstance();
body.appendChild(table);
table.layoutSizingHorizontal = "FILL";
```

---

### PageSection/Stats Row (`3415:36116`)

Linha de estatísticas numéricas. Usar em relatórios e seções de resumo.

| Type | Node ID | Colunas |
|------|---------|---------|
| `Type=3 Stats` | `3415:36074` | 3 métricas lado a lado |
| `Type=4 Stats` | `3415:36084` | 4 métricas lado a lado |
| `Type=6 Stats` | `3415:36097` | 6 métricas compactas |

**Props de texto:** `Stat Value`, `Stat Label`

---

### Feed/Event Item (`3415:36213`)

Item de feed de eventos com ícone de status e timestamp. Usar em telas de auditoria.

| Status | Node ID |
|--------|---------|
| `Status=APROVAÇÃO` | `3415:36121` |
| `Status=REJEIÇÃO` | `3415:36147` |
| `Status=ESCALADO` | `3415:36169` |
| `Status=REVISÃO` | `3415:36191` |

**Props de texto:** `User`, `Action Text`, `Timestamp`

```javascript
const item = (await figma.getNodeByIdAsync("3415:36121")).createInstance();
feedFrame.appendChild(item);
item.layoutSizingHorizontal = "FILL";
item.setProperties({ "Status": "APROVAÇÃO" });
```

---

### Card/Integration Status (`3415:36241`)

Cartão de status de integração com indicador de saúde. Usar na tela F17.

| Status | Node ID |
|--------|---------|
| `Status=Online` | `3415:36214` |
| `Status=Offline` | `3415:36223` |
| `Status=Degraded` | `3415:36232` |

**Props de texto:** `Service Name`, `URL`

---

### Form/Field Row (`3415:36275`)

Linha de campo de formulário com label e input.

| Type | Node ID | Quando usar |
|------|---------|-------------|
| `Type=Default` | `3415:36242` | Campo simples |
| `Type=With Helper` | `3415:36258` | Campo com texto auxiliar abaixo |

**Props de texto:** `Label`, `Helper`

---

### Modal/Template (`3415:36387`)

Template base para modais com header, body e footer. Prefer este sobre compor modais manualmente.

| Size | Node ID | Largura |
|------|---------|---------|
| `Size=Small` | `3415:36276` | 480px |
| `Size=Medium` | `3415:36313` | 640px |
| `Size=Large` | `3415:36350` | 800px |

**Props de texto:** `Modal Title`, `Modal Description`, `Confirm Label`, `Cancel Label`

```javascript
const modal = (await figma.getNodeByIdAsync("3415:36313")).createInstance(); // Medium
screen.appendChild(modal); // sempre no screen, nunca no body
modal.layoutPositioning = "ABSOLUTE";
modal.x = (1440 - modal.width) / 2;
modal.y = (880 - modal.height) / 2;
modal.setProperties({ "Size": "Medium" });
```

---

## Rules

1. **Always prefer semantic tokens** — they communicate intent and support theming
2. **Use primitives** only when no semantic token fits (e.g. chart series colors)
3. **Bind variables async** — always use `getLocalVariablesAsync()` then `setBoundVariableForPaint()`
4. **Never hardcode hex values** — always reference a token
5. **Always instantiate DS components** — never recreate from scratch. Use `getNodeByIdAsync("VARIANT_ID").createInstance()`
6. **Probe before first use** — before using a component type for the first time in a session, call `figma_get_component({ nodeId: "VARIANT_ID" })` to confirm actual property names and variant options. Component properties are case-sensitive and may differ from the catalog labels.
6. **Screenshot after each major step** — call `figma_take_screenshot` to verify. Catch issues early.
7. **Check console on errors** — call `figma_get_console_logs` when `figma_execute` fails
8. **Never override fills on Alert/Badge instances** — use the `Color` prop to control appearance
9. **Standard screen size is 1440×880px** — use this consistently across all screens
10. **For 4+ toggle options** — use `Tabs/Pills`, not `ButtonGroup` (which only supports 3 segments)
