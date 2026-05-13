import * as React from "react"
import { cn } from "../../lib/utils"

export interface MetricGridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  gap?: "sm" | "md" | "lg"
}

const gapMap = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
}

export function MetricGrid({
  className,
  columns = { xs: 1, sm: 2, lg: 4 },
  gap = "md",
  children,
  ...props
}: MetricGridProps) {
  const colClass = React.useMemo(() => {
    const cols = columns
    const xs = cols.xs ?? 1
    const sm = cols.sm ?? xs
    const md = cols.md ?? sm
    const lg = cols.lg ?? md
    const xl = cols.xl ?? lg

    if (xs === sm && sm === md && md === lg && lg === xl) {
      return `grid-cols-${xs}`
    }

    const parts = []
    if (xs !== sm) parts.push(`grid-cols-${xs}`)
    if (sm !== md) parts.push(`sm:grid-cols-${sm}`)
    if (md !== lg) parts.push(`md:grid-cols-${md}`)
    if (lg !== xl) parts.push(`lg:grid-cols-${xl}`)

    return parts.join(" ")
  }, [columns])

  return (
    <div
      className={cn(
        "grid items-stretch",
        colClass,
        gapMap[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface MetricCardProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: "full" | "half" | "third" | "quarter" | "twothirds"
}

export function MetricCard({
  className,
  span,
  children,
  ...props
}: MetricCardProps) {
  const spanClass = React.useMemo(() => {
    switch (span) {
      case "full": return "col-span-full"
      case "half": return "col-span-1 sm:col-span-2"
      case "third": return "col-span-1 sm:col-span-2 lg:col-span-4"
      case "twothirds": return "col-span-full lg:col-span-8"
      default: return ""
    }
  }, [span])

  return (
    <div
      className={cn("flex flex-col", spanClass, className)}
      {...props}
    >
      {children}
    </div>
  )
}
