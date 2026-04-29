import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { DataCard } from "./DataCard"

const meta = {
  title: "Blocks/DataCard",
  component: DataCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Um cartão padronizado para exibir resumos de entidades como Usuários, Clientes, Empresas ou Documentos.

## Casos de Uso
- **Diretório de Clientes**: Uma grade mostrando todos os clientes da base.
- **Painel de Detalhes**: Um card fixo na tela de perfil do usuário.
- **Visualização Rápida**: Para apresentar metadados extraídos de um documento.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: "w-[400px]",
    title: "Acme Corporation",
    subtitle: "CNPJ: 00.000.000/0001-00",
    initials: "AC",
    status: {
      label: "Cliente Ativo",
      variant: "default",
    },
    tags: ["B2B", "Tecnologia", "VIP"],
    metadata: [
      { label: "Plano", value: "Enterprise" },
      { label: "Vencimento Contrato", value: "12/12/2026" },
      { label: "MRR", value: "R$ 15.000,00" },
      { label: "SLA", value: "99.9%" },
    ],
    onEdit: () => console.log("Edit clicked"),
    onDelete: () => console.log("Delete clicked"),
  },
}

export const UserProfile: Story = {
  args: {
    className: "w-[350px]",
    title: "Rodrigo Silva",
    subtitle: "rodrigo.silva@onebox.com",
    avatarUrl: "https://i.pravatar.cc/150?u=rodrigo",
    initials: "RS",
    status: {
      label: "Afastado",
      variant: "destructive",
    },
    metadata: [
      { label: "Cargo", value: "Engenheiro de Software Sênior" },
      { label: "Departamento", value: "Engenharia" },
      { label: "Admissão", value: "15/03/2020" },
    ],
  },
}

export const Simple: Story = {
  args: {
    className: "w-[300px]",
    title: "Projeto Apollo",
    subtitle: "Iniciativa de Refatoração",
    initials: "PA",
    tags: ["Desenvolvimento", "Prioridade Alta"],
  },
}
