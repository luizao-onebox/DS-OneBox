import { Checkbox } from "./Checkbox"
import { Label } from "./Label"

export default {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
}

export const CheckboxPlayground = {
  args: {
    id: "terms",
    disabled: false,
    checked: false,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Checkbox {...args} />
      <Label htmlFor={args.id || "terms"}>Accept terms and conditions</Label>
    </div>
  ),
}

export const CheckboxGallery = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Accept terms and conditions</Label>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">With Description</h2>
        <div className="flex items-start space-x-2">
          <Checkbox id="comms" className="mt-0.5" />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="comms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Marketing emails
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive emails about new products and special offers.
            </p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Disabled</h2>
        <div className="flex items-center space-x-2">
          <Checkbox id="disabled" disabled />
          <Label htmlFor="disabled" className="opacity-50">Disabled checkbox</Label>
        </div>
      </section>
    </div>
  ),
}
