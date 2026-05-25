﻿// @ts-nocheck
import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Copy, Scissors, ClipboardPaste, Edit, Trash2, User, Settings, Save, Download, Share2, ArrowRight, Check } from "lucide-react"
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubTrigger, ContextMenuSubContent, ContextMenuCheckboxItem, ContextMenuRadioGroup, ContextMenuRadioItem } from "./ContextMenu"

const meta = {
  title: "Componentes Nativos/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="flex items-center justify-center h-[200px]">
      <ContextMenu>
        <ContextMenuTrigger className="flex items-center justify-center w-[300px] h-[100px] rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 hover:bg-muted/40 transition-colors duration-200">
          <p className="text-body-sm text-muted-foreground">Right-click here</p>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            <span>Copy</span>
            <ContextMenuShortcut>⌘C</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Scissors className="mr-2 h-4 w-4" />
            <span>Cut</span>
            <ContextMenuShortcut>⌘X</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <ClipboardPaste className="mr-2 h-4 w-4" />
            <span>Paste</span>
            <ContextMenuShortcut>⌘V</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </ContextMenuItem>
          <ContextMenuItem>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
}

export const WithSubmenu: Story = {
  render: () => (
    <div className="flex items-center justify-center h-[200px]">
      <ContextMenu>
        <ContextMenuTrigger className="flex items-center justify-center w-[300px] h-[100px] rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 hover:bg-muted/40 transition-colors duration-200">
          <p className="text-body-sm text-muted-foreground">Right-click for submenu</p>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-48">
          <ContextMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </ContextMenuItem>
          <ContextMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Share2 className="mr-2 h-4 w-4" />
              <span>Share</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>Email</ContextMenuItem>
              <ContextMenuItem>Message</ContextMenuItem>
              <ContextMenuItem>Notes</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSub>
            <ContextMenuSubTrigger>
              <Download className="mr-2 h-4 w-4" />
              <span>Export</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>PDF</ContextMenuItem>
              <ContextMenuItem>Word</ContextMenuItem>
              <ContextMenuItem>Excel</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
}

export const WithLabelsAndGroups: Story = {
  render: () => (
    <div className="flex items-center justify-center h-[250px]">
      <ContextMenu>
        <ContextMenuTrigger className="flex items-center justify-center w-[300px] h-[150px] rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 hover:bg-muted/40 transition-colors duration-200">
          <p className="text-body-sm text-muted-foreground">Document Options</p>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56">
          <ContextMenuLabel>File Actions</ContextMenuLabel>
          <ContextMenuItem>
            <Save className="mr-2 h-4 w-4" />
            <span>Save</span>
            <ContextMenuShortcut>⌘S</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <Download className="mr-2 h-4 w-4" />
            <span>Export</span>
            <ContextMenuShortcut>⌘E</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>Edit Actions</ContextMenuLabel>
          <ContextMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            <span>Rename</span>
          </ContextMenuItem>
          <ContextMenuItem>
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  ),
}

export const WithCheckboxItem: Story = {
  render: () => {
    const [showStatusBar, setShowStatusBar] = React.useState(true)
    const [showActivityBar, setShowActivityBar] = React.useState(false)
    const [showPanel, setShowPanel] = React.useState(true)

    return (
      <div className="flex items-center justify-center h-[200px]">
        <ContextMenu>
          <ContextMenuTrigger className="flex items-center justify-center w-[300px] h-[100px] rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 hover:bg-muted/40 transition-colors duration-200">
            <p className="text-body-sm text-muted-foreground">Toggle options</p>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48">
            <ContextMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
              <Check className="mr-2 h-4 w-4" />
              Status Bar
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
              <Check className="mr-2 h-4 w-4" />
              Activity Bar
            </ContextMenuCheckboxItem>
            <ContextMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
              <Check className="mr-2 h-4 w-4" />
              Panel
            </ContextMenuCheckboxItem>
            <ContextMenuSeparator />
            <ContextMenuItem disabled>More Options</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    )
  },
}

export const WithRadioGroup: Story = {
  render: () => {
    const [color, setColor] = React.useState("blue")

    return (
      <div className="flex items-center justify-center h-[200px]">
        <ContextMenu>
          <ContextMenuTrigger className="flex items-center justify-center w-[300px] h-[100px] rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 hover:bg-muted/40 transition-colors duration-200">
            <p className="text-body-sm text-muted-foreground">Choose color</p>
          </ContextMenuTrigger>
          <ContextMenuContent className="w-48">
            <ContextMenuLabel>Theme Color</ContextMenuLabel>
            <ContextMenuRadioGroup value={color} onValueChange={setColor}>
              <ContextMenuRadioItem value="red">
                <span className="mr-2 h-3 w-3 rounded-full bg-red-500" />
                Red
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="blue">
                <span className="mr-2 h-3 w-3 rounded-full bg-blue-500" />
                Blue
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="green">
                <span className="mr-2 h-3 w-3 rounded-full bg-green-500" />
                Green
              </ContextMenuRadioItem>
              <ContextMenuRadioItem value="purple">
                <span className="mr-2 h-3 w-3 rounded-full bg-purple-500" />
                Purple
              </ContextMenuRadioItem>
            </ContextMenuRadioGroup>
          </ContextMenuContent>
        </ContextMenu>
      </div>
    )
  },
}
