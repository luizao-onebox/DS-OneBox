// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react"
import { VirtualList } from "./VirtualList"

const meta = {
  title: "Components/VirtualList",
  component: VirtualList,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof VirtualList>

export default meta
type Story = StoryObj<typeof meta>

const items = Array.from({ length: 1000 }, (_, i) => ({ id: String(i), name: `Item ${i + 1}` }))

export const Default: Story = {
  render: () => (
    <VirtualList
      items={items}
      itemHeight={48}
      className="h-[400px] border rounded-lg"
      keyExtractor={(item) => item.id}
      renderItem={(item) => (
        <div className="flex items-center px-4 h-12 border-b last:border-b-0 hover:bg-muted/50">
          <span className="text-body-sm">{item.name}</span>
        </div>
      )}
    />
  ),
}
