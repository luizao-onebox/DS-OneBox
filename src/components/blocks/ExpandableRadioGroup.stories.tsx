import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Camera, Upload, ChevronRight, HelpCircle } from "lucide-react"

import { ExpandableRadioGroup } from "./ExpandableRadioGroup"
import { Button } from "../shadcn/Button"

const meta = {
  title: "Blocks/ExpandableRadioGroup",
  component: ExpandableRadioGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ExpandableRadioGroup>

export default meta
type Story = StoryObj<typeof meta>

// Componente helper para o conteúdo expandido
const DocumentActions = () => (
  <div className="flex flex-col gap-3 mt-2">
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
      <div className="w-[400px] bg-white min-h-[600px] border rounded-3xl shadow-sm overflow-hidden flex flex-col">
        {/* Mocking the mobile header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <ChevronRight className="h-5 w-5 rotate-180" />
            </Button>
            <span className="text-sm font-medium text-muted-foreground">Validação de Identidade</span>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground rounded-full border border-muted-foreground/30">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold tracking-tight mb-2">Documento de identidade</h1>
          <p className="text-muted-foreground text-sm mb-6">
            Selecione um dos documentos listados abaixo para continuar com a validação.
          </p>

          <ExpandableRadioGroup
            defaultValue="rg"
            className="border-t border-border/60"
            options={[
              {
                id: "doc-cnh",
                value: "cnh",
                label: "CNH",
                badge: {
                  text: "Aprovação mais rápida",
                  className: "bg-green-100 text-green-800",
                },
                content: <DocumentActions />
              },
              {
                id: "doc-cin",
                value: "cin",
                label: "CIN",
                content: <DocumentActions />
              },
              {
                id: "doc-rne",
                value: "rne",
                label: "RNE",
                content: <DocumentActions />
              },
              {
                id: "doc-passaporte",
                value: "passaporte",
                label: "Passaporte",
                content: <DocumentActions />
              },
              {
                id: "doc-rg",
                value: "rg",
                label: "RG",
                badge: {
                  text: "Aprovação pode demorar mais",
                  className: "bg-amber-100 text-amber-900",
                },
                content: <DocumentActions />
              }
            ]}
          />
        </div>
      </div>
    )
  },
}
