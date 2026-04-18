import * as React from "react"
import { cn } from "../../lib/utils"

const AccordionContext = React.createContext(null)

const Accordion = React.forwardRef(({ className, type, defaultValue, ...props }, ref) => {
  const [openItems, setOpenItems] = React.useState(defaultValue ? [defaultValue] : [])

  return (
    <AccordionContext.Provider value={{ openItems, setOpenItems, type }}>
      <div ref={ref} className={cn("", className)} {...props} />
    </AccordionContext.Provider>
  )
})
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef(({ className, value, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  const isOpen = context?.openItems.includes(value)

  return (
    <div
      ref={ref}
      className={cn("border-b", isOpen && "bg-muted/50", className)}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    />
  )
})
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  const isOpen = context?.openItems.includes(value)

  const handleClick = () => {
    if (context?.setOpenItems) {
      context.setOpenItems(prev =>
        prev.includes(value)
          ? prev.filter(v => v !== value)
          : [...prev, value]
      )
    }
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
      <svg
        className="h-4 w-4 shrink-0 transition-transform duration-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  )
})
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef(({ className, value, children, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  const isOpen = context?.openItems.includes(value)

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={cn("pb-4 pt-0 text-sm", className)}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
    </div>
  )
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }