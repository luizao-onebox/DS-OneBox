import * as React from "react"
import { MoreHorizontal, Plus, Calendar } from "lucide-react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { cn } from "../../lib/utils"

import { Card, CardContent, CardHeader } from "../shadcn/Card"
import { Badge } from "../shadcn/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/Avatar"
import { Button } from "../shadcn/Button"

export interface KanbanTask {
  id: string
  title: string
  tag?: { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "warning" | "success" }
  assignee?: { name: string; avatarUrl?: string }
  dueDate?: string
}

export interface KanbanColumnData {
  id: string
  title: string
  tasks: KanbanTask[]
}

export interface KanbanBoardProps {
  columns: KanbanColumnData[]
  onDragEnd?: (result: DropResult) => void
  onAddTask?: (columnId: string) => void
  onTaskClick?: (task: KanbanTask, columnId: string) => void
  className?: string
}

export function KanbanBoard({ columns, onDragEnd, onAddTask, onTaskClick, className }: KanbanBoardProps) {
  // If no onDragEnd is provided, the board won't visually update tasks across columns
  // since the parent should handle the state. We expose it so the Story can hold state.
  return (
    <DragDropContext onDragEnd={onDragEnd || (() => {})}>
      <div className={cn("flex h-full w-full gap-4 overflow-x-auto pb-4", className)}>
        {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            onAddTask={onAddTask ? () => onAddTask(col.id) : undefined}
            onTaskClick={onTaskClick ? (task) => onTaskClick(task, col.id) : undefined}
          />
        ))}
      </div>
    </DragDropContext>
  )
}

function KanbanColumn({ column, onAddTask, onTaskClick }: { column: KanbanColumnData; onAddTask?: () => void; onTaskClick?: (task: KanbanTask) => void }) {
  return (
    <div className="flex h-full w-80 flex-col shrink-0 rounded-lg bg-muted/40">
      <div className="flex items-center justify-between p-3 font-medium text-sm text-foreground">
        <div className="flex items-center gap-2">
          <span>{column.title}</span>
          <Badge variant="secondary" className="px-1.5 py-0 text-xs">
            {column.tasks.length}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          {onAddTask && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onAddTask}>
              <Plus className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn(
              "flex-1 px-3 pb-3 overflow-y-auto flex flex-col gap-3 transition-colors",
              snapshot.isDraggingOver ? "bg-muted/60 rounded-b-lg" : ""
            )}
          >
            {column.tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      opacity: snapshot.isDragging ? 0.8 : 1,
                    }}
                  >
                    <KanbanCard task={task} onClick={onTaskClick ? () => onTaskClick(task) : undefined} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export function KanbanCard({ task, onClick }: { task: KanbanTask; onClick?: () => void }) {
  return (
    <Card 
      className="cursor-grab active:cursor-grabbing hover:ring-1 hover:ring-primary/50 transition-all shadow-sm"
      onClick={onClick}
    >
      <CardHeader className="p-3 pb-0">
        {task.tag && (
          <div className="mb-2">
            <Badge variant={task.tag.variant} className="text-[10px] px-1.5 py-0 h-5">
              {task.tag.label}
            </Badge>
          </div>
        )}
        <h4 className="text-sm font-medium leading-tight">{task.title}</h4>
      </CardHeader>
      <CardContent className="p-3 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
          {task.dueDate && (
            <>
              <Calendar className="h-3 w-3" />
              <span>{task.dueDate}</span>
            </>
          )}
        </div>
        {task.assignee && (
          <Avatar className="h-6 w-6">
            <AvatarImage src={task.assignee.avatarUrl} alt={task.assignee.name} />
            <AvatarFallback className="text-[10px]">
              {task.assignee.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </CardContent>
    </Card>
  )
}
