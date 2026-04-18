import * as React from "react"
import { cn } from "../../lib/utils"

const TooltipContext = React.createContext(null)

const Tooltip = ({ children, content, side = "top", align = "center" }) => {
  const [isVisible, setIsVisible] = React.useState(false)

  return (
    <TooltipContext.Provider value={{ isVisible, setIsVisible, content, side, align }}>
      {children}
    </TooltipContext.Provider>
  )
}

const TooltipTrigger = ({ children, asChild }) => {
  const { setIsVisible } = React.useContext(TooltipContext)

  return React.cloneElement(children, {
    onMouseEnter: () => setIsVisible(true),
    onMouseLeave: () => setIsVisible(false),
  })
}

const TooltipContent = ({ children }) => {
  const { isVisible, content, side, align } = React.useContext(TooltipContext)

  if (!isVisible) return null

  const alignmentClasses = {
    center: "left-1/2 -translate-x-1/2",
    start: "left-0",
    end: "right-0",
  }

  const sideClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  }

  return (
    <div
      className={cn(
        "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95",
        sideClasses[side],
        alignmentClasses[align]
      )}
    >
      {children || content}
    </div>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent }