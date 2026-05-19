import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Funnel,
  FunnelChart,
  LabelList,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/Card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../shadcn/Chart"

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Fev", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Abr", desktop: 73, mobile: 190 },
  { month: "Mai", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const pieData = [
  { browser: "chrome", visitors: 275, fill: "#2563eb" },
  { browser: "safari", visitors: 200, fill: "#10b981" },
  { browser: "firefox", visitors: 187, fill: "#f59e0b" },
  { browser: "edge", visitors: 173, fill: "#8b5cf6" },
  { browser: "other", visitors: 90, fill: "#ec4899" },
]

const radarData = [
  { subject: "Velocidade", A: 120, B: 110, fullMark: 150 },
  { subject: "Confiabilidade", A: 98, B: 130, fullMark: 150 },
  { subject: "Conforto", A: 86, B: 90, fullMark: 150 },
  { subject: "Segurança", A: 99, B: 100, fullMark: 150 },
  { subject: "Manutenção", A: 85, B: 95, fullMark: 150 },
  { subject: "Eficiência", A: 108, B: 105, fullMark: 150 },
]

const funnelData = [
  { name: "Visitas", value: 1000 },
  { name: "Leads", value: 750 },
  { name: "Oportunidades", value: 500 },
  { name: "Propostas", value: 250 },
  { name: "Fechamentos", value: 100 },
]

const skillData = [
  { name: "React", level: 90, color: "#2563eb" },
  { name: "TypeScript", level: 85, color: "#3178c6" },
  { name: "Node.js", level: 75, color: "#10b981" },
  { name: "Design", level: 70, color: "#f59e0b" },
  { name: "DevOps", level: 60, color: "#8b5cf6" },
]

const chartConfig = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#10b981" },
} satisfies ChartConfig

const pieConfig = {
  visitors: { label: "Visitantes" },
  chrome: { label: "Chrome" },
  safari: { label: "Safari" },
  firefox: { label: "Firefox" },
  edge: { label: "Edge" },
  other: { label: "Outros" },
} satisfies ChartConfig

const radarConfig = {
  A: { label: "Produto A", color: "#2563eb" },
  B: { label: "Produto B", color: "#10b981" },
} satisfies ChartConfig

export function DashboardCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* 1. Bar Chart (Vertical) */}
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Barras</CardTitle>
          <CardDescription>Acessos Jan - Jun 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent payload={[]} />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 2. Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Linhas</CardTitle>
          <CardDescription>Tendência de Crescimento</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
              <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 3. Area Chart Stacked */}
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Área (Stacked)</CardTitle>
          <CardDescription>Volume Cumulativo</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area dataKey="mobile" type="natural" fill="var(--color-mobile)" fillOpacity={0.4} stroke="var(--color-mobile)" stackId="a" />
              <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" stackId="a" />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 4. Donut/Pie Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Gráfico de Rosca (Donut)</CardTitle>
          <CardDescription>Distribuição de Navegadores</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={pieConfig} className="mx-auto aspect-square max-h-64">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie data={pieData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 5. Radar Chart (Spider) */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Gráfico Radar (Spider)</CardTitle>
          <CardDescription>Comparativo de Produtos</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={radarConfig} className="mx-auto aspect-square max-h-64">
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
              <Radar name="Produto A" dataKey="A" stroke="var(--color-A)" fill="var(--color-A)" fillOpacity={0.3} />
              <Radar name="Produto B" dataKey="B" stroke="var(--color-B)" fill="var(--color-B)" fillOpacity={0.3} />
              <ChartLegend content={<ChartLegendContent payload={[]} />} />
              <ChartTooltip content={<ChartTooltipContent />} />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 6. Gauge Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Gráfico de Gauge</CardTitle>
          <CardDescription>Indicador de Performance</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center pb-6">
          <div className="relative w-full max-w-xs aspect-[2/1] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[200%]">
              <ChartContainer config={{}} className="aspect-square h-full w-full">
                <PieChart>
                  <Pie
                    data={[{ name: "value", value: 75 }, { name: "remain", value: 25 }]}
                    cx="50%"
                    cy="50%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius="75%"
                    outerRadius="100%"
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill="#2563eb" />
                    <Cell fill="hsl(var(--muted))" />
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent hideIndicator hideLabel />} cursor={false} />
                </PieChart>
              </ChartContainer>
            </div>
            <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center pb-2">
              <span className="text-h1 font-bold text-foreground leading-none">75%</span>
              <span className="text-body-sm text-muted-foreground mt-1">Velocidade</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7. Skill Bars */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Gráfico de Habilidades</CardTitle>
          <CardDescription>Níveis de Competência</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="space-y-4">
            {skillData.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between text-body-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 8. Funnel Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Gráfico de Funil</CardTitle>
          <CardDescription>Conversão de Pipeline</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={{}} className="mx-auto aspect-square max-h-64">
            <FunnelChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Funnel dataKey="value" data={funnelData} isAnimationActive>
                <LabelList position="right" fill="hsl(var(--foreground))" stroke="none" dataKey="name" className="text-body-sm" />
                <LabelList position="center" fill="#fff" stroke="none" dataKey="value" className="text-body-md font-bold" />
              </Funnel>
            </FunnelChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 9. Line Chart with Area Fill */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Linha com Área</CardTitle>
          <CardDescription>Tendência com Destaque</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-64">
            <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
              <defs>
                <linearGradient id="colorDesktopFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => value.slice(0, 3)} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area dataKey="desktop" type="monotone" fill="url(#colorDesktopFill)" stroke="var(--color-desktop)" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 10. Stacked Area with Gradients */}
      <Card className="flex flex-col md:col-span-2 lg:col-span-3">
        <CardHeader>
          <CardTitle>Área Empilhada com Gradientes</CardTitle>
          <CardDescription>Volume por Canal ao Longo do Tempo</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
              <defs>
                <linearGradient id="colorDesktopGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorMobileGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent payload={[]} />} />
              <Area dataKey="desktop" type="monotone" fill="url(#colorDesktopGrad)" stroke="var(--color-desktop)" strokeWidth={2} />
              <Area dataKey="mobile" type="monotone" fill="url(#colorMobileGrad)" stroke="var(--color-mobile)" strokeWidth={2} />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
