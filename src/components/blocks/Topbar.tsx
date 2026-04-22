import * as React from "react"
import { Bell, Maximize, Keyboard, ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../shadcn/Button"
import { Separator } from "../shadcn/Separator"
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/DropdownMenu"

export function Topbar({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn(
        "flex h-16 w-full items-center justify-between border-b bg-card px-4",
        className
      )}
    >
      {children}
    </header>
  )
}

export function TopbarLeft({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {children}
    </div>
  )
}

export function TopbarRight({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {children}
    </div>
  )
}

// --- Logo Component ---
export function TopbarLogo({ logo, alt = "Logo" }: { logo?: React.ReactNode, alt?: string }) {
  return (
    <div className="flex items-center">
      {logo || <div className="h-6 w-24 bg-primary/20 rounded-sm" aria-label={alt} />}
    </div>
  )
}

// --- Divider Component ---
export function TopbarDivider() {
  return <Separator orientation="vertical" className="h-6 mx-2 bg-border/50" />
}

// --- Context Selectors (Module, Tenant, Product) ---
export function TopbarSelector({ 
  label, 
  value, 
  hasDropdown = false 
}: { 
  label?: string
  value: string
  hasDropdown?: boolean 
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
      {label && <span className="hidden sm:inline-block">{label}</span>}
      <span className="font-medium">{value}</span>
      {hasDropdown && <ChevronDown className="h-4 w-4 opacity-50" />}
    </div>
  )
}

// --- Status/Info Text ---
export function TopbarInfo({ text }: { text: string }) {
  return (
    <div className="text-sm text-muted-foreground hidden md:block">
      {text}
    </div>
  )
}

// --- Action Buttons (Fullscreen, Keyboard, Notifications) ---
export function TopbarAction({ 
  icon, 
  onClick, 
  hasBadge = false 
}: { 
  icon: React.ReactNode
  onClick?: () => void
  hasBadge?: boolean
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative text-muted-foreground hover:text-foreground h-9 w-9"
      onClick={onClick}
    >
      {icon}
      {hasBadge && (
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-card" />
      )}
    </Button>
  )
}

// --- User Profile Dropdown ---
export function TopbarProfile({ 
  initials, 
  src, 
  name, 
  email 
}: { 
  initials: string
  src?: string
  name?: string
  email?: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 rounded-full pl-2 pr-1 gap-2 flex items-center hover:bg-accent/50">
          <Avatar className="h-8 w-8 border border-primary/20">
            <AvatarImage src={src} alt={name} />
            <AvatarFallback className="bg-blue-50 text-blue-600 text-xs font-semibold">{initials}</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {(name || email) && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                {name && <p className="text-sm font-medium leading-none">{name}</p>}
                {email && <p className="text-xs leading-none text-muted-foreground">{email}</p>}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Configurações</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
