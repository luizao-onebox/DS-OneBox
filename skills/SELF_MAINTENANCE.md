---
title: Self-Maintenance
description: Sistema de auto-correção, auto-link e auto-documentation para DS-OneBox
version: 1.0.0
updated: 2026-01-01
---

# Self-Maintenance

## Propósito

Este skill automatiza a manutenção do DS-OneBox: auto-corrige antipatterns, auto-link componentes em relationships, auto-documenta componentes novos, e auto-fecha gaps detectados. Inspirado no GBrain thin-harness-fat-skills, a inteligência vive nos scripts, não nos mantenedores.

## Auto-Fix — Correção Automática de Antipatterns

### Script: auto-fix.js

```javascript
// scripts/auto-fix.js
import fs from 'fs'
import path from 'path'

const ANTIPATTERNS = [
  {
    name: 'AccordionTriggerInteractiveContent',
    pattern: /<AccordionTrigger>\s*<Switch/g,
    file: 'src/components/shadcn/Accordion.tsx',
    check: (content) => content.includes('interactiveContent'),
    fix: (content) => {
      return content.replace(
        /<AccordionTrigger>/g,
        '<AccordionTrigger interactiveContent>'
      )
    }
  },
  {
    name: 'ChartContainerMissingDimensions',
    pattern: /<ChartContainer(?!.*(width|height))/g,
    check: (content) => content.includes('minHeight'),
    fix: (content) => {
      return content.replace(
        /<ChartContainer/g,
        '<ChartContainer className="min-h-72"'
      )
    }
  }
]

function runAutoFix() {
  console.log('🔍 Procurando antipatterns...')
  let fixed = 0

  for (const antipattern of ANTIPATTERNS) {
    const files = findFiles('./src', ['.tsx', '.ts'])

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8')

      if (antipattern.pattern.test(content) && !antipattern.check(content)) {
        const fixedContent = antipattern.fix(content)
        fs.writeFileSync(file, fixedContent)
        console.log(`✅ Fixed: ${antipattern.name} em ${file}`)
        fixed++
      }
    }
  }

  console.log(`\n📊 Total de correções: ${fixed}`)
  return fixed > 0
}

function findFiles(dir, extensions) {
  const files = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory() && !entry.name.includes('node_modules')) {
      files.push(...findFiles(full, extensions))
    } else if (extensions.some(ext => entry.name.endsWith(ext))) {
      files.push(full)
    }
  }

  return files
}

runAutoFix()
```

## Auto-Link — Relacionamentos Automáticos

### Script: auto-link.js

Detecta automaticamente relationships entre componentes baseado em imports:

```javascript
// scripts/auto-link.js
import fs from 'fs'
import path from 'path'

function extractImports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const imports = []

  // Match: import { X, Y } from "ds-onebox"
  const namedImports = content.matchAll(
    /import\s*\{([^}]+)\}\s*from\s*["']ds-onebox["']/g
  )

  for (const match of namedImports) {
    const names = match[1].split(',').map(n => n.trim())
    imports.push(...names)
  }

  return imports
}

function buildRelationshipGraph() {
  const graph = {}
  const shadcnDir = './src/components/shadcn'
  const files = fs.readdirSync(shadcnDir).filter(f => f.endsWith('.tsx'))

  for (const file of files) {
    const componentName = file.replace('.tsx', '')
    const imports = extractImports(path.join(shadcnDir, file))

    graph[componentName] = {
      imports: imports.filter(i => files.includes(`${i}.tsx`)),
      importedBy: []
    }
  }

  // Inverter: calcular importedBy
  for (const [component, data] of Object.entries(graph)) {
    for (const imported of data.imports) {
      if (graph[imported]) {
        graph[imported].importedBy.push(component)
      }
    }
  }

  return graph
}

function detectPatterns() {
  const graph = buildRelationshipGraph()
  const patterns = []

  // Detectar padrão: TableWRAPPER (Table usa TableHeader, TableBody, etc.)
  const tableParts = ['TableHeader', 'TableBody', 'TableRow', 'TableHead', 'TableCell']
  const allPartsExist = tableParts.every(p => graph[p])
  if (allPartsExist && graph['Table']) {
    patterns.push({
      parent: 'Table',
      children: tableParts,
      pattern: 'TableSECTION'
    })
  }

  // Detectar padrão: CardWRAPPER
  const cardParts = ['CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter']
  if (cardParts.every(p => graph[p]) && graph['Card']) {
    patterns.push({
      parent: 'Card',
      children: cardParts,
      pattern: 'CardWRAPPER'
    })
  }

  // Detectar padrão: FormPARTS
  const formParts = ['FormField', 'FormItem', 'FormLabel', 'FormControl', 'FormMessage']
  if (formParts.every(p => graph[p]) && graph['Form']) {
    patterns.push({
      parent: 'Form',
      children: formParts,
      pattern: 'FormPARTS'
    })
  }

  return patterns
}

const patterns = detectPatterns()
fs.writeFileSync('./detected-patterns.json', JSON.stringify(patterns, null, 2))
console.log(`📊 Padrões detectados: ${patterns.length}`)
```

