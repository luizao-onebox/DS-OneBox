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
 * Usa a prop `data-state` do Radix UI para detectar o estado checked.
 * 
 * **Deve ser usado como filho direto ou indireto de um componente `<RadioGroup>`.**
 */
export const ExpandableRadioItem = React.forwardRef<
  HTMLDivElement,
  ExpandableRadioItemProps
>(({ className, value, id, label, badge, children, ...props }, ref) => {
  const radioId = id || `radio-${value}`
  const [isChecked, setIsChecked] = React.useState(false)
  const contentRef = React.useRef<HTMLDivElement>(null)

  return (
    <div
      ref={ref}
      className={cn(
        "group relative border-b border-border/60 last:border-0 transition-colors duration-200 ease-in-out",
        isChecked && "bg-slate-50/80",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <RadioGroupItem 
            value={value} 
            id={radioId}
            onCheckedChange={(checked) => {
              setIsChecked(checked === true)
            }}
          />
          <Label 
            htmlFor={radioId}
            className="cursor-pointer text-base font-medium"
          >
            {label}
          </Label>
        </div>

        <div className="flex items-center gap-3">
          {badge}
          {children && (
            <ChevronDown 
              className={cn(
                "h-5 w-5 text-muted-foreground transition-transform duration-200",
                isChecked && "rotate-180"
              )}
            />
          )}
        </div>
      </div>

      {children && (
        <div 
          ref={contentRef}
          className={cn(
            "overflow-hidden transition-all duration-200 ease-in-out",
            isChecked ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-4 pb-4">
            {children}
          </div>
        </div>
      )}
    </div>
  )
})

ExpandableRadioItem.displayName = "ExpandableRadioItem"
