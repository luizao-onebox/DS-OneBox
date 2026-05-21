import * as React from "react"
import { cn } from "../../lib/utils"
import { Check, X } from "lucide-react"

interface PasswordRequirement {
  label: string
  test: (password: string) => boolean
}

const defaultRequirements: PasswordRequirement[] = [
  { label: "Mínimo 8 caracteres", test: (p) => p.length >= 8 },
  { label: "Uma letra maiúscula", test: (p) => /[A-Z]/.test(p) },
  { label: "Uma letra minúscula", test: (p) => /[a-z]/.test(p) },
  { label: "Um número", test: (p) => /\d/.test(p) },
  { label: "Um caractere especial", test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
]

interface PasswordStrengthProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  password?: string
  requirements?: PasswordRequirement[]
  showRequirements?: boolean
  onStrengthChange?: (strength: number) => void
}

function getStrengthScore(password: string, requirements: PasswordRequirement[]): number {
  if (!password) return 0
  const passed = requirements.filter((req) => req.test(password)).length
  return Math.round((passed / requirements.length) * 100)
}

function getStrengthColor(score: number): string {
  if (score < 40) return "bg-destructive"
  if (score < 60) return "bg-warning"
  if (score < 80) return "bg-info"
  return "bg-success"
}

function getStrengthLabel(score: number): string {
  if (score < 40) return "Fraca"
  if (score < 60) return "Razoável"
  if (score < 80) return "Boa"
  return "Forte"
}

const PasswordStrength = React.forwardRef<HTMLDivElement, PasswordStrengthProps>(
  ({
    className,
    password = "",
    requirements = defaultRequirements,
    showRequirements = true,
    onStrengthChange,
    ...props
  }, ref) => {
    const score = getStrengthScore(password, requirements)

    React.useEffect(() => {
      onStrengthChange?.(score)
    }, [score, onStrengthChange])

    const passedRequirements = requirements.filter((req) => req.test(password))

    return (
      <div ref={ref} className={cn("space-y-3", className)} {...props}>
        <div className="flex gap-1">
          {[25, 50, 75, 100].map((threshold, index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-300",
                score >= threshold ? getStrengthColor(score) : "bg-muted"
              )}
            />
          ))}
        </div>

        {password && (
          <div className="flex items-center justify-between">
            <span className={cn(
              "text-body-sm font-medium",
              score < 40 && "text-destructive",
              score >= 40 && score < 60 && "text-warning",
              score >= 60 && score < 80 && "text-info",
              score >= 80 && "text-success"
            )}>
              {getStrengthLabel(score)}
            </span>
            <span className="text-body-xs text-muted-foreground">
              {passedRequirements.length}/{requirements.length} requisitos
            </span>
          </div>
        )}

        {showRequirements && (
          <ul className="space-y-1.5">
            {requirements.map((req, index) => {
              const passed = req.test(password)
              return (
                <li
                  key={index}
                  className={cn(
                    "flex items-center gap-2 text-body-sm transition-colors",
                    passed ? "text-success" : "text-muted-foreground"
                  )}
                >
                  {passed ? (
                    <Check className="h-4 w-4 shrink-0" />
                  ) : (
                    <X className="h-4 w-4 shrink-0" />
                  )}
                  <span className={passed ? "font-medium" : ""}>
                    {req.label}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }
)
PasswordStrength.displayName = "PasswordStrength"

export { PasswordStrength }
