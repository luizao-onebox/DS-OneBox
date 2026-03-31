# Spec — Admin / Settings / Integrações / Logs
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #18 de 18 
> Prioridade de execução: **14**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Settings / Integrações / Logs
Sidebar ativo: Settings → Integrações → Logs por Integração
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
    const node = await figma.getNodeByIdAsync("3134:3121");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3134:3121", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3134:3121", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Settings > Integrações > Logs por Integração 
**Objetivo:** Troubleshooting e auditoria técnica de uma integração específica. 
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
Sidebar: 305:3092, item ativo: Settings → Integrações → Logs
Topbar: 301:1056

### BLOCO 2 · Cabeçalho
Dropdown seletor de integração + Badge status atual + sparkline disponibilidade 7d
Componente dropdown: Dropdown/Trigger node 1627:22390

### BLOCO 3 · Filtros
Período: Datepicker/Input node 1627:24054 (range)
Status code: dropdown (200 / 4xx / 5xx / Timeout)
Correlation ID: Input/Search node 1627:19619

### BLOCO 4 · Tabela de logs
**Alternativa completa: PageSection/DataTable node 3415:36051** — agrupa Toolbar + Body + Pagination.
Componente: DataTable node 3048:41686 + Toolbar node 1631:97339
| Coluna | Exemplo |
|--------|---------|
| Timestamp | 27/02/2026 14:32:01.234 |
| Endpoint/Ação | POST /validate-cpf |
| Status Code | Badge: 200(verde) / 500(vermelho) / Timeout(laranja) node 3010:97638 |
| Latência | 234ms |
| Correlation ID | abc-123-def |
| Mensagem | "CPF válido" / "Connection timeout after 5000ms" |

### BLOCO 5 · Gráficos colapsáveis
Chart Line — Latência ao longo do tempo node 1616:33679
Chart Line — Taxa de erro ao longo do tempo node 1616:33679

### BLOCO 6 · Paginação
Componente: DataTable-Pagination node 1627:26879

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`
## CAMADA 5 — Checkpoint

```
[ ] Frame "Admin / Settings / Integrações / Logs" criado: 1440x880px
[ ] screen.layoutMode = "VERTICAL"
[ ] Topbar instanciado de 301:1056 — primeiro filho do screen — FILL horizontal
[ ] Topbar: breadcrumb e module overrideados com tryFont()
[ ] Row: HORIZONTAL, FILL
[ ] Sidebar instanciado de 305:3092 — primeiro filho do row
[ ] Sidebar item "Settings" marcado como Active via setProperties
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

Comparar screenshot do frame `Admin / Settings / Integrações / Logs` com referência `3134:3121`:

```
[ ] Dimensões: 1440x880 visíveis, sem overflow
[ ] Topbar: largura total, breadcrumb correto
[ ] Sidebar: item "Settings" destacado
[ ] Body: gutter 24px visível nos 4 lados
[ ] Componentes: contagem correta, sem instâncias extras
[ ] Sem frames brutos onde DS components deveriam estar
[ ] Sem texto placeholder visível
[ ] Fills corretos — sem branco-sobre-branco ou fundos ausentes
[ ] Layers condicionais: visible=false no estado padrão
[ ] Overlays: appendados no screen, não no body
```

---
