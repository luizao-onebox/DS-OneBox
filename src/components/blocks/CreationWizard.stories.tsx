import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { CreationWizard } from "./CreationWizard"
import { Button } from "../shadcn/Button"
import { Input } from "../shadcn/Input"
import { Label } from "../shadcn/Label"
import { Textarea } from "../shadcn/Textarea"

const meta = {
  title: "Blocks/CreationWizard",
  component: CreationWizard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Um modal robusto que combina o bloco \`Stepper\` com botões de controle de fluxo e formulários.

## Casos de Uso
- **Onboarding de Clientes**: Formulário de múltiplos passos para cadastrar nova Empresa.
- **Solicitações Complexas**: Fluxo passo a passo para gerar uma nova requisição.
- **Configurações Iniciais**: Wizard para primeiro uso de um módulo.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CreationWizard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const [currentStep, setCurrentStep] = React.useState(0)

    const steps = [
      { title: "Identificação", description: "Dados básicos" },
      { title: "Detalhes", description: "Regras de negócio" },
      { title: "Revisão", description: "Confirme tudo" },
    ]

    const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    const handlePrevious = () => setCurrentStep((prev) => Math.max(prev - 1, 0))
    const handleFinish = () => {
      console.log("Finalizado!")
      setOpen(false)
      setCurrentStep(0)
    }

    return (
      <CreationWizard
        open={open}
        onOpenChange={(val) => {
          setOpen(val)
          if (!val) setCurrentStep(0)
        }}
        trigger={<Button>Criar Novo Projeto</Button>}
        title="Criar Novo Projeto"
        description="Preencha as informações para inicializar um novo projeto no OneDocs."
        steps={steps}
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onFinish={handleFinish}
      >
        {currentStep === 0 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Projeto</Label>
              <Input id="name" placeholder="Ex: Onboarding PJ 2025" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="desc">Descrição Curta</Label>
              <Textarea id="desc" placeholder="Objetivo deste projeto..." />
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="tenant">Tenant Responsável</Label>
              <Input id="tenant" placeholder="Digite o nome do tenant" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Orçamento Estimado</Label>
              <Input id="budget" type="number" placeholder="R$ 0,00" />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="rounded-md border p-4 bg-muted/50">
              <h4 className="font-medium text-sm mb-2">Resumo da Criação</h4>
              <p className="text-sm text-muted-foreground">
                Revise os dados acima. Ao clicar em finalizar, o projeto será ativado e e-mails de notificação serão enviados para os responsáveis do Tenant selecionado.
              </p>
            </div>
          </div>
        )}
      </CreationWizard>
    )
  },
}
