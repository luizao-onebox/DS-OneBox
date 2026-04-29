import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { SettingsLayout, SettingsNav } from "./SettingsLayout"
import { User, Key, Bell, CreditCard, LayoutDashboard } from "lucide-react"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../shadcn/Card"
import { Label } from "../shadcn/Label"
import { Input } from "../shadcn/Input"
import { Button } from "../shadcn/Button"

const meta = {
  title: "Blocks/SettingsLayout",
  component: SettingsLayout,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
Um layout padronizado de configurações com barra lateral de navegação interna. Ideal para páginas de "Perfil" ou "Ajustes do Sistema".

## Casos de Uso
- **Configurações de Conta**: Gerenciar dados pessoais, senha e avatar.
- **Configurações de Produto**: Ajustes gerais de um módulo do sistema.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SettingsLayout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState("Perfil")

    const navItems = [
      { title: "Perfil", icon: <User className="h-4 w-4" />, isActive: activeTab === "Perfil", onClick: () => setActiveTab("Perfil") },
      { title: "Conta", icon: <Key className="h-4 w-4" />, isActive: activeTab === "Conta", onClick: () => setActiveTab("Conta") },
      { title: "Notificações", icon: <Bell className="h-4 w-4" />, isActive: activeTab === "Notificações", onClick: () => setActiveTab("Notificações") },
      { title: "Faturamento", icon: <CreditCard className="h-4 w-4" />, isActive: activeTab === "Faturamento", onClick: () => setActiveTab("Faturamento") },
      { title: "Aparência", icon: <LayoutDashboard className="h-4 w-4" />, isActive: activeTab === "Aparência", onClick: () => setActiveTab("Aparência") },
    ]

    return (
      <div className="bg-background min-h-screen">
        <SettingsLayout
          title="Configurações"
          description="Gerencie as configurações da sua conta e defina as preferências de e-mail."
          sidebarContent={<SettingsNav items={navItems} />}
        >
          {activeTab === "Perfil" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Perfil</h3>
                <p className="text-sm text-muted-foreground">
                  Estas informações serão exibidas publicamente.
                </p>
              </div>
              <div className="h-px bg-border my-4" />
              
              <div className="space-y-8">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="rodrigo.silva" />
                  <p className="text-[0.8rem] text-muted-foreground">
                    Este é o seu nome de exibição público. Pode ser o seu nome real ou um pseudônimo.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="rodrigo@onebox.com" disabled />
                  <p className="text-[0.8rem] text-muted-foreground">
                    Para mudar o e-mail associado, entre em contato com o suporte.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="bio" 
                    placeholder="Conte-nos um pouco sobre você"
                  />
                  <p className="text-[0.8rem] text-muted-foreground">
                    Você pode usar @mentions para se vincular a outras organizações.
                  </p>
                </div>
                <Button type="submit">Atualizar Perfil</Button>
              </div>
            </div>
          )}

          {activeTab !== "Perfil" && (
            <div className="flex h-[300px] items-center justify-center border border-dashed rounded-lg">
              <p className="text-muted-foreground">Conteúdo da aba {activeTab}...</p>
            </div>
          )}
        </SettingsLayout>
      </div>
    )
  },
}
