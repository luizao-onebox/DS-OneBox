---
title: Page Templates
description: Templates prontos para geração de páginas completas por IA
version: 1.0.0
updated: 2026-01-01
---

# Page Templates

Templates pré-prontos para IA gerar páginas completas. Cada template inclui a estrutura, componentes necessários e fluxo de dados.

## Template 1: Dashboard Page

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "ds-onebox"
import { ChartContainer } from "ds-onebox"
import { BarChart, LineChart, AreaChart } from "recharts"
import { Badge, Progress } from "ds-onebox"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink } from "ds-onebox"
import { Button } from "ds-onebox"
import { Plus } from "lucide-react"

interface DashboardPageProps {
  title: string
  kpis?: Array<{
    label: string
    value: string | number
    change?: { value: number; label: string }
  }>
  charts?: Array<{
    type: "bar" | "line" | "area"
    title: string
    description?: string
    data: any[]
    config: Record<string, { label: string; color: string }>
    dataKey: string
  }>
  breadcrumb?: Array<{ label: string; href?: string }>
}

export function DashboardPage({
  title,
  kpis = [],
  charts = [],
  breadcrumb = [],
}: DashboardPageProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          {breadcrumb.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumb.map((item, i) => (
                  <BreadcrumbItem key={i}>
                    {item.href ? (
                      <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}
          <h1 className="text-h2 mt-2">{title}</h1>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Relatório
        </Button>
      </div>

      {/* KPIs */}
      {kpis.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-body-sm font-medium">
                  {kpi.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-h2 font-bold">{kpi.value}</div>
                {kpi.change && (
                  <Badge
                    variant={kpi.change.value >= 0 ? "success" : "destructive"}
                    className="mt-2"
                  >
                    {kpi.change.value >= 0 ? "+" : ""}
                    {kpi.change.value}% {kpi.change.label}
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {charts.map((chart, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>{chart.title}</CardTitle>
              {chart.description && (
                <CardDescription>{chart.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={chart.config}
                className="min-h-72 w-full"
              >
                {chart.type === "bar" && (
                  <BarChart data={chart.data}>
                    <Bar dataKey={chart.dataKey} fill="var(--color-desktop)" />
                  </BarChart>
                )}
                {chart.type === "line" && (
                  <LineChart data={chart.data}>
                    <Line dataKey={chart.dataKey} stroke="var(--color-desktop)" />
                  </LineChart>
                )}
                {chart.type === "area" && (
                  <AreaChart data={chart.data}>
                    <Area dataKey={chart.dataKey} stroke="var(--color-desktop)" />
                  </AreaChart>
                )}
              </ChartContainer>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

## Template 2: CRUD List Page

```tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "ds-onebox"
import { Button } from "ds-onebox"
import { Input } from "ds-onebox"
import { Badge } from "ds-onebox"
import { DataTable, ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import { Plus, Search, MoreHorizontal } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "ds-onebox"

interface CRUDListPageProps<
  T extends { id: string | number; [key: string]: any }
> {
  title: string
  description?: string
  columns: ColumnDef<T>[]
  data: T[]
  onCreate?: () => void
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  createForm?: React.ReactNode
  renderActions?: (item: T) => React.ReactNode
}

export function CRUDListPage<T extends { id: string | number }>({
  title,
  description,
  columns,
  data,
  onEdit,
  onDelete,
  createForm,
  renderActions,
}: CRUDListPageProps<T>) {
  const [search, setSearch] = useState("")
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 })

  const filteredData = data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  )

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h2">{title}</h1>
          {description && (
            <p className="text-body-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {createForm && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar {title}</DialogTitle>
                <DialogDescription>Preencha os dados abaixo.</DialogDescription>
              </DialogHeader>
              {createForm}
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <DataTable
            table={table}
            columns={columns}
            onEdit={onEdit}
            onDelete={onDelete}
            renderActions={renderActions}
          />
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2">
        <span className="text-body-sm text-muted-foreground">
          Página {pagination.pageIndex + 1} de {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
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

## Template 3: Settings Page

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "ds-onebox"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "ds-onebox"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "ds-onebox"
import { Button } from "ds-onebox"
import { Input } from "ds-onebox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "ds-onebox"
import { toast } from "ds-onebox"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

interface SettingsPageProps {
  tabs: Array<{
    value: string
    label: string
    content: React.ReactNode
  }>
  defaultTab?: string
}

export function SettingsPage({ tabs, defaultTab }: SettingsPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h2">Configurações</h1>
        <p className="text-body-sm text-muted-foreground mt-1">
          Gerencie suas configurações de conta e preferências.
        </p>
      </div>

      <Tabs defaultValue={defaultTab || tabs[0]?.value} className="w-full">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

// Example: Account Settings Tab
const accountFormSchema = z.object({
  name: z.string().min(2, "Nome precisa de pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  role: z.string().min(1, "Selecione um cargo"),
})

interface AccountSettingsProps {
  initialData?: { name: string; email: string; role: string }
  onSave?: (data: z.infer<typeof accountFormSchema>) => Promise<void>
}

export function AccountSettings({ initialData, onSave }: AccountSettingsProps) {
  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: initialData || { name: "", email: "", role: "" },
  })

  async function handleSubmit(data: z.infer<typeof accountFormSchema>) {
    try {
      await onSave?.(data)
      toast.success("Configurações salvas!")
    } catch {
      toast.error("Erro ao salvar. Tente novamente.")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações da Conta</CardTitle>
        <CardDescription>
          Atualize suas informações pessoais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="user">Usuário</SelectItem>
                      <SelectItem value="guest">Convidado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
```

## Template 4: Empty State + Form

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "ds-onebox"
import { Button } from "ds-onebox"
import { Input } from "ds-onebox"
import { Plus, Users } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "ds-onebox"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "ds-onebox"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "ds-onebox"

const defaultSchema = z.object({
  name: z.string().min(2, "Nome precisa de pelo menos 2 caracteres"),
})

export function EmptyStateWithForm({
  title = "Nenhum item encontrado",
  description = "Comece adicionando o primeiro item.",
  buttonLabel = "Adicionar",
  schema = defaultSchema,
  onSubmit,
}: {
  title?: string
  description?: string
  buttonLabel?: string
  schema?: z.ZodSchema
  onSubmit?: (data: any) => Promise<void>
}) {
  const form = useForm({
    resolver: zodResolver(schema),
  })

  async function handleSubmit(data: any) {
    try {
      await onSubmit?.(data)
      toast.success(`${buttonLabel} criado com sucesso!`)
      form.reset()
    } catch {
      toast.error("Erro ao criar. Tente novamente.")
    }
  }

  return (
    <Card className="flex flex-col items-center justify-center py-12">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Users className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-h4 mb-2">{title}</h3>
      <p className="text-body-sm text-muted-foreground mb-6 max-w-sm text-center">
        {description}
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {buttonLabel}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{buttonLabel}</DialogTitle>
            <DialogDescription>Preencha os dados abaixo.</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do item" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Criando..." : buttonLabel}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
```

## Template 5: Timeline Activity Page

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "ds-onebox"
import { Timeline, TimelineItem } from "ds-onebox"
import { Avatar } from "ds-onebox"
import { Badge } from "ds-onebox"

interface Activity {
  id: string | number
  user: {
    name: string
    avatar?: string
  }
  action: string
  target: string
  time: string
  status?: "success" | "warning" | "destructive" | "info" | "secondary" | "default"
  metadata?: Record<string, string>
}

interface TimelineActivityPageProps {
  title?: string
  description?: string
  activities: Activity[]
  emptyMessage?: string
}

export function TimelineActivityPage({
  title = "Atividade Recente",
  description,
  activities,
  emptyMessage = "Nenhuma atividade encontrada.",
}: TimelineActivityPageProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-h2">{title}</h1>
        {description && (
          <p className="text-body-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <p className="text-body-sm text-muted-foreground text-center py-8">
              {emptyMessage}
            </p>
          ) : (
            <Timeline>
              {activities.map((activity) => (
                <TimelineItem
                  key={activity.id}
                  user={{
                    name: activity.user.name,
                    avatar: activity.user.avatar,
                  }}
                  time={activity.time}
                >
                  <div className="flex flex-col gap-1">
                    <div className="text-body-sm">
                      <span className="font-medium">{activity.user.name}</span>
                      {" "}{activity.action}{" "}
                      <span className="font-medium">{activity.target}</span>
                    </div>
                    {activity.status && (
                      <Badge variant={activity.status}>
                        {activity.status}
                      </Badge>
                    )}
                  </div>
                </TimelineItem>
              ))}
            </Timeline>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
```
