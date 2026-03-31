# Spec — Admin / Cadastros / Busca & Lista
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #7 de 18 
> Prioridade de execução: **3**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Cadastros / Busca & Lista
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
**Objetivo:** Localizar qualquer cadastro com filtros avançados incluindo estado Blacklist. 
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
Sidebar: 305:3092, item ativo: Cadastros → Busca & Lista
Topbar: 301:1056

### BLOCO 2 · Barra de busca proeminente
Componente: Input/Search node 1627:19619
Placeholder: "Buscar por CPF, nome, e-mail, telefone ou ID"
Largura: FILL, tamanho grande

### BLOCO 3 · Filtros colapsáveis
Status (multi): Ativo / Pendente / Bloqueado / Incompleto / Blacklist
Categorias (multi-select dropdown)
Nível de risco (dropdown)
Data cadastro: Datepicker/Input node 1627:24054 (range)
Canal de origem (dropdown)

### BLOCO 4 · Contadores
Total: 142.847 · Ativos: 98.234 · Pendentes: 31.891 · Bloqueados: 12.722
Token texto: text/body

### BLOCO 5 · Banner condicional (filtro Blacklist ativo)
Componente: Alert/Components node 1627:22190
Texto: "Exibindo apenas cadastros em lista restritiva (Blacklist)"
Botão toolbar: "+ Adicionar à blacklist"

### BLOCO 6 · Tabela
Componente: DataTable node 3048:41686
| Coluna | Exemplo |
|--------|---------|
| Nome | João da Silva Santos |
| CPF | •••.456.789-•• |
| Status | Badge: Ativo/Pendente/Bloqueado/Incompleto/Blacklist node 3010:97638 |
| Categorias | chips: Sócio Avanti · Estudante |
| Risco | Badge: Baixo/Médio/Alto colorido |
| Biometria | Badge: OK / Pendente / Falha |
| Último acesso | 27/02/2026 14:32 |
| Ação | Clique na linha → Frame 8 (Drawer) |

### BLOCO 7 · Paginação
Componente: DataTable-Pagination node 1627:26879

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`
## CAMADA 5 — Checkpoint

```
[ ] Frame "Admin / Cadastros / Busca & Lista" criado: 1440x880px
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

Comparar screenshot do frame `Admin / Cadastros / Busca & Lista` com referência `3134:3525`:

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
