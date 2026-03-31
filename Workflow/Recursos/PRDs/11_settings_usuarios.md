# Spec — Admin / Settings / Usuários
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #11 de 18 
> Prioridade de execução: **12**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Settings / Usuários
Sidebar ativo: Settings → Usuários
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
    const node = await figma.getNodeByIdAsync("3134:3555");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3134:3555", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3134:3555", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Settings > Usuários 
**Objetivo:** Gestão de operadores e permissões (RBAC) do backoffice. 
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
Sidebar: 305:3092, item ativo: Settings → Usuários
Topbar: 301:1056

### BLOCO 2 · Cabeçalho
Título: "Usuários & Permissões" text-2xl, text/title
Botão "+ Novo Usuário": Button base Primary node 1627:20585 (alinhado à direita)

### BLOCO 3 · Filtros
Status (Ativo/Inativo), Perfil (dropdown multi)

### BLOCO 4 · Tabela
Componente: DataTable node 3048:41686
| Coluna | Exemplo |
|--------|---------|
| Avatar + Nome | [avatar] Maria Silva node 3010:97645 |
| E-mail | maria.silva@onedocs.com.br |
| Perfil | Badge: Operador(gray)/Supervisor(blue)/Segurança(orange)/Admin(red)/Auditor(purple) |
| Status | Badge: Ativo / Inativo |
| Último acesso | 27/02/2026 14:32 |
| Ações | "Editar" · "Desativar" — Button xs |

### BLOCO 5 · Card de perfis
Tabela abaixo da lista:
| Perfil | Descrição | Cor |
|--------|-----------|-----|
| Operador | Conferências, sem config | gray |
| Supervisor | Operador + escalar, desbloquear | blue |
| Segurança & Fraude | Desamb, blacklist, panic button | orange |
| Admin | Acesso total | red |
| Auditor | Read-only + export mascarado | purple |

### BLOCO 6 · Modal "+ Novo Usuário"
**Componente preferido: Modal/Template node 3415:36387** (Small=480px recomendado para formulários de usuário)
→ Usar createInstance() no COMPONENT_SET 3415:36387.
Componente legado: Modal/Content node 3048:14338 (FRAME — usar .clone(), não createInstance)
Campos: Nome · E-mail · Perfil (dropdown) · Status
Botões: Criar (primary) / Cancelar (ghost)

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`
## CAMADA 5 — Checkpoint

```
[ ] Frame "Admin / Settings / Usuários" criado: 1440x880px
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

Comparar screenshot do frame `Admin / Settings / Usuários` com referência `3134:3555`:

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
