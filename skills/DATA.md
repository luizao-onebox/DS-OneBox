---
title: Data Capabilities
description: Workflow para exibir dados tabulares, gráficos e timeline
version: 1.0.0
updated: 2026-01-01
---

# Data Capabilities

## Skill Overview

Esta skill cobre tudo relacionado a exibir dados: tabelas simples, tabelas avançadas, gráficos, timelines e listas virtuais. A escolha correta do componente depende da quantidade de dados e da complexidade de interação necessária.

## Decision Tree — Qual Componente Usar

```
Quantos dados você precisa exibir?
├── < 50 itens → Table simples
├── > 50 itens E precisa de sorting/filtering/pagination → DataTable (TanStack)
├── Milhares de itens (performance) → VirtualList
├── Precisa arrastar e reordernar → DragDrop
└── Dados são uma atividade (ações no tempo) → ActivityTimeline

Tipo de visualização?
├── Métricas/KPIs → Cards + Progress
├── Comparativo de categorias → BarChart
├── Tendência ao longo do tempo → LineChart ou AreaChart
├── Participação de mercado (porcentagem) → PieChart (Donut)
├── Comparativo multidimensional → RadarChart
├── Indicador de meta → GaugeChart
├── Funil de conversão → FunnelChart
└── Habilidades/Níveis → SkillBars (custom)
```

## Tables

### Table — Uso Simples

Para < 50 linhas, sem necessidade de sorting/filtering:

```typescript
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "ds-onebox"

const users = [
  { id: 1, name: "Ana", email: "ana@email.com", role: "Admin" },
  { id: 2, name: "Bruno", email: "bruno@email.com", role: "User" },
]

export function UserTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Cargo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <Badge variant="outline">{user.role}</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

### DataTable — Uso Avançado

Para > 50 linhas, ou quando precisar de sorting, filtering, ou seleção:

```typescript
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "ds-onebox"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useState } from "react"

const data = [...] // suas 1000+ linhas

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Cargo",
    cell: ({ row }) => (
      <Badge variant={row.getValue("role") === "admin" ? "default" : "secondary"}>
        {row.getValue("role")}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionMenu user={row.original} />,
  },
]

export function AdvancedUserTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Buscar por nome..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {Object.keys(rowSelection).length > 0 && (
          <Badge variant="secondary">
            {Object.keys(rowSelection).length} selecionado(s)
          </Badge>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <span className="text-body-sm text-muted-foreground">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  )
}
```

## Charts

### Regra de Ouro: Cores em HEX

**SEMPRE use valores HEX ou RGB no ChartConfig. NUNCA use `hsl(var(--xxx))`**.

```typescript
// ✅ CERTO
const chartConfig = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#10b981" },
}

// ❌ ERRADO — hsl(var()) não funciona em SVG
const chartConfig = {
  desktop: { label: "Desktop", color: "hsl(var(--primary))" },
}
```

### Regra de Ouro: Width/Height

O `ChartContainer` aceita props `width` e `height`. Use-as para garantir dimensões:

```typescript
// ✅ CERTO — dimensões explícitas
<ChartContainer config={config} width={500} height={300}>
  <BarChart data={data}>...</BarChart>
</ChartContainer>

// ✅ CERTO — responsivo via classe
<ChartContainer config={config} className="min-h-72 w-full">
  <BarChart data={data}>...</BarChart>
</ChartContainer>
```

### BarChart

```typescript
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "ds-onebox"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Fev", desktop: 305, mobile: 200 },
]

const config = {
  desktop: { label: "Desktop", color: "#2563eb" },
  mobile: { label: "Mobile", color: "#10b981" },
} satisfies ChartConfig

export function MonthlyBarChart() {
  return (
    <ChartContainer config={config} className="min-h-72 w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} tickMargin={10} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
```

### LineChart

```typescript
<ChartContainer config={config} className="min-h-72 w-full">
  <LineChart data={data} margin={{ left: 12, right: 12 }}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} />
    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
    <Line
      dataKey="desktop"
      type="monotone"
      stroke="var(--color-desktop)"
      strokeWidth={2}
      dot={false}
    />
    <Line
      dataKey="mobile"
      type="monotone"
      stroke="var(--color-mobile)"
      strokeWidth={2}
      dot={false}
    />
  </LineChart>
</ChartContainer>
```

### AreaChart

```typescript
<ChartContainer config={config} className="min-h-72 w-full">
  <AreaChart data={data} margin={{ left: 12, right: 12 }}>
    <defs>
      <linearGradient id="colorDesktopFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="var(--color-desktop)" stopOpacity={0.3} />
        <stop offset="95%" stopColor="var(--color-desktop)" stopOpacity={0} />
      </linearGradient>
    </defs>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" />
    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
    <Area
      dataKey="desktop"
      type="monotone"
      fill="url(#colorDesktopFill)"
      stroke="var(--color-desktop)"
      strokeWidth={2}
    />
  </AreaChart>
</ChartContainer>
```

### PieChart (Donut)

```typescript
const pieConfig = {
  visitors: { label: "Visitantes" },
} satisfies ChartConfig

const pieData = [
  { browser: "chrome", visitors: 275, fill: "#2563eb" },
  { browser: "safari", visitors: 200, fill: "#10b981" },
  { browser: "firefox", visitors: 187, fill: "#f59e0b" },
]

<ChartContainer config={pieConfig} className="mx-auto aspect-square max-h-64">
  <PieChart>
    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
    <Pie
      data={pieData}
      dataKey="visitors"
      nameKey="browser"
      innerRadius={60}
      strokeWidth={5}
    >
      {pieData.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry.fill} />
      ))}
    </Pie>
  </PieChart>
