import * as React from "react"
import { cn } from "../../lib/utils"

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number
  size?: "sm" | "md" | "lg"
}

function AvatarGroup({ className, children, max = 4, size = "md", ...props }: AvatarGroupProps) {
  const avatars = React.Children.toArray(children)
  const visibleAvatars = avatars.slice(0, max)
  const remainingCount = avatars.length - max

  const sizeClasses = {
    sm: "h-8 w-8 text-body-xs",
    md: "h-10 w-10 text-body-sm",
    lg: "h-12 w-12 text-body-md",
  }

  return (
    <div className={cn("flex -space-x-2", className)} {...props}>
      {visibleAvatars.map((avatar, index) => (
        <div
          key={index}
          className="ring-2 ring-background rounded-full hover:z-10 transition-transform hover:scale-110"
        >
          {React.isValidElement(avatar)
            ? React.cloneElement(avatar as React.ReactElement<{ className?: string }>, {
                className: cn((avatar as React.ReactElement<{ className?: string }).props.className, "rounded-full"),
              })
            : avatar}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            "ring-2 ring-background rounded-full bg-muted flex items-center justify-center font-medium text-muted-foreground",
            sizeClasses[size]
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  )
}

export { AvatarGroup }
