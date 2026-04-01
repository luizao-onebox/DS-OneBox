# Spec — Admin / Operações / Conferências / Individual
> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Frame #3 de 18
> Prioridade de execução: **4**
> **V2** — código JS removido. Use helpers de `HELPERS.md`. Tokens em `DS-TOKENS.md`. Componentes em `DS-COMPONENTS.md`.

---

## CAMADA 1 — Contexto

```
Produto: OneDocs Admin — RFP Palmeiras
Tela: Admin / Operações / Conferências / Individual
Sidebar ativo: Operações → Conferências → Individual
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
    const node = await figma.getNodeByIdAsync("3150:14501");
    figma.viewport.scrollAndZoomIntoView([node]);
  `
});
figma_take_screenshot({ nodeId: "3150:14501", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
figma_get_component({ nodeId: "3150:14501", fileKey: "q3mFYxgvpAK1KxeLVvRVKX" });
```

---

## CAMADA 3 — Spec da Tela

**Breadcrumb:** Operações > Conferências > Individual > Caso #4521
**Objetivo:** Decisão humana em um único caso — evidências visuais + sugestões da IA + ação.
**Dimensões:** 1440 × 880px
**Layout:** Topbar (1440px) no topo + Row abaixo com SidebarNav (240px fixo) + Body (FILL) + **Sidebar Right (320px fixo)**
**Screen:** `layoutMode = VERTICAL`
**Row:** `layoutMode = HORIZONTAL` (sidebar nav + body + sidebar right)
**Body:** padding 24px, VERTICAL, gap 24px
**Fundo:** `surface/desktop` → token `gray/100` → hex `#F7F7F8`

---

## CAMADA 4 — Spec de Blocos (sequencial)

### BLOCO 1 · Shell
Sidebar Nav: 305:3092, item ativo: Operações → Conferências → Individual
Topbar: 301:1056

### BLOCO 2 · Layout 2 colunas no Body (sem padding lateral, full-bleed)
Coluna Esquerda (60%) — Evidências:
 - Selfie capturada (imagem grande, moldura surface/desktop)
 - Documento frente + verso
 - ZoomButton node 517:4439 (zoom +/-)
 - Controles: rotação, brilho/contraste
 - Metadados rodapé: Device · IP · Geolocalização · Timestamp

Coluna Direita (40%) — Dados:

 Bloco 1 — OCR Match:
 Tabela compacta: Campo | Valor OCR | Valor informado | Match / | Confiança %
 Ex: Nome | JOÃO DA SILVA | João da Silva | | 98%

 Bloco 2 — Checklist automático:
 Face detectada · Liveness · Qualidade facial 87%
 Match face-doc 94% · CPF válido · Dedup 1:N sem match

### BLOCO 3 · Sidebar Right (Conference) — Painel de decisão fixo à direita
**Componente:** `Sidebar Right / Conference (v3)` · Node `3588:1219185`
**Largura:** 320px fixo · **Altura:** FILL (acompanha a tela)
**Border:** 1px esquerdo `gray/200`

#### Variante por tipo de conferência
| Tipo de caso | Propriedade `Tipo` |
|---|---|
| Verificação biométrica (selfie + face) | `Biometria` |
| Verificação documental (CNH, RG, Passaporte) | `Documental` |
| Verificação de validade/prazo | `Validade` |

#### Estados de `Seleção` conforme interação do operador
| Estado | `Seleção` | Quando usar |
|---|---|---|
| Inicial — operador acabou de abrir o caso | `None` | Nenhuma sugestão da IA selecionada |
| Operador concordou com parte das sugestões | `Partial` | Reason 1 marcado, demais não |
| Operador concordou com todas as sugestões | `All` | Todos os Reasons marcados |

#### Estado padrão ao renderizar esta tela
```
Tipo    = conforme tipo do caso (Biometria / Documental / Validade)
Seleção = None  (operador ainda não interagiu)
```

#### Comportamento dos botões de ação
- **Aprovar (⌘A):** Sempre habilitado — confirma a conferência sem motivo de reprovação
- **Reprovar (⌘R):** Sempre habilitado — abre modal de confirmação com reason code
- Ao clicar em Reprovar: exibir **BLOCO 4** (modal de confirmação)

#### Conteúdo da seção Gamification
- Badge "na fila": quantidade de casos pendentes do operador
- Badge "conferidos": quantidade conferida na sessão atual

#### Conteúdo da seção "Sugestões de Reprovação da IA"
- 5 sugestões exibidas (lista fixa)
- Link "+ N Motivos de reprovação" para expandir lista completa
- Cada reason clicável muda o estado de `Seleção`: None → Partial → All

### BLOCO 4 · Modal ao clicar Reprovar
**Componente preferido: Modal/Template node 3415:36387** (Small=480px recomendado para este conteúdo)
→ Usar createInstance() no COMPONENT_SET 3415:36387.
Componente legado: Modal/Content node 3048:14338 (FRAME — usar .clone(), não createInstance)
Conteúdo: Reason code (dropdown) obrigatório + comentário
Info: "Esta decisão será registrada com seu nome e timestamp"
Botões: Confirmar / Cancelar

Link: "Abrir cadastro completo" → Frame 7

---

## CAMADA 5 — Checkpoint

> Executar após build. Helpers: `HELPERS.md` · Tokens: `DS-TOKENS.md` · Componentes: `DS-COMPONENTS.md`

```
[ ] Frame "Admin / Operações / Conferências / Individual" criado: 1440x880px
[ ] screen.layoutMode = "VERTICAL"
[ ] Topbar instanciado de 301:1056 — primeiro filho do screen — FILL horizontal
[ ] Topbar: breadcrumb e module overrideados com tryFont()
[ ] Row: HORIZONTAL, FILL
[ ] Sidebar Nav instanciado de 305:3092 — primeiro filho do row
[ ] Sidebar Nav item "Conferências" marcado como Active via setProperties
[ ] Body: VERTICAL, FILL, padding 24px, gap 24px
[ ] Sidebar Right instanciado de 3588:1219185 — último filho do row
[ ] Sidebar Right: Tipo conforme tipo do caso, Seleção=None (estado inicial)
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

Comparar screenshot do frame `Admin / Operações / Conferências / Individual` com referência `3150:14501`:

```
[ ] Dimensões: 1440x880 visíveis, sem overflow
[ ] Topbar: largura total, breadcrumb correto
[ ] Sidebar Nav: item "Conferências" destacado
[ ] Body: gutter 24px visível nos 4 lados
[ ] Sidebar Right: visível à direita, 320px, borda esquerda gray/200
[ ] Sidebar Right: seção Gamification com 2 badges
[ ] Sidebar Right: 5 sugestões da IA visíveis
[ ] Sidebar Right: botões Aprovar e Reprovar com shortcuts ⌘A e ⌘R
[ ] Componentes: contagem correta, sem instâncias extras
[ ] Sem frames brutos onde DS components deveriam estar
[ ] Sem texto placeholder visível
[ ] Fills corretos — sem branco-sobre-branco ou fundos ausentes
[ ] Layers condicionais: visible=false no estado padrão
[ ] Overlays: appendados no screen, não no body
```

---
