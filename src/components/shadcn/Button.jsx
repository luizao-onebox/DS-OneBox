/**
 * Button component with support for multiple variants, sizes, and icons.
 * Built on top of shadcn/ui Button with additional icon integration.
 *
 * @example
 * // Basic button
 * <Button>Click me</Button>
 *
 * @example
 * // With icon
 * <Button icon={Mail} iconPosition="left">Email</Button>
 *
 * @example
 * // Icon only
 * <Button icon={Bell} size="icon" />
 */
import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        destructiveOutline: "border border-destructive text-destructive hover:bg-destructive/10",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Button component with support for icons and multiple variants.
 *
 * @param {Object} props - Component props
 * @param {'default'|'destructive'|'destructiveOutline'|'outline'|'secondary'|'ghost'|'link'} props.variant - Visual style
 * @param {'default'|'sm'|'lg'|'icon'|'icon-sm'|'icon-lg'} props.size - Size variant
 * @param {React.ComponentType} props.icon - Lucide icon component
 * @param {'left'|'right'} props.iconPosition - Icon position relative to text
 * @param {boolean} props.disabled - Disable the button
 * @param {React.ReactNode} props.children - Button content
 */
const Button = React.forwardRef(({ className, variant, size, icon, iconPosition = "left", children, ...props }, ref) => {
  const iconSize = size === "sm" || size === "icon-sm" ? "h-3 w-3" : size === "lg" || size === "icon-lg" ? "h-5 w-5" : "h-4 w-4"
  const iconMargin = iconPosition === "left" ? "mr-2" : "ml-2"

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    >
      {icon && iconPosition === "left" && React.createElement(icon, { className: cn(iconSize, iconMargin) })}
      {children}
      {icon && iconPosition === "right" && React.createElement(icon, { className: cn(iconSize, iconMargin) })}
    </button>
  )
})
Button.displayName = "Button"

export { Button, buttonVariants }