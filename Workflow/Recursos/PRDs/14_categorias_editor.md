# Spec — Admin / Settings / Categorias / Editor
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #14 de 18 
> Prioridade de execução: **9**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Settings / Categorias / Editor
Sidebar ativo: Settings → Product → Categorias
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
    const node = await figma.getNodeByIdAsync("3134:3221");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3134:3221", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3134:3221", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Settings > Product > Categorias > Editor 
**Objetivo:** Definir regras, validação e impactos de uma categoria. 
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
Sidebar: 305:3092, item ativo: Settings → Product → Categorias
Topbar: 301:1056

### BLOCO 2 · Formulário (max 800px centrado, padding 40px)
**Componente de campo: Form/Field Row node 3415:36275** (Default / With Helper)
→ Usar para rows de label + input dentro do formulário. Variante "With Helper" para campos com hint text.
Campos:
 Nome da categoria: Input/Text node 1620:22601
 Descrição: Input/Textarea node 1625:48587
 Origem/Fonte: Input/Select node 3010:103319
 (API externa / Webhook / Manual / Inerente / Carga em lote)
 URL/endpoint: Input/Text (se API/Webhook)
 Dimensão segmentação: Input/Radio node 1627:20252
 (Por origem / Inerente / Atribuída)
 Regras de entrada: campo textual estruturado
 Regras de saída: condição de remoção
 Dependências: multi-select (outras categorias)
 Expiração: tipo (data fixa/período/permanente/evento) + valor
 Ação saneamento: Input/Select (Revalidação auto / Holding / Remoção automática)
 Impactos/Permissões: chips selecionáveis:
 "Libera acesso estádio" · "Libera compra ingresso"
 "Desconto meia-entrada" · "Bloqueia catraca" · "Exige step-up auth"

### BLOCO 3 · Versionamento
Versão atual: v2.3
Tabela histórico: versão | data | operador | diff resumido

### BLOCO 4 · Rodapé de ações
"Salvar rascunho" — Button Outline
"Publicar" — Button Primary
"Cancelar" — Button text/link
"Simular" → Frame 15

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`
## CAMADA 5 — Checkpoint

```
[ ] Frame "Admin / Settings / Categorias / Editor" criado: 1440x880px
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

Comparar screenshot do frame `Admin / Settings / Categorias / Editor` com referência `3134:3221`:

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
