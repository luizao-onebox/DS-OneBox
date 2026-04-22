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

## Seletor de Mês/Ano (Dropdown)

O componente suporta \`captionLayout="dropdown"\` para transformar a navegação mês a mês em um dropdown interativo, permitindo seleção direta de qualquer mês e ano dentro do intervalo configurado (\`fromYear\` / \`toYear\`). Isso melhora significativamente a usabilidade em campos de Data.

## Tokens

- \`bg-primary\`: Cor de fundo do dia selecionado.
- \`bg-accent\`: Cor de fundo para dias que fazem parte de um intervalo (range) ou para destacar o dia atual (\`day_today\`).
- \`text-muted-foreground\`: Dias fora do mês atual (\`day_outside\`) ou desabilitados.

## Boas Práticas

### ✅ Faça
- Use \`locale={ptBR}\` para textos em português.
- Configure \`fromYear\` e \`toYear\` para limitar o intervalo de anos disponíveis.
- Use \`captionLayout="dropdown"\` para calendários de seleção de data onde navegação rápida é importante.
- Sempre forneça \`onSelect\` para capturar a seleção.

### ❌ Não Faça
- Não use calendários para ranges muito longos — defina um intervalo razoável.
- Não use \`mode="multiple"\` se o usuário só precisa selecionar uma data.
- Evite desabilitar datas sem contexto — forneça tooltip explicativo.

## Estados do Dia

| Estado | Classe | Descrição |
|--------|--------|-----------|
| Default | \`day\` | Dia normal |
| Selected | \`day_selected\` | Dia atualmente selecionado |
| Today | \`day_today\` | Dia atual (acento visual) |
| Outside | \`day_outside\` | Dias de meses vizinhos |
| Disabled | \`day_disabled\` | Dias não selecionáveis |

## Acessibilidade

- Navegue com \`Arrow Keys\` entre os dias.
- \`Enter\`/\`Space\` seleciona o dia em foco.
- Leitores de tela leem a data atual automaticamente.
- Botões de navegação (\`Previous\`/\`Next\`) têm \`aria-label\` descritivo.
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
