const fs = require('fs');
const path = require('path');

const shadcnDir = './src/components/shadcn';
const blocksDir = './src/components/blocks';

function getFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.tsx') && !f.endsWith('.stories.tsx'))
    .map(f => f.replace('.tsx', ''));
}

const shadcnComponents = getFiles(shadcnDir);
const blocks = getFiles(blocksDir);

let llmDocContent = "# DS-OneBox: LLM Context & Documentation\n";
llmDocContent += "This file provides context for Large Language Models (LLMs) to understand, consume, and generate code using the DS-OneBox Design System.\n\n";

llmDocContent += "## 1. Technology Stack\n";
llmDocContent += "- Framework: React 18\n";
llmDocContent += "- Styling: Tailwind CSS v4\n";
llmDocContent += "- Component Base: Radix UI primitives (Shadcn UI approach)\n";
llmDocContent += "- Icons: lucide-react\n";
llmDocContent += "- Font: Inter (Default sans-serif)\n\n";

llmDocContent += "## 2. Design Tokens (Strict Usage Required)\n";
llmDocContent += "DO NOT use arbitrary tailwind classes for colors or typography. ALWAYS use the semantic tokens defined below.\n\n";

llmDocContent += "### 2.1 Typography (Semantic Classes)\n";
llmDocContent += "The design system abstracts font-size, line-height, letter-spacing, and font-weight into single semantic utility classes.\n";
llmDocContent += "- Display: text-display-2xl, text-display-xl, text-display-lg, text-display-md, text-display-sm\n";
llmDocContent += "- Headings: text-h1, text-h2, text-h3, text-h4, text-h5, text-h6\n";
llmDocContent += "- Body: text-body-xl, text-body-lg, text-body-md (default), text-body-sm, text-body-xs\n";
llmDocContent += "- Labels: text-label-xl, text-label-lg, text-label-md, text-label-sm, text-label-xs\n";
llmDocContent += "- Code: text-code-lg, text-code-md, text-code-sm, text-code-xs\n\n";

llmDocContent += "### 2.2 Colors (Scales 50 to 950)\n";
llmDocContent += "Colors follow a semantic 3-layer architecture.\n";
llmDocContent += "- Brand/Primary: primary-{scale} (e.g., bg-primary-500)\n";
llmDocContent += "- Semantic States: success-{scale}, warning-{scale}, destructive-{scale}, info-{scale}\n";
llmDocContent += "- Neutrals: neutral-{scale} (Use for borders, backgrounds)\n\n";

llmDocContent += "### 2.3 Layout Primitives\n";
llmDocContent += "Avoid hardcoding pixel values (e.g., w-[400px]). Use fluid classes like w-full max-w-md or primitives:\n";
llmDocContent += "- <Container>, <Section>, <Grid>, <Flex> (Exported from ds-onebox)\n\n";

llmDocContent += "## 3. Golden Rules for Code Generation\n";
llmDocContent += "1. Icons: Always import from lucide-react. For buttons, use className=\"mr-2 h-4 w-4\".\n";
llmDocContent += "2. Responsive Spacing: Prefer tailwind spacing (p-4, gap-4) over arbitrary values (p-[16px]).\n";
llmDocContent += "3. Shadcn UI Architecture: Many components use dot notation or multiple exports (e.g., Card, CardHeader, CardTitle, CardContent). Always read the component's source code below to see the exact exports and props before using them.\n\n";

llmDocContent += "## 4. UI Components Source Code (Shadcn)\n";
llmDocContent += "Below is the exact source code for each component. Read this to understand the exported sub-components, the props interfaces, and the CVA variants available.\n\n";

for (let c of shadcnComponents) {
  const code = fs.readFileSync(path.join(shadcnDir, c + '.tsx'), 'utf8');
  llmDocContent += "### Component: " + c + "\n";
  llmDocContent += "\\\	sx\n" + code + "\n\\\\n\n";
}

llmDocContent += "## 5. Blocks Source Code (Complex Layouts)\n";
llmDocContent += "Below is the exact source code for the complex blocks. Use this to understand the props they accept and how they compose the base components.\n\n";

for (let b of blocks) {
  const code = fs.readFileSync(path.join(blocksDir, b + '.tsx'), 'utf8');
  llmDocContent += "### Block: " + b + "\n";
  llmDocContent += "\\\	sx\n" + code + "\n\\\\n\n";
}

llmDocContent += "## 6. Design Principles & Composition Rules\n";
llmDocContent += "CRITICAL: When generating any page or screen, you MUST follow these composition rules.\n\n";

llmDocContent += "### 6.1 Spacing System (Strict Scale)\n";
llmDocContent += "Use ONLY these 3 spacing levels - never arbitrary pixel values:\n";
llmDocContent += "- Tight: gap-4 (16px) - elements within the same visual group\n";
llmDocContent += "- Default: gap-6 (24px) - separate distinct sections on a page\n";
llmDocContent += "- Loose: gap-8 (32px) - separate large functional blocks\n\n";

llmDocContent += "### 6.2 Page Structure (Always Use This Order)\n";
llmDocContent += "Every page MUST follow this hierarchy:\n";
llmDocContent += "1. <PageLayout spacing=\"default\"> - root container\n";
llmDocContent += "2. <PageHeader> - title + description + actions (top right)\n";
llmDocContent += "3. Content sections - MetricGrid, DataTable, Charts, etc\n";
llmDocContent += "4. Navigation/Pagination if needed\n\n";

