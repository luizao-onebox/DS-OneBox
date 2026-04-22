import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Bell, Maximize, Keyboard, ChevronDown, Grip } from "lucide-react"

import {
  Topbar,
  TopbarLeft,
  TopbarRight,
  TopbarLogo,
  TopbarDivider,
  TopbarSelector,
  TopbarInfo,
  TopbarAction,
  TopbarProfile,
} from "./Topbar"

// Para o exemplo do Layout completo
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarItem, SidebarSubItem, SidebarFooter, SidebarFooterItem } from "./Sidebar"
import { Home, Menu, Search, Settings, CircleDot, Copyright } from "lucide-react"
import { Logo } from "../shadcn/Logo"

const meta = {
  title: "Blocks/Topbar",
  component: Topbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Topbar (Navbar Superior)

Componente de navegação horizontal projetado para o topo da aplicação OneDocs.

## Anatomia do Componente

A Topbar é composta pelos seguintes sub-componentes:

| Sub-componente | Descrição |
|----------------|-----------|
| \`<Topbar>\` | Container principal que aplica o layout flexbox e posiciona os filhos |
| \`<TopbarLeft>\` | Wrapper à esquerda (logo, seletores, info) |
| \`<TopbarRight>\` | Wrapper à direita (ações, perfil) |
| \`<TopbarLogo>\` | Área do logotipo da aplicação |
| \`<TopbarDivider>\` | Linha vertical separadora entre seções |
| \`<TopbarSelector>\` | Dropdown de seleção de contexto (Módulo, tenant, Produto) |
| \`<TopbarInfo>\` | Texto informativo (ex: número de solicitação) |
| \`<TopbarAction>\` | Botão de ação iconizado (notificação, fullscreen, etc) |
| \`<TopbarProfile>\` | Área do perfil do usuário com Avatar e dropdown |

## Boas Práticas

### ✅ Faça
- Use \`<TopbarLogo>\` para inserir o Logo real da aplicação.
- Use \`<TopbarSelector>\` para contextos que podem mudar (Tenant, Produto, Módulo).
- Use \`<TopbarInfo>\` para exibir dados contextuais da página atual.
- Agrupe ações relacionadas em \`<TopbarRight>\`.

### ❌ Não Faça
- Não adicione mais de 4 seletores na mesma linha — o espaço fica apertado.
- Não use \`<TopbarAction>\` para ações que não são globais (use botões dentro da página).
- Não exponha mais de 3 ações na barra direita — agrupe em dropdown se necessário.

## Layout Completo (Topbar + Sidebar)

A \`<Topbar>\` foi projetada para funcionar em conjunto com o componente \`<Sidebar>\`. Use a estrutura do \`FullLayoutExample\` como base para novos layouts.

## Acessibilidade

- Ações de ícone (\`<TopbarAction>\`) devem ter \`aria-label\` descritivo.
- O \`<TopbarProfile>\` abre um dropdown — certifique-se de que está navegável por Tab.
- Se a Topbar for fixada no topo, use \`position="sticky"\` ou \`position="fixed"\`.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Topbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Topbar>
      {/* Esquerda: Logo, Seletores e Contextos */}
      <TopbarLeft>
        <TopbarLogo logo={<Logo theme="light" className="h-6 w-auto" />} />
        <TopbarDivider />
        <TopbarSelector value="Module" />
        <TopbarDivider />
        <TopbarSelector value="Dropdown Tenant" hasDropdown />
        <TopbarDivider />
        <TopbarSelector value="Dropdown Produto" hasDropdown />
        <TopbarDivider />
        <TopbarInfo text="Solicitação: #123456789" />
      </TopbarLeft>

      {/* Direita: Ações e Perfil */}
      <TopbarRight>
        <TopbarAction icon={<Maximize className="h-4 w-4" />} />
        <TopbarAction icon={<Keyboard className="h-4 w-4" />} />
        <TopbarAction icon={<Bell className="h-4 w-4" />} hasBadge />
        <TopbarProfile initials="RS" name="Rodrigo Silva" email="rodrigo@onebox.com" />
      </TopbarRight>
    </Topbar>
  ),
}

// Exemplo de como a Topbar se integra com a Sidebar em um layout real
export const FullLayoutExample: Story = {
  render: () => (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* 1. Topbar Fixa no topo */}
      <Topbar className="shrink-0 z-10 relative">
        <TopbarLeft>
          <TopbarLogo logo={<Logo theme="light" className="h-6 w-auto" />} />
          <TopbarDivider />
          <TopbarSelector value="Module" />
          <TopbarDivider />
          <TopbarSelector value="Dropdown Tenant" hasDropdown />
          <TopbarDivider />
          <TopbarSelector value="Dropdown Produto" hasDropdown />
          <TopbarDivider />
          <TopbarInfo text="Solicitação: #123456789" />
        </TopbarLeft>
        <TopbarRight>
          <TopbarAction icon={<Maximize className="h-4 w-4" />} />
          <TopbarAction icon={<Keyboard className="h-4 w-4" />} />
          <TopbarAction icon={<Bell className="h-4 w-4" />} hasBadge />
          <TopbarProfile initials="RS" />
        </TopbarRight>
      </Topbar>

      {/* 2. Área Inferior: Sidebar + Conteúdo Principal */}
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider defaultCollapsed={true}>
          <Sidebar className="border-t-0">
            <SidebarContent className="pt-4">
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

            <SidebarFooter>
              <SidebarFooterItem icon={<Settings />} label="Configurações" />
              <SidebarFooterItem 
                icon={<CircleDot className="text-emerald-500 fill-emerald-500" />} 
                label="online: 00:00:12" 
              />
              <SidebarFooterItem icon={<Copyright />} label="2025 Onebox" />
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 bg-muted/20 p-8 overflow-y-auto">
            <h1 className="text-2xl font-bold tracking-tight mb-4">Exemplo de Layout Integrado</h1>
            <p className="text-muted-foreground">
              Veja como a Topbar e a Sidebar trabalham juntas para formar a estrutura 
              de um Dashboard B2B moderno.
            </p>
          </main>
        </SidebarProvider>
      </div>
    </div>
  ),
}
