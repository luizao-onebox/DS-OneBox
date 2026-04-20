import { Label } from "./Label"
import { Input } from "./Input"

export default {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    required: { control: "boolean" },
  },
}

export const LabelPlayground = {
  args: {
    children: "Label",
    htmlFor: "playground-input",
    required: false,
  },
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={args.htmlFor}>
        {args.children} {args.required && <span className="text-destructive">*</span>}
      </Label>
      <Input id={args.htmlFor} placeholder="Type something..." />
    </div>
  ),
}

export const LabelGallery = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="email@example.com" />
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Required</h2>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="username">
            Username <span className="text-destructive">*</span>
          </Label>
          <Input id="username" placeholder="username" required />
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Disabled</h2>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="disabled">Disabled</Label>
          <Input id="disabled" disabled placeholder="Can't edit this" />
        </div>
      </section>
    </div>
  ),
}
