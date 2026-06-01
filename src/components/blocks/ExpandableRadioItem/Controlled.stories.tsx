import * as React from "react"
import { Building2, Globe, Sparkles } from "lucide-react"

import { ExpandableRadioItem, ExpandableRadioGroup } from "../ExpandableRadioItem"
import { Button } from "../../shadcn/Button"

export default {
  title: "Blocks/ExpandableRadioItem/Controlled",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Componente Controlado

Esta variação demonstra como controlar o estado do \`ExpandableRadioGroup\` externamente 
usando as props \`value\` e \`onValueChange\`. É o padrão recomendado para sincronizar 
com formulários ou outros componentes React.

## Características desta variação

- **Estado controlado** via \`useState\` (\`selected\`)
- **Diferentes tipos de badge** (preço, "Mais popular", "Sob consulta")
- **Indicador visual** do valor selecionado em tempo real
- **Botão de confirmação** com feedback de sucesso
- **Conteúdo rico** (lista de features, ícones informativos)

## Quando usar este padrão

- Formulários complexos com validação
- Planos de assinatura/preço
- Fluxos com etapas (wizard)
- Quando o valor precisa ser acessado em outras partes da UI

## Código

\`\`\`tsx
const [selected, setSelected] = React.useState("pro")

<ExpandableRadioGroup value={selected} onValueChange={setSelected}>
  <ExpandableRadioItem value="basic" label="Básico" badge={...}>
    <PlanFeatures features={[...]} />
  </ExpandableRadioItem>
  {/* ... */}
</ExpandableRadioGroup>
\`\`\`

## Diferença para uncontrolled

| | Controlled | Uncontrolled |
|---|---|---|
| Estado | Gerenciado por você (\`useState\`) | Gerenciado internamente |
| Sincronização | Fácil (via state) | Difícil |
| Submit | Acesso direto ao valor | Precisa de ref ou callback |
| Padrão recomendado | ✅ Sim | ⚠️ Apenas para casos simples |
        `,
      },
    },
  },
}

const BlueBadge = () => (
  <span className="px-2 py-0.5 text-xs font-medium rounded-md whitespace-nowrap bg-blue-100 text-blue-800">
    Mais popular
  </span>
)

const PlanFeatures = ({ features }: { features: string[] }) => (
  <ul className="pt-2 space-y-2">
    {features.map((feature) => (
      <li key={feature} className="flex items-center gap-2 text-sm">
        <Sparkles className="h-4 w-4 text-primary" />
        <span>{feature}</span>
      </li>
    ))}
  </ul>
)

const PriceBadge = ({ price }: { price: string }) => (
  <span className="px-2 py-0.5 text-xs font-medium rounded-md whitespace-nowrap bg-slate-100 text-slate-700">
    {price}
  </span>
)

export const Default = () => {
  const [selected, setSelected] = React.useState("pro")
  const [submitted, setSubmitted] = React.useState(false)

  return (
    <div className="w-[400px] space-y-4">
      <div className="p-3 bg-slate-100 rounded-md text-sm font-mono">
        selected: <strong className="text-primary">{selected || "null"}</strong>
      </div>

      <div className="border rounded-xl overflow-hidden shadow-sm">
        <ExpandableRadioGroup value={selected} onValueChange={setSelected}>
          <ExpandableRadioItem 
            value="basic" 
            label="Básico" 
            badge={<PriceBadge price="R$ 29/mês" />}
          >
            <PlanFeatures features={["1 usuário", "5 projetos", "Suporte por e-mail"]} />
          </ExpandableRadioItem>

          <ExpandableRadioItem 
            value="pro" 
            label="Pro" 
            badge={<BlueBadge />}
          >
            <PlanFeatures 
              features={["10 usuários", "Projetos ilimitados", "Suporte 24/7", "Relatórios avançados"]} 
            />
          </ExpandableRadioItem>

          <ExpandableRadioItem 
            value="enterprise" 
            label="Enterprise" 
            badge={<PriceBadge price="Sob consulta" />}
          >
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-primary" />
                <span>Solução corporativa</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-primary" />
                <span>Implantação dedicada</span>
              </div>
            </div>
          </ExpandableRadioItem>
        </ExpandableRadioGroup>
      </div>

      <Button 
        className="w-full" 
        disabled={!selected}
        onClick={() => setSubmitted(true)}
      >
        Continuar com plano selecionado
      </Button>

      {submitted && (
        <div className="p-3 bg-green-50 text-green-800 rounded-md text-sm">
          ✓ Plano <strong>{selected}</strong> selecionado com sucesso!
        </div>
      )}
    </div>
  )
}

Default.storyName = "Visualização"
Default.parameters = {
  docs: {
    description: {
      story: "Estado controlado com useState, feedback visual e botão de confirmação.",
    },
  },
}
