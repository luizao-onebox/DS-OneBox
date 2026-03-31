# Spec — Admin / Settings / Organização
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #12 de 18 
> Prioridade de execução: **13**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Settings / Organização
Sidebar ativo: Settings → Organização
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
    const node = await figma.getNodeByIdAsync("3134:3649");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3134:3649", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3134:3649", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Settings > Organização 
**Objetivo:** Configurações globais da organização — perfil, API, notificações e feature flags. 
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
Sidebar: 305:3092, item ativo: Settings → Organização
Topbar: 301:1056

### BLOCO 2 · Tabs (4 seções)
Componente: Tabs node 1620:23012

Tab 1 — Perfil da Organização:
 Upload logo (drop zone)
 Inputs: Nome organização · Razão social · E-mail contato · Telefone suporte
 Select: Timezone · Locale (pt-BR)
 Botão "Salvar" — Button base Primary

Tab 2 — API & Integrações:
 Seção API Keys:
 Tabela: Nome | Key (mascarada) | Criado em | Último uso | Ações (Revogar)
 Botão "+ Gerar nova chave"
 Seção Webhooks:
 URL callback (Input/Text node 1620:22601)
 Eventos assinados (checkboxes node 1627:20292)
 Secret (mascarado)
 Toggle Produção/Staging com Modal de confirmação node 1627:20333

Tab 3 — Notificações:
 Tabela regras de alerta:
 | Evento | Canal | Destinatário | Threshold | Ativo |
 |--------|-------|-------------|-----------|-------|
 | Integração offline | E-mail + Slack | ops@onedocs.com | Imediato | Toggle |
 | Fila SLA vencida | E-mail | supervisores | >10 itens | Toggle |
 | Fraude confirmada | Slack | #segurança | Qualquer | Toggle |

Tab 4 — Feature Flags & Limites:
 Tabela: Funcionalidade | Estado (Toggle) | Descrição | Modificado por | Data
 Ex: Deduplicação 1:N · Análise de risco · Revisão liveness manual
 Limites operacionais: Input/Number node 1625:48978 (max por fila, SLA targets)

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`
## CAMADA 5 — Checkpoint

```
[ ] Frame "Admin / Settings / Organização" criado: 1440x880px
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

Comparar screenshot do frame `Admin / Settings / Organização` com referência `3134:3649`:

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
