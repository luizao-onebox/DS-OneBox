import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const pageHeaderVariants = cva("flex flex-col gap-1", {
  variants: {
    align: {
      left: "items-start",
      center: "items-center text-center",
      right: "items-end text-right",
    },
  },
  defaultVariants: {
    align: "left",
  },
})

export interface PageHeaderProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof pageHeaderVariants> {
  title: string
  description?: string
  actions?: React.ReactNode
}

export function PageHeader({
  className,
  align,
  title,
  description,
  actions,
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn(pageHeaderVariants({ align, className }))}
      {...props}
    >
      <div className="flex flex-row flex-wrap items-start justify-between gap-4 w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-h1 font-bold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="text-body-md text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex flex-row items-center gap-3 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </header>
  )
}
