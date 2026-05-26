---
title: DS-OneBox Skills Resolver
description: Roteador de tarefas que indica qual skill/component usar para cada necessidade
version: 1.0.0
updated: 2026-01-01
---

# DS-OneBox Skills Resolver

## Propósito

Este documento é o roteador central. Para qualquer tarefa de UI, ele aponta qual capability ou componente usar. Quando a IA receber uma instrução como "criar um formulário de login" ou "mostrar dados em tabela", ela deve consultar este resolver ANTES de começar a codificar.

## Fluxo de Decisão Principal

```
1. Qual o objetivo principal?
├── Mostrar informações ao usuário → goto FEEDBACK
├── Coletar dados do usuário → goto FORMS
├── Exibir dados tabulares → goto DATA
├── Organizar layout da página → goto LAYOUT
├── Navegar entre telas/seções → goto NAVIGATION
├── Compor múltiplas informações → goto COMPOSITION
└── Desbloquear/interagir com sistema → goto INTERACTION
```

## Detalhamento por Categoria

### FEEDBACK — Comunicar estado ao usuário

| Task | Solução | Componentes |
|---|---|---|
| Notificação breve (sucesso, erro, info) | Toast | ToastProvider, toast() |
| Mensagem destacada (alerta, warning) | Alert | Alert, AlertTitle, AlertDescription |
| Indicador de status (badge, tag) | Badge | Badge (variants: default, success, warning, destructive) |
| Progresso de operação (barra, circular) | Progress | Progress |
| Skeleton loading (carregamento) | Skeleton | Skeleton |

### FORMS — Coletar e validar dados

| Task | Solução | Componentes |
|---|---|---|
| Formulário com validação | Form + Zod + React Hook Form | Form, FormField, FormItem, FormLabel, FormControl, FormMessage |
| Input de texto | Input | Input (variants: default, file, floating-label) |
| Checkbox | Checkbox | Checkbox |
| Radio group | RadioGroup | RadioGroup, RadioGroupItem |
| Toggle/Switch | Switch | Switch |
| Slider/Range | Slider | Slider |
| Select/Dropdown | Select | Select, SelectTrigger, SelectContent, SelectItem, SelectValue |
| Date picker | DatePicker | DatePicker (react-day-picker v9 com custom Dropdown) |
| Combobox (busca + select) | Combobox | Combobox, ComboboxItem |
| Input de senha com força | PasswordStrength | PasswordStrength |
| Input OTP (código) | OTPInput | OTPInput |

### DATA — Exibir e gerenciar dados

| Task | Solução | Componentes |
|---|---|---|
| Tabela simples (< 50 linhas) | Table | Table, TableHeader, TableBody, TableRow, TableHead, TableCell |
| Tabela avançada (> 50 linhas, sorting, filtering, pagination) | DataTable | DataTable com TanStack Table + ColumnDef |
| Timeline de atividades | ActivityTimeline | Timeline, TimelineItem |
| Grupo de avatares | AvatarGroup | Avatar, AvatarGroup |
| Gráfico de barras | BarChart | ChartContainer + Recharts BarChart |
| Gráfico de linhas | LineChart | ChartContainer + Recharts LineChart |
| Gráfico de área | AreaChart | ChartContainer + Recharts AreaChart |
| Gráfico de rosca | PieChart | ChartContainer + Recharts PieChart |
| Gráfico radar (aranha) | RadarChart | ChartContainer + Recharts RadarChart |
| Gráfico de gauge | GaugeChart | ChartContainer + PieChart (half circle) |
| Gráfico de funil | FunnelChart | ChartContainer + Recharts FunnelChart |
| Skill bars (progresso) | SkillBars | custom div com bg-muted + div animado |
| Lista virtual (milhares de itens) | VirtualList | VirtualList |
| Drag and drop | DragDrop | DragDrop, DragDropItem (react-beautiful-dnd) |

### LAYOUT — Organizar estrutura da página

