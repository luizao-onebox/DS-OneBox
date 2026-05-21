// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { CommandPalette } from "./CommandPalette"
import { Home, Settings, User, Search, FileText, Folder } from "lucide-react"

const meta = {
  title: "Components/CommandPalette",
  component: CommandPalette,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof CommandPalette>

export default meta
type Story = StoryObj<typeof meta>

const commands = [
  { id: "1", label: "Dashboard", icon: <Home className="h-4 w-4" />, shortcut: ["G", "D"], group: "Navegação" },
  { id: "2", label: "Configurações", icon: <Settings className="h-4 w-4" />, shortcut: ["G", "S"], group: "Navegação" },
  { id: "3", label: "Perfil", icon: <User className="h-4 w-4" />, shortcut: ["G", "P"], group: "Navegação" },
  { id: "4", label: "Buscar", icon: <Search className="h-4 w-4" />, shortcut: ["⌘", "K"], group: "Ações" },
  { id: "5", label: "Criar Documento", icon: <FileText className="h-4 w-4" />, shortcut: ["⌘", "N"], group: "Ações" },
  { id: "6", label: "Nova Pasta", icon: <Folder className="h-4 w-4" />, shortcut: ["⌘", "⇧", "N"], group: "Ações" },
]

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <div className="p-8">
        <p className="text-body-sm text-muted-foreground mb-4">
          Pressione <kbd className="px-2 py-1 bg-muted rounded text-body-xs">⌘ K</kbd> para abrir
        </p>
        <CommandPalette items={commands} open={open} onOpenChange={setOpen} />
      </div>
    )
  },
}
