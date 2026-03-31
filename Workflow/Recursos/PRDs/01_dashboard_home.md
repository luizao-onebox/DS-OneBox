# Spec — Admin / Dashboard / Home
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #1 de 18
> Prioridade de execução: **1 (primeira impressão)**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Dashboard / Home
Sidebar ativo: Dashboard
Plataforma: Desktop 1440 × 880px
DS Skill: DS-COMPONENTS.md + DS-TOKENS.md + HELPERS.md
Memória: Primeira tela — registrar padrões de layout para as demais
```

---

## CAMADA 2 — Referência Visual

> Executar via figma_execute antes de qualquer geração:

```javascript
// Capturar referência visual da tela final esperada
await figma_execute({
  code: `
    const node = await figma.getNodeByIdAsync("3205:19408");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
// Depois chamar:
figma_take_screenshot({ nodeId: "3205:19408", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3205:19408", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Dimensões:** 1440 × 880px
**Layout:** Topbar (1440px) no topo + Row abaixo com SidebarNav (240px fixo) + Body (FILL)
**Screen:** `layoutMode = VERTICAL`
**Row:** `layoutMode = HORIZONTAL` (sidebar + body)
**Body:** padding 24px, VERTICAL, gap 24px
**Fundo:** `surface/desktop` → token `gray/100` → hex `#F7F7F8`
**Breadcrumb:** Dashboard

---

## CAMADA 4 — Spec de Blocos (sequencial)

### BLOCO 1 · Shell (Sidebar + Topbar)

```
Sidebar:
  Node: 305:3092 (Collapsed=False)
  layoutSizingVertical: FILL
  Item ativo: "Dashboard"
  Override: setProperties({ "State": "Active" }) no nav item com texto "Dashboard"
  (ver padrão "Setting the active sidebar item" na SKILL.md)

Topbar:
  Node: 301:1056
  Props: Breadcrumb=True, Right Content=True
  layoutSizingHorizontal: FILL
  Text overrides:
    - Node name "Breadcrumb" → "Dashboard"
    - Node name "Module" → "OneDocs Admin"
```

### BLOCO 2 · Banner de Alerta (condicional — visível apenas no estado Degradado)

```
Componente: Alert/Components
Variante: Color=Danger → Node ID: 1627:22199
Visibilidade padrão: banner.visible = false (estado Normal)
                     banner.visible = true  (estado Degradado)
Nome da layer: "[state=degradado] Alert Banner"

Text overrides dentro da instância:
  - Node name "Title" → "Sistema em contingência — 2 integrações offline"
  - Node name "Description" → "Ver Integrações →"

 NÃO sobrescrever fills do componente. A cor é controlada pela prop Color=Danger.
 O link "Ver Integrações" deve ter hotspot → Frame 17.
```

### BLOCO 3 · Linha de cabeçalho

```
Layout: HORIZONTAL, justify-between, FILL horizontal

Esquerda:
  Criar TextNode
  Texto: "Dashboard"
  Style: text-2xl, font-semibold, text/title

Direita: dois componentes em linha (gap 12px)
  1. Seletor de período — Tabs/Pills (não ButtonGroup — são 4 opções)
     Node: 1620:23085
     Opções: Hoje / 7d / 30d / Custom
     Estado padrão: "Hoje" selecionado (primeiro item ativo)

  2. Botão "Atualizar"
     Node: 1627:20589 (Button, Primary, sm, Outline=False)
     Text override: "Atualizar"
```

### BLOCO 4 · KPI Cards (4 em linha)

**Componentes de seção disponíveis:**
- `PageSection/KPI Row` node 3415:34634 — agrupa row de KPIs (Default/With Percent/With Icon)
- `PageSection/Stats Row` node 3415:36116 — agrupa 3/4/6 stats em linha
→ Preferir instanciar o COMPONENT_SET e ajustar variante. Se precisar customização maior, usar Stats-Widget individuais.

```
Layout: HORIZONTAL, gap 24px, FILL horizontal
Todos os cards: Stats-Widget

| # | Card | Valor | Subtítulo | Variante | Node ID |
|---|------|-------|-----------|---------|---------|
| 1 | Cadastros Hoje | 12.847 | +18% vs ontem | Type=Stat & Percent | 1631:101679 |
| 2 | Taxa de Conclusão | 71,8% | 9.234 concluídos | Type=Stat & Percent | 1631:101679 |
| 3 | Pendências | 2.891 | 847 em conferência manual | Type=Default | 1631:101670 |
| 4 | Reprovações | 722 | 312 fraude · 410 qualidade | Type=Icon + Text + Stats | 1631:101686 |

Text overrides por card (usar tryFont() em cada node TEXT):
  Card 1: value="12.847", label="Cadastros Hoje", change="+18%", period="vs ontem"
  Card 2: value="71,8%",  label="Taxa de Conclusão", change="9.234", period="concluídos"
  Card 3: value="2.891",  label="Pendências", subtitle="847 em conferência manual"
  Card 4: value="722",    label="Reprovações", detail="312 fraude · 410 qualidade"

Estado empty: se value="0", substituir subtítulo por "Nenhum registro no período"
```

### BLOCO 5 · Linha 2 — Gráfico + Alertas (2 colunas)

```
Layout: HORIZONTAL, gap 24px, FILL horizontal
Larguras em px (content = 1200px total, gap = 24px):
  Coluna Esquerda: 720px  (60%)
  Coluna Direita:  456px  (38% — 1200-720-24=456)

Coluna Esquerda (720px):
  Componente: Chart/Bar-Horizontal
  Node: 1616:33691 (LG/Horizontal Bar/Desktop)
  Header-Widget acima do chart:
    Node: 1631:100848 (Type=Heading)
    Text: "Funil de Onboarding"
  Dados do funil (override nos labels do chart):
    Formulário → OTP → Captura Facial → Liveness → Captura Doc → Conferência → Aprovado
  Cor das barras: primitive token blue/500

Coluna Direita (456px):
  Componente: Alert/Components — TRÊS instâncias empilhadas (gap 12px)
  Layout: VERTICAL, gap 12px

  Header acima das instâncias:
    TextNode: "Alertas de sistema", text-base, font-semibold, text/title

  Alerta 1 — SERASA offline:
    Node: 1627:22199 (Color=Danger)
    Title: "SERASA offline"
    Description: "Indisponível há 45 min"

  Alerta 2 — Latência RF:
    Node: 1627:22215 (Color=Warning)
    Title: "Latência Receita Federal"
    Description: "> 3s de resposta"

  Alerta 3 — Bepass OK:
    Node: 1627:22191 (Color=Success)
    Title: "Bepass sincronizado"
    Description: "Última sync há 2 min"
```

### BLOCO 6 · Tabela "Conferências Prioritárias"

```
Componente wrapper: DataTable node 3048:41686
Título seção: "Conferências Prioritárias (top 10)", text-lg, font-semibold, text/title

Toolbar:
  Node: DataTable-Toolbar, Type=Heading & Description

Colunas e tipos de renderização:
  | Coluna | Tipo | Renderização |
  |--------|------|-------------|
  | Tipo | Texto | text-sm, text/body |
  | Pendentes | Número | text-sm, text/body, right-aligned |
  | Mais antigo | Data relativa | text-sm, text/body (ex: "há 2h", "ontem") |
  | SLA restante | Badge colorido | Verde se >2h · Amarelo se 30min–2h · Vermelho se <30min |
  | Status | Badge/Components | Yellow=Em conferência · Red=Atrasado · Green=Concluído |

Dados mock (5 linhas mínimo, variar status):
  | Tipo | Pendentes | Mais antigo | SLA restante | Status |
  |------|-----------|-------------|-------------|--------|
  | Selfie | 142 | há 3h | 45min | Badge Red |
  | Documento | 87 | há 1h | 2h 10min | Badge Yellow |
  | Reconhecimento facial | 63 | há 30min | 4h | Badge Green |
  | Documento estudantil | 44 | há 5h | Vencido | Badge Red |
  | Análise de risco | 29 | há 20min | 6h | Badge Green |

Estado empty (quando sem dados):
  Exibir mensagem centralizada: "Nenhuma conferência pendente no momento"
  SubTexto: "As conferências prioritárias aparecerão aqui quando houver itens na fila"
  Sem botão de ação no empty state

Paginação: DataTable-Pagination, Type=Table Data (mostra contagem de rows)

Botão primário: Node 1627:20705 (Button Green base)
  Text: "Ir para Conferências"
  Hotspot: → Frame 2

Botão secundário: Node 1627:21065 (Button Alternative Outline base)
  Text: "Ver Integrações"
  Hotspot: → Frame 17

Layout dos botões: HORIZONTAL, gap 12px, alinhado à direita do rodapé da tabela
```

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`

```
[ ] Frame "Admin / Dashboard / Home" criado: 1440x880px
[ ] screen.layoutMode = "VERTICAL"
[ ] Topbar instanciado de 301:1056 — primeiro filho do screen — FILL horizontal
[ ] Topbar: breadcrumb e module overrideados com tryFont()
[ ] Row: HORIZONTAL, FILL
[ ] Sidebar instanciado de 305:3092 — primeiro filho do row
[ ] Sidebar item "Dashboard" marcado como Active via setProperties
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

Comparar screenshot do frame `Admin / Dashboard / Home` com referência `3205:19408`:

```
[ ] Dimensões: 1440x880 visíveis, sem overflow
[ ] Topbar: largura total, breadcrumb correto
[ ] Sidebar: item "Dashboard" destacado
[ ] Body: gutter 24px visível nos 4 lados
[ ] Componentes: contagem correta, sem instâncias extras
[ ] Sem frames brutos onde DS components deveriam estar
[ ] Sem texto placeholder visível
[ ] Fills corretos — sem branco-sobre-branco ou fundos ausentes
[ ] Layers condicionais: visible=false no estado padrão
[ ] Overlays: appendados no screen, não no body
```

---
