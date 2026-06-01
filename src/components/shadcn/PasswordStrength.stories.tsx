﻿﻿﻿// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { PasswordStrength } from "./PasswordStrength"
import { Input } from "./Input"

const meta = {
  title: "Componentes Nativos/PasswordStrength",
  component: PasswordStrength,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof PasswordStrength>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [password, setPassword] = useState("")
    return (
      <div className="space-y-4 w-full max-w-sm">
        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordStrength password={password} />
      </div>
    )
  },
}

export const WithWeakPassword: Story = {
  render: () => <PasswordStrength password="abc" />,
}

export const WithMediumPassword: Story = {
  render: () => <PasswordStrength password="Password1" />,
}

export const WithStrongPassword: Story = {
  render: () => <PasswordStrength password="P@ssw0rd!2024" />,
}
