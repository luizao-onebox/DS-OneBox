---
title: Form Capabilities
description: Workflow completo para criar formulários com validação, estados e composição
version: 1.0.0
updated: 2026-01-01
---

# Form Capabilities

## Skill Overview

Todo formulário no DS-OneBox deve seguir este workflow. Não use formulários sem validação, sem estados de loading, ou sem feedback de erro. O DS-OneBox fornece toda a infraestrutura para criar formulários profissionais.

## Quando Usar

- Coleta de dados do usuário (login, cadastro, settings)
- Filtros de busca com múltiplos critérios
- Criação/edição de entidades (CRUD)
- Qualquer input que precise ser validado antes de submit

## Quando NÃO Usar

- Busca simples com um único campo → use Input + CommandPalette
- Toggle de preferência simples → use Switch isolado
- Seleção de data única → use DatePicker isolado

## Stack Obrigatória

O DS-OneBox sempre usa esta stack para formulários:

```
┌─────────────────────────────────────────┐
│            Form (wrapper)               │
│  ┌─────────────────────────────────┐   │
│  │     React Hook Form (RHF)        │   │
│  │  ┌───────────────────────────┐  │   │
│  │  │     Zod Schema            │  │   │
│  │  │  (validação + tipagem)    │  │   │
│  │  └───────────────────────────┘  │   │
│  │  ┌───────────────────────────┐  │   │
│  │  │     FormField + Input     │  │   │
│  │  │  (cada campo do form)     │  │   │
│  │  └───────────────────────────┘  │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

Nunca substitua Zod por Yup, Joi, ou validação manual.
Nunca substitua RHF por useState + onChange.

## Workflow Passo a Passo

### Passo 1: Definir o Schema Zod

Crie o schema ANTES de qualquer coisa:

```typescript
import { z } from "zod"

export const userFormSchema = z.object({
  name: z
    .string()
    .min(2, "Nome precisa ter pelo menos 2 caracteres")
    .max(50, "Nome muito longo"),
  email: z
    .string()
    .email("Email inválido"),
  age: z
    .number()
    .min(18, "Must be at least 18")
    .optional(),
  role: z
    .enum(["admin", "user", "guest"], {
      required_error: "Selecione um cargo",
    }),
  password: z
    .string()
    .min(8, "Senha precisa de pelo menos 8 caracteres")
    .regex(/[A-Z]/, "Deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "Deve conter pelo menos um número"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
})

export type UserFormSchema = z.infer<typeof userFormSchema>
```

### Passo 2: Criar o Form com RHF

```typescript
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userFormSchema, type UserFormSchema } from "./schemas"

export function CreateUserForm() {
  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      role: "user",
    },
  })

  function onSubmit(data: UserFormSchema) {
    console.log(data)
    toast.success("Usuário criado com sucesso!")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Seu nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="seu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Salvando..." : "Criar Usuário"}
        </Button>
      </form>
    </Form>
  )
}
```

### Passo 3: Estados Obrigatórios do Form

Todo form deve ter pelo menos estes estados:

| Estado | Como Detectar | O Que Fazer |
|---|---|---|
| isSubmitting | `form.formState.isSubmitting` | Desabilitar submit, mostrar spinner |
| isSubmitted | `form.formState.isSubmitted` | Reset button aparece |
| isDirty | `form.formState.isDirty` | Warn antes de sair |
| isValid | `form.formState.isValid` | Habilitar submit só quando válido |
| errors | `form.formState.errors` | Mostrar FormMessage em cada campo |

```typescript
// Exemplo completo de estados
<Button
  type="submit"
  disabled={
    form.formState.isSubmitting ||
    (!form.formState.isValid && form.formState.submitCount > 0)
  }
>
  {form.formState.isSubmitting && <Spinner className="mr-2" />}
  {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
</Button>
```

### Passo 4: Feedback de Sucesso/Erro

SEMPRE mostre toast após submit:

```typescript
async function onSubmit(data: UserFormSchema) {
  try {
    await createUser(data)
    toast.success("Usuário criado com sucesso!")
    form.reset()
  } catch (error) {
    toast.error("Erro ao criar usuário. Tente novamente.")
  }
}
```

## Composição com Outros Componentes

### Form + Select

```typescript
<FormField
  control={form.control}
  name="role"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Cargo</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um cargo" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectItem value="admin">Administrador</SelectItem>
          <SelectItem value="user">Usuário</SelectItem>
          <SelectItem value="guest">Convidado</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Form + DatePicker

```typescript
<FormField
  control={form.control}
  name="birthDate"
  render={({ field }) => (
    <FormItem className="flex flex-col">
      <FormLabel>Data de Nascimento</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              className={
                !field.value ? "text-muted-foreground" : ""
              }
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <DatePicker
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )}
/>
```

### Form + Checkbox

```typescript
<FormField
  control={form.control}
  name="terms"
  render={({ field }) => (
    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
      <FormControl>
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      </FormControl>
      <div className="space-y-1 leading-none">
        <FormLabel>
          Accept terms and conditions
        </FormLabel>
        <FormDescription>
          Você concorda com nossos termos de serviço.
        </FormDescription>
        <FormMessage />
      </div>
    </FormItem>
  )}
/>
```

### Form + Combobox

```typescript
<FormField
  control={form.control}
  name="country"
  render={({ field }) => (
    <FormItem>
      <FormLabel>País</FormLabel>
      <FormControl>
        <Combobox
          options={countryOptions}
          value={field.value}
          onValueChange={field.onChange}
          placeholder="Buscar país..."
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

## PasswordStrength — Composable

Para campos de senha, use PasswordStrength junto com validação Zod:

```typescript
<FormField
  control={form.control}
  name="password"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Senha</FormLabel>
      <FormControl>
        <Input type="password" {...field} />
      </FormControl>
      <PasswordStrength password={field.value} />
      <FormMessage />
    </FormItem>
  )}
/>
```

## DatePicker — Custom Dropdown

O DatePicker usa react-day-picker v9. Para substituir o select nativo:

```typescript
<DatePicker
  selected={date}
  onSelect={setDate}
  components={{
    Dropdown: ({ value, onChange, options }) => (
      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options?.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  }}
/>
```

## Antipatterns — O Que NÃO Fazer

### ❌ NÃO use Input sem FormField
```typescript
// ERRADO
<input
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// CERTO
<FormField name="name" render={({ field }) => (
  <Input {...field} />
)} />
```

### ❌ NÃO valide no onChange
```typescript
// ERRADO
<Input onChange={(e) => {
  if (e.target.value.length < 2) return
  setName(e.target.value)
}} />

// CERTO — deixe o Zod validar no submit
```

### ❌ NÃO mostre erros inline SEM FormMessage
```typescript
// ERRADO
<Input />
{errors.name && <span className="text-red-500">{errors.name.message}</span>}

// CERTO
<FormField ...>
  <FormControl><Input {...field} /></FormControl>
  <FormMessage />
</FormField>
```

### ❌ NÃO use useState para todo form state
```typescript
// ERRADO
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [loading, setLoading] = useState(false)

// CERTO
const form = useForm()
const { isSubmitting } = form.formState
```

## Extensões Futuras

- `FormSection`: agrupar campos com título
- `FormArray`: campos dinâmicos (adicionar/remover items)
- `FormAsyncValidation`: validação async (ex: verificar email disponível)
