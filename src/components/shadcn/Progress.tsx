import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-2",
        default: "h-4",
        lg: "h-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  value?: number
  indicatorClassName?: string
  variant?: "default" | "gradient"
}

// Função auxiliar para calcular a cor do gradiente baseado no valor
function getGradientStyle(value: number) {
  if (value < 33) {
    return "bg-gradient-to-r from-emerald-400 to-emerald-500"
  }
  if (value < 66) {
    return "bg-gradient-to-r from-emerald-400 to-amber-400"
  }
  return "bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500"
}

/**
 * @description
 * Barra de progresso para indicar andamento de tarefas.
 * 
 * **REGRAS PARA A IA:**
 * - Passe `value={x}` para definir o progresso (onde `x` é de 0 a 100).
 * - A largura do elemento `ProgressIndicator` preencherá automaticamente com base no `value` definido.
 * - Use `size` para alterar a altura (sm, default, lg).
 * - Use `variant="gradient"` para a variação automática de cores baseada no risco.
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, size, variant = "default", indicatorClassName, ...props }, ref) => {
  const gradientClass = variant === "gradient" && value !== undefined ? getGradientStyle(value) : ""

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressVariants({ size }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full transition-all duration-500 ease-in-out",
          variant === "default" ? "bg-primary" : gradientClass,
          indicatorClassName
        )}
        style={{ width: `${value || 0}%` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
