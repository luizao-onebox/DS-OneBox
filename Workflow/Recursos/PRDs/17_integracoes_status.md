# Spec — Admin / Settings / Integrações / Status
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #17 de 18 
> Prioridade de execução: **2**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Settings / Integrações / Status
Sidebar ativo: Settings → Integrações → Status & Panic Button
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
    const node = await figma.getNodeByIdAsync("3134:3157");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3134:3157", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3134:3157", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Settings > Integrações > Status & Panic Button 
**Objetivo:** Monitorar validadores e operar contingência — ANEXO OBRIGATÓRIO DA RFP. 
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
Sidebar: 305:3092, item ativo: Settings → Integrações → Status
Topbar: 301:1056

### BLOCO 2 · Banner condicional
Componente: Alert/Components node 1627:22190
Texto: " Sistema operando em contingência — 2 integrações offline"
Token fundo: surface/error

### BLOCO 3 · Tabela de Integrações
Componente: DataTable node 3048:41686 (ou novo: 3393:11073)
**Componente de status: Card/Integration Status node 3415:36241**
Variantes: Status=Online / Offline / Degraded — usar para status badges inline na coluna Status.
| Integração | Nível | Status | Latência | Taxa Erro | Modo Atual | Última Check | Ação |
|-----------|-------|--------|----------|-----------|-----------|-------------|------|
| Seg. Pública/Listas | Nível 1 | Offline | — | — | Hard Block | 14:32 | Ver logs |
| Receita Federal (CPF) | Nível 2 | Online | 245ms | 0,2% | Normal | 14:47 | Ver logs |
| SERASA | Nível 2 | Offline | — | — | Assíncrono | 13:52 | Ver logs |
| Konduto (Antifraude) | Nível 2 | Degradado | 1.240ms | 4,8% | Normal | 14:46 | Ver logs |
| Bepass (Catracas) | Outbound | Online | 89ms | 0,0% | Normal | 14:47 | Ver logs |
| Avanti (Sócio) | Bidirecional | Online | 312ms | 0,1% | Normal | 14:47 | Ver logs |

Status badges: red/600 · green/600 · yellow/500

### BLOCO 4 · Modal "Alterar Modo"
**Componente preferido: Modal/Template node 3415:36387** (Small=480px / Medium=640px / Large=800px)
→ Preferir sobre Modal/Content (3048:14338, que é FRAME — usar .clone()).
→ Modal/Template é COMPONENT_SET — usar createInstance() e selecionar tamanho via variante.
Componente legado: Modal/Content node 3048:14338 (FRAME — usar .clone(), não createInstance)
Conteúdo: Integração + status atual
 Novo modo: dropdown (Hard Block / Degradado / Assíncrono)
 Justificativa: obrigatória (Input/Textarea)
 Duração: "30 min" / "Até desativar manualmente"
 Botões: Confirmar / Cancelar

### BLOCO 5 · Métricas de Contingência
Tabela: Validador | Cadastros em contingência (24h) | Pendentes | Resolvidos | % Resolvido

### BLOCO 6 · Log de Ações Recentes
Tabela: Data/Hora | Operador | Validador | Ação | Justificativa

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`
## CAMADA 5 — Checkpoint

```
[ ] Frame "Admin / Settings / Integrações / Status" criado: 1440x880px
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

Comparar screenshot do frame `Admin / Settings / Integrações / Status` com referência `3134:3157`:

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
