/**
 * shadcn/ui Components Library
 *
 * A collection of reusable UI components built with React, Tailwind CSS,
 * and class-variance-authority (cva).
 *
 * @example
 * import { Button, Card, Input } from './components/shadcn'
 *
 * @example
 * import { Button } from './components/shadcn/Button'
 */

// Layout Components
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './Card'
export { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs'
export { Separator } from './Separator'

// Form Components
export { Button, buttonVariants } from './Button'
export { Input } from './Input'
export { Label } from './Label'
export { Textarea } from './Textarea'
export { Checkbox } from './Checkbox'
export { Switch } from './Switch'
export { RadioGroup, RadioGroupItem } from './RadioGroup'
export { Slider } from './Slider'
export { Toggle, toggleVariants } from './Toggle'

// Display Components
export { Badge, badgeVariants } from './Badge'
export { Avatar, AvatarImage, AvatarFallback } from './Avatar'
export { Progress } from './Progress'
export { Skeleton } from './Skeleton'

// Feedback Components
export { Alert, AlertTitle, AlertDescription } from './Alert'
export { Toast, ToastTitle, ToastDescription } from './Toast'
export { Tooltip, TooltipTrigger, TooltipContent } from './Tooltip'
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion'

// Navigation Components
export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from './Breadcrumb'
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuGroup, DropdownMenuCheckboxItem } from './DropdownMenu'
export { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription } from './Sheet'

// Overlay Components
export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogPortal, DialogOverlay } from './Dialog'
export { Popover, PopoverTrigger, PopoverContent } from './Popover'
export { Command, CommandDialog, CommandDialogContent, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from './Command'

// Data Display
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from './Table'

// Carousel
export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './Carousel'

// Utility
export { cn } from '../lib/utils'