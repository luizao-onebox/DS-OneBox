# Spec — Admin / Operações / Desambiguação / Comparação
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #5 de 18 
> Prioridade de execução: **6**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Operações / Desambiguação / Comparação
Sidebar ativo: Operações → Desambiguação
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
    const node = await figma.getNodeByIdAsync("3134:3842");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3134:3842", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3134:3842", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Operações > Desambiguação > Comparação 
**Objetivo:** Decisão de duplicidade com evidências lado a lado. 
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
Sidebar: 305:3092, item ativo: Operações → Desambiguação
Topbar: 301:1056

### BLOCO 2 · Layout 3 colunas (40 / 20 / 40)

Coluna Esquerda — Cadastro A:
 - Selfie grande
 - Nome completo, CPF mascarado, data nascimento
 - Data cadastro, canal origem, status (badge)
 - Categorias ativas (chips)
 - Device, IP, geolocalização
 - Botão "Abrir cadastro A" → Frame 7

Centro — Score:
 - Score: 94,2% — Progress Bar grande, colorida
 - Label: "Alta probabilidade — mesma pessoa"
 - Chips: "Mesmo device" · "IPs próximos" · "Capturas no mesmo dia"

Coluna Direita — Cadastro B:
 - Mesma estrutura que Cadastro A
 - Botão "Abrir cadastro B" → Frame 7

### BLOCO 3 · Rodapé de Decisão (fixo)
 - " Confirmar Duplicidade" — Button Red node 1627:20765
 - " Falso Positivo" — Button Green node 1627:20705
 - " Escalar para Segurança" — Button Alternative node 1627:21065

### BLOCO 4 · Modal "Confirmar Duplicidade"
**Componente preferido: Modal/Template node 3415:36387** (Medium=640px recomendado para este conteúdo)
→ Usar createInstance() no COMPONENT_SET 3415:36387.
Componente legado: Modal/Content node 3048:14338 (FRAME — usar .clone(), não createInstance)
Opções: Bloquear cadastro B / Merge / Escalar
Reason code obrigatório + comentário

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`
## CAMADA 5 — Checkpoint

```
[ ] Frame "Admin / Operações / Desambiguação / Comparação" criado: 1440x880px
[ ] screen.layoutMode = "VERTICAL"
[ ] Topbar instanciado de 301:1056 — primeiro filho do screen — FILL horizontal
[ ] Topbar: breadcrumb e module overrideados com tryFont()
[ ] Row: HORIZONTAL, FILL
[ ] Sidebar instanciado de 305:3092 — primeiro filho do row
[ ] Sidebar item "Desambiguação" marcado como Active via setProperties
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

Comparar screenshot do frame `Admin / Operações / Desambiguação / Comparação` com referência `3134:3842`:

```
[ ] Dimensões: 1440x880 visíveis, sem overflow
[ ] Topbar: largura total, breadcrumb correto
[ ] Sidebar: item "Desambiguação" destacado
[ ] Body: gutter 24px visível nos 4 lados
[ ] Componentes: contagem correta, sem instâncias extras
[ ] Sem frames brutos onde DS components deveriam estar
[ ] Sem texto placeholder visível
[ ] Fills corretos — sem branco-sobre-branco ou fundos ausentes
[ ] Layers condicionais: visible=false no estado padrão
[ ] Overlays: appendados no screen, não no body
```

---
