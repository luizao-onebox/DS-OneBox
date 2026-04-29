import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { FileUploader } from "./FileUploader"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/Card"

const meta = {
  title: "Blocks/FileUploader",
  component: FileUploader,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

Bloco avançado para upload de arquivos. Combina uma área de Dropzone interativa com uma lista de progresso simulando o status de envio de cada arquivo.

## Características
- **Drag & Drop**: Área sensível a arquivos arrastados com feedback visual.
- **Progresso**: Exibe uma barra de progresso (\`Progress\`) para cada arquivo na fila.
- **Validação Visual**: Ícones indicam sucesso ou erro no upload.
- **Remoção**: Permite excluir arquivos da fila.

## Boas Práticas

### ✅ Faça
- Especifique a propriedade \`accept\` para restringir os tipos de arquivos.
- Informe claramente o limite de tamanho e quantidade permitida na UI.
- Use este bloco dentro de formulários maiores ou em modais dedicados.

### ❌ Não Faça
- Não use este componente para uploads instantâneos de foto de perfil (use um Avatar com botão de editar).
- Não esconda o feedback de erro se um upload falhar.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FileUploader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>Anexar Documentos</CardTitle>
        <CardDescription>
          Faça upload dos comprovantes necessários para a análise.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FileUploader maxFiles={3} maxSize={5} />
      </CardContent>
    </Card>
  ),
}
