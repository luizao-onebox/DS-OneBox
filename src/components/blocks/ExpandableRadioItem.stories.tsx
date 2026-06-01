import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { ExpandableRadioItem, ExpandableRadioGroup } from "./ExpandableRadioItem"

const meta = {
  title: "Blocks/ExpandableRadioItem/Overview",
  component: ExpandableRadioItem,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# ExpandableRadioItem

Um item de RadioGroup que expande um conteúdo extra quando selecionado. 
Perfeito para listas de seleção que exigem ações secundárias ou configurações 
extras para cada opção.

## Estrutura

O componente é composto por 2 partes:
- **\`ExpandableRadioGroup\`** — wrapper que gerencia o estado
- **\`ExpandableRadioItem\`** — item individual expansível

## Variações disponíveis

Este Storybook contém **4 variações** em arquivos separados, cada uma com sua 
própria documentação e casos de uso:

| Variação | Caminho | Descrição |
|----------|---------|-----------|
| IdentityValidation | [\`/IdentityValidation\`](?path=/story/blocks-expandableradioitem-identityvalidation--default) | Validação de identidade com badges e botões de captura |
| WithoutBadge | [\`/WithoutBadge\`](?path=/story/blocks-expandableradioitem-withoutbadge--default) | Uso sem badge com conteúdo variável |
| Controlled | [\`/Controlled\`](?path=/story/blocks-expandableradioitem-controlled--default) | Estado controlado externamente |
| Disabled | [\`/Disabled\`](?path=/story/blocks-expandableradioitem-disabled--default) | Item desabilitado com feedback visual |

## Props

### \`ExpandableRadioItem\`

| Prop | Tipo | Descrição |
|------|------|-----------|
| \`value\` | \`string\` | Identificador único (obrigatório) |
| \`label\` | \`string\` | Rótulo principal exibido |
| \`badge\` | \`ReactNode\` | Elemento opcional (tag/badge) |
| \`children\` | \`ReactNode\` | Conteúdo que expande quando selecionado |
| \`className\` | \`string\` | Classes CSS adicionais |
| \`id\` | \`string\` | ID customizado (auto-gerado se omitido) |

### \`ExpandableRadioGroup\`

Aceita todas as props do \`RadioGroup\` nativo do Shadcn, mais:
- \`value\`, \`onValueChange\`, \`defaultValue\` para controle do estado

## Como usar

\`\`\`tsx
import { ExpandableRadioItem, ExpandableRadioGroup } from "ds-onebox";

<ExpandableRadioGroup defaultValue="rg">
  <ExpandableRadioItem value="cnh" label="CNH" badge={<Badge>Novo</Badge>}>
    <DocumentActions />
  </ExpandableRadioItem>
  <ExpandableRadioItem value="rg" label="RG">
    <p>Conteúdo expandido</p>
  </ExpandableRadioItem>
</ExpandableRadioGroup>
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof ExpandableRadioItem>

export default meta
type Story = StoryObj<typeof meta>

export const Documentation: Story = {
  render: () => (
    <div className="w-[600px] p-6 bg-slate-50 border rounded-xl">
      <h2 className="text-2xl font-bold mb-2">📚 Documentação do Componente</h2>
      <p className="text-muted-foreground mb-4">
        Esta é a página de visão geral do <code className="px-1 py-0.5 bg-white rounded">ExpandableRadioItem</code>.
        Navegue pelas variações no menu lateral para ver exemplos de uso específicos:
      </p>
      <ul className="space-y-2 list-disc list-inside text-sm">
        <li><strong>IdentityValidation</strong> — Validação de identidade com badges</li>
        <li><strong>WithoutBadge</strong> — Uso sem badge</li>
        <li><strong>Controlled</strong> — Estado controlado externamente</li>
        <li><strong>Disabled</strong> — Item desabilitado</li>
      </ul>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Página de visão geral e índice de variações.",
      },
    },
  },
}
