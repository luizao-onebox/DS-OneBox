---
title: Composition Guide
description: Árvores de decisão para escolher a composição certa de componentes
version: 1.0.0
updated: 2026-01-01
---

# Composition Guide

## Propósito

Este documento é uma árvore de decisão visual. Para cada necessidade de UI, ele mostra o caminho exato de componentes a compor. Use este guide para tomar decisões de arquitetura de interface rapidamente.

## Árvores de Decisão

---

### 1. Preciso de uma Página de Dashboard

```
Dashboard
├── Header?
│   └── Breadcrumb + Title + Actions (Button)
├── Filtros?
│   └── AdvancedFilter (Input + Select + DatePicker + Button)
├── KPIs / Métricas?
│   └── Card + Badge + Progress
├── Gráficos?
│   └── goto "Preciso de um Gráfico"
└── Tabela de Dados?
    └── goto "Preciso de uma Tabela"
```

**Composição típica de Dashboard:**

```typescript
export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Relatório
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-body-sm font-medium">Receita</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-h2 font-bold">R$ 45.231</div>
            <Badge variant="success" className="mt-2">+12.5%</Badge>
          </CardContent>
        </Card>
        {/* ... mais Cards de KPI */}
      </div>

      {/* Gráfico Principal */}
      <Card>
        <CardHeader>
          <CardTitle>Receita vs Despesas</CardTitle>
          <CardDescription>Últimos 6 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={revenueConfig} className="min-h-72 w-full">
            <AreaChart data={revenueData}>...</AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={transactions} />
        </CardContent>
      </Card>
    </div>
  )
}
```

---

### 2. Preciso de um Formulário

```
Formulário
├── Validação complexa (múltiplos campos, regras)?
│   └── Form + Zod + React Hook Form (OBRIGATÓRIO)
├── Apenas 1-2 campos simples?
│   └── Input isolado com onChange
├── Seleção (dropdown)?
│   └── Select ou Combobox
├── Data?
│   └── DatePicker
└── Submit?
    └── Button (type="submit") + toast (sucesso/erro)
```

**Composição típica de Form:**

```typescript
export function UserForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Criar Novo Usuário</CardTitle>
        <CardDescription>Preencha os dados abaixo</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl><Input placeholder="Seu nome" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            {/* ... mais campos */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                Cancelar
              </Button>
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

---

### 3. Preciso de uma Tabela

```
Tabela
├── > 50 linhas?
│   ├── SIM → DataTable (TanStack) + Pagination
│   └── NÃO → Table simples
├── Precisa de busca/filtro?
│   └── Input com getFilteredRowModel
├── Precisa de ordenação?
│   └── getSortedRowModel
├── Precisa de seleção (checkbox)?
│   └── rowSelection state
└── Precisa de ações por linha?
    └── ActionMenu (DropdownMenu ou ContextMenu)
```

---

### 4. Preciso de um Gráfico

```
Gráfico
├── Comparar valores absolutos (barras)?
│   └── BarChart
├── Mostrar tendência ao longo do tempo?
│   ├── Área preenchida → AreaChart
│   └── Apenas linha → LineChart
├── Mostrar partes de um todo (porcentagem)?
│   └── PieChart (Donut)
├── Comparar múltiplas métricas (radar)?
│   └── RadarChart
├── Mostrar indicador de meta?
│   └── GaugeChart
├── Mostrar funil de conversão?
│   └── FunnelChart
└── Mostrar habilidades/níveis?
    └── SkillBars (custom com Progress)
```

---

### 5. Preciso de Navegação

```
Navegação Principal
├── Sidebar fixa?
│   └── Sidebar + SidebarProvider
├── Tabs (seções na mesma página)?
│   └── Tabs + TabsList + TabsContent
├── Breadcrumb (localização)?
│   └── Breadcrumb + BreadcrumbList + BreadcrumbItem
└── Paginação?
    └── Pagination + PaginationItem
```

**Sidebar típica:**

```typescript
// No root da app
<SidebarProvider>
  <div className="flex h-screen overflow-hidden">
    <Sidebar>
      <SidebarHeader>
        <Logo theme="light" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
    <main className="flex-1 overflow-y-auto">
      {/* Conteúdo da página */}
    </main>
  </div>
</SidebarProvider>
```

---

### 6. Preciso de Modais/Dialogs

```
Modal/Dialog
├── Confirmar ação (OK/Cancelar)?
│   └── AlertDialog
├── Formulário dentro?
│   └── Dialog + Form
├── Informação detalhada?
│   └── Dialog + ScrollArea
└── Painel lateral?
    └── Drawer (não Dialog)
