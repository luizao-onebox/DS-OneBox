import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Animation, StaggeredList, AnimatedCounter } from "./Animation"
import { Button } from "../shadcn/Button"
import { Card, CardHeader, CardTitle, CardContent } from "../shadcn/Card"
import { Badge } from "../shadcn/Badge"
import { cn } from "../../lib/utils"

const meta = {
  title: "Blocks/Animation",
  component: Animation,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
Sistema de animações do DS-OneBox baseado em tokens. Use animações com moderação — elas devem servir para comunicar estado, não para decorar.

## Tokens de Animação

### Duração (duration)
| Classe | Valor |
|--------|-------|
| \`duration-75\` | 75ms |
| \`duration-100\` | 100ms |
| \`duration-150\` | 150ms |
| \`duration-200\` | 200ms |
| \`duration-300\` | 300ms |
| \`duration-500\` | 500ms |
| \`duration-700\` | 700ms |
| \`duration-1000\` | 1000ms |

### Delay
Mesmos valores de duration, prefixados com \`delay-\`.

### Tipos de Animação
- \`animate-fade-in\` — Fade simples
- \`animate-fade-in-up\` — Fade + slide para cima (recomendado)
- \`animate-fade-in-down\` — Fade + slide para baixo
- \`animate-scale-in\` — Scale de 0.95 → 1
- \`animate-slide-in-left\` — Slide da esquerda
- \`animate-slide-in-right\` — Slide da direita
- \`animate-shimmer\` — Efeito de brilho (skeleton)
- \`animate-ping\` — Pulse point (notificações)

## Componentes

- \`<Animation>\` — Wrapper com props para aplicar animações
- \`<StaggeredList>\` — Lista com delay escalonado entre items
- \`<AnimatedCounter>\` — Número que conta animadamente
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    animate: {
      control: "select",
      options: [
        "fade-in", "fade-in-up", "fade-in-down", "scale-in",
        "slide-in-left", "slide-in-right", "slide-in-up", "slide-in-down",
        "shimmer", "pulse", "bounce", "spin", "ping"
      ],
    },
    duration: {
      control: "select",
      options: ["75", "100", "150", "200", "300", "500", "700", "1000"],
    },
    delay: {
      control: "select",
      options: ["0", "75", "100", "150", "200", "300", "500"],
    },
    repeat: {
      control: "select",
      options: ["once", "infinite", 2, 3],
    },
  },
} satisfies Meta<typeof Animation>

export default meta
type Story = StoryObj<typeof meta>

export const FadeInBasic: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Animation animate="fade-in" duration="300">
        <Card>
          <CardContent className="p-4">
            <p className="text-body-md">Fade In (300ms)</p>
          </CardContent>
        </Card>
      </Animation>
    </div>
  ),
}

export const FadeInUp: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Animation animate="fade-in-up" duration="300">
        <Card>
          <CardContent className="p-4">
            <p className="text-body-md">Fade In + Slide Up (recomendado para cards)</p>
          </CardContent>
        </Card>
      </Animation>
    </div>
  ),
}

export const ScaleIn: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Animation animate="scale-in" duration="200">
        <Card>
          <CardContent className="p-4">
            <p className="text-body-md">Scale In (200ms) — bom para modais</p>
          </CardContent>
        </Card>
      </Animation>
    </div>
  ),
}

export const SlideInLeft: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Animation animate="slide-in-left" duration="300">
        <Card>
          <CardContent className="p-4">
            <p className="text-body-md">Slide da Esquerda</p>
          </CardContent>
        </Card>
      </Animation>
    </div>
  ),
}

export const DurationComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {["75", "150", "300", "500", "1000"].map((duration) => (
        <Animation key={duration} animate="fade-in-up" duration={duration}>
          <Card>
            <CardContent className="p-4 flex justify-between">
              <span className="text-body-md">duration-{duration}</span>
              <Badge variant="soft" color="neutral">{duration}ms</Badge>
            </CardContent>
          </Card>
        </Animation>
      ))}
    </div>
  ),
}

export const StaggeredListStory: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <h3 className="text-label-md text-muted-foreground">Lista com stagger (50ms entre items)</h3>
      <StaggeredList staggerDelay={50}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <p className="text-body-md">Item {i}</p>
            </CardContent>
          </Card>
        ))}
      </StaggeredList>
    </div>
  ),
}

export const StaggeredListWithDelay: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <h3 className="text-label-md text-muted-foreground">Stagger com delay inicial (300ms) e passo de 100ms</h3>
      <StaggeredList staggerDelay={100} initialDelay={300}>
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <p className="text-body-md">Card {i}</p>
            </CardContent>
          </Card>
        ))}
      </StaggeredList>
    </div>
  ),
}

export const AnimatedCounterStory: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Contador Animado</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-baseline gap-2">
            <AnimatedCounter
              to={1245}
              duration={1000}
              prefix="R$ "
              suffix=",00"
              className="text-display-md font-bold text-primary"
            />
          </div>
          <div className="flex items-baseline gap-2">
            <AnimatedCounter
              to={89.9}
              duration={800}
              decimals={1}
              suffix="%"
              className="text-h2 font-bold text-success"
            />
          </div>
          <div className="flex items-baseline gap-2">
            <AnimatedCounter
              to={8432}
              duration={1500}
              className="text-h2 font-bold"
            />
            <span className="text-label-md text-muted-foreground">usuários</span>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
}

export const SkeletonLoading: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Carregando...</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <div className="animate-shimmer h-4 bg-gradient-to-r from-muted via-muted-foreground/10 to-muted bg-[length:200%_100%] rounded" />
          <div className="animate-shimmer h-4 w-3/4 bg-gradient-to-r from-muted via-muted-foreground/10 to-muted bg-[length:200%_100%] rounded" />
          <div className="animate-shimmer h-4 w-1/2 bg-gradient-to-r from-muted via-muted-foreground/10 to-muted bg-[length:200%_100%] rounded" />
        </CardContent>
      </Card>
    </div>
  ),
}

export const NotificationPing: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Button variant="ghost" size="icon">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </Button>
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive animate-ping-slow" />
      </div>
      <span className="text-label-sm text-muted-foreground">Notificação</span>
    </div>
  ),
}

export const PageEntranceAnimation: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-label-md text-muted-foreground">Exemplo de animação de entrada de página</h3>
      <StaggeredList staggerDelay={80} initialDelay={100}>
        <Animation animate="fade-in-up" duration="400">
          <h1 className="text-h1 font-bold">Dashboard Analytics</h1>
        </Animation>
        <Animation animate="fade-in-up" duration="400">
          <p className="text-body-lg text-muted-foreground">Visão geral das métricas da sua empresa</p>
        </Animation>
        <div className="flex gap-2 mt-2">
          <Animation animate="fade-in-up" duration="300" delay="200">
            <Button>Ver Relatório</Button>
          </Animation>
          <Animation animate="fade-in-up" duration="300" delay="300">
            <Button variant="outline">Configurações</Button>
          </Animation>
        </div>
      </StaggeredList>
    </div>
  ),
}
