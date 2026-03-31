# REGISTRY — Componentes Validados em Build Real

> IDs confirmados em execução real no Figma. Preferir sobre IDs dos PRDs quando houver divergência.
> Atualizar após cada sessão de build. Versão: 2.0 · Atualizado: 2026-03-30

---

## Shell

| Componente | Node ID | Validado em |
|------------|---------|-------------|
| Topbar | `301:1056` | Sessão 01 (4 telas) |
| Sidebar expandido | `305:3092` | Sessão 01 (4 telas) |
| Build page | `1599:18625` | Sessão 01 |
| Section 1 (target de build) | `3492:20183` | Sessão 01 |

---

## Botões

| Componente | Node ID | Validado em |
|------------|---------|-------------|
| Button Primary base | `1627:20585` | Sessão 01 |
| Button Primary sm | `1627:20589` | Sessão 01 |
| Button Green base | `1627:20705` | Sessão 01 |
| Button Alternative Outline base | `1627:21065` | Sessão 01 |

---

## Alerts

| Componente | Node ID | Validado em |
|------------|---------|-------------|
| Alert / Color=Danger | `1627:22199` | Sessão 01 (Dashboard) |
| Alert / Color=Warning | `1627:22215` | Sessão 01 (Dashboard) |
| Alert / Color=Success | `1627:22191` | Sessão 01 (Dashboard) |

---

## Dashboard Widgets

| Componente | Node ID | Validado em |
|------------|---------|-------------|
| Stats-Widget / Stat & Percent | `1631:101679` | Sessão 01 (Dashboard) |
| Stats-Widget / Default | `1631:101670` | Sessão 01 (Dashboard) |
| Stats-Widget / Icon+Text+Stats | `1631:101686` | Sessão 01 (Dashboard) |
| Header-Widget / Heading | `1631:100848` | Sessão 01 (Dashboard) |
| Chart / Bar-Horizontal LG | `1616:33691` | Sessão 01 (Dashboard) |

---

## Navigation / Tabs

| Componente | Node ID | Validado em |
|------------|---------|-------------|
| Tabs/Pills (4 opções) | `1620:23085` | Sessão 01 (Dashboard) |
| Tabs component set | `1620:23012` | Sessão 01 (Conferências Lote) |

---

## PageSection

| Componente | Node ID | Tipo | Validado em |
|------------|---------|------|-------------|
| PageSection/DataTable | `3415:36051` | COMPONENT_SET | Sessão 01 |
| PageSection/DataTable default variant | `3415:35099` | COMPONENT | Sessão 01 |

---

## DataTable

| Componente | Node ID | Tipo | Validado em |
|------------|---------|------|-------------|
| DataTable-Toolbar | `1631:97339` | COMPONENT_SET | Sessão 01 |
| DataTable-Pagination | `1627:26879` | COMPONENT_SET | Sessão 01 |

---

## Telas construídas

| # | Nome | Frame ID | Data | Status |
|---|------|----------|------|--------|
| 01 | Admin / Dashboard / Home | `3514:33662` | 2026-03-29 | ✅ Sessão 01 |
| 02 | Admin / Operações / Conferências / Lote | `3514:35241` | 2026-03-29 | ✅ Sessão 01 |
| 03 | Admin / Operações / Conferências / Individual | `3517:37351` | 2026-03-29 | ✅ Sessão 01 |
| 04 | Admin / Operações / Desambiguação / Fila | `3518:38025` | 2026-03-29 | ✅ Sessão 01 |
| 01 | Admin / Dashboard / Home | `3537:18998` | 2026-03-30 | ✅ Sessão 02 (Frame 1 — `3537:18907`) |
| 02 | Admin / Operações / Conferências / Lote | `3538:23561` | 2026-03-30 | ✅ Sessão 02 |
| 03 | Admin / Operações / Conferências / Individual | `3538:26369` | 2026-03-30 | ✅ Sessão 02 |
| 04 | Admin / Operações / Desambiguação / Fila | `3538:31958` | 2026-03-30 | ✅ Sessão 02 |
| 01 | Admin / Dashboard / Home | `3539:35345` | 2026-03-30 | ✅ Sessão 03 — abordagem custom (Frame 1 — `3537:18907`) |
| 02 | Admin / Operações / Conferências / Lote | `3540:38147` | 2026-03-30 | ✅ Sessão 03 — abordagem custom |
| 03 | Admin / Operações / Conferências / Individual | `3540:39977` | 2026-03-30 | ✅ Sessão 03 — abordagem custom |
| 04 | Admin / Operações / Desambiguação / Fila | `3540:40488` | 2026-03-30 | ✅ Sessão 03 — abordagem custom |

---

## Abordagem Sessão 03 — Custom Components

| Componente | Abordagem | Motivo |
|------------|-----------|--------|
| KPI cards | Custom (VF + T) | Stats-Widget: overrides de texto não confiáveis |
| Gráfico/Funil | Custom (barras com HF + resize) | Chart labels não são overridáveis |
| Tabs | Custom (pill ativo + badge count) | COMPONENT_SET `1620:23012` não instanciável diretamente |
| Topbar | DS `301:1056` | Funciona bem, breadcrumb via `findOne("Flowbite")` |
| Sidebar | DS `305:3092` | Funciona bem |
| PageSection/DataTable | DS `3415:35099` | Funciona bem como container de tabela |
| DataTable-Pagination | DS `1627:26879` (child[0]) | Funciona bem |
| Alerts | DS instâncias diretas | Funciona bem |

**Helper pattern (Sessão 03):**
```javascript
function T(p, text, sz, weight, color) { /* createText */ }
function HF(p, name, gap, pt, pb, pl, pr, fill, r) { /* HORIZONTAL frame */ }
function VF(p, name, gap, pad, fill, r) { /* VERTICAL frame */ }
// Pré-carregar ALL fonts UMA vez no topo, nunca dentro de loop
```

---

## Problemas conhecidos (sessão 01)

- `textStyleId =` (sync) falha em `documentAccess: dynamic-page` → usar `setTextStyleIdAsync()`
- `layoutSizingHorizontal = "FILL"` falha antes de `appendChild` → sempre appendar primeiro
- `layoutGrow` aceita apenas `0` ou `1` — não fracionários
- REST API screenshot cacheia — usar format `jpg` para forçar novo render, mas cache pode persistir várias chamadas
- `figma_capture_screenshot` (Desktop Bridge) dá timeout intermitente
- `layoutSizingHorizontal = "HUG"` falha em frames sem auto-layout (ex: placeholder de imagem criado com createFrame) — usar FIXED + resize()
- COMPONENT_SET não tem `createInstance()` — precisa pegar um child COMPONENT: `set.children[0].createInstance()`
- `Tabs` node `1620:23012` é COMPONENT_SET — usar `1620:23033` (Style=Tab, no icon, Desktop) para instanciar
- Fonts em loop por múltiplos cards causam timeout de 20s — pré-carregar todas as fonts UMA vez antes do loop, depois fazer assignments síncronos
- Topbar: node de breadcrumb chama-se `"Flowbite"`, não `"Breadcrumb"`
- Screens colocadas em FRAME (não SECTION) ficam todas em x=0,y=0 — spredar manualmente com child.x = i*(W+GAP)
