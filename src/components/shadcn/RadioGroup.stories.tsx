import { RadioGroup, RadioGroupItem } from "./RadioGroup"
import { Label } from "./Label"

export default {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
}

export const RadioGroupPlayground = {
  render: () => (
    <RadioGroup defaultValue="option-1" className="space-y-3">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="r1" />
        <Label htmlFor="r1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="r2" />
        <Label htmlFor="r2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="r3" />
        <Label htmlFor="r3">Option 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const RadioGroupGallery = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <RadioGroup defaultValue="option-1" className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-1" id="g-r1" />
            <Label htmlFor="g-r1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-2" id="g-r2" />
            <Label htmlFor="g-r2">Option 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-3" id="g-r3" />
            <Label htmlFor="g-r3">Option 3</Label>
          </div>
        </RadioGroup>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Disabled</h2>
        <RadioGroup defaultValue="option-1" className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-1" id="d1" disabled />
            <Label htmlFor="d1" className="opacity-50">Disabled option</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-2" id="d2" />
            <Label htmlFor="d2">Option 2</Label>
          </div>
        </RadioGroup>
      </section>
    </div>
  ),
}
