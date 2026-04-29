import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../shadcn/Button"

const bannerVariants = cva(
  "relative flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 md:px-8",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        warning: "bg-yellow-500 text-black",
        info: "bg-blue-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface GlobalBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  onClose?: () => void
  action?: React.ReactNode
}

const GlobalBanner = React.forwardRef<HTMLDivElement, GlobalBannerProps>(
  ({ className, variant, children, onClose, action, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true)

    if (!isVisible) return null

    return (
      <div
        ref={ref}
        className={cn(bannerVariants({ variant }), className)}
        {...props}
      >
        <div className="flex flex-1 items-center justify-center gap-2 text-sm font-medium">
          {children}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {action}
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-6 w-6 rounded-full hover:bg-black/10",
                variant === "default" && "text-primary-foreground hover:text-primary-foreground",
                variant === "destructive" && "text-destructive-foreground hover:text-destructive-foreground"
              )}
              onClick={() => {
                setIsVisible(false)
                onClose()
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar banner</span>
            </Button>
          )}
        </div>
      </div>
    )
  }
)
GlobalBanner.displayName = "GlobalBanner"

export { GlobalBanner, bannerVariants }
