import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronDown, ChevronUp, ChevronsUpDown, MoreHorizontal, Check } from "lucide-react"
import { Button } from "./Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu"

export interface Column<T> {
  key: string
  header: string
  accessor: (row: T) => React.ReactNode
  sortable?: boolean
  filterable?: boolean
  filterType?: "text" | "select" | "date"
  filterOptions?: { label: string; value: string }[]
  width?: string
  align?: "left" | "center" | "right"
}

export interface TableProps<T> extends React.HTMLAttributes<HTMLTableElement> {
  columns: Column<T>[]
  data: T[]
  selectable?: boolean
  selectedRows?: Set<string>
  onSelectionChange?: (selected: Set<string>) => void
  onRowClick?: (row: T) => void
  sortable?: boolean
  filterable?: boolean
  paginated?: boolean
  pageSize?: number
  emptyMessage?: string
  loading?: boolean
}

type SortDirection = "asc" | "desc" | null

function SortIcon({ direction }: { direction: SortDirection }) {
  if (!direction) return <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
  if (direction === "asc") return <ChevronUp className="h-4 w-4" />
  return <ChevronDown className="h-4 w-4" />
}

function DataGrid<T extends { id?: string }>({
  columns,
  data,
  selectable = false,
  selectedRows = new Set(),
  onSelectionChange,
  onRowClick,
  sortable = false,
  filterable = false,
  paginated = false,
  pageSize = 10,
  emptyMessage = "Nenhum dado encontrado",
  loading = false,
  className,
  ...props
}: TableProps<T>) {
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null)
  const [filters, setFilters] = React.useState<Record<string, string>>({})
  const [currentPage, setCurrentPage] = React.useState(1)

  const handleSort = (key: string) => {
    if (!sortable) return
    if (sortKey === key) {
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortDirection(null)
        setSortKey(null)
      }
    } else {
      setSortKey(key)
      setSortDirection("asc")
    }
  }

  const handleSelectAll = () => {
    if (!selectable || !onSelectionChange) return
    if (selectedRows.size === data.length) {
      onSelectionChange(new Set())
    } else {
      onSelectionChange(new Set(data.map((row) => row.id || JSON.stringify(row))))
    }
  }

  const handleSelectRow = (id: string) => {
    if (!selectable || !onSelectionChange) return
    const newSelected = new Set(selectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    onSelectionChange(newSelected)
  }

  let filteredData = data
  if (filterable) {
    filteredData = filteredData.filter((row) => {
      return Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue) return true
        const column = columns.find((col) => col.key === key)
        if (!column) return true
        const cellValue = String(column.accessor(row)).toLowerCase()
        return cellValue.includes(filterValue.toLowerCase())
      })
    })
  }

  let sortedData = filteredData
  if (sortKey && sortDirection) {
    sortedData = [...filteredData].sort((a, b) => {
      const column = columns.find((col) => col.key === sortKey)
      if (!column) return 0
      const aVal = column.accessor(a)
      const bVal = column.accessor(b)
      const comparison = String(aVal).localeCompare(String(bVal))
      return sortDirection === "asc" ? comparison : -comparison
    })
  }

  const totalPages = Math.ceil(sortedData.length / pageSize)
  let paginatedData = sortedData
  if (paginated) {
    const start = (currentPage - 1) * pageSize
    paginatedData = sortedData.slice(start, start + pageSize)
  }

  return (
    <div className="w-full">
      {filterable && (
        <div className="flex gap-2 mb-4 p-3 bg-muted/30 rounded-md">
          {columns
            .filter((col) => col.filterable)
            .map((col) => (
              <input
                key={col.key}
                type="text"
                placeholder={`Filtrar ${col.header}...`}
                value={filters[col.key] || ""}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, [col.key]: e.target.value }))
                }
                className="flex h-8 rounded-md border border-input bg-transparent px-3 py-1 text-body-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1"
              />
            ))}
        </div>
      )}

      <div className="rounded-md border bg-card">
        <div className="overflow-x-auto">
          <table className={cn("w-full caption-bottom text-body-sm", className)} {...props}>
            <thead>
              <tr className="border-b bg-muted/50 transition-colors hover:bg-muted/30">
                {selectable && (
                  <th className="h-10 w-10 px-3">
                    <input
                      type="checkbox"
                      checked={paginatedData.length > 0 && selectedRows.size === data.length}
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </th>
                )}
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      "h-10 px-3 text-left align-middle font-medium text-muted-foreground",
                      column.sortable && sortable && "cursor-pointer select-none hover:bg-muted/30",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right"
                    )}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className={cn("flex items-center gap-1", column.align === "center" && "justify-center", column.align === "right" && "justify-end")}>
                      {column.header}
                      {column.sortable && sortable && (
                        <SortIcon
                          direction={sortKey === column.key ? sortDirection : null}
                        />
                      )}
                    </div>
                  </th>
                ))}
                <th className="h-10 w-10" />
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="border-b">
                    {selectable && <td className="h-12 w-10 px-3"><div className="h-4 w-4 rounded bg-muted animate-shimmer" /></td>}
                    {columns.map((col) => (
                      <td key={col.key} className="h-12 px-3">
                        <div className="h-4 w-full rounded bg-muted animate-shimmer" />
                      </td>
                    ))}
                    <td className="h-12 w-10 px-3"><div className="h-4 w-4 rounded bg-muted animate-shimmer" /></td>
                  </tr>
                ))
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (selectable ? 2 : 1)}
                    className="h-24 text-center text-muted-foreground py-8"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => {
                  const rowId = row.id || JSON.stringify(row)
                  const isSelected = selectedRows.has(rowId)
                  return (
                    <tr
                      key={rowId}
                      data-selected={isSelected}
                      className={cn(
                        "border-b transition-colors",
                        isSelected && "bg-primary/5",
                        onRowClick && "cursor-pointer hover:bg-muted/30"
                      )}
                      onClick={() => onRowClick?.(row)}
                    >
                      {selectable && (
                        <td className="w-10 px-3" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleSelectRow(rowId)}
                            className="h-4 w-4 rounded border-input text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          />
                        </td>
                      )}
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className={cn(
                            "px-3 py-2 align-middle",
                            column.align === "center" && "text-center",
                            column.align === "right" && "text-right"
                          )}
                        >
                          {column.accessor(row)}
                        </td>
                      ))}
                      <td className="w-10 px-3" onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Duplicar</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Excluir</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {paginated && totalPages > 1 && (
        <div className="flex items-center justify-between px-2 py-3">
          <span className="text-body-sm text-muted-foreground">
            Página {currentPage} de {totalPages} — {sortedData.length} resultados
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = i + 1
              if (totalPages > 5) {
                if (currentPage > 3) pageNum = currentPage - 2 + i
                if (currentPage > totalPages - 2) pageNum = totalPages - 4 + i
              }
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </Button>
              )
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Próxima
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export { DataGrid }

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
