import { Input } from "./Input"
import { Label } from "./Label"

export default {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    type: { control: "select", options: ["text", "email", "password", "number", "tel", "url"] },
  },
}

export const InputPlayground = {
  args: {
    placeholder: "Enter text...",
    type: "text",
    disabled: false,
  },
}

export const InputGallery = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <Input placeholder="Enter text..." />
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">With Label</h2>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="email@example.com" />
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">With Helper Text</h2>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email-helper">Email</Label>
          <Input id="email-helper" type="email" placeholder="email@example.com" />
          <p className="text-sm text-muted-foreground">Enter your email address.</p>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Disabled</h2>
        <Input placeholder="Disabled input" disabled />
      </section>
    </div>
  ),
}
