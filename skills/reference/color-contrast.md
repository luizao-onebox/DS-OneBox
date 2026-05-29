---
title: DS-OneBox Color & Contrast Reference
description: Sistema de cores do DS-OneBox com tokens semânticos e regras de contraste
version: 1.0.0
updated: 2026-01-01
---

# DS-OneBox Color & Contrast Reference

## Philosophy

O sistema de cores do DS-OneBox segue arquitetura **3 camadas semânticas**:

```
CAMADA 1: Brand/Primary    → primary-{scale}
CAMADA 2: Semantic States → success, warning, destructive, info
CAMADA 3: Neutrals        → neutral, muted, border, background
```

**Regra de ouro: Nunca use valores hardcoded. Use sempre tokens.**

## Token Architecture

### Layer 1: Primary Colors (Brand)

Cores da marca/produto. Usar para elementos primários de ação.

```tsx
// Uso em Tailwind
<div className="bg-primary text-primary-foreground">Botão Primário</div>
<Button className="bg-primary hover:bg-primary/90">Click</Button>

// Escala completa
bg-primary-50    // Muito claro
bg-primary-100
bg-primary-200
bg-primary-300
bg-primary-400
bg-primary-500   // Padrão
bg-primary-600
bg-primary-700
bg-primary-800
bg-primary-900   // Muito escuro
bg-primary-950
```

### Layer 2: Semantic Colors (States)

Cores que comunicam estado/significado.

| Token | Significado | Uso |
|---|---|---|
| `success` | Sucesso, positivo, completo | Chips de status, confirmações |
| `warning` | Atenção, cautela | Alertas não críticos |
| `destructive` | Erro, perigo, ação destrutiva | Botões de delete, erros |
| `info` | Informação, dica | Notificações informativas |

```tsx
// Uso correto
<Badge variant="success">Ativo</Badge>
<Badge variant="warning">Pendente</Badge>
<Badge variant="destructive">Erro</Badge>
<Badge variant="info">Dica</Badge>

// Cores de texto
<p className="text-success">Valor positivo</p>
<p className="text-warning">Valor em atenção</p>
<p className="text-destructive">Valor negativo</p>
```

### Layer 3: Neutral Colors

Cores para estrutura, bordas e backgrounds.

| Token | Usage |
|---|---|
| `foreground` | Texto principal (se adapta a dark mode) |
| `background` | Fundo da página (se adapta a dark mode) |
| `muted` | Textos secundários, placeholders |
| `muted-foreground` | Texto terciário |
| `border` | Bordas de cards, inputs |
| `input` | Background de inputs |
| `ring` | Ring de focus |

```tsx
// Uso
<p className="text-foreground">Texto principal</p>
<p className="text-muted-foreground">Texto secundário</p>
<div className="border border-border">Card com borda</div>
<input className="bg-input border-border" />
```

## Color Usage Rules

### ✅ DO: Use Semantic Tokens

```tsx
// ✅ CERTO — usa tokens semânticos
<Button className="bg-primary hover:bg-primary/90">
  Salvar
</Button>

<Badge variant="success">Ativo</Badge>

<p className="text-destructive">Erro encontrado</p>
```

### ❌ DON'T: Use Hardcoded Colors

```tsx
// ❌ ERRADO — nunca use valores hardcoded
<Button className="bg-blue-500 hover:bg-blue-600">
  Salvar
</Button>

<Badge className="bg-green-500">Ativo</Badge>

<p className="text-red-500">Erro</p>

// ❌ ERRADO — não use hsl manual
<div style={{ color: 'hsl(142, 76%, 36%)' }}>
```

## Dark Mode

Todos os tokens se adaptam automaticamente ao dark mode.

```tsx
// Light mode: foreground = #000000
// Dark mode:  foreground = #ffffff

<p className="text-foreground">Este texto funciona em ambos</p>

// Se precisar explicitly light/dark:
<p className="text-foreground dark:text-dark-foreground">
```

## Contrast Rules (WCAG 2.1)

### Minimum Contrast Ratios

| Element Type | Minimum Ratio | Example |
|---|---|---|
| Normal text | 4.5:1 | Body text |
| Large text (18px+) | 3:1 | Headings, labels |
| UI components | 3:1 | Buttons, inputs |
| Focus indicators | 3:1 | Focus rings |
| Decorative | No requirement | Backgrounds |

### ✅ DO: Ensure Adequate Contrast

