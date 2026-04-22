import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { CalendarDays } from "lucide-react"

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./HoverCard"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"

const meta = {
  title: "Components/HoverCard",
  component: HoverCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Hover Card

Para usuários com visão, exibe um preview rico com informações que estão "escondidas" atrás de um link ou nome. 

## Anatomia

- \`HoverCard\`: Root container.
- \`HoverCardTrigger\`: O link ou elemento interativo.
- \`HoverCardContent\`: O Popover estilizado contendo as informações reveladas, animado pelo Tailwind (\`data-[state=open]:animate-in\`).

Diferente de um \`Tooltip\`, que serve para dicas textuais rápidas, o \`HoverCard\` permite layouts complexos com imagens, Avatares e links internos.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="underline font-medium hover:text-primary">@nextjs</button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@nextjs</h4>
            <p className="text-sm text-muted-foreground">
              O framework React para a web criado e mantido pela Vercel.
            </p>
            <div className="flex items-center pt-2">
              <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                Entrou em Dezembro de 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
}
