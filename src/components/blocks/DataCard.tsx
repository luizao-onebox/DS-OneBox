import * as React from "react"
import { MoreVertical } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../shadcn/Card"
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/Avatar"
import { Badge } from "../shadcn/Badge"
import { Button } from "../shadcn/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn/DropdownMenu"

export interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  avatarUrl?: string
  initials?: string
  status?: {
    label: string
    variant?: "default" | "secondary" | "destructive" | "outline"
  }
  tags?: string[]
  metadata?: {
    label: string
    value: string
  }[]
  onEdit?: () => void
  onDelete?: () => void
}

export function DataCard({
  title,
  subtitle,
  avatarUrl,
  initials,
  status,
  tags = [],
  metadata = [],
  onEdit,
  onDelete,
  className,
  ...props
}: DataCardProps) {
  return (
    <Card className={className} {...props}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl} alt={title} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            {subtitle && (
              <CardDescription>{subtitle}</CardDescription>
            )}
            {status && (
              <div className="mt-1">
                <Badge variant={status.variant || "default"}>
                  {status.label}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {(onEdit || onDelete) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEdit && <DropdownMenuItem onClick={onEdit}>Editar</DropdownMenuItem>}
              {onDelete && (
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10" onClick={onDelete}>
                  Excluir
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      
      {(tags.length > 0 || metadata.length > 0) && (
        <CardContent className="grid gap-4">
          {metadata.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {metadata.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <dt className="text-muted-foreground">{item.label}</dt>
                  <dd className="font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          )}
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
