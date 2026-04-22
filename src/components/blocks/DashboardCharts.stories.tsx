import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { DashboardCharts } from "./DashboardCharts"

const meta = {
  title: "Blocks/DashboardCharts",
  component: DashboardCharts,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# DashboardCharts

Bloco que reúne exemplos práticos de gráficos baseados na integração do **Shadcn UI** com a biblioteca **Recharts**.

## Anatomia

Este bloco é composto por 5 tipos de gráficos, cada um dentro de um \`<Card>\`:

| Gráfico | Tipo | Uso |
|---------|------|-----|
| **Barras Vertical** | \`BarChart\` | Comparar valores entre categorias |
| **Barras Horizontal** | \`BarChart layout="vertical"\` | Rankings, distribuições |
| **Linhas** | \`LineChart\` | Tendências ao longo do tempo |
| **Área** | \`AreaChart\` | Volumes cumulativos |
| **Rosca (Donut)** | \`PieChart\` | Proporções de um todo |

## Tokens e Design System

Cada gráfico utiliza as variáveis CSS (\`--color-xxx\`) definidas na \`ChartConfig\` para manter consistência de cores entre Light e Dark Mode:

- \`desktop\`: \`#2563eb\` (Azul)
- \`mobile\`: \`#10b981\` (Verde)
- \`chart-1\` a \`chart-5\`: Cores sequenciais para múltiplas séries

## Boas Práticas

### ✅ Faça
- Use \`ChartContainer\` como wrapper de todos os gráficos para garantir responsividade.
- Defina \`ChartConfig\` com cores consistentes para cada série de dados.
- Use Tooltips descritivos para auxiliar na interpretação dos dados.
- Para rankings ou proporções, prefira barras horizontais.

### ❌ Não Faça
- Não use mais de 6 cores em um mesmo gráfico — dificulta a leitura.
- Não use gráficos de linhas para dados categóricos (use barras).
- Evite 3D nos gráficos — distorce a percepção de proporção.

## Acessibilidade

- Todos os gráficos usam \`accessibilityLayer\` do Recharts.
- Tooltips são lidos por leitores de tela.
- Cores devem ser complementadas com padrões visuais (tooltip, labels).
- Para daltonismo, considere usar padrões além de cores.

## Configuração de Cores

\`\`\`tsx
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#10b981",
  },
} satisfies ChartConfig
\`\`\`

O \`color\` é injetado como variável CSS (\`var(--color-desktop)\`) automaticamente, garantindo suporte a temas.
`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DashboardCharts>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full">
      <h2 className="text-3xl font-bold tracking-tight mb-4">Métricas e Gráficos</h2>
      <p className="text-muted-foreground mb-8">Passe o mouse sobre os gráficos para visualizar os tooltips estilizados.</p>
      <DashboardCharts />
    </div>
  ),
}
