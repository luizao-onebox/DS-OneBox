# /ds-teach Command

## Purpose
Generate educational documentation for DS-OneBox: PRODUCT.md (what it is) and DESIGN.md (how to use it for design decisions).

## Usage
```
/ds-teach [topic]
```

## Arguments
- `topic` (optional): Specific topic to teach. Defaults to comprehensive overview.

## Available Topics

### Overview
Comprehensive introduction to DS-OneBox

### Component: [name]
Deep dive into specific component (Button, Form, DataTable, etc.)

### Pattern: [name]
Design patterns (Forms, Data Display, Navigation, etc.)

### Reference: [name]
Technical reference (Typography, Color, Spacing, etc.)

## Workflow

### Step 1: Determine Topic Scope

If no topic specified, create full documentation set:
```
PRODUCT.md - What DS-OneBox is and its capabilities
DESIGN.md - How to use DS-OneBox for design decisions
```

If topic specified, generate focused documentation:
```
/ds-teach Forms
→ Form Design Guide with Zod + RHF patterns
```

### Step 2: Generate PRODUCT.md

Create comprehensive product documentation:

```markdown
# DS-OneBox Design System

## Overview
DS-OneBox is a production-ready React component library built on Radix UI primitives, styled with Tailwind CSS, and designed for AI-augmented development workflows.

## Core Principles

### 1. Shape Before Build
Start with the UI shape you need, then build. Don't force existing code into components.

### 2. Accessibility First
All components use Radix UI primitives for out-of-the-box accessibility.

### 3. Type Safety
Full TypeScript support with Zod schemas for runtime validation.

### 4. AI-Ready
Machine-readable documentation, usage telemetry, and self-maintenance capabilities.

## Component Categories

### Forms
- Form (with Zod + React Hook Form)
- Input (text, email, password, number, etc.)
- Select
- Combobox (searchable select)
- Checkbox
- Switch
- Slider
- RadioGroup
- DatePicker
- Calendar

### Data Display
- DataTable (TanStack Table)
- ChartContainer (recharts wrapper)
- Badge
- Avatar
- Skeleton
- Progress

### Feedback
- Toast (Sonner)
- Alert
- AlertDialog
- Dialog
- Sheet
- Tooltip
- Popover

### Navigation
- Tabs
- Accordion
- NavigationMenu
- Breadcrumb
- Pagination
- Command (searchable command palette)

### Layout
- Card
- Separator
- ScrollArea

## Design Tokens

### Colors
Three-layer architecture:
1. **Primary**: Direct values (`--primary: 221 83% 53%`)
2. **Semantic States**: Status colors (`--success`, `--warning`, `--destructive`)
3. **Neutrals**: Grayscale scale (`--muted`, `--border`, `--background`)

### Typography
- Font: Inter (loaded via @fontsource/inter)
- Scale: Display → h1 → h2 → h3 → h4 → body → small → caption

### Spacing
4px base unit: `space-1` (4px) through `space-20` (80px)

### Motion
- Instant: 50ms (micro-interactions)
- Fast: 150ms (hover states)
- Normal: 200ms (modals, dropdowns)
- Slow: 300ms (page transitions)

## Architecture

### Dependencies
- React 18+
- Radix UI (primitives)
- Tailwind CSS 3.4+
- Zod (validation)
- React Hook Form (form state)
- Recharts (charts)
- TanStack Table (data tables)
- Sonner (toasts)

### Export Structure
```
ds-onebox
├── components/shadcn/*    (core components)
├── components/ui/*        (raw Radix wrappers)
├── hooks/*                (custom hooks)
├── lib/*                  (utilities)
└── styles/*               (global CSS)
```

## Usage Example

```tsx
import { Button } from 'ds-onebox';
import { Card, CardHeader, CardContent } from 'ds-onebox';

function Example() {
  return (
    <Card>
      <CardHeader>
        <h2>Welcome</h2>
      </CardHeader>
      <CardContent>
        <Button>Get started</Button>
      </CardContent>
    </Card>
  );
}
```

## AI Integration

DS-OneBox is designed for AI-augmented workflows:

### Skills System
Skills provide contextual guidance for AI agents:
- RESOLVER.md — Component selection guide
- FORMS.md — Form creation workflow
- DATA.md — Data visualization decisions
- LAYOUT.md — Layout composition
- FEEDBACK.md — User feedback patterns

### Usage Telemetry
Auto-tracks component usage to identify:
- Tier 1 (critical): Always available
- Tier 2 (important): Regular updates
- Tier 3 (specialized): Consider deprecation

### Self-Maintenance
Automated scripts for:
- Auto-fix: Detect and fix anti-patterns
- Auto-link: Maintain documentation links
- Auto-doc: Generate/update component docs
```

### Step 3: Generate DESIGN.md

Create design decision guide:

```markdown
# DS-OneBox Design Guide

## Decision Framework

### "Should I use this component?"

#### Forms
| Need | Use | Pattern |
|------|-----|---------|
| Simple input | Input | Direct usage |
| With validation | Form + Zod | FormField > FormItem > FormControl |
| Searchable list | Combobox | Controlled with search state |
| Date selection | DatePicker | Calendar + Popover |
| Multiple options | RadioGroup/Switch | Based on UI preference |

#### Data Display
| Need | Use | Pattern |
|------|-----|---------|
| Tabular data | DataTable | columns + data props |
| Simple chart | ChartContainer | ResponsiveContainer inside |
| Static list | Badge + Avatar | Composition pattern |
| Loading state | Skeleton | Match final layout |

#### Feedback
| Need | Use | Pattern |
|------|-----|---------|
| Immediate feedback | Toast | toast.success/error/info() |
| Require action | AlertDialog | Confirm before destructive |
| Show content | Dialog | Trigger + Content + Header |
| Side panel | Sheet | Side prop (left/right/bottom) |

### Layout Composition

#### Sidebar Layout
```tsx
<div className="flex h-screen">
  <aside className="w-64 border-r">
    <nav className="p-4">
      Navigation items
    </nav>
  </aside>
  <main className="flex-1 overflow-auto p-6">
    Content
  </main>
</div>
```

#### Card Grid
```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {items.map(item => (
    <Card key={item.id}>
      <CardHeader>{item.title}</CardHeader>
      <CardContent>{item.content}</CardContent>
    </Card>
  ))}
</div>
```

### Color Decisions

#### When to use semantic colors
- `primary`: Main actions, links, emphasis
- `secondary`: Secondary actions, supporting UI
- `muted`: Backgrounds, disabled states
- `destructive`: Delete, remove, dangerous actions
- `success`: Positive outcomes, completed states
- `warning`: Caution, attention needed

#### Chart colors (HEX only)
DS-OneBox chart palette:
```
#3B82F6 (Blue)
#10B981 (Green)
#F59E0B (Amber)
#EF4444 (Red)
#8B5CF6 (Violet)
#EC4899 (Pink)
#06B6D4 (Cyan)
#84CC16 (Lime)
```

### Typography Scale

| Element | Class | Size | Weight |
|---------|-------|------|--------|
| Display | `text-5xl` | 48px | Bold |
| h1 | `text-4xl` | 36px | Bold |
| h2 | `text-3xl` | 30px | Semibold |
| h3 | `text-2xl` | 24px | Semibold |
| h4 | `text-xl` | 20px | Semibold |
| Body | `text-base` | 16px | Normal |
| Small | `text-sm` | 14px | Normal |
| Caption | `text-xs` | 12px | Normal |

### Spacing Rhythm

| Context | Spacing | Token |
|---------|---------|-------|
| Icon to label | 8px | `gap-2` |
| Form fields | 8px | `space-y-2` |
| Card padding | 24px | `p-6` |
| Section gap | 48px | `space-y-12` |
| Page margin | 32-64px | `p-8 lg:p-12` |

### Animation Guidelines

| Animation | Duration | Easing | Use Case |
|-----------|----------|--------|----------|
| Micro | 50ms | linear | Checkbox, toggle |
| Hover | 150ms | ease-out | Buttons, links |
| Expand | 200ms | ease-out | Dropdown, popover |
| Modal | 200ms | ease-out | Dialog, sheet |
| Page | 300ms | ease-out | Route transitions |

## Common Patterns

### Form with All Fields
```tsx
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  role: z.enum(['admin', 'user', 'guest']),
  active: z.boolean(),
  birthDate: z.date(),
});

function UserForm() {
  const form = useForm({ resolver: zodResolver(schema) });
  
  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl><Input {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        {/* More fields */}
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
```

### Data Table with Actions
```tsx
const columns = [
  columnHelper.accessor('name', { cell: info => info.getValue() }),
  columnHelper.accessor('email', { cell: info => info.getValue() }),
  columnHelper.display({
    id: 'actions',
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost"><MoreHorizontal /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem destructive>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
];

<DataTable columns={columns} data={users} />
```

### Responsive Dashboard Card
```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
  <Card>
    <CardHeader className="flex-row items-center justify-between">
      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
      <Users className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">2,853</div>
      <p className="text-xs text-muted-foreground">+12% from last month</p>
    </CardContent>
  </Card>
</div>
```
```

## Examples

### Generate Full Docs
```
/ds-teach

Creates:
- PRODUCT.md (what DS-OneBox is)
- DESIGN.md (how to use it)
```

### Generate Topic
```
/ds-teach Forms

Creates focused Form design guide with:
- Form architecture
- Validation patterns
- Field composition
- Real-world examples
```

## Integration with DS-OneBox

This command uses:
- `SKILL.md` — DS-OneBox overview
- `reference/*` — All reference documentation
- `RESOLVER.md` — Component decisions
- `PAGE_TEMPLATES.md` — Layout patterns
- `DESIGN_GRAPH.json` — Component relationships

This command creates:
- PRODUCT.md — System capabilities
- DESIGN.md — Usage decisions
- [Topic].md — Focused guides
