import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { ptBR } from "date-fns/locale"
import { Calendar } from "./Calendar"

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Calendar

Um componente de calendário para exibir dias e meses, construído sobre o \`react-day-picker\`.

## Anatomia do Componente

A estrutura é baseada inteiramente no \`react-day-picker\`, mas o Tailwind CSS é injetado via \`classNames\` para estilizar as células da tabela HTML gerada:
1. **Nav:** Os botões de anterior e próximo (usando \`<ChevronLeft>\` e \`<ChevronRight>\`).
2. **Table / Head Row:** Os dias da semana no topo.
3. **Cells / Days:** Os dias individuais que podem receber \`data-selected\`.

## Tokens

- \`bg-primary\`: Cor de fundo do dia selecionado.
- \`bg-accent\`: Cor de fundo para dias que fazem parte de um intervalo (range) ou para destacar o dia atual (\`day_today\`).
- \`text-muted-foreground\`: Dias fora do mês atual (\`day_outside\`) ou desabilitados.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        locale={ptBR}
      />
    )
  },
}

export const Multiple: Story = {
  render: () => {
    const [dates, setDates] = React.useState<Date[] | undefined>([new Date()])

    return (
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-md border"
        locale={ptBR}
      />
    )
  },
}
