---
title: Layout Capabilities
description: Workflow para organizar estrutura de páginas com Sidebar, Dialog, Tabs, Accordion
version: 1.0.0
updated: 2026-01-01
---

# Layout Capabilities

## Skill Overview

Esta skill cobre tudo relacionado a organizar a estrutura visual da página: containers, grids, modais, drawers, sidebars, tabs e accordions. Layout é a espinha dorsal de qualquer aplicação — um layout bem feito é invisível, um mau layout é sentido em cada clique.

## Sidebar — Navegação Lateral

### Setup Obrigatório

A Sidebar requer configuração específica no root da aplicação. IGNORE esta seção se não estiver usando Sidebar.

```typescript
// 1. No seu entry point (main.tsx / App.tsx):
// O CSS global do DS-OneBox deve vir PRIMEIRO
import "ds-onebox/dist/style.css"

// 2. Reset do #root — o DS força flex-direction: column
// No seu CSS global, faça:
#root {
  flex-direction: unset !important;
}

// 3. Estrutura DOM — Sidebar e main DEVEM ser irmãos
// NUNCA envolva em divs extras
```

### Estrutura Correta

```typescript
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarMenu } from "ds-onebox"

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar>
          <SidebarHeader>
            <Logo theme="light" />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navegação</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive>
                    <Link to="/dashboard">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link to="/users">
                      <Users className="h-4 w-4" />
                      Usuários
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* main É IRMÃO de Sidebar, não filho */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
```

### Antipatterns da Sidebar

```typescript
// ❌ ERRADO — div encapsulando Sidebar e main
<div>
  <Sidebar>...</Sidebar>
  <main>...</main>
</div>

// ❌ ERRADO — min-h-screen no body causa scroll duplo
<body className="min-h-screen">
  <SidebarProvider>
    <Sidebar />
    <main />
  </SidebarProvider>
</body>

// ✅ CERTO
<body>
  <SidebarProvider>
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto" />
    </div>
  </SidebarProvider>
</body>
```

## Dialog — Modal

### Setup Obrigatório

Todo Dialog precisa estar dentro de um DialogProvider. Adicione no root da aplicação:

```typescript
import { DialogProvider } from "ds-onebox"

export function App() {
  return (
    <DialogProvider>
      <SidebarProvider>
        {/* ... resto da app */}
      </SidebarProvider>
    </DialogProvider>
  )
}
```

### Dialog Simples

```typescript
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "ds-onebox"

export function UserDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Editar Usuário</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Usuário</DialogTitle>
          <DialogDescription>
            Faça as alterações necessárias e clique em salvar.
          </DialogDescription>
        </DialogHeader>

        <UserForm />

        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogTrigger>
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

### AlertDialog — Confirmação

Use AlertDialog para confirmações destrutivas:

```typescript
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "ds-onebox"

export function DeleteUserButton({ userId }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="mr-2 h-4 w-4" />
          Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza absoluta?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. O usuário será
            permanentemente removido do sistema e todos os seus dados
            serão excluídos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteUser(userId)}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Sim, excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
```

## Drawer — Painel Lateral

Drawer é preferable a Dialog quando o conteúdo é extenso ou quando você quer manter o contexto da página visível:

```typescript
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "ds-onebox"

export function FilterDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filtros
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filtros Avançados</DrawerTitle>
          <DrawerDescription>
            Refine sua busca usando os filtros abaixo.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 space-y-6">
          <FilterForm />
        </div>

        <DrawerFooter>
          <Button>Aplicar Filtros</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
```

## Tabs — Navegação por Abas

Use Tabs para dividir conteúdo relacionado em seções na mesma página:

```typescript
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "ds-onebox"

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
          </CardHeader>
          <CardContent>
            <AccountForm />
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

### Limite de Tabs

**MÁXIMO 7 tabs**. Se precisar de mais, use Tabs aninhados ou uma Sidebar/NavigationMenu.

