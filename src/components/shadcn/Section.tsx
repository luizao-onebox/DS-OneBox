import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const sectionVariants = cva(
  "w-full",
  {
    variants: {
      padding: {
        none: "py-0",
        sm: "py-4 md:py-8",
        default: "py-8 md:py-12 lg:py-16",
        lg: "py-12 md:py-24 lg:py-32",
        xl: "py-24 md:py-32 lg:py-48",
      },
    },
    defaultVariants: {
      padding: "default",
    },
  }
)

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  asChild?: boolean
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, padding, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "section"
    return (
      <Comp
        className={cn(sectionVariants({ padding, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Section.displayName = "Section"
