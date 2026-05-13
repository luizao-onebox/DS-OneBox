# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-XX-XX

### Added

#### Design Tokens
- **Color System**: Full 3-layer architecture (Primitives → Semantic → Component) inspired by Material Design and Atlassian
- **Light/Dark Mode**: CSS Custom Properties for automatic theme switching via `.dark` class
- **Extended Color Scales**: Primary, Neutral, Success, Warning, Destructive, Info — each with 50–950 spectrum
- **Indigo, Purple, Pink Scales**: Additional brand color palettes for marketing and promotions
- **Semantic Typography**: Display, Heading, Body, Label, and Code categories with semantic tokens (`text-h1`, `text-body-md`, `text-label-sm`)
- **Typography Font Override**: Inter font family with full semantic scale via Tailwind V4 `@utility`

#### Components (Shadcn)
- **Accordion**: Collapsible content sections with Radix UI
- **Alert**: Informational, success, warning, destructive, and default variants
- **Avatar**: User profile images with fallback initials
- **Badge**: Solid, soft, outline variants across 9 color options (primary, secondary, destructive, success, warning, info, neutral, indigo, purple, pink)
- **Breadcrumb**: Navigation path indicator with auto-generated separators
- **Button**: Variants (default, destructive, destructiveOutline, success, outline, secondary, ghost, link) and sizes (default, sm, lg, icon, icon-sm, icon-lg)
- **Calendar**: Date selection powered by react-day-picker v9
- **Card**: Flexible content containers
- **Carousel**: Image/content slider using Embla Carousel
- **Checkbox**: Form control with Radix UI
- **Command**: Searchable command menu palette (KBar-style)
- **DataTable**: Advanced table with sorting, filtering, column visibility
- **DatePicker**: Calendar-based date selection
- **Dialog**: Modal overlays with Radix UI
- **DropdownMenu**: Context menus and button dropdowns
- **HoverCard**: Preview cards on hover (HoverCard pattern)
- **Input**: Text input fields with label and helper text
- **Label**: Accessible form labels
- **NavigationMenu**: Full navigation system with dropdowns
- **Pagination**: Table/page navigation
- **Popover**: Floating content panels
- **Progress**: Task completion indicator with gradient variant for risk levels
- **RadioGroup**: Exclusive option selection
- **ScrollArea**: Custom styled scrollbars (horizontal and vertical)
- **Select**: Dropdown selection with Radix UI
- **Separator**: Visual dividers (horizontal and vertical)
- **Sheet**: Slide-in panels (top, bottom, left, right)
- **Skeleton**: Loading state placeholders
- **Slider**: Range selection controls
- **Switch**: Toggle controls
- **Tabs**: Panel navigation
- **Textarea**: Multi-line text input
- **Toggle**: Binary on/off buttons
- **Tooltip**: Hover information tooltips

#### Blocks (Composite Components)
- **ActivityTimeline**: Vertical event stream with icons, timestamps, and descriptions
- **AdvancedFilter**: Multi-criteria search/filter panel with collapsible sections
- **CreationWizard**: Multi-step form with progress indicator
- **DashboardCharts**: Recharts-based visualization components (Area, Bar, Pie, Line)
- **DashboardMetrics**: KPI card grid with trend indicators
- **DataCard**: Flexible metric display cards
- **DetailDrawer**: Slide-in detail panel
- **EmptyState**: Placeholder for empty lists/tables
- **FileUploader**: Drag-and-drop file upload zone
- **GlobalBanner**: Site-wide announcement banners
- **Kanban**: Drag-and-drop task board with columns and cards
- **LoginForm / RegisterForm**: Pre-built authentication forms
- **MarketingBanner**: Promotional banners in 4 variants (hero, split, gradient, floating)
- **NotificationCenter**: Notification list with unread badges
- **PricingCards**: Pricing table layout
- **RoleManager**: User role/permission management UI
- **ScoreDistribution**: Histogram/chart for score visualization
- **SettingsLayout**: Admin settings page layout
- **Sidebar**: Collapsible sidebar navigation with nested items
- **Stepper**: Horizontal/vertical step indicator
- **Topbar**: Application top bar with actions
- **UserSettings**: User profile and settings interface

#### Theming (White-Label)
- **tokens-manifest.css**: Complete reference of all available CSS tokens for AI agents
- **theme-onebox.css**: Default DS theme reference
- **theme-fintech.css**: Example white-label theme (green palette)
- **theme-ecommerce.css**: Example white-label theme (orange palette)
- **CSS Custom Property Override Pattern**: Theme switching via `[data-theme]` selectors

#### Infrastructure
- **CLAUDE.md**: AI agent instructions and workflow guidelines
- **llms.txt**: Full component documentation for LLM consumption (auto-generated)
- **llm-docs.md**: Markdown version of LLM documentation
- **GettingStarted.mdx**: Developer onboarding guide
- **Introduction.mdx**: Storybook welcome page with download button
- **Colors.mdx**: Color system documentation
- **Typography.mdx**: Typography token documentation
- **Tokens.stories.tsx**: Interactive token playground

#### NPM Distribution
- **Vite Library Build**: Outputs `dist/index.es.js`, `dist/index.umd.js`, `dist/style.css`
- **Tailwind V4 Integration**: Preset exported as `ds-onebox/tailwind-preset`
- **TypeScript Declarations**: Full type definitions in `dist/index.d.ts`
- **Peer Dependencies**: React 18 only

### Fixed
- **tailwind-merge conflict**: Custom typography tokens (`text-label-sm`, `text-body-md`) no longer override button text colors when combined in compound variants
- **Stepper alignment**: Horizontal stepper lines and text labels now properly centered under indicator circles regardless of label length
- **Dark mode colors**: Badge soft variants now correctly use inverted scale values in dark mode
- **Badge typography**: Removed redundant `font-medium` hardcoded class from Badge component (now fully token-driven)

### Changed
- **Button**: Added `success` variant to match Alert component semantics
- **ScrollArea**: Added horizontal scroll support via `orientation` prop
- **Sidebar**: Full desktop-optimized layout with proper flex structure and dark mode
- **ScrollArea**: Adopted as default scrollbar solution across all blocks (Kanban, Command, Sidebar, etc.)

### Dependencies
- React 18.3+
- Tailwind CSS v4.2+
- Radix UI primitives
- Lucide React icons
- Recharts
- date-fns
- react-day-picker v9
- Embla Carousel
- Sonner (toast notifications)

---

## [0.0.1] - 2025-01-01

### Added
- Initial project setup with Storybook
- Basic Shadcn components (Button, Input, Label, Card)
