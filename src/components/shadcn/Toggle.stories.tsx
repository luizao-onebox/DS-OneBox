import { Toggle } from "./Toggle"

export default {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size: { control: "select", options: ["default", "sm", "lg"] },
    disabled: { control: "boolean" },
  },
}

export const TogglePlayground = {
  args: {
    children: "Toggle",
    variant: "default",
    size: "default",
    disabled: false,
  },
}

export const ToggleGallery = {
  render: () => (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Variants</h2>
        <div className="flex gap-2">
          <Toggle>Default</Toggle>
          <Toggle variant="outline">Outline</Toggle>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Sizes</h2>
        <div className="flex gap-2 items-center">
          <Toggle size="sm">Small</Toggle>
          <Toggle size="default">Default</Toggle>
          <Toggle size="lg">Large</Toggle>
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Disabled</h2>
        <div className="flex gap-2">
          <Toggle disabled>Disabled</Toggle>
          <Toggle disabled variant="outline">Disabled Outline</Toggle>
        </div>
      </section>
    </div>
  ),
}
