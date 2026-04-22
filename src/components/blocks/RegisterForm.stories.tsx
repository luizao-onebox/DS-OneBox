import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { RegisterForm } from "./RegisterForm"

const meta = {
  title: "Blocks/Auth",
  component: RegisterForm,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Bloco de Autenticação focado no Registro de Usuários. Demonstra integração com ícones, estado de carregamento e botões de provedores sociais.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RegisterForm>

export default meta
type Story = StoryObj<typeof meta>

export const Register: Story = {
  render: () => <RegisterForm />,
}
