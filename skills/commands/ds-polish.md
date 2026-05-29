# /ds-polish Command

## Purpose
Polish existing DS-OneBox code to improve quality, consistency, accessibility, and alignment with DS-OneBox best practices.

## Usage
```
/ds-polish [target]
```

## Arguments
- `target` (optional): File or folder to polish. Defaults to entire project.

## Workflow

### Step 1: Analyze Code Quality

Scan for quality issues across these categories:

#### Accessibility
- Missing `aria-label` on icon-only buttons
- Missing `aria-describedby` for complex inputs
- Missing `role` for custom interactive elements
- Missing focus management in modals/dialogs
- Missing `htmlFor` on FormLabel
- Missing `id` matching on Input-FormLabel pairs

#### Component Usage
- Using wrong Button variant for action type
- Missing `asChild` on compound components
- Missing `interactiveContent` in Accordion with buttons
- Wrong component for the use case
- Over-complicated component composition

#### Styling
- Hardcoded colors instead of tokens
- Inline styles for layout
- Using `w-full h-full` without ResponsiveContainer
- Missing responsive classes
- Using `!important` unnecessarily
- Wrong spacing scale

#### Form Patterns
- Missing Form wrapper
- Missing FormField structure
- Missing Zod validation
- Uncontrolled inputs in forms
- Missing FormMessage
- Missing FormDescription

#### TypeScript
- Missing `// @ts-nocheck` in story files
- Missing `satisfies` for type safety
- Missing `as const` for literal types
- Missing proper type imports

### Step 2: Apply Polish Transformations

#### Fix Accessibility
```tsx
// Before
<Button variant="ghost" size="icon">
  <Settings className="h-4 w-4" />
</Button>

// After
<Button variant="ghost" size="icon" aria-label="Settings">
  <Settings className="h-4 w-4" />
</Button>
```

#### Fix Chart Colors
```tsx
// Before
<Bar dataKey="value" fill="hsl(var(--primary))" />

// After
<Bar dataKey="value" fill="#3B82F6" />
```

#### Fix Form Structure
```tsx
// Before
<div>
  <label>Email</label>
  <input value={email} onChange={e => setEmail(e.target.value)} />
</div>

// After
<FormField
  control={form.control}
  name="email"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Email</FormLabel>
      <FormControl>
        <Input type="email" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

#### Fix Accordion with Interactive Content
```tsx
// Before
<AccordionContent>
  <button>Edit</button>  {/* ❌ Nested buttons */}
</AccordionContent>

// After
<AccordionContent>
  <p>Content</p>
  <Button {...interactiveContent}>Edit</Button>
</AccordionContent>
```

#### Fix Responsive Typography
```tsx
// Before
<h1 className="text-4xl">Title</h1>

// After
<h1 className="text-2xl sm:text-3xl lg:text-4xl">Title</h1>
```

#### Fix Spacing
```tsx
// Before
<div style={{ padding: '15px' }}>
  Content
</div>

// After
<div className="p-4">
  Content
</div>
```

#### Fix Missing Responsive Container
```tsx
// Before
<ResponsiveContainer width="100%" height={400}>
  <LineChart />
</ResponsiveContainer>

// After
<ChartContainer className="w-full h-[400px]">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart />
  </ResponsiveContainer>
</ChartContainer>
```

### Step 3: Apply Code Quality Improvements

#### Add Type Safety
```tsx
// Before
const chartConfig = {
  value: { color: '#3B82F6' }
};

// After
import { ChartConfig } from 'ds-onebox';

const chartConfig = {
  value: { color: '#3B82F6' }
} satisfies ChartConfig;
```

#### Add Story ts-nocheck
```tsx
// Add to top of every .stories.tsx file
// @ts-nocheck
```

#### Use CVA for Variant Classes
```tsx
// Before
<Button className={variant === 'primary' ? 'bg-primary' : 'bg-secondary'} />

// After
const buttonVariants = cva('rounded-md', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
    },
  },
});

<Button className={buttonVariants({ variant })} />
```

### Step 4: Generate Polish Report

```
## DS-OneBox Polish Report

### Summary
- Files polished: X
- Issues fixed: X
- Accessibility improvements: X
- Performance improvements: X

### Changes by Category

#### Accessibility (X fixes)
| File | Issue | Fix |
|------|-------|-----|
| Button.tsx | Missing aria-label | Added aria-label="Settings" |
| Modal.tsx | Missing focus trap | Wrapped in FocusTrap |

#### Component Usage (X fixes)
| File | Issue | Fix |
|------|-------|-----|
| Accordion.tsx | Button in AccordionContent | Added interactiveContent |
| Card.tsx | Wrong padding | Changed to p-6 |

#### Color (X fixes)
| File | Issue | Fix |
|------|-------|-----|
| Chart.tsx | hsl() in SVG | Changed to HEX #3B82F6 |

#### Forms (X fixes)
| File | Issue | Fix |
|------|-------|-----|
| LoginForm.tsx | Missing Form wrapper | Added Form + FormField |
| Contact.tsx | Uncontrolled input | Converted to RHF |

#### TypeScript (X fixes)
| File | Issue | Fix |
|------|-------|-----|
| index.ts | Missing satisfies | Added satisfies ChartConfig |
| *.stories.tsx | Type errors | Added // @ts-nocheck |

### Before/After Examples

#### Example 1: Chart Colors
**Before:**
```tsx
<Bar fill="hsl(var(--primary))" />
```
**After:**
```tsx
<Bar fill="#3B82F6" />
```

#### Example 2: Form
**Before:**
```tsx
<input value={email} onChange={e => setEmail(e.target.value)} />
```
**After:**
```tsx
<FormField control={form.control} name="email" render={({ field }) => (
  <FormItem>
    <FormLabel>Email</FormLabel>
    <FormControl><Input {...field} /></FormControl>
    <FormMessage />
  </FormItem>
)} />
```

### Files Modified
- src/components/Chart.tsx
- src/components/Form.tsx
- src/features/auth/LoginForm.tsx
- ...
```

## Examples

### Polish Entire Project
```
/ds-polish

Scans and fixes all files in the project.
```

### Polish Specific File
```
/ds-polish src/components/MyComponent.tsx

Only fixes issues in this file.
```

### Polish with Preview
```
/ds-polish --dry-run

Shows what would be changed without applying.
```

## Integration with DS-OneBox

This command uses:
- `reference/typography.md` — Typography rules
- `reference/color-contrast.md` — Color token usage, HEX requirement
- `reference/spatial-design.md` — Spacing scale
- `reference/motion-design.md` — Animation patterns
- `reference/responsive-design.md` — Responsive classes
- `FORMS.md` — Form patterns
- `FEEDBACK.md` — Toast/Alert patterns
- `RESOLVER.md` — Component selection

This command creates:
- Improved code quality
- Accessibility fixes
- TypeScript improvements
- Consistent DS-OneBox usage
- Polish report with before/after
