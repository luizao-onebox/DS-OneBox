import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { GlobalBanner } from "./GlobalBanner"
import { Button } from "../shadcn/Button"
import { AlertCircle, Info, Megaphone } from "lucide-react"

const meta = {
  title: "Blocks/GlobalBanner",
  component: GlobalBanner,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Um banner dispensável exibido no topo da aplicação para comunicar alertas globais (ex: manutenção, expiração de licença, avisos gerais).

## Boas Práticas
- Use para mensagens críticas ou promocionais de alcance global.
- Ofereça um botão de fechar (\`onClose\`) para não incomodar o usuário permanentemente.
- Se houver uma ação necessária, inclua um botão ou link claro.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "warning", "info"],
    },
  },
} satisfies Meta<typeof GlobalBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "default",
    onClose: () => console.log("Fechou"),
    children: (
      <>
        <Megaphone className="h-4 w-4 mr-2" />
        <span>Nova funcionalidade de IA liberada para sua conta! Experimente agora mesmo.</span>
      </>
    ),
    action: (
      <Button variant="secondary" size="sm" className="h-7 px-3 text-xs">
        Saiba mais
      </Button>
    )
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    onClose: () => console.log("Fechou"),
    children: (
      <>
        <AlertCircle className="h-4 w-4 mr-2" />
        <span>Atenção: Sistema entrará em manutenção programada hoje às 23:00.</span>
      </>
    ),
  },
}

export const Warning: Story = {
  args: {
    variant: "warning",
    onClose: () => console.log("Fechou"),
    children: (
      <>
        <span>Sua licença expira em 3 dias. Renove agora para evitar a suspensão dos serviços.</span>
      </>
    ),
    action: (
      <Button size="sm" className="h-7 px-3 text-xs bg-black text-white hover:bg-black/80">
        Renovar Licença
      </Button>
    )
  },
}

export const InfoVariant: Story = {
  args: {
    variant: "info",
    onClose: () => console.log("Fechou"),
    children: (
      <>
        <Info className="h-4 w-4 mr-2" />
        <span>Você tem 5 novos documentos aguardando desambiguação.</span>
      </>
    ),
  },
}
