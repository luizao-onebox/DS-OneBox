import * as React from "react"
import { cn } from "../../lib/utils"

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A orientação da linha separadora */
  orientation?: "horizontal" | "vertical"
  /** Se true, o separador é puramente visual e ignorado por leitores de tela */
  decorative?: boolean
}

/**
 * @description
 * Linha visual para separar conteúdos.
 * 
 * **REGRAS PARA A IA:**
 * - Use para dividir seções longas em Cards, Dropdowns ou Layouts principais.
 * - Para separadores horizontais, a altura padrão é de 1px. Para separadores verticais, a largura é de 1px.
 * - Se você usar `orientation="vertical"`, lembre-se que o elemento pai precisa ter uma altura definida (ex: `h-5` ou `h-full`).
 */
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation === "horizontal" ? "horizontal" : "vertical"}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = "Separator"

export { Separator }
