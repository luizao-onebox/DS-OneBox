import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { DetailDrawer } from "./DetailDrawer"
import { Button } from "../shadcn/Button"
import { ExternalLink, FileText, CheckCircle2, Download } from "lucide-react"

const meta = {
  title: "Blocks/DetailDrawer",
  component: DetailDrawer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Um painel lateral (Sheet) estruturado com cabeçalho fixo, botões de ação rápidos e abas de conteúdo rolável.

## Casos de Uso
- Visualizar detalhes rápidos de uma linha em uma \`DataTable\`.
- Abrir informações de um Card do \`Kanban\` sem mudar de tela.
- Perfil resumido de usuário com histórico de logs.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DetailDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    return (
      <DetailDrawer
        trigger={<Button>Abrir Detalhes</Button>}
        title="Solicitação de Análise"
        subtitle="Empresa: Acme Corporation"
        status="Em Análise"
        id="REQ-2025-0589"
        actions={
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <ExternalLink className="h-3.5 w-3.5" />
            Abrir Completo
          </Button>
        }
        detailsTabContent={
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">CNPJ</p>
                <p className="text-sm">00.000.000/0001-00</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Data de Solicitação</p>
                <p className="text-sm">15 de Maio, 2025</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Risco</p>
                <p className="text-sm text-yellow-600 font-medium">Médio Risco</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Analista Responsável</p>
                <p className="text-sm">Não atribuído</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-2">Observações</h4>
              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                Empresa solicitou aumento de limite de crédito. Análise de DRE e Balanço Patrimonial em andamento.
              </p>
            </div>
          </div>
        }
        documentsTabContent={
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-primary/10 text-primary rounded flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Contrato Social v{i}.pdf</p>
                    <p className="text-xs text-muted-foreground">Enviado em 15/05/2025 • 2.4MB</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        }
        historyTabContent={
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="mt-0.5"><CheckCircle2 className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="text-sm font-medium">Documentos recebidos</p>
                <p className="text-xs text-muted-foreground">15/05/2025 às 14:30 via API</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="mt-0.5"><CheckCircle2 className="h-4 w-4 text-primary" /></div>
              <div>
                <p className="text-sm font-medium">Análise Automática iniciada</p>
                <p className="text-xs text-muted-foreground">15/05/2025 às 14:31</p>
              </div>
            </div>
          </div>
        }
      />
    )
  },
}
