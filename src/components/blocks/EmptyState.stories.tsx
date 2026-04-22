import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { EmptyState } from "./EmptyState"
import { ServerCrash, SearchX } from "lucide-react"

const meta = {
  title: "Blocks/EmptyState",
  component: EmptyState,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Bloco usado para orientar usuários quando uma tabela, lista ou tela não possui nenhum dado disponível ou após buscas falhas.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    actionLabel: { control: "text" },
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Nenhum projeto criado",
    description: "Você ainda não possui projetos neste workspace. Crie seu primeiro projeto para começar.",
    actionLabel: "Criar novo projeto",
  },
}

export const NoSearchResults: Story = {
  args: {
    title: "Nenhum resultado encontrado",
    description: "Sua busca não encontrou nenhum item correspondente. Tente usar termos mais genéricos.",
    icon: <SearchX className="h-10 w-10 text-muted-foreground" />
  },
}

export const ErrorState: Story = {
  args: {
    title: "Falha ao carregar dados",
    description: "Houve um problema ao comunicar-se com o servidor. Por favor, tente novamente mais tarde.",
    actionLabel: "Tentar novamente",
    icon: <ServerCrash className="h-10 w-10 text-destructive" />
  },
}
