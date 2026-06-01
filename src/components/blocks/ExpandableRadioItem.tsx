import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"
import { RadioGroupItem } from "../shadcn/RadioGroup"
import { Label } from "../shadcn/Label"

export interface ExpandableRadioItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Valor do radio item submetido no RadioGroup pai */
  value: string
  /** Rótulo principal exibido */
  label: string
  /** Elemento opcional para exibir uma tag/badge ao lado do rótulo */
  badge?: React.ReactNode
}

/**
 * @description
 * Um item de RadioGroup que expande um conteúdo extra quando selecionado.
 * Usa Tailwind `has-[[data-state=checked]]` para animar e exibir o conteúdo 
 * sem precisar de estado React ou Contexto.
 * 
 * **Deve ser usado como filho direto ou indireto de um componente `<RadioGroup>`.**
 */
export const ExpandableRadioItem = React.forwardRef<
  HTMLDivElement,
  ExpandableRadioItemProps
>(({ className, value, id, label, badge, children, ...props }, ref) => {
  const radioId = id || `radio-${value}`

  return (
    <div
      ref={ref}
      className={cn(
        "group relative border-b border-border/60 last:border-0 transition-colors duration-200 ease-in-out has-[[data-state=checked]]:bg-slate-50/80 has-[[data-state=checked]]:border-transparent",
        className
      )}
      {...props}
    >
      <Label 
        htmlFor={radioId}
        className="flex items-center justify-between p-4 cursor-pointer group-has-[[data-state=checked]]:pb-2"
      >
        <div className="flex items-center gap-3">
          <RadioGroupItem 
            value={value} 
            id={radioId}
          />
          <span className="text-base font-medium">{label}</span>
        </div>

        <div className="flex items-center gap-3">
          {badge}
          {children && (
            <ChevronDown 
              className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-has-[[data-state=checked]]:rotate-180"
            />
          )}
        </div>
      </Label>

      {children && (
        <div className="hidden group-has-[[data-state=checked]]:block px-4 pb-4 animate-in fade-in-0 slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  )
})

ExpandableRadioItem.displayName = "ExpandableRadioItem"
