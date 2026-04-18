import * as React from "react"
import { cn } from "../../lib/utils"

const CarouselContext = React.createContext(null)

const Carousel = React.forwardRef(({ className, orientation = "horizontal", ...props }, ref) => {
  const [current, setCurrent] = React.useState(0)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(true)

  return (
    <CarouselContext.Provider value={{ current, setCurrent, canScrollPrev, setCanScrollNext, orientation }}>
      <div
        ref={ref}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        {...props}
      />
    </CarouselContext.Provider>
  )
})
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex", className)}
      {...props}
    />
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef(({ className, ...props }, ref) => {
  const context = React.useContext(CarouselContext)

  return (
    <button
      ref={ref}
      className={cn(
        "absolute h-8 w-8 rounded-full border shadow-sm opacity-50 hover:opacity-100",
        context?.orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "top-1/2 -translate-y-1/2",
        className
      )}
      onClick={() => context?.setCurrent?.(prev => Math.max(0, prev - 1))}
      {...props}
    >
      <span className="sr-only">Previous</span>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M9.0625 3.75L5.625 7.1875L9.0625 10.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef(({ className, ...props }, ref) => {
  const context = React.useContext(CarouselContext)

  return (
    <button
      ref={ref}
      className={cn(
        "absolute h-8 w-8 rounded-full border shadow-sm opacity-50 hover:opacity-100",
        context?.orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "bottom-0 left-1/2 -translate-x-1/2",
        className
      )}
      onClick={() => context?.setCurrent?.(prev => prev + 1)}
      {...props}
    >
      <span className="sr-only">Next</span>
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
        <path d="M5.9375 3.75L9.375 7.1875L5.9375 10.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  )
})
CarouselNext.displayName = "CarouselNext"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}