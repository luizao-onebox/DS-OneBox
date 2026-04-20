import { Badge } from "./Badge"

export default {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "destructiveOutline", "outline", "success", "warning"],
    },
  },
}

export const BadgePlayground = {
  args: {
    children: "Badge",
    variant: "default",
  },
}

export const BadgeGallery = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <section className="w-full">
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Variants</h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="destructiveOutline">Destructive Outline</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
      </section>
    </div>
  ),
}
