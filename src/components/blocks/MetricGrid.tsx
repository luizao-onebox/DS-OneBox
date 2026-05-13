import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const metricGridVariants = cva("grid items-stretch", {
  variants: {
    columns: {
      "1": "grid-cols-1",
      "2": "grid-cols-1 sm:grid-cols-2",
      "3": "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
      "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      "6": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6",
      "12": "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
    },
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
  },
  defaultVariants: {
    columns: "4",
    gap: "md",
  },
})

export interface MetricGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricGridVariants> {}

export function MetricGrid({
  className,
  columns,
  gap,
  children,
  ...props
}: MetricGridProps) {
  return (
    <div
      className={cn(metricGridVariants({ columns, gap, className }))}
      {...props}
    >
      {children}
    </div>
  )
}

const metricCardVariants = cva("flex flex-col", {
  variants: {
    span: {
      auto: "",
      full: "col-span-full",
      half: "col-span-1 sm:col-span-2",
      third: "col-span-1 sm:col-span-2 lg:col-span-4",
      quarter: "col-span-1 sm:col-span-2 lg:col-span-3",
      twothirds: "col-span-full lg:col-span-8",
      threequarters: "col-span-full lg:col-span-9",
    },
  },
  defaultVariants: {
    span: "auto",
  },
})

export interface MetricCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricCardVariants> {}

export function MetricCard({
  className,
  span,
  children,
  ...props
}: MetricCardProps) {
  return (
    <div
      className={cn(metricCardVariants({ span, className }))}
      {...props}
    >
      {children}
    </div>
  )
}
