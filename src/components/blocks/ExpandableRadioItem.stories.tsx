import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Camera, Upload, ChevronRight } from "lucide-react"

import { ExpandableRadioItem, ExpandableRadioGroup } from "./ExpandableRadioItem"
import { Button } from "../shadcn/Button"

const meta = {
  title: "Blocks/ExpandableRadioItem",
  component: ExpandableRadioItem,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ExpandableRadioItem>

export default meta
type Story = StoryObj<typeof meta>

const DocumentActions = () => (
  <div className="flex flex-col gap-3">
    <Button 
      variant="outline" 
      className="w-full justify-start h-14 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 bg-white"
    >
      <Camera className="mr-3 h-5 w-5" />
      <span className="text-base font-normal">Tirar foto do documento</span>
      <ChevronRight className="ml-auto h-5 w-5 opacity-50" />
    </Button>
    <Button 
      variant="outline" 
      className="w-full justify-start h-14 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 bg-white"
    >
      <Upload className="mr-3 h-5 w-5" />
      <span className="text-base font-normal">Fazer upload do documento</span>
      <ChevronRight className="ml-auto h-5 w-5 opacity-50" />
    </Button>
  </div>
)

export const Default: Story = {
  render: () => {
    return (
      <div className="w-[400px] border rounded-xl overflow-hidden shadow-sm">
        <ExpandableRadioGroup defaultValue="rg">
          <ExpandableRadioItem 
            value="cnh" 
            label="CNH" 
            badge={
              <span className="px-2 py-0.5 text-xs font-medium rounded-md whitespace-nowrap bg-green-100 text-green-800">
                Aprovação mais rápida
              </span>
            }
          >
            <DocumentActions />
          </ExpandableRadioItem>

          <ExpandableRadioItem value="cin" label="CIN">
            <DocumentActions />
          </ExpandableRadioItem>

          <ExpandableRadioItem value="rne" label="RNE">
            <DocumentActions />
          </ExpandableRadioItem>

          <ExpandableRadioItem value="passaporte" label="Passaporte">
            <DocumentActions />
          </ExpandableRadioItem>

          <ExpandableRadioItem 
            value="rg" 
            label="RG"
            badge={
              <span className="px-2 py-0.5 text-xs font-medium rounded-md whitespace-nowrap bg-amber-100 text-amber-900">
                Aprovação pode demorar mais
              </span>
            }
          >
            <DocumentActions />
          </ExpandableRadioItem>
        </ExpandableRadioGroup>
      </div>
    )
  },
}

export const WithoutBadge: Story = {
  render: () => {
    return (
      <div className="w-[400px] border rounded-xl overflow-hidden shadow-sm">
        <ExpandableRadioGroup defaultValue="option1">
          <ExpandableRadioItem value="option1" label="Opção 1">
            <p className="text-sm text-muted-foreground">Conteúdo expandido da opção 1</p>
          </ExpandableRadioItem>

          <ExpandableRadioItem value="option2" label="Opção 2">
            <p className="text-sm text-muted-foreground">Conteúdo expandido da opção 2</p>
          </ExpandableRadioItem>

          <ExpandableRadioItem value="option3" label="Opção 3">
            <p className="text-sm text-muted-foreground">Conteúdo expandido da opção 3</p>
          </ExpandableRadioItem>
        </ExpandableRadioGroup>
      </div>
    )
  },
}

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState("cnh")

    return (
      <div className="w-[400px] space-y-4">
        <p className="text-sm text-muted-foreground">
          Valor selecionado: <strong>{selected}</strong>
        </p>
        <div className="border rounded-xl overflow-hidden shadow-sm">
          <ExpandableRadioGroup value={selected} onValueChange={setSelected}>
            <ExpandableRadioItem value="cnh" label="CNH">
              <p className="text-sm text-muted-foreground">Carteira Nacional de Habilitação</p>
            </ExpandableRadioItem>

            <ExpandableRadioItem value="rg" label="RG">
              <p className="text-sm text-muted-foreground">Registro Geral</p>
            </ExpandableRadioItem>

            <ExpandableRadioItem value="passaporte" label="Passaporte">
              <p className="text-sm text-muted-foreground">Documento de viagem internacional</p>
            </ExpandableRadioItem>
          </ExpandableRadioGroup>
        </div>
      </div>
    )
  },
}
