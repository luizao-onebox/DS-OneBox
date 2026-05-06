import type { Meta, StoryObj } from "@storybook/react"
import { MarketingBanner } from "./MarketingBanner"
import { Sparkles, ArrowRight, DownloadCloud } from "lucide-react"
import { Button } from "../shadcn/Button"

const meta = {
  title: "Blocks/MarketingBanner",
  component: MarketingBanner,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Banners promocionais e de marketing para engajamento de usuários. Útil para anunciar novas features, upgrades de plano ou eventos importantes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["split", "hero", "gradient", "floating"],
      description: "O layout e estilo visual do banner",
    },
    title: { control: "text" },
    description: { control: "text" },
    badge: { control: "text" },
    actionText: { control: "text" },
    secondaryActionText: { control: "text" },
    isDismissible: { control: "boolean" },
  },
} satisfies Meta<typeof MarketingBanner>

export default meta
type Story = StoryObj<typeof meta>

export const SplitFeature: Story = {
  args: {
    variant: "split",
    badge: "Nova Feature",
    title: "Conheça o novo Dashboard Analytics",
    description: "Tome decisões melhores com nossos novos gráficos interativos e relatórios em tempo real exportáveis.",
    actionText: "Acessar Dashboard",
    secondaryActionText: "Ver Documentação",
    isDismissible: true,
    imageSlot: (
      <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg aspect-video flex items-center justify-center border border-border shadow-inner">
        <Sparkles className="w-12 h-12 text-primary opacity-50" />
      </div>
    ),
  },
}

export const HeroPromo: Story = {
  args: {
    variant: "hero",
    badge: "Plano Enterprise",
    title: "Escale sua operação sem limites",
    description: "Faça o upgrade hoje e libere usuários ilimitados, integrações personalizadas e suporte dedicado 24/7.",
    actionText: "Fazer Upgrade Agora",
    secondaryActionText: "Falar com Vendas",
    isDismissible: false,
  },
}

export const GradientEvent: Story = {
  args: {
    variant: "gradient",
    badge: "Webinar Gratuito",
    title: "O Futuro do Design System",
    description: "Junte-se a nós nesta quinta-feira para uma masterclass exclusiva sobre arquitetura de tokens e acessibilidade.",
    actionText: "Garantir minha vaga",
    isDismissible: true,
  },
}

export const FloatingAnnouncement: Story = {
  args: {
    variant: "floating",
    badge: "Atualização",
    title: "Aplicativo Desktop Disponível",
    description: "Baixe nosso novo app para Mac e Windows e trabalhe offline com sincronização automática.",
    actionText: "Baixar Agora",
    secondaryActionText: "Talvez mais tarde",
    isDismissible: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Nota: A variante `floating` usa `fixed` positioning, então ela flutuará no canto inferior direito da tela inteira."
      }
    }
  }
}

export const CustomImageBanner: Story = {
  args: {
    variant: "split",
    badge: "Integrações",
    title: "Conecte com suas ferramentas favoritas",
    description: "Agora oferecemos integração nativa com Slack, Jira e GitHub. Sincronize suas tarefas automaticamente.",
    actionText: "Ver Integrações",
    imageSlot: (
      <div className="grid grid-cols-2 gap-2 p-2 bg-secondary rounded-xl">
        <div className="bg-background rounded-lg p-4 flex items-center justify-center shadow-sm">
          <DownloadCloud className="text-primary w-6 h-6" />
        </div>
        <div className="bg-background rounded-lg p-4 flex items-center justify-center shadow-sm">
          <ArrowRight className="text-success w-6 h-6" />
        </div>
      </div>
    ),
  },
}
