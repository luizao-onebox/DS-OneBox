import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"

import { cn } from "../../lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-green-500/50 text-green-600 dark:border-green-500 [&>svg]:text-green-600 bg-green-50",
        warning: "border-yellow-500/50 text-yellow-600 dark:border-yellow-500 [&>svg]:text-yellow-600 bg-yellow-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  /** Se false, não injetará automaticamente os ícones baseados na variante */
  showIcon?: boolean
}

/**
 * @description
 * Alertas e notificações inline (ex: topo do formulário, avisos de sistema).
 * 
 * **REGRAS PARA A IA:**
 * - Use para comunicar o resultado de uma ação, avisos de bloqueio ou informações.
 * - Por padrão, ícones (Lucide) são injetados automaticamente baseados na variante (destructive=AlertCircle, success=CheckCircle, warning=AlertTriangle, default=Info).
 * - Se precisar de um ícone customizado, passe `<Alert showIcon={false}> <CustomIcon /> <AlertTitle>... </Alert>`.
 * - Não confunda com Toast. Alert é estático na tela, Toast some após X segundos.
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, showIcon = true, children, ...props }, ref) => {
    
    // Injeção inteligente de ícones
    let DefaultIcon = null
    if (showIcon) {
      if (variant === "destructive") DefaultIcon = AlertCircle
      else if (variant === "success") DefaultIcon = CheckCircle2
      else if (variant === "warning") DefaultIcon = AlertTriangle
      else DefaultIcon = Info
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {DefaultIcon && <DefaultIcon className="h-4 w-4" />}
        {children}
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  )
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
