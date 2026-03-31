# Spec — Admin / Operações / Conferências / Lote
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #2 de 18 
> Prioridade de execução: **4**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Operações / Conferências / Lote
Sidebar ativo: Operações → Conferências → Lote
Plataforma: Desktop 1440 × 880px
DS Skill: DS-COMPONENTS.md + DS-TOKENS.md + HELPERS.md
Memória: Consultar telas já criadas antes de iniciar
```

---

## CAMADA 2 — Referência Visual

> Executar via figma_execute antes de qualquer geração:

```javascript
await figma_execute({
  code: `
    const node = await figma.getNodeByIdAsync("3150:14502");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3150:14502", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3150:14502", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Operações > Conferências > Lote 
**Objetivo:** Fila de conferências pendentes com gestão de SLA e ações em lote. 
**Dimensões:** 1440 × 880px
**Layout:** Topbar (1440px) no topo + Row abaixo com SidebarNav (240px fixo) + Body (FILL)
**Screen:** `layoutMode = VERTICAL`
**Row:** `layoutMode = HORIZONTAL` (sidebar + body)
**Body:** padding 24px, VERTICAL, gap 24px
**Fundo:** `surface/desktop` → token `gray/100` → hex `#F7F7F8`
**Fundo:** `surface/desktop` (gray/100)

---

## CAMADA 4 — Spec de Blocos (sequencial)

### BLOCO 1 · Shell
Sidebar: 305:3092, item ativo: Operações → Conferências → Lote
Topbar: 301:1056

### BLOCO 2 · Tabs de tipo (4 abas com contadores)
Componente: Tabs node 1620:23012
| Tab | Count | Cor badge |
|-----|-------|-----------|
| Revisão de Benefício | 234 | blue |
| Conferência Documental | 89 | yellow |
| Conferência Liveness | 45 | orange |
| Pendências Externas | 156 | red |

### BLOCO 3 · Toolbar
**Alternativa completa: PageSection/DataTable node 3415:36051** — agrupa Toolbar + Body + Pagination.
Componente: DataTable-Toolbar node 1631:97339
Filtros: Prioridade (dropdown) · SLA (dropdown: Vencido/<1h/<4h) · Atribuído a (dropdown)
Busca: Input/Search node 1627:19619 — "Buscar por CPF, nome ou ID"
Ações lote: "Atribuir a mim" · "Atribuir a operador" · "Escalar" — Button sm node 1627:20589

### BLOCO 4 · Tabela
Componente: DataTable node 3048:41686
Colunas: Prioridade | Tipo | Cadastro | Motivo | SLA restante | Atribuído a | Status | Ação
- Prioridade: Badge Alta/Média/Normal — node 3010:97638
- SLA: Progress Bar node 1623:45882 (vermelha se vencida)
- Atribuído: Avatar node 3010:97645 + nome
- Status: Badge Aguardando/Em análise/Escalado
- Ação: Button xs "Abrir" → Frame 3

### BLOCO 5 · Paginação
Componente: DataTable-Pagination node 1627:26879 — 25/50/100 por página

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`

```
[ ] Frame "Admin / Operações / Conferências / Lote" criado: 1440x880px
[ ] screen.layoutMode = "VERTICAL"
[ ] Topbar instanciado de 301:1056 — primeiro filho do screen — FILL horizontal
[ ] Topbar: breadcrumb e module overrideados com tryFont()
[ ] Row: HORIZONTAL, FILL
[ ] Sidebar instanciado de 305:3092 — primeiro filho do row
[ ] Sidebar item "Conferências" marcado como Active via setProperties
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


## CAMADA 6 — Validação Visual

Comparar screenshot do frame `Admin / Operações / Conferências / Lote` com referência `3150:14502`:

```
[ ] Dimensões: 1440x880 visíveis, sem overflow
[ ] Topbar: largura total, breadcrumb correto
[ ] Sidebar: item "Conferências" destacado
[ ] Body: gutter 24px visível nos 4 lados
[ ] Componentes: contagem correta, sem instâncias extras
[ ] Sem frames brutos onde DS components deveriam estar
[ ] Sem texto placeholder visível
[ ] Fills corretos — sem branco-sobre-branco ou fundos ausentes
[ ] Layers condicionais: visible=false no estado padrão
[ ] Overlays: appendados no screen, não no body
```

---