llmDocContent += "### 6.3 MetricGrid Usage\n";
llmDocContent += "- columns=\"4\" for desktop KPI dashboards\n";
llmDocContent += "- columns=\"2\" for forms or smaller grids\n";
llmDocContent += "- columns=\"12\" for mixed layouts (use span=\"twothirds\", \"third\")\n";
llmDocContent += "- ALWAYS wrap content in <MetricCard>\n\n";

llmDocContent += "### 6.4 Grouping Rules\n";
llmDocContent += "- Related items: share a Card border/shadow\n";
llmDocContent += "- Actions of same flow: use <Flex gap=\"sm\">\n";
llmDocContent += "- Tabular data: use <DataTable>\n";
llmDocContent += "- Empty state: ALWAYS provide <EmptyState> when list can be empty\n\n";

llmDocContent += "### 6.5 Action Placement\n";
llmDocContent += "- Primary action (Create, Save): top-right corner in PageHeader\n";
llmDocContent += "- Secondary actions (Filters, Search): below PageHeader or in toolbar\n";
llmDocContent += "- Row actions (Edit, Delete): last column in DataTable\n\n";

llmDocContent += "### 6.6 Feedback & States\n";
llmDocContent += "- Loading: use <Skeleton> or Button with disabled+text\n";
llmDocContent += "- Success/Error: use <Badge variant=\"soft\" color=\"success|destructive\">\n";
llmDocContent += "- Empty: use <EmptyState> component\n";
llmDocContent += "- Form validation: inline error messages below inputs\n\n";

llmDocContent += "### 6.7 Always Use Semantic Components\n";
llmDocContent += "- DO NOT use <div className=\"flex\"> - use <Flex>\n";
llmDocContent += "- DO NOT use <div className=\"grid\"> - use <Grid>\n";
llmDocContent += "- DO NOT use <button> - use <Button>\n";
llmDocContent += "- DO NOT use <table> - use <DataTable>\n\n";

llmDocContent += "### 6.8 Layout Checklist (Verify Before Finishing)\n";
llmDocContent += "Before marking a screen as complete, verify:\n";
llmDocContent += "[ ] Uses <PageLayout> as root container\n";
llmDocContent += "[ ] Uses <PageHeader> for title and actions\n";
llmDocContent += "[ ] Metrics in <MetricGrid> with correct columns\n";
llmDocContent += "[ ] Visual groups wrapped in <Card>\n";
llmDocContent += "[ ] Spacing follows tight/default/loose scale\n";
llmDocContent += "[ ] Primary action in top-right corner\n";
llmDocContent += "[ ] Empty states handled\n";
llmDocContent += "[ ] Loading states with <Skeleton>\n";
llmDocContent += "[ ] Tables with +10 rows have <Pagination>\n";
llmDocContent += "[ ] Responsive tested on mobile\n\n";

llmDocContent += "## 7. Common Page Templates\n\n";
llmDocContent += "### Dashboard Template:\n";
llmDocContent += "<PageLayout spacing=\"default\">\n";
llmDocContent += "  <PageHeader title=\"...\" description=\"...\" actions={...</PageHeader}>\n";
llmDocContent += "  <MetricGrid columns=\"4\">...</MetricGrid>\n";
llmDocContent += "  <MetricGrid columns=\"12\">\n";
llmDocContent += "    <MetricCard span=\"twothirds\"><Chart />...</MetricCard>\n";
llmDocContent += "    <MetricCard><ActivityTimeline />...</MetricCard>\n";
llmDocContent += "  </MetricGrid>\n";
llmDocContent += "</PageLayout>\n\n";

llmDocContent += "### List/Management Template:\n";
llmDocContent += "<PageLayout spacing=\"default\">\n";
llmDocContent += "  <PageHeader title=\"...\" actions={<Button>Novo</Button>} />\n";
llmDocContent += "  <AdvancedFilter>...</AdvancedFilter>\n";
llmDocContent += "  <Card><DataTable columns={columns} data={data} /></Card>\n";
llmDocContent += "  <Pagination />\n";
llmDocContent += "</PageLayout>\n\n";

llmDocContent += "### Wizard/Form Template:\n";
llmDocContent += "<PageLayout spacing=\"default\">\n";
llmDocContent += "  <PageHeader title=\"...\" description=\"...\" />\n";
llmDocContent += "  <Stepper steps={steps} currentStep={activeStep} />\n";
llmDocContent += "  <Card><CardContent>...form fields...</CardContent></Card>\n";
llmDocContent += "  <Flex justify=\"between\"><Button variant=\"ghost\">Voltar</Button><Button>Continuar</Button></Flex>\n";
llmDocContent += "</PageLayout>\n\n";

// Read DesignPrinciples.mdx if it exists and append it
const designPrinciplesPath = './src/DesignPrinciples.mdx';
if (fs.existsSync(designPrinciplesPath)) {
  const principlesContent = fs.readFileSync(designPrinciplesPath, 'utf8');
  llmDocContent += "## 8. Full Design Principles Document\n";
  llmDocContent += "See: src/DesignPrinciples.mdx\n";
}

if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public');
}
fs.writeFileSync('./public/llms.txt', llmDocContent);
fs.writeFileSync('./public/llm-docs.md', llmDocContent);
console.log('LLM docs generated successfully in /public');
