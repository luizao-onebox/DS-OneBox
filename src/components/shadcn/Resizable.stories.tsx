// @ts-nocheck
import type { Meta, StoryObj } from "@storybook/react"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "./Resizable"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./Card"

const meta = {
  title: "Components/Resizable",
  component: ResizablePanelGroup,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Painéis redimensionáveis com divisor arrastável.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="min-h-[300px] rounded-lg border bg-muted/20">
      <ResizablePanel data-panel defaultSize={40} minSize={25}>
        <Card className="h-full rounded-none border-0">
          <CardHeader>
            <CardTitle>Sidebar</CardTitle>
            <CardDescription>Navegação principal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["Dashboard", "Usuários", "Configurações", "Relatórios"].map((item) => (
                <div key={item} className="rounded-md bg-muted/50 p-2 text-body-sm">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel data-panel defaultSize={60} minSize={30}>
        <Card className="h-full rounded-none border-0">
          <CardHeader>
            <CardTitle>Conteúdo Principal</CardTitle>
            <CardDescription>Área de trabalho</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-body-sm text-muted-foreground">
              Arraste o divisor entre os painéis para redimensioná-los.
            </p>
          </CardContent>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup direction="vertical" className="min-h-[400px] rounded-lg border bg-muted/20">
      <ResizablePanel data-panel defaultSize={60} minSize={30}>
        <Card className="h-full rounded-none border-0">
          <CardHeader>
            <CardTitle>Painel Superior</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body-sm text-muted-foreground">
              Conteúdo do painel superior
            </p>
          </CardContent>
        </Card>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel data-panel defaultSize={40} minSize={20}>
        <Card className="h-full rounded-none border-0">
          <CardHeader>
            <CardTitle>Painel Inferior</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body-sm text-muted-foreground">
              Conteúdo do painel inferior
            </p>
          </CardContent>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const ThreePanels: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="min-h-[300px] rounded-lg border bg-muted/20">
      <ResizablePanel data-panel defaultSize={25} minSize={15}>
        <Card className="h-full rounded-none border-0 bg-primary/5">
          <CardContent className="flex h-full items-center justify-center">
            <span className="text-body-sm text-muted-foreground">25%</span>
          </CardContent>
        </Card>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel data-panel defaultSize={50} minSize={30}>
        <Card className="h-full rounded-none border-0 bg-primary/5">
          <CardContent className="flex h-full items-center justify-center">
            <span className="text-body-sm text-muted-foreground">50%</span>
          </CardContent>
        </Card>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel data-panel defaultSize={25} minSize={15}>
        <Card className="h-full rounded-none border-0 bg-primary/5">
          <CardContent className="flex h-full items-center justify-center">
            <span className="text-body-sm text-muted-foreground">25%</span>
          </CardContent>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const IDELayout: Story = {
  render: () => (
    <ResizablePanelGroup direction="horizontal" className="min-h-[400px] rounded-lg border bg-muted/20">
      <ResizablePanel data-panel defaultSize={20} minSize={10}>
        <Card className="h-full rounded-none border-0">
          <CardHeader className="py-2">
            <CardTitle className="text-body-sm">Explorer</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              {["src", "components", "utils", "App.tsx", "index.css"].map((file) => (
                <div key={file} className="flex items-center gap-2 rounded px-2 py-1 text-body-xs hover:bg-muted/50">
                  <span className="text-muted-foreground">{file.includes(".") ? "📄" : "📁"}</span>
                  {file}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel data-panel defaultSize={55} minSize={30}>
        <Card className="h-full rounded-none border-0">
          <CardHeader className="py-2 border-b">
            <CardTitle className="text-body-sm">App.tsx</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <pre className="text-body-xs text-muted-foreground font-mono">
{`function App() {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}`}
            </pre>
          </CardContent>
        </Card>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel data-panel defaultSize={25} minSize={15}>
        <Card className="h-full rounded-none border-0">
          <CardHeader className="py-2">
            <CardTitle className="text-body-sm">Properties</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2">
              {["name", "type", "default", "required"].map((prop) => (
                <div key={prop} className="text-body-xs">
                  <span className="font-medium">{prop}:</span>{" "}
                  <span className="text-muted-foreground">string</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
