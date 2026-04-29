import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { AdvancedFilter, FilterCategory } from "./AdvancedFilter"
import { Shield, AlertCircle, CheckCircle2, Clock } from "lucide-react"

const meta = {
  title: "Blocks/AdvancedFilter",
  component: AdvancedFilter,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
Um componente complexo para filtrar tabelas e listas de dados, combinando Popover, Command (combobox) e Badges ativos.

## Casos de Uso
- Filtragem de listagem de documentos (DataTable).
- Filtros de relatórios por Módulo, Tenant ou Status.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AdvancedFilter>

export default meta
type Story = StoryObj<typeof meta>

const mockCategories: FilterCategory[] = [
  {
    title: "Status",
    options: [
      { label: "Aprovado", value: "approved", icon: CheckCircle2 },
      { label: "Pendente", value: "pending", icon: Clock },
      { label: "Rejeitado", value: "rejected", icon: AlertCircle },
    ],
  },
  {
    title: "Risco",
    options: [
      { label: "Alto", value: "high", icon: Shield },
      { label: "Médio", value: "medium", icon: Shield },
      { label: "Baixo", value: "low", icon: Shield },
    ],
  },
]

export const Default: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = React.useState<Record<string, string[]>>({
      Status: ["pending"],
      Risco: ["high"],
    })

    const handleFilterChange = (categoryTitle: string, value: string, checked: boolean) => {
      setSelectedValues((prev) => {
        const categoryValues = prev[categoryTitle] || []
        if (checked) {
          return { ...prev, [categoryTitle]: [...categoryValues, value] }
        } else {
          return { ...prev, [categoryTitle]: categoryValues.filter((v) => v !== value) }
        }
      })
    }

    const handleClearFilters = () => setSelectedValues({})

    return (
      <div className="flex w-[800px] items-start p-8 border rounded-lg bg-card">
        <AdvancedFilter
          categories={mockCategories}
          selectedValues={selectedValues}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          title="Filtrar Resultados"
        />
      </div>
    )
  },
}
