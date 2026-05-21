import type { Meta, StoryObj } from "@storybook/react"
import { AvatarGroup } from "./AvatarGroup"
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar"

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof AvatarGroup>

export default meta
type Story = StoryObj<typeof meta>

const users = [
  { name: "Ana Costa", initials: "AC" },
  { name: "Bruno Silva", initials: "BS" },
  { name: "Carla Mendes", initials: "CM" },
  { name: "Diego Rocha", initials: "DR" },
  { name: "Elena Ferreira", initials: "EF" },
  { name: "Fernando Lima", initials: "FL" },
]

export const Default: Story = {
  render: () => (
    <AvatarGroup>
      {users.slice(0, 4).map((u) => (
        <Avatar key={u.name} size="md">
          <AvatarFallback>{u.initials}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  ),
}

export const WithOverflow: Story = {
  render: () => (
    <AvatarGroup max={3}>
      {users.map((u) => (
        <Avatar key={u.name} size="md">
          <AvatarFallback>{u.initials}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  ),
}

export const Small: Story = {
  render: () => (
    <AvatarGroup max={3} size="sm">
      {users.map((u) => (
        <Avatar key={u.name} size="sm">
          <AvatarFallback>{u.initials}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  ),
}

export const Large: Story = {
  render: () => (
    <AvatarGroup max={3} size="lg">
      {users.map((u) => (
        <Avatar key={u.name} size="lg">
          <AvatarFallback>{u.initials}</AvatarFallback>
        </Avatar>
      ))}
    </AvatarGroup>
  ),
}
