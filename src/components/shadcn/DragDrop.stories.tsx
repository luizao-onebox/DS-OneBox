// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { SortableList } from "./DragDrop"
import { FileText, Image, Video } from "lucide-react"

const meta = {
  title: "Components/SortableList",
  component: SortableList,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof SortableList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: "1", content: "Documento 1", icon: <FileText className="h-4 w-4" /> },
      { id: "2", content: "Imagem 1", icon: <Image className="h-4 w-4" /> },
      { id: "3", content: "Vídeo 1", icon: <Video className="h-4 w-4" /> },
      { id: "4", content: "Documento 2", icon: <FileText className="h-4 w-4" /> },
      { id: "5", content: "Imagem 2", icon: <Image className="h-4 w-4" /> },
    ])

    return (
      <div className="w-full max-w-md">
        <SortableList
          items={items}
          onReorder={(from, to) => {
            const newItems = [...items]
            const [moved] = newItems.splice(from, 1)
            newItems.splice(to, 0, moved)
            setItems(newItems)
          }}
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <SortableList
        items={[
          { id: "1", content: "Item bloqueado", disabled: true },
          { id: "2", content: "Item 2" },
          { id: "3", content: "Item 3" },
        ]}
      />
    </div>
  ),
}
