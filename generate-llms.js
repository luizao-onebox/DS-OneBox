import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public');
}
fs.writeFileSync('./public/llms.txt', llmDocContent);
fs.writeFileSync('./public/llm-docs.md', llmDocContent);
console.log('LLM docs generated successfully in /public');
