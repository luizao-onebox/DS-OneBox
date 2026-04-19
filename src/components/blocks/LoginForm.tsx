import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../shadcn/Card"
import { Input } from "../shadcn/Input"
import { Label } from "../shadcn/Label"
import { Button } from "../shadcn/Button"

/**
 * Propriedades para o bloco de Login.
 * A IA pode preencher isso para forçar um estado de loading, erro, etc.
 */
export interface LoginFormProps {
  /** Se o formulário está aguardando a requisição do servidor. */
  isLoading?: boolean
  /** Mensagem de erro global caso a autenticação falhe. */
  errorMessage?: string
  /** Função disparada ao submeter o formulário. A IA deve usar isso para Mocks. */
  onSubmit?: (e: React.FormEvent) => void
}

/**
 * @description
 * Bloco composto: Formulário de Login (LoginForm).
 * 
 * **Regras para a IA:**
 * - Sempre use esse bloco inteiro caso precise de uma tela de login no projeto.
 * - Nunca tente reconstruir os inputs "na mão", use essa estrutura pré-fabricada do `Card`.
 * - Este bloco já implementa as melhores práticas de espaçamento e UX da OneBox.
 */
export function LoginForm({ isLoading = false, errorMessage, onSubmit }: LoginFormProps) {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight">Login na OneBox</CardTitle>
        <CardDescription>Insira seu email e senha abaixo para acessar sua conta</CardDescription>
      </CardHeader>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}>
        <CardContent className="space-y-4">
          {errorMessage && (
            <div className="p-3 text-sm text-destructive-foreground bg-destructive/90 rounded-md">
              {errorMessage}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@exemplo.com" 
              required 
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <a href="#" className="text-sm font-medium text-primary hover:underline" tabIndex={-1}>
                Esqueceu a senha?
              </a>
            </div>
            <Input 
              id="password" 
              type="password" 
              required 
              disabled={isLoading}
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full" 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