## Auto-Documentation — Geração Automática de Docs

### Script: auto-doc.js

Gera documentação automaticamente quando um novo componente é criado:

```javascript
// scripts/auto-doc.js
import fs from 'fs'
import path from 'path'

function generateComponentDoc(componentName) {
  const PascalCase = componentName
  const camelCase = componentName.charAt(0).toLowerCase() + componentName.slice(1)

  return `---
title: ${PascalCase}
description: Componente ${PascalCase} do DS-OneBox
version: 1.0.0
---

# ${PascalCase}

## Quando Usar

<!-- Adicione aqui quando usar este componente -->

## Quando NÃO Usar

<!-- Adicione aqui quando NÃO usar este componente -->

## Uso Básico

\`\`\`tsx
<${PascalCase}>
  {/* conteúdo */}
</${PascalCase}>
\`\`\`

## Props

| Prop | Tipo | Padrão | Descrição |
|---|---|---|---|
| className | string | - | Classes CSS adicionais |
| children | ReactNode | - | Conteúdo do componente |

## Exemplos

### Exemplo Básico

\`\`\`tsx
export function ${PascalCase}Example() {
  return (
    <${PascalCase}>
      Exemplo de ${PascalCase}
    </${PascalCase}>
  )
}
\`\`\`

## Composição

Este componente faz parte do padrão: **${camelCase}PATTERN**

<!-- Vincule ao DESIGN_GRAPH.json automaticamente -->

## Antipatterns

<!-- Documente erros comuns aqui -->

## Accessibility

<!-- Documente considerações de a11y aqui -->
`
}

function updateDesignGraph(componentName) {
  const graphPath = './DESIGN_GRAPH.json'
  const graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'))

  // Adicionar às capabilities correspondentes
  // (detectar capability baseado em nomes 类似)
  const capabilities = ['FEEDBACK', 'FORMS', 'DATA', 'LAYOUT', 'NAVIGATION']

  for (const cap of capabilities) {
    if (componentName.toLowerCase().includes(cap.toLowerCase())) {
      graph.capabilities[cap].components.push(componentName)
    }
  }

  fs.writeFileSync(graphPath, JSON.stringify(graph, null, 2))
  console.log(`✅ DESIGN_GRAPH.json atualizado com ${componentName}`)
}

function updateLlmDocs() {
  // Regenerar llms.txt
  const { execSync } = require('child_process')
  execSync('npm run build:llms', { stdio: 'inherit' })
  console.log('✅ llms.txt regenerado')
}

// Hook: rodar após criar componente
const componentName = process.argv[2]
if (componentName) {
  console.log(`🤖 Auto-documentando ${componentName}...`)
  updateDesignGraph(componentName)
  updateLlmDocs()
  console.log('✅ Documentação gerada!')
}
```

## Auto-Update — Sincronização de Skills

### Script: sync-skills.js

Sincroniza os skills com o estado atual do DS:

```javascript
// scripts/sync-skills.js
import fs from 'fs'

function extractComponents() {
  const shadcnDir = './src/components/shadcn'
  const files = fs.readdirSync(shadcnDir).filter(f => f.endsWith('.tsx'))
  return files.map(f => f.replace('.tsx', ''))
}

function extractBlocks() {
  const blocksDir = './src/components/blocks'
  if (!fs.existsSync(blocksDir)) return []
  const files = fs.readdirSync(blocksDir).filter(f => f.endsWith('.tsx'))
  return files.map(f => f.replace('.tsx', ''))
}

