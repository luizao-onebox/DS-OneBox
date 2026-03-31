# Spec — Admin / Auditoria / Qualidade & Performance
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #9 de 18 
> Prioridade de execução: **8**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Auditoria / Qualidade & Performance
Sidebar ativo: Auditoria → Qualidade & Performance
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
    const node = await figma.getNodeByIdAsync("3134:3495");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3134:3495", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3134:3495", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Auditoria > Qualidade & Performance 
**Objetivo:** Dashboard de qualidade operacional — OCR, biometria, operadores, sistema e funil. 
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
Sidebar: 305:3092, item ativo: Auditoria → Qualidade & Performance
Topbar: 301:1056

### BLOCO 2 · Cabeçalho
Seletor período: Hoje/7d/30d/Custom + Botão "Exportar CSV"

### BLOCO 3 · Tabs (4 seções)
Componente: Tabs node 1620:23012

Tab 1 — Funil & Conversão:
 KPIs: Taxa conclusão · % aprovação 1ª tentativa · Taxa retrabalho · NPS estimado
 Gráfico funil: etapas com % drop-off node 1616:33691
 Tabela: Top 5 motivos abandono por etapa

Tab 2 — Qualidade OCR & Biometria:
 KPIs: OCR média · Liveness aprovado · Qualidade facial · Match face-doc
 Gráfico line (7d): OCR confidence + Liveness success rate node 1616:33679
 Tabela: Docs com menor confiança OCR

Tab 3 — Performance de Operadores:
 KPIs: Tempo médio revisão · Casos hoje · SLA % · Escalações
 Tabela operadores: Operador | Revisões | Tempo médio | Aprovações | Reprovações | Escalações | SLA %
 Ex: Maria Silva | 234 | 4m32s | 189 | 32 | 13 | 94%

Tab 4 — Saúde do Sistema:
 KPIs: Uptime médio · Fila mais antiga · P95 tempo · Erros/hora
 Gráfico line: Queue aging node 1616:33679
 Tabela: SLA por tipo — Tipo | Pendentes | Mais antigo | SLA target | % SLA | Status

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`
## CAMADA 5 — Checkpoint

```
[ ] Frame "Admin / Auditoria / Qualidade & Performance" criado: 1440x880px
[ ] screen.layoutMode = "VERTICAL"
[ ] Topbar instanciado de 301:1056 — primeiro filho do screen — FILL horizontal
[ ] Topbar: breadcrumb e module overrideados com tryFont()
[ ] Row: HORIZONTAL, FILL
[ ] Sidebar instanciado de 305:3092 — primeiro filho do row
[ ] Sidebar item "Auditoria" marcado como Active via setProperties
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

Comparar screenshot do frame `Admin / Auditoria / Qualidade & Performance` com referência `3134:3495`:

```
[ ] Dimensões: 1440x880 visíveis, sem overflow
[ ] Topbar: largura total, breadcrumb correto
[ ] Sidebar: item "Auditoria" destacado
[ ] Body: gutter 24px visível nos 4 lados
[ ] Componentes: contagem correta, sem instâncias extras
[ ] Sem frames brutos onde DS components deveriam estar
[ ] Sem texto placeholder visível
[ ] Fills corretos — sem branco-sobre-branco ou fundos ausentes
[ ] Layers condicionais: visible=false no estado padrão
[ ] Overlays: appendados no screen, não no body
```

---
