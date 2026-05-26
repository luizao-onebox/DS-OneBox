---
title: Usage Intelligence
description: Sistema de auto-tiering e enriquecimento de componentes baseado em uso real
version: 1.0.0
updated: 2026-01-01
---

# Usage Intelligence

## Propósito

Este skill automatiza a priorização e enriquecimento de documentação do DS-OneBox baseado em dados reais de uso. Inspirado no GBrain fail-improve loop, o sistema detecta gaps, sugere roadmaps e auto-evolui a qualidade da documentação.

## Como Funciona

```
Código é escrito (projeto host)
    → CI detecta uso de componentes (via git hooks ou análise estática)
    → USAGE_TELEMETRY.json é atualizado
    → Componentes são re-tiered automaticamente
    → Gaps são identificados
    → Roadmap suggestions são geradas
    → PR é aberto com improvements
```

## Auto-Tiering — Sistema de Classes

### Tier 1 — Critical Core

**Critérios:**
- Usado em > 10 projetos ou > 100 instâncias
- Faz parte de uma capability principal
- Sem workarounds conhecidos no TROUBLESHOOTING.md
- Tem testes unitários
- Tem Storybook com todas as variantes

**Ações automáticas:**
- Documentação completa com Workflow, Exemplos, Antipatterns
- Testes de regressão visual (Chromatic)
- Monitoramento de performance
- Alertas prioritários quando quebrado

### Tier 2 — Regular Use

**Critérios:**
- Usado em 3-10 projetos
- Capability secundária ou composta
- Workarounds mínimos documentados
- Tem pelo menos 1 exemplo funcional

**Ações automáticas:**
- Documentação completa
- Exemplos no Storybook
- Workarounds documentados no TROUBLESHOOTING.md

### Tier 3 — Experimental / Rare

**Critérios:**
- Usado em < 3 projetos
- Novo ou experimental
- Workarounds aceitáveis

**Ações automáticas:**
- Documentação mínima mas funcional
- Badge "experimental" no Storybook
- Suggestion para possivelmente deprecate

## Usage Telemetry — Como Coletar

### Método 1: Git Hook (Recomendado para projetos host)

Adicione no `.git/hooks/pre-commit` do projeto que usa o DS:

```bash
#!/bin/bash
# Detecta uso de componentes DS-OneBox
COMPONENTS=$(grep -roh "from \"ds-onebox\"" --include="*.tsx" --include="*.ts" src/ | wc -l)
echo "DS-OneBox components used: $COMPONENTS"
```

### Método 2: Análise Estática (CI)

No repositório host, adicione um script de análise:

```typescript
// scripts/analyze-ds-usage.ts
import fs from 'fs'
import path from 'path'

function analyzeUsage(dir: string): Record<string, number> {
  const usage: Record<string, number> = {}

  function walk(d: string) {
    const files = fs.readdirSync(d)
    for (const file of files) {
      const full = path.join(d, file)
      if (fs.statSync(full).isDirectory()) {
        walk(full)
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = fs.readFileSync(full, 'utf8')
        const matches = content.match(/from "ds-onebox"/g)
        if (matches) {
          usage[dir] = (usage[dir] || 0) + matches.length
        }
      }
    }
  }

  walk(dir)
  return usage
}

const usage = analyzeUsage('./src')
fs.writeFileSync('./ds-usage-report.json', JSON.stringify(usage, null, 2))
```

### Método 3: Import Graph (para DS-OneBox próprio)

```bash
# Gere o grafo de imports
npx madge --circular --extensions ts,tsx src/components/shadcn/

# Detecte quais componentes são mais importados
npx madge --depends --extensions ts,tsx src/index.ts | head -20
```

## Gap Detection — O Que Buscar

O CI verifica automaticamente:

| Gap | O Que Verificar | Severidade |
|---|---|---|
| Missing Tests | Componente sem `.test.tsx` | 🟡 Alta |
| Missing Stories | Componente sem `.stories.tsx` | 🟡 Média |
| Missing Examples | Não aparece em nenhum block | 🟡 Média |
| Workaround Exists | Componente tem entrada no TROUBLESHOOTING.md | 🟢 Baixa |
| Circular Dependency | Componente importa a si mesmo indiretamente | 🔴 Crítica |
| Deprecated Pattern | Usa API antiga (ex: `<button>` dentro de `<AccordionTrigger>`) | 🟡 Média |
| Performance Issue | Componente tem `NaN` ou dimensionamento quebrado | 🔴 Crítica |

## Roadmap Suggestions — Como Gerar

Quando o sistema detecta gaps, ele sugere automaticamente:

