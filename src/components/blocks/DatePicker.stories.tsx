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
Um componente avançado (Bloco) que combina um \`<Popover>\` (Dropdown), um \`<Button>\` como trigger, e o primitivo \`<Calendar>\` em seu conteúdo para permitir a seleção de datas em formulários de maneira elegante.

## Anatomia do Componente

A estrutura de uso é feita pela composição de 3 elementos:
1. **Trigger (\`PopoverTrigger\`):** Um \`<Button>\` modificado com \`text-left\` e ícone de calendário. Ele muda a cor (\`text-muted-foreground\`) se estiver vazio.
2. **Dropdown (\`PopoverContent\`):** O menu flutuante.
3. **\`Calendar\`**: Renderiza o seletor.

## Dicas

Este não é um componente primitivo direto do Radix UI, mas sim um padrão de composição ("Block") de componentes do ecossistema Shadcn. Utilize a biblioteca \`date-fns\` (com o \`locale\` apropriado, como \`ptBR\`) para formatar as datas de exibição.

## Boas Práticas

### ✅ Faça
- Use \`DatePicker\` em campos de formulário que requerem data (nascimento, agendamento, etc).
- Formate a data de exibição com \`date-fns\` usando locale pt-BR.
- Use \`placeholder\` descritivo ("Selecione uma data").

### ❌ Não Faça
- Não use DatePicker para range de datas — use dois DatePickers ou um \`Calendar mode="range"\`.
- Não rely em DatePicker para hora — use um componente de Time Picker separado.

## Acessibilidade

- O Popover abre ao clicar no \`Button\` trigger.
- Navegue entre dias com \`Arrow Keys\`.
- \`Escape\` fecha o Popover.
- Leitores de tela leem a data selecionada corretamente.
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
