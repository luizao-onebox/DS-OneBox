import type { Meta, StoryObj } from "@storybook/react"
import { MetricGrid, MetricCard } from "./MetricGrid"
import { Card, CardHeader, CardTitle, CardContent } from "../shadcn/Card"
import { Badge } from "../shadcn/Badge"
import { ArrowUp, ArrowDown, Users, DollarSign, Activity, TrendingUp } from "lucide-react"

const meta = {
  title: "Blocks/MetricGrid",
  component: MetricGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Componente de agrupamento de cards para dashboards, KPIs e métricas. O \`MetricGrid\` gerencia automaticamente a responsividade da grade, enquanto \`MetricCard\` permite que cards ocupem múltiplas colunas quando necessário.

## Quando usar

- **Dashboards executivos** — Agrupar KPIs de vendas, usuários, engajamento
- **Relatórios visuais** — Cards de métricas com tendências (↑↓)
- **Telas de overview** — Visão geral com métricas + gráficos

## Propriedades

### MetricGrid

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| \`columns\` | \`"1" \\| "2" \\| "3" \\| "4" \\| "6" \\| "12"\` | \`"4"\` | Layout de colunas responsivo |
| \`gap\` | \`"sm" \\| "md" \\| "lg"\` | \`"md"\` | Espaçamento entre cards |
| \`className\` | \`string\` | - | Classes adicionais |

### MetricCard

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| \`span\` | \`"auto" \\| "full" \\| "half" \\| "third" \\| "quarter" \\| "twothirds" \\| "threequarters"\` | \`"auto"\` | Ocupa múltiplas colunas |
| \`className\` | \`string\` | - | Classes adicionais |

## Layouts de Coluna

| Valor | Mobile | Tablet | Desktop |
|-------|--------|--------|---------|
| \`"1"\` | 1 | 1 | 1 |
| \`"2"\` | 1 | 2 | 2 |
| \`"3"\` | 1 | 2 | 3 |
| \`"4"\` | 1 | 2 | 4 |
| \`"6"\` | 1 | 2 | 6 |
| \`"12"\` | 4 | 8 | 12 |

## Exemplo de Uso

\`\`\`tsx
<MetricGrid columns="4" gap="md">
  <MetricCard>
    <Card><CardContent>Receita</CardContent></Card>
  </MetricCard>
  <MetricCard>
    <Card><CardContent>Usuários</CardContent></Card>
  </MetricCard>
</MetricGrid>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: "select",
      options: ["1", "2", "3", "4", "6", "12"],
    },
    gap: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof MetricGrid>

export default meta
type Story = StoryObj<typeof meta>

function MetricCardStory({ trend, label, value, subtext, icon: Icon, badgeText }: {
  trend?: "up" | "down" | "neutral",
  label: string,
  value: string,
  subtext: string,
  icon: React.ComponentType<any>,
  badgeText?: string
}) {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <CardTitle className="text-label-md text-muted-foreground">{label}</CardTitle>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-4 h-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <span className="text-h2 font-bold text-foreground">{value}</span>
          {badgeText && (
            <Badge variant="soft" color={trend === "up" ? "success" : trend === "down" ? "destructive" : "neutral"} size="sm">
              {badgeText}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1">
          {trend === "up" && <ArrowUp className="w-3 h-3 text-success" />}
          {trend === "down" && <ArrowDown className="w-3 h-3 text-destructive" />}
          <span className={`text-body-xs ${trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"}`}>
            {subtext}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

export const Default: Story = {
  render: () => (
    <div className="space-y-8">
      <section>
        <h3 className="text-label-md text-muted-foreground mb-4">4 Colunas (Desktop)</h3>
        <MetricGrid columns="4" gap="md">
          <MetricCard>
            <MetricCardStory label="Receita Total" value="R$ 124.5K" trend="up" subtext="+12.5% vs mês anterior" icon={DollarSign} badgeText="+12.5%" />
          </MetricCard>
          <MetricCard>
            <MetricCardStory label="Usuários Ativos" value="8,432" trend="up" subtext="+8.2% vs semana passada" icon={Users} badgeText="+8.2%" />
          </MetricCard>
          <MetricCard>
            <MetricCardStory label="Taxa de Conversão" value="3.24%" trend="down" subtext="-0.4% vs ontem" icon={TrendingUp} badgeText="-0.4%" />
          </MetricCard>
          <MetricCard>
            <MetricCardStory label="NPS Score" value="72" trend="neutral" subtext="Sem alteração" icon={Activity} />
          </MetricCard>
        </MetricGrid>
      </section>
    </div>
  )
}

export const TwoColumns: Story = {
  render: () => (
    <MetricGrid columns="2" gap="md">
      <MetricCard>
        <Card className="h-full bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
          <CardHeader>
            <CardTitle className="text-label-md text-muted-foreground">Visitas Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-display-sm font-bold text-foreground">12,847</span>
            <p className="text-body-xs text-muted-foreground mt-1">+23% vs ontem às 14h</p>
          </CardContent>
        </Card>
      </MetricCard>
      <MetricCard>
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-label-md text-muted-foreground">Pedidos Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-display-sm font-bold text-foreground">342</span>
            <p className="text-body-xs text-warning mt-1">47 aguardando aprovação</p>
          </CardContent>
        </Card>
      </MetricCard>
    </MetricGrid>
  ),
}

export const MixedLayout: Story = {
  render: () => (
    <MetricGrid columns="4" gap="md">
      <MetricCard span="half">
        <Card className="h-full bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-label-md text-primary-foreground/70">Faturamento Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-display-md font-bold">R$ 1.2M</span>
            <p className="text-body-sm text-primary-foreground/70 mt-1">Meta: R$ 1.5M</p>
            <div className="mt-3 h-2 bg-primary-foreground/20 rounded-full overflow-hidden">
              <div className="h-full w-[80%] bg-primary-foreground rounded-full" />
            </div>
          </CardContent>
        </Card>
      </MetricCard>
      <MetricCard>
        <MetricCardStory label="Novos Clientes" value="1,284" trend="up" subtext="+15.3% vs mês anterior" icon={Users} badgeText="+15.3%" />
      </MetricCard>
      <MetricCard>
        <MetricCardStory label="Ticket Médio" value="R$ 89" trend="down" subtext="-2.1% vs semana passada" icon={DollarSign} badgeText="-2.1%" />
      </MetricCard>
    </MetricGrid>
  ),
}

export const LargeDashboard: Story = {
  render: () => (
    <MetricGrid columns="12" gap="md">
      <MetricCard span="third">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-label-md text-muted-foreground">Total de Vendas</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-display-sm font-bold text-foreground">R$ 2.4M</span>
            <p className="text-body-xs text-success mt-1">+18.2% vs ano anterior</p>
          </CardContent>
        </Card>
      </MetricCard>
      <MetricCard span="third">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-label-md text-muted-foreground">ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <span className="text-display-sm font-bold text-foreground">342%</span>
            <p className="text-body-xs text-success mt-1">+24 pontos vs meta</p>
          </CardContent>
        </Card>
      </MetricCard>
      <MetricCard span="twothirds">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-label-md text-muted-foreground">Evolução Trimestral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2 h-20">
              {[40, 55, 48, 72, 65, 80, 90].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-t" style={{ height: `${h}%` }}>
                  <div className="w-full h-full bg-primary rounded-t" style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>
            <p className="text-body-xs text-muted-foreground mt-2">Q1 → Q3: crescimento de 125%</p>
          </CardContent>
        </Card>
      </MetricCard>
    </MetricGrid>
  ),
}
