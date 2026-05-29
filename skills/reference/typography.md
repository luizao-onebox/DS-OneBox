---
title: DS-OneBox Typography Reference
description: Sistema de tipografia do DS-OneBox com tokens semânticos
version: 1.0.0
updated: 2026-01-01
---

# DS-OneBox Typography Reference

## Philosophy

O sistema de tipografia do DS-OneBox abstrai font-size, line-height, letter-spacing e font-weight em **classes semânticas**. Nunca use valores arbitrários como `text-[14px]` ou `leading-[1.5]`. Use sempre as classes semânticas.

## Type Scale

### Display
Para headings hero ou métricas grandes.
```tsx
<span className="text-display-2xl">Display 2XL</span>
<span className="text-display-xl">Display XL</span>
<span className="text-display-lg">Display LG</span>
<span className="text-display-md">Display MD</span>
<span className="text-display-sm">Display SM</span>
```

### Headings
Para títulos de seções e páginas.
```tsx
<h1 className="text-h1">Heading 1</h1>
<h2 className="text-h2">Heading 2</h2>
<h3 className="text-h3">Heading 3</h3>
<h4 className="text-h4">Heading 4</h4>
<h5 className="text-h5">Heading 5</h5>
<h6 className="text-h6">Heading 6</h6>
```

### Body
Para textos de conteúdo. **Body MD é o padrão** (não precisa especificar).
```tsx
<p className="text-body-xl">Body XL — Usado em citações ou destaques</p>
<p className="text-body-lg">Body LG — Usado em introduções</p>
<p>Body MD — Padrão para parágrafos</p>
<p className="text-body-sm">Body SM — Textos secundários</p>
<p className="text-body-xs">Body XS — Labels, captions, timestamps</p>
```

### Labels
Para labels de form, badges, e tags.
```tsx
<span className="text-label-xl">Label XL</span>
<span className="text-label-lg">Label LG</span>
<span className="text-label-md">Label MD</span>
<span className="text-label-sm">Label SM</span>
<span className="text-label-xs">Label XS</span>
```

### Code
Para código inline e blocos de código.
```tsx
<code className="text-code-lg">code lg</code>
<code className="text-code-md">code md</code>
<code className="text-code-sm">code sm</code>
<code className="text-code-xs">code xs</code>
```

## Font Weights

| Weight | Class | Usage |
|---|---|---|
| 400 | `font-normal` | Body text |
| 500 | `font-medium` | Labels, subheadings |
| 600 | `font-semibold` | Emphasis |
| 700 | `font-bold` | Headings, strong emphasis |
| 800 | `font-extrabold` | Display, hero text |

## DS-OneBox Font Stack

O DS-OneBox usa **Inter** como fonte padrão. A stack completa:

```css
font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

Para código:
```css
font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

## Usage Rules

### ✅ DO: Use Semantic Classes

```tsx
// ✅ CERTO — usa classes semânticas
<h1 className="text-h1">Título da Página</h1>
<p className="text-body-md">Parágrafo de conteúdo</p>
<span className="text-label-sm">Label do campo</span>
```

### ❌ DON'T: Use Arbitrary Values

```tsx
// ❌ ERRADO — nunca use valores arbitrários
<h1 className="text-[32px] leading-[40px]">Título</h1>
<p className="text-[14px]">Parágrafo</p>

// ❌ ERRADO — não mude font-family manualmente
<p className="font-sans">Parágrafo</p>
```

### Hierarchy Pattern

Todo conteúdo de texto deve seguir hierarquia clara:

```
Display (hero/métricas)
  ↓
H1 (título de página)
  ↓
H2 (título de seção)
  ↓
Body (conteúdo)
  ↓
Body SM / Label (secundário)
```

## Color + Typography Combinations

### On Light Background
```tsx
<div className="bg-background p-6">
  <h1 className="text-h2 text-foreground">Título</h1>
  <p className="text-body-md text-muted-foreground">Texto secundário</p>
</div>
```

### On Dark Background
```tsx
<div className="bg-primary p-6">
  <h1 className="text-h2 text-primary-foreground">Título</h1>
  <p className="text-body-md text-primary-foreground/80">Texto</p>
</div>
```

### On Colored Card
```tsx
<div className="bg-card p-6 rounded-lg border">
  <h3 className="text-h4 text-card-foreground">Card Title</h3>
  <p className="text-body-sm text-muted-foreground">Card description</p>
</div>
```

## Line Length

Mantenha linhas de texto em **45-75 caracteres** para legibilidade ideal.

```tsx
// ❌ ERRADO — linha muito longa
<p className="text-body-md max-w-none">Lorem ipsum dolor sit amet...</p>

// ✅ CERTO — limite a largura
<p className="text-body-md max-w-prose">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</p>

// ✅ CERTO — ou use um container
<div className="max-w-md">
  <p>Texto com largura controlada</p>
</div>
```

## Truncation

Para texto que pode transbordar:

```tsx
// Uma linha com ellipsis
<p className="text-body-sm truncate">Texto muito longo que será truncado...</p>

// Duas linhas com ellipsis
<p className="text-body-sm line-clamp-2">
  Texto longo que pode ocupar até duas linhas antes de ser truncado...
</p>
```

## Accessibility

- Sempre use hierarquia de títulos (h1 → h2 → h3)
- Contraste mínimo de 4.5:1 para texto normal
- Não use texto em vermelho sozinho para indicar erro (use also icon ou badge)
- Line-height mínimo de 1.5 para body text

## Integration with DS-OneBox Components

### Card
```tsx
<Card>
  <CardHeader>
    <CardTitle className="text-h4">Título do Card</CardTitle>
    <CardDescription className="text-body-sm">
      Descrição secundária
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p className="text-body-md">Conteúdo principal</p>
  </CardContent>
</Card>
```

### Alert
```tsx
<Alert>
  <AlertTitle className="text-label-md font-semibold">Aviso</AlertTitle>
  <AlertDescription className="text-body-sm">
    Detalhes do aviso...
  </AlertDescription>
</Alert>
```

### Badge
```tsx
<Badge className="text-label-xs">Label</Badge>
```

### Table
```tsx
<TableHead className="text-label-sm text-muted-foreground">
  Cabeçalho
</TableHead>
<TableCell className="text-body-sm">
  Célula
</TableCell>
```
