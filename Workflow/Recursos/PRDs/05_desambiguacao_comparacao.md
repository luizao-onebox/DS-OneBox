# Spec — Admin / Operações / Desambiguação / Comparação
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #5 de 18
> Prioridade de execução: **6**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Operações / Desambiguação / Comparação
Sidebar ativo: Operações → Desambiguação
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
    const node = await figma.getNodeByIdAsync("3134:3842");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3134:3842", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3134:3842", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Operações > Desambiguação > Comparação
**Objetivo:** Decisão de duplicidade com evidências lado a lado.
**Dimensões:** 1440 × 880px
**Layout:** Topbar (1440px) no topo + Row abaixo com SidebarNav (240px fixo) + Body (FILL) + **Sidebar Right (320px fixo)**
**Screen:** `layoutMode = VERTICAL`
**Row:** `layoutMode = HORIZONTAL` (sidebar nav + body + sidebar right)
**Body:** padding 24px, VERTICAL, gap 24px
**Fundo:** `surface/desktop` → token `gray/100` → hex `#F7F7F8`

---

## CAMADA 4 — Spec de Blocos (sequencial)

### BLOCO 1 · Shell
Sidebar Nav: 305:3092, item ativo: Operações → Desambiguação
Topbar: 301:1056

### BLOCO 2 · Layout 3 colunas no Body (40 / 20 / 40)

Coluna Esquerda — Cadastro A:
 - Selfie grande
 - Nome completo, CPF mascarado, data nascimento
 - Data cadastro, canal origem, status (badge)
 - Categorias ativas (chips)
 - Device, IP, geolocalização
 - Botão "Abrir cadastro A" → Frame 7

Centro — Score:
 - Score: 94,2% — Progress Bar grande, colorida
 - Label: "Alta probabilidade — mesma pessoa"
 - Chips: "Mesmo device" · "IPs próximos" · "Capturas no mesmo dia"

Coluna Direita — Cadastro B:
 - Mesma estrutura que Cadastro A
 - Botão "Abrir cadastro B" → Frame 7

### BLOCO 3 · Sidebar Right (Conference) — Painel de decisão fixo à direita
**Componente:** `Sidebar Right / Conference (v3)` · Node `3588:1219185`
**Largura:** 320px fixo · **Altura:** FILL (acompanha a tela)
**Border:** 1px esquerdo `gray/200`

#### Variante aplicada nesta tela
Desambiguação é sempre comparação de documentos — usar `Tipo=Documental`.

| Propriedade | Valor | Justificativa |
|---|---|---|
| `Tipo` | `Documental` | Comparação de cadastros documentais |
| `Seleção` | `None` → `Partial` → `All` | Conforme operador seleciona indícios da IA |

#### Estados de `Seleção` conforme interação do operador
| Estado | `Seleção` | Quando usar |
|---|---|---|
| Operador acabou de abrir o caso | `None` | Nenhum indício selecionado |
| Operador marcou alguns indícios de duplicidade | `Partial` | Ex: "Mesmo device" selecionado |
| Operador concordou com todos os indícios | `All` | Todos os indícios marcados |

#### Estado padrão ao renderizar esta tela
```
Tipo    = Documental
Seleção = None  (operador ainda não interagiu)
```

#### Comportamento dos botões de ação
- **Aprovar / "Falso Positivo" (⌘A):** Confirma que NÃO é duplicidade — cadastros distintos
- **Reprovar / "Confirmar Duplicidade" (⌘R):** Confirma que É duplicidade — abre modal de ação
- Ao clicar em Reprovar: exibir **BLOCO 4** (modal de confirmação de duplicidade)

> **Nota:** Os labels "Aprovar" e "Reprovar" dentro do componente mantêm a nomenclatura padrão do DS.
> O contexto semântico ("Falso Positivo" vs "Confirmar Duplicidade") é comunicado pelo modal de confirmação.

#### Conteúdo da seção "Sugestões de Reprovação da IA"
- 5 indícios de duplicidade gerados pela IA (ex: "Mesmo device", "Selfies similares")
- Link "+ N Motivos" para expandir lista completa
- Cada indício clicável altera o estado de `Seleção`

### BLOCO 4 · Modal "Confirmar Duplicidade"
**Componente preferido: Modal/Template node 3415:36387** (Medium=640px recomendado para este conteúdo)
→ Usar createInstance() no COMPONENT_SET 3415:36387.
Componente legado: Modal/Content node 3048:14338 (FRAME — usar .clone(), não createInstance)
Opções: Bloquear cadastro B / Merge / Escalar
Reason code obrigatório + comentário

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`

```
[ ] Frame "Admin / Operações / Desambiguação / Comparação" criado: 1440x880px
[ ] screen.layoutMode = "VERTICAL"
[ ] Topbar instanciado de 301:1056 — primeiro filho do screen — FILL horizontal
[ ] Topbar: breadcrumb e module overrideados com tryFont()
[ ] Row: HORIZONTAL, FILL
[ ] Sidebar Nav instanciado de 305:3092 — primeiro filho do row
[ ] Sidebar Nav item "Desambiguação" marcado como Active via setProperties
[ ] Body: VERTICAL, FILL, padding 24px, gap 24px
[ ] Sidebar Right instanciado de 3588:1219185 — último filho do row
[ ] Sidebar Right: Tipo=Documental, Seleção=None (estado inicial)
[ ] Sidebar Right: layoutSizingVertical = FILL, width = 320px
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

Comparar screenshot do frame `Admin / Operações / Desambiguação / Comparação` com referência `3134:3842`:

```
[ ] Dimensões: 1440x880 visíveis, sem overflow
[ ] Topbar: largura total, breadcrumb correto
[ ] Sidebar Nav: item "Desambiguação" destacado
[ ] Body: gutter 24px visível nos 4 lados
[ ] Sidebar Right: visível à direita, 320px, borda esquerda gray/200
[ ] Sidebar Right: Tipo=Documental, Seleção=None
[ ] Sidebar Right: seção Gamification com 2 badges
[ ] Sidebar Right: 5 indícios de duplicidade da IA visíveis
[ ] Sidebar Right: botões Aprovar (⌘A) e Reprovar (⌘R) habilitados
[ ] Componentes: contagem correta, sem instâncias extras
[ ] Sem frames brutos onde DS components deveriam estar
[ ] Sem texto placeholder visível
[ ] Fills corretos — sem branco-sobre-branco ou fundos ausentes
[ ] Layers condicionais: visible=false no estado padrão
[ ] Overlays: appendados no screen, não no body
```

---
