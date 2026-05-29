# Motion Design Reference

## DS-OneBox Animation System

Motion in DS-OneBox follows a purposeful, performant philosophy — animations communicate state, not decorate.

## Animation Token Scale

### Durations
| Token | Value | Usage |
|-------|-------|-------|
| `duration-instant` | 50ms | Micro-interactions (checkbox, toggle) |
| `duration-fast` | 150ms | Buttons, hovers, focus rings |
| `duration-normal` | 200ms | Modals, dropdowns, cards |
| `duration-slow` | 300ms | Page transitions, sidebars |
| `duration-slower` | 500ms | Complex sequences |

### Easings
| Token | Usage |
|-------|-------|
| `ease-in-out` | Default for most components |
| `ease-out` | Elements entering viewport |
| `ease-in` | Elements leaving viewport |
| `ease-bounce` | Success confirmations, achievements |

## Component Animation Patterns

### Buttons
```tsx
<Button className="transition-all duration-fast ease-out hover:scale-[1.02] active:scale-[0.98]">
  Click me
</Button>
```

### Dialog/Modal
```tsx
<Dialog>
  <DialogContent className="animate-in fade-in-0 zoom-in-95 duration-200">
    Content
  </DialogContent>
</Dialog>
```

### Toast Notifications
```tsx
<Toast className="animate-in slide-in-from-right-full duration-300">
  Operation successful
</Toast>
```

### Accordion
```tsx
<Accordion type="single" collapsible>
  <AccordionContent className="animate-in slide-in-from-top-2 duration-200">
    Expandable content
  </AccordionContent>
</Accordion>
```

### Skeleton Loading
```tsx
<Skeleton className="animate-pulse bg-muted rounded-md h-4 w-full" />
```

### Hover Card
```tsx
<HoverCard>
  <HoverCardTrigger />
  <HoverCardContent className="animate-in fade-in-0 zoom-in-95 duration-200">
    Preview content
  </HoverCardContent>
</HoverCard>
```

## Animation DO's and DON'Ts

### DO
- Use `duration-fast` (150ms) for hover states
- Use `ease-out` for elements entering view
- Use `ease-in` for elements leaving view
- Animate `opacity` and `transform` only (GPU-accelerated)
- Respect `prefers-reduced-motion`

### DON'T
- Don't animate `width`, `height`, `margin`, `padding` directly
- Don't exceed `duration-slow` (300ms) for UI elements
- Don't animate layout properties (causes reflow)
- Don't disable animations globally without `prefers-reduced-motion` check
- Don't use animation for decorative purposes only

## Reduced Motion Support

```tsx
function useReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function AnimatedComponent() {
  const reducedMotion = useReducedMotion();
  
  return (
    <div className={reducedMotion ? '' : 'transition-all duration-200'}>
      Content
    </div>
  );
}
```

## Loading States

### Skeleton (Preferred for Content)
```tsx
<div className="space-y-2">
  <Skeleton className="h-4 w-3/4 animate-pulse" />
  <Skeleton className="h-4 w-1/2 animate-pulse" />
</div>
```

### Progress Bar (Process Indicators)
```tsx
<Progress value={75} className="animate-pulse" />
```

### Spinner (Actions in Progress)
```tsx
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Processing...
</Button>
```

## Page Transitions

### Fade with Slide
```tsx
<main className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
  <PageContent />
</main>
```

### Stagger Children
```tsx
<div className="space-y-4">
  {items.map((item, i) => (
    <div 
      key={item.id}
      className="animate-in fade-in-0 slide-in-from-bottom-4"
      style={{ animationDelay: `${i * 50}ms` }}
    >
      <ItemCard {...item} />
    </div>
  ))}
</div>
```

## Chart Animations

Charts use recharts built-in animations. Customize via props:

```tsx
<BarChart data={data}>
  <Bar 
    dataKey="value" 
    animationDuration={500}
    animationEasing="ease-out"
  />
</BarChart>
```

## Anti-Patterns

1. **Never animate `display` or `visibility`** — causes jank
2. **Never use `transition: all`** — performance killer
3. **Never animate `background-color` on large areas** — expensive
4. **Never chain more than 3 sequential animations** — perceived lag
5. **Never ignore `prefers-reduced-motion`** — accessibility violation

## Tailwind Animation Classes

| Class | Effect |
|-------|--------|
| `animate-spin` | 360° rotation |
| `animate-pulse` | Opacity oscillation |
| `animate-bounce` | Vertical bounce |
| `animate-in` | Base for enter animations |
| `fade-in-0` | Fade in from 0 opacity |
| `slide-in-from-*` | Slide from direction |
| `zoom-in-95` | Scale from 95% |

## Integration with DS-OneBox Skills

- **FORMS.md**: Loading states during form submission
- **FEEDBACK.md**: Toast and Alert animations
- **LAYOUT.md**: Sidebar/drawer open/close transitions
- **DATA.md**: Chart entrance animations
