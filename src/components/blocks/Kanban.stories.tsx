import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { KanbanBoard, KanbanColumn, KanbanTask } from "./Kanban"

const meta = {
  title: "Blocks/KanbanBoard",
  component: KanbanBoard,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# Kanban Board

Bloco visual para organizar tarefas, projetos ou cards em colunas (estilo Trello/Jira). Utiliza a \`ScrollArea\` internamente para rolagem suave das colunas.

## Estrutura
- **\`KanbanBoard\`**: Container horizontal com scroll (flex-row).
- **\`KanbanColumn\`**: Coluna vertical com cabeçalho e scroll interno.
- **\`KanbanCard\`**: Cartão de tarefa, composto pelo componente \`Card\` básico.

*(Nota: Este é um componente visual para o Design System. Para drag-and-drop real, recomenda-se integrar com \`dnd-kit\` ou \`react-beautiful-dnd\` usando este layout como base).*
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof KanbanBoard>

export default meta
type Story = StoryObj<typeof meta>

const tasksTodo: KanbanTask[] = [
  {
    id: "1",
    title: "Revisar especificações do módulo de IA",
    tag: { label: "Design", variant: "outline" },
    dueDate: "12 Abr",
    assignee: { name: "Luiz" }
  },
  {
    id: "2",
    title: "Implementar autenticação via SSO",
    tag: { label: "Backend", variant: "default" },
    dueDate: "15 Abr",
  },
]

const tasksInProgress: KanbanTask[] = [
  {
    id: "3",
    title: "Migrar banco de dados para a nova estrutura",
    tag: { label: "DevOps", variant: "warning" },
    assignee: { name: "Maria", avatarUrl: "https://github.com/shadcn.png" }
  },
]

const tasksDone: KanbanTask[] = [
  {
    id: "4",
    title: "Criar layout da Topbar",
    tag: { label: "Frontend", variant: "success" },
    dueDate: "Ontem",
    assignee: { name: "Luiz" }
  },
  {
    id: "5",
    title: "Aprovar PR de correções",
    assignee: { name: "Carlos" }
  },
]

export const Default: Story = {
  render: () => (
    <div className="h-[600px] p-6 bg-background">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Roadmap do Produto</h2>
        <p className="text-muted-foreground">Acompanhamento das tarefas da Sprint atual.</p>
      </div>
      <KanbanBoard className="h-[450px]">
        <KanbanColumn title="To Do" tasks={tasksTodo} onAddTask={() => {}} />
        <KanbanColumn title="In Progress" tasks={tasksInProgress} onAddTask={() => {}} />
        <KanbanColumn title="Done" tasks={tasksDone} />
      </KanbanBoard>
    </div>
  ),
}
