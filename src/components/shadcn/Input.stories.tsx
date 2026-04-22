import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { Input } from "./Input"
import { Label } from "./Label"
import { Button } from "./Button"
import { Search, Mail, Eye, EyeOff, Lock, CreditCard, Link, Send } from "lucide-react"

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Input

Campos de entrada (\`<input>\`) são utilizados para coletar dados fornecidos pelos usuários em formulários e caixas de pesquisa.

Abaixo estão diversas variações comuns de inputs encontrados em interfaces modernas (Ícones, Senhas, Erros, Anexos, etc).
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    hasError: { control: "boolean" },
    type: { control: "select", options: ["text", "email", "password", "number", "tel", "url", "file"] },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Digite seu texto...",
    type: "text",
    disabled: false,
    hasError: false,
  },
}

export const WithLabelAndHelper: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-2">Email</Label>
      <Input id="email-2" type="email" placeholder="nome@empresa.com.br" />
      <p className="text-xs text-muted-foreground">Enviaremos um link de confirmação.</p>
    </div>
  ),
}

export const WithLeftIcon: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="search">Pesquisar</Label>
      <Input 
        id="search" 
        placeholder="Buscar usuários..." 
        leftIcon={<Search className="h-4 w-4" />} 
      />
    </div>
  ),
}

export const WithRightIcon: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="card">Cartão de Crédito</Label>
      <Input 
        id="card" 
        placeholder="0000 0000 0000 0000" 
        rightIcon={<CreditCard className="h-4 w-4" />} 
      />
    </div>
  ),
}

// Um componente interativo apenas para o Storybook demonstrar a funcionalidade
const PasswordInputDemo = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password">Senha</Label>
      <Input 
        id="password" 
        type={showPassword ? "text" : "password"} 
        placeholder="Sua senha secreta" 
        leftIcon={<Lock className="h-4 w-4" />}
        rightIcon={
          <button 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground focus:outline-none"
            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        } 
      />
    </div>
  )
}

export const PasswordToggle: Story = {
  render: () => <PasswordInputDemo />,
}

export const WithErrorState: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email-error" className="text-destructive">Email (Inválido)</Label>
      <Input 
        id="email-error" 
        type="email" 
        defaultValue="usuario@email-errado"
        hasError={true} 
      />
      <p className="text-xs text-destructive">Por favor, insira um email corporativo válido.</p>
    </div>
  ),
}

export const WithButton: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Inscreva-se na newsletter" />
      <Button type="submit">Inscrever</Button>
    </div>
  ),
}

export const WithIconButton: Story = {
  render: () => (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Digite sua mensagem..." />
      <Button type="submit" size="icon" className="shrink-0">
        <Send className="h-4 w-4" />
      </Button>
    </div>
  ),
}

export const FileInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Foto de Perfil</Label>
      <Input id="picture" type="file" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled">Campo Desativado</Label>
      <Input id="disabled" disabled placeholder="Não é possível digitar aqui" />
    </div>
  ),
}
