import * as React from "react"
import { cn } from "../../lib/utils"

const SliderContext = React.createContext(null)

const Slider = React.forwardRef(({ className, value = [0], max = 100, step = 1, onValueChange, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(value)
  const values = value || internalValue

  const handleChange = (newValues) => {
    setInternalValue(newValues)
    onValueChange?.(newValues)
  }

  const percentage = ((values[0] - 0) / (max - 0)) * 100

  return (
    <SliderContext.Provider value={{ values, max, step, onValueChange: handleChange }}>
      <div
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <div className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
          <div
            className="absolute h-full bg-primary"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div
          className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-grab active:cursor-grabbing"
          style={{ position: 'absolute', left: `calc(${percentage}% - 8px)` }}
          tabIndex={0}
          onMouseDown={(e) => {
            const rect = e.currentTarget.parentElement.getBoundingClientRect()
            const handleDrag = (moveEvent) => {
              const percent = Math.max(0, Math.min(100, ((moveEvent.clientX - rect.left) / rect.width) * 100))
              const newValue = Math.round((percent / 100) * max)
              handleChange([Math.max(0, Math.min(max, newValue))])
            }
            const handleUp = () => {
              document.removeEventListener('mousemove', handleDrag)
              document.removeEventListener('mouseup', handleUp)
            }
            document.addEventListener('mousemove', handleDrag)
            document.addEventListener('mouseup', handleUp)
          }}
        />
      </div>
    </SliderContext.Provider>
  )
})
Slider.displayName = "Slider"

export { Slider }