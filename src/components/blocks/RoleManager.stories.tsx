import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { RoleManager, Permission } from "./RoleManager"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/Card"

const meta = {
  title: "Blocks/RoleManager",
  component: RoleManager,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Um gerenciador de permissões (Role-Based Access Control) interativo usando tabelas e checkboxes.

## Casos de Uso
- **Configurações de Usuário**: Tela onde o Admin escolhe quais módulos o usuário logado tem acesso.
- **Grupos de Acesso**: Criação de perfis como "Visualizador", "Editor", "Administrador".
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RoleManager>

export default meta
type Story = StoryObj<typeof meta>

const initialPermissions: Permission[] = [
  { id: "1", name: "Usuários", description: "Gerenciamento de contas e acessos", read: true, write: false, delete: false },
  { id: "2", name: "Documentos", description: "Central de análise e desambiguação", read: true, write: true, delete: false },
  { id: "3", name: "Faturamento", description: "Invoices e métodos de pagamento", read: false, write: false, delete: false },
  { id: "4", name: "Configurações Gerais", description: "Regras de negócio e webhooks", read: true, write: true, delete: true },
]

export const Default: Story = {
  render: () => {
    const [permissions, setPermissions] = React.useState(initialPermissions)

    const handlePermissionChange = (
      id: string,
      type: "read" | "write" | "delete" | "all",
      value: boolean
    ) => {
      setPermissions((prev) =>
        prev.map((perm) => {
          if (perm.id !== id) return perm

          if (type === "all") {
            return { ...perm, read: value, write: value, delete: value }
          }

          const newPerm = { ...perm, [type]: value }
          
          // Se não pode ler, não deveria poder escrever/deletar logicamente (opcional)
          if (type === "read" && !value) {
            newPerm.write = false
            newPerm.delete = false
          }
          // Se habilitou escrita ou delete, habilita leitura por padrão
          if ((type === "write" || type === "delete") && value) {
            newPerm.read = true
          }

          return newPerm
        })
      )
    }

    return (
      <Card className="w-[800px]">
        <CardHeader>
          <CardTitle>Permissões do Perfil: Analista Pleno</CardTitle>
          <CardDescription>Configure os níveis de acesso para este grupo de usuários em cada módulo do sistema.</CardDescription>
        </CardHeader>
        <CardContent>
          <RoleManager
            permissions={permissions}
            onPermissionChange={handlePermissionChange}
          />
        </CardContent>
      </Card>
    )
  },
}
