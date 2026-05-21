// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { DataGrid as Table, Column } from "./Table"
import { Badge } from "./Badge"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"

interface User {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  avatar?: string
}

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Tabela de dados com ordenação, filtragem, paginação e seleção.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

const users: User[] = [
  { id: "1", name: "Ana Costa", email: "ana.costa@empresa.com", role: "Admin", status: "active" },
  { id: "2", name: "Bruno Silva", email: "bruno.silva@empresa.com", role: "Editor", status: "active" },
  { id: "3", name: "Carla Mendes", email: "carla.mendes@empresa.com", role: "Viewer", status: "pending" },
  { id: "4", name: "Diego Rocha", email: "diego.rocha@empresa.com", role: "Admin", status: "inactive" },
  { id: "5", name: "Elena Ferreira", email: "elena.ferreira@empresa.com", role: "Editor", status: "active" },
  { id: "6", name: "Fernando Lima", email: "fernando.lima@empresa.com", role: "Viewer", status: "active" },
  { id: "7", name: "Gabriela Alves", email: "gabriela.alves@empresa.com", role: "Editor", status: "pending" },
  { id: "8", name: "Hugo Santos", email: "hugo.santos@empresa.com", role: "Viewer", status: "active" },
  { id: "9", name: "Isabela Nunes", email: "isabela.nunes@empresa.com", role: "Admin", status: "active" },
  { id: "10", name: "João Pereira", email: "joao.pereira@empresa.com", role: "Editor", status: "inactive" },
  { id: "11", name: "Karen Oliveira", email: "karen.oliveira@empresa.com", role: "Viewer", status: "active" },
  { id: "12", name: "Lucas Martins", email: "lucas.martins@empresa.com", role: "Editor", status: "active" },
]

const columns: Column<User>[] = [
  {
    key: "name",
    header: "Nome",
    accessor: (user) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback>{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
        </Avatar>
        <span className="font-medium">{user.name}</span>
      </div>
    ),
    sortable: true,
    filterable: true,
  },
  {
    key: "email",
    header: "Email",
    accessor: (user) => <span className="text-muted-foreground">{user.email}</span>,
    sortable: true,
    filterable: true,
  },
  {
    key: "role",
    header: "Função",
    accessor: (user) => (
      <Badge variant="soft" color={user.role === "Admin" ? "primary" : user.role === "Editor" ? "info" : "neutral"}>
        {user.role}
      </Badge>
    ),
    sortable: true,
  },
  {
    key: "status",
    header: "Status",
    accessor: (user) => (
      <Badge
        variant="soft"
        color={
          user.status === "active" ? "success" :
          user.status === "pending" ? "warning" : "neutral"
        }
      >
        {user.status === "active" ? "Ativo" : user.status === "pending" ? "Pendente" : "Inativo"}
      </Badge>
    ),
    sortable: true,
  },
]

export const Default: Story = {
  render: () => <Table columns={columns} data={users} />,
}

export const WithSorting: Story = {
  render: () => <Table columns={columns} data={users} sortable />,
}

export const WithFiltering: Story = {
  render: () => <Table columns={columns} data={users} filterable sortable />,
}

export const WithPagination: Story = {
  render: () => <Table columns={columns} data={users} paginated pageSize={5} />,
}

export const WithSelection: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(new Set())
    return (
      <div className="space-y-4">
        <p className="text-body-sm text-muted-foreground">
          {selected.size} item(s) selecionado(s)
        </p>
        <Table
          columns={columns}
          data={users}
          selectable
          selectedRows={selected}
          onSelectionChange={setSelected}
        />
      </div>
    )
  },
}

export const Complete: Story = {
  render: () => {
    const [selected, setSelected] = useState<Set<string>>(new Set())
    return (
      <Table
        columns={columns}
        data={users}
        selectable
        selectedRows={selected}
        onSelectionChange={setSelected}
        sortable
        filterable
        paginated
        pageSize={5}
      />
    )
  },
}

export const Loading: Story = {
  render: () => <Table columns={columns} data={[]} loading />,
}

export const Empty: Story = {
  render: () => (
    <Table
      columns={columns}
      data={[]}
      emptyMessage="Nenhum usuário encontrado"
    />
  ),
}
