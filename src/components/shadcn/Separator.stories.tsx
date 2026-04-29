import { Separator } from "./Separator"

export default {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

O componente \`Separator\` desenha linhas horizontais ou verticais para agrupar e separar seções do layout visualmente, além de marcar divisões na árvore semântica HTML de forma acessível.

## Anatomia do Componente

A estrutura é baseada em \`@radix-ui/react-separator\`:
1. **Container:** Um componente \`div\` base que renderiza a borda e entende as orientações via a propriedade \`orientation\`.

## Tokens (Design System)

- \`bg-border\`: Cor padrão injetada na div do separador, provendo um cinza muito suave que interage bem nos modos Dark e Light.

## Casos de Uso (Orientação)

- **Horizontal (\`orientation="horizontal"\`)**: Ideal para separar listas de itens um abaixo do outro ou o \`CardHeader\` do \`CardContent\`. Preenche todo o width \`w-full\`, e ocupa 1px na altura \`h-[1px]\`.
- **Vertical (\`orientation="vertical"\`)**: Ótimo para separar Breadcrumbs, Links de NavBars, ou ferramentas lado-a-lado num toolbar. Ele preenche a altura \`h-full\` da flexbox pai e ocupa 1px na largura \`w-[1px]\`.
        `,
      },
    },
  },
  tags: ["autodocs"],
}

export const SeparatorPlayground = {
  render: () => (
    <div className="w-full max-w-[400px]">
      <div className="space-y-1">
        <p className="text-sm">Title</p>
        <p className="text-sm text-muted-foreground">Description</p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1">
        <p className="text-sm font-medium">Section Title</p>
        <p className="text-sm text-muted-foreground">Section description.</p>
      </div>
    </div>
  ),
}

export const SeparatorGallery = {
  render: () => (
    <div className="space-y-8 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Horizontal</h2>
        <div className="space-y-1">
          <p className="text-sm">Title</p>
          <p className="text-sm text-muted-foreground">Description</p>
        </div>
        <Separator className="my-4" />
        <div className="space-y-1">
          <p className="text-sm">Section Title</p>
          <p className="text-sm text-muted-foreground">Section description.</p>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Vertical</h2>
        <div className="flex h-[200px] items-center gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">First</p>
            <p className="text-sm text-muted-foreground">Content</p>
          </div>
          <Separator orientation="vertical" className="h-full" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Second</p>
            <p className="text-sm text-muted-foreground">Content</p>
          </div>
        </div>
      </section>
    </div>
  ),
}
