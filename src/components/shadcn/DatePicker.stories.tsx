import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { DatePicker, ptBR } from "./DatePicker"

const meta = {
  title: "shadcn/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      control: "text",
      description: "Placeholder text when no date is selected",
    },
    disabled: {
      control: "boolean",
      description: "Disable the date picker",
    },
    format: {
      control: "select",
      options: ["PPP", "PP", "P", "d MMM yyyy", "dd/MM/yyyy", "MM/dd/yyyy"],
      description: "Date format string (date-fns format)",
    },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    return <DatePicker {...args} date={date} onDateChange={setDate} className="w-[280px]" />
  },
}

export const WithSelectedDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <div className="flex flex-col gap-4">
        <DatePicker date={date} onDateChange={setDate} className="w-[280px]" />
        <p className="text-body-sm text-muted-foreground">
          Selected: {date?.toLocaleDateString("pt-BR")}
        </p>
      </div>
    )
  },
}

export const PortugueseLocale: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    return (
      <DatePicker
        {...args}
        date={date}
        onDateChange={setDate}
        locale={ptBR}
        className="w-[280px]"
      />
    )
  },
}

export const WithDateRange: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const today = new Date()
    const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    return (
      <div className="flex flex-col gap-4">
        <DatePicker
          {...args}
          date={date}
          onDateChange={setDate}
          fromDate={lastWeek}
          toDate={today}
          className="w-[280px]"
        />
        <p className="text-body-sm text-muted-foreground">
          Range: {lastWeek.toLocaleDateString()} - {today.toLocaleDateString()}
        </p>
      </div>
    )
  },
}

export const Disabled: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return <DatePicker date={date} onDateChange={setDate} disabled className="w-[280px]" />
  },
}

export const CustomFormat: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date())
    return (
      <div className="flex flex-col gap-4">
        <DatePicker date={date} onDateChange={setDate} format="dd/MM/yyyy" className="w-[280px]" />
        <DatePicker date={date} onDateChange={setDate} format="d MMM yyyy" className="w-[280px]" />
      </div>
    )
  },
}
