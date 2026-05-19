import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center border text-label-sm",
  {
    variants: {
      variant: {
        solid: "border-transparent shadow-sm",
        soft: "border-transparent",
        outline: "bg-transparent",
      },
      color: {
        neutral: "",
        primary: "",
        success: "",
        warning: "",
        destructive: "",
        info: "",
        indigo: "",
        purple: "",
        pink: "",
      },
      size: {
        default: "px-2.5 py-0.5 rounded-md",
        pill: "px-3 py-1 rounded-full",
        icon: "h-6 w-6 rounded-full p-0",
      },
    },
    compoundVariants: [
      // Solid Variants
      { variant: "solid", color: "neutral", className: "bg-neutral-900 text-neutral-50" },
      { variant: "solid", color: "primary", className: "bg-primary-500 text-white" },
      { variant: "solid", color: "success", className: "bg-success-500 text-white" },
      { variant: "solid", color: "warning", className: "bg-warning-500 text-white" },
      { variant: "solid", color: "destructive", className: "bg-destructive-500 text-white" },
      { variant: "solid", color: "info", className: "bg-info-500 text-white" },
      { variant: "solid", color: "indigo", className: "bg-indigo-500 text-white" },
      { variant: "solid", color: "purple", className: "bg-purple-500 text-white" },
      { variant: "solid", color: "pink", className: "bg-pink-500 text-white" },

      // Soft Variants
      { variant: "soft", color: "neutral", className: "bg-neutral-100 text-neutral-800" },
      { variant: "soft", color: "primary", className: "bg-primary-100 text-primary-800" },
      { variant: "soft", color: "success", className: "bg-success-100 text-success-800" },
      { variant: "soft", color: "warning", className: "bg-warning-100 text-warning-800" },
      { variant: "soft", color: "destructive", className: "bg-destructive-100 text-destructive-800" },
      { variant: "soft", color: "info", className: "bg-info-100 text-info-800" },
      { variant: "soft", color: "indigo", className: "bg-indigo-100 text-indigo-800" },
      { variant: "soft", color: "purple", className: "bg-purple-100 text-purple-800" },
      { variant: "soft", color: "pink", className: "bg-pink-100 text-pink-800" },

      // Outline Variants
      { variant: "outline", color: "neutral", className: "border-neutral-200 text-neutral-800" },
      { variant: "outline", color: "primary", className: "border-primary-200 text-primary-800" },
      { variant: "outline", color: "success", className: "border-success-200 text-success-800" },
      { variant: "outline", color: "warning", className: "border-warning-200 text-warning-800" },
      { variant: "outline", color: "destructive", className: "border-destructive-200 text-destructive-800" },
      { variant: "outline", color: "info", className: "border-info-200 text-info-800" },
      { variant: "outline", color: "indigo", className: "border-indigo-200 text-indigo-800" },
      { variant: "outline", color: "purple", className: "border-purple-200 text-purple-800" },
      { variant: "outline", color: "pink", className: "border-pink-200 text-pink-800" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "neutral",
      size: "default",
    },
  }
)

export interface BadgeProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, 
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
  ({ className, variant, color, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp ref={ref} className={cn(badgeVariants({ variant, color, size }), className)} {...props}>
        {children}
      </Comp>
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
