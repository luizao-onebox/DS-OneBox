import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { NotificationCenter, Notification } from "./NotificationCenter"

const meta = {
  title: "Blocks/NotificationCenter",
  component: NotificationCenter,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Um centro de notificações (Popover) com contagem de não-lidas, rolagem interna e ações em lote. Ideal para ficar alojado na Topbar.

## Casos de Uso
- **Avisos do Sistema**: Manutenção, faturamento.
- **Interações**: Um documento foi aprovado, você foi mencionado num comentário.
- **Tarefas**: Lembretes de vencimento de prazos.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NotificationCenter>

export default meta
type Story = StoryObj<typeof meta>

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Documento Aprovado",
    description: "A CNH do usuário João da Silva foi aprovada na verificação de Background Check.",
    time: "Há 5 min",
    isRead: false,
    category: "success",
  },
  {
    id: "2",
    title: "Nova Solicitação",
    description: "Você foi atribuído à análise de risco da empresa Acme Corp.",
    time: "Há 1 hora",
    isRead: false,
    category: "alert",
  },
  {
    id: "3",
    title: "Manutenção Programada",
    description: "O sistema passará por manutenção no dia 25/05 às 23:00h.",
    time: "Ontem",
    isRead: true,
    category: "system",
  },
  {
    id: "4",
    title: "Fatura Disponível",
    description: "A fatura de maio já está disponível no seu painel financeiro.",
    time: "Segunda-feira",
    isRead: true,
    category: "system",
  },
]

export const Default: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState(mockNotifications)

    return (
      <div className="flex w-full items-center justify-end p-4 border rounded-lg bg-card">
        <NotificationCenter
          notifications={notifications}
          onMarkAllAsRead={() => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))}
          onClearAll={() => setNotifications([])}
          onNotificationClick={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n))}
        />
      </div>
    )
  },
}

export const Empty: Story = {
  render: () => (
    <div className="flex w-full items-center justify-end p-4 border rounded-lg bg-card">
      <NotificationCenter notifications={[]} />
    </div>
  ),
}
