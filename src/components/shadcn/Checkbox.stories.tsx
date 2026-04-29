import { Checkbox } from "./Checkbox"
import { Label } from "./Label"

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

O \`Checkbox\` é um componente de controle utilizado para selecionar uma ou mais opções em um conjunto, podendo atuar independentemente.

## Anatomia do Componente

A estrutura de uso é baseada no primitive do Radix UI:
1. **Container (Root):** A caixa visual do componente com as dimensões de \`h-4 w-4\`.
2. **Indicador Visual (Indicator):** Um ícone (geralmente um \`Check\` do lucide-react) que aparece apenas quando o \`state\` é marcado.
3. **Label:** Texto associado (Requer uso manual com \`<label htmlFor="...">\`).

## Tokens e Design System

- \`border-primary\`: Cor da borda que delimita o campo.
- \`bg-primary\` e \`text-primary-foreground\`: Injetados automaticamente quando o item está no estado \`data-[state=checked]\`.
- \`ring-ring\`: Borda interativa para foco e acessibilidade visual por teclado.

## Estado Indeterminado (Indeterminate)

Através da prop \`indeterminate\`, o checkbox exibe um traço horizontal no lugar do check tradicional, simbolizando opções "parcialmente selecionadas", comum em \`DataTables\` com cabeçalhos de "Selecionar Tudo".

## Boas Práticas

### ✅ Faça
- Sempre associe um \`<Label>\` ao checkbox via \`htmlFor\`.
- Para grupos de checkboxes, use um \`<fieldset>\` com \`<legend>\`.
- Para checkboxes com descrição, use \`flex items-start\` e alinhe o texto no topo.
- Use \`indeterminate\` para representar estados "parcialmente selecionados" em listas hierárquicas.

### ❌ Não Faça
- Não use checkbox para ações mutuamente exclusivas — use \`RadioGroup\`.
- Não use checkbox para estados on/off instantâneos sem \`onChange\` handler.
- Evite labels muito longos — seja conciso.

## Estados

| Estado | Descrição |
|--------|-----------|
| \`unchecked\` | Estado padrão, não selecionado |
| \`checked\` | Estado marcado (exibe ícone de check) |
| \`indeterminate\` | Estado intermediário (traço horizontal) |
| \`disabled\` | Estado desabilitado (não interagível) |

## Acessibilidade

- Sempre use \`id\` único no \`<Checkbox>\` e \`htmlFor\` correspondente no \`<Label>\`.
- Para grupos, encapsule com \`<fieldset>\` e \`<legend>\`.
- O atributo \`aria-checked\` é gerenciado automaticamente pelo Radix.
- Em estados \`indeterminate\`, o Radix.define "_aria-checked" como "mixed".

## Exemplo de Uso

\`\`\`tsx
import { Checkbox } from "@/components/shadcn/Checkbox"
import { Label } from "@/components/shadcn/Label"

function Example() {
  return (
    <div className="flex items-start space-x-2">
      <Checkbox id="terms" />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor="terms">Accept terms</Label>
        <p className="text-sm text-muted-foreground">
          You agree to our terms of service.
        </p>
      </div>
    </div>
  )
}
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
}

export const CheckboxPlayground = {
  args: {
    id: "terms",
    disabled: false,
    defaultChecked: false,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <Label htmlFor={args.id || "terms"}>Accept terms and conditions</Label>
    </div>
  ),
}

export const CheckboxGallery = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">With Description</h2>
        <div className="flex items-start space-x-2">
          <Checkbox id="comms" className="mt-0.5" />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="comms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Marketing emails
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about new products and special offers.
            </p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Disabled</h2>
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled" disabled />
          <Label htmlFor="disabled" className="opacity-50">Disabled checkbox</Label>
        </div>
      </section>
    </div>
  ),
}
