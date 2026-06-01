import * as React from "react"
import { MapPin, Zap } from "lucide-react"

import { ExpandableRadioItem, ExpandableRadioGroup } from "../ExpandableRadioItem"
import { Button } from "../../shadcn/Button"

export default {
  title: "Blocks/ExpandableRadioItem/WithoutBadge",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Sem Badge

Esta variação mostra que a propriedade \`badge\` é **totalmente opcional**. O componente 
funciona perfeitamente sem ela, mantendo a mesma funcionalidade de expansão.

## Características desta variação

- **Sem badges** — visual mais limpo
- **Conteúdo variável** — pode ser formulário, texto ou qualquer \`ReactNode\`
- **3 opções** demonstrando diferentes tipos de expansão
- **Estado padrão** pré-selecionado (\`defaultValue="shipping"\`)

## Casos de uso

- Seleção de método de entrega
- Escolha de tipo de notificação
- Configurações sem destaque visual
- Formulários que precisam economizar espaço

## Código

\`\`\`tsx
<ExpandableRadioGroup defaultValue="shipping">
  <ExpandableRadioItem value="shipping" label="Endereço de entrega">
    <AddressFields />
  </ExpandableRadioItem>
  <ExpandableRadioItem value="pickup" label="Retirar na loja">
    <SimpleInfo />
  </ExpandableRadioItem>
</ExpandableRadioGroup>
\`\`\`
        `,
      },
    },
  },
}

const AddressFields = () => (
  <div className="pt-2 space-y-3">
    <div>
      <label className="text-xs font-medium text-muted-foreground">CEP</label>
      <div className="mt-1 px-3 py-2 border rounded-md bg-white text-sm">
        01310-100
      </div>
    </div>
    <div>
      <label className="text-xs font-medium text-muted-foreground">Rua</label>
      <div className="mt-1 px-3 py-2 border rounded-md bg-white text-sm">
        Avenida Paulista
      </div>
    </div>
    <Button className="w-full">
      Confirmar endereço
    </Button>
  </div>
)

export const Default = () => {
  return (
    <div className="w-[400px] border rounded-xl overflow-hidden shadow-sm">
      <ExpandableRadioGroup defaultValue="shipping">
        <ExpandableRadioItem value="shipping" label="Endereço de entrega">
          <AddressFields />
        </ExpandableRadioItem>

        <ExpandableRadioItem value="pickup" label="Retirar na loja">
          <div className="pt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Rua das Flores, 123 - Centro</span>
          </div>
        </ExpandableRadioItem>

        <ExpandableRadioItem value="digital" label="Entrega digital">
          <div className="pt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4" />
            <span>Disponível em alguns minutos no seu e-mail.</span>
          </div>
        </ExpandableRadioItem>
      </ExpandableRadioGroup>
    </div>
  )
}

Default.storyName = "Visualização"
Default.parameters = {
  docs: {
    description: {
      story: "Lista sem badges, demonstrando que o badge é totalmente opcional.",
    },
  },
}
