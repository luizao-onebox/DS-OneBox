# Spec — Admin / Auditoria / Ações & Eventos
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #10 de 18 
> Prioridade de execução: **7**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Auditoria / Ações & Eventos
Sidebar ativo: Auditoria → Ações & Eventos
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
    const node = await figma.getNodeByIdAsync("3134:3585");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3134:3585", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3134:3585", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Auditoria > Ações & Eventos 
**Objetivo:** Feed unificado de todas as ações administrativas e eventos do sistema — imutável, auditável. 
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
Sidebar: 305:3092, item ativo: Auditoria → Ações & Eventos
Topbar: 301:1056

### BLOCO 2 · Toolbar
Componente: DataTable-Toolbar node 1631:97339
Filtros:
 - Operador (dropdown)
 - Tipo de evento (multi-select: Login/Decisão manual/Bloqueio/Panic button/Export/Categoria)
 - Período: Datepicker/Input node 1627:24054 (range)
 - Entidade: dropdown (Cadastro/Integração/Categoria/Sistema)
Busca: por Correlation ID ou nome
Botão: "Exportar CSV/Excel" — Button base Green node 1627:20705

### BLOCO 3 · Feed de eventos
**Componente preferido: Feed/Event Item node 3415:36213**
Variantes disponíveis: Status=APROVAÇÃO / REJEIÇÃO / ESCALADO / REVISÃO
→ Usar `createInstance()` no COMPONENT_SET 3415:36213 e selecionar variante por status.
→ Se o tipo de evento não mapear para uma variante, construir manualmente conforme abaixo.

Estrutura de cada item (card com borda esquerda colorida por tipo):
 [ícone tipo] TIPO: Decisão manual [timestamp] [avatar] Maria Silva
 Ação: Aprovar Conferência #4521
 Entidade: João S. (ID 12345) — Conferência Documental
 Resultado: Aprovado | Correlation ID: abc-123-def
 [Ver detalhes ]

Tipos e cores:
 Decisão manual → border primary/600  → variante APROVAÇÃO ou REJEIÇÃO
 Bloqueio/Desbloqueio → border red/600 → variante REJEIÇÃO
 Panic Button → border yellow/500      → variante ESCALADO
 Login/Logout → border gray/300        → manual (sem variante)
 Alteração config → border green/600   → manual (sem variante)
 Mudança categoria → border indigo/600 → variante REVISÃO
 Evento sistema → border gray/400      → manual (sem variante)

Expandir item: "Ver detalhes " → inline: reason code, comentário,
 metadados IP/user agent, before/after se edição

### BLOCO 4 · Paginação
Componente: DataTable-Pagination node 1627:26879

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`
## CAMADA 5 — Checkpoint

```
[ ] Frame "Admin / Auditoria / Ações & Eventos" criado: 1440x880px
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

Comparar screenshot do frame `Admin / Auditoria / Ações & Eventos` com referência `3134:3585`:

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
