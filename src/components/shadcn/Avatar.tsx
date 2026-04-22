import * as React from "react"
import { cn } from "../../lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}
export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * @description
 * Componente visual de Avatar circular (foto de perfil) com fallback.
 * 
 * **REGRAS PARA A IA:**
 * - A estrutura deve ser sempre `<Avatar><AvatarImage src="..." /><AvatarFallback>XX</AvatarFallback></Avatar>`.
 * - Se a imagem falhar ao carregar ou não existir, o `AvatarFallback` será renderizado (coloque as iniciais do usuário nele).
 * - Para mudar o tamanho, passe classes de altura e largura (ex: `className="h-16 w-16"`) no componente pai `<Avatar>`.
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
)
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, ...props }, ref) => {
    const [error, setError] = React.useState(false)

    if (!src || error) return null

    return (
      <img
        ref={ref}
        src={src}
        onError={() => setError(true)}
        className={cn("absolute inset-0 aspect-square h-full w-full object-cover z-10", className)}
        {...props}
      />
    )
  }
)
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium z-0",
        className
      )}
      {...props}
    />
  )
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
