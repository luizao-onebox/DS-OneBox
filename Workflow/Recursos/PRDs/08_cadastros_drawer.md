# Spec — Admin / Cadastros / Busca & Lista — Drawer
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #8 de 18 
> Prioridade de execução: **3**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Cadastros / Busca & Lista — Drawer
Sidebar ativo: Cadastros → Busca & Lista
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
    const node = await figma.getNodeByIdAsync("3134:3525");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3134:3525", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3134:3525", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Cadastros > Busca & Lista 
**Objetivo:** Perfil condensado do cadastro — overlay sobre Frame 7. 
**Dimensões:** 1440 × 880px
**Layout:** Topbar (1440px) no topo + Row abaixo com SidebarNav (240px fixo) + Body (FILL)
**Screen:** `layoutMode = VERTICAL`
**Row:** `layoutMode = HORIZONTAL` (sidebar + body)
**Body:** padding 24px, VERTICAL, gap 24px
**Fundo:** `surface/desktop` → token `gray/100` → hex `#F7F7F8`
**Fundo:** `surface/desktop` (gray/100)

---

## CAMADA 4 — Spec de Blocos (sequencial)

### BLOCO 1 · Base
Frame 7 como background com overlay gray/600 40% opacidade

### BLOCO 2 · Drawer lateral direito
Componente base: Drawer/Sidebar-Right node 365:2379
Largura: 480px · Altura: FILL (880px)
Posição: ancorado à direita

### BLOCO 3 · Cabeçalho do Drawer
Avatar circular: node 3010:97645 (foto/selfie circular)
Nome completo + CPF mascarado
Badge status grande + nível de risco node 3010:97638
Botão X fechar (canto superior direito)

### BLOCO 4 · Overview Card
Status biometria · Status documentos · Categorias ativas · Score de risco
Token fundo: surface/card

### BLOCO 5 · Ações rápidas
Botões em linha: "Bloquear" · "Desbloquear" · "Escalar" · "Ver conferência"
Componente: Button sm node 1627:20589

### BLOCO 6 · Tabs dentro do drawer
Componente: Tabs node 1620:23012
| Tab | Conteúdo |
|-----|----------|
| Resumo | Status atual, checklist validações //, integrações pendentes |
| Identidade | Nome, CPF, nascimento, tel, e-mail, consentimentos |
| Biometria | Miniatura selfie, liveness, dedup, Bepass |
| Documentos | Miniatura, OCR/NER resumido, benefícios |
| Categorias | Lista ativas, validade, status |
| Eventos | Timeline/Activity Log node 1625:58679 — últimos 10 eventos |

### BLOCO 7 · Rodapé
"Abrir perfil completo" — link azul, text/link

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`
## CAMADA 5 — Checkpoint

```
[ ] Frame "Admin / Cadastros / Busca & Lista — Drawer" criado: 1440x880px
[ ] screen.layoutMode = "VERTICAL"
[ ] Topbar instanciado de 301:1056 — primeiro filho do screen — FILL horizontal
[ ] Topbar: breadcrumb e module overrideados com tryFont()
[ ] Row: HORIZONTAL, FILL
[ ] Sidebar instanciado de 305:3092 — primeiro filho do row
[ ] Sidebar item "Cadastros" marcado como Active via setProperties
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

Comparar screenshot do frame `Admin / Cadastros / Busca & Lista — Drawer` com referência `3134:3525`:

```
[ ] Dimensões: 1440x880 visíveis, sem overflow
[ ] Topbar: largura total, breadcrumb correto
[ ] Sidebar: item "Cadastros" destacado
[ ] Body: gutter 24px visível nos 4 lados
[ ] Componentes: contagem correta, sem instâncias extras
[ ] Sem frames brutos onde DS components deveriam estar
[ ] Sem texto placeholder visível
[ ] Fills corretos — sem branco-sobre-branco ou fundos ausentes
[ ] Layers condicionais: visible=false no estado padrão
[ ] Overlays: appendados no screen, não no body
```

---