```tsx
// ✅ CERTO — contraste adequado
<div className="bg-background text-foreground">
  <p className="text-body-md">Texto legível</p>
</div>

// ✅ CERTO — texto em badge com cor de fundo
<Badge variant="success" className="bg-success-100 text-success-800">
  Sucesso
</Badge>
```

### ❌ DON'T: Low Contrast Combinations

```tsx
// ❌ ERRADO — contraste muito baixo
<p className="text-muted-foreground">Este texto é difícil de ler</p>
// só use em texto terciário/decorativo

// ❌ ERRADO — texto claro em fundo claro
<div className="bg-muted">
  <p className="text-muted-foreground">Ilegível</p>
</div>
```

## Chart Colors

**REGRA CRÍTICA: Cores em Charts DEVEM ser HEX ou RGB.**

```tsx
// ✅ CERTO — HEX
const config = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#10b981" },
}

// ❌ ERRADO — hsl não funciona em SVG
const config = {
  desktop: { label: "Desktop", color: "hsl(var(--primary))" },
}

// ❌ ERRADO — variáveis CSS não funcionam inline
const config = {
  desktop: { label: "Desktop", color: "var(--primary)" },
}
```

### DS-OneBox Chart Color Palette

Para gráficos, use esta paleta pré-definida:

```tsx
const CHART_COLORS = {
  blue:   '#2563eb',   // Primary
  green:  '#10b981',   // Success
  yellow: '#f59e0b',   // Warning
  red:    '#ef4444',   // Destructive
  purple: '#8b5cf6',   // Info
  pink:   '#ec4899',   // Accent
  cyan:   '#06b6d4',   // Secondary
  orange: '#f97316',   // Tertiary
}
```

## Semantic Color Mapping

### Status → Color

| Status | Background | Text | Use Case |
|---|---|---|---|
| `success` | `success-100` | `success-800` | Confirmação, ativo |
| `warning` | `warning-100` | `warning-800` | Atenção, pendente |
| `destructive` | `destructive-100` | `destructive-800` | Erro, inativo |
| `info` | `info-100` | `info-800` | Dica, observação |

```tsx
// Exemplo de Badge com cor semanticamente correta
<Badge
  variant="success"
  className="bg-success-100 text-success-800"
>
  ✓ Ativo
</Badge>

// Alerta com cor semanticamente correta
<Alert variant="warning">
  <AlertTitle>Atenção</AlertTitle>
  <AlertDescription>
    Sua assinatura expira em 3 dias.
  </AlertDescription>
</Alert>
```

### NOVO: Background Colors

Para backgrounds de seções ou cards:

```tsx
// Backgrounds de superfície
bg-background    // Fundo principal da página
bg-card          // Fundo de cards
bg-muted         // Fundos sutis, zebras de tabela

// Backgrounds de elementos interativos
bg-primary       // Botões primários
bg-input         // Inputs de formulário
bg-popover       // Popovers, dropdowns

// Backgrounds decorativos
bg-gradient-primary     // Gradiente da marca
bg-gradient-card        // Gradiente sutil para cards especiais
```

## Border Colors

```tsx
// Bordas padrão
<div className="border border-border">

// Bordas de inputs (ativos)
<input className="border-input focus:border-ring">

// Bordas separadas
<div className="border-t border-border">
```

## Focus & Ring Colors

Para estados de focus/accessibility:

```tsx
// Ring de focus (importante para a11y!)
<button className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">

// Ring de cor primária
<button className="focus-visible:ring-primary">
```

## Overlay & Shadows

```tsx
// Backdrop de modais
<div className="bg-background/80 backdrop-blur-sm">

// Sombras (não use cores!)
<div className="shadow-sm">       // Subtle
<div className="shadow-md">       // Medium
<div className="shadow-lg">       // Large (cards elevados)

// NÃO USE shadow com cores hardcoded
// ❌ ERRADO: shadow-[0_2px_8px_rgba(0,0,0,0.1)]
// ✅ CERTO: shadow-sm ou shadow-md
```

## Color Tokens in Components

### Button Variants
```tsx
<Button>Default (Primary)</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Badge Variants
```tsx
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="info">Info</Badge>
```

### Alert Variants
```tsx
<Alert>Default</Alert>
<Alert variant="destructive">Error</Alert>
<Alert variant="success">Success</Alert>
<Alert variant="warning">Warning</Alert>
```
