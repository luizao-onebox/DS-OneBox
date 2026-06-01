﻿﻿﻿// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react"
import { AspectRatio } from "./AspectRatio"

const meta = {
  title: "Componentes Nativos/AspectRatio",
  component: AspectRatio,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <span className="text-muted-foreground">16:9</span>
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Square: Story = {
  render: () => (
    <div className="w-32">
      <AspectRatio ratio={1} className="bg-muted rounded-lg overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <span className="text-muted-foreground">1:1</span>
        </div>
      </AspectRatio>
    </div>
  ),
}

export const Portrait: Story = {
  render: () => (
    <div className="w-32">
      <AspectRatio ratio={3 / 4} className="bg-muted rounded-lg overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <span className="text-muted-foreground">3:4</span>
        </div>
      </AspectRatio>
    </div>
  ),
}
