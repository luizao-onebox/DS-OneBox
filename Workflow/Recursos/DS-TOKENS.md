# DS-TOKENS — Design System Token Reference

> Fonte da verdade para cores, tipografia, espaçamento, bordas e sombras.
> Figma file: `q3mFYxgvpAK1KxeLVvRVKX` · Versão: 2.0 · Atualizado: 2026-03-30
> **Regra:** Sempre usar tokens semânticos. Primitivos apenas para cores de série em gráficos.

---

## Tokens Semânticos — usar sempre

### Surfaces (fundos)

| Token | Primitivo | Hex | Uso |
|-------|-----------|-----|-----|
| `surface/desktop` | `gray/100` | `#F7F7F8` | Fundo de página/app |
| `surface/card` | `white` | `#FFFFFF` | Fundo de cards e painéis |
| `surface/application` | `white` | `#FFFFFF` | Fundo principal do app |
| `surface/active` | `blue/100` | `#EFF5FF` | Estado ativo/selecionado |
| `surface/disabled` | `gray/200` | `#EEEEF2` | Elemento desabilitado |
| `surface/error` | `red/100` | `#FFF0F0` | Estado de erro |
| `surface/warning` | `yellow/50` | `#FFFAF5` | Estado de aviso |
| `surface/success` | `green/50` | `#F0FEFA` | Estado de sucesso |
| `surface/action/approve` | `green/600` | `#22C55E`* | Botão aprovar/confirmar |
| `surface/action/disapprove` | `red/600` | `#DC3535`* | Botão reprovar/cancelar |

### Text

| Token | Primitivo | Hex | Uso |
|-------|-----------|-----|-----|
| `text/title` | `gray/700` | `#374151` | Títulos, headings principais |
| `text/body` | `gray/500` | `#5D6475` | Texto corrido |
| `text/nav` | `gray/600` | `#4C5464` | Labels de navegação |
| `text/tool` | `gray/600` | `#4C5464` | Texto de toolbar |
| `text/label` | `gray/500` | `#5D6475` | Labels de formulário |
| `text/active` | `gray/600` | `#4C5464` | Texto em estado ativo |
| `text/disabled` | `gray/400` | `#939AAA` | Texto desabilitado |
| `text/action` | `white` | `#FFFFFF` | Texto em botões de ação |
| `text/link` | `blue/600` | `#3B72DF` | Links |
| `text/error` | `red/700` | `#B71C1C` | Mensagens de erro |
| `text/success` | `green/800` | `#105C21` | Mensagens de sucesso |
| `text/warning` | `yellow/700` | `#806406` | Mensagens de aviso |

### Borders

| Token | Primitivo | Hex | Uso |
|-------|-----------|-----|-----|
| `border/application` | `gray/200` | `#E2E5EA` | Dividers, bordas padrão |
| `border/active` | `blue/500` | `#3D85F5` | Input focado, outline ativo |
| `border/success` | `green/200` | `#BBE5C5` | Borda estado sucesso |
| `border/warning` | `yellow/200` | `#FEEEA5` | Borda estado aviso |

### Forms

| Token | Primitivo | Hex | Uso |
|-------|-----------|-----|-----|
| `form/input` | `white` | `#FFFFFF` | Fundo de input |
| `form/inputborder` | `gray/300` | `#D1D5DA` | Borda de input |

---

## Primitivos de cor

> Escala Tailwind-compatível (50–950). Usar **somente** quando não houver token semântico.

| Família | Uso |
|---------|-----|
| `blue/50`–`blue/950` | Brand primário, links, estados ativos |
| `gray/50`–`gray/950` | UI neutro, texto, bordas |
| `red/50`–`red/950` | Perigo, erros, ações destrutivas |
| `orange/50`–`orange/950` | Avisos fortes, alertas |
| `yellow/50`–`yellow/950` | Avisos suaves, alertas |
| `green/50`–`green/950` | Sucesso, aprovar, estados positivos |
| `darkblue/50`–`darkblue/950` | Brand secundário, surfaces escuros |
| `white` / `black` | #FFFFFF / #000000 |

> ⚠️ Não usar outras famílias Tailwind (slate, amber, indigo…) em UI — não têm mapeamento semântico.

---

## Tipografia

**Font:** Inter · **Source:** Onebox DS (flowbite-pro-figma-v2.10.0)

> Sempre usar `applyTextStyle()` ou `makeText()` do HELPERS.md.
> Nunca setar `fontName`/`fontSize` diretamente em nós que devem ter DS style.

### Estilos mais usados

| Nome do estilo | px | Peso | Uso semântico |
|---|---|---|---|
| `text-xs/font-medium` | 12 | Medium | table/header, badge, button/sm |
| `text-xs/font-semibold` | 12 | Semi Bold | badge ênfase |
| `text-sm/font-normal` | 14 | Regular | body/default, table/cell |
| `text-sm/font-medium` | 14 | Medium | label, nav/item, button/base |
| `text-sm/font-semibold` | 14 | Semi Bold | body/strong, nav ativo |
| `text-base/font-semibold` | 16 | Semi Bold | heading/sub, data/value |
| `text-lg/font-semibold` | 18 | Semi Bold | heading/card |
| `text-xl/font-semibold` | 20 | Semi Bold | heading/section |
| `text-2xl/font-semibold` | 24 | Semi Bold | heading/page (máx 1 por tela) |
| `text-2xl/font-bold` | 24 | Bold | data/stat |
| `text-3xl/font-bold` | 30 | Bold | data/kpi — número grande |

### Mapa semântico (TEXT_STYLE_MAP)

Ver HELPERS.md — seção `TEXT_STYLE_MAP`.

### Uppercase

Mesmo estilo + `node.textCase = "UPPER"` — usar para cabeçalhos de tabela.

---

## Espaçamento

Escala Tailwind padrão — usar sempre estes valores para padding, gap, width, height.

| px | | px | | px |
|----|---|----|----|-----|
| 0 | | 20 | | 80 |
| 2 | | 24 | | 96 |
| 4 | | 28 | | 112 |
| 6 | | 32 | | 128 |
| 8 | | 36 | | 144 |
| 10 | | 40 | | 160 |
| 12 | | 44 | | 176 |
| 16 | | 48 | | 192 |

> Valores mais usados no projeto: **4, 8, 12, 16, 24, 32, 48**

---

## Border Radius

| Classe | Valor |
|--------|-------|
| `rounded-sm` | 2px |
| `rounded` | 4px |
| `rounded-md` | 6px |
| `rounded-lg` | 8px |
| `rounded-xl` | 12px |
| `rounded-2xl` | 16px |
| `rounded-full` | 9999px |

---

## Sombras

| Classe | Uso |
|--------|-----|
| `shadow-sm` | Cards, inputs |
| `shadow-md` | Dropdowns |
| `shadow-lg` | Modais, drawers |

---

## Layout — Proporções de colunas

Área de conteúdo = 1440px − 240px (sidebar) = **1200px**

| Proporção | Esquerda | Direita |
|-----------|----------|---------|
| 60 / 40 | 720px | 480px |
| 50 / 50 | 600px | 600px |
| 70 / 30 | 840px | 360px |
| 60 / 38 (com gap 24) | 720px | 456px |

> Em Figma HORIZONTAL auto-layout: usar `resize(px, h)` + `layoutSizingHorizontal = "FIXED"`.
> `layoutGrow` aceita apenas `0` ou `1` — não usar valores fracionários.
