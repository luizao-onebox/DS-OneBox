import * as React from "react"
import { Meta, StoryObj } from "@storybook/react"
import { 
  // Base importada antes
  AlertCircle, ArrowRight, Bell, Calendar, Check, CheckCircle, 
  ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Circle, 
  CircleAlert, Copy, CreditCard, Ellipsis, File, Grip, Home, 
  Keyboard, Lock, Maximize, Menu, Moon, MoreHorizontal, Plus, 
  Search, Settings, Sun, Trash2, UploadCloud, User, X,
  // Setas e Navegação
  ArrowLeft, ArrowUp, ArrowDown, ChevronsUpDown, MoveRight, MoveLeft, MoveUp, MoveDown, CornerDownRight, CornerUpLeft,
  // Arquivos e Pastas
  Folder, FolderOpen, FolderClosed, FileText, FileImage, FileCode, Archive, Paperclip, ClipboardList,
  // Ações
  Edit, Edit2, Edit3, Save, Download, Share, Share2, Link, Link2, ExternalLink, RefreshCw, RefreshCcw, RotateCcw, RotateCw, Trash,
  // Comunicação
  MessageCircle, MessageSquare, Mail, Phone, Video, Camera, Send,
  // Interface e Layout
  Filter, Sliders, Layout, LayoutGrid, LayoutList, LayoutDashboard, LayoutPanelLeft, List, GripHorizontal, GripVertical,
  // Status e Alertas
  AlertTriangle, HelpCircle, Info, Shield, ShieldAlert, ShieldCheck, CheckSquare, XCircle, XSquare,
  // Negócios e Comércio
  Briefcase, Building, Calculator, Landmark, PiggyBank, Receipt, ShoppingCart, Tag, Ticket, Wallet, PieChart, BarChart, TrendingUp, TrendingDown,
  // Usuários
  Users, UserPlus, UserMinus, UserCheck, UserX, UserCog,
  // Sistema e Dispositivos
  Cpu, Database, HardDrive, Server, Wifi, Bluetooth, Battery, Power, Monitor, Smartphone, Tablet, Laptop,
  // Outros
  Globe, MapPin, Map, Navigation, Compass, Crosshair, Anchor, Flag, Bookmark, Star, Heart, ThumbsUp, ThumbsDown
} from "lucide-react"

import { Card } from "./Card"

const IconWrapper = ({ icon: Icon, name }: { icon: any; name: string }) => (
  <Card className="flex flex-col items-center justify-center p-4 gap-3 hover:bg-muted/50 transition-colors cursor-pointer group">
    <Icon className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
    <span className="text-[11px] text-muted-foreground">{name}</span>
  </Card>
)

const meta = {
  title: "Design Tokens/Icons",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `

O Design System utiliza a biblioteca **Lucide React** (\`lucide-react\`) como padrão para toda a iconografia.

## Por que Lucide?
- **Consistência**: Todos os ícones têm a mesma espessura de linha (\`strokeWidth={2}\`), cantos arredondados e caixas delimitadoras (\`24x24\`).
- **Performance**: Usamos tree-shaking para importar apenas os ícones necessários.
- **Customização**: Aceitam as classes do Tailwind diretamente através da prop \`className\` (ex: \`text-primary\`, \`w-4 h-4\`).

## Como usar

\`\`\`tsx
import { Search } from "lucide-react"

export function Example() {
  return <Search className="w-4 h-4 text-muted-foreground" />
}
\`\`\`

## Biblioteca Principal

Abaixo estão alguns dos ícones mais comuns já importados e utilizados nos nossos componentes. Para ver a biblioteca completa (mais de 1400 ícones), acesse: [lucide.dev](https://lucide.dev/)
        `,
      },
    },
  },
} satisfies Meta<typeof IconWrapper>

export default meta

