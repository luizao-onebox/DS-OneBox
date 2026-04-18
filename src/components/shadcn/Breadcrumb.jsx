import * as React from "react"
import { cn } from "../../lib/utils"

const BreadcrumbContext = React.createContext(null)

const Breadcrumb = ({ children, className, ...props }) => (
  <BreadcrumbContext.Provider value={{ separator: "/" }}>
    <nav ref={null} className={cn("", className)} aria-label="breadcrumb" {...props}>
      <ol className="flex items-center gap-1.5">{children}</ol>
    </nav>
  </BreadcrumbContext.Provider>
)

const BreadcrumbList = ({ className, ...props }) => (
  <ol className={cn("flex flex-wrap items-center gap-1.5", className)} {...props} />
)

const BreadcrumbItem = ({ className, ...props }) => (
  <li className={cn("flex items-center gap-1.5", className)} {...props} />
)

const BreadcrumbLink = ({ asChild, className, ...props }) => {
  return (
    <a
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
}

const BreadcrumbPage = ({ className, ...props }) => (
  <span
    role="link"
    aria-disabled="true"
    className={cn("cursor-default text-foreground", className)}
    {...props}
  />
)

const BreadcrumbSeparator = ({ children, className, ...props }) => {
  const context = React.useContext(BreadcrumbContext)

  return (
    <li
      role="presentation"
      className={cn("text-muted-foreground", className)}
      {...props}
    >
      {children || context?.separator || "/"}
    </li>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
}