import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const pageLayoutVariants = cva("flex flex-col", {
  variants: {
    spacing: {
      tight: "gap-4",
      default: "gap-6",
      loose: "gap-8",
    },
    flush: {
      true: "px-0",
      false: "px-6 py-6",
    },
  },
  defaultVariants: {
    spacing: "default",
    flush: false,
  },
})

export interface PageLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageLayoutVariants> {}

export function PageLayout({
  className,
  spacing,
  flush,
  children,
  ...props
}: PageLayoutProps) {
  return (
    <div
      className={cn(pageLayoutVariants({ spacing, flush, className }))}
      {...props}
    >
      {children}
    </div>
  )
}
