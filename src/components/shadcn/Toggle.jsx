import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2.5",
        lg: "h-10 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef(({ className, variant, size, pressed, onPressedChange, ...props }, ref) => {
  const [isPressed, setIsPressed] = React.useState(pressed ?? false)

  const handleClick = () => {
    const newState = !isPressed
    setIsPressed(newState)
    onPressedChange?.(newState)
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        toggleVariants({ variant, size }),
        isPressed && "bg-muted text-foreground",
        className
      )}
      data-state={isPressed ? "on" : "off"}
      onClick={handleClick}
      {...props}
    />
  )
})
Toggle.displayName = "Toggle"

export { Toggle, toggleVariants }