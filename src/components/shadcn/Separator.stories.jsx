import { Separator } from "./Separator"

export default {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
}

export const SeparatorPlayground = {
  render: () => (
    <div className="w-full max-w-[400px]">
      <div className="space-y-1">
        <p className="text-sm">Title</p>
        <p className="text-sm text-muted-foreground">Description</p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1">
        <p className="text-sm font-medium">Section Title</p>
        <p className="text-sm text-muted-foreground">Section description.</p>
      </div>
    </div>
  ),
}

export const SeparatorGallery = {
  render: () => (
    <div className="space-y-8 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Horizontal</h2>
        <div className="space-y-1">
          <p className="text-sm">Title</p>
          <p className="text-sm text-muted-foreground">Description</p>
        </div>
        <Separator className="my-4" />
        <div className="space-y-1">
          <p className="text-sm">Section Title</p>
          <p className="text-sm text-muted-foreground">Section description.</p>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Vertical</h2>
        <div className="flex h-[200px] items-center gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium">First</p>
            <p className="text-sm text-muted-foreground">Content</p>
          </div>
          <Separator orientation="vertical" className="h-full" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Second</p>
            <p className="text-sm text-muted-foreground">Content</p>
          </div>
        </div>
      </section>
    </div>
  ),
}
