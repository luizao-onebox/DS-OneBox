import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Stepper } from "./Stepper"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../shadcn/Card"
import { Button } from "../shadcn/Button"

const meta = {
  title: "Blocks/Stepper",
  component: Stepper,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Stepper (Multi-step Form)

Um bloco visual utilizado para orientar o usuário através de um processo dividido em múltiplas etapas lógicas e sequenciais.

## Anatomia
- **Step Circle**: Indica o número da etapa ou um ícone de sucesso (\`Check\`).
- **Label & Description**: Título da etapa e um subtítulo opcional de apoio.
- **Connector**: Linha que une as etapas, preenchida quando a etapa anterior foi concluída.

## Boas Práticas

### ✅ Faça
- Use em fluxos complexos como Checkouts, Onboarding e Configurações extensas.
- Mantenha os títulos curtos (1-2 palavras).
- Sempre forneça botões de navegação claros ("Avançar", "Voltar") abaixo do conteúdo.

### ❌ Não Faça
- Não use para processos de apenas 2 etapas.
- Evite mais de 5 etapas horizontais em telas pequenas (considere a orientação vertical).
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

const steps = [
  { title: "Dados Iniciais", description: "Informações básicas" },
  { title: "Endereço", description: "Localização" },
  { title: "Pagamento", description: "Cartão ou Boleto" },
  { title: "Confirmação" },
]

export const Horizontal: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = React.useState(1)

    return (
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>Complete as etapas abaixo para finalizar.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-12">
          <Stepper steps={steps} currentStep={currentStep} orientation="horizontal" />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
          >
            Voltar
          </Button>
          <Button 
            onClick={() => setCurrentStep(s => Math.min(steps.length, s + 1))}
          >
            {currentStep === steps.length - 1 ? "Finalizar" : "Avançar"}
          </Button>
        </CardFooter>
      </Card>
    )
  },
}

export const Vertical: Story = {
  render: () => {
    return (
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Progresso da Solicitação</CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper steps={steps} currentStep={2} orientation="vertical" />
        </CardContent>
      </Card>
    )
  }
}