function updateResolver() {
  const components = extractComponents()
  const blocks = extractBlocks()

  const resolverPath = './skills/RESOLVER.md'
  let content = fs.readFileSync(resolverPath, 'utf8')

  // Atualizar lista de componentes (buscar marcação especial)
  const componentList = components
    .sort()
    .map(c => `- ${c}`)
    .join('\n')

  // Substituir entre marcadores
  const markerStart = '<!-- COMPONENTS_START -->'
  const markerEnd = '<!-- COMPONENTS_END -->'

  if (content.includes(markerStart) && content.includes(markerEnd)) {
    const startIdx = content.indexOf(markerStart)
    const endIdx = content.indexOf(markerEnd) + markerEnd.length
    content = content.slice(0, startIdx) + markerStart + '\n' + componentList + '\n' + content.slice(endIdx)
    fs.writeFileSync(resolverPath, content)
    console.log('✅ RESOLVER.md atualizado')
  }
}

function updateDesignGraph() {
  const components = extractComponents()
  const blocks = extractBlocks()

  const graphPath = './DESIGN_GRAPH.json'
  const graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'))

  // Atualizar capabilities com componentes faltantes
  for (const component of components) {
    let found = false
    for (const [, cap] of Object.entries(graph.capabilities)) {
      if (cap.components.includes(component)) {
        found = true
        break
      }
    }
    if (!found) {
      // Componente novo sem capability — adicionar como LAYOUT
      graph.capabilities['LAYOUT'].components.push(component)
    }
  }

  fs.writeFileSync(graphPath, JSON.stringify(graph, null, 2))
  console.log(`✅ DESIGN_GRAPH.json sincronizado (${components.length} componentes)`)
}

updateResolver()
updateDesignGraph()
```

## Git Hook — Auto-Maintenance on Commit

### .git/hooks/pre-commit

```bash
#!/bin/bash

echo "🤖 DS-OneBox Self-Maintenance Check..."

# 1. Verificar se novo componente foi adicionado
NEW_COMPONENTS=$(git diff --cached --name-only | grep "src/components/shadcn/.*\.tsx$" | grep -v "stories" | wc -l)

if [ "$NEW_COMPONENTS" -gt "0" ]; then
  echo "📝 $NEW_COMPONENTS novo(s) componente(s) detectado(s)"
  echo "🤖 Gerando documentação automaticamente..."

  node scripts/auto-doc.js
  node scripts/sync-skills.js

  git add skills/
  git add DESIGN_GRAPH.json
  git add USAGE_TELEMETRY.json
fi

# 2. Verificar antipatterns
echo "🔍 Verificando antipatterns..."
node scripts/auto-fix.js
FIXED=$(git diff --name-only | wc -l)

if [ "$FIXED" -gt "0" ]; then
  echo "⚠️ $FIXED arquivo(s) auto-corrigido(s)"
  git add .
fi

# 3. Verificar se imports estão corretos
echo "🔗 Verificando relationships..."
node scripts/auto-link.js

echo "✅ Self-maintenance check completo!"
```

## CI: Daily Maintenance Job

```yaml
# .github/workflows/ds-maintenance.yml
name: DS Self-Maintenance

on:
  schedule:
    - cron: '0 6 * * *'  # Todo dia às 6h
  workflow_dispatch:

jobs:
  maintenance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup
        run: npm ci

      - name: Auto-fix antipatterns
        run: node scripts/auto-fix.js

      - name: Sync relationships
        run: node scripts/auto-link.js

      - name: Update documentation
        run: |
          node scripts/sync-skills.js
          npm run build:llms

      - name: Check coverage
        run: npm run ds:coverage

      - name: Generate report
        run: npm run ds:report

      - name: Create improvement PR
        if: github.event_name == 'schedule'
        run: |
          git config user.email "ds-brain@onebox.ai"
          git config user.name "DS Brain"

          if git diff --quiet; then
            echo "No changes needed"
          else
            git checkout -b chore/ds-maintenance-$(date +%Y%m%d)
            git add .
            git commit -m "chore(ds): self-maintenance run $(date)"
            git push origin chore/ds-maintenance-$(date +%Y%m%d)

            gh pr create \
              --title "DS Self-Maintenance: $(date)" \
              --body "Automated maintenance run" \
              --assignee "@me"
          fi
```

## Checklist de Auto-Maintenance

- [ ] Scripts auto-fix rodando no CI?
- [ ] Scripts auto-link detectando relationships?
- [ ] Scripts auto-doc gerando docs para componentes novos?
- [ ] Scripts sync-skills atualizando RESOLVER.md?
- [ ] Hook pre-commit configurado?
- [ ] USAGE_TELEMETRY.json sendo atualizado?
- [ ] PR automático criado quando há changes?
