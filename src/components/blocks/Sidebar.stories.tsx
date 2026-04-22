import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import {
  Home,
  Menu,
  Search,
  Settings,
  Users,
  Grid,
  CircleDot,
  Copyright
} from "lucide-react"

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarItem,
  SidebarSubItem,
  SidebarFooter,
  SidebarFooterItem,
} from "./Sidebar"
import { Separator } from "../shadcn/Separator"

const meta = {
  title: "Blocks/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen", // Necessário para a sidebar ocupar a tela toda verticalmente
    docs: {
      description: {
        component: `
# Sidebar (oneDocs Admin)

Um componente de navegação lateral rico em recursos, inspirado na interface fornecida nas imagens do Figma. 
Ele suporta 3 estados principais: Default, Expandido (com subníveis) e Colapsado (com tooltips).

## Anatomia

Este bloco é montado combinando várias partes:
- \`<SidebarProvider>\`: Um Context API wrapper que gerencia o estado de \`isCollapsed\` e o provedor de Tooltips.
- \`<Sidebar>\`: O \`<aside>\` container que lida com a transição fluida de largura (260px para 68px).
- \`<SidebarHeader>\`: O topo contendo o Logotipo e o botão de colapsar.
- \`<SidebarContent>\`: A área central rolavel contendo os \`<SidebarItem>\` e \`<SidebarSubItem>\` (que formam o estilo Accordion).
- \`<SidebarFooter>\`: A área inferior com links fixos (como status online e copyright).

## Tokens e Design System

- **Fundo:** \`bg-card\` com \`border-r\` (separador sutil à direita).
- **Tipografia:** \`text-sm font-medium\` para os itens principais, \`text-muted-foreground\` para os não-selecionados.
- **Ícones:** Usa a biblioteca \`lucide-react\` com tamanho padronizado (\`h-5 w-5\` ou \`h-4 w-4\`).
- **Tooltips:** Injetados automaticamente nos itens e no footer quando o estado \`isCollapsed\` é ativado.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

// Componente helper para montar o menu igual as imagens
const AppSidebar = ({ defaultCollapsed = false }: { defaultCollapsed?: boolean }) => {
  return (
    <SidebarProvider defaultCollapsed={defaultCollapsed}>
      <Sidebar>
        <SidebarHeader title="oneDocs" logo={<Grid className="h-5 w-5 text-primary" />} />
        
        <Separator className="my-2" />

        <SidebarContent>
          <SidebarItem icon={<Home />} label="Operações" active>
            <SidebarSubItem label="Conferências" active>
              <SidebarSubItem label="Lote" />
              <SidebarSubItem label="Individual" />
            </SidebarSubItem>
            <SidebarSubItem label="Desambiguação" />
            <SidebarSubItem label="Análise de risco" />
          </SidebarItem>

          <SidebarItem icon={<Menu />} label="Cadastros">
            <SidebarSubItem label="Busca / Lista" />
          </SidebarItem>

          <SidebarItem icon={<Search />} label="Auditoria">
            <SidebarSubItem label="Qualidade & performance" />
            <SidebarSubItem label="Ações / Timeline / Eventos" />
          </SidebarItem>

          <SidebarItem icon={<Settings />} label="Settings">
            <SidebarSubItem label="Usuários" />
            <SidebarSubItem label="Organização" />
            
            <SidebarSubItem label="Product">
              <SidebarSubItem label="Process/Rules" />
              <SidebarSubItem label="Termos / Políticas - Privacidade/Uso" />
            </SidebarSubItem>

            <SidebarSubItem label="Integrações">
              <SidebarSubItem label="Status & Panic Button" />
              <SidebarSubItem label="Logs por Integração" />
            </SidebarSubItem>
          </SidebarItem>
        </SidebarContent>

        <Separator className="my-2" />

        <SidebarFooter>
          <SidebarFooterItem icon={<Settings />} label="Configurações" />
          <SidebarFooterItem 
            icon={<CircleDot className="text-emerald-500 fill-emerald-500" />} 
            label="online: 00:00:12" 
          />
          <SidebarFooterItem icon={<Copyright />} label="2025 Onebox" />
        </SidebarFooter>
      </Sidebar>

      {/* Conteúdo da Página Fictício para compor o Layout */}
      <div className="flex-1 bg-muted/20 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold tracking-tight mb-4">Dashboard Principal</h1>
        <p className="text-muted-foreground max-w-2xl">
          Este é um exemplo de como o conteúdo principal se comporta ao lado da Sidebar. 
          Você pode clicar nos botões no topo da Sidebar para expandir ou colapsar o menu.
          Note que o layout é fluido e não quebra a página.
        </p>
      </div>
    </SidebarProvider>
  )
}

export const Expanded: Story = {
  render: () => <AppSidebar defaultCollapsed={false} />,
}

export const Collapsed: Story = {
  render: () => <AppSidebar defaultCollapsed={true} />,
}
