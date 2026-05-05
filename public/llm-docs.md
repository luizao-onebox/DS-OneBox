# DS-OneBox: LLM Context & Documentation
This file provides context for Large Language Models (LLMs) to understand, consume, and generate code using the DS-OneBox Design System.

## 1. Technology Stack
- Framework: React 18
- Styling: Tailwind CSS v4
- Component Base: Radix UI primitives (Shadcn UI approach)
- Icons: lucide-react
- Font: Inter (Default sans-serif)

## 2. Design Tokens (Strict Usage Required)
DO NOT use arbitrary tailwind classes for colors or typography. ALWAYS use the semantic tokens defined below.

### 2.1 Typography (Semantic Classes)
The design system abstracts font-size, line-height, letter-spacing, and font-weight into single semantic utility classes.
- Display: text-display-2xl, text-display-xl, text-display-lg, text-display-md, text-display-sm
- Headings: text-h1, text-h2, text-h3, text-h4, text-h5, text-h6
- Body: text-body-xl, text-body-lg, text-body-md (default), text-body-sm, text-body-xs
- Labels: text-label-xl, text-label-lg, text-label-md, text-label-sm, text-label-xs
- Code: text-code-lg, text-code-md, text-code-sm, text-code-xs

### 2.2 Colors (Scales 50 to 950)
Colors follow a semantic 3-layer architecture.
- Brand/Primary: primary-{scale} (e.g., bg-primary-500)
- Semantic States: success-{scale}, warning-{scale}, destructive-{scale}, info-{scale}
- Neutrals: neutral-{scale} (Use for borders, backgrounds)

### 2.3 Layout Primitives
Avoid hardcoding pixel values (e.g., w-[400px]). Use fluid classes like w-full max-w-md or primitives:
- <Container>, <Section>, <Grid>, <Flex> (Exported from ds-onebox)

## 3. Available UI Components (Shadcn Primitives)
Import path: import { ComponentName } from 'ds-onebox'

- Accordion
- Alert
- Avatar
- Badge
- Breadcrumb
- Button
- Calendar
- Card
- Carousel
- Chart
- Checkbox
- Command
- Container
- Dialog
- DropdownMenu
- Flex
- Grid
- HoverCard
- Input
- Label
- Logo
- NavigationMenu
- Pagination
- Popover
- Progress
- RadioGroup
- ScrollArea
- Section
- Select
- Separator
- Sheet
- Skeleton
- Slider
- Sonner
- Switch
- Table
- Tabs
- Textarea
- Toast
- Toggle
- Tooltip

## 4. Available Blocks (Complex Layouts)
Import path: import { BlockName } from 'ds-onebox'

- ActivityTimeline
- AdvancedFilter
- CreationWizard
- DashboardCharts
- DashboardMetrics
- DataCard
- DataTable
- DatePicker
- DetailDrawer
- EmptyState
- FileUploader
- GlobalBanner
- Kanban
- LoginForm
- NotificationCenter
- PricingCards
- RegisterForm
- RoleManager
- ScoreDistribution
- SettingsLayout
- Sidebar
- Stepper
- Topbar
- UserSettings

## 5. Golden Rules for Code Generation
1. Icons: Always import from lucide-react. For buttons, use className="mr-2 h-4 w-4".
2. Responsive Spacing: Prefer tailwind spacing (p-4, gap-4) over arbitrary values (p-[16px]).