| Task | Solução | Componentes |
|---|---|---|
| Container principal | Container | Container (layout primitive) |
| Grid responsivo | Grid | Grid, GridItem |
| Flex container | Flex | Flex, FlexItem |
| Seção com padding | Section | Section |
| Card | Card | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter |
| Modal/Dialog | Dialog | Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription |
| Drawer (painel lateral) | Drawer | Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerFooter |
| Sidebar de navegação | Sidebar | Sidebar, SidebarProvider, SidebarTrigger, SidebarContent, SidebarGroup, SidebarMenu |
| Popover | Popover | Popover, PopoverTrigger, PopoverContent |
| Tooltip | Tooltip | Tooltip, TooltipTrigger, TooltipContent |
| Hover card | HoverCard | HoverCard, HoverCardTrigger, HoverCardContent |
| Tabs | Tabs | Tabs, TabsList, TabsTrigger, TabsContent |
| Accordion (retrátil) | Accordion | Accordion, AccordionItem, AccordionTrigger, AccordionContent |
| Separator | Separator | Separator |
| Aspect ratio | AspectRatio | AspectRatio |
| Scroll area | ScrollArea | ScrollArea, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb |

### NAVIGATION — Mover entre telas/seções

| Task | Solução | Componentes |
|---|---|---|
| Navegação principal com submenus | NavigationMenu | NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink |
| Breadcrumb | Breadcrumb | Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator |
| Paginação | Pagination | Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis |
| Link | Link | link (shadcn/ui) |
| Context menu (botão direito) | ContextMenu | ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuLabel, ContextMenuSeparator |
| Command palette (Ctrl+K) | CommandPalette | CommandPalette, CommandInput, CommandList, CommandGroup, CommandItem |

### COMPOSITION — Combinar múltiplas capacidades

| Task | Solução | Componentes |
|---|---|---|
| Dashboard com charts | DashboardCharts | DashboardCharts (compose: Card + ChartContainer + Recharts) |
| Bloco de filtro avançado | AdvancedFilter | AdvancedFilter (compose: Input + Select + DatePicker + Button) |
| Timeline de projeto | ActivityTimeline | Timeline + AvatarGroup + Badge |
| Lista com ações em batch | DataTable + Switch/Checkbox | DataTable com seleção + CommandPalette |
| Página de detalhes | Card + Accordion + Tabs | Composition de Layout + Data |

### INTERACTION — Desbloquear e操纵 sistema

| Task | Solução | Componentes |
|---|---|---|
| Toast com ação | toast() com onClick | toast("Mensagem", { action: { onClick: fn } }) |
| Toasts em múltiplas posições | ToastMultiPosition | ToastProvider, toast() com position prop |
| Copiar para clipboard | useClipboard hook | custom hook |
| Hotkey global | CommandPalette | CommandPalette com shortcuts |

## Regras de Composição Obrigatórias

### 1. Forms sempre em trio
Todo formulário deve usar a tríade:
```
Form + zod schema + react-hook-form
```
Nunca use Input isolado. Nunca use validação manual. Sempre use o padrão do DS-OneBox.

### 2. Charts precisam de 3 coisas
Todo gráfico deve ter:
```
ChartContainer + ChartConfig (cores HEX) + Recharts component
```
Nunca use `hsl(var(--xxx))` nas cores do config. Sempre HEX ou RGB.

### 3. Tables têm threshold
```
< 50 linhas → Table simples
> 50 linhas → DataTable (TanStack)
```

### 4. Accordion com elementos interativos
Para colocar Switch/Button dentro de AccordionTrigger:
```
<AccordionTrigger interactiveContent>
```
Isso evita button dentro de button.

### 5. Dialog precisa de provider
Todo Dialog deve estar dentro de um DialogProvider no root da aplicação.

### 6. Sidebar requer setup específico
Sidebar precisa que o CSS global do DS seja importado ANTES do SidebarProvider. E o `#root` (flex-direction: column) deve ser resetado.

## Como Usar Este Resolver

1. **Receba uma tarefa**: "criar página de settings com forms e tabela"
2. **Identifique as sub-tarefas**: "forms" (FORMS) + "tabela" (DATA)
3. **Consulte a tabela correspondente**: encontre a solução exata
4. **Aplique as regras de composição**: verifique obrigatoriedades
5. **Implemente**: use os componentes listados

## Limites de Cada Componente

| Componente | Não fazer |
|---|---|
| Table | Não use para > 50 linhas |
| Toast | Não abuse — máximo 3 simultâneos |
| Dialog | Não aninhe — máximo 1 por vez |
| Accordion | Não aninhe — máximo 2 níveis |
| Tabs | Não use para > 7 abas |
| Tooltip | Não use para conteúdo longo (> 50 chars) |

## Atualização

Este resolver é versionado junto com o DS-OneBox. Quando um novo componente for adicionado, esta tabela deve ser atualizada primeiro.
