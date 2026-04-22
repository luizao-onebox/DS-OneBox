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
- **success**: Status de sucesso (ex: "Concluído", "Aprovado").
- **warning**: Status de alerta (ex: "Pendente", "Atenção").
- **destructiveOutline**: Estilo destructive com apenas borda (sem preenchimento).

**Nota:** \`Badge\` difere visualmente de um \`Button\` pequeno porque não tem efeitos de interação (hover ou click) projetados na sua raiz.

## Boas Práticas

### ✅ Faça
- Use Badges para comunicar status, não para ações.
- Mantenha o texto curto (1-2 palavras).
- Use cores de forma consistente: verde=sucesso, vermelho=erro, amarelo=alerta, cinza=neutro.
- Posicione Badges próximos ao elemento que rotulam.

### ❌ Não Faça
- Não use Badges como botões — não têm estados de hover/active preparados.
- Não use Badges para textos longos — crie um Label se precisar de mais detalhe.
- Não abuse de Badges na mesma tela — priorize os mais importantes.

## Acessibilidade

- Badges são elementos decorativos e não exigem roles específicos.
- Se o Badge indicar contagem de notificações, use \`aria-label="X notificações não lidas"\`.
- Evite usar apenas cor para comunicar status — combine com texto descritivo.

## Variants

| Variant | Uso | Exemplo |
|---------|-----|---------|
| \`default\` | Destaque primário | "Novo", "Featured" |
| \`secondary\` | Status neutro | "Pendente", "Draft" |
| \`destructive\` | Erro/Alerta crítico | "Falhou", "Cancelado" |
| \`destructiveOutline\` | Erro sem preenchimento | "Rejeitado" |
| \`outline\` | Filtros, Tags | "Design", "Frontend" |
| \`success\` | Sucesso | "Concluído", "Aprovado" |
| \`warning\` | Alerta | "Pendente", "Atenção" |
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