```
GAP: ChartContainer usado em 15 projetos mas não tem width/height props
SUGGESTION: Adicionar props width/height ao ChartContainer
PRIORITY: Alta
ESTIMATED_EFFORT: Baixo (1-2h)
COMPONENTS_AFFECTED: ["ChartContainer", "ChartTooltip", "ChartLegend"]

GAP: AccordionTrigger com validateDOMNesting em 8 projetos
SUGGESTION: Adicionar prop interactiveContent ao AccordionTrigger
PRIORITY: Alta
ESTIMATED_EFFORT: Baixo (30min)
COMPONENTS_AFFECTED: ["AccordionTrigger"]

GAP: Nenhum componente de Drag and Drop documentado
SUGGESTION: Criar skill DRAG_DROP.md e componente DragDrop
PRIORITY: Média
ESTIMATED_EFFORT: Médio (4-8h)
COMPONENTS_AFFECTED: []
```

## Self-Improve Loop

Inspirado no GBrain, o DS-OneBox tem um loop de auto-melhoria:

```
1. DETECT
   → CI analisa código, Storybook, eissues
   → Identifica gaps vs. best practices

2. PRIORITIZE
   → Score baseado em: impacto × frequência × esforço
   → Gaps críticos vão para o topo

3. IMPROVE
   → Gera PR automaticamente com:
     - Documentação melhorada
     - Antipattern removido
     - Teste adicionado
     - Exemplo adicionado

4. VALIDATE
   → CI verifica se o PR resolve o gap
   → Se sim: merge automático
   → Se não: notifica maintainer

5. COMPOUND
   → Cada ciclo faz o DS mais inteligente
   → Padrões de erro viram padrões de acerto
```

## CI Workflow — Configuração

Adicione no repositório `.github/workflows/ds-intelligence.yml`:

```yaml
name: DS Intelligence

on:
  push:
    branches: [main, storybook]
  schedule:
    - cron: '0 8 * * 1'  # Toda segunda-feira às 8h

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install deps
        run: npm ci

      - name: Run DS Intelligence Check
        run: npm run ds:intelligence

      - name: Check for gaps
        run: npm run ds:check-gaps

      - name: Generate roadmap
        run: npm run ds:roadmap

      - name: Create PR if needed
        if: steps.check.outputs.hasChanges == 'true'
        run: |
          git config --local user.email "ds-brain@onebox.ai"
          git config --local user.name "DS Brain"
          git checkout -b chore/ds-intelligence-$(date +%Y%m%d)
          git add .
          git commit -m "chore(ds): DS intelligence improvements"
          git push origin chore/ds-intelligence-$(date +%Y%m%d)
          gh pr create --title "DS Intelligence: Automated Improvements" --body "Auto-generated by DS Brain"
        env:
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Scripts do package.json

Adicione ao package.json do DS:

```json
{
  "scripts": {
    "ds:intelligence": "node scripts/ds-intelligence.js",
    "ds:check-gaps": "node scripts/check-gaps.js",
    "ds:roadmap": "node scripts/generate-roadmap.js",
    "ds:report": "node scripts/generate-usage-report.js"
  }
}
```

## Atualização do USAGE_TELEMETRY

O sistema atualiza automaticamente:

```json
{
  "usage": {
    "totalProjects": 3,
    "components": {
      "ChartContainer": {
        "projects": ["dashboard-financeiro", "projeto-a", "projeto-b"],
        "instances": 47,
        "tier": "Tier1",
        "lastUsed": "2026-01-01"
      }
    }
  },
  "gaps": {
    "missingTests": ["DragDrop", "OTPInput"],
    "roadmapSuggestions": [
      {
        "component": "VirtualList",
        "suggestion": "Adicionar componente de lista virtual para > 1000 itens",
        "priority": "medium"
      }
    ]
  }
}
```

## Métricas de Saúde

O sistema rastreia:

| Métrica | Como Medir | Meta |
|---|---|---|
| Documentation Coverage | Componentes com JSDoc completo / Total | > 90% |
| Test Coverage | Componentes com testes / Total | > 80% |
| Storybook Coverage | Componentes com stories / Total | > 95% |
| Gap Resolution Time | Tempo entre gap detectado e corrigido | < 7 dias |
| Antipattern Count | Workarounds no TROUBLESHOOTING.md | < 5 |

## Boas Práticas

1. **Nãoforce tiers manualmente** — deixe o sistema calcular baseado em uso real
2. **Revise sugestões de roadmap** — nem toda sugestão precisa ser implementada
3. **Documente exceções** — se um componente tem workaround válido, documente no TROUBLESHOOTING.md
4. **Colete feedback** — quando um antipattern é corrigido, remova do TROUBLESHOOTING.md
