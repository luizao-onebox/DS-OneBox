import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { toast } from "sonner"
import { Toaster } from "./Sonner"
import { Button } from "./Button"

const meta = {
  title: "Components/Sonner (Toast)",
  component: Toaster,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

Uma alternativa moderna e altamente animada ao clássico \`Toast\`. Baseado na biblioteca \`sonner\`.

Diferente do Toast antigo (que usa Context e Provider nativos), o Sonner requer apenas que você coloque o \`<Toaster />\` na raiz do seu App (App.tsx / Layout.tsx) e chame \`toast("Mensagem")\` em qualquer lugar.

## Anatomia

1. **\`<Toaster>\`**: O componente renderizador (Container). Deve ser colocado 1 única vez no projeto.
2. **\`toast()\`**: A função utilitária importada de \`sonner\` usada para disparar os alertas.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast("Evento criado", {
            description: "Segunda-feira, 3 de Janeiro as 9:00",
            action: {
              label: "Desfazer",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Disparar Sonner
      </Button>
    </div>
  ),
}
