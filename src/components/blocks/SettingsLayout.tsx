import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../shadcn/Button"

export interface SettingsLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebarContent: React.ReactNode
  children: React.ReactNode
  title: string
  description?: string
}

export function SettingsLayout({
  sidebarContent,
  children,
  title,
  description,
  className,
  ...props
}: SettingsLayoutProps) {
  return (
    <div className={cn("hidden space-y-6 p-10 pb-16 md:block", className)} {...props}>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="my-6 w-full h-px bg-border" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          {sidebarContent}
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          {children}
        </div>
      </div>
    </div>
  )
}

export interface SettingsNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href?: string
    title: string
    isActive?: boolean
    icon?: React.ReactNode
    onClick?: () => void
  }[]
}

export function SettingsNav({ className, items, ...props }: SettingsNavProps) {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Button
          key={item.title}
          variant={item.isActive ? "secondary" : "ghost"}
          className={cn(
            "justify-start",
            item.isActive
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline"
          )}
          onClick={item.onClick}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.title}
        </Button>
      ))}
    </nav>
  )
}
