# /ds-audit Command

## Purpose
Audit existing code for DS-OneBox compliance, identifying components that could be replaced, anti-patterns to fix, and opportunities to adopt DS-OneBox patterns.

## Usage
```
/ds-audit [target-file-or-folder]
```

## Arguments
- `target-file-or-folder` (optional): Path to file or folder to audit. Defaults to entire project.

## Workflow

### Step 1: Scan Target
- Read all TypeScript/JavaScript/React files in target
- Identify UI-related code (components, hooks, styles)
- Categorize findings by type

### Step 2: Check DS-OneBox Alignment

#### Components (High Priority)
For each UI element found, check if DS-OneBox has an equivalent:
```
Input → use ds-onebox Input
Button → use ds-onebox Button
Card → use ds-onebox Card
Modal/Dialog → use ds-onebox Dialog
Select → use ds-onebox Select
Form → use ds-onebox Form (with Zod + RHF)
Table → use ds-onebox DataTable
Chart → use ds-onebox ChartContainer
Badge → use ds-onebox Badge
Avatar → use ds-onebox Avatar
Dropdown → use ds-onebox DropdownMenu
Accordion → use ds-onebox Accordion
Tabs → use ds-onebox Tabs
Tooltip → use ds-onebox Tooltip
Popover → use ds-onebox Popover
Sheet → use ds-onebox Sheet
Toast → use ds-onebox Sonner
Skeleton → use ds-onebox Skeleton
Progress → use ds-onebox Progress
Separator → use ds-onebox Separator
Avatar → use ds-onebox Avatar
Calendar → use ds-onebox Calendar
DatePicker → use ds-onebox DatePicker
Checkbox → use ds-onebox Checkbox
Switch → use ds-onebox Switch
Slider → use ds-onebox Slider
RadioGroup → use ds-onebox RadioGroup
Combobox → use ds-onebox Combobox
Command → use ds-onebox Command
NavigationMenu → use ds-onebox NavigationMenu
Breadcrumb → use ds-onebox Breadcrumb
Pagination → use ds-onebox Pagination
```

#### Color Usage (Critical)
Check for:
- `hsl(var())` in non-Tailwind contexts → MUST use HEX for charts
- Hardcoded colors like `rgb()`, `rgba()`, `#` → Suggest tokens
- `primary`, `secondary`, `muted` token usage
- Dark mode compatibility

#### Typography
Check for:
- Font stack consistency (Inter via DS-OneBox)
- Heading hierarchy (h1 → h6)
- Text size tokens (text-sm, text-base, etc.)
- Font weight consistency

#### Forms (Critical)
Check for:
- Form state management (use React Hook Form)
- Validation (use Zod schema)
- No controlled/uncontrolled mixing
- Proper FormField structure

#### Layout
Check for:
- Sidebar structure (if navigation present)
- Responsive grid patterns
- Spacing consistency (4px base)
- Max-width constraints

### Step 3: Anti-Pattern Detection

Flag these issues:
```
❌ Manual DOM manipulation → Use Radix primitives
❌ Custom color in charts → Use HEX from DS-OneBox palette
❌ Hardcoded dimensions → Use responsive classes
❌ Missing FormField wrapper → Use Zod + RHF pattern
❌ Non-HEX chart colors → Error: charts require HEX
❌ inline styles for layout → Use Tailwind classes
❌ Missing aria attributes → Use accessible components
❌ uncontrolled form inputs → Use RHF pattern
```

### Step 4: Generate Report

Output structured audit:
```
## DS-OneBox Audit Report

### Summary
- Files audited: X
- Components found: X
- DS-OneBox aligned: X (X%)
- Anti-patterns: X
- Opportunities: X

### Compliance by Category

#### Components ✅/⚠️/❌
| Component | Found | DS-OneBox | Status |
|-----------|-------|-----------|--------|
| Button | 12 | Button | ✅ Aligned |
| Input | 5 | Input | ⚠️ Missing validation |
| CustomModal | 3 | Dialog | ❌ Should replace |

#### Color Usage
- Tokens used: 15
- Hardcoded: 4 → Suggest: [list]
- Chart colors: [status]

#### Forms
- Forms found: 2
- Using RHF: 0 → ❌ Convert to RHF
- Using Zod: 0 → ❌ Add Zod validation

### Recommended Actions

1. **High Priority**
   - Replace CustomModal (3 files) → ds-onebox Dialog
   - Add RHF to forms without validation

2. **Medium Priority**
   - Replace hardcoded colors with tokens
   - Update chart colors to HEX

3. **Low Priority**
   - Optimize skeleton loading states
   - Add proper ARIA labels

### Quick Fixes
```tsx
// Replace CustomModal
import { Dialog, DialogContent, DialogHeader } from 'ds-onebox';

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    Content
  </DialogContent>
</Dialog>

// Fix chart colors
<Bar dataKey="value" fill="#3B82F6" />  // HEX, not hsl()
```
```

## Examples

### Basic Audit
```
/ds-audit
```
Audits entire project, outputs full report.

### Target Specific File
```
/ds-audit src/components/Modal.tsx
```
Audits single file.

### Target Folder
```
/ds-audit src/features/auth
```
Audits specific feature folder.

## Integration with DS-OneBox

This command uses:
- `reference/typography.md` — Typography rules
- `reference/color-contrast.md` — Color tokens and HEX requirement
- `reference/spatial-design.md` — Spacing system
- `reference/responsive-design.md` — Breakpoints
- `RESOLVER.md` — Component mapping
- `FORMS.md` — Form validation patterns
- `FEEDBACK.md` — Toast/Badge patterns

This command creates:
- Audit report with DS-OneBox compliance score
- List of anti-patterns to fix
- Code suggestions for each issue
- Priority ranking (High/Medium/Low)
