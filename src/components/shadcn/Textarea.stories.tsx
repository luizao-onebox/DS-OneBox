import { Textarea } from "./Textarea"

export default {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
}

export const TextareaPlayground = {
  args: {
    placeholder: "Enter your message...",
    disabled: false,
  },
}

export const TextareaGallery = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <Textarea placeholder="Enter your message..." />
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">With Label</h2>
        <div className="grid w-full gap-1.5">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Description
          </label>
          <Textarea placeholder="Type your description here." />
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">With Text</h2>
        <div className="grid w-full gap-1.5">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Comments
          </label>
          <Textarea defaultValue="This is a pre-filled textarea with some text content." />
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Disabled</h2>
        <Textarea placeholder="Disabled textarea" disabled />
      </section>
    </div>
  ),
}
