# Spatial Design Reference

## DS-OneBox Spacing System

DS-OneBox uses a 4px base unit grid for all spacing decisions, ensuring visual harmony and rhythm.

## Spacing Token Scale

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| `space-0` | 0px | `0` | Reset spacing |
| `space-1` | 4px | `1` | Icon gaps, tight lists |
| `space-2` | 8px | `2` | Form element gaps |
| `space-3` | 12px | `3` | Button padding-x |
| `space-4` | 16px | `4` | Card padding, section gaps |
| `space-5` | 20px | `5` | Modal padding |
| `space-6` | 24px | `6` | Page section spacing |
| `space-8` | 32px | `8` | Major section breaks |
| `space-10` | 40px | `10` | Page margins |
| `space-12` | 48px | `12` | Hero sections |
| `space-16` | 64px | `16` | Large section gaps |
| `space-20` | 80px | `20` | Page header spacing |

## Component Spacing Rules

### Buttons
```tsx
<Button className="h-10 px-4 gap-2">
  <Icon className="h-4 w-4" />
  Label
</Button>

<Button variant="outline" className="h-9 px-3 text-sm">
  Compact
</Button>
```

### Form Elements
```tsx
<div className="space-y-2">
  <Label>Field label</Label>
  <Input className="h-10" />
  <p className="text-sm text-muted-foreground">Helper text</p>
</div>

<div className="flex gap-4">
  <FormField className="flex-1" />
  <FormField className="flex-1" />
</div>
```

### Card
```tsx
<Card className="p-6 space-y-4">
  <CardHeader className="pb-4">
    <CardTitle>Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">
    Content
  </CardContent>
  <CardFooter className="pt-4 gap-2">
    Actions
  </CardFooter>
</Card>
```

### Dialog/Modal
```tsx
<DialogContent className="p-6 gap-6 max-w-lg">
  <DialogHeader className="space-y-2">
    <DialogTitle />
    <DialogDescription />
  </DialogHeader>
  <div className="space-y-4">
    Content
  </div>
  <DialogFooter className="gap-2 sm:gap-0">
    Actions
  </DialogFooter>
</DialogContent>
```

### Navigation
```tsx
<nav className="flex items-center gap-6 p-4">
  <NavigationMenu>
    <NavigationMenuList className="gap-1">
      <NavigationMenuItem>
        <NavigationMenuLink className="px-3 py-2" />
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</nav>
```

## Layout Rhythm

### Page Structure
```
Page Header (space-10 top, space-6 bottom)
├── Title (text-3xl font-bold)
├── Subtitle (text-muted-foreground)
└── Actions (gap-2)

Page Content
├── Section 1 (space-12)
├── Section 2 (space-12)
└── Section 3 (space-12)

Page Footer
└── Pagination/Stats (space-8 top)
```

### Grid System
```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {cards}
</div>

<div className="grid gap-6 lg:grid-cols-12">
  <aside className="lg:col-span-3" /> {/* Sidebar */}
  <main className="lg:col-span-9" />  {/* Content */}
</div>
```

### Sidebar Layout
```tsx
<div className="flex h-screen">
  <aside className="w-64 border-r p-4">
    Sidebar content
  </aside>
  <main className="flex-1 overflow-auto p-6">
    Main content
  </main>
</div>
```

## Spacing DO's and DON'Ts

### DO
- Use 4px base multiples consistently
- Use `space-y-*` for vertical stacking
- Use `gap-*` for grid/flex gaps
- Use `p-*` for component padding
- Use `m-*` for margins sparingly

### DON'T
- Don't use arbitrary values (e.g., `p-[13px]`)
- Don't mix `gap` and margin-based spacing
- Don't use `space-y-1` for text blocks
- Don't create spacing that isn't 4px-aligned
- Don't use negative margins for layout

## Responsive Spacing

```tsx
<div className="p-4 sm:p-6 lg:p-8">
  <div className="space-y-4 sm:space-y-6 lg:space-y-8">
    Content
  </div>
</div>
```

## Content Width Patterns

### Constrained Content
```tsx
<main className="mx-auto max-w-3xl px-4 sm:px-6">
  Readable prose content
</main>
```

### Full Width with Container
```tsx
<div className="container py-8">
  <div className="grid gap-6">
    Dashboard content
  </div>
</div>
```

### Centered Auth Forms
```tsx
<div className="flex min-h-screen items-center justify-center p-4">
  <Card className="w-full max-w-sm">
    Form content
  </Card>
</div>
```

## Visual Hierarchy Through Spacing

```tsx
<h1 className="text-4xl font-bold tracking-tight mb-4">
  Title
</h1>
<p className="text-muted-foreground mb-8">
  Subtitle / Lead paragraph
</p>
<p className="text-sm text-muted-foreground mb-6">
  Section description
</p>
<div className="space-y-2">
  <h3 className="font-semibold">Subsection</h3>
  <p className="text-sm">Detail text</p>
</div>
```

## Separator and Dividers

```tsx
<div className="flex items-center gap-4">
  <Separator className="flex-1" />
  <span className="text-xs text-muted-foreground">or</span>
  <Separator className="flex-1" />
</div>
```

## Integration with DS-OneBox Skills

- **LAYOUT.md**: Sidebar, Dialog, Drawer spacing rules
- **FORMS.md**: Form field spacing and validation messages
- **FEEDBACK.md**: Toast positioning and stacking
- **RESOLVER.md**: Composition spacing rules
