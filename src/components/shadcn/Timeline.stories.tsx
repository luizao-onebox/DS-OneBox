import type { Meta, StoryObj } from "@storybook/react"
import { Timeline } from "./Timeline"
import { Building2, Truck, Package, CreditCard, CheckCircle2 } from "lucide-react"

const meta = {
  title: "Components/Timeline",
  component: Timeline,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Linha do tempo para acompanhamento de processos e status.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Timeline>

export default meta
type Story = StoryObj<typeof meta>

const orderItems = [
  { id: "1", title: "Pedido Recebido", description: "Seu pedido foi confirmado", date: "10 Jan, 14:30", status: "completed" as const },
  { id: "2", title: "Pagamento Aprovado", description: "Transação processada com sucesso", date: "10 Jan, 14:35", status: "completed" as const, icon: <CreditCard className="h-4 w-4" /> },
  { id: "3", title: "Preparando Envio", description: "Seu pedido está sendo separado", date: "11 Jan, 09:00", status: "current" as const, icon: <Package className="h-4 w-4" /> },
  { id: "4", title: "Em Transporte", description: "Na estrada para sua cidade", date: "Previsto: 13 Jan", status: "pending" as const, icon: <Truck className="h-4 w-4" /> },
  { id: "5", title: "Entregue", description: "Pedido entregue ao destinatário", date: "Previsto: 13 Jan", status: "pending" as const, icon: <Building2 className="h-4 w-4" /> },
]

const projectItems = [
  { id: "1", title: "Kickoff", description: "Reunião inicial com stakeholders", date: "Dez 2025", status: "completed" as const, icon: <CheckCircle2 className="h-4 w-4" /> },
  { id: "2", title: "Design System", description: "Criação dos componentes base", date: "Jan 2026", status: "completed" as const },
  { id: "3", title: "Desenvolvimento", description: "Implementação das funcionalidades", date: "Fev-Mar 2026", status: "current" as const },
  { id: "4", title: "Beta Testing", description: "Testes com usuários selecionados", date: "Abr 2026", status: "pending" as const },
  { id: "5", title: "Lançamento", description: "Deploy em produção", date: "Mai 2026", status: "pending" as const },
]

export const Vertical: Story = {
  render: () => (
    <div className="max-w-xl">
      <h3 className="text-h3 mb-6">Acompanhamento de Pedido</h3>
      <Timeline items={orderItems} direction="vertical" />
    </div>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <div className="w-full overflow-x-auto pb-4">
      <h3 className="text-h3 mb-6">Roadmap do Projeto</h3>
      <Timeline items={projectItems} direction="horizontal" />
    </div>
  ),
}

export const Simple: Story = {
  render: () => (
    <div className="max-w-xl">
      <Timeline
        items={[
          { id: "1", title: "Passo 1", status: "completed" },
          { id: "2", title: "Passo 2", status: "completed" },
          { id: "3", title: "Passo 3", status: "current" },
          { id: "4", title: "Passo 4", status: "pending" },
        ]}
      />
    </div>
  ),
}
