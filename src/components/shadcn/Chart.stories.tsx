import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, Cell, XAxis, YAxis } from "recharts"
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

export const BarChartExample: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Gráfico de Barras</h2>
      <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
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
      <h2 className="text-xl font-bold mb-4">Gráfico de Barras Horizontal</h2>
      <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
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
          <ChartLegend content={<ChartLegendContent />} />
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
      <h2 className="text-xl font-bold mb-4">Gráfico de Linhas</h2>
      <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
        <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
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
      <h2 className="text-xl font-bold mb-4">Gráfico de Área (Stacked)</h2>
      <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
        <AreaChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
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
      <h2 className="text-xl font-bold mb-4">Gráfico de Rosca (Donut)</h2>
      <ChartContainer config={pieConfig} className="mx-auto aspect-square max-h-[300px]">
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
        colorClass: "bg-emerald-500",
        description: "sobreposição entre referência e amostra",
      },
      {
        id: "unbalanced",
        label: "Desbalanceamento",
        value: 15.5,
        colorClass: "bg-amber-400",
        textClass: "text-amber-950",
        description: "IFs presentes com proporção incorreta",
      },
      {
        id: "missing",
        label: "IFs ausentes",
        value: 28.4,
        colorClass: "bg-red-500",
        description: "C6, Itaú Mercantil, Itaú Consignado",
      },
    ]

    return (
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Gráfico de Distribuição (Proporção)</h2>
        
        {/* Barra de Proporção */}
        <div className="flex h-8 w-full overflow-hidden rounded-md mb-4">
          {distributionData.map((item) => (
            <div
              key={item.id}
              style={{ width: `${item.value}%` }}
              className={`${item.colorClass} flex items-center justify-center text-xs font-bold transition-all hover:brightness-110 ${
                item.textClass || "text-white"
              }`}
            >
              {item.value}%
            </div>
          ))}
        </div>

        {/* Legenda */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm">
          {distributionData.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <div className={`h-3 w-3 shrink-0 rounded-[2px] ${item.colorClass}`} />
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