```

**AlertDialog típico:**

```typescript
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Excluir</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
      <AlertDialogDescription>
        Esta ação não pode ser desfeita. O usuário será permanentemente removido.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>
        Excluir
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

### 7. Preciso de Notificações/Feedback

```
Feedback ao Usuário
├── Toast (breve, não bloqueia)?
│   └── toast() — use toast.success(), toast.error(), toast()
├── Alert (destacado, permanece)?
│   └── Alert + AlertTitle + AlertDescription
├── Progress (operação longa)?
│   └── Progress ou AlertDialog com estado
└── Skeleton (carregamento)?
    └── Skeleton em vez de Spinner para conteúdo
```

---

## Composições Validadas

### Página de Settings com Tabs

```typescript
export function SettingsPage() {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList>
        <TabsTrigger value="account">Conta</TabsTrigger>
        <TabsTrigger value="notifications">Notificações</TabsTrigger>
        <TabsTrigger value="security">Segurança</TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Informações da Conta</CardTitle>
            <CardDescription>Atualize suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent>
            <UserForm />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationSettings />
      </TabsContent>

      <TabsContent value="security">
        <SecuritySettings />
      </TabsContent>
    </Tabs>
  )
}
```

### Timeline de Projeto

```typescript
export function ProjectActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Atividade Recente</CardTitle>
      </CardHeader>
      <CardContent>
        <ActivityTimeline>
          {activities.map((activity) => (
            <TimelineItem
              key={activity.id}
              user={activity.user}
              time={activity.time}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-body-sm">
                    <span className="font-medium">{activity.user.name}</span>
                    {" "}{activity.action}
                  </p>
                  <p className="text-muted-foreground">{activity.description}</p>
                </div>
                <Badge variant={activity.status === "completed" ? "success" : "secondary"}>
                  {activity.status}
                </Badge>
              </div>
            </TimelineItem>
          ))}
        </ActivityTimeline>
      </CardContent>
    </Card>
  )
}
```

### DataTable com CommandPalette

```typescript
export function UserManagementPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center gap-4">
        <Input
          placeholder="Buscar usuários..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <CommandPalette
          data={users}
          onSelect={(user) => setSelectedUser(user)}
        />
      </div>

      {/* DataTable */}
      <DataTable columns={columns} data={users} />

      {/* Dialog de detalhes */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedUser?.name}</DialogTitle>
          </DialogHeader>
          <UserDetails user={selectedUser} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
```

## Antipatterns de Composição

### ❌ NÃO use Dialog dentro de Dialog
```typescript
// ERRADO — Dialog aninhado é confuso
<Dialog>
  <DialogContent>
    <Dialog>
      <DialogContent>...</DialogContent>
    </Dialog>
  </DialogContent>
</Dialog>

// CERTO — use Drawer ou Tabs para conteúdo adicional
```

### ❌ NÃO use Accordion dentro de Accordion (mais de 2 níveis)
```typescript
// ERRADO — 3 níveis de accordion é confuso
<Accordion>
  <AccordionItem>
    <AccordionTrigger>...</AccordionTrigger>
    <AccordionContent>
      <Accordion>
        <AccordionItem>
          <AccordionTrigger>...</AccordionTrigger>
          <AccordionContent>...</AccordionContent>
        </AccordionItem>
      </Accordion>
    </AccordionContent>
  </AccordionItem>
</Accordion>

// CERTO — máximo 2 níveis, use Tabs para mais
```

### ❌ NÃO use Table dentro de Card sem Padding
```typescript
// ERRADO — tabela encostada na borda
<Card>
  <Table>...</Table>
</Card>

// CERTO — use CardContent como wrapper
<Card>
  <CardHeader>...</CardHeader>
  <CardContent>
    <Table>...</Table>
  </CardContent>
</Card>
```

### ❌ NÃO misture Badge variants sem propósito
```typescript
// ERRADO — badge colorido sem significado
<Badge variant="success">Pendente</Badge>
<Badge variant="destructive">Ativo</Badge>

// CERTO — cor comunica significado
<Badge variant="secondary">Pendente</Badge>
<Badge variant="success">Ativo</Badge>
<Badge variant="destructive">Erro</Badge>
```

## Checklist Antes de Publicar

- [ ] Todos os Forms usam Zod + RHF?
- [ ] Todos os Charts têm ChartConfig com cores HEX?
- [ ] Tabelas > 50 linhas usam DataTable?
- [ ] AccordionTrigger com elementos interativos usa `interactiveContent`?
- [ ] Todos os Dialogs estão dentro de um DialogProvider?
- [ ] Sidebar CSS é importado ANTES do SidebarProvider?
- [ ] Toasts são mostrados após submit?
- [ ] Loading states estão implementados?
- [ ] Error states estão implementados?
