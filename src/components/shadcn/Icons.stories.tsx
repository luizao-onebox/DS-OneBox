import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { 
  AlertCircle, ArrowRight, Bell, Calendar, Check, CheckCircle, 
  ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Circle, 
  CircleAlert, Copy, CreditCard, Ellipsis, File, Grip, Home, 
  Keyboard, Lock, Maximize, Menu, Moon, MoreHorizontal, Plus, 
  Search, Settings, Sun, Trash2, UploadCloud, User, X
} from "lucide-react"

import { Card } from "./Card"

const IconWrapper = ({ icon: Icon, name }: { icon: any; name: string }) => (
  <Card className="flex flex-col items-center justify-center p-4 gap-3 hover:bg-muted/50 transition-colors cursor-pointer group">
    <Icon className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
    <span className="text-[11px] text-muted-foreground">{name}</span>
  </Card>
)

const meta = {
  title: "Design Tokens/Icons",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Iconografia

O Design System utiliza a biblioteca **Lucide React** (\`lucide-react\`) como padrão para toda a iconografia.

## Por que Lucide?
- **Consistência**: Todos os ícones têm a mesma espessura de linha (\`strokeWidth={2}\`), cantos arredondados e caixas delimitadoras (\`24x24\`).
- **Performance**: Usamos tree-shaking para importar apenas os ícones necessários.
- **Customização**: Aceitam as classes do Tailwind diretamente através da prop \`className\` (ex: \`text-primary\`, \`w-4 h-4\`).

## Como usar

\`\`\`tsx
import { Search } from "lucide-react"

export function Example() {
  return <Search className="w-4 h-4 text-muted-foreground" />
}
\`\`\`

## Biblioteca Principal

Abaixo estão alguns dos ícones mais comuns já importados e utilizados nos nossos componentes. Para ver a biblioteca completa (mais de 1400 ícones), acesse: [lucide.dev](https://lucide.dev/)
        `,
      },
    },
  },
} satisfies Meta<typeof IconWrapper>

export default meta

export const Gallery = {
  render: () => (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 w-full">
      <IconWrapper icon={Home} name="Home" />
      <IconWrapper icon={Menu} name="Menu" />
      <IconWrapper icon={Search} name="Search" />
      <IconWrapper icon={Settings} name="Settings" />
      <IconWrapper icon={User} name="User" />
      <IconWrapper icon={Bell} name="Bell" />
      <IconWrapper icon={Calendar} name="Calendar" />
      <IconWrapper icon={Check} name="Check" />
      <IconWrapper icon={CheckCircle} name="CheckCircle" />
      <IconWrapper icon={AlertCircle} name="AlertCircle" />
      <IconWrapper icon={CircleAlert} name="CircleAlert" />
      <IconWrapper icon={X} name="X" />
      <IconWrapper icon={Plus} name="Plus" />
      <IconWrapper icon={Trash2} name="Trash2" />
      <IconWrapper icon={Copy} name="Copy" />
      <IconWrapper icon={File} name="File" />
      <IconWrapper icon={UploadCloud} name="UploadCloud" />
      <IconWrapper icon={ChevronLeft} name="ChevronLeft" />
      <IconWrapper icon={ChevronRight} name="ChevronRight" />
      <IconWrapper icon={ChevronUp} name="ChevronUp" />
      <IconWrapper icon={ChevronDown} name="ChevronDown" />
      <IconWrapper icon={ArrowRight} name="ArrowRight" />
      <IconWrapper icon={MoreHorizontal} name="MoreHorizontal" />
      <IconWrapper icon={Ellipsis} name="Ellipsis" />
      <IconWrapper icon={Maximize} name="Maximize" />
      <IconWrapper icon={Keyboard} name="Keyboard" />
      <IconWrapper icon={Grip} name="Grip" />
      <IconWrapper icon={Lock} name="Lock" />
      <IconWrapper icon={CreditCard} name="CreditCard" />
      <IconWrapper icon={Sun} name="Sun" />
      <IconWrapper icon={Moon} name="Moon" />
      <IconWrapper icon={Circle} name="Circle" />
    </div>
  ),
}
