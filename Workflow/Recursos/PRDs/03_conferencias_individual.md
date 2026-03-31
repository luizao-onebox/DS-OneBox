# Spec — Admin / Operações / Conferências / Individual
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #3 de 18 
> Prioridade de execução: **4**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Operações / Conferências / Individual
Sidebar ativo: Operações → Conferências → Individual
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
    const node = await figma.getNodeByIdAsync("3150:14501");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3150:14501", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3150:14501", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Operações > Conferências > Individual > Caso #4521 
**Objetivo:** Decisão humana em um único caso — evidências visuais + dados + ação. 
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
Sidebar: 305:3092, item ativo: Operações → Conferências → Individual
Topbar: 301:1056

### BLOCO 2 · Layout 2 colunas (sem padding lateral, full-bleed)
Coluna Esquerda (60%) — Evidências:
 - Selfie capturada (imagem grande, moldura surface/desktop)
 - Documento frente + verso
 - ZoomButton node 517:4439 (zoom +/-)
 - Controles: rotação, brilho/contraste
 - Metadados rodapé: Device · IP · Geolocalização · Timestamp

Coluna Direita (40%) — Dados e Decisão:

 Bloco 1 — OCR Match:
 Tabela compacta: Campo | Valor OCR | Valor informado | Match / | Confiança %
 Ex: Nome | JOÃO DA SILVA | João da Silva | | 98%

 Bloco 2 — Checklist automático:
 Face detectada · Liveness · Qualidade facial 87% 
 Match face-doc 94% · CPF válido · Dedup 1:N sem match 

### BLOCO 3 · Decision Bar (rodapé fixo)
Componente: ConferenceButton node 352:1439
 - Aprovar (⌘A) — surface/action/approve
 - Reprovar (⌘R) — surface/action/disapprove
 - Solicitar Reenvio — neutral
 - Escalar — neutral

### BLOCO 4 · Modal ao clicar Reprovar/Aprovar
**Componente preferido: Modal/Template node 3415:36387** (Small=480px recomendado para este conteúdo)
→ Usar createInstance() no COMPONENT_SET 3415:36387.
Componente legado: Modal/Content node 3048:14338 (FRAME — usar .clone(), não createInstance)
Conteúdo: Reason code (dropdown) obrigatório + comentário
Info: "Esta decisão será registrada com seu nome e timestamp"
Botões: Confirmar / Cancelar

Link: "Abrir cadastro completo" → Frame 7

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`

```
[ ] Frame "Admin / Operações / Conferências / Individual" criado: 1440x880px
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

Comparar screenshot do frame `Admin / Operações / Conferências / Individual` com referência `3150:14501`:

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
