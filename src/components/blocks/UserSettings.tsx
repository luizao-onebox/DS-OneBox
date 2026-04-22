import * as React from "react"

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
import { Separator } from "../shadcn/Separator"
import { Switch } from "../shadcn/Switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shadcn/Tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/Avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/Select"

export function UserSettings() {
  return (
    <div className="flex w-full max-w-4xl flex-col md:flex-row gap-6">
      {/* Sidebar Navigation */}
      <nav className="flex md:flex-col gap-2 md:w-[200px] shrink-0 overflow-x-auto md:overflow-visible">
        <Button variant="secondary" className="justify-start">
          Perfil
        </Button>
        <Button variant="ghost" className="justify-start">
          Conta
        </Button>
        <Button variant="ghost" className="justify-start">
          Aparência
        </Button>
        <Button variant="ghost" className="justify-start">
          Notificações
        </Button>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>
              Gerencie suas informações públicas e de contato.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button size="sm">Alterar Foto</Button>
                  <Button size="sm" variant="outline">
                    Remover
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  JPG, GIF ou PNG. Tamanho máximo 2MB.
                </p>
              </div>
            </div>

            <Separator />

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Nome</Label>
                  <Input id="first-name" defaultValue="Luiz" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Sobrenome</Label>
                  <Input id="last-name" defaultValue="Baptistella" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@luizbaptistella" />
                <p className="text-[0.8rem] text-muted-foreground">
                  Este é o seu nome de exibição público.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Input id="bio" placeholder="Fale um pouco sobre você..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Select defaultValue="brt">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Selecione o fuso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="brt">Brasília Time (BRT)</SelectItem>
                    <SelectItem value="utc">Universal Coordinated Time (UTC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Toggles */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Preferências de Email</h3>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Notificações de Marketing</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba emails sobre novos recursos e novidades.
                  </p>
                </div>
                <Switch id="marketing" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">Emails de Segurança</Label>
                  <p className="text-sm text-muted-foreground">
                    Receba emails sobre atividades suspeitas na conta.
                  </p>
                </div>
                <Switch id="security" defaultChecked disabled />
              </div>
            </div>

          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t pt-6">
            <Button variant="ghost">Cancelar</Button>
            <Button>Salvar Alterações</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
