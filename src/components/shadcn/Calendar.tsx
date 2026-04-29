import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "../../lib/utils"
import { buttonVariants } from "./Button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 relative",
        month_caption: "flex justify-center pt-1 relative items-center h-8",
        caption_label: "text-sm font-medium hidden",
        caption_dropdowns: "flex justify-center gap-1 w-full",
        dropdown: "text-sm font-medium bg-transparent border-0 focus:ring-0 cursor-pointer appearance-none px-1 rounded hover:bg-accent hover:text-accent-foreground",
        dropdown_month: "flex items-center capitalize",
        dropdown_year: "flex items-center",
        dropdown_icon: "hidden",
        nav: "flex items-center absolute inset-x-0 top-0 justify-between pt-1",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-10 ml-1"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-10 mr-1"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        range_end: "day-range-end",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight
          return <Icon className="h-4 w-4" />
        },
        Dropdown: ({ value, onChange, options, "aria-label": ariaLabel, ...props }: any) => {
          const selected = options?.find((child: any) => child.value === value)
          
          const handleChange = (value: string) => {
            const changeEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>
            onChange?.(changeEvent)
          }

          return (
            <Select
              value={value?.toString()}
              onValueChange={handleChange}
            >
              <SelectTrigger 
                aria-label={ariaLabel}
                className={cn(
                  "h-7 w-fit gap-1 border-0 focus:ring-0 focus:ring-offset-0 bg-transparent hover:bg-accent hover:text-accent-foreground py-0 pl-2 pr-1 font-medium shadow-none",
                  props.className
                )}
              >
                <SelectValue>{selected?.label}</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper" className="max-h-[200px] min-w-[120px]">
                {options?.map((option: any, id: number) => (
                  <SelectItem
                    key={`${option.value}-${id}`}
                    value={option.value?.toString() ?? ""}
                    disabled={option.disabled}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        },
      }}
      captionLayout="dropdown"
      fromYear={2000}
      toYear={2030}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
