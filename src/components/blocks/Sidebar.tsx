import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  ChevronDown,
  ChevronUp,
  Grip,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  Users,
} from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../shadcn/Button"
import { Separator } from "../shadcn/Separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../shadcn/Tooltip"

// --- Contexto para gerenciar o estado Expandido/Colapsado ---
type SidebarContextType = {
  isCollapsed: boolean
  toggleCollapse: () => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

// --- Componentes Principais ---

export function SidebarProvider({
  children,
  defaultCollapsed = false,
}: {
  children: React.ReactNode
  defaultCollapsed?: boolean
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  const toggleCollapse = React.useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleCollapse }}>
      <TooltipProvider delayDuration={0}>
        <div className="flex h-screen overflow-hidden bg-background">
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

export function Sidebar({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const { isCollapsed } = useSidebar()

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r bg-card transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[68px]" : "w-[260px]",
        className
      )}
    >
      {children}
    </aside>
  )
}

// --- Header (Logo e Botão de Colapsar) ---
export function SidebarHeader({
  className,
  logo,
  title = "oneDocs",
}: {
  className?: string
  logo?: React.ReactNode
  title?: string
}) {
  const { isCollapsed, toggleCollapse } = useSidebar()

  return (
    <div
      className={cn(
        "flex h-[60px] items-center justify-between px-4 py-4",
        isCollapsed && "justify-center px-0",
        className
      )}
    >
      {!isCollapsed ? (
        <>
          <div className="flex items-center gap-2 font-bold text-lg text-foreground">
            {logo || <Grip className="h-5 w-5 text-primary" />}
            <span className="tracking-tight">{title}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={toggleCollapse}
          >
            <PanelLeftClose className="h-5 w-5" />
          </Button>
        </>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-muted-foreground hover:text-foreground"
              onClick={toggleCollapse}
            >
              <PanelLeftOpen className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Expandir Menu</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

// --- Conteúdo (Lista de Links) ---
export function SidebarContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1 overflow-y-auto overflow-x-hidden py-2 scrollbar-hide", className)}>
      <nav className="flex flex-col gap-1 px-2">{children}</nav>
    </div>
  )
}

// --- Item de Menu Principal ---
export function SidebarItem({
  icon,
  label,
  active,
  onClick,
  children, // Submenus
  className,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}) {
  const { isCollapsed } = useSidebar()
  const [isOpen, setIsOpen] = React.useState(active || false)

  const hasChildren = Boolean(children)

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren && !isCollapsed) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
    if (onClick) onClick();
  }

  const itemContent = (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
        active ? "bg-accent/50 text-foreground font-semibold" : "text-muted-foreground",
        isCollapsed && "justify-center px-0 py-3",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn("flex h-5 w-5 items-center justify-center", active && "text-primary")}>
          {icon}
        </span>
        {!isCollapsed && <span>{label}</span>}
      </div>
      {!isCollapsed && hasChildren && (
        <span className="text-muted-foreground">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      )}
    </button>
  )

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{itemContent}</TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {label}
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <div className="flex flex-col">
      {itemContent}
      {/* Submenus (Accordion style) */}
      {hasChildren && isOpen && !isCollapsed && (
        <div className="mt-1 flex flex-col gap-1 border-l-2 border-border/50 ml-5 pl-2">
          {children}
        </div>
      )}
    </div>
  )
}

// --- Sub Item (Nível 2 e 3) ---
export function SidebarSubItem({
  label,
  active,
  onClick,
  children, // Suporta novos subníveis (nível 3)
  className,
}: {
  label: string
  active?: boolean
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}) {
  const [isOpen, setIsOpen] = React.useState(active || false)
  const hasChildren = Boolean(children)

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      // Previne que o evento propague e recarregue ou faça comportamentos indesejados
      e.preventDefault();
      setIsOpen(!isOpen);
    }
    if (onClick) onClick();
  }

  return (
    <div className="flex flex-col w-full">
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-1.5 text-sm transition-colors hover:text-foreground hover:bg-accent/50",
          active ? "text-foreground font-medium bg-accent/30" : "text-muted-foreground",
          className
        )}
      >
        <span>{label}</span>
        {hasChildren && (
          <span className="text-muted-foreground/70">
            {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </span>
        )}
      </button>
      
      {/* Submenus nível 3 */}
      {hasChildren && isOpen && (
        <div className="mt-1 flex flex-col gap-1 border-l border-border/50 ml-4 pl-2">
          {children}
        </div>
      )}
    </div>
  )
}

// --- Footer (Configurações, Usuário, Status) ---
export function SidebarFooter({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-2 p-4", className)}>{children}</div>
}

// --- Item Simples do Footer (ex: online status, copyright) ---
export function SidebarFooterItem({
  icon,
  label,
  onClick,
  className,
}: {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  className?: string
}) {
  const { isCollapsed } = useSidebar()

  const content = (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground",
        onClick && "cursor-pointer",
        isCollapsed && "justify-center",
        className
      )}
    >
      <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
      {!isCollapsed && <span>{label}</span>}
    </div>
  )

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    )
  }

  return content
}
