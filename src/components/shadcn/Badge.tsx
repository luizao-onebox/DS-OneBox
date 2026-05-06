import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center border text-label-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
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
      { variant: "solid", color: "neutral", className: "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/80 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/80" },
      { variant: "solid", color: "primary", className: "bg-primary-500 text-primary-50 hover:bg-primary-500/80" },
      { variant: "solid", color: "success", className: "bg-success-500 text-success-50 hover:bg-success-500/80" },
      { variant: "solid", color: "warning", className: "bg-warning-500 text-warning-950 hover:bg-warning-500/80" },
      { variant: "solid", color: "destructive", className: "bg-destructive-500 text-destructive-50 hover:bg-destructive-500/80" },
      { variant: "solid", color: "info", className: "bg-info-500 text-info-50 hover:bg-info-500/80" },
      { variant: "solid", color: "indigo", className: "bg-indigo-500 text-indigo-50 hover:bg-indigo-500/80" },
      { variant: "solid", color: "purple", className: "bg-purple-500 text-purple-50 hover:bg-purple-500/80" },
      { variant: "solid", color: "pink", className: "bg-pink-500 text-pink-50 hover:bg-pink-500/80" },
      
      // Soft Variants (As requested by the images)
      { variant: "soft", color: "neutral", className: "bg-neutral-100 text-neutral-800 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700" },
      { variant: "soft", color: "primary", className: "bg-primary-100 text-primary-800 hover:bg-primary-200 dark:bg-primary-900 dark:text-primary-300 dark:hover:bg-primary-800" },
      { variant: "soft", color: "success", className: "bg-success-100 text-success-800 hover:bg-success-200 dark:bg-success-900 dark:text-success-300 dark:hover:bg-success-800" },
      { variant: "soft", color: "warning", className: "bg-warning-100 text-warning-800 hover:bg-warning-200 dark:bg-warning-900 dark:text-warning-300 dark:hover:bg-warning-800" },
      { variant: "soft", color: "destructive", className: "bg-destructive-100 text-destructive-800 hover:bg-destructive-200 dark:bg-destructive-900 dark:text-destructive-300 dark:hover:bg-destructive-800" },
      { variant: "soft", color: "info", className: "bg-info-100 text-info-800 hover:bg-info-200 dark:bg-info-900 dark:text-info-300 dark:hover:bg-info-800" },
      { variant: "soft", color: "indigo", className: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-800" },
      { variant: "soft", color: "purple", className: "bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800" },
      { variant: "soft", color: "pink", className: "bg-pink-100 text-pink-800 hover:bg-pink-200 dark:bg-pink-900 dark:text-pink-300 dark:hover:bg-pink-800" },

      // Outline Variants
      { variant: "outline", color: "neutral", className: "border-neutral-200 text-neutral-800 dark:border-neutral-800 dark:text-neutral-300" },
      { variant: "outline", color: "primary", className: "border-primary-200 text-primary-800 dark:border-primary-800 dark:text-primary-300" },
      { variant: "outline", color: "success", className: "border-success-200 text-success-800 dark:border-success-800 dark:text-success-300" },
      { variant: "outline", color: "warning", className: "border-warning-200 text-warning-800 dark:border-warning-800 dark:text-warning-300" },
      { variant: "outline", color: "destructive", className: "border-destructive-200 text-destructive-800 dark:border-destructive-800 dark:text-destructive-300" },
      { variant: "outline", color: "info", className: "border-info-200 text-info-800 dark:border-info-800 dark:text-info-300" },
      { variant: "outline", color: "indigo", className: "border-indigo-200 text-indigo-800 dark:border-indigo-800 dark:text-indigo-300" },
      { variant: "outline", color: "purple", className: "border-purple-200 text-purple-800 dark:border-purple-800 dark:text-purple-300" },
      { variant: "outline", color: "pink", className: "border-pink-200 text-pink-800 dark:border-pink-800 dark:text-pink-300" },
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
