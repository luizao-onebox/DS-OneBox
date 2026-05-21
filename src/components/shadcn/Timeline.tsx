import * as React from "react"
import { cn } from "../../lib/utils"
import { Check, Circle, Clock } from "lucide-react"

interface TimelineItem {
  id: string
  title: string
  description?: string
  date?: string
  status: "completed" | "current" | "pending"
  icon?: React.ReactNode
}

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[]
  direction?: "vertical" | "horizontal"
}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, items, direction = "vertical", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === "vertical" ? "flex-col" : "flex-row",
          className
        )}
        {...props}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "relative flex",
              direction === "vertical" ? "flex-row" : "flex-col",
              index !== items.length - 1 && direction === "vertical" && "pb-8",
              index !== items.length - 1 && direction === "horizontal" && "pr-8",
              "group"
            )}
          >
            {direction === "vertical" && index !== items.length - 1 && (
              <div className="absolute left-[19px] top-10 h-[calc(100%-40px)] w-0.5 bg-border group-hover:bg-primary/30 transition-colors" />
            )}
            {direction === "horizontal" && index !== items.length - 1 && (
              <div className="absolute left-10 top-[19px] h-0.5 w-[calc(100%-40px)] bg-border group-hover:bg-primary/30 transition-colors" />
            )}

            <div
              className={cn(
                "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200",
                item.status === "completed" && "border-success bg-success text-success-foreground scale-105",
                item.status === "current" && "border-primary bg-background text-primary scale-110 shadow-md shadow-primary/20",
                item.status === "pending" && "border-muted bg-muted text-muted-foreground"
              )}
            >
              {item.status === "completed" ? (
                item.icon || <Check className="h-5 w-5" />
              ) : item.status === "current" ? (
                item.icon || <Circle className="h-3 w-3 fill-current" />
              ) : (
                item.icon || <Clock className="h-4 w-4" />
              )}
            </div>

            <div
              className={cn(
                "flex-1 pt-1",
                direction === "horizontal" && "pt-0 pl-1 text-center min-w-[120px]"
              )}
            >
              <h4 className={cn(
                "text-body-md font-semibold",
                item.status === "pending" && "text-muted-foreground"
              )}>
                {item.title}
              </h4>
              {item.description && (
                <p className={cn(
                  "mt-1 text-body-sm",
                  item.status === "pending" ? "text-muted-foreground/60" : "text-muted-foreground"
                )}>
                  {item.description}
                </p>
              )}
              {item.date && (
                <p className="mt-1 text-body-xs text-muted-foreground">
                  {item.date}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
)
Timeline.displayName = "Timeline"

export { Timeline }
export type { TimelineItem }
