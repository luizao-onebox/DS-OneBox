import * as React from "react"
import { ScrollArea } from "./ScrollArea"
import { Separator } from "./Separator"

export default {
  title: "Components/ScrollArea",
  component: ScrollArea,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
# ScrollArea

Substitui as barras de rolagem nativas do navegador por barras estilizadas e personalizadas que respeitam o tema (Light/Dark).

## Boas Práticas

### ✅ Faça
- Use \`ScrollArea\` em menus dropdown longos, painéis laterais (Sidebars) e modais com muito conteúdo.
- Defina uma altura fixa (\`h-[300px]\`, por exemplo) no elemento \`ScrollArea\` para forçar a rolagem.

### ❌ Não Faça
- Não use \`ScrollArea\` para rolar a página inteira (\`<body>\`).
- Não aninhe múltiplos \`ScrollArea\` sem necessidade — isso confunde o usuário e quebra a usabilidade.
        `,
      },
    },
  },
}

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.${a.length - i}`
)

export const ScrollAreaPlayground = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-sm">
              {tag}
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
}
