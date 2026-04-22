import { Switch } from "./Switch"
import { Label } from "./Label"

export default {
  title: "Components/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Switch

Um controle (\`toggle\`) que permite o usuário alternar instantaneamente entre dois estados opostos (Ativo / Inativo).

## Anatomia do Componente

A estrutura interativa usa \`@radix-ui/react-switch\`:
1. **Container (Root):** A faixa de fundo que abriga o switch.
2. **Botão Flutuante (Thumb):** A bolinha circular dentro do container que se move da esquerda para a direita (\`translate-x-5\`).

## Tokens e Design System

- **Estado Ativado (\`data-[state=checked]\`)**: Container se preenche com \`bg-primary\`, o Thumb se desloca.
- **Estado Desativado (\`data-[state=unchecked]\`)**: Container exibe um fundo cinza com \`bg-input\`.
- **Thumb:** Sempre \`bg-background\` (branco/escuro base) para criar contraste máximo com o botão ativado.
- **Acessibilidade:** Suporta navegação por teclado recebendo um \`ring-ring\` quando focado via \`Tab\`.

**Recomendação de Uso:** Use Switches para configurações do sistema (ex: Ligar modo noturno, Ativar notificações, Aceitar Cookies). Diferente de um Checkbox (que serve para submeter formulários com várias escolhas), Switches refletem ações imediatas.
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
}

export const SwitchPlayground = {
  args: {
    id: "airplane-mode",
    disabled: false,
    defaultChecked: false,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <Label htmlFor={args.id}>Airplane Mode</Label>
    </div>
  ),
}

export const SwitchGallery = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Checked</h2>
        <div className="flex items-center space-x-2">
          <Switch id="checked" defaultChecked />
          <Label htmlFor="checked">Checked by default</Label>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Disabled</h2>
        <div className="flex items-center space-x-2">
          <Switch id="disabled" disabled />
          <Label htmlFor="disabled" className="opacity-50">Disabled</Label>
        </div>
      </section>
    </div>
  ),
}
