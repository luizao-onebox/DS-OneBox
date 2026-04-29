import * as React from "react"
import { PlusCircle, Filter, X } from "lucide-react"

import { Button } from "../shadcn/Button"
import { Badge } from "../shadcn/Badge"
import { Separator } from "../shadcn/Separator"
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/Popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../shadcn/Command"

export interface FilterOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface FilterCategory {
  title: string
  options: FilterOption[]
}

export interface AdvancedFilterProps {
  categories: FilterCategory[]
  selectedValues?: Record<string, string[]> // { categoryTitle: [values] }
  onFilterChange?: (categoryTitle: string, value: string, checked: boolean) => void
  onClearFilters?: () => void
  title?: string
}

export function AdvancedFilter({
  categories = [],
  selectedValues = {},
  onFilterChange,
  onClearFilters,
  title = "Filtros",
}: AdvancedFilterProps) {
  const activeCount = Object.values(selectedValues).reduce((acc, val) => acc + val.length, 0)

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <Filter className="mr-2 h-4 w-4" />
            {title}
            {activeCount > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                  {activeCount}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {activeCount > 2 ? (
                    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                      {activeCount} ativos
                    </Badge>
                  ) : (
                    Object.entries(selectedValues).flatMap(([cat, vals]) =>
                      val
                    ) // simplificando a exibição para a story
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder={title} />
            <CommandList>
              <CommandEmpty>Nenhum resultado.</CommandEmpty>
              {categories.map((category) => (
                <CommandGroup key={category.title} heading={category.title}>
                  {category.options.map((option) => {
                    const isSelected = selectedValues[category.title]?.includes(option.value)
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => onFilterChange?.(category.title, option.value, !isSelected)}
                      >
                        <div
                          className={\`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border \${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          }\`}
                        >
                          <Check className="h-4 w-4" />
                        </div>
                        {option.icon && (
                          <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{option.label}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              ))}
              {activeCount > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={onClearFilters}
                      className="justify-center text-center"
                    >
                      Limpar filtros
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Render Active Badges fora do botão */}
      {activeCount > 0 && (
        <div className="flex gap-2">
          {Object.entries(selectedValues).map(([categoryTitle, values]) => {
            if (values.length === 0) return null
            const category = categories.find(c => c.title === categoryTitle)
            
            return values.map(val => {
              const option = category?.options.find(o => o.value === val)
              return (
                <Badge key={\`\${categoryTitle}-\${val}\`} variant="secondary" className="h-8 gap-1">
                  <span className="text-muted-foreground mr-1">{categoryTitle}:</span>
                  {option?.label || val}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={() => onFilterChange?.(categoryTitle, val, false)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              )
            })
          })}
        </div>
      )}
    </div>
  )
}

function Check({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
