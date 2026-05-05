import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const flexVariants = cva(
  "flex",
  {
    variants: {
      direction: {
        row: "flex-row",
        col: "flex-col",
        rowReverse: "flex-row-reverse",
        colReverse: "flex-col-reverse",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
      wrap: {
        nowrap: "flex-nowrap",
        wrap: "flex-wrap",
        wrapReverse: "flex-wrap-reverse",
      },
      gap: {
        none: "gap-0",
        sm: "gap-2",
        default: "gap-4",
        md: "gap-6",
        lg: "gap-8",
        xl: "gap-12",
      },
    },
    defaultVariants: {
      direction: "row",
      align: "center",
      justify: "start",
      wrap: "nowrap",
      gap: "default",
    },
  }
)

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  asChild?: boolean
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction, align, justify, wrap, gap, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    return (
      <Comp
        className={cn(flexVariants({ direction, align, justify, wrap, gap, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Flex.displayName = "Flex"
