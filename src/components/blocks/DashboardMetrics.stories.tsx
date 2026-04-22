import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { DashboardMetrics } from "./DashboardMetrics"

const meta = {
  title: "Blocks/DashboardMetrics",
  component: DashboardMetrics,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Bloco comum de Cartões de Métricas (Stats) usado em painéis administrativos para exibir resumos rápidos.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DashboardMetrics>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full">
      <h2 className="text-3xl font-bold tracking-tight mb-4">Dashboard</h2>
      <DashboardMetrics />
    </div>
  ),
}
