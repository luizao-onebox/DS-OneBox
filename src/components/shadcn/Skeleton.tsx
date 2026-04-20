import * as React from "react"
import { cn } from "../../lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * @description
 * Placeholder visual usado durante o carregamento de conteúdo.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre que uma página ou componente buscar dados de uma API, implemente um Skeleton que tenha o mesmo formato do conteúdo final.
 * - Use as classes de altura (h) e largura (w) do Tailwind para modelar o Skeleton. Ex: `className="h-4 w-[250px]"`
 * - Para simular um avatar circular, use `className="h-12 w-12 rounded-full"`.
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
)
Skeleton.displayName = "Skeleton"

export { Skeleton }
