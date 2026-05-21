import * as React from "react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isWithinInterval, addMonths, subMonths, isBefore, isAfter } from "date-fns"
import { ptBR, enUS } from "date-fns/locale"
import { cn } from "../../lib/utils"
import { Calendar } from "./Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./Popover"
import { Button } from "./Button"
import { Input } from "./Input"
import { Calendar as CalendarIcon, ArrowRight } from "lucide-react"

type DateRange = {
  from: Date | undefined
  to: Date | undefined
}

interface DateRangePickerProps {
  date?: DateRange
  onDateChange?: (date: DateRange) => void
  placeholder?: string
  fromDate?: Date
  toDate?: Date
  locale?: "ptBR" | "enUS"
  disabled?: boolean
  className?: string
}

const locales = { ptBR, enUS }

const DateRangePicker = React.forwardRef<HTMLButtonElement, DateRangePickerProps>(
  ({
    date,
    onDateChange,
    placeholder = "Selecione o período",
    fromDate,
    toDate,
    locale = "ptBR",
    disabled = false,
    className,
  }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [selecting, setSelecting] = React.useState<"from" | "to">("from")
    const [displayMonth, setDisplayMonth] = React.useState(date?.from || new Date())

    const handleSelect = (selectedDate: Date) => {
      if (selecting === "from" || !date?.from || selectedDate < date.from) {
        onDateChange?.({ from: selectedDate, to: undefined })
        setSelecting("to")
      } else {
        onDateChange?.({ from: date.from, to: selectedDate })
        setIsOpen(false)
        setSelecting("from")
      }
    }

    const handleMonthChange = (month: Date) => {
      setDisplayMonth(month)
    }

    const clearDates = () => {
      onDateChange?.({ from: undefined, to: undefined })
      setSelecting("from")
    }

    const localeObj = locales[locale]

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
              "w-full justify-start text-left font-normal",
              !date?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date?.to ? (
                <span>
                  {format(date.from, "dd MMM yyyy", { locale: localeObj })} 
                  <ArrowRight className="mx-2 h-3 w-3 inline" />
                  {format(date.to, "dd MMM yyyy", { locale: localeObj })}
                </span>
              ) : (
                format(date.from, "dd MMM yyyy", { locale: localeObj })
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b flex items-center justify-between">
            <div className="text-body-sm">
              <span className={cn(
                "font-medium",
                selecting === "from" ? "text-primary" : "text-muted-foreground"
              )}>
                De:
              </span>
              <span className="ml-1">
                {date?.from 
                  ? format(date.from, "dd MMM yyyy", { locale: localeObj })
                  : "não definido"
                }
              </span>
              <ArrowRight className="mx-2 h-3 w-3 inline text-muted-foreground" />
              <span className={cn(
                "font-medium",
                selecting === "to" ? "text-primary" : "text-muted-foreground"
              )}>
                Até:
              </span>
              <span className="ml-1">
                {date?.to 
                  ? format(date.to, "dd MMM yyyy", { locale: localeObj })
                  : "não definido"
                }
              </span>
            </div>
            {(date?.from || date?.to) && (
              <Button variant="ghost" size="sm" onClick={clearDates} className="h-7 text-body-xs">
                Limpar
              </Button>
            )}
          </div>

          <Calendar
            mode="single"
            selected={selecting === "to" && date?.from ? date?.to : date?.from}
            onSelect={handleSelect}
            month={displayMonth}
            onMonthChange={handleMonthChange}
            fromDate={fromDate}
            toDate={toDate}
            locale={localeObj}
            modifiers={{
              selected: date?.from && date?.to
                ? eachDayOfInterval({ start: date.from, end: date.to })
                : date?.from
                ? [date.from]
                : [],
              range: date?.from && date?.to
                ? eachDayOfInterval({ start: date.from, end: date.to })
                : [],
            }}
            modifiersClassNames={{
              selected: "bg-primary text-primary-foreground",
              range: "bg-primary/10",
              range_end: "bg-primary text-primary-foreground rounded-r-md",
              range_start: "bg-primary text-primary-foreground rounded-l-md",
            }}
          />

          <div className="p-3 border-t flex justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setDisplayMonth(subMonths(displayMonth, 1))}
              className="h-7"
            >
              Anterior
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setDisplayMonth(addMonths(displayMonth, 1))}
              className="h-7"
            >
              Próximo
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    )
  }
)
DateRangePicker.displayName = "DateRangePicker"

export { DateRangePicker }
export type { DateRange }
