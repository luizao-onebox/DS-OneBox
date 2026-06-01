import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Camera, Upload, ChevronRight, HelpCircle } from "lucide-react"

import { ExpandableRadioItem } from "./ExpandableRadioItem"
import { RadioGroup } from "../shadcn/RadioGroup"
import { Button } from "../shadcn/Button"

const meta = {
  title: "Blocks/ExpandableRadioItem",
  component: ExpandableRadioItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ExpandableRadioItem>

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

          <RadioGroup defaultValue="rg" className="flex flex-col gap-0 border-t border-border/60">
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
          </RadioGroup>
        </div>
      </div>
    )
  },
}
