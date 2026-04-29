import * as React from "react"
import { cn } from "../../lib/utils"
import { AlertCircle } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Se true, marca o input visualmente com erro (borda vermelha e icone) */
  hasError?: boolean
  /** Ícone ou elemento para ser renderizado à esquerda do texto */
  leftIcon?: React.ReactNode
  /** Ícone ou elemento para ser renderizado à direita do texto */
  rightIcon?: React.ReactNode
}

/**
 * @description
 * Campo de entrada de texto principal.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre que um campo for inválido após submit, use a prop `hasError={true}`. Não injete 'border-destructive' manualmente.
 * - Para campos de busca, passe `leftIcon={<Search className="h-4 w-4" />}`.
 * - Para revelar senhas, use o `rightIcon` e passe um botão.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError = false, leftIcon, rightIcon, ...props }, ref) => {
    
    // Se tem ícones ou erro, precisamos envolver o input em um container relativo
    if (leftIcon || rightIcon || hasError) {
      return (
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 text-muted-foreground flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon ? "pl-9" : "",
              rightIcon || hasError ? "pr-9" : "",
              hasError 
                ? "border-destructive ring-destructive focus-visible:ring-destructive" 
                : "border-input focus-visible:ring-ring",
              className
            )}
            ref={ref}
            {...props}
          />

          {(rightIcon || hasError) && (
            <div className={cn(
              "absolute right-3 flex items-center", 
              !rightIcon ? "pointer-events-none" : ""
            )}>
              {hasError && !rightIcon ? (
                <AlertCircle className="h-4 w-4 text-destructive" />
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
