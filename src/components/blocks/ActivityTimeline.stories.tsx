import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { ActivityTimeline, TimelineItem } from "./ActivityTimeline"
import { Card, CardHeader, CardTitle, CardContent } from "../shadcn/Card"
import { FileText, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { Badge } from "../shadcn/Badge"

const meta = {
  title: "Blocks/ActivityTimeline",
  component: ActivityTimeline,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Um componente visual para representar o histórico de atividades de uma entidade (documento, usuário, solicitação).

## Casos de Uso
- **Auditoria**: Mostrar quem fez o quê e quando.
- **Progresso de Solicitação**: Acompanhar as etapas de um pedido (Recebido, Em Análise, Aprovado).
- **Log do Sistema**: Exibir falhas e eventos automatizados.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ActivityTimeline>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Histórico da Solicitação #4902</CardTitle>
      </CardHeader>
      <CardContent>
        <ActivityTimeline>
          <TimelineItem
            isDone
            title="Solicitação Criada"
            time="Hoje, 10:45"
            description="Usuário rodrigo@onebox.com enviou 3 documentos para análise."
          />
          <TimelineItem
            isDone
            title="OCR Processado"
            time="Hoje, 10:48"
            description="O sistema extraiu os dados de CNH e Comprovante de Residência com sucesso."
          />
          <TimelineItem
            isActive
            title="Análise Manual"
            time="Em andamento"
            description={
              <div className="flex flex-col gap-2 mt-2">
                <span className="text-sm">Aguardando aprovação de um analista nível 2 devido à divergência de endereço.</span>
                <Badge variant="outline" className="w-fit">Risco Médio</Badge>
              </div>
            }
          />
          <TimelineItem
            title="Decisão Final"
            time="Pendente"
            description="Aprovação ou Recusa do cliente."
          />
        </ActivityTimeline>
      </CardContent>
    </Card>
  ),
}

export const CustomIcons: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Logs de Auditoria</CardTitle>
      </CardHeader>
      <CardContent>
        <ActivityTimeline>
          <TimelineItem
            isActive
            icon={<FileText className="h-5 w-5 text-blue-500" />}
            title="Contrato gerado"
            time="24/05/2025 - 14:30"
            description="Contrato de Prestação de Serviços V2 gerado pelo sistema."
          />
          <TimelineItem
            isActive
            icon={<AlertCircle className="h-5 w-5 text-destructive" />}
            title="Falha na Assinatura"
            time="24/05/2025 - 15:02"
            description="O provedor de assinatura digital (Clicksign) retornou erro 500."
          />
          <TimelineItem
            isDone
            icon={<CheckCircle2 className="h-5 w-5" />}
            title="Assinatura Concluída"
            time="25/05/2025 - 09:15"
            description="Todas as partes assinaram o documento."
          />
        </ActivityTimeline>
      </CardContent>
    </Card>
  ),
}
