import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function extractImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const imports = []

  const namedImports = content.matchAll(
    /import\s*\{([^}]+)\}\s*from\s*["']@\/components\/shadcn\/([^"']+)["']/g
  )
  for (const match of namedImports) {
    const names = match[1].split(',').map(n => n.trim())
    imports.push(...names)
  }

  return imports
}

function buildRelationshipGraph() {
  const shadcnDir = './src/components/shadcn'
  if (!fs.existsSync(shadcnDir)) {
    console.log('⚠️  shadcn dir not found')
    return { nodes: [], edges: [] }
  }

  const files = fs.readdirSync(shadcnDir).filter(f => f.endsWith('.tsx') && !f.endsWith('.stories.tsx'))
  const graph = {}

  for (const file of files) {
    const componentName = file.replace('.tsx', '')
    const fullPath = path.join(shadcnDir, file)
    const imports = extractImports(fullPath)
    const internalImports = imports.filter(i => files.includes(`${i}.tsx`))

    graph[componentName] = {
      imports: internalImports,
      importedBy: []
    }
  }

  for (const [component, data] of Object.entries(graph)) {
    for (const imported of data.imports) {
      if (graph[imported]) {
        graph[imported].importedBy.push(component)
      }
    }
  }

  return { nodes: files.map(f => f.replace('.tsx', '')), graph }
}

function detectPatterns() {
  const { graph } = buildRelationshipGraph()
  const patterns = []

  const standardPatterns = [
    {
      parent: 'Table',
      children: ['TableHeader', 'TableBody', 'TableRow', 'TableHead', 'TableCell'],
      pattern: 'TableSECTION'
    },
    {
      parent: 'Card',
      children: ['CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'],
      pattern: 'CardWRAPPER'
    },
    {
      parent: 'Form',
      children: ['FormField', 'FormItem', 'FormLabel', 'FormControl', 'FormMessage'],
      pattern: 'FormPARTS'
    },
    {
      parent: 'Accordion',
      children: ['AccordionItem'],
      pattern: 'AccordionITEM'
    },
    {
      parent: 'AccordionItem',
      children: ['AccordionTrigger', 'AccordionContent'],
      pattern: 'AccordionPAIR'
    },
    {
      parent: 'Tabs',
      children: ['TabsList', 'TabsContent'],
      pattern: 'TabsLIST'
    },
    {
      parent: 'TabsList',
      children: ['TabsTrigger'],
      pattern: 'TabsTRIGGER'
    },
    {
      parent: 'Dialog',
      children: ['DialogContent', 'DialogHeader', 'DialogFooter'],
      pattern: 'DialogSECTIONS'
    },
    {
      parent: 'Sidebar',
      children: ['SidebarHeader', 'SidebarContent', 'SidebarGroup', 'SidebarMenu'],
      pattern: 'SidebarPARTS'
    },
    {
      parent: 'CommandPalette',
      children: ['CommandInput', 'CommandList', 'CommandGroup', 'CommandItem'],
      pattern: 'CommandPARTS'
    }
  ]

  for (const sp of standardPatterns) {
    const allExist = sp.children.every(c => graph[c])
    if (allExist && graph[sp.parent]) {
      patterns.push(sp)
    }
  }

  return patterns
}

const patterns = detectPatterns()
console.log(`📊 Padrões detectados: ${patterns.length}`)
for (const p of patterns) {
  console.log(`  - ${p.pattern}: ${p.parent} → ${p.children.join(', ')}`)
}

const output = {
  patterns,
  generated: new Date().toISOString()
}
fs.writeFileSync('./detected-patterns.json', JSON.stringify(output, null, 2))
console.log('✅ detected-patterns.json gerado')
