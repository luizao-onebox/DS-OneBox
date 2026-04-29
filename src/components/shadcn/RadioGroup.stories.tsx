import { RadioGroup, RadioGroupItem } from "./RadioGroup"
import { Label } from "./Label"

export default {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `

O \`RadioGroup\` é um componente de controle utilizado para selecionar uma única opção entre um conjunto mutuamente exclusivo de escolhas.

## Anatomia do Componente

1. **Container (RadioGroup):** Wrapper que gerencia o estado de seleção via Radix.
2. **Item (RadioGroupItem):** Cada opção individual do grupo, renderizada como um \`<input type="radio">\`.
3. **Label:** Texto associado a cada item.

## Tokens e Design System

- \`bg-primary\` / \`text-primary-foreground\`: Injetados quando \`data-[state=checked]\`.
- \`ring-ring\`: Anel de foco para navegação por teclado.
- \`bg-background\`: Fundo do círculo do radio button.

## Boas Práticas

### ✅ Faça
- Use RadioGroup para opções mutuamente exclusivas (só uma pode ser selecionada).
- Liste as opções em ordem lógica (mais comum primeiro, menos comum por último).
- Forneça Labels claros e descritivos para cada opção.
- Use \`defaultValue\` para definir a seleção inicial.

### ❌ Não Faça
- Não use RadioGroup para escolhas sim/não — use Switch.
- Não use para listas maiores que 7 itens — considere DropdownMenu ou Select.
- Não deixe uma lista de RadioGroup sem nenhuma seleção default sem justificativa.

## Estados

| Estado | Descrição |
|--------|-----------|
| \`unchecked\` | Não selecionado (círculo vazio) |
| \`checked\` | Selecionado (círculo preenchido) |
| \`disabled\` | Desabilitado (não interagível) |

## Acessibilidade

- RadioGroup é um \`<fieldset>\` semanticamente.
- Cada \`<RadioGroupItem>\` é um \`<input type="radio">\`.
- Use \`<Label>\` com \`htmlFor\` para cada item.
- Navegue com Arrow Keys entre as opções.
- \`aria-checked\` é gerenciado automaticamente pelo Radix.

## Diferença entre RadioGroup, Checkbox e Switch

| Característica | RadioGroup | Checkbox | Switch |
|----------------|------------|----------|--------|
| Seleção | Única | Múltipla | Única (toggle) |
| Mutualamente exclusivo | Sim | Não | Sim |
| Efeito | Requer submit | Requer submit | Imediato |
| Uso típico | Escolher uma opção | Aceitar termos | Configurações |
        `,
      },
    },
  },
}

export const RadioGroupPlayground = {
  render: () => (
    <RadioGroup defaultValue="option-1" className="space-y-3">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="r1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="r2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="r3" />
        <Label htmlFor="r3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const RadioGroupGallery = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <RadioGroup defaultValue="option-1" className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-1" id="g-r1" />
            <Label htmlFor="g-r1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-2" id="g-r2" />
            <Label htmlFor="g-r2">Option 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-3" id="g-r3" />
            <Label htmlFor="g-r3">Option 3</Label>
          </div>
        </RadioGroup>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Disabled</h2>
        <RadioGroup defaultValue="option-1" className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-1" id="d1" disabled />
            <Label htmlFor="d1" className="opacity-50">Disabled option</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-2" id="d2" />
            <Label htmlFor="d2">Option 2</Label>
          </div>
        </RadioGroup>
      </section>
    </div>
  ),
}
