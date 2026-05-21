import * as React from "react"
import { cn } from "../../lib/utils"
import { Search, Command, CornerDownLeft, ArrowUp, ArrowDown } from "lucide-react"

interface CommandItem {
  id: string
  label: string
  icon?: React.ReactNode
  shortcut?: string[]
  action?: () => void
  disabled?: boolean
  group?: string
}

interface CommandPaletteProps {
  items: CommandItem[]
  open?: boolean
  onOpenChange?: (open: boolean) => void
  placeholder?: string
  className?: string
}

const CommandPalette = React.forwardRef<HTMLDivElement, CommandPaletteProps>(
  ({
    items,
    open: controlledOpen,
    onOpenChange,
    placeholder = "Type a command or search...",
    className,
  }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState("")
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const inputRef = React.useRef<HTMLInputElement>(null)
    const listRef = React.useRef<HTMLDivElement>(null)

    const isOpen = controlledOpen !== undefined ? controlledOpen : open

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault()
          const newOpen = !isOpen
          setOpen(newOpen)
          onOpenChange?.(newOpen)
          if (newOpen) {
            setSearch("")
            setSelectedIndex(0)
          }
        }
        if (e.key === "Escape" && isOpen) {
          setOpen(false)
          onOpenChange?.(false)
        }
      }
      document.addEventListener("keydown", handleKeyDown)
      return () => document.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onOpenChange])

    React.useEffect(() => {
      if (isOpen) {
        inputRef.current?.focus()
      }
    }, [isOpen])

    React.useEffect(() => {
      setSelectedIndex(0)
    }, [search])

    const filteredItems = items.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase())
    )

    const groupedItems = React.useMemo(() => {
      const groups: Record<string, CommandItem[]> = {}
      filteredItems.forEach((item) => {
        const group = item.group || "Commands"
        if (!groups[group]) groups[group] = []
        groups[group].push(item)
      })
      return groups
    }, [filteredItems])

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, filteredItems.length - 1))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        const item = filteredItems[selectedIndex]
        if (item && !item.disabled) {
          item.action?.()
          setOpen(false)
          onOpenChange?.(false)
        }
      }
    }

    React.useEffect(() => {
      if (listRef.current) {
        const selected = listRef.current.querySelector(`[data-index="${selectedIndex}"]`)
        selected?.scrollIntoView({ block: "nearest" })
      }
    }, [selectedIndex])

    if (!isOpen) return null

    let globalIndex = -1

    return (
      <div className="fixed inset-0 z-50 bg-black/50 animate-fade-in" onClick={() => { setOpen(false); onOpenChange?.(false) }}>
        <div
          className={cn(
            "fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl",
            "bg-popover border rounded-lg shadow-2xl overflow-hidden animate-scale-in",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 border-b px-4 py-3">
            <Search className="h-5 w-5 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className="flex-1 bg-transparent text-body-md outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 text-body-xs font-medium text-muted-foreground">
              <CornerDownLeft className="h-3 w-3" />
            </kbd>
          </div>

          <div ref={listRef} className="max-h-80 overflow-y-auto py-2">
            {Object.entries(groupedItems).map(([group, groupItems]) => (
              <div key={group}>
                <div className="px-3 py-1.5 text-body-xs font-semibold text-muted-foreground">
                  {group}
                </div>
                {groupItems.map((item) => {
                  globalIndex++
                  const currentIndex = globalIndex
                  const isSelected = currentIndex === selectedIndex
                  return (
                    <button
                      key={item.id}
                      data-index={currentIndex}
                      onClick={() => {
                        if (!item.disabled) {
                          item.action?.()
                          setOpen(false)
                          onOpenChange?.(false)
                        }
                      }}
                      disabled={item.disabled}
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2 text-body-sm transition-colors",
                        isSelected && "bg-accent text-accent-foreground",
                        item.disabled && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {item.icon && <span className="shrink-0">{item.icon}</span>}
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.shortcut && (
                        <div className="flex gap-1 shrink-0">
                          {item.shortcut.map((key) => (
                            <kbd key={key} className="rounded bg-muted px-1.5 py-0.5 text-body-xs font-medium">
                              {key}
                            </kbd>
                          ))}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="px-3 py-6 text-center text-body-sm text-muted-foreground">
                Nenhum resultado encontrado
              </div>
            )}
          </div>

          <div className="border-t px-3 py-2 flex items-center gap-4 text-body-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ArrowUp className="h-3 w-3" /> <ArrowDown className="h-3 w-3" /> navegar
            </span>
            <span className="flex items-center gap-1">
              <CornerDownLeft className="h-3 w-3" /> selecionar
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded bg-muted px-1">esc</kbd> fechar
            </span>
          </div>
        </div>
      </div>
    )
  }
)
CommandPalette.displayName = "CommandPalette"

export { CommandPalette }
export type { CommandItem }
