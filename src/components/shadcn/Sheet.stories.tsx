import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./Sheet"
import { Button } from "./Button"

export default {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
}

export const SheetPlayground = {
  render: () => (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This is a sheet description.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>Sheet content goes here.</p>
        </div>
      </SheetContent>
    </Sheet>
  ),
}

export const SheetGallery = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Right (Default)</h2>
        <Sheet>
          <SheetTrigger>
            <Button variant="outline">Open</Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Edit Settings</SheetTitle>
              <SheetDescription>Make changes to your settings here.</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              <p>Settings panel content.</p>
            </div>
          </SheetContent>
        </Sheet>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Left</h2>
        <Sheet>
          <SheetTrigger>
            <Button variant="outline">Open</Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <p>Navigation menu content.</p>
            </div>
          </SheetContent>
        </Sheet>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Top</h2>
        <Sheet>
          <SheetTrigger>
            <Button variant="outline">Open</Button>
          </SheetTrigger>
          <SheetContent side="top">
            <SheetHeader>
              <SheetTitle>Notification</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <p>Notification banner content.</p>
            </div>
          </SheetContent>
        </Sheet>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Bottom</h2>
        <Sheet>
          <SheetTrigger>
            <Button variant="outline">Open</Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <SheetHeader>
              <SheetTitle>Quick Actions</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <p>Quick actions content.</p>
            </div>
          </SheetContent>
        </Sheet>
      </section>
    </div>
  ),
}
