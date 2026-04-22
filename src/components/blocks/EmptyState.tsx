import * as React from "react"
import { FileQuestion, FolderX, ServerCrash } from "lucide-react"
import { Button } from "../shadcn/Button"

interface EmptyStateProps {
  /** Título principal do estado vazio */
  title: string
  /** Texto explicativo abaixo do título */
  description: string
  /** Ícone central. Padrão: FileQuestion */
  icon?: React.ReactNode
  /** Rótulo do botão de ação. Se omitido, o botão não será renderizado. */
  actionLabel?: string
  /** Função disparada ao clicar no botão de ação */
  onAction?: () => void
}

/**
 * @description
 * Bloco de estado vazio (Empty State) para ser usado quando não houver dados.
 * 
 * **REGRAS PARA A IA:**
 * - Renderize este componente quando um fetch de API retornar 0 itens ou quando uma busca de DataTable não encontrar resultados.
 * - Use para orientar o usuário (ex: "Criar o primeiro projeto").
 */
export function EmptyState({
  title,
  description,
  icon = <FileQuestion className="h-10 w-10 text-muted-foreground" />,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mb-4">
          {icon}
        </div>
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          {description}
        </p>
        {actionLabel && (
          <Button onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}
