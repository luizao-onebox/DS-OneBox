import { Avatar, AvatarImage, AvatarFallback } from "./Avatar"

export default {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
}

export const AvatarPlayground = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const AvatarGallery = {
  render: () => (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Sizes</h2>
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className="text-xs">CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className="text-lg">CN</AvatarFallback>
          </Avatar>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Fallback Only</h2>
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">JD</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">JD</AvatarFallback>
          </Avatar>
        </div>
      </section>
    </div>
  ),
}
