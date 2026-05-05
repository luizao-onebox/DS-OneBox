import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const containerVariants = cva(
  "mx-auto w-full px-4 sm:px-6 lg:px-8",
  {
    variants: {
      maxWidth: {
        default: "max-w-7xl",
        sm: "max-w-3xl",
        md: "max-w-5xl",
        lg: "max-w-7xl",
        xl: "max-w-screen-2xl",
        full: "max-w-none",
      },
    },
    defaultVariants: {
      maxWidth: "default",
    },
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    return (
      <Comp
        className={cn(containerVariants({ maxWidth, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"
