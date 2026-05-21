// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react"
import { PageLayout } from "./PageLayout"
import { PageHeader } from "./PageHeader"
import { Button } from "../shadcn/Button"
import { Badge } from "../shadcn/Badge"
import { Tabs, TabsList, TabsTrigger } from "../shadcn/Tabs"
import { MetricGrid, MetricCard } from "./MetricGrid"
import { Card, CardHeader, CardTitle, CardContent } from "../shadcn/Card"

const meta = {
  title: "Blocks/PageLayout",
  component: PageLayout,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Componentes de arquitetura de tela para garantir consistência visual em todas as páginas da aplicação.

## Sub-sistema de Layout

O objetivo é substituir o uso arbitrário de \`<Flex direction="col" className="p-6 gap-6">\` por componentes semânticos que centralizam as decisões de espaçamento.

### Componentes

- **PageLayout**: Container principal da página com espaçamento vertical consistente entre seções
- **PageHeader**: Cabeçalho semântico com título, descrição e área de ações

## Quando usar

- **PageLayout**: Na raiz de toda página/página de dashboard
- **PageHeader**: Sempre que uma página tiver título, descrição e ações de cabeçalho

## Exemplo de Uso

\`\`\`tsx
<PageLayout spacing="default">
  <PageHeader
    title="Controle Financeiro"
    description="Visão geral das finanças empresariais"
    actions={<Button>Novo</Button>}
  />
  <MetricGrid columns="4">
    <MetricCard><Card><CardContent>Métrica</CardContent></Card></MetricCard>
  </MetricGrid>
</PageLayout>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    spacing: {
      control: "select",
      options: ["tight", "default", "loose"],
    },
    flush: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof PageLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <PageLayout spacing="default">
      <PageHeader
        title="Dashboard Financeiro"
        description="Visão geral das métricas financeiras da empresa"
        actions={
          <>
            <Tabs defaultValue="month">
              <TabsList>
                <TabsTrigger value="month">Mês</TabsTrigger>
                <TabsTrigger value="quarter">Trimestre</TabsTrigger>
                <TabsTrigger value="year">Ano</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button>Atualizar</Button>
          </>
        }
      />
      <MetricGrid columns="4" gap="md">
        <MetricCard>
          <Card className="h-full">
            <CardHeader><CardTitle className="text-label-md text-muted-foreground">Receita</CardTitle></CardHeader>
            <CardContent><span className="text-h2 font-bold">R$ 1.2M</span></CardContent>
          </Card>
        </MetricCard>
        <MetricCard>
          <Card className="h-full">
            <CardHeader><CardTitle className="text-label-md text-muted-foreground">Despesas</CardTitle></CardHeader>
            <CardContent><span className="text-h2 font-bold">R$ 890K</span></CardContent>
          </Card>
        </MetricCard>
        <MetricCard>
          <Card className="h-full">
            <CardHeader><CardTitle className="text-label-md text-muted-foreground">Lucro</CardTitle></CardHeader>
            <CardContent><span className="text-h2 font-bold text-success">R$ 310K</span></CardContent>
          </Card>
        </MetricCard>
        <MetricCard>
          <Card className="h-full">
            <CardHeader><CardTitle className="text-label-md text-muted-foreground">Tickets</CardTitle></CardHeader>
            <CardContent><span className="text-h2 font-bold">342</span></CardContent>
          </Card>
        </MetricCard>
      </MetricGrid>
    </PageLayout>
  ),
}

export const TightSpacing: Story = {
  render: () => (
    <PageLayout spacing="tight">
      <PageHeader
        title="Lista de Tarefas"
        description="Suas tarefas pendentes"
      />
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <Card key={i}><CardContent className="p-4">Tarefa {i}</CardContent></Card>
        ))}
      </div>
    </PageLayout>
  ),
}

export const FlushLayout: Story = {
  render: () => (
    <PageLayout spacing="default" flush>
      <div className="bg-primary text-primary-foreground p-8 rounded-lg">
        <h2 className="text-h3 font-bold">Dashboard Full-Width</h2>
        <p className="text-body-md opacity-80">Este layout não tem padding lateral</p>
      </div>
    </PageLayout>
  ),
}

export const CenteredHeader: Story = {
  render: () => (
    <PageLayout spacing="default">
      <PageHeader
        align="center"
        title="Perfil do Usuário"
        description="Gerencie suas informações pessoais"
        actions={<Button variant="secondary">Editar</Button>}
      />
      <Card>
        <CardContent className="p-6">
          <p className="text-body-md">Conteúdo do perfil...</p>
        </CardContent>
      </Card>
    </PageLayout>
  ),
}

export const WithBadgeActions: Story = {
  render: () => (
    <PageLayout spacing="default">
      <PageHeader
        title="Usuários Ativos"
        actions={
          <div className="flex items-center gap-3">
            <Badge variant="soft" color="success">142 online</Badge>
            <Button size="sm">Convidar</Button>
          </div>
        }
      />
      <div className="text-body-md text-muted-foreground">Lista de usuários...</div>
    </PageLayout>
  ),
}
