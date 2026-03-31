# Spec — Admin / Operações / Análise de Risco
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #6 de 18 
> Prioridade de execução: **5**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Operações / Análise de Risco
Sidebar ativo: Operações → Análise de Risco
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
    const node = await figma.getNodeByIdAsync("3134:3458");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3134:3458", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3134:3458", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Operações > Análise de Risco 
**Objetivo:** Central de risco — métricas agregadas + fila de casos de alto risco. 
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
Sidebar: 305:3092, item ativo: Operações → Análise de Risco
Topbar: 301:1056

### BLOCO 2 · Cabeçalho
Seletor período: ButtonGroup node 1627:20480 (Hoje/7d/30d/Custom)
Botão "Atualizar": Button sm Alternative node 1627:20589

### BLOCO 3 · 4 KPI Cards de risco
**Componentes de seção disponíveis:**
- `PageSection/KPI Row` node 3415:34634 — agrupa row de KPIs (Default/With Percent/With Icon)
- `PageSection/Stats Row` node 3415:36116 — agrupa 3/4/6 stats em linha
Componente legado: Dashboard Widgets node 3048:42339
| Card | Valor | Subtítulo |
|------|-------|-----------|
| Score médio de risco | 34,2 | +2,1 pts vs ontem |
| Casos alto risco | 156 | 89 requerem ação |
| Taxa de fraude | 0,8% | 312 confirmadas este mês |
| Dispositivos suspeitos | 47 | 12 novos hoje |

### BLOCO 4 · 2 Gráficos
Esquerda: Chart Bar Vertical — Distribuição score (Baixo/Médio/Alto) node 1616:33703
Direita: Chart Line — Trend fraude confirmada 30d node 1616:33679

### BLOCO 5 · Tabela "Casos de Alto Risco"
Componente: DataTable node 3048:41686
Filtros: Input/Range score node 1625:48745, multi-select sinais, status, data
| Coluna | Exemplo |
|--------|---------|
| Risco | Score + Progress Bar colorida |
| Cadastro | Nome mascarado + CPF mascarado |
| Sinais | Chips: DEVICE_SUSPEITO · FACE_MULTIPLA · VELOCITY_HIGH |
| Canal | Web / App / API |
| Data | 27/02/2026 14:32 |
| Status | Badge Pendente/Em análise/Bloqueado preventivo |
| Ação | "Revisar" → Frame 3 · "Bloquear" |

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`
## CAMADA 5 — Checkpoint

```
[ ] Frame "Admin / Operações / Análise de Risco" criado: 1440x880px
[ ] screen.layoutMode = "VERTICAL"
[ ] Topbar instanciado de 301:1056 — primeiro filho do screen — FILL horizontal
[ ] Topbar: breadcrumb e module overrideados com tryFont()
[ ] Row: HORIZONTAL, FILL
[ ] Sidebar instanciado de 305:3092 — primeiro filho do row
[ ] Sidebar item "Risco" marcado como Active via setProperties
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

Comparar screenshot do frame `Admin / Operações / Análise de Risco` com referência `3134:3458`:

```
[ ] Dimensões: 1440x880 visíveis, sem overflow
[ ] Topbar: largura total, breadcrumb correto
[ ] Sidebar: item "Risco" destacado
[ ] Body: gutter 24px visível nos 4 lados
[ ] Componentes: contagem correta, sem instâncias extras
[ ] Sem frames brutos onde DS components deveriam estar
[ ] Sem texto placeholder visível
[ ] Fills corretos — sem branco-sobre-branco ou fundos ausentes
[ ] Layers condicionais: visible=false no estado padrão
[ ] Overlays: appendados no screen, não no body
```

---
