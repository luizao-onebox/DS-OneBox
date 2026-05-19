import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format, Locale } from "date-fns"
import { enUS } from "date-fns/locale/en-US"
import { ptBR } from "date-fns/locale/pt-BR"

import { cn } from "../../lib/utils"
import { Button } from "./Button"
import { Calendar } from "./Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./Popover"

export { enUS, ptBR }

export interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  fromDate?: Date
  toDate?: Date
  fromYear?: number
  toYear?: number
  locale?: Locale
  format?: string
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      date,
      onDateChange,
      placeholder = "Pick a date",
      disabled = false,
      className,
      fromDate,
      toDate,
      fromYear,
      toYear,
      locale = enUS,
      format: dateFormat = "PPP",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const handleDateSelect = (selectedDate: Date | undefined) => {
      onDateChange?.(selectedDate)
      if (selectedDate) {
        setIsOpen(false)
      }
    }

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal transition-all duration-200 hover:border-primary/50",
              !date && "text-muted-foreground",
              className
            )}
            {...props}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            {date ? format(date, dateFormat, { locale }) : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={[
              { from: new Date(1900, 0, 1), to: fromDate ? new Date(fromDate.getTime() - 86400000) : undefined },
              { from: toDate ? new Date(toDate.getTime() + 86400000) : new Date(2100, 0, 1), to: new Date(2100, 0, 1) },
            ]}
            fromYear={fromYear}
            toYear={toYear}
            locale={locale}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)
DatePicker.displayName = "DatePicker"

export { DatePicker }

/**
 * @description
 * Seletor de data com calendário visual.
 *
 * **REGRAS PARA A IA:**
 * - Use para收集 datas de forma visual (nascimento, agendamento, reservas).
 * - Suporta限制 de intervalo com `fromDate` e `toDate`.
 * - Formata a data com date-fns (padrão: "PPP" = "Jan 1, 2024").
 */
