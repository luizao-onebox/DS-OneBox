import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

export interface Step {
  title: string
  description?: string
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep: number
  orientation?: "horizontal" | "vertical"
}

export function Stepper({
  steps,
  currentStep,
  orientation = "horizontal",
  className,
  ...props
}: StepperProps) {
  if (orientation === "horizontal") {
    return (
      <div className={cn("w-full flex flex-col", className)} {...props}>
        {/* Camada superior: Bolinhas e Linhas conectoras */}
        <div className="flex items-center w-full">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep

            return (
              <React.Fragment key={`indicator-${index}`}>
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 font-semibold text-body-sm shrink-0 transition-colors bg-background",
                      isCompleted
                        ? "border-primary bg-primary text-primary-foreground"
                        : isCurrent
                        ? "border-primary text-primary"
                        : "border-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                </div>

                {/* Linha conectora */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-[2px] transition-colors mx-2",
                      index < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Camada inferior: Textos alinhados sob as bolinhas */}
        <div className="flex items-start w-full mt-3">
          {steps.map((step, index) => {
            const isCurrent = index === currentStep
            
            return (
              <div 
                key={`text-${index}`} 
                className={cn(
                  "flex flex-col items-center text-center",
                  // Usa flex-1 e ajusta a margem para distribuir o texto embaixo dos círculos.
                  // Se for o primeiro, alinha à esquerda. Se for o último, alinha à direita.
                  index === 0 ? "w-1/4 items-start text-left" : 
                  index === steps.length - 1 ? "w-1/4 items-end text-right" : "flex-1"
                )}
              >
                {/* 
                  Gambiarra elegante: forçamos o container de texto do meio a ter o mesmo centro
                  que a bolinha. Para o primeiro e último, mantemos o alinhamento nas bordas.
                */}
                <div className={cn(
                  "flex flex-col",
                  index === 0 ? "items-start" : index === steps.length - 1 ? "items-end" : "items-center px-2"
                )}>
                  <span className={cn("text-label-md whitespace-nowrap", isCurrent ? "text-foreground font-semibold" : "text-muted-foreground")}>
                    {step.title}
                  </span>
                  {step.description && (
                    <span className="text-body-xs text-muted-foreground mt-0.5 hidden sm:block max-w-[120px]">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Vertical orientation
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep

        return (
          <div key={index} className="flex relative pb-8 last:pb-0">
            {/* Linha conectora vertical */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-4 top-8 bottom-0 w-[2px] -ml-[1px] transition-colors",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
            
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 font-semibold text-body-sm shrink-0 transition-colors bg-background relative z-10",
                isCompleted
                  ? "border-primary bg-primary text-primary-foreground"
                  : isCurrent
                  ? "border-primary text-primary"
                  : "border-muted text-muted-foreground"
              )}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
            </div>

            <div className="ml-4 flex flex-col pt-1">
              <span className={cn("text-label-md", isCurrent ? "text-foreground font-semibold" : "text-muted-foreground")}>
                {step.title}
              </span>
              {step.description && (
                <span className="text-body-xs text-muted-foreground mt-0.5">{step.description}</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
