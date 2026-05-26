---
title: Feedback Capabilities
description: Workflow para notificar, alertar e indicar estado ao usuário
version: 1.0.0
updated: 2026-01-01
---

# Feedback Capabilities

## Skill Overview

Esta skill cobre tudo relacionado a comunicar estado ao usuário: notificações (toasts), alertas, badges, progress bars e estados de loading. Feedback é o contrato de confiança entre o sistema e o usuário — silêncio é ambiguidade.

## Toast — Notificações Breves

### Setup Obrigatório

Adicione o Toaster no root da aplicação:

```typescript
import { Toaster, toast } from "ds-onebox"

export function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      {/* resto da app */}
    </>
  )
}
```

### Toast Functions

O DS-OneBox exporta a função `toast` diretamente (estilo Sonner):

```typescript
import { toast } from "ds-onebox"

// Notificação simples
toast("Usuário salvo com sucesso!")

// Com título
toast.success("Operação concluída!", {
  description: "O usuário foi criado com sucesso.",
})

toast.error("Erro ao salvar", {
  description: "Verifique sua conexão e tente novamente.",
})

toast.warning("Atenção", {
  description: "Suas alterações ainda não foram salvas.",
})

toast.info("Dica", {
  description: "Use Ctrl+S para salvar rapidamente.",
})

// Com ação
toast("Mensagem enviada!", {
  action: {
    label: "Desfazer",
    onClick: () => undoMessage(),
  },
})

// Promise (auto-resolve)
toast.promise(saveUser(data), {
  loading: "Salvando...",
  success: "Usuário salvo!",
  error: "Erro ao salvar",
})
```

### Posições Disponíveis

```typescript
<Toaster position="top-left" />
<Toaster position="top-center" />
<Toaster position="top-right" /> {/* padrão */}
<Toaster position="bottom-left" />
<Toaster position="bottom-center" />
<Toaster position="bottom-right" />
```

### ToastMultiPosition — Múltiplas Posições

Para notificações em posições diferentes na mesma tela:

```typescript
import { ToastMultiPosition, toast } from "ds-onebox"

// Toast no topo direito
toast.success("Sucesso!", { position: "top-right" })

// Toast no centro inferior
toast.info("Atualizando...", { position: "bottom-center" })

// Toast no canto esquerdo
toast.warning("Atenção", { position: "top-left" })
```

### Regras de Toast

| Regra | Por quê |
|---|---|
| Máximo 3 toasts simultâneos | Mais que isso é spam |
| Duração: 3-5 segundos | Tempo suficiente para ler |
| Não abuse de `toast.error` | Se todo clique gera erro, o sistema parece quebrado |
| Use `toast.promise` para operações async | Mostra loading → success/error automaticamente |

### Antipatterns de Toast

```typescript
// ❌ ERRADO — toast dentro de loop
data.map(item => toast.success(`Item ${item.name} criado!`))

// ❌ ERRADO — toast antes da ação
toast.success("Deletando...")
await deleteItem() // se falhar, o toast já foi mostrado

// ✅ CERTO — toast.promise para async
toast.promise(deleteItem(id), {
  loading: "Deletando...",
  success: "Item deletado!",
  error: "Erro ao deletar",
})

// ✅ CERTO — toast após ação confirmada
const result = await deleteItem(id)
if (result.success) {
  toast.success("Item deletado!")
}
```

## Alert — Alertas Destacados

Use Alert para mensagens que devem PERMANECER na tela e chamar atenção:

```typescript
import { Alert, AlertTitle, AlertDescription } from "ds-onebox"

// Variants: default, destructive, success, warning
export function SettingsWarning() {
  return (
    <Alert variant="warning">
      <AlertTitle>Assinatura expira em 3 dias</AlertTitle>
      <AlertDescription>
        Renove sua assinatura para continuar usando todas as
        funcionalidades premium.
      </AlertDescription>
      <Button size="sm" className="mt-4">
        Renovar Agora
      </Button>
    </Alert>
  )
}
```

### Alert vs Toast

| Situação | Componente |
|---|---|
| Mensagem breve que desaparece | Toast |
| Mensagem que deve permanecer visível | Alert |
| Erro que afeta toda a página | Alert (topo da página) |
| Sucesso de ação pontual | Toast |
| Warning que requer ação | Alert + Button |

## Badge — Indicadores de Status

Badges são indicadores compactos. Use variants para comunicar significado:

```typescript
import { Badge } from "ds-onebox"

// Variants de cor comunican significado
<Badge variant="default">Pendente</Badge>    {/* tom neutro */}
<Badge variant="secondary">Rascunho</Badge>  {/* tom secundário */}
<Badge variant="outline">Inativo</Badge>    {/* outline sutil */}
<Badge variant="success">Ativo</Badge>       {/* verde — sucesso */}
<Badge variant="warning">Pendente</Badge>    {/* amarelo — atenção */}
<Badge variant="destructive">Erro</Badge>   {/* vermelho — erro/crítico */}
```

### Regras de Badge

**NUNCA invente significados para cores.** Se um Badge é `success` (verde), ele indica algo positivo/sucesso. Se é `destructive`, indica erro/perigo.

