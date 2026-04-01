# Componente — Sidebar Right (Conference)

> Arquivo Figma: `q3mFYxgvpAK1KxeLVvRVKX` · Node: `3588:1219185`
> Tipo: Componente contextual — painel lateral direito fixo
> Versão: v3

---

## 1. Contexto

```
Produto:     OneDocs Admin
Função:      Painel de contexto e ações nas telas de revisão/conferência
Plataforma:  Desktop 1440×880px
Posição:     Direita da tela, após o conteúdo principal (Body)
Largura:     320px fixo
Altura:      FILL (preenche a altura disponível)
```

**Telas que usam este componente:**
- Telas de Conferência Individual (fluxo de revisão)
- Telas de Desambiguação (fluxo de comparação)
- Todas as telas com padrão: Navbar + Conteúdo Central + **Fixed Right Sidebar**

**Função:** Exibe sugestões de reprovação da IA, gamificação do operador e botões de ação primários (Aprovar / Reprovar).

---

## 2. Anatomia

```
SidebarRight (COMPONENT, 320px, FILL, VERTICAL)
  ├─ Content (FRAME, FILL×FILL, VERTICAL, gap=0)
  │    ├─ Gamification (FRAME, FILL×HUG, VERTICAL, gap=8px, padBottom=12px)
  │    │    ├─ Badge Row (FRAME, FILL×HUG, HORIZONTAL, gap=6px)
  │    │    │    ├─ Badge gamification — "na fila"   (INSTANCE 3588:862126)
  │    │    │    └─ Badge gamification — "conferidos" (INSTANCE 3588:862123)
  │    │    └─ Divider (RECTANGLE, FILL×1px, cor: gray/200)
  │    │
  │    └─ Failed AI (FRAME, FILL×HUG, VERTICAL, gap=8px)
  │         ├─ Title (TEXT, ALL CAPS, "SUGESTÕES DE REPROVAÇÃO DA IA", cor: gray/700)
  │         ├─ AI Reasons (FRAME, FILL×HUG, VERTICAL, gap=2px)
  │         │    └─ Reason 1…5 (INSTANCE, FILL×HUG, 32px)
  │         └─ More Reasons (FRAME, HUG, HORIZONTAL, gap=4px)
  │              └─ "+ N Motivos de reprovação" (TEXT)
  │
  └─ Actions (FRAME, FILL×HUG, VERTICAL, gap=8px)
       ├─ Divider (RECTANGLE, FILL×1px, cor: gray/200)
       ├─ Action · Aprovar  (INSTANCE, FILL×50px) — shortcut ⌘A
       └─ Action · Reprovar (INSTANCE, FILL×50px) — shortcut ⌘R
```

---

## 3. Variantes e Estados

| Propriedade | Valores | Descrição |
|---|---|---|
| `Tipo` | `Biometria` / `Documental` / `Validade` | Tipo de documento sendo conferido |
| `Seleção` | `None` / `Partial` / `All` | Estado de seleção das sugestões da IA |

**Combinações (3 × 3 = 9 variants):**

| Seleção | Comportamento |
|---|---|
| `None` | Nenhuma sugestão selecionada — todos os Reasons em estado Default |
| `Partial` | Reason 1 usa componente selecionado (`3588:862138`), demais em Default (`3588:862144`) |
| `All` | Todos os Reasons usam componente selecionado (`3588:862138`) |

---

## 4. Especificações Visuais

### Container principal
| Propriedade | Valor | Token |
|---|---|---|
| Largura | 320px | — |
| Altura | FILL | — |
| Background | `#FFFFFF` | `white` |
| Border esquerdo | 1px `#E2E4E8` | `gray/200` |
| Padding | 16px todos os lados | `spacing/16` |
| Layout | VERTICAL | — |

### Seção Gamification
| Propriedade | Valor |
|---|---|
| Gap interno | 8px |
| Padding bottom | 12px |
| Badge Row | FILL horizontal, gap=6px |
| Divider | 1px, `gray/200`, FILL horizontal |

### Seção Failed AI
| Propriedade | Valor |
|---|---|
| Gap entre seções | 8px |
| Título | Inter SemiBold, ALL CAPS, `gray/700` |
| AI Reasons gap | 2px |
| Reasons sempre exibidos | 5 |
| "More Reasons" | Frame HUG, gap=4px, texto "+ N Motivos de reprovação" |

### Botões de Ação (Actions)
| Propriedade | Valor |
|---|---|
| Gap | 8px |
| Divider | 1px, `gray/200`, FILL horizontal |
| Altura dos botões | 50px fixo |
| Padding | 16px todos os lados |
| Gap Label+Ícone | 8px |
| Shortcut Aprovar | ⌘A |
| Shortcut Reprovar | ⌘R |

---

## 5. IDs dos Componentes Instanciados

| Componente | Node ID | Uso |
|---|---|---|
| Badge gamification (fila) | `3588:862126` | Badge Row — "na fila" |
| Badge gamification (conferidos) | `3588:862123` | Badge Row — "conferidos" |
| Reason (Default) | `3588:862144` | AI Reasons — estado não selecionado |
| Reason (Selected) | `3588:862138` | AI Reasons — estado selecionado |
| Action · Aprovar (Enable) | `3588:862165` | Botão Aprovar ativo |
| Action · Aprovar (Disable) | `3588:862179` | Botão Aprovar inativo |
| Action · Reprovar (Enable) | `3588:862172` | Botão Reprovar ativo |
| Action · Reprovar (Disable) | `3603:1261516` | Botão Reprovar inativo |

---

## 6. Comportamento

- **Aprovar (⌘A):** Confirma conferência do documento
- **Reprovar (⌘R):** Abre painel de motivo de reprovação
- **Seleção=Partial:** Indica que o operador selecionou parte das sugestões da IA
- **Seleção=All:** Todas as sugestões da IA foram aceitas
- **More Reasons:** Link para exibir sugestões além das 5 visíveis
- **Altura:** Sidebar sempre FILL; seções crescem com o conteúdo

---

## 7. Referência Figma

| Item | Node ID |
|---|---|
| Component Set | `3588:1219185` |
| Arquivo | `q3mFYxgvpAK1KxeLVvRVKX` |
