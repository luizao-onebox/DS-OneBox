import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { ScoreDistribution } from "./ScoreDistribution"

const meta = {
  title: "Blocks/ScoreDistribution",
  component: ScoreDistribution,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Bloco que ilustra proporções dentro de um número absoluto (100% Stacked Bar). Ideal para exibir a decomposição de um score, distribuição de pesos e metadados estatísticos relacionados, replicando fielmente o print de referência fornecido.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ScoreDistribution>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full">
      <h2 className="text-2xl font-bold tracking-tight mb-4">Decomposição Estatística</h2>
      <p className="text-muted-foreground mb-8">
        Exemplo de gráfico de proporções horizontais com legenda explicativa e metodologia.
      </p>
      <ScoreDistribution />
    </div>
  ),
}
