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
        component:
          "Bloco abrangente de gráficos utilizando a integração do Shadcn UI com a biblioteca Recharts. Apresenta exemplos práticos de gráficos de Barras, Linhas, Áreas (empilhadas) e Rosca (Donut), todos suportando os modos Light e Dark nativamente.",
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
