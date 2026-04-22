import { Avatar, AvatarImage, AvatarFallback } from "./Avatar"

export default {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
# Avatar

O \`Avatar\` é um componente que exibe a foto de perfil de um usuário ou uma representação visual (fallback) quando a imagem não está disponível.

## Anatomia do Componente

1. **\`<Avatar>\`**: Container principal que define o aspect ratio circular (1:1).
2. **\`<AvatarImage>\`**: Exibe a foto do usuário. Escondida automaticamente se \`src\` for vazio ou falhar.
3. **\`<AvatarFallback>\`**: Exibido quando a \`AvatarImage\` não carrega. Normalmente mostra as iniciais do usuário.

## Boas Práticas

### ✅ Faça
- Sempre forneça \`AvatarFallback\` com as iniciais do usuário como fallback.
- Use fotos de perfil quadradas (1:1) para melhor resultado visual.
- Defina altura/largura fixa no \`<Avatar>\` para garantir consistência visual.
- Use tamanhos consistentes: pequeno (h-8 w-8), médio (padrão), grande (h-16 w-16).

### ❌ Não Faça
- Não use Avatars sem fallback — se a imagem falhar, o usuário verá uma área vazia.
- Não use Avatars muito pequenos (menor que h-6) se o texto das iniciais for necessário.
- Não reliance em imagens externas sem fallbacks — conexões lentas podem deixar o Avatar em branco.

## Estados

| Estado | Comportamento |
|--------|---------------|
| **Loaded** | AvatarImage é exibida, AvatarFallback está oculto |
| **Error/Empty** | AvatarImage retorna \`null\`, AvatarFallback é exibido |
| **Loading** | AvatarFallback fica visível até a imagem carregar |

## Acessibilidade

- Forneça \`alt\` descritivo na \`AvatarImage\` (ex: "Foto de perfil de João Silva").
- Se usar apenas fallback, o texto deve ser legível e descritivo (não apenas "U" para "Usuário").
- O componente não requer roles específicos, mas é recomendado envolver em um \`aria-label\` se usado fora de contexto.

## Exemplo de Uso

\`\`\`tsx
import { Avatar, AvatarImage, AvatarFallback } from "@/components/shadcn/Avatar"

function UserAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/joao.png" alt="@joao" />
      <AvatarFallback>JS</AvatarFallback>
    </Avatar>
  )
}
\`\`\`
        `,
      },
    },
  },
}

export const AvatarPlayground = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const AvatarGallery = {
  render: () => (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Sizes</h2>
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className="text-xs">CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className="text-lg">CN</AvatarFallback>
          </Avatar>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Fallback Only</h2>
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">JD</AvatarFallback>
          </Avatar>
        </div>
      </section>
    </div>
  ),
}
