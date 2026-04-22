/**
 * Card components for displaying content in a container.
 * @see {@link https://ui.shadcn.com/docs/components/card}
 */
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./Card"
import { Button } from "./Button"
import { Badge } from "./Badge"
import { Avatar, AvatarImage, AvatarFallback } from "./Avatar"
import { Heart, MessageSquare, Share2, MoreHorizontal, UserPlus, Check, Bell, Settings, Trash2, Edit } from "lucide-react"

export default {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# Card

O componente de \`Card\` atua como um contêiner agrupador de informações relacionadas, organizando títulos, descrições, conteúdo livre e rodapés de ações em uma única superfície visual.

## Anatomia do Componente

A estrutura completa de um cartão usa a seguinte composição de sub-componentes:
1. **\`<Card>\`:** O contêiner delimitador que aplica fundo, bordas e sombras.
2. **\`<CardHeader>\`:** Região de topo, normalmente usada para o título e descrição principal, com espaçamento maior.
3. **\`<CardTitle>\`:** Cabeçalho do cartão com tipografia em destaque (Semibold).
4. **\`<CardDescription>\`:** Texto complementar abaixo do título com tipografia menor.
5. **\`<CardContent>\`:** Área reservada para os dados, formulários, listas ou gráficos.
6. **\`<CardFooter>\`:** Parte inferior, tipicamente reservada para botões ou links de ação, centralizados horizontalmente ou alinhados à direita.

## Tokens Visuais e Design System

- \`bg-card\`: A cor de fundo padrão da superfície do cartão.
- \`text-card-foreground\`: A cor padrão do texto dentro do cartão.
- \`border-border\`: Linha delimitadora externa.
- \`shadow-sm\`: Uma sombra suave (Small Shadow) para separar levemente o cartão do fundo geral.
- \`text-muted-foreground\`: Usado para o \`<CardDescription>\`.

## Dicas de Uso

O \`<Card>\` é flexível e pode ser combinado com componentes como Tabelas, Formulários de Login ou Dashboards. Por padrão, ele não tem uma largura (width) fixa, então pode crescer para ocupar o espaço do contêiner pai ou receber uma largura fixa via a prop \`className\`.

## Boas Práticas

### ✅ Faça
- Use \`<CardHeader>\` + \`<CardContent>\` + \`<CardFooter>\` para manter consistência de espaçamento.
- Mantenha o conteúdo do \`<CardTitle>\` conciso (máximo 1-2 linhas).
- Use \`<CardDescription>\` para complementar o título com contexto adicional.
- Em Cards de lista (notificações, mensagens), priorize informações mais importantes no topo.

### ❌ Não Faça
- Não aninhe Cards dentro de Cards — prefira usar \`<Accordion>\` ou \`<Tabs>\`.
- Não coloque ações primárias dentro de \`<CardFooter>\` sem um \`<CardHeader>\` — o usuário precisa de contexto antes de agir.
- Evite Cards muito longos — quebre em múltiplos Cards ou use \`<ScrollArea>\`.

## Acessibilidade

- Cards são elementos \`<article>\` semanticamente quando contêm conteúdo independente.
- Forneça \`aria-label\` em botões de ação dentro do Card quando o texto do botão não for autoexplicativo.
- Se o Card for interativo (cliccável), use \`<button>\` como wrapper ou \`role="link"\`.

## Composição de Sub-Componentes

| Componente | Descrição |
|------------|-----------|
| \`<Card>\` | Contêiner principal com fundo, bordas e sombra |
| \`<CardHeader>\` | Região de topo com espaçamento generoso |
| \`<CardTitle>\` | Título em destaque (semibold) |
| \`<CardDescription>\` | Texto complementar menor (muted) |
| \`<CardContent>\` | Área livre para qualquer conteúdo |
| \`<CardFooter>\` | Região inferior para ações |
        `,
      },
    },
  },
  tags: ["autodocs"],
}

