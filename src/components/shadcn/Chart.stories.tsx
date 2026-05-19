import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ComposedChart, Funnel, FunnelChart, LabelList, PieChartLabelProps } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "./Chart"

const meta = {
  title: "Components/Chart",
  component: ChartContainer,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Primitivos do Chart (ChartContainer, ChartTooltip, etc) que servem como base para criar gráficos usando Recharts integrados ao tema do projeto.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ChartContainer>

export default meta
type Story = StoryObj<typeof meta>

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80, tablet: 120 },
  { month: "Fev", desktop: 305, mobile: 200, tablet: 150 },
  { month: "Mar", desktop: 237, mobile: 120, tablet: 110 },
  { month: "Abr", desktop: 73, mobile: 190, tablet: 90 },
  { month: "Mai", desktop: 209, mobile: 130, tablet: 160 },
  { month: "Jun", desktop: 214, mobile: 140, tablet: 130 },
]

const pieData = [
  { browser: "chrome", visitors: 275, fill: "hsl(var(--chart-1, 220 70% 50%))" },
  { browser: "safari", visitors: 200, fill: "hsl(var(--chart-2, 160 60% 45%))" },
  { browser: "firefox", visitors: 187, fill: "hsl(var(--chart-3, 30 80% 55%))" },
  { browser: "edge", visitors: 173, fill: "hsl(var(--chart-4, 280 65% 60%))" },
  { browser: "other", visitors: 90, fill: "hsl(var(--chart-5, 340 75% 55%))" },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb", // Azul
  },
  mobile: {
    label: "Mobile",
    color: "#10b981", // Verde
  },
  tablet: {
    label: "Tablet",
    color: "#f59e0b", // Laranja
  },
} satisfies ChartConfig

const pieConfig = {
  visitors: { label: "Visitantes" },
  chrome: { label: "Chrome" },
  safari: { label: "Safari" },
  firefox: { label: "Firefox" },
  edge: { label: "Edge" },
  other: { label: "Outros" },
} satisfies ChartConfig

const radarData = [
  { subject: "Velocidade", A: 120, B: 110, fullMark: 150 },
  { subject: "Confiabilidade", A: 98, B: 130, fullMark: 150 },
  { subject: "Conforto", A: 86, B: 90, fullMark: 150 },
  { subject: "Segurança", A: 99, B: 100, fullMark: 150 },
  { subject: "Manutenção", A: 85, B: 95, fullMark: 150 },
  { subject: "Eficiência", A: 108, B: 105, fullMark: 150 },
]

const radarConfig = {
  A: { label: "Carro A", color: "#2563eb" },
  B: { label: "Carro B", color: "#10b981" },
} satisfies ChartConfig

const gaugeData = [
  { name: "Velocidade", value: 75, total: 100 },
]

const skillData = [
  { name: "React", level: 90, color: "#2563eb" },
  { name: "TypeScript", level: 85, color: "#3178c6" },
  { name: "Node.js", level: 75, color: "#10b981" },
  { name: "Design", level: 70, color: "#f59e0b" },
  { name: "DevOps", level: 60, color: "#8b5cf6" },
]

const funnelChartData = [
  { name: "Visitas", value: 1000 },
  { name: "Leads", value: 750 },
  { name: "Oportunidades", value: 500 },
  { name: "Propostas", value: 250 },
  { name: "Fechamentos", value: 100 },
]

export const BarChartExample: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <h2 className="text-h4 font-bold mb-4">Gráfico de Barras</h2>
      <ChartContainer config={chartConfig} className="min-h-64 w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent payload={[]} />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          <Bar dataKey="tablet" fill="var(--color-tablet)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  ),
}

export const BarChartHorizontalExample: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <h2 className="text-h4 font-bold mb-4">Gráfico de Barras Horizontal</h2>
      <ChartContainer config={chartConfig} className="min-h-64 w-full">
        <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: -20 }}>
          <CartesianGrid horizontal={false} vertical={true} />
          <XAxis type="number" dataKey="desktop" hide />
          <YAxis
            dataKey="month"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent payload={[]} />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          <Bar dataKey="tablet" fill="var(--color-tablet)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  ),
}

export const LineChartExample: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <h2 className="text-h4 font-bold mb-4">Gráfico de Linhas</h2>
      <ChartContainer config={chartConfig} className="min-h-64 w-full">
        <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent payload={[]} />} />
          <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
          <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
          <Line dataKey="tablet" type="monotone" stroke="var(--color-tablet)" strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  ),
}

export const AreaChartExample: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <h2 className="text-h4 font-bold mb-4">Gráfico de Área (Stacked)</h2>
      <ChartContainer config={chartConfig} className="min-h-64 w-full">
        <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent payload={[]} />} />
          <Area dataKey="mobile" type="natural" fill="var(--color-mobile)" fillOpacity={0.4} stroke="var(--color-mobile)" stackId="a" />
          <Area dataKey="tablet" type="natural" fill="var(--color-tablet)" fillOpacity={0.4} stroke="var(--color-tablet)" stackId="a" />
          <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" stackId="a" />
        </AreaChart>
      </ChartContainer>
    </div>
  ),
}

export const PieChartExample: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <h2 className="text-h4 font-bold mb-4">Gráfico de Rosca (Donut)</h2>
      <ChartContainer config={pieConfig} className="mx-auto aspect-square max-h-72">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie data={pieData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  ),
}

