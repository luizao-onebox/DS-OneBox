import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        destructiveOutline: "border border-destructive text-destructive hover:bg-destructive/10",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Propriedades do Botão do Design System da OneBox.
 * 
 * @interface ButtonProps
 * @extends React.ButtonHTMLAttributes<HTMLButtonElement>
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Ícone da biblioteca `lucide-react`.
   * @example <Button icon={Mail} />
   */
  icon?: React.ComponentType<any>
  /**
   * Posição do ícone em relação ao texto do botão.
   * Padrão é 'left'.
   */
  iconPosition?: "left" | "right"
  /**
   * Use true para forçar o botão como um elemento HTML <a> caso use 'asChild' no futuro.
   * (Neste componente simplificado, atua como prop padrão de extensão)
   */
  asChild?: boolean
}

/**
 * @description
 * Botão Principal da OneBox.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre use a variante 'destructive' APENAS para exclusões e alertas severos.
 * - Use 'outline' ou 'secondary' como botão de cancelamento/secundário ao lado de um botão 'default'.
 * - Não use dois botões 'default' juntos na mesma linha.
 * - Para criar um botão apenas com ícone (Icon Button), passe a propriedade `size="icon"`.
 * 
 * @example
 * ```tsx
 * import { Button } from "@/components/shadcn"
 * import { Save } from "lucide-react"
 * 
 * <Button variant="default" icon={Save}>Salvar Configurações</Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, icon, iconPosition = "left", asChild = false, children, ...props }, ref) => {
    const iconSize = size === "sm" || size === "icon-sm" ? "h-3 w-3" : size === "lg" || size === "icon-lg" ? "h-5 w-5" : "h-4 w-4"
    
    // Se não há children (apenas ícone), removemos a margem para ficar centralizado
    const hasChildren = React.Children.count(children) > 0;
    const iconMargin = !hasChildren ? "" : iconPosition === "left" ? "mr-2" : "ml-2"

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon && iconPosition === "left" && React.createElement(icon, { className: cn(iconSize, iconMargin) })}
        {children}
        {icon && iconPosition === "right" && React.createElement(icon, { className: cn(iconSize, iconMargin) })}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
