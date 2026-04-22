import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { UserSettings } from "./UserSettings"

const meta = {
  title: "Blocks/UserSettings",
  component: UserSettings,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Bloco que representa uma página completa de Configurações de Usuário (User Profile / Settings). Integra Cards, Inputs, Selects, Switches, Tabs, e Avatar em um layout responsivo com barra lateral de navegação.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UserSettings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full flex justify-center py-10">
      <UserSettings />
    </div>
  ),
}
