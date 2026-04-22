import { Skeleton } from "./Skeleton"

export default {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Skeleton

Um \`Skeleton\` (Esqueleto de Carregamento) serve como um estado de espaço reservado visual que imita o layout final da tela enquanto os dados da aplicação estão sendo carregados.

## Anatomia e Composição

O Skeleton é extremamente simples, consistindo de uma \`div\` básica com uma animação pulsante infinita.

1. **\`<Skeleton>\`:** Deve receber dimensões explicitamente via as classes Tailwind na propriedade \`className\`.

### Tokens e Animação

- **Fundo:** \`bg-muted\` (Um cinza bem transparente).
- **Animação:** \`animate-pulse\` (Aumenta e diminui a opacidade infinitamente via CSS puro).
- **Raio:** Por padrão ele é ligeiramente arredondado (\`rounded-md\`), mas você pode sobrepor essa classe para criar círculos perfeitos (\`rounded-full\`) que imitam Avatares.

### Exemplos Práticos

Skeletons não devem ser retângulos genéricos enormes. Eles devem simular:
- O lugar da foto (\`w-12 h-12 rounded-full\`).
- Linhas de texto simuladas (\`h-4 w-[250px]\`).
- Parágrafos inteiros combinando 3 a 4 linhas de Skeletons de larguras variadas (\`w-full\`, \`w-[90%]\`, \`w-[60%]\`).
        `,
      },
    },
  },
  tags: ["autodocs"],
}

export const SkeletonPlayground = {
  args: {
    className: "h-4 w-[100px]",
  },
}

export const SkeletonGallery = {
  render: () => (
    <div className="space-y-8 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <Skeleton className="h-4 w-[100px]" />
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Card</h2>
        <div className="flex items-center space-x-4 p-4 w-full">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Profile</h2>
        <div className="space-y-6 w-full max-w-sm p-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[140px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
          </div>
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </section>
    </div>
  ),
}
