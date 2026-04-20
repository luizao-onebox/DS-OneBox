import { Switch } from "./Switch"
import { Label } from "./Label"

export default {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    checked: { control: "boolean" },
  },
}

export const SwitchPlayground = {
  args: {
    id: "airplane-mode",
    disabled: false,
    defaultChecked: false,
  },
  render: (args) => (
    <div className="flex items-center space-x-2">
      <Switch {...args} />
      <Label htmlFor={args.id}>Airplane Mode</Label>
    </div>
  ),
}

export const SwitchGallery = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <div className="flex items-center space-x-2">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">Airplane Mode</Label>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Checked</h2>
        <div className="flex items-center space-x-2">
          <Switch id="checked" defaultChecked />
          <Label htmlFor="checked">Checked by default</Label>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Disabled</h2>
        <div className="flex items-center space-x-2">
          <Switch id="disabled" disabled />
          <Label htmlFor="disabled" className="opacity-50">Disabled</Label>
        </div>
      </section>
    </div>
  ),
}
