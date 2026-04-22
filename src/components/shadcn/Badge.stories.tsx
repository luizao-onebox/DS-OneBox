import { Badge } from "./Badge"

export default {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Badge

Badges ou "Selos" são elementos não clicáveis usados para fornecer informações suplementares como status de objetos, contadores de notificação, labels e categorias.

## Anatomia

- **Badge (Container):** Tem forma arredondada (geralmente \`rounded-full\`) e contorna o conteúdo interno.
- **Label:** O texto explicativo (tamanho \`text-xs\`, \`font-semibold\`).

## Variantes (Tokens)

Este componente usa a biblioteca \`cva\` para definir os estilos base e estilos por variante.

- **default**: Usado para destaques afirmativos. Tem a cor de fundo \`bg-primary\` e texto \`text-primary-foreground\`.
- **secondary**: Usado para status neutros, como "Pendente" ou "Processando". Usa fundo \`bg-secondary\`.
- **destructive**: Usado para alertas críticos, como "Falha", "Cancelado" ou contadores vermelhos. Usa fundo \`bg-destructive\`.
- **outline**: Não tem preenchimento. Contorna apenas o rótulo com uma borda sutil, usada para filtros e etiquetas menores (\`border-border\`).

**Nota:** \`Badge\` difere visualmente de um \`Button\` pequeno porque não tem efeitos de interação (hover ou click) projetados na sua raiz.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "destructiveOutline", "outline", "success", "warning"],
    },
  },
}

export const BadgePlayground = {
  args: {
    children: "Badge",
    variant: "default",
  },
}

export const BadgeGallery = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <section className="w-full">
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Variants</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="destructiveOutline">Destructive Outline</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </section>
    </div>
  ),
}