</ChartContainer>
```

### RadarChart

```typescript
const radarConfig = {
  A: { label: "Produto A", color: "#2563eb" },
  B: { label: "Produto B", color: "#10b981" },
} satisfies ChartConfig

const radarData = [
  { subject: "Velocidade", A: 120, B: 110, fullMark: 150 },
  { subject: "Confiabilidade", A: 98, B: 130, fullMark: 150 },
]

<ChartContainer config={radarConfig} className="min-h-72 w-full">
  <RadarChart data={radarData}>
    <PolarGrid stroke="hsl(var(--border))" />
    <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
    <PolarRadiusAxis angle={30} domain={[0, 150]} />
    <Radar name="Produto A" dataKey="A" stroke="var(--color-A)" fill="var(--color-A)" fillOpacity={0.3} />
    <Radar name="Produto B" dataKey="B" stroke="var(--color-B)" fill="var(--color-B)" fillOpacity={0.3} />
    <ChartLegend content={<ChartLegendContent />} />
    <ChartTooltip content={<ChartTooltipContent />} />
  </RadarChart>
</ChartContainer>
```

### GaugeChart

```typescript
export function GaugeChart({ value, label }: { value: number; label: string }) {
  return (
    <div className="relative w-full max-w-xs aspect-[2/1] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[200%]">
        <ChartContainer config={{}} className="aspect-square h-full w-full">
          <PieChart>
            <Pie
              data={[
                { name: "value", value },
                { name: "remain", value: 100 - value },
              ]}
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
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pb-2">
        <span className="text-h1 font-bold text-foreground leading-none">{value}%</span>
        <span className="text-body-sm text-muted-foreground mt-1">{label}</span>
      </div>
    </div>
  )
}
```

## ActivityTimeline

```typescript
import { Timeline, TimelineItem, Avatar, Badge } from "ds-onebox"

const activities = [
  {
    id: 1,
    user: { name: "Ana Silva", avatar: "/avatars/ana.png" },
    action: "criou",
    target: "Nova tarefa Q1-2026",
    time: "há 2 minutos",
    status: "success",
  },
  {
    id: 2,
    user: { name: "Bruno Costa", avatar: "/avatars/bruno.png" },
    action: "comentou em",
    target: "Relatório Mensal",
    time: "há 15 minutos",
    status: "info",
  },
]

export function ProjectTimeline() {
  return (
    <Timeline>
      {activities.map((activity) => (
        <TimelineItem
          key={activity.id}
          user={activity.user}
          time={activity.time}
        >
          <div className="flex flex-col gap-1">
            <div className="text-body-sm">
              <span className="font-medium">{activity.user.name}</span>
              {" "}{activity.action}{" "}
              <span className="font-medium">{activity.target}</span>
            </div>
            <Badge variant={activity.status === "success" ? "default" : "secondary"}>
              {activity.status}
            </Badge>
          </div>
        </TimelineItem>
      ))}
    </Timeline>
  )
}
```

## Antipatterns

### ❌ NÃO use Table para > 50 linhas sem DataTable
```typescript
// ERRADO — vai travar
{bigData.map(item => <TableRow key={item.id}>...</TableRow>)}
```

### ❌ NÃO use cores hsl em ChartConfig
```typescript
// ERRADO — gráfico não aparece
{ color: "hsl(var(--primary))" }

// CERTO
{ color: "#2563eb" }
```

### ❌ NÃO esqueça do ChartContainer
```typescript
// ERRADO — dimensions will be NaN
<BarChart data={data}><Bar dataKey="value" /></BarChart>

// CERTO
<ChartContainer config={config}>
  <BarChart data={data}><Bar dataKey="value" /></BarChart>
</ChartContainer>
```