export const DistributionBarExample: Story = {
  render: () => {
    const distributionData = [
      {
        id: "captured",
        label: "Capturado",
        value: 56.1,
        colorClass: "bg-success-500",
        description: "sobreposição entre referência e amostra",
      },
      {
        id: "unbalanced",
        label: "Desbalanceamento",
        value: 15.5,
        colorClass: "bg-warning-500",
        textClass: "text-warning-950",
        description: "IFs presentes com proporção incorreta",
      },
      {
        id: "missing",
        label: "IFs ausentes",
        value: 28.4,
        colorClass: "bg-destructive-500",
        description: "C6, Itaú Mercantil, Itaú Consignado",
      },
    ]

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-h4 font-bold mb-4">Gráfico de Distribuição (Proporção)</h2>

        {/* Barra de Proporção */}
        <div className="flex h-8 w-full overflow-hidden rounded-md mb-4">
          {distributionData.map((item) => (
            <div
              key={item.id}
              style={{ width: `${item.value}%` }}
              className={`${item.colorClass} flex items-center justify-center text-body-xs font-bold transition-all hover:brightness-110 ${
                item.textClass || "text-white"
              }`}
            >
              {item.value}%
            </div>
          ))}
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-body-xs sm:text-body-sm">
          {distributionData.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <div className={`h-3 w-3 shrink-0 rounded-sm ${item.colorClass}`} />
              <div className="leading-none mt-[2px]">
                <span className="font-bold text-foreground">
                  {item.label} ({item.value}%)
                </span>
                <span className="text-muted-foreground"> — {item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}

export const RadarChartExample: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <h2 className="text-h4 font-bold mb-4">Gráfico Radar (Spider)</h2>
      <ChartContainer config={radarConfig} className="min-h-72 w-full">
        <RadarChart data={radarData}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }} />
          <Radar name="Carro A" dataKey="A" stroke="var(--color-A)" fill="var(--color-A)" fillOpacity={0.3} />
          <Radar name="Carro B" dataKey="B" stroke="var(--color-B)" fill="var(--color-B)" fillOpacity={0.3} />
          <ChartLegend content={<ChartLegendContent payload={[]} />} />
          <ChartTooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ChartContainer>
    </div>
  ),
}

export const GaugeChartExample: Story = {
  render: () => {
    const percent = 0.75
    const data = [
      { name: "value", value: percent * 100 },
      { name: "remain", value: (1 - percent) * 100 },
    ]

    return (
      <div className="w-full max-w-xs">
        <h2 className="text-h4 font-bold mb-4">Gráfico de Gauge</h2>
        <ChartContainer config={{}} className="aspect-square w-full">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius="65%"
              outerRadius="90%"
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              <Cell fill="#2563eb" />
              <Cell fill="hsl(var(--muted))" />
            </Pie>
            <ChartTooltip
              content={<ChartTooltipContent hideIndicator hideLabel />}
              cursor={false}
            />
          </PieChart>
        </ChartContainer>
        <div className="-mt-36 flex flex-col items-center">
          <span className="text-h1 font-bold text-foreground">75%</span>
          <span className="text-body-sm text-muted-foreground">Velocidade</span>
        </div>
      </div>
    )
  },
}

export const SkillBarsExample: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <h2 className="text-h4 font-bold mb-4">Gráfico de Habilidades</h2>
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
                style={{
                  width: `${skill.level}%`,
                  backgroundColor: skill.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const StackedAreaExample: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <h2 className="text-h4 font-bold mb-4">Gráfico de Área Empilhada</h2>
      <ChartContainer config={chartConfig} className="min-h-64 w-full">
        <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
          <defs>
            <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-mobile)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-mobile)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="colorTablet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-tablet)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-tablet)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent payload={[]} />} />
          <Area
            dataKey="desktop"
            type="monotone"
            fill="url(#colorDesktop)"
            stroke="var(--color-desktop)"
            strokeWidth={2}
          />
          <Area
            dataKey="mobile"
            type="monotone"
            fill="url(#colorMobile)"
            stroke="var(--color-mobile)"
            strokeWidth={2}
          />
          <Area
            dataKey="tablet"
            type="monotone"
            fill="url(#colorTablet)"
            stroke="var(--color-tablet)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  ),
}

export const FunnelChartExample: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <h2 className="text-h4 font-bold mb-4">Gráfico de Funil</h2>
      <ChartContainer config={{}} className="min-h-64 w-full">
        <FunnelChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Funnel
            dataKey="value"
            data={funnelChartData}
            isAnimationActive
          >
            <LabelList
              position="right"
              fill="hsl(var(--foreground))"
              stroke="none"
              dataKey="name"
              className="text-body-sm"
            />
            <LabelList
              position="center"
              fill="#fff"
              stroke="none"
              dataKey="value"
              className="text-body-md font-bold"
            />
          </Funnel>
        </FunnelChart>
      </ChartContainer>
    </div>
  ),
}

export const PieChartWithLabels: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <h2 className="text-h4 font-bold mb-4">Gráfico de Pizza com Labels</h2>
      <ChartContainer config={pieConfig} className="mx-auto aspect-square max-h-80">
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={pieData}
            dataKey="visitors"
            nameKey="browser"
            cx="50%"
            cy="50%"
            outerRadius={80}
            strokeWidth={2}
            stroke="hsl(var(--background))"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {pieData.map((item) => (
          <div key={item.browser} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
            <span className="text-body-sm text-muted-foreground">{item.browser}</span>
          </div>
        ))}
      </div>
    </div>
  ),
}

export const LineChartWithArea: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <h2 className="text-h4 font-bold mb-4">Linha com Área de Fundo</h2>
      <ChartContainer config={chartConfig} className="min-h-64 w-full">
        <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
          <defs>
            <linearGradient id="colorDesktopFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent payload={[]} />} />
          <Area
            dataKey="desktop"
            type="monotone"
            fill="url(#colorDesktopFill)"
            stroke="var(--color-desktop)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  ),
}
