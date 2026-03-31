# SESSION.md — Estado Mútavel da Sessão Atual

> Este arquivo é sobrescrito no início de cada sessão de trabalho.
> Não é versionado como conhecimento permanente — use REGISTRY.md para isso.

---

## Sessão Atual

**Data:** 2026-03-29
**Objetivo:** Refatoração da documentação V1 → V2
**Status:** Em andamento

---

## Contexto da Sessão

### Página Figma Ativa
- **Nome:** Screen development playground
- **ID:** `1599:18625`
- **Section 1 (destino dos builds):** `3492:20183`

### Plugin
- Bridge ativo na porta `9223`
- Manifest: `C:\Users\LuizBaptistella\AppData\Local\npm-cache\_npx\b547afed9fcf6dcb\node_modules\figma-console-mcp\figma-desktop-bridge`

---

## Fila de Telas (próxima sessão de build)

| # | Tela | PRD | Status |
|---|------|-----|--------|
| 1 | Admin / Dashboard / Home | `01_dashboard_home.md` | ✅ Concluída (`3514:33662`) |
| 2 | Admin / Operações / Conferências / Lote | `02_...` | ✅ Concluída (`3514:35241`) |
| 3 | Admin / Operações / Conferências / Individual | `03_...` | ✅ Concluída (`3517:37351`) |
| 4 | Admin / Operações / Desambiguação / Fila | `04_...` | ✅ Concluída (`3518:38025`) |
| 5 | Próxima tela | — | ⏳ Pendente |

---

## Progresso da Refatoração V2

| Arquivo | Status |
|---------|--------|
| `HELPERS.md` | ✅ Criado |
| `DS-TOKENS.md` | ✅ Criado |
| `DS-COMPONENTS.md` | ✅ Criado |
| `REGISTRY.md` | ✅ Criado |
| `SESSION.md` | ✅ Criado (este arquivo) |
| `ORCHESTRATOR.md` (refatorado) | ✅ Criado |
| PRDs refatorados (18 arquivos) | ✅ Concluído (18/18) |
| `SKILL.md` deprecated | ⏳ Decisão pendente |

---

## Erros Conhecidos desta Sessão

Nenhum erro novo. Ver `REGISTRY.md` → seção "Known API Errors" para o histórico completo.

---

## Notas

- `figma_capture_screenshot` dá timeout — usar `figma_take_screenshot` com `format: "jpg"`
- Ao reusar IDs de componentes, sempre re-buscar com `figma_search_components` (IDs são específicos da sessão no bridge)
- `layoutSizingHorizontal = "FILL"` só funciona APÓS `parent.appendChild(node)`
- `setTextStyleIdAsync()` — obrigatório o async, a versão sync lança erro no contexto `dynamic-page`