export const CardPlayground = {
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content area with some sample text.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">Cancel</Button>
        <Button size="sm">Submit</Button>
      </CardFooter>
    </Card>
  ),
}

export const CardGallery = {
  render: () => (
    <div className="flex flex-wrap gap-6 p-6">
      {/* Basic */}
      <Card className="w-[300px]">
        <CardContent className="pt-6">
          <p>Simple card with just content.</p>
        </CardContent>
      </Card>

      {/* With Header & Footer */}
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Project Update</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Project progress details go here.</p>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">Last updated: 2 days ago</p>
        </CardFooter>
      </Card>

      {/* Social Post */}
      <Card className="w-[350px]">
        <CardHeader className="flex flex-row items-start justify-between pb-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/vercel.png" alt="@vercel" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Vercel</p>
              <p className="text-xs text-muted-foreground">@vercel</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-3">Excited to announce our new dashboard with real-time analytics!</p>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-xs text-muted-foreground">Dashboard Preview</p>
            <p className="text-sm font-medium">Analytics Dashboard v2.0</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="ghost" size="sm" className="gap-1"><Heart className="h-4 w-4" />2.5k</Button>
          <Button variant="ghost" size="sm" className="gap-1"><MessageSquare className="h-4 w-4" />128</Button>
          <Button variant="ghost" size="sm" className="gap-1"><Share2 className="h-4 w-4" />Share</Button>
        </CardFooter>
      </Card>

      {/* User Profile */}
      <Card className="w-[280px]">
        <CardHeader className="flex flex-col items-center text-center pb-2">
          <Avatar className="h-20 w-20 mb-2">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className="text-lg">CN</AvatarFallback>
          </Avatar>
          <CardTitle className="text-lg">Shadcn</CardTitle>
          <CardDescription>Software Engineer</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex justify-center gap-2 mb-4">
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">TypeScript</Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          <Button size="sm"><UserPlus className="mr-1 h-3 w-3" />Follow</Button>
          <Button variant="outline" size="sm">Message</Button>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className="w-[280px]">
        <CardHeader>
          <CardTitle>Pro Plan</CardTitle>
          <CardDescription>For teams and businesses</CardDescription>
          <div className="mt-4"><span className="text-4xl font-bold">$29</span><span className="text-muted-foreground">/month</span></div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />Unlimited projects</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />100GB storage</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" />Priority support</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Upgrade to Pro</Button>
        </CardFooter>
      </Card>

      {/* Notifications */}
      <Card className="w-[340px]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Notifications</CardTitle>
          <CardDescription>You have 3 unread messages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-2 rounded-lg bg-muted/50">
            <Avatar className="h-8 w-8"><AvatarImage src="https://github.com/teamb.png" /><AvatarFallback>TB</AvatarFallback></Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">Team Battle</p>
              <p className="text-xs text-muted-foreground">Started following you</p>
            </div>
            <span className="text-xs text-muted-foreground">2m</span>
          </div>
          <div className="flex items-start gap-3 p-2 rounded-lg bg-muted/50">
            <Avatar className="h-8 w-8"><AvatarImage src="https://github.com/rauno.png" /><AvatarFallback>RV</AvatarFallback></Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium">Rauno</p>
              <p className="text-xs text-muted-foreground">Left a comment</p>
            </div>
            <span className="text-xs text-muted-foreground">1h</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full">Mark all as read</Button>
        </CardFooter>
      </Card>

      {/* Settings */}
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Email notifications</span>
            </div>
            <Button size="sm" variant="outline"><Settings className="mr-1 h-3 w-3" />Configure</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserPlus className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Team members</span>
            </div>
            <Button size="sm" variant="secondary"><Edit className="mr-1 h-3 w-3" />Manage</Button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trash2 className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">Delete account</span>
            </div>
            <Button size="sm" variant="destructiveOutline"><Trash2 className="mr-1 h-3 w-3" />Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
}