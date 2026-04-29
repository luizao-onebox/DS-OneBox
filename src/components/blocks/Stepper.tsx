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
  return (
    <div
      className={cn(
        "flex",
        orientation === "horizontal" ? "flex-row items-center w-full" : "flex-col space-y-4",
        className
      )}
      {...props}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep

        return (
          <div
            key={index}
            className={cn(
              "flex",
              orientation === "horizontal" ? "flex-1 items-center" : "flex-row items-start"
            )}
          >
            <div className={cn("flex flex-col", orientation === "horizontal" ? "items-center" : "items-start")}>
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 font-semibold text-sm shrink-0 transition-colors",
                  isCompleted
                    ? "border-primary bg-primary text-primary-foreground"
                    : isCurrent
                    ? "border-primary text-primary"
                    : "border-muted text-muted-foreground"
                )}
              >
                {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              
              {orientation === "horizontal" && (
                <div className="mt-2 flex flex-col items-center text-center">
                  <span className={cn("text-sm font-medium", isCurrent ? "text-foreground" : "text-muted-foreground")}>
                    {step.title}
                  </span>
                  {step.description && (
                    <span className="text-xs text-muted-foreground mt-0.5">{step.description}</span>
                  )}
                </div>
              )}
            </div>

            {orientation === "vertical" && (
              <div className="ml-4 mt-1 flex flex-col">
                <span className={cn("text-sm font-medium", isCurrent ? "text-foreground" : "text-muted-foreground")}>
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-xs text-muted-foreground mt-0.5">{step.description}</span>
                )}
              </div>
            )}

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "transition-colors",
                  orientation === "horizontal"
                    ? "h-[2px] flex-1 mx-4 -mt-10"
                    : "w-[2px] h-full min-h-[32px] ml-4 mt-2",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
