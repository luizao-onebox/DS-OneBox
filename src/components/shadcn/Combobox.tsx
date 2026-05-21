import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronDown, Check, Search, X } from "lucide-react"

interface ComboboxOption {
  value: string
  label: string
  group?: string
  disabled?: boolean
}

interface ComboboxProps {
  options: ComboboxOption[]
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  disabled?: boolean
  className?: string
  creatable?: boolean
  onCreate?: (value: string) => void
}

const Combobox = React.forwardRef<HTMLDivElement, ComboboxProps>(
  ({
    options,
    value,
    onValueChange,
    placeholder = "Selecione...",
    searchPlaceholder = "Buscar...",
    emptyMessage = "Nenhum resultado encontrado",
    disabled = false,
    className,
    creatable = false,
    onCreate,
  }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState("")
    const containerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const selectedOption = options.find((opt) => opt.value === value)

    const filteredOptions = options.filter((opt) =>
      opt.label.toLowerCase().includes(search.toLowerCase())
    )

    const groupedOptions = React.useMemo(() => {
      const groups: Record<string, ComboboxOption[]> = {}
      filteredOptions.forEach((opt) => {
        const group = opt.group || ""
        if (!groups[group]) groups[group] = []
        groups[group].push(opt)
      })
      return groups
    }, [filteredOptions])

    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false)
          setSearch("")
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSelect = (optValue: string) => {
      onValueChange?.(optValue)
      setOpen(false)
      setSearch("")
    }

    const handleCreate = () => {
      if (search.trim() && onCreate) {
        onCreate(search.trim())
        setSearch("")
        setOpen(false)
      }
    }

    return (
      <div ref={containerRef} className={cn("relative", className)}>
        <button
          type="button"
          onClick={() => {
            if (!disabled) {
              setOpen(!open)
              if (!open) inputRef.current?.focus()
            }
          }}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-body-sm ring-offset-background",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "hover:border-primary/50 transition-colors"
          )}
        >
          <span className={selectedOption ? "text-foreground" : "text-muted-foreground"}>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
        </button>

        {open && (
          <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-lg animate-scale-in origin-top">
            <div className="flex items-center gap-2 border-b px-2 pb-2">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex-1 bg-transparent text-body-sm outline-none placeholder:text-muted-foreground"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="max-h-60 overflow-y-auto py-1">
              {Object.entries(groupedOptions).map(([group, groupOptions]) => (
                <div key={group}>
                  {group && (
                    <div className="px-2 py-1.5 text-body-xs font-semibold text-muted-foreground">
                      {group}
                    </div>
                  )}
                  {groupOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => !opt.disabled && handleSelect(opt.value)}
                      disabled={opt.disabled}
                      className={cn(
                        "relative flex w-full items-center rounded-sm px-2 py-1.5 text-body-sm outline-none",
                        "cursor-pointer transition-colors",
                        opt.value === value && "bg-accent text-accent-foreground",
                        opt.disabled && "opacity-50 cursor-not-allowed",
                        !opt.disabled && "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4 shrink-0",
                          opt.value === value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {opt.label}
                    </button>
                  ))}
                </div>
              ))}

              {filteredOptions.length === 0 && !creatable && (
                <div className="px-2 py-4 text-center text-body-sm text-muted-foreground">
                  {emptyMessage}
                </div>
              )}

              {creatable && search.trim() && !options.some((o) => o.label.toLowerCase() === search.toLowerCase()) && (
                <button
                  type="button"
                  onClick={handleCreate}
                  className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-body-sm text-primary hover:bg-accent transition-colors"
                >
                  <span className="text-muted-foreground">Criar:</span>
                  <span className="font-medium">"{search.trim()}"</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }
)
Combobox.displayName = "Combobox"

export { Combobox }
export type { ComboboxOption }
