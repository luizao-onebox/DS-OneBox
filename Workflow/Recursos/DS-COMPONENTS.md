# DS-COMPONENTS — Catálogo de Componentes do Design System

> Figma file: `q3mFYxgvpAK1KxeLVvRVKX` · Versão: 2.0 · Atualizado: 2026-03-30
> **Regra:** Sempre instanciar via `getNodeByIdAsync(VARIANT_ID).createInstance()`.
> Nunca recriar do zero com primitivos. Consultar REGISTRY.md para IDs validados em build real.

---

## Índice rápido — Wrapper IDs

| Componente | Wrapper ID | Página DS |
|------------|-----------|-----------|
| Alert / Banner | `1627:22190` | 17 |
| Avatar | `3010:97645` | 21 |
| Badge / Status Pill | `329:1961` · `3010:97638` | 20 |
| Button / ButtonGroup | `3048:41684` | 09 |
| Chart (Bar, Line, Donut, Heatmap) | `3048:42338` | 18 |
| Dashboard Widgets | `3048:42339` | 19 |
| DataTable (toolbar + pagination) | `3048:41686` | 11 |
| Datepicker / Dropdown / Filter | `3010:103259` | 13 |
| Drawer | `3048:42541` | 15 |
| Feed/Event Item | `3415:36213` | New |
| File Upload | `1627:20051` | 22 |
| Form Inputs | `3006:97322` | 08 |
| Form Field Row | `3415:36275` | New |
| Icons (34 app icons, 24×24px) | `3010:103285` | 12 |
| Modal | `3048:11790` | 14 |
| Modal/Template | `3415:36387` | New |
| Navigation (sidebar, topbar, tabs) | `3048:41685` | 10 |
| Overlay (tooltip, toast, progress) | `3048:41691` | 17 |
| PageSection/DataTable | `3415:36051` | New |
| PageSection/Header | `3415:34529` | New |
| PageSection/KPI Row | `3415:34634` | New |
| PageSection/Stats Row | `3415:36116` | New |
| Card/Integration Status | `3415:36241` | New |
| Progress Bar / Loader | `1623:45882` | 17 |
| Review Screens | `3048:42543` | 23 |
| Timeline / Stepper / Wizard | `3048:41690` | 16 |

---

## Página do Figma — Índice

| Página | Nome | Page ID |
|--------|------|---------|
| 08 | Forms & Inputs | `3006:97322` |
| 09 | Buttons & Actions | `3010:97327` |
| 10 | Navigation | `3010:97328` |
| 11 | Data Tables | `3010:97329` |
| 13 | Dropdown & Filters | `3010:103259` |
| 14 | Modals | `3048:11790` |
| 15 | Drawers | `3048:11791` |
| 17 | Overlays & Feedback | `3010:97330` |
| 18 | Charts & Dashboards | `3010:97331` |
| 19 | Widgets | `3010:103310` |
| 20 | Indicators & Utilities | `3010:97332` |
| 21 | Avatar | `3010:97641` |
| 23 | Actual system screens | `3010:97335` |
| 24 | References | `3048:26434` — ⚠️ NÃO usar como DS |
| — | **Screen development playground** | `1599:18625` — **página de build** |

---

## Componentes de Shell

### Topbar (`301:1056`)
- Props: `Breadcrumb=True`, `Right Content=True`
- Sempre FILL horizontal, HUG vertical
- Appendar ao screen ANTES de setar FILL

### Sidebar (`305:3092` collapsed=False / `305:3970` collapsed=True)
- `305:3092` — 240px, expanded
- `305:3970` — 64px, icon-only
- Sempre FILL vertical

---

## Buttons

**Component set:** `1627:20576`

| Cor | Outline | Tamanho | Node ID |
|-----|---------|---------|---------|
| Primary | False | xl | `1627:20577` |
| Primary | False | l | `1627:20581` |
| Primary | False | base | `1627:20585` |
| Primary | False | sm | `1627:20589` |
| Primary | False | xs | `1627:20593` |
| Green | False | base | `1627:20705` |
| Red | False | base | `1627:20765` |
| Alternative | True | base | `1627:21065` |

**Tamanhos:** xl=52px · l=44px · base=36px · sm=32px · xs=28px

**ButtonGroup** (`1627:20480`) — máximo 3 segmentos.
**Se precisar de 4+ opções → usar Tabs/Pills** (`1620:23085`).

**ConferenceButton** (`352:1439`):
- Approve: `352:1438` (green)
- Disapprove: `354:1453` (red)
- Disabled: `352:1440` (gray)

---

## Navigation

### Tabs / Pills (`1620:23085`)
- Usar para 4+ opções de toggle
- Default: `1620:23086`

### Tabs (Application UI) — troca de seção de página
- Com underline: navegação secundária in-page

---

## Alerts / Banners

**Component set:** `1627:22190`

| Variante | Node ID | Cor |
|----------|---------|-----|
| Color=Danger | `1627:22199` | Vermelho |
| Color=Warning | `1627:22215` | Amarelo |
| Color=Success | `1627:22191` | Verde |
| Color=Info | `1627:22207` | Azul |

> ⚠️ **Nunca sobrescrever fills** — controlar via prop `Color`.
> Texto: nó `Title` e nó `Description` dentro da instância.

---

## DataTable

**Wrapper:** `3048:41686` (página 11)

Composição padrão: **Toolbar + Body + Pagination**

