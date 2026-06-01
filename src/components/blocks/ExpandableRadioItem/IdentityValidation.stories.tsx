import * as React from "react"
import { Camera, Upload, ChevronRight } from "lucide-react"

import { ExpandableRadioItem, ExpandableRadioGroup } from "../ExpandableRadioItem"
import { Button } from "../../shadcn/Button"

export default {
  title: "Blocks/ExpandableRadioItem/IdentityValidation",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Validação de Identidade

Este caso de uso demonstra como o \`ExpandableRadioItem\` pode ser usado em fluxos de 
**verificação de identidade**, onde cada documento selecionado expande opções de captura.

## Características desta variação

- **5 documentos** disponíveis (CNH, CIN, RNE, Passaporte, RG)
- **Badges indicativas** para informar velocidade de aprovação
- **Conteúdo expandido** com botões de captura (câmera e upload)
- **Estado padrão** pré-selecionado (\`defaultValue="rg"\`)

## Código

\`\`\`tsx
<ExpandableRadioGroup defaultValue="rg">
  <ExpandableRadioItem value="cnh" label="CNH" badge={<GreenBadge />}>
    <DocumentActions />
  </ExpandableRadioItem>
  {/* ... outros itens */}
</ExpandableRadioGroup>
\`\`\`

## Quando usar este padrão

- KYC (Know Your Customer) em fintechs
- Cadastros em geral que exigem documento
- Onboarding de usuários
- Renovação de cadastros
        `,
      },
    },
  },
}

const GreenBadge = () => (
  <span className="px-2 py-0.5 text-xs font-medium rounded-md whitespace-nowrap bg-green-100 text-green-800">
    Aprovação mais rápida
  </span>
)

const AmberBadge = () => (
  <span className="px-2 py-0.5 text-xs font-medium rounded-md whitespace-nowrap bg-amber-100 text-amber-900">
    Aprovação pode demorar mais
  </span>
)

const DocumentActions = () => (
  <div className="flex flex-col gap-3 pt-2">
    <Button 
      variant="outline" 
      className="w-full justify-between h-14 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 bg-white"
    >
      <span className="flex items-center text-base font-normal">
        <Camera className="mr-3 h-5 w-5" />
        Tirar foto do documento
      </span>
      <ChevronRight className="h-5 w-5 opacity-50" />
    </Button>
    <Button 
      variant="outline" 
      className="w-full justify-between h-14 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 bg-white"
    >
      <span className="flex items-center text-base font-normal">
        <Upload className="mr-3 h-5 w-5" />
        Fazer upload do documento
      </span>
      <ChevronRight className="h-5 w-5 opacity-50" />
    </Button>
  </div>
)

export const Default = () => {
  return (
    <div className="w-[400px] border rounded-xl overflow-hidden shadow-sm">
      <ExpandableRadioGroup defaultValue="rg">
        <ExpandableRadioItem value="cnh" label="CNH" badge={<GreenBadge />}>
          <DocumentActions />
        </ExpandableRadioItem>

        <ExpandableRadioItem value="cin" label="CIN">
          <DocumentActions />
        </ExpandableRadioItem>

        <ExpandableRadioItem value="rne" label="RNE">
          <DocumentActions />
        </ExpandableRadioItem>

        <ExpandableRadioItem value="passaporte" label="Passaporte">
          <DocumentActions />
        </ExpandableRadioItem>

        <ExpandableRadioItem value="rg" label="RG" badge={<AmberBadge />}>
          <DocumentActions />
        </ExpandableRadioItem>
      </ExpandableRadioGroup>
    </div>
  )
}

Default.storyName = "Visualização"
Default.parameters = {
  docs: {
    description: {
      story: "Lista de documentos com badges indicativas e ações de captura quando expandido.",
    },
  },
}
