import * as React from "react"
import { cn } from "../../lib/utils"

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number | string
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 16 / 9, ...props }, ref) => {
    const paddingTop = typeof ratio === "number" ? `${(1 / ratio) * 100}%` : ratio

    return (
      <div
        ref={ref}
        className={cn("relative w-full overflow-hidden", className)}
        style={{ paddingTop }}
        {...props}
      >
        <div className="absolute inset-0">
          {props.children}
        </div>
      </div>
    )
  }
)
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }
