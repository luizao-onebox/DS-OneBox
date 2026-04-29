import * as React from "react"
import { MoreHorizontal, Plus, Calendar } from "lucide-react"
import { cn } from "../../lib/utils"

import { Card, CardContent, CardHeader } from "../shadcn/Card"
import { Badge } from "../shadcn/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/Avatar"
import { Button } from "../shadcn/Button"
import { ScrollArea } from "../shadcn/ScrollArea"

export interface KanbanTask {
  id: string
  title: string
  tag?: { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "warning" | "success" }
  assignee?: { name: string; avatarUrl?: string }
  dueDate?: string
}

export interface KanbanColumnProps {
  title: string
  tasks: KanbanTask[]
  onAddTask?: () => void
}

export function KanbanBoard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex h-full w-full gap-4 overflow-x-auto pb-4", className)}>
      {children}
    </div>
  )
}

export function KanbanColumn({ title, tasks, onAddTask }: KanbanColumnProps) {
  return (
    <div className="flex h-full w-80 flex-col shrink-0 rounded-lg bg-muted/40">
      <div className="flex items-center justify-between p-3 font-medium text-sm text-foreground">
        <div className="flex items-center gap-2">
          <span>{title}</span>
          <Badge variant="secondary" className="px-1.5 py-0 text-xs">
            {tasks.length}
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
      <ScrollArea className="flex-1 px-3 pb-3">
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export function KanbanCard({ task }: { task: KanbanTask }) {
  return (
    <Card className="cursor-grab hover:ring-1 hover:ring-primary/50 transition-all shadow-sm">
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
