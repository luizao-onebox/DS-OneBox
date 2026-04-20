import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        destructiveOutline: 
          "border border-destructive text-destructive hover:bg-destructive/10",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** 
   * Se true, o botão renderizará seu filho (child) como elemento principal.
   * Útil para estilizar componentes <Link> como botões.
   */
  asChild?: boolean
  /** 
   * Exibe um spinner de carregamento e desabilita o botão temporariamente.
   */
  isLoading?: boolean
  /**
   * Ícone da biblioteca `lucide-react`.
   * @deprecated Prefira compor ícones diretamente no `children` (ex: <Button><Mail className="mr-2 h-4 w-4" /> Email</Button>)
   */
  icon?: React.ComponentType<any>
  /**
   * Posição do ícone antigo. Padrão é 'left'.
   * @deprecated
   */
  iconPosition?: "left" | "right"
}

/**
 * @description
 * Botão Principal da OneBox.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre use a variante 'destructive' APENAS para exclusões e alertas severos.
 * - Use 'outline' ou 'secondary' como botão de cancelamento/secundário ao lado de um botão 'default'.
 * - Não use dois botões 'default' juntos na mesma linha.
 * - Para ícones, insira o ícone do `lucide-react` dentro do componente com a classe `mr-2 h-4 w-4` (se for à esquerda).
 * - Se precisar de um estado de salvamento/carregamento, apenas passe a prop `isLoading={true}`.
 * - Para usar com roteadores (Next.js, React Router), passe a prop `asChild` e coloque o `<Link>` dentro.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, icon, iconPosition = "left", children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Suporte legado à prop `icon` antiga para retrocompatibilidade
    const iconSizeClass = size === "sm" || size === "icon-sm" ? "h-3 w-3" : size === "lg" || size === "icon-lg" ? "h-5 w-5" : "h-4 w-4"
    const hasChildren = React.Children.count(children) > 0;
    const iconMarginClass = !hasChildren ? "" : iconPosition === "left" ? "mr-2" : "ml-2"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 className={cn("animate-spin", hasChildren ? "mr-2" : "", iconSizeClass)} />
        )}
        
        {!isLoading && icon && iconPosition === "left" && 
          React.createElement(icon, { className: cn(iconSizeClass, iconMarginClass) })
        }
        
        {children}
        
        {!isLoading && icon && iconPosition === "right" && 
          React.createElement(icon, { className: cn(iconSizeClass, iconMarginClass) })
        }
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
