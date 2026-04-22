import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { PricingCards } from "./PricingCards"

const meta = {
  title: "Blocks/PricingCards",
  component: PricingCards,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Bloco que exibe tabelas de preços e planos de assinatura. Inclui toggle para alternar entre faturamento mensal e anual, destacando o plano mais popular.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PricingCards>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full">
      <PricingCards />
    </div>
  ),
}
