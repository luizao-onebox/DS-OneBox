import { Skeleton } from "./Skeleton"

export default {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
}

export const SkeletonPlayground = {
  args: {
    className: "h-4 w-[100px]",
  },
}

export const SkeletonGallery = {
  render: () => (
    <div className="space-y-8 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <Skeleton className="h-4 w-[100px]" />
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Card</h2>
        <div className="flex items-center space-x-4 p-4 w-full">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Profile</h2>
        <div className="space-y-6 w-full max-w-sm p-4">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[140px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
          </div>
          <Skeleton className="h-[125px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </section>
    </div>
  ),
}
