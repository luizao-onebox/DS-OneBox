import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { DropResult } from "@hello-pangea/dnd"
import { KanbanBoard, KanbanColumnData, KanbanTask } from "./Kanban"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../shadcn/Dialog"
import { Input } from "../shadcn/Input"
import { Label } from "../shadcn/Label"
import { Button } from "../shadcn/Button"

const meta = {
  title: "Blocks/KanbanBoard",
  component: KanbanBoard,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `

Bloco visual e interativo para organizar tarefas em colunas.
Utiliza a biblioteca \`@hello-pangea/dnd\` para habilitar **Drag and Drop** completo entre colunas e reordenação.

## Funcionalidades
- **Drag and Drop**: Arraste os cartões de uma coluna para outra.
- **Criação de Tarefas**: Botão de \`+\` no cabeçalho das colunas permite criar novas tarefas interativamente.
- **Scroll Inteligente**: As colunas scrollam independentemente, e o board principal tem scroll horizontal se houver muitas colunas.
        `,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof KanbanBoard>

export default meta
type Story = StoryObj<typeof meta>

const initialColumns: KanbanColumnData[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "task-1",
        title: "Revisar especificações do módulo de IA",
        tag: { label: "Design", variant: "outline" },
        dueDate: "12 Abr",
        assignee: { name: "Luiz" },
      },
      {
        id: "task-2",
        title: "Implementar autenticação via SSO",
        tag: { label: "Backend", variant: "default" },
        dueDate: "15 Abr",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "task-3",
        title: "Migrar banco de dados para a nova estrutura",
        tag: { label: "DevOps", variant: "warning" },
        assignee: { name: "Maria", avatarUrl: "https://github.com/shadcn.png" },
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "task-4",
        title: "Criar layout da Topbar",
        tag: { label: "Frontend", variant: "success" },
        dueDate: "Ontem",
        assignee: { name: "Luiz" },
      },
      {
        id: "task-5",
        title: "Aprovar PR de correções",
        assignee: { name: "Carlos" },
      },
    ],
  },
]

const KanbanContainer = () => {
  const [columns, setColumns] = React.useState<KanbanColumnData[]>(initialColumns)
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [modalMode, setModalMode] = React.useState<"add" | "edit">("add")
  const [activeColumnId, setActiveColumnId] = React.useState<string | null>(null)
  const [activeTaskId, setActiveTaskId] = React.useState<string | null>(null)
  
  // Form State
  const [taskTitle, setTaskTitle] = React.useState("")
  const [taskTag, setTaskTag] = React.useState("")
  const [taskDate, setTaskDate] = React.useState("")
  const [taskAssignee, setTaskAssignee] = React.useState("")

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // If dropped outside a droppable area
    if (!destination) return

    // If dropped in the same place
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const sourceColIndex = columns.findIndex((col) => col.id === source.droppableId)
    const destColIndex = columns.findIndex((col) => col.id === destination.droppableId)

    const sourceCol = columns[sourceColIndex]
    const destCol = columns[destColIndex]

    const sourceTasks = [...sourceCol.tasks]
    const destTasks = source.droppableId === destination.droppableId ? sourceTasks : [...destCol.tasks]

    // Remove from source
    const [movedTask] = sourceTasks.splice(source.index, 1)

    // Insert into destination
    destTasks.splice(destination.index, 0, movedTask)

    const newColumns = [...columns]
    newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks }
    newColumns[destColIndex] = { ...destCol, tasks: destTasks }

    setColumns(newColumns)
  }

  const handleAddTask = (columnId: string) => {
    setModalMode("add")
    setActiveColumnId(columnId)
    setActiveTaskId(null)
    setTaskTitle("")
    setTaskTag("")
    setTaskDate("")
    setTaskAssignee("")
    setIsModalOpen(true)
  }

  const handleTaskClick = (task: KanbanTask, columnId: string) => {
    setModalMode("edit")
    setActiveColumnId(columnId)
    setActiveTaskId(task.id)
    setTaskTitle(task.title)
    setTaskTag(task.tag?.label || "")
    setTaskDate(task.dueDate || "")
    setTaskAssignee(task.assignee?.name || "")
    setIsModalOpen(true)
  }

  const handleSaveTask = () => {
    if (!taskTitle || taskTitle.trim() === "" || !activeColumnId) return

    setColumns((prev) => {
      if (modalMode === "add") {
        const newTask: KanbanTask = {
          id: `task-${Date.now()}`,
          title: taskTitle,
          tag: taskTag ? { label: taskTag, variant: "default" } : undefined,
          dueDate: taskDate || undefined,
          assignee: taskAssignee ? { name: taskAssignee } : undefined,
        }
        return prev.map((col) => {
          if (col.id === activeColumnId) {
            return { ...col, tasks: [...col.tasks, newTask] }
          }
          return col
        })
      } else {
        return prev.map((col) => {
          if (col.id === activeColumnId) {
            return {
              ...col,
              tasks: col.tasks.map((t) => {
                if (t.id === activeTaskId) {
                  return {
                    ...t,
                    title: taskTitle,
                    tag: taskTag ? { label: taskTag, variant: t.tag?.variant || "default" } : undefined,
                    dueDate: taskDate || undefined,
                    assignee: taskAssignee ? { ...t.assignee, name: taskAssignee } : undefined,
                  }
                }
                return t
              }),
            }
          }
          return col
        })
      }
    })
    
    setIsModalOpen(false)
  }

  const handleDeleteTask = () => {
    if (!activeColumnId || !activeTaskId) return
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === activeColumnId) {
          return { ...col, tasks: col.tasks.filter((t) => t.id !== activeTaskId) }
        }
        return col
      })
    )
    setIsModalOpen(false)
  }

  return (
    <div className="h-[600px] p-6 bg-background flex flex-col">
      <div className="mb-6 shrink-0">
        <h2 className="text-2xl font-bold tracking-tight">Roadmap do Produto</h2>
        <p className="text-muted-foreground">Acompanhamento das tarefas da Sprint atual.</p>
      </div>
      <div className="flex-1 overflow-hidden">
        <KanbanBoard
          columns={columns}
          onDragEnd={handleDragEnd}
          onAddTask={handleAddTask}
          onTaskClick={handleTaskClick}
        />
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{modalMode === "add" ? "Nova Tarefa" : "Editar Tarefa"}</DialogTitle>
            <DialogDescription>
              {modalMode === "add" 
                ? "Preencha os detalhes da nova tarefa para adicioná-la ao board."
                : "Atualize os detalhes da tarefa selecionada."
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título da Tarefa <span className="text-destructive">*</span></Label>
              <Input id="title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Ex: Ajustar padding do header" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tag">Tag (Opcional)</Label>
                <Input id="tag" value={taskTag} onChange={(e) => setTaskTag(e.target.value)} placeholder="Ex: Frontend" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Data (Opcional)</Label>
                <Input id="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} placeholder="Ex: 20 Abr" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignee">Responsável (Opcional)</Label>
              <Input id="assignee" value={taskAssignee} onChange={(e) => setTaskAssignee(e.target.value)} placeholder="Nome do responsável" />
            </div>
          </div>
          <DialogFooter className="flex justify-between w-full sm:justify-between">
            {modalMode === "edit" ? (
              <Button variant="destructive" onClick={handleDeleteTask}>Excluir</Button>
            ) : (
              <div />
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleSaveTask}>{modalMode === "add" ? "Salvar Tarefa" : "Salvar Alterações"}</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <KanbanContainer />,
}
