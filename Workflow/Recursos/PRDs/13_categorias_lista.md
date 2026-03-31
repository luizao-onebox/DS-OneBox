# Spec — Admin / Settings / Categorias / Lista
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #13 de 18 
> Prioridade de execução: **9**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Settings / Categorias / Lista
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
    const node = await figma.getNodeByIdAsync("3134:3615");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3134:3615", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3134:3615", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Settings > Product > Categorias 
**Objetivo:** Administrar categorias de cadastros (benefícios, permissões, segmentos). 
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

### BLOCO 2 · Cabeçalho
Título: "Categorias" text-2xl, text/title
Botão "+ Criar Categoria": Button base Primary node 1627:20585

### BLOCO 3 · Tabela
Componente: DataTable node 3048:41686
| Categoria | Origem | Validade padrão | Cadastros ativos | Status | Última alt. | Ação |
|-----------|--------|-----------------|-----------------|--------|-------------|------|
| Estudante | API externa | 31/03 anual | 12.847 | Ativa | 15/01/2026 | Editar · Simular |
| Menor de Idade | Inerente | Ao completar 18 | 3.421 | Ativa | 01/01/2026 | Editar · Simular |
| PCD | Manual+comprovante | 12 meses | 1.567 | Ativa | 10/02/2026 | Editar · Simular |
| Sócio Avanti Ouro | Webhook Avanti | Mensal | 45.678 | Ativa | 27/02/2026 | Editar · Simular |
| Banido | Seg. Pública+manual | Até revisão | 312 | Ativa | 26/02/2026 | Editar · Simular |

Status: Badge/Components node 3010:97638 (green = Ativa, red = Inativa)

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`
## CAMADA 5 — Checkpoint

```
[ ] Frame "Admin / Settings / Categorias / Lista" criado: 1440x880px
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

Comparar screenshot do frame `Admin / Settings / Categorias / Lista` com referência `3134:3615`:

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
