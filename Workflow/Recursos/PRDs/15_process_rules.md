# Spec — Admin / Settings / Process & Rules
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #15 de 18 
> Prioridade de execução: **10**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Settings / Process & Rules
Sidebar ativo: Settings → Product → Process & Rules
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
    const node = await figma.getNodeByIdAsync("3134:3183");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3134:3183", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3134:3183", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Settings > Product > Process & Rules 
**Objetivo:** Simular as regras aplicadas a um cadastro específico — transparência do motor de categorias. 
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
Sidebar: 305:3092, item ativo: Settings → Product → Process & Rules
Topbar: 301:1056

### BLOCO 2 · Layout 2 colunas (padding 24px)

Coluna Esquerda — Input:
 Campo CPF ou ID: Input/Search node 1627:19619
 Botão "Simular": Button base Primary node 1627:20585

Coluna Direita — Output (após simular):

 Card verde — "Categorias aplicáveis":
 Token fundo: surface/success
 Lista: nome · fonte · motivo ("Aplicou porque data nasc > 60 anos")

 Card cinza — "Categorias não aplicáveis":
 Token fundo: surface/card, borda border/application
 Lista com motivo ("Não aplicou: webhook Avanti retornou plano inativo")

 Card amarelo — "Dependências bloqueando" (se houver):
 Token fundo: surface/warning
 Qual categoria falta para liberar outra

 Botão "Aplicar categoria manualmente" → Modal/Template node 3415:36387 (preferido) ou Modal/Content node 3048:14338 (legado, FRAME — usar .clone()):
 Seleção de categoria + justificativa obrigatória

Estado vazio: Alert info "Informe um CPF ou ID para simular" node 1627:22190

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`
## CAMADA 5 — Checkpoint

```
[ ] Frame "Admin / Settings / Process & Rules" criado: 1440x880px
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

Comparar screenshot do frame `Admin / Settings / Process & Rules` com referência `3134:3183`:

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
