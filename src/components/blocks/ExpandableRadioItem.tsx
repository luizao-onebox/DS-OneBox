import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"
import { RadioGroupItem } from "../shadcn/RadioGroup"
import { Label } from "../shadcn/Label"

const ExpandableRadioContext = React.createContext<string | undefined>(undefined)

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
 * Deve ser usado como filho de um `<RadioGroup>`.
 * 
 * **REGRAS PARA A IA:**
 * - Envolva em um `<RadioGroup>` com valor controlado ou defaultValue.
 * - Cada item precisa de um `value` único.
 * - Passe `children` para o conteúdo que expandirá.
 */
export const ExpandableRadioItem = React.forwardRef<
  HTMLDivElement,
  ExpandableRadioItemProps
>(({ className, value, id, label, badge, children, ...props }, ref) => {
  const radioId = id || `radio-${value}`
  const selectedValue = React.useContext(ExpandableRadioContext)
  const isChecked = selectedValue === value

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
      <div className={cn("flex items-center justify-between p-4", isChecked && "pb-2")}>
        <div className="flex items-center gap-3">
          <RadioGroupItem value={value} id={radioId} />
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

export interface ExpandableRadioGroupProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupItem>, "children"> {
  /** Lista de itens expansíveis */
  children: React.ReactNode
}

/**
 * Wrapper que conecta o contexto do RadioGroup com os ExpandableRadioItems.
 * Use este componente no lugar de RadioGroup quando precisar de itens expansíveis.
 */
export const ExpandableRadioGroup = React.forwardRef<
  HTMLDivElement,
  ExpandableRadioGroupProps
>(({ children, value, defaultValue, onValueChange, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = value !== undefined ? value : internalValue

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue)
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  return (
    <RadioGroup 
      ref={ref}
      value={currentValue} 
      onValueChange={handleValueChange}
      className="flex flex-col"
      {...props}
    >
      <ExpandableRadioContext.Provider value={currentValue}>
        {children}
      </ExpandableRadioContext.Provider>
    </RadioGroup>
  )
})

ExpandableRadioGroup.displayName = "ExpandableRadioGroup"
