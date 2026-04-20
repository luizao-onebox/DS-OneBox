import * as React from "react"
import { cn } from "../../lib/utils"
import { AlertCircle } from "lucide-react"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Se true, marca a textarea visualmente com erro (borda vermelha e icone) */
  hasError?: boolean
}

/**
 * @description
 * Campo de entrada para textos longos (multiline).
 * 
 * **REGRAS PARA A IA:**
 * - Use para biografias, descrições longas ou mensagens.
 * - Sempre que o campo falhar em validação de formulário, use a prop `hasError={true}`.
 * - Evite usar `resize-none` a menos que seja explicitamente solicitado pelo design.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError = false, ...props }, ref) => {
    
    if (hasError) {
      return (
        <div className="relative w-full">
          <textarea
            className={cn(
              "flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 pr-9 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
              "border-destructive ring-destructive focus-visible:ring-destructive",
              className
            )}
            ref={ref}
            {...props}
          />
          <div className="absolute right-3 top-3 pointer-events-none">
            <AlertCircle className="h-4 w-4 text-destructive" />
          </div>
        </div>
      )
    }

    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
