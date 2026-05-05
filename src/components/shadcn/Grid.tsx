import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const gridVariants = cva(
  "grid",
  {
    variants: {
      columns: {
        1: "grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        12: "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
        none: "",
      },
      gap: {
        none: "gap-0",
        sm: "gap-2",
        default: "gap-4",
        md: "gap-6",
        lg: "gap-8",
        xl: "gap-12",
      },
      alignItems: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
    },
    defaultVariants: {
      columns: 1,
      gap: "default",
    },
  }
)

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  asChild?: boolean
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, columns, gap, alignItems, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    return (
      <Comp
        className={cn(gridVariants({ columns, gap, alignItems, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"
