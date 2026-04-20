import { Popover, PopoverContent, PopoverTrigger } from "./Popover"
import { Button } from "./Button"

export default {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
}

export const PopoverPlayground = {
  render: () => (
    <Popover>
      <PopoverTrigger>
        <Button variant="outline">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
}

export const PopoverGallery = {
  render: () => (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Default</h2>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">Open Popover</Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  Set the dimensions for the layer.
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Align End</h2>
        <Popover>
          <PopoverTrigger>
            <Button variant="outline">Align End</Button>
          </PopoverTrigger>
          <PopoverContent align="end">
            <div className="space-y-2">
              <h4 className="font-medium">Popover Content</h4>
              <p className="text-sm text-muted-foreground">
                This popover is aligned to the end.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </section>
    </div>
  ),
}
