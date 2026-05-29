# Responsive Design Reference

## DS-OneBox Breakpoint System

DS-OneBox uses Tailwind's mobile-first responsive design approach.

## Breakpoints

| Breakpoint | Min Width | Tailwind Prefix | Typical Devices |
|------------|-----------|-----------------|------------------|
| Default | 0px | (no prefix) | Mobile |
| `sm` | 640px | `sm:` | Large phones, small tablets |
| `md` | 768px | `md:` | Tablets |
| `lg` | 1024px | `lg:` | Laptops |
| `xl` | 1280px | `xl:` | Desktops |
| `2xl` | 1536px | `2xl:` | Large screens |

## Responsive Patterns

### Grid Columns
```tsx
// Mobile: 1 column | Tablet: 2 columns | Desktop: 3 columns | Large: 4 columns
<div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {items}
</div>

// Sidebar layout
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
  <aside className="lg:col-span-3">
    Sidebar
  </aside>
  <main className="lg:col-span-9">
    Content
  </main>
</div>
```

### Typography
```tsx
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
  Responsive Heading
</h1>
<p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
  Responsive body text
</p>
```

### Padding and Margins
```tsx
<div className="p-4 sm:p-6 lg:p-8">
  <div className="mx-4 sm:mx-auto max-w-md lg:max-w-2xl">
    Centered content
  </div>
</div>
```

### Visibility
```tsx
// Show on mobile only
<div className="block lg:hidden">
  Mobile navigation
</div>

// Show on desktop only
<div className="hidden lg:block">
  Desktop navigation
</div>

// Show on tablet and above
<div className="hidden sm:block">
  Extended navigation
</div>
```

## Component Responsive Behavior

### DataTable
```tsx
<div className="hidden md:block">
  <DataTable full columns={columns} data={data} />
</div>
<div className="md:hidden">
  <CardList items={data} />
</div>
```

### Charts
```tsx
<div className="w-full aspect-video min-h-[300px]">
  <ChartContainer config={chartConfig}>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <Bar dataKey="value" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  </ChartContainer>
</div>
```

### Dialog (Mobile: Full Screen, Desktop: Centered)
```tsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    Content
  </DialogContent>
</Dialog>
```

### Navigation
```tsx
// Mobile: Hamburger menu
// Desktop: Full horizontal menu
<div className="flex items-center justify-between">
  <div className="flex items-center gap-4">
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64">
        Navigation content
      </SheetContent>
    </Sheet>
    <Logo className="hidden sm:flex" />
  </div>
  <nav className="hidden lg:flex items-center gap-6">
    Nav items
  </nav>
</div>
```

### Forms
```tsx
<div className="grid gap-4 sm:grid-cols-2">
  <FormField label="First name" className="sm:col-span-2 lg:col-span-1" />
  <FormField label="Last name" className="sm:col-span-2 lg:col-span-1" />
</div>

<Button className="w-full sm:w-auto">
  Submit
</Button>
```

### Cards
```tsx
<Card className="p-4 sm:p-6">
  <CardHeader className="flex-row items-start justify-between gap-4">
    <div className="flex-1">
      <CardTitle className="text-lg sm:text-xl">Title</CardTitle>
      <CardDescription className="text-sm">Description</CardDescription>
    </div>
    <Badge variant="outline" className="shrink-0">Badge</Badge>
  </CardHeader>
</Card>
```

## Mobile-First DO's and DON'Ts

### DO
- Start with mobile design, enhance for larger screens
- Use `grid-cols-1` as default, add breakpoints for larger layouts
- Test touch targets minimum 44x44px on mobile
- Use `aspect-video` carefully (can conflict with chart responsiveness)
- Ensure text is readable at all breakpoints (no `text-xs` on mobile headings)

### DON'T
- Don't use `hidden` without complementary `block` or `flex`
- Don't assume hover states work on mobile
- Don't use `hover:` prefixes without touch fallback
- Don't create breakpoints for minor variations (avoid `2xl:`)
- Don't stack too many grid columns (max 4 for cards)

## Touch-Friendly Targets

```tsx
// Minimum 44x44px touch target
<Button className="h-11 w-full sm:h-10 sm:w-auto">
  Touch-friendly button
</Button>

// Icon-only buttons need proper sizing
<Button variant="ghost" size="icon" className="h-11 w-11">
  <Icon className="h-5 w-5" />
</Button>
```

## Responsive Containers

```tsx
// Constrained prose content
<div className="prose prose-sm sm:prose-base max-w-none">
  Long-form content
</div>

// Dashboard cards
<div className="container px-4 mx-auto sm:px-6 lg:px-8">
  Dashboard content
</div>

// Full-bleed hero
<div className="w-full bg-primary text-primary-foreground py-12 sm:py-16 lg:py-24">
  Hero content
</div>
```

## Common Responsive Layouts

### 2-Column (Mobile: Stacked)
```tsx
<div className="grid gap-6 sm:grid-cols-2">
  <LeftColumn />
  <RightColumn />
</div>
```

### 3-Column (Mobile: Stacked, Tablet: 2 cols, Desktop: 3 cols)
```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <Card />
  <Card />
  <Card />
</div>
```

### Sidebar + Content (Mobile: Drawer, Desktop: Fixed)
```tsx
<div className="flex">
  <aside className="hidden lg:block w-64 fixed inset-y-0 left-0">
    Sidebar
  </aside>
  <main className="flex-1 lg:ml-64 p-6">
    Content
  </main>
</div>
```

### Sticky Header
```tsx
<header className="sticky top-0 z-50 bg-background border-b px-4 sm:px-6">
  Header content
</header>
```

## Responsive DO's and DON'Ts

### DO
- Design mobile-first (base styles are mobile)
- Use Tailwind's responsive prefixes (`sm:`, `md:`, etc.)
- Test on actual devices when possible
- Use `min-h-screen` for full-height layouts
- Stack on mobile, spread on desktop

### DON'T
- Don't design desktop-first (inverts the mental model)
- Don't use `xl:` or `2xl:` for critical layout changes
- Don't forget about landscape orientation on mobile
- Don't hide essential content on mobile
- Don't use fixed pixel values for widths (use `max-w-*`)

## Integration with DS-OneBox Skills

- **LAYOUT.md**: Sidebar responsiveness, navigation patterns
- **FORMS.md**: Responsive form layouts and inputs
- **DATA.md**: Chart responsiveness, table vs card views
- **FEEDBACK.md**: Toast positioning across breakpoints
