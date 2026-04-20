import { Separator } from "./Separator"

export default {
  title: "Components/NavigationMenu",
  tags: ["autodocs"],
}

export const NavigationMenuPlayground = {
  render: () => (
    <div className="flex items-center gap-4">
      <a href="#" className="text-sm font-medium">Home</a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="text-sm font-medium text-muted-foreground">Documentation</a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="text-sm font-medium text-muted-foreground">Components</a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="text-sm font-medium text-muted-foreground">GitHub</a>
    </div>
  ),
}

export const NavigationMenuGallery = {
  render: () => (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <div className="flex items-center gap-4">
          <a href="#" className="text-sm font-medium">Home</a>
          <Separator orientation="vertical" className="h-4" />
          <a href="#" className="text-sm font-medium text-muted-foreground">Documentation</a>
          <Separator orientation="vertical" className="h-4" />
          <a href="#" className="text-sm font-medium text-muted-foreground">Components</a>
          <Separator orientation="vertical" className="h-4" />
          <a href="#" className="text-sm font-medium text-muted-foreground">GitHub</a>
        </div>
      </section>
    </div>
  ),
}
