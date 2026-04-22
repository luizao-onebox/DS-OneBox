import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { DatePicker } from "./DatePicker"

const meta = {
  title: "Blocks/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# DatePicker

Um componente avançado (Bloco) que combina um \`<Popover>\` (Dropdown), um \`<Button>\` como trigger, e o primitivo \`<Calendar>\` em seu conteúdo para permitir a seleção de datas em formulários de maneira elegante.

## Anatomia do Componente

A estrutura de uso é feita pela composição de 3 elementos:
1. **Trigger (\`PopoverTrigger\`):** Um \`<Button>\` modificado com \`text-left\` e ícone de calendário. Ele muda a cor (\`text-muted-foreground\`) se estiver vazio.
2. **Dropdown (\`PopoverContent\`):** O menu flutuante.
3. **\`Calendar\`**: Renderiza o seletor.

## Dicas

Este não é um componente primitivo direto do Radix UI, mas sim um padrão de composição ("Block") de componentes do ecossistema Shadcn. Utilize a biblioteca \`date-fns\` (com o \`locale\` apropriado, como \`ptBR\`) para formatar as datas de exibição.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => <DatePicker />,
}
