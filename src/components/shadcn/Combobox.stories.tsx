// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { Combobox } from "./Combobox"

const meta = {
  title: "Componentes Nativos/Combobox",
  component: Combobox,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

const options = [
  { value: "react", label: "React", group: "Frameworks" },
  { value: "vue", label: "Vue", group: "Frameworks" },
  { value: "angular", label: "Angular", group: "Frameworks" },
  { value: "svelte", label: "Svelte", group: "Frameworks" },
  { value: "typescript", label: "TypeScript", group: "Linguagens" },
  { value: "javascript", label: "JavaScript", group: "Linguagens" },
  { value: "python", label: "Python", group: "Linguagens" },
]

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("")
    return (
      <div className="w-full max-w-sm">
        <Combobox options={options} value={value} onValueChange={setValue} placeholder="Selecione..." />
      </div>
    )
  },
}

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState("react")
    return (
      <div className="w-full max-w-sm space-y-4">
        <Combobox options={options} value={value} onValueChange={setValue} placeholder="Selecione..." />
        <p className="text-body-sm text-muted-foreground">Selecionado: {value}</p>
      </div>
    )
  },
}

export const Creatable: Story = {
  render: () => {
    const [value, setValue] = useState("")
    const [customOptions, setCustomOptions] = useState(options)
    return (
      <div className="w-full max-w-sm space-y-4">
        <Combobox
          options={customOptions}
          value={value}
          onValueChange={setValue}
          creatable
          onCreate={(v) => setCustomOptions((prev) => [...prev, { value: v.toLowerCase(), label: v }])}
          placeholder="Crie uma opção..."
        />
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <Combobox options={options} disabled placeholder="Desabilitado" />
    </div>
  ),
}