```typescript
// ❌ ERRADO — cor não comunica significado
<Badge variant="success">Pendente</Badge>
<Badge variant="destructive">Ativo</Badge>

// ✅ CERTO — cor comunica significado
<Badge variant="secondary">Pendente</Badge>
<Badge variant="success">Ativo</Badge>
<Badge variant="destructive">Erro</Badge>
```

## Progress — Indicadores de Progresso

### Progress Bar

```typescript
import { Progress } from "ds-onebox"

export function UploadProgress({ value }: { value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-body-sm">
        <span>Enviando arquivo...</span>
        <span>{value}%</span>
      </div>
      <Progress value={value} />
    </div>
  )
}
```

### Progress com Limites

Use Progress para operações que têm tempo definido. Para operações infinitas, use Skeleton.

```typescript
// ✅ CERTO — upload tem limite definido
<Progress value={uploadProgress} />

// ✅ CERTO — processamento tem limite
<Progress value={processingProgress} />

// ❌ ERRADO — websocket/sse não tem limite
<Progress value={0} /> {/* nunca chega a 100 */}
```

## Skeleton — Loading State

Use Skeleton em vez de Spinner quando quiser mostrar o layout que está carregando:

```typescript
import { Skeleton } from "ds-onebox"

export function UserCardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  )
}
```

### Skeleton vs Spinner

| Situação | Componente |
|---|---|
| Mostrar estrutura carregando | Skeleton |
| Ação em progresso (button desabilitado) | Spinner |
| Carregamento de página inteira | Skeleton |
| Loading inline (dentro de text) | Spinner |
| Tabela carregando | Skeleton com rows |

## CommandPalette — Busca e Atalhos

CommandPalette é uma busca rápida com atalhos (estilo Spotlight/Ctrl+K):

```typescript
import {
  CommandPalette,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from "ds-onebox"

export function GlobalSearch() {
  return (
    <CommandPalette>
      <CommandInput placeholder="Buscar usuários, comandos..." />
      <CommandList>
        <CommandGroup heading="Ações Rápidas">
          <CommandItem onSelect={() => navigate("/users/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Criar novo usuário
          </CommandItem>
          <CommandItem onSelect={() => navigate("/reports")}>
            <FileText className="mr-2 h-4 w-4" />
            Ver relatórios
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Usuários">
          {users.map(user => (
            <CommandItem
              key={user.id}
              onSelect={() => selectUser(user)}
            >
              {user.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandPalette>
  )
}
```

## ScrollArea — Área com Scroll Customizado

Para áreas com scroll estilizado:

```typescript
import { ScrollArea, ScrollBar } from "ds-onebox"

export function NotificationList() {
  return (
    <ScrollArea className="h-[300px] w-[350px] rounded-md border">
      <div className="p-4">
        {notifications.map(notification => (
          <NotificationItem key={notification.id} {...notification} />
        ))}
      </div>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
```

## Combo: Feedback Patterns

### Página de Sucesso

```typescript
export function UserCreatedPage({ user }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12">
      <div className="rounded-full bg-success-50 p-4">
        <CheckCircle className="h-12 w-12 text-success-500" />
      </div>
      <div className="text-center">
        <h1 className="text-h2">Usuário criado!</h1>
        <p className="text-body-md text-muted-foreground mt-2">
          {user.name} foi adicionado ao sistema.
        </p>
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => navigate("/users")}>
          Voltar para lista
        </Button>
        <Button onClick={() => navigate(`/users/${user.id}`)}>
          Ver detalhes
        </Button>
      </div>
    </div>
  )
}
```

### Página de Erro

```typescript
export function ErrorBoundary({ error }) {
  return (
    <Alert variant="destructive" className="max-w-md mx-auto mt-12">
      <AlertTitle>Algo deu errado</AlertTitle>
      <AlertDescription className="space-y-4">
        <p>{error.message || "Ocorreu um erro inesperado."}</p>
        <Button onClick={() => window.location.reload()}>
          Tentar novamente
        </Button>
      </AlertDescription>
    </Alert>
  )
}
```

### Empty State

```typescript
export function EmptyUsers() {
  return (
    <Card className="flex flex-col items-center justify-center py-12">
      <Users className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-h4 mb-2">Nenhum usuário encontrado</h3>
      <p className="text-body-sm text-muted-foreground mb-6">
        Comece adicionando seu primeiro usuário ao sistema.
      </p>
      <UserDialog>
        <DialogTrigger asChild>
          <Button><Plus className="mr-2 h-4 w-4" /> Adicionar Usuário</Button>
        </DialogTrigger>
      </UserDialog>
    </Card>
  )
}
```

## Checklist de Feedback

- [ ] Toast após toda ação de escrita (create, update, delete)?
- [ ] Loading state em botões durante operações async?
- [ ] Error state com mensagem clara quando algo falha?
- [ ] Empty state quando listas estão vazias?
- [ ] Skeleton em vez de Spinner para conteúdo carregando?
- [ ] Badge variants comunicam significado (success = bom, destructive = ruim)?
- [ ] Máximo 3 toasts simultâneos?
