import * as React from "react"
import { cn } from "../../lib/utils"
import { GripVertical, ChevronRight, ChevronDown } from "lucide-react"

interface DragItem {
  id: string
  [key: string]: unknown
}

interface DragDropContextValue {
  draggedId: string | null
  dragOverId: string | null
  handleDragStart: (e: React.DragEvent, id: string) => void
  handleDragOver: (e: React.DragEvent, id: string) => void
  handleDragEnd: () => void
  handleDrop: (e: React.DragEvent, targetId: string) => void
  registerDraggedId: (id: string) => void
  unregisterDraggedId: (id: string) => void
}

const DragDropContext = React.createContext<DragDropContextValue | null>(null)

function useDragDrop() {
  const context = React.useContext(DragDropContext)
  if (!context) throw new Error("useDragDrop must be used within DragDropProvider")
  return context
}

interface DragDropProviderProps {
  children: React.ReactNode
  onReorder?: (fromId: string, toId: string) => void
}

function DragDropProvider({ children, onReorder }: DragDropProviderProps) {
  const [draggedId, setDraggedId] = React.useState<string | null>(null)
  const [dragOverId, setDragOverId] = React.useState<string | null>(null)
  const draggedIdRef = React.useRef<string | null>(null)

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id)
    draggedIdRef.current = id
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/plain", id)
  }

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    if (draggedIdRef.current !== id) {
      setDragOverId(id)
    }
  }

  const handleDragEnd = () => {
    setDraggedId(null)
    setDragOverId(null)
    draggedIdRef.current = null
  }

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault()
    const fromId = e.dataTransfer.getData("text/plain") || draggedIdRef.current
    if (fromId && fromId !== targetId && onReorder) {
      onReorder(fromId, targetId)
    }
    handleDragEnd()
  }

  const registerDraggedId = (id: string) => {}
  const unregisterDraggedId = (id: string) => {}

  return (
    <DragDropContext.Provider
      value={{
        draggedId,
        dragOverId,
        handleDragStart,
        handleDragOver,
        handleDragEnd,
        handleDrop,
        registerDraggedId,
        unregisterDraggedId,
      }}
    >
      {children}
    </DragDropContext.Provider>
  )
}

interface DraggableProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  children: React.ReactNode
}

function Draggable({ id, children, className, ...props }: DraggableProps) {
  const { handleDragStart, handleDragOver, handleDragEnd, handleDrop, draggedId, dragOverId } = useDragDrop()
  const isDragging = draggedId === id
  const isDragOver = dragOverId === id

  return (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, id)}
      onDragOver={(e) => handleDragOver(e, id)}
      onDragEnd={handleDragEnd}
      onDrop={(e) => handleDrop(e, id)}
      className={cn(
        "transition-all duration-150",
        isDragging && "opacity-50 scale-[0.98]",
        isDragOver && "ring-2 ring-primary ring-offset-2 rounded-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface DroppableProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string
  children: React.ReactNode
}

function Droppable({ id, children, className, ...props }: DroppableProps) {
  const { dragOverId } = useDragDrop()
  const isDragOver = dragOverId === id

  return (
    <div
      className={cn(
        "transition-all duration-150",
        isDragOver && "bg-primary/5 rounded-md",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface SortableItem {
  id: string
  content: React.ReactNode
  icon?: React.ReactNode
  disabled?: boolean
}

interface SortableListProps extends React.HTMLAttributes<HTMLDivElement> {
  items: SortableItem[]
  onReorder?: (fromIndex: number, toIndex: number) => void
}

function SortableList({ items, onReorder, className, ...props }: SortableListProps) {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null)
  const [overIndex, setOverIndex] = React.useState<number | null>(null)

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setOverIndex(index)
  }

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== targetIndex && onReorder) {
      onReorder(draggedIndex, targetIndex)
    }
    setDraggedIndex(null)
    setOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setOverIndex(null)
  }

  return (
    <div ref={null} className={cn("space-y-1", className)} {...props}>
      {items.map((item, index) => (
        <div
          key={item.id}
          draggable={!item.disabled}
          onDragStart={(e) => !item.disabled && handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={cn(
            "flex items-center gap-3 p-3 rounded-md border bg-card",
            "transition-all duration-150 cursor-grab active:cursor-grabbing",
            item.disabled && "opacity-50 cursor-not-allowed",
            draggedIndex === index && "opacity-50 scale-[0.98]",
            overIndex === index && draggedIndex !== null && draggedIndex !== index && "border-primary bg-primary/5"
          )}
        >
          <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
          {item.icon && <span className="shrink-0">{item.icon}</span>}
          <span className="flex-1 text-body-sm">{item.content}</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      ))}
    </div>
  )
}

export { DragDropProvider, Draggable, Droppable, SortableList }
export type { DragItem, SortableItem }
