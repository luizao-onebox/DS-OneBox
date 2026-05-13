import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Button } from "../shadcn/Button"
import { Badge } from "../shadcn/Badge"
import { X } from "lucide-react"

const marketingBannerVariants = cva(
  "relative overflow-hidden flex flex-col items-start gap-4 transition-all duration-300",
  {
    variants: {
      variant: {
        hero: "bg-primary text-primary-foreground p-8 md:p-12 md:items-center text-center rounded-xl",
        split: "bg-card text-card-foreground border md:flex-row md:justify-between p-6 md:p-8 rounded-xl shadow-sm",
        gradient: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8 md:p-12 rounded-xl shadow-lg",
        floating: "fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-foreground text-background p-6 rounded-xl shadow-2xl z-50",
      },
    },
    defaultVariants: {
      variant: "split",
    },
  }
)

export interface MarketingBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marketingBannerVariants> {
  title: string
  description: string
  badge?: string
  actionText?: string
  onAction?: () => void
  secondaryActionText?: string
  onSecondaryAction?: () => void
  imageSlot?: React.ReactNode
  onDismiss?: () => void
  isDismissible?: boolean
}

export function MarketingBanner({
  className,
  variant,
  title,
  description,
  badge,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
  imageSlot,
  onDismiss,
  isDismissible = false,
  ...props
}: MarketingBannerProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  if (!isVisible) return null

  const handleDismiss = () => {
    setIsVisible(false)
    if (onDismiss) onDismiss()
  }

  // Determine button variants based on banner variant for proper contrast
  const getPrimaryButtonVariant = (): "secondary" | "default" => {
    if (variant === "hero" || variant === "gradient") return "secondary"
    if (variant === "floating") return "default"
    return "default"
  }

  const getSecondaryButtonVariant = (): "outline" => {
    return "outline"
  }

  const getBadgeVariant = () => {
    if (variant === "hero" || variant === "gradient") return "solid"
    return "soft"
  }

  const getBadgeColor = () => {
    if (variant === "gradient") return "neutral"
    return "primary"
  }

  return (
    <div
      className={cn(marketingBannerVariants({ variant, className }))}
      {...props}
    >
      {isDismissible && (
        <button
          onClick={handleDismiss}
          className={cn(
            "absolute top-4 right-4 p-1 rounded-full opacity-70 hover:opacity-100 transition-opacity",
            variant === "floating" ? "text-background" : "text-current"
          )}
          aria-label="Dismiss banner"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className={cn("flex flex-col gap-3", variant === "hero" ? "items-center" : "items-start")}>
        {badge && (
          <Badge 
            variant={getBadgeVariant()} 
            color={getBadgeColor()} 
            className={cn(
              "mb-1",
              variant === "hero" ? "bg-white/20 hover:bg-white/30 text-white border-transparent" : "",
              variant === "gradient" ? "bg-white/20 hover:bg-white/30 text-white border-transparent" : ""
            )}
          >
            {badge}
          </Badge>
        )}
        
        <h2 className={cn(
          "text-h3 md:text-h2 font-bold tracking-tight",
          variant === "floating" && "text-h4"
        )}>
          {title}
        </h2>
        
        <p className={cn(
          "text-body-md md:text-body-lg opacity-90 max-w-2xl",
          variant === "floating" && "text-body-sm"
        )}>
          {description}
        </p>

        {(actionText || secondaryActionText) && (
          <div className={cn(
            "flex flex-wrap gap-3 mt-4",
            variant === "hero" && "justify-center"
          )}>
            {actionText && (
              <Button 
                variant={getPrimaryButtonVariant()} 
                onClick={onAction}
                className={cn(
                  variant === "floating" && "bg-primary text-primary-foreground hover:bg-primary/90",
                  variant === "gradient" && "bg-white text-indigo-600 hover:bg-neutral-100"
                )}
              >
                {actionText}
              </Button>
            )}
            
            {secondaryActionText && (
              <Button 
                variant={getSecondaryButtonVariant()} 
                onClick={onSecondaryAction}
                className={cn(
                  (variant === "hero" || variant === "gradient") && "bg-transparent border-white text-white hover:bg-white/10",
                  variant === "floating" && "bg-transparent border-neutral-600 text-background hover:bg-neutral-800"
                )}
              >
                {secondaryActionText}
              </Button>
            )}
          </div>
        )}
      </div>

      {imageSlot && variant === "split" && (
        <div className="hidden md:block w-1/3 shrink-0 ml-8">
          {imageSlot}
        </div>
      )}

      {/* Decorative elements for gradient variant */}
      {variant === "gradient" && !imageSlot && (
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl pointer-events-none" />
      )}
    </div>
  )
}
