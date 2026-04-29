import * as React from "react"
import { Bell, Check, Trash2, MailOpen } from "lucide-react"

import { Button } from "../shadcn/Button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../shadcn/Popover"
import { ScrollArea } from "../shadcn/ScrollArea"
import { Separator } from "../shadcn/Separator"
import { Badge } from "../shadcn/Badge"
import { cn } from "../../lib/utils"

export interface Notification {
  id: string
  title: string
  description: string
  time: string
  isRead: boolean
  category?: "system" | "message" | "alert" | "success"
}

export interface NotificationCenterProps {
  notifications: Notification[]
  onMarkAllAsRead?: () => void
  onClearAll?: () => void
  onNotificationClick?: (id: string) => void
}

export function NotificationCenter({
  notifications = [],
  onMarkAllAsRead,
  onClearAll,
  onNotificationClick,
}: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] flex items-center justify-center p-0 rounded-full"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0" sideOffset={8}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold">Notificações</h4>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="h-5 text-xs">
                {unreadCount} novas
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onMarkAllAsRead}
              title="Marcar todas como lidas"
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Marcar todas como lidas</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={onClearAll}
              title="Limpar todas"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Limpar todas</span>
            </Button>
          </div>
        </div>
        <Separator />
        <ScrollArea className="h-[350px]">
          {notifications.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <MailOpen className="h-8 w-8 text-muted-foreground/50 mb-3" />
              <p className="text-sm font-medium">Nenhuma notificação</p>
              <p className="text-xs text-muted-foreground">
                Você está em dia com suas tarefas.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1 p-2">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => onNotificationClick?.(notification.id)}
                  className={cn(
                    "flex flex-col gap-1 rounded-lg p-3 text-left transition-colors hover:bg-muted/50",
                    !notification.isRead && "bg-muted/30"
                  )}
                >
                  <div className="flex w-full justify-between items-start gap-2">
                    <span className="text-sm font-medium leading-none">
                      {notification.title}
                    </span>
                    <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {notification.description}
                  </p>
                  {!notification.isRead && (
                    <div className="mt-2 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-2">
              <Button variant="ghost" className="w-full h-8 text-xs justify-center">
                Ver todas as notificações
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
