import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { DataTable } from "./DataTable"
import { Button } from "../shadcn/Button"
import { Checkbox } from "../shadcn/Checkbox"
import { Badge } from "../shadcn/Badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/DropdownMenu"

// --- DADOS FALSOS (Mock) ---
type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
  clientName: string
}

const mockData: Payment[] = [
  { id: "m5gr84i9", amount: 316, status: "success", email: "ken99@yahoo.com", clientName: "Ken Adams" },
  { id: "3u1reuv4", amount: 242, status: "success", email: "Abe45@gmail.com", clientName: "Abe Lincoln" },
  { id: "derv1ws0", amount: 837, status: "processing", email: "Monserrat44@gmail.com", clientName: "Monserrat P." },
  { id: "5kma53ae", amount: 874, status: "success", email: "Silas22@gmail.com", clientName: "Silas K." },
  { id: "bhqecj4p", amount: 721, status: "failed", email: "carmella@hotmail.com", clientName: "Carmella R." },
  { id: "w9x87t0o", amount: 450, status: "pending", email: "john.doe@example.com", clientName: "John Doe" },
  { id: "x2c9v8b1", amount: 1500, status: "success", email: "jane.smith@enterprise.com", clientName: "Jane Smith" },
  { id: "a1b2c3d4", amount: 55, status: "failed", email: "test.user@domain.net", clientName: "Test User" },
  { id: "e5f6g7h8", amount: 999, status: "processing", email: "admin@system.io", clientName: "Admin System" },
  { id: "i9j0k1l2", amount: 200, status: "success", email: "customer@shop.com", clientName: "Customer Shop" },
]

// --- DEFINIÇÃO DAS COLUNAS ---
const columns: ColumnDef<Payment>[] = [
  // 1. Coluna de Checkbox (Seleção em massa)
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // 2. Coluna de Status (Com Badge customizado)
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      
      const variantMap: Record<string, "success" | "warning" | "destructive" | "secondary"> = {
        success: "success",
        processing: "warning",
        failed: "destructive",
        pending: "secondary"
      }

      return <Badge variant={variantMap[status] || "default"} className="capitalize">{status}</Badge>
    },
  },
  // 3. Coluna de Email (Com Ordenação)
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  // 4. Coluna de Cliente
  {
    accessorKey: "clientName",
    header: "Cliente",
    cell: ({ row }) => <div className="font-medium">{row.getValue("clientName")}</div>,
  },
  // 5. Coluna de Valor (Formatado como Moeda e Alinhado à Direita)
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Valor Pago</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  // 6. Coluna de Ações (Dropdown Menu)
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copiar ID do Pagamento
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Ver cliente</DropdownMenuItem>
            <DropdownMenuItem>Ver detalhes do pagamento</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// --- CONFIGURAÇÃO STORYBOOK ---
const meta = {
  title: "Blocks/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Bloco avançado de Data Grid construído com @tanstack/react-table. Suporta paginação, filtros globais, ordenação de colunas e seleção em massa (checkbox).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    data: {
      description: "Array de objetos contendo os dados da tabela.",
    },
    columns: {
      description: "Definição de colunas no padrão TanStack Table.",
    },
    searchKey: {
      description: "Chave do objeto de dados usada para realizar a busca no input superior.",
      control: "text",
    },
    searchPlaceholder: {
      description: "Texto placeholder do input de busca.",
      control: "text",
    },
  },
} satisfies Meta<typeof DataTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: mockData,
    columns: columns as any, // Bypass TS type for generic props in Storybook
    searchKey: "email",
    searchPlaceholder: "Filtrar e-mails...",
  },
  render: (args) => (
    <div className="w-full">
      <DataTable {...args} />
    </div>
  ),
}

export const WithoutSearchAndPagination: Story = {
  args: {
    data: mockData.slice(0, 3), // Mostra apenas 3 itens para não ativar a paginação
    columns: columns as any,
  },
  render: (args) => (
    <div className="w-full">
      <DataTable {...args} />
    </div>
  ),
}
