# /ds-extract Command

## Purpose
Extract UI patterns from generic code and map them to DS-OneBox components. Transform existing implementations into DS-OneBox-aligned code.

## Usage
```
/ds-extract [source-pattern] [--target=component-name]
```

## Arguments
- `source-pattern` (required): Description or code snippet of the pattern to extract
- `--target` (optional): Specific DS-OneBox component to target

## Workflow

### Step 1: Analyze Source Pattern

Understand the user's code or description:
```
Input: "I have a form with name, email, password fields with validation"
→ Extract: Form with 3 fields, validation requirements
→ Identify: Input type: text, email, password
→ Map to: FormField, Input, Zod schema
```

### Step 2: Map to DS-OneBox Components

Map patterns to DS-OneBox using RESOLVER.md:
```
Modal/Dialog → Dialog (DialogContent, DialogHeader, DialogFooter)
Custom Button → Button (variants: default, outline, ghost, destructive)
Form with validation → Form (Zod + RHF + FormField + Input)
Data table → DataTable (TanStack Table + columns definition)
Chart → ChartContainer (recharts wrapper)
Card layout → Card (CardHeader, CardContent, CardFooter)
Navigation → NavigationMenu or Tabs
Dropdown menu → DropdownMenu
Toast notification → Sonner toast()
Loading skeleton → Skeleton
Progress bar → Progress
Accordion → Accordion (AccordionItem, AccordionTrigger, AccordionContent)
Tabs → Tabs (TabsList, TabsTrigger, TabsContent)
```

### Step 3: Generate DS-OneBox Implementation

Transform the pattern to DS-OneBox code:

#### Example: Form with Validation
```
Input Code:
const [email, setEmail] = useState('');
const [error, setError] = useState('');
const validate = () => {
  if (!email) setError('Email is required');
  else if (!email.includes('@')) setError('Invalid email');
};

<form onSubmit={validate}>
  <input value={email} onChange={e => setEmail(e.target.value)} />
  {error && <span>{error}</span>}
  <button type="submit">Submit</button>
</form>
```

```
DS-OneBox Output:
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from 'ds-onebox';
import { Input } from 'ds-onebox';
import { Button } from 'ds-onebox';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

function EmailForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### Step 4: Handle Special Cases

#### Charts (CRITICAL: HEX colors only)
```
Input Code:
<LineChart data={data}>
  <Line stroke="hsl(221, 83%, 53%)" />
</LineChart>
```

```
DS-OneBox Output:
import { ChartContainer, ChartConfig } from 'ds-onebox';

const chartConfig = {
  value: {
    color: '#3B82F6',  // MUST be HEX, never hsl()
  },
} satisfies ChartConfig;

<ChartContainer config={chartConfig} className="w-full h-[300px]">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <Line dataKey="value" fill="#3B82F6" />
    </LineChart>
  </ResponsiveContainer>
</ChartContainer>
```

#### Accordion with Interactive Content
```
Input Code:
<Accordion>
  <AccordionPanel>
    <button>Edit</button>  <!-- ❌ Button inside button -->
  </AccordionPanel>
</Accordion>
```

```
DS-OneBox Output:
import { Accordion, AccordionTrigger, AccordionContent, interactiveContent } from 'ds-onebox';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Title</AccordionTrigger>
    <AccordionContent>
      <p>Content</p>
      <Button {...interactiveContent}>Edit</Button>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

#### Charts with Dimensions
```
Input Code:
<ResponsiveContainer width="100%" height={300}>
  <BarChart />
</ResponsiveContainer>
```

```
DS-OneBox Output:
<ChartContainer className="w-full h-[300px]">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart />
  </ResponsiveContainer>
</ChartContainer>
```

### Step 5: Output Complete Solution

```
## DS-OneBox Extraction Result

### Source Pattern
Form with name, email, password fields + client-side validation

### Mapped Components
- Form (wrapper)
- FormField (field container)
- FormLabel (accessible label)
- FormControl (input wrapper)
- FormMessage (validation message)
- Input (text, email, password types)
- Button (submit action)

### Generated Code

```tsx
[Full DS-OneBox implementation]
```

### Component Requirements
- Install: `npm install react-hook-form @hookform/resolvers zod`
- Import: `import { z } from 'zod'`
- Colors: All chart colors MUST be HEX format
- Dimension: Use ChartContainer with width/height props
```

## Common Extractions

| Pattern | → | DS-OneBox |
|---------|---|-----------|
| `window.alert()` | → | `toast()` from Sonner |
| Custom modal | → | Dialog + DialogContent |
| `<table>` with styles | → | DataTable |
| Custom chart wrapper | → | ChartContainer |
| `useState` for form | → | React Hook Form + Zod |
| Hardcoded colors | → | CSS tokens (`text-primary`) |
| Custom button styles | → | Button with variants |
| Custom accordion | → | Accordion with interactiveContent |
| Custom dropdown | → | DropdownMenu |
| Custom tabs | → | Tabs (max 7) |

## Examples

### Extract a Form
```
/ds-extract Form with username and email fields, client validation

Output: Complete Form with Zod schema, FormField structure, Input components
```

### Extract a Modal
```
/ds-extract Custom modal that shows product details

Output: Dialog with DialogHeader, DialogContent, DialogFooter, asChild for triggers
```

### Extract Charts
```
/ds-extract Bar chart showing monthly sales data

Output: ChartContainer + ResponsiveContainer + BarChart with HEX colors
```

## Integration with DS-OneBox

This command uses:
- `RESOLVER.md` — Component mapping
- `FORMS.md` — Form pattern (Zod + RHF)
- `DATA.md` — Chart implementation
- `reference/color-contrast.md` — HEX color requirement for charts
- `reference/typography.md` — Text hierarchy
- `reference/spatial-design.md` — Spacing patterns

This command creates:
- Complete DS-OneBox component implementations
- Proper imports and dependencies
- Zod schemas for validation
- Correct chart color format (HEX)
- Accessible markup structure
