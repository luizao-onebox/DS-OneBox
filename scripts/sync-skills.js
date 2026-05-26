import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function extractComponents() {
  const shadcnDir = './src/components/shadcn'
  if (!fs.existsSync(shadcnDir)) return []
  return fs.readdirSync(shadcnDir)
    .filter(f => f.endsWith('.tsx') && !f.endsWith('.stories.tsx'))
    .map(f => f.replace('.tsx', ''))
}

function extractBlocks() {
  const blocksDir = './src/components/blocks'
  if (!fs.existsSync(blocksDir)) return []
  return fs.readdirSync(blocksDir)
    .filter(f => f.endsWith('.tsx'))
    .map(f => f.replace('.tsx', ''))
}

function updateDesignGraph() {
  const components = extractComponents()
  const blocks = extractBlocks()

  const graphPath = './DESIGN_GRAPH.json'
  if (!fs.existsSync(graphPath)) {
    console.log('⚠️  DESIGN_GRAPH.json not found')
    return
  }

  const graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'))

  const capabilityKeywords = {
    FEEDBACK: ['toast', 'alert', 'badge', 'progress', 'skeleton', 'command', 'scroll'],
    FORMS: ['input', 'form', 'checkbox', 'radio', 'switch', 'slider', 'select', 'date', 'combobox', 'password', 'otp'],
    DATA: ['table', 'chart', 'timeline', 'avatar', 'virtual', 'drag'],
    LAYOUT: ['dialog', 'drawer', 'sidebar', 'popover', 'tooltip', 'hover', 'tabs', 'accordion', 'separator', 'aspect', 'container', 'grid', 'flex', 'section', 'card'],
    NAVIGATION: ['navigation', 'breadcrumb', 'pagination', 'context']
  }

  for (const component of components) {
    let found = false
    const name = component.toLowerCase()

    for (const [cap, keywords] of Object.entries(capabilityKeywords)) {
      if (keywords.some(kw => name.includes(kw))) {
        if (!graph.capabilities[cap].components.includes(component)) {
          graph.capabilities[cap].components.push(component)
        }
        found = true
        break
      }
    }

    if (!found) {
      if (!graph.capabilities['LAYOUT'].components.includes(component)) {
        graph.capabilities['LAYOUT'].components.push(component)
      }
    }
  }

  graph.capabilities['DATA'].components = graph.capabilities['DATA'].components
    .filter(c => components.includes(c))
    .concat(blocks)

  fs.writeFileSync(graphPath, JSON.stringify(graph, null, 2))
  console.log(`✅ DESIGN_GRAPH.json sincronizado (${components.length} componentes, ${blocks.length} blocks)`)
}

function updateUsageTelemetry() {
  const components = extractComponents()

  const telemetryPath = './USAGE_TELEMETRY.json'
  if (!fs.existsSync(telemetryPath)) {
    console.log('⚠️  USAGE_TELEMETRY.json not found')
    return
  }

  const telemetry = JSON.parse(fs.readFileSync(telemetryPath, 'utf8'))
  telemetry.usage.totalComponents = components.length
  telemetry.lastUpdated = new Date().toISOString()

  for (const component of components) {
    if (!telemetry.usage.components[component]) {
      telemetry.usage.components[component] = {
        projects: [],
        instances: 0,
        tier: 'Tier3',
        lastUsed: null
      }
    }
  }

  fs.writeFileSync(telemetryPath, JSON.stringify(telemetry, null, 2))
  console.log('✅ USAGE_TELEMETRY.json atualizado')
}

updateDesignGraph()
updateUsageTelemetry()
console.log('✅ Skills sincronizados!')