```typescript
// ❌ ERRADO — 10 tabs é confuso
<TabsList>
  <TabsTrigger value="1">Tab 1</TabsTrigger>
  <TabsTrigger value="2">Tab 2</TabsTrigger>
  {/* ... 8 mais */}
</TabsList>

// ✅ CERTO —分组 com Tabs aninhados ou NavigationMenu
```

## Accordion — Conteúdo Retrátil

Use Accordion para FAQs, detalhes expandíveis, ou configurações:

```typescript
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "ds-onebox"

export function FAQ() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Como funciona o pagamento?</AccordionTrigger>
        <AccordionContent>
          O pagamento é processado através do Stripe. Aceitamos cartões de
          crédito, débito e PIX. O valor é cobrado automaticamente
          no dia do vencimento da sua assinatura.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Posso cancelar a qualquer momento?</AccordionTrigger>
        <AccordionContent>
          Sim! Você pode cancelar sua assinatura a qualquer momento
          diretamente nas configurações da sua conta. Não há multas
          ou taxas de cancelamento.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
```

### Accordion com Elementos Interativos

Se precisar colocar Switch, Button ou outros elementos interativos DENTRO do AccordionTrigger, use a prop `interactiveContent`:

```typescript
// ❌ ERRADO — button dentro de button
<AccordionTrigger>
  <Switch checked={enabled} />
  Notificação de Email
</AccordionTrigger>

// ✅ CERTO — interactiveContent substitui o button nativo por div
<AccordionTrigger interactiveContent>
  <Flex align="center" justify="between" className="w-full">
    <span>Notificação de Email</span>
    <Switch checked={enabled} onCheckedChange={setEnabled} />
  </Flex>
</AccordionTrigger>
```

### Limite de Accordion

**MÁXIMO 2 níveis de aninhamento**. 3 níveis é confuso e inacessível.

```typescript
// ❌ ERRADO — 3 níveis de accordion
<Accordion>
  <AccordionItem>
    <AccordionTrigger>Nível 1</AccordionTrigger>
    <AccordionContent>
      <Accordion>
        {/* Nível 2 */}
        <AccordionItem>
          <AccordionTrigger>Nível 2</AccordionTrigger>
          <AccordionContent>
            <Accordion>
              {/* Nível 3 — MUITO CONFUSO */}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </AccordionContent>
  </AccordionItem>
</Accordion>

// ✅ CERTO — máximo 2 níveis, depois use Tabs
```

## NavigationMenu — Menu de Navegação

Para navegação principal com dropdowns e submenus:

```typescript
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "ds-onebox"

export function Header() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/dashboard" legacyBehavior passHref>
            <NavigationMenuLink>
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/products" legacyBehavior passHref>
            <NavigationMenuLink>
              Produtos
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
```

## Breadcrumb — Migalha de Pão

```typescript
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "ds-onebox"

export function PageBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/products">Produtos</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <span className="text-foreground">Detalhes</span>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
```

## Antipatterns de Layout

### ❌ NÃO aninhe Dialogs

```typescript
// ERRADO
<Dialog>
  <DialogContent>
    <Dialog>
      <DialogContent>...</DialogContent>
    </Dialog>
  </DialogContent>
</Dialog>

// CERTO — use Drawer para o segundo nível
```

### ❌ NÃO use w-full h-screen no body

```typescript
// ERRADO — causa scroll duplo com Sidebar
<body className="w-full h-screen">
  <SidebarProvider>...</SidebarProvider>
</body>

// CERTO — overflow-hidden no container
<body>
  <SidebarProvider>
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main />
    </div>
  </SidebarProvider>
</body>
```

### ❌ NÃO use padding inconsistente

```typescript
// ERRADO — padding direto no Card sem CardContent
<Card className="p-6">
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

## Composição Típica de Página

```typescript
export function UserManagementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-h2">Gerenciar Usuários</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>Usuários</BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <UserDialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Novo Usuário</Button>
          </DialogTrigger>
        </UserDialog>
      </div>

      {/* Filtros */}
      <AdvancedFilter />

      {/* Tabela */}
      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={users} />
        </CardContent>
      </Card>

      {/* Paginação */}
      <Pagination>...</Pagination>
    </div>
  )
}
```
