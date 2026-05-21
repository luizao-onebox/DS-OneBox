// @ts-nocheck
import { Badge } from "./Badge"
import { Clock, X } from "lucide-react"

export default {
  title: "Components/Badge",
  component: Badge,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "soft", "outline"],
    },
    color: {
      control: "select",
      options: ["neutral", "primary", "success", "warning", "destructive", "info", "indigo", "purple", "pink"],
    },
    size: {
      control: "select",
      options: ["default", "pill", "icon"],
    },
  },
}

const colors = ["neutral", "destructive", "warning", "success", "info", "indigo", "purple", "pink"] as const;

export const BadgePlayground = {
  args: {
    children: "Badge",
    variant: "soft",
    color: "neutral",
    size: "default",
  },
}

export const SoftPillBadges = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => (
        <Badge key={color} variant="soft" color={color} size="pill">
          <Clock className="mr-1.5 h-3.5 w-3.5" />
          Badge
          <X className="ml-1.5 h-3.5 w-3.5 cursor-pointer opacity-70 hover:opacity-100" />
        </Badge>
      ))}
    </div>
  ),
}

export const SoftDefaultBadges = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => (
        <Badge key={color} variant="soft" color={color} size="default">
          <Clock className="mr-1.5 h-3.5 w-3.5" />
          Badge
          <X className="ml-1.5 h-3.5 w-3.5 cursor-pointer opacity-70 hover:opacity-100" />
        </Badge>
      ))}
    </div>
  ),
}

export const SolidPillBadges = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => (
        <Badge key={color} variant="solid" color={color} size="pill">
          <Clock className="mr-1.5 h-3.5 w-3.5" />
          Badge
          <X className="ml-1.5 h-3.5 w-3.5 cursor-pointer opacity-70 hover:opacity-100" />
        </Badge>
      ))}
    </div>
  ),
}

export const SolidDefaultBadges = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => (
        <Badge key={color} variant="solid" color={color} size="default">
          <Clock className="mr-1.5 h-3.5 w-3.5" />
          Badge
          <X className="ml-1.5 h-3.5 w-3.5 cursor-pointer opacity-70 hover:opacity-100" />
        </Badge>
      ))}
    </div>
  ),
}

export const IconBadges = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-4">
        {colors.map((color) => (
          <Badge key={color} variant="soft" color={color} size="icon">
            <Clock className="h-3.5 w-3.5" />
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {colors.map((color) => (
          <Badge key={color} variant="soft" color={color} size="icon">
            1
          </Badge>
        ))}
      </div>
    </div>
  ),
}

export const OutlineBadges = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {colors.map((color) => (
        <Badge key={color} variant="outline" color={color} size="pill">
          <Clock className="mr-1.5 h-3.5 w-3.5" />
          Badge
        </Badge>
      ))}
    </div>
  ),
}
