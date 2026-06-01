﻿﻿﻿// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { OTPInput } from "./OTPInput"

const meta = {
  title: "Componentes Nativos/OTPInput",
  component: OTPInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof OTPInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <OTPInput length={6} />,
}

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <div className="space-y-4">
        <OTPInput length={6} value={value} onChange={setValue} />
        <p className="text-center text-body-sm text-muted-foreground">Valor: {value || "(vazio)"}</p>
      </div>
    )
  },
}

export const Error: Story = {
  render: () => <OTPInput length={6} error />,
}

export const Disabled: Story = {
  render: () => <OTPInput length={6} disabled />,
}

export const Short: Story = {
  render: () => <OTPInput length={4} />,
}
