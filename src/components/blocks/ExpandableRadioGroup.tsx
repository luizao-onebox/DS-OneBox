import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"
import { RadioGroup, RadioGroupItem } from "../shadcn/RadioGroup"
import { Label } from "../shadcn/Label"

export interface ExpandableRadioOption {
  /** Identificador único para a opção */
  id: string
  /** Valor submetido quando esta opção é selecionada */
  value: string
  /** Rótulo principal exibido */
  label: string
  /** Propriedades opcionais para exibir uma tag/badge ao lado do rótulo */
  badge?: {
    text: string
    className?: string
  }
  /** Conteúdo renderizado quando a opção é selecionada (expande para mostrar) */
  content?: React.ReactNode
}

export interface ExpandableRadioGroupProps extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroup>, "children"> {
  /** Lista de opções a serem renderizadas */
  options: ExpandableRadioOption[]
}

/**
 * @description
 * Um RadioGroup em que cada opção pode expandir um conteúdo extra quando selecionada.
 * Muito útil para listas de seleção que exigem ações secundárias ou configurações extras.
 */
export const ExpandableRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroup>,
  ExpandableRadioGroupProps
>(({ className, options, value, onValueChange, ...props }, ref) => {
  // Mantemos o estado local caso não seja controlado, para animar a expansão
  const [localValue, setLocalValue] = React.useState<string | undefined>(props.defaultValue)
  
  const currentValue = value !== undefined ? value : localValue

  const handleValueChange = (val: string) => {
    setLocalValue(val)
    if (onValueChange) {
      onValueChange(val)
    }
  }

  return (
    <RadioGroup
      ref={ref}
      value={currentValue}
      onValueChange={handleValueChange}
      className={cn("flex flex-col gap-0", className)}
      {...props}
    >
      {options.map((option, index) => {
        const isSelected = currentValue === option.value
        const hasBorderBottom = index !== options.length - 1

        return (
          <div
            key={option.id}
            className={cn(
              "transition-colors duration-200 ease-in-out",
              isSelected ? "bg-slate-50/80" : "bg-transparent",
              hasBorderBottom && !isSelected && "border-b border-border/60"
            )}
          >
            <div 
              className={cn(
                "flex items-center justify-between p-4 cursor-pointer",
                isSelected && "pb-2"
              )}
              onClick={() => handleValueChange(option.value)}
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem 
                  value={option.value} 
                  id={option.id}
                  // Evita duplo disparo pois a div pai já cuida do clique
                  onClick={(e) => e.stopPropagation()} 
                />
                <Label 
                  htmlFor={option.id} 
                  className="cursor-pointer text-base font-medium"
                  onClick={(e) => e.stopPropagation()}
                >
                  {option.label}
                </Label>
              </div>

              <div className="flex items-center gap-3">
                {option.badge && (
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs font-medium rounded-md whitespace-nowrap",
                      option.badge.className
                    )}
                  >
                    {option.badge.text}
                  </span>
                )}
                {option.content && (
                  <ChevronDown 
                    className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform duration-200",
                      isSelected && "rotate-180"
                    )} 
                  />
                )}
              </div>
            </div>

            {isSelected && option.content && (
              <div className="px-4 pb-4 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                {option.content}
              </div>
            )}
          </div>
        )
      })}
    </RadioGroup>
  )
})

ExpandableRadioGroup.displayName = "ExpandableRadioGroup"
