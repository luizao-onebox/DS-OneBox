import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./NavigationMenu"
import { cn } from "../../lib/utils"

const meta = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

Um menu de navegação que suporta submenus (dropdowns flutuantes) ricos em conteúdo, animados e acessíveis.

## Anatomia do Componente

- \`NavigationMenu\`: Container raiz.
- \`NavigationMenuList\`: A lista de itens no menu (normalmente horizontal).
- \`NavigationMenuItem\`: Um item específico que agrupa o Trigger e o Content.
- \`NavigationMenuTrigger\`: O botão ou link que ativa o submenu ao receber foco/hover.
- \`NavigationMenuContent\`: O conteúdo rico revelado.
- \`NavigationMenuLink\`: Link interno. Use com \`navigationMenuTriggerStyle()\` para links diretos sem dropdown.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description: "Um modal que interrompe o usuário com conteúdo importante e espera uma resposta.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "Para usuários com visão, visualiza informações disponíveis atrás de um link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description: "Exibe um indicador mostrando o progresso de uma tarefa.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Separa visualmente ou semanticamente o conteúdo.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description: "Um conjunto de seções de conteúdo tabulado e mutuamente exclusivas.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description: "Um popup que exibe informações relativas a um elemento.",
  },
]

export const Basic: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Começando</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Design System
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Componentes acessíveis, responsivos e maravilhosamente construídos.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introdução">
                Como instalar dependências e estruturar seu app.
              </ListItem>
              <ListItem href="/docs/installation" title="Instalação">
                Guia passo-a-passo.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Tipografia">
                Estilos para títulos, parágrafos e listas.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Componentes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs" className={navigationMenuTriggerStyle()}>
            Documentação
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
