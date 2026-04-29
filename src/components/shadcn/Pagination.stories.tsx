import * as React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./Pagination"

export default {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
# Pagination

Componente de navegação em páginas para listas longas, como tabelas (\`DataTable\`) ou galerias de itens.

## Boas Práticas

### ✅ Faça
- Use a \`Pagination\` para grandes volumes de dados que não podem ser exibidos de uma vez (como tabelas).
- Indique visualmente a página atual usando a prop \`isActive\`.
- Use o \`PaginationEllipsis\` quando o número de páginas exceder 5-7.

### ❌ Não Faça
- Não use \`Pagination\` para navegação principal do site (use \`NavigationMenu\` ou \`Sidebar\`).
- Não esconda os botões "Anterior" e "Próximo" nas extremidades (apenas desabilite-os ou remova o link).
        `,
      },
    },
  },
}

export const PaginationPlayground = {
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
}
