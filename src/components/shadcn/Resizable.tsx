import * as React from "react"
import { cn } from "../../lib/utils"

interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical"
}

interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize?: number
  minSize?: number
  maxSize?: number
}

interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  withHandle?: boolean
}

const ResizablePanelGroup = React.forwardRef<HTMLDivElement, ResizablePanelGroupProps>(
  ({ className, direction = "horizontal", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === "horizontal" ? "flex-row" : "flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
ResizablePanelGroup.displayName = "ResizablePanelGroup"

function ResizablePanel({ children, className, defaultSize = 50, minSize = 20, maxSize = 80, style, ...props }: ResizablePanelProps) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{ ...style }}
      {...props}
    >
      {children}
    </div>
  )
}

const ResizableHandle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  ({ className, withHandle = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex items-center justify-center bg-border transition-colors hover:bg-primary/30",
          "w-1 cursor-col-resize",
          withHandle && "w-4 rounded-md",
          className
        )}
        onMouseDown={(e) => {
          e.preventDefault()
          const startX = e.clientX
          const parent = e.currentTarget.parentElement
          if (!parent) return

          const panels = parent.querySelectorAll("[data-panel]")
          if (panels.length < 2) return

          const currentPanel = panels[0] as HTMLElement
          const nextPanel = panels[1] as HTMLElement
          const currentWidth = currentPanel.offsetWidth
          const nextWidth = nextPanel.offsetWidth
          const totalWidth = currentWidth + nextWidth

          const handleMouseMove = (moveEvent: MouseEvent) => {
            const delta = moveEvent.clientX - startX
            const deltaPercent = (delta / totalWidth) * 100
            const newCurrentWidth = Math.max(20, Math.min(80, (currentWidth / totalWidth) * 100 + deltaPercent))
            
            currentPanel.style.width = `${newCurrentWidth}%`
            nextPanel.style.width = `${100 - newCurrentWidth}%`
          }

          const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)
            document.body.style.cursor = ""
            document.body.style.userSelect = ""
          }

          document.addEventListener("mousemove", handleMouseMove)
          document.addEventListener("mouseup", handleMouseUp)
          document.body.style.cursor = "col-resize"
          document.body.style.userSelect = "none"
        }}
        {...props}
      >
        {withHandle && (
          <div className="z-10 flex h-8 w-3 flex-col items-center justify-center gap-1 rounded bg-border group-hover:bg-primary/20">
            <div className="h-0.5 w-1 rounded-full bg-muted-foreground/50" />
            <div className="h-0.5 w-1 rounded-full bg-muted-foreground/50" />
            <div className="h-0.5 w-1 rounded-full bg-muted-foreground/50" />
          </div>
        )}
      </div>
    )
  }
)
ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
