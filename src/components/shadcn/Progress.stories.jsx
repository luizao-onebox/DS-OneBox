import { Progress } from "./Progress"

export default {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "number", min: 0, max: 100 },
  },
}

export const ProgressPlayground = {
  args: {
    value: 50,
  },
}

export const ProgressGallery = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <Progress value={50} />
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Various Values</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage</span>
              <span>25%</span>
            </div>
            <Progress value={25} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Usage</span>
              <span>50%</span>
            </div>
            <Progress value={50} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage</span>
              <span>75%</span>
            </div>
            <Progress value={75} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Complete</span>
              <span>100%</span>
            </div>
            <Progress value={100} />
          </div>
        </div>
      </section>
    </div>
  ),
}
