import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "../../lib/utils"

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number
  indicatorClassName?: string
}

/**
 * @description
 * Barra de progresso para indicar andamento de tarefas.
 * 
 * **REGRAS PARA A IA:**
 * - Passe `value={x}` para definir o progresso (onde `x` é de 0 a 100).
 * - A largura do elemento `ProgressIndicator` preencherá automaticamente com base no `value` definido.
 * - Passe `indicatorClassName` para alterar a cor ou aplicar gradientes ao preenchimento.
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn("h-full bg-primary transition-all duration-500 ease-in-out", indicatorClassName)}
      style={{ width: `${value || 0}%` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
