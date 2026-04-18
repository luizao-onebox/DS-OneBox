import { Slider } from "./Slider"

export default {
  title: "Components/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    max: { control: "number" },
    step: { control: "number" },
  },
}

export const SliderPlayground = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
}

export const SliderGallery = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <Slider defaultValue={[50]} max={100} />
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">With Min and Max</h2>
        <Slider defaultValue={[25, 75]} max={100} />
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">With Steps</h2>
        <Slider defaultValue={[33]} max={100} step={10} />
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">With Label</h2>
        <div className="space-y-4 w-full">
          <div className="flex justify-between text-sm">
            <span>Volume</span>
            <span>50%</span>
          </div>
          <Slider defaultValue={[50]} max={100} />
        </div>
      </section>
    </div>
  ),
}
