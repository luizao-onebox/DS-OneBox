import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Logo } from "./Logo"

const meta = {
  title: "Components/Logo",
  component: Logo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

Componente responsável por renderizar a identidade visual oficial da Onebox.
Os arquivos originais SVG estão armazenados no projeto em \`src/assets/logos\`.

## Comportamento Padrão
O componente é renderizado na versão **Light** (clara) por padrão (\`theme="light"\`), conforme especificado.
Você pode forçar a versão Dark passando \`theme="dark"\` ou deixar reativo ao tema do sistema passando \`theme="auto"\`.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["full", "icon"],
      description: "Define se o logo aparece completo (nome + ícone) ou só o ícone compacto.",
    },
    theme: {
      control: "radio",
      options: ["light", "dark", "auto"],
      description: "Força um tema ou deixa automático (.dark tailwind). O padrão é light.",
    },
    className: {
      control: "text",
      description: "Classes Tailwind para dimensionar o logo (ex: h-8 w-auto)",
    }
  },
} satisfies Meta<typeof Logo>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultLight: Story = {
  args: {
    variant: "full",
    theme: "light",
    className: "h-8",
  },
}

export const DarkVersion: Story = {
  render: () => (
    <div className="p-8 bg-zinc-950 rounded-md border border-zinc-800">
      <Logo variant="full" theme="dark" className="h-8" />
    </div>
  )
}

export const IconOnlyLight: Story = {
  args: {
    variant: "icon",
    theme: "light",
    className: "h-8 w-8",
  },
}

export const AutoResponsiveTheme: Story = {
  args: {
    variant: "full",
    theme: "auto",
    className: "h-8",
  },
}
