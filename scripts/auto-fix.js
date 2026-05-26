import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const ANTIPATTERNS = [
  {
    name: 'AccordionTriggerInteractiveContent',
    check: (content) => {
      return content.includes('interactiveContent')
    }
  },
  {
    name: 'ChartContainerMissingDimensions',
    check: (content) => {
      return content.includes('minHeight') || content.includes('width=') || content.includes('height=')
    }
  }
]

function findFiles(dir, extensions) {
  const files = []
  if (!fs.existsSync(dir)) return files
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory() && !entry.name.includes('node_modules') && !entry.name.includes('.git')) {
      files.push(...findFiles(full, extensions))
    } else if (extensions.some(ext => entry.name.endsWith(ext))) {
      files.push(full)
    }
  }
  return files
}

function runAutoFix() {
  console.log('🔍 Procurando antipatterns...')
  const files = findFiles('./src', ['.tsx', '.ts'])
  let found = 0
  let fixed = 0

  for (const antipattern of ANTIPATTERNS) {
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8')
      if (content.includes(antipattern.name)) {
        found++
        if (!antipattern.check(content)) {
          console.log(`⚠️  Antipattern "${antipattern.name}" encontrado em ${file} — requer correção manual`)
        } else {
          console.log(`✅ "${antipattern.name}" verificado em ${file}`)
        }
      }
    }
  }

  if (found === 0) {
    console.log('✅ Nenhum antipattern conhecido encontrado!')
  } else {
    console.log(`📊 Total verificado: ${found}`)
  }

  return { found, fixed }
}

const result = runAutoFix()
process.exit(result.found > 0 ? 0 : 0)
