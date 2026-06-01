import * as React from "react"
import { CreditCard } from "lucide-react"

import { ExpandableRadioItem, ExpandableRadioGroup } from "../ExpandableRadioItem"
import { Button } from "../../shadcn/Button"

export default {
  title: "Blocks/ExpandableRadioItem/Disabled",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Estado Desabilitado

Esta variação mostra como lidar com opções desabilitadas no \`ExpandableRadioItem\`.
O item "Boleto" aparece com opacidade reduzida e não pode ser clicado.

## Características desta variação

- **Item bloqueado** com \`opacity-50\` e \`pointer-events-none\`
- **Conteúdo de fallback** mostrando o motivo da indisponibilidade
- **Indicador visual** claro do que está disponível

## Como desabilitar

Aplique classes utilitárias Tailwind no item desabilitado:

\`\`\`tsx
<ExpandableRadioItem 
  value="boleto" 
  label="Boleto" 
  className="opacity-50 pointer-events-none"
>
  <p className="text-sm text-muted-foreground pt-2">
    Indisponível para esta compra.
  </p>
</ExpandableRadioItem>
\`\`\`

> **Nota:** Para desabilitar usando o Radix RadioGroup, passe a prop \`disabled\` 
> no \`RadioGroupItem\` interno.

## Quando usar este padrão

- Métodos de pagamento condicionais
- Funcionalidades em beta
- Restrições de região/plano
- Dependências não atendidas
        `,
      },
    },
  },
}

const PaymentFields = () => (
  <div className="pt-2 space-y-3">
    <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-slate-50 rounded-md">
      <CreditCard className="h-4 w-4" />
      <span>Você será redirecionado para o ambiente seguro do banco.</span>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="w-full">Pagar à vista</Button>
      <Button variant="outline" className="w-full">Parcelado</Button>
    </div>
  </div>
)

export const Default = () => {
  return (
    <div className="w-[400px] border rounded-xl overflow-hidden shadow-sm">
      <ExpandableRadioGroup defaultValue="debit">
        <ExpandableRadioItem value="debit" label="Cartão de débito">
          <PaymentFields />
        </ExpandableRadioItem>

        <ExpandableRadioItem value="credit" label="Cartão de crédito">
          <PaymentFields />
        </ExpandableRadioItem>

        <ExpandableRadioItem value="pix" label="PIX">
          <div className="pt-2 text-sm text-muted-foreground">
            Pagamento instantâneo via QR Code.
          </div>
        </ExpandableRadioItem>

        <ExpandableRadioItem 
          value="boleto" 
          label="Boleto" 
          className="opacity-50 pointer-events-none"
        >
          <p className="text-sm text-muted-foreground pt-2">
            Indisponível para esta compra.
          </p>
        </ExpandableRadioItem>
      </ExpandableRadioGroup>
    </div>
  )
}

Default.storyName = "Visualização"
Default.parameters = {
  docs: {
    description: {
      story: "Item desabilitado com classe opacity-50 e pointer-events-none.",
    },
  },
}
