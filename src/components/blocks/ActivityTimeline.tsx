import * as React from "react"
import { cn } from "../../lib/utils"
import { Check, Circle } from "lucide-react"

export interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode
  description?: React.ReactNode
  time?: React.ReactNode
  icon?: React.ReactNode
  isLast?: boolean
  isActive?: boolean
  isDone?: boolean
}

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      className,
      title,
      description,
      time,
      icon,
      isLast = false,
      isActive = false,
      isDone = false,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("relative flex gap-4 pb-8", className)} {...props}>
        {/* Linha vertical que conecta os itens */}
        {!isLast && (
          <div className="absolute left-[19px] top-8 h-[calc(100%-24px)] w-px bg-border" />
        )}

        {/* Ícone/Círculo */}
        <div className="relative mt-1 shrink-0">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background",
              isActive ? "border-primary text-primary" : "border-muted text-muted-foreground",
              isDone && "border-primary bg-primary text-primary-foreground"
            )}
          >
            {icon ? (
              icon
            ) : isDone ? (
              <Check className="h-5 w-5" />
            ) : (
              <Circle className={cn("h-3 w-3", isActive && "fill-current")} />
            )}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col pt-1 w-full gap-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <h4
              className={cn(
                "text-sm font-medium leading-none",
                isActive || isDone ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {title}
            </h4>
            {time && (
              <time className="text-xs text-muted-foreground shrink-0 tabular-nums">
                {time}
              </time>
            )}
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    )
  }
)
TimelineItem.displayName = "TimelineItem"

export const ActivityTimeline = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const items = React.Children.toArray(children)
  return (
    <div ref={ref} className={cn("space-y-0", className)} {...props}>
      {items.map((child, index) => {
        if (!React.isValidElement(child)) return child
        return React.cloneElement(child, {
          ...child.props,
          isLast: index === items.length - 1,
        })
      })}
    </div>
  )
})
ActivityTimeline.displayName = "ActivityTimeline"
