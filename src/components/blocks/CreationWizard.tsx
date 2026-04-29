import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/Dialog"
import { Button } from "../shadcn/Button"
import { Stepper } from "./Stepper"

export interface CreationWizardProps {
  title: string
  description?: string
  trigger?: React.ReactNode
  steps: { title: string; description?: string }[]
  currentStep: number
  onNext: () => void
  onPrevious: () => void
  onFinish: () => void
  isNextDisabled?: boolean
  isFinishDisabled?: boolean
  children: React.ReactNode // Conteúdo dinâmico do formulário atual
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CreationWizard({
  title,
  description,
  trigger,
  steps,
  currentStep,
  onNext,
  onPrevious,
  onFinish,
  isNextDisabled = false,
  isFinishDisabled = false,
  children,
  open,
  onOpenChange,
}: CreationWizardProps) {
  const isLastStep = currentStep === steps.length - 1

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-6">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            orientation="horizontal"
          />
        </div>

        <div className="min-h-[250px] max-h-[50vh] overflow-y-auto pr-2 pb-4">
          {children}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentStep === 0}
          >
            Voltar
          </Button>

          {isLastStep ? (
            <Button onClick={onFinish} disabled={isFinishDisabled}>
              Finalizar
            </Button>
          ) : (
            <Button onClick={onNext} disabled={isNextDisabled}>
              Avançar
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