| Componente | Node ID | Notas |
|------------|---------|-------|
| DataTable-Toolbar | `1631:97339` (COMPONENT_SET) | Busca + filtros + ações |
| DataTable/A | `3393:11073` | Variante A de corpo |
| DataTable/B | `3393:6548` | Variante B de corpo |
| DataTable/C | `3393:9617` | Variante C de corpo |
| DataTable-Pagination | `1627:26879` (COMPONENT_SET) | 25/50/100 por página |

> Prefer usar **PageSection/DataTable** (`3415:36051`) que já agrupa Toolbar + Body + Pagination.

---

## Dashboard Widgets

**Wrapper:** `3048:42339` (página 19)

| Widget | Node ID | Variante |
|--------|---------|----------|
| Stats-Widget / Stat & Percent | `1631:101679` | Valor + variação % |
| Stats-Widget / Default | `1631:101670` | Valor + subtítulo |
| Stats-Widget / Icon + Text + Stats | `1631:101686` | Com ícone |
| Header-Widget / Heading | `1631:100848` | Cabeçalho de seção com gráfico |

---

## Charts

**Wrapper:** `3048:42338` (página 18)

| Chart | Node ID |
|-------|---------|
| Bar-Horizontal LG/Desktop | `1616:33691` |

> Sempre usar Header-Widget (`1631:100848`) acima de um chart.

---

## PageSection — Componentes compostos (preferir sempre)

### PageSection/Header (`3415:34529`)

| Type | Node ID |
|------|---------|
| Title Only | `3415:34474` |
| Title + CTA | `3415:34476` |
| Title + Description | `3415:34487` |
| Title + Description + CTA | `3415:34491` |
| Title + Search + CTA | `3415:34504` |

Props de texto: `Title`, `Description`, `Button Label`

### PageSection/KPI Row (`3415:34634`)

| Type | Node ID |
|------|---------|
| Default | `3415:34531` |
| With Percent | `3415:34548` |
| With Icon | `3415:34581` |

### PageSection/DataTable (`3415:36051`)

| Type | Node ID |
|------|---------|
| Default | `3415:35099` |
| With Pagination | `3415:35400` |
| Selectable | `3415:35712` |

### PageSection/Stats Row (`3415:36116`)

| Type | Node ID | Colunas |
|------|---------|---------|
| 3 Stats | `3415:36074` | 3 |
| 4 Stats | `3415:36084` | 4 |
| 6 Stats | `3415:36097` | 6 |

---

## Feed/Event Item (`3415:36213`)

| Status | Node ID |
|--------|---------|
| APROVAÇÃO | `3415:36121` |
| REJEIÇÃO | `3415:36147` |
| ESCALADO | `3415:36169` |
| REVISÃO | `3415:36191` |

Props: `User`, `Action Text`, `Timestamp`

---

## Card/Integration Status (`3415:36241`)

| Status | Node ID |
|--------|---------|
| Online | `3415:36214` |
| Offline | `3415:36223` |
| Degraded | `3415:36232` |

Props: `Service Name`, `URL`

---

## Form Field Row (`3415:36275`)

| Type | Node ID |
|------|---------|
| Default | `3415:36242` |
| With Helper | `3415:36258` |

Props: `Label`, `Helper`

---

## Modal/Template (`3415:36387`)

| Size | Node ID | Largura |
|------|---------|---------|
| Small | `3415:36276` | 480px |
| Medium | `3415:36313` | 640px |
| Large | `3415:36350` | 800px |

Props: `Modal Title`, `Modal Description`, `Confirm Label`, `Cancel Label`

> ⚠️ Sempre appendar no `screen`, nunca no `body`.
> `modal.layoutPositioning = "ABSOLUTE"` → centralizar com x/y.

---

## Form Inputs

**Wrapper:** `3006:97322` (página 08)

| Componente | Node ID variant principal |
|------------|--------------------------|
| Input/Text Regular/Normal | `1620:22662` |
| Input/Text Regular/Value | `1620:22838` |
| Input/Text Regular/Error | `1620:22701` |
| Input/Select Regular | `1627:19264` |
| Input/Toggle Default/Initial | `1627:20355` |
| Input/Toggle Default/Active | `1627:20369` |
| Input/Checkbox Initial | `1627:20293` |
| Input/Checkbox Checked | `1627:20303` |
| Input/Radio Initial | `1627:20252` |
| Input/Search Regular | `1627:19713` |
| Input/Range | `1625:48745` (COMPONENT_SET) |
| Datepicker/Input Range | `1627:24054` (COMPONENT_SET) |

> Prop `Dark mode` — atenção ao casing: `Dark mode` (m minúsculo) em Text/Search, `Dark Mode` (M maiúsculo) em Toggle/Checkbox/Radio.

---

## Anti-patterns — cheatsheet rápido

| ❌ Nunca | ✅ Correto |
|----------|-----------|
| Topbar dentro de coluna de conteúdo | Topbar como primeiro filho do screen |
| Sidebar no screen ou após o conteúdo | Sidebar dentro do `row`, ao lado do body |
| Componentes direto no screen ou row | Componentes dentro do `body` |
| Criar card com frame branco puro | Instanciar DS Widget ou bindToken surface/card |
| Alert dentro de card wrapper | Instâncias de Alert empilhadas em VERTICAL frame |
| Modal/Drawer appendado no body | Modal/Drawer appendado no screen (overlay) |
| 4 segmentos em ButtonGroup | Usar Tabs/Pills (1620:23085) |
| Sobrescrever fills de Alert/Badge | Usar prop `Color` |
| Deixar texto placeholder DS | Override em todo nó de texto visível |
