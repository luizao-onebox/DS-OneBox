import * as React from "react"
import { Lock, Mail, User } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcn/Card"
import { Button } from "../shadcn/Button"
import { Input } from "../shadcn/Input"
import { Label } from "../shadcn/Label"
import { Checkbox } from "../shadcn/Checkbox"
import { Separator } from "../shadcn/Separator"

export function RegisterForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <Card className="mx-auto w-[400px]">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl">Criar uma conta</CardTitle>
        <CardDescription>
          Insira seus dados abaixo para começar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="João da Silva"
                className="pl-9"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="m@exemplo.com"
                className="pl-9"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Crie uma senha forte"
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="terms" required />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Eu aceito os{" "}
              <a href="#" className="underline text-primary hover:text-primary/80">
                Termos de Serviço
              </a>{" "}
              e a{" "}
              <a href="#" className="underline text-primary hover:text-primary/80">
                Política de Privacidade
              </a>.
            </label>
          </div>

          <Button className="w-full mt-4" type="submit" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Criando conta...
              </span>
            ) : (
              "Registrar"
            )}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Ou continue com
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" type="button" disabled={isLoading}>
            Github
          </Button>
          <Button variant="outline" type="button" disabled={isLoading}>
            Google
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <a href="#" className="underline hover:text-primary">
          Fazer login
        </a>
      </CardFooter>
    </Card>
  )
}