const allIcons = [
  // Interface e Comuns
  { icon: Home, name: "Home" }, { icon: Menu, name: "Menu" }, { icon: Search, name: "Search" }, { icon: Settings, name: "Settings" },
  { icon: User, name: "User" }, { icon: Bell, name: "Bell" }, { icon: Calendar, name: "Calendar" },
  
  // Setas e Chevrons
  { icon: ChevronLeft, name: "ChevronLeft" }, { icon: ChevronRight, name: "ChevronRight" }, { icon: ChevronUp, name: "ChevronUp" }, { icon: ChevronDown, name: "ChevronDown" },
  { icon: ArrowLeft, name: "ArrowLeft" }, { icon: ArrowRight, name: "ArrowRight" }, { icon: ArrowUp, name: "ArrowUp" }, { icon: ArrowDown, name: "ArrowDown" },
  { icon: ChevronsUpDown, name: "ChevronsUpDown" }, { icon: MoveRight, name: "MoveRight" }, { icon: MoveLeft, name: "MoveLeft" }, { icon: CornerDownRight, name: "CornerDownRight" },
  
  // Ações e Ferramentas
  { icon: Edit, name: "Edit" }, { icon: Edit2, name: "Edit2" }, { icon: Edit3, name: "Edit3" }, { icon: Save, name: "Save" },
  { icon: Download, name: "Download" }, { icon: UploadCloud, name: "UploadCloud" }, { icon: Share, name: "Share" }, { icon: Share2, name: "Share2" },
  { icon: Link, name: "Link" }, { icon: ExternalLink, name: "ExternalLink" }, { icon: Copy, name: "Copy" }, { icon: Plus, name: "Plus" },
  { icon: Trash, name: "Trash" }, { icon: Trash2, name: "Trash2" }, { icon: RefreshCw, name: "RefreshCw" }, { icon: RotateCcw, name: "RotateCcw" },
  
  // Status e Validação
  { icon: Check, name: "Check" }, { icon: CheckCircle, name: "CheckCircle" }, { icon: CheckSquare, name: "CheckSquare" },
  { icon: X, name: "X" }, { icon: XCircle, name: "XCircle" }, { icon: XSquare, name: "XSquare" },
  { icon: AlertCircle, name: "AlertCircle" }, { icon: CircleAlert, name: "CircleAlert" }, { icon: AlertTriangle, name: "AlertTriangle" },
  { icon: HelpCircle, name: "HelpCircle" }, { icon: Info, name: "Info" }, { icon: Shield, name: "Shield" }, { icon: ShieldAlert, name: "ShieldAlert" }, { icon: ShieldCheck, name: "ShieldCheck" },
  
  // Arquivos e Conteúdo
  { icon: Folder, name: "Folder" }, { icon: FolderOpen, name: "FolderOpen" }, { icon: FolderClosed, name: "FolderClosed" },
  { icon: File, name: "File" }, { icon: FileText, name: "FileText" }, { icon: FileImage, name: "FileImage" }, { icon: FileCode, name: "FileCode" },
  { icon: Archive, name: "Archive" }, { icon: Paperclip, name: "Paperclip" }, { icon: ClipboardList, name: "ClipboardList" },
  
  // Comunicação e Midia
  { icon: MessageCircle, name: "MessageCircle" }, { icon: MessageSquare, name: "MessageSquare" }, { icon: Mail, name: "Mail" },
  { icon: Phone, name: "Phone" }, { icon: Video, name: "Video" }, { icon: Camera, name: "Camera" }, { icon: Send, name: "Send" },
  
  // Layout e Interface
  { icon: Filter, name: "Filter" }, { icon: Sliders, name: "Sliders" }, { icon: Layout, name: "Layout" }, { icon: LayoutGrid, name: "LayoutGrid" },
  { icon: LayoutList, name: "LayoutList" }, { icon: LayoutDashboard, name: "LayoutDashboard" }, { icon: LayoutPanelLeft, name: "LayoutPanelLeft" },
  { icon: List, name: "List" }, { icon: Grip, name: "Grip" }, { icon: GripHorizontal, name: "GripHorizontal" }, { icon: GripVertical, name: "GripVertical" },
  { icon: Maximize, name: "Maximize" }, { icon: Keyboard, name: "Keyboard" }, { icon: MoreHorizontal, name: "MoreHorizontal" }, { icon: Ellipsis, name: "Ellipsis" },
  
  // Negócios, Usuários e Comércio
  { icon: Users, name: "Users" }, { icon: UserPlus, name: "UserPlus" }, { icon: UserCheck, name: "UserCheck" }, { icon: UserCog, name: "UserCog" },
  { icon: Briefcase, name: "Briefcase" }, { icon: Building, name: "Building" }, { icon: Calculator, name: "Calculator" }, { icon: Landmark, name: "Landmark" },
  { icon: PiggyBank, name: "PiggyBank" }, { icon: Receipt, name: "Receipt" }, { icon: ShoppingCart, name: "ShoppingCart" }, { icon: Tag, name: "Tag" },
  { icon: Ticket, name: "Ticket" }, { icon: Wallet, name: "Wallet" }, { icon: CreditCard, name: "CreditCard" },
  { icon: PieChart, name: "PieChart" }, { icon: BarChart, name: "BarChart" }, { icon: TrendingUp, name: "TrendingUp" }, { icon: TrendingDown, name: "TrendingDown" },
  
  // Sistema e Dispositivos
  { icon: Cpu, name: "Cpu" }, { icon: Database, name: "Database" }, { icon: HardDrive, name: "HardDrive" }, { icon: Server, name: "Server" },
  { icon: Wifi, name: "Wifi" }, { icon: Bluetooth, name: "Bluetooth" }, { icon: Battery, name: "Battery" }, { icon: Power, name: "Power" },
  { icon: Monitor, name: "Monitor" }, { icon: Smartphone, name: "Smartphone" }, { icon: Tablet, name: "Tablet" }, { icon: Laptop, name: "Laptop" },
  { icon: Lock, name: "Lock" },
  
  // Temas e Outros
  { icon: Sun, name: "Sun" }, { icon: Moon, name: "Moon" }, { icon: Globe, name: "Globe" }, { icon: MapPin, name: "MapPin" },
  { icon: Map, name: "Map" }, { icon: Navigation, name: "Navigation" }, { icon: Compass, name: "Compass" }, { icon: Crosshair, name: "Crosshair" },
  { icon: Anchor, name: "Anchor" }, { icon: Flag, name: "Flag" }, { icon: Bookmark, name: "Bookmark" }, { icon: Star, name: "Star" },
  { icon: Heart, name: "Heart" }, { icon: ThumbsUp, name: "ThumbsUp" }, { icon: ThumbsDown, name: "ThumbsDown" }, { icon: Circle, name: "Circle" }
]

export const Gallery = {
  render: () => (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 w-full">
      {allIcons.map((item, idx) => (
        <IconWrapper key={idx} icon={item.icon} name={item.name} />
      ))}
    </div>
  ),
}
