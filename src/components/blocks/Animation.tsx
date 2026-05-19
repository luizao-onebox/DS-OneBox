import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const animationVariants = cva("", {
  variants: {
    animate: {
      none: "animate-none",
      spin: "animate-spin",
      pulse: "animate-pulse",
      bounce: "animate-bounce",
      "fade-in": "animate-fade-in",
      "fade-in-up": "animate-fade-in-up",
      "fade-in-down": "animate-fade-in-down",
      "scale-in": "animate-scale-in",
      "slide-in-left": "animate-slide-in-left",
      "slide-in-right": "animate-slide-in-right",
      "slide-in-up": "animate-slide-in-up",
      "slide-in-down": "animate-slide-in-down",
      "accordion-down": "animate-accordion-down",
      "accordion-up": "animate-accordion-up",
      "progress-indeterminate": "animate-progress-indeterminate",
      "shimmer": "animate-shimmer",
      "ping": "animate-ping",
      "ripple": "animate-ripple",
    },
    duration: {
      "0": "duration-0",
      "75": "duration-75",
      "100": "duration-100",
      "150": "duration-150",
      "200": "duration-200",
      "300": "duration-300",
      "500": "duration-500",
      "700": "duration-700",
      "1000": "duration-1000",
    },
    easing: {
      linear: "ease-linear",
      in: "ease-in",
      out: "ease-out",
      "in-out": "ease-in-out",
      "spring": "ease-spring",
    },
    delay: {
      "0": "delay-0",
      "75": "delay-75",
      "100": "delay-100",
      "150": "delay-150",
      "200": "delay-200",
      "300": "delay-300",
      "500": "delay-500",
    },
  },
  defaultVariants: {
    animate: "none",
    duration: "300",
    easing: "out",
    delay: "0",
  },
})

export interface AnimationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof animationVariants> {
  repeat?: "once" | "infinite" | number
}

export function Animation({
  className,
  animate,
  duration,
  easing,
  delay,
  repeat,
  children,
  ...props
}: AnimationProps) {
  const repeatClass = React.useMemo(() => {
    if (repeat === "once" || repeat === undefined) return ""
    if (repeat === "infinite") return "repeat-infinite"
    return `repeat-${repeat}`
  }, [repeat])

  return (
    <div
      className={cn(
        animationVariants({ animate, duration, easing, delay }),
        repeatClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface StaggeredListProps extends React.HTMLAttributes<HTMLDivElement> {
  staggerDelay?: number
  initialDelay?: number
  animate?: boolean
}

export function StaggeredList({
  className,
  staggerDelay = 50,
  initialDelay = 0,
  animate = true,
  children,
  ...props
}: StaggeredListProps) {
  const childrenArray = React.Children.toArray(children)

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={cn(
            animate && "animate-fade-in-up",
            animate && "origin-top"
          )}
          style={
            animate
              ? {
                  animationDelay: `${initialDelay + index * staggerDelay}ms`,
                  animationFillMode: "both",
                }
              : undefined
          }
        >
          {child}
        </div>
      ))}
    </div>
  )
}

export interface AnimatedCounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  from?: number
  to: number
  duration?: number
  easing?: "linear" | "ease-out" | "ease-in"
  prefix?: string
  suffix?: string
  decimals?: number
}

export function AnimatedCounter({
  className,
  from = 0,
  to,
  duration = 1000,
  easing = "ease-out",
  prefix = "",
  suffix = "",
  decimals = 0,
  ...props
}: AnimatedCounterProps) {
  const [value, setValue] = React.useState(from)
  const rafRef = React.useRef<number>()

  React.useEffect(() => {
    const startTime = performance.now()
    const startValue = from

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
    const linear = (t: number) => t

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easedProgress = easing === "linear" ? linear(progress) : easeOut(progress)
      const currentValue = startValue + (to - startValue) * easedProgress

      setValue(currentValue)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [from, to, duration, easing])

  return (
    <span className={cn("tabular-nums", className)} {...props}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}
