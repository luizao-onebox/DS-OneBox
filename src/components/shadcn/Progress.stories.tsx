import { Progress } from "./Progress"

export default {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
# Progress

O componente \`Progress\` exibe o andamento de uma tarefa ou processo, fornecendo feedback visual sobre quanto falta para completar uma ação.

## Anatomia do Componente

1. **Container (Root):** Faixa de fundo que representa 100% da barra.
2. **Indicator:** Preenchimento colorido que representa o progresso atual.

## Variants

### \`default\`
Usa a cor primária (\`bg-primary\`) para representar o progresso. Ideal para uso geral.

### \`gradient\`
Aplica automaticamente um gradiente de cores baseado no valor do progresso:
- **< 33%**: Verde esmeralda (\`from-emerald-400 to-emerald-500\`)
- **33-66%**: Verde para Amarelo (\`from-emerald-400 to-amber-400\`)
- **> 66%**: Verde para Vermelho (\`from-emerald-400 via-amber-400 to-red-500\`)

Use \`variant="gradient"\` para indicadores de risco ou níveis de confiança.

## Sizes

| Size | Altura |
|------|--------|
| \`sm\` | \`h-2\` (8px) |
| \`default\` | \`h-4\` (16px) |
| \`lg\` | \`h-6\` (24px) |

## Boas Práticas

### ✅ Faça
- Use Progress para operações que levam mais de 1 segundo.
- Mantenha o texto de porcentagem visível quando o valor não for óbvio.
- Use \`variant="gradient"\` para indicadores de saúde/confiança/risco.

### ❌ Não Faça
- Não use Progress para operações instantâneas — use Spinner ou Skeleton.
- Não atualize em intervalos muito frequentes (máximo 100ms entre updates).
- Não use Progress dentro de espaços muito apertados sem considerar \`size="sm"\`.

## Acessibilidade

- O componente usa \`<progress>\` nativamente quando possível.
- Forneça \`aria-label\` se houver múltiplos Progress na mesma tela.
- O valor do progresso é lido por leitores de tela automaticamente.

## Exemplo de Uso

\`\`\`tsx
import { Progress } from "@/components/shadcn/Progress"

// Basic
<Progress value={50} />

// Com gradient (risco/confiança)
<Progress value={75} variant="gradient" />

// Pequeno (espaço limitado)
<Progress value={30} size="sm" />
\`\`\`
        `,
      },
    },
  },
}

export const ProgressPlayground = {
  args: {
    value: 50,
  },
}

export const ProgressGallery = {
  render: () => (
    <div className="space-y-12 w-full max-w-3xl">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <Progress value={50} />
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Variação de Risco (Gradient)</h2>
        <div className="space-y-6">
          {[
            { val: 25, prefix: "Storage" },
            { val: 50, prefix: "Usage" },
            { val: 75, prefix: "Storage" },
            { val: 95, prefix: "Complete" },
          ].map((item, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-foreground">{item.prefix}</span>
                <span className="text-foreground">{item.val}%</span>
              </div>
              <Progress value={item.val} variant="gradient" />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Sizes</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Small (sm)</span>
            <Progress value={40} size="sm" />
          </div>
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Default</span>
            <Progress value={60} size="default" />
          </div>
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Large (lg)</span>
            <Progress value={80} size="lg" />
          </div>
        </div>
      </section>
    </div>
  ),
}
