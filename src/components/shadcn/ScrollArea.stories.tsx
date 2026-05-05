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
        <h4 className="mb-4 text-label-md leading-none">Tags</h4>
        {tags.map((tag) => (
          <React.Fragment key={tag}>
            <div className="text-body-sm">
              {tag}
            </div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const HorizontalScroll = {
  render: () => (
    <ScrollArea orientation="horizontal" className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {tags.slice(0, 10).map((tag) => (
          <div key={tag} className="shrink-0">
            <div className="overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 h-24 w-32 flex items-center justify-center">
              <span className="text-label-md text-neutral-600">{tag}</span>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const BothScroll = {
  render: () => (
    <ScrollArea orientation="both" className="h-72 w-96 rounded-md border">
      <div className="p-4 w-[800px]">
        <h4 className="mb-4 text-label-md leading-none">Tabela de Dados Larga</h4>
        <div className="grid grid-cols-8 gap-4 mb-2 font-medium text-neutral-500">
          <div>ID</div>
          <div>Nome</div>
          <div>Email</div>
          <div>Status</div>
          <div>Cargo</div>
          <div>Departamento</div>
          <div>Localização</div>
          <div>Ações</div>
        </div>
        <Separator className="mb-2" />
        {Array.from({ length: 20 }).map((_, i) => (
          <React.Fragment key={i}>
            <div className="grid grid-cols-8 gap-4 py-2 text-body-sm">
              <div>#{1000 + i}</div>
              <div>Usuário {i + 1}</div>
              <div>usuario{i + 1}@exemplo.com</div>
              <div>
                <span className="px-2 py-1 bg-success-50 text-success-700 rounded text-body-xs">Ativo</span>
              </div>
              <div>Desenvolvedor</div>
              <div>Engenharia</div>
              <div>São Paulo, SP</div>
              <div className="text-primary-600 cursor-pointer">Editar</div>
            </div>
            <Separator />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  ),
}
