import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        destructiveOutline: "border border-destructive text-destructive hover:bg-destructive/10",
        outline: "text-foreground",
        success: "border-transparent bg-success text-success-foreground shadow hover:bg-success/80",
        warning: "border-transparent bg-warning text-warning-foreground shadow hover:bg-warning/80",
        info: "border-transparent bg-info text-info-foreground shadow hover:bg-info/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps 
  extends React.HTMLAttributes<HTMLDivElement>, 
    VariantProps<typeof badgeVariants> {
  /** 
   * Se true, o badge renderizará seu filho (child) como elemento principal.
   * Útil para estilizar componentes <Link> ou <a> como badges clicáveis.
   */
  asChild?: boolean
}

/**
 * @description
 * Badge para exibir status, contadores ou rótulos pequenos.
 * 
 * **REGRAS PARA A IA:**
 * - Use 'destructive' para erros, 'success' para sucesso, 'warning' para alertas.
 * - Use 'secondary' ou 'outline' para tags neutras ou filtros selecionados.
 * - Para criar um badge clicável, use `asChild` e coloque a tag `<a>` dentro.
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp ref={ref} className={cn(badgeVariants({ variant }), className)} {...props}>
        {children}
      </Comp>
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
