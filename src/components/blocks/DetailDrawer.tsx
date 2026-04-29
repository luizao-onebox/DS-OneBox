import * as React from "react"
import { Copy, ExternalLink, FileText, History, Info } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../shadcn/Sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shadcn/Tabs"
import { ScrollArea } from "../shadcn/ScrollArea"
import { Badge } from "../shadcn/Badge"
import { Button } from "../shadcn/Button"
import { Separator } from "../shadcn/Separator"

export interface DetailDrawerProps {
  title: string
  subtitle?: string
  status?: string
  id?: string
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  detailsTabContent?: React.ReactNode
  historyTabContent?: React.ReactNode
  documentsTabContent?: React.ReactNode
  actions?: React.ReactNode
}

export function DetailDrawer({
  title,
  subtitle,
  status,
  id,
  trigger,
  open,
  onOpenChange,
  detailsTabContent,
  historyTabContent,
  documentsTabContent,
  actions,
}: DetailDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      
      <SheetContent className="sm:max-w-xl flex flex-col p-0 w-full">
        {/* Header Fixo */}
        <div className="px-6 py-6 pb-4">
          <SheetHeader className="text-left space-y-0">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl flex items-center gap-2">
                {title}
                {status && <Badge variant="secondary">{status}</Badge>}
              </SheetTitle>
              {actions && (
                <div className="flex items-center gap-2 pr-6">
                  {actions}
                </div>
              )}
            </div>
            {subtitle && <SheetDescription className="mt-1">{subtitle}</SheetDescription>}
            
            {id && (
              <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                <span className="font-mono bg-muted px-1.5 py-0.5 rounded">{id}</span>
                <button className="hover:text-foreground transition-colors flex items-center gap-1" onClick={() => navigator.clipboard.writeText(id)}>
                  <Copy className="h-3 w-3" />
                  Copiar ID
                </button>
              </div>
            )}
          </SheetHeader>
        </div>

        <Separator />

        {/* Tabs e Conteúdo Scrollável */}
        <Tabs defaultValue="details" className="flex flex-col flex-1 overflow-hidden">
          <div className="px-6 pt-2">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none">
              <TabsTrigger 
                value="details" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-4"
              >
                <Info className="h-4 w-4 mr-2" />
                Detalhes
              </TabsTrigger>
              <TabsTrigger 
                value="documents"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-4"
              >
                <FileText className="h-4 w-4 mr-2" />
                Documentos
              </TabsTrigger>
              <TabsTrigger 
                value="history"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-4"
              >
                <History className="h-4 w-4 mr-2" />
                Histórico
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6">
              <TabsContent value="details" className="m-0 focus-visible:outline-none">
                {detailsTabContent}
              </TabsContent>
              <TabsContent value="documents" className="m-0 focus-visible:outline-none">
                {documentsTabContent}
              </TabsContent>
              <TabsContent value="history" className="m-0 focus-visible:outline-none">
                {historyTabContent}
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
