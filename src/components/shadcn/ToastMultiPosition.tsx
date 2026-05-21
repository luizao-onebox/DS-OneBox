import * as React from "react"
import { cn } from "../../lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "success" | "error" | "warning" | "info"
  position?: ToastPosition
  duration?: number
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

interface ToastProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: ToastPosition
}

const ToastProvider = React.forwardRef<HTMLDivElement, ToastProviderProps>(
  ({ className, position = "bottom-right", children, ...props }, ref) => {
    const [toasts, setToasts] = React.useState<Toast[]>([])

    const addToast = React.useCallback((toast: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2)
      const newToast = { ...toast, id }
      setToasts((prev) => [...prev, newToast])

      if (toast.duration !== 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }, toast.duration || 5000)
      }
    }, [])

    const removeToast = React.useCallback((id: string) => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, [])

    const groupedToasts = React.useMemo(() => {
      const groups: Record<ToastPosition, Toast[]> = {
        "top-left": [], "top-center": [], "top-right": [],
        "bottom-left": [], "bottom-center": [], "bottom-right": [],
      }
      toasts.forEach((toast) => {
        const pos = toast.position || position
        groups[pos].push(toast)
      })
      return groups
    }, [toasts, position])

    return (
      <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
        {children}
        <div className="fixed inset-0 pointer-events-none z-50">
          {Object.entries(groupedToasts).map(([pos, positionToasts]) => {
            if (positionToasts.length === 0) return null
            const [vPos, hPos] = pos.split("-") as [string, string]
            return (
              <div
                key={pos}
                className={cn(
                  "fixed flex flex-col gap-2 pointer-events-auto",
                  vPos === "top" ? "top-4" : "bottom-4",
                  hPos === "left" && "left-4",
                  hPos === "center" && "left-1/2 -translate-x-1/2",
                  hPos === "right" && "right-4"
                )}
              >
                {positionToasts.map((toast) => (
                  <ToastItem
                    key={toast.id}
                    toast={toast}
                    onClose={() => removeToast(toast.id)}
                  />
                ))}
              </div>
            )
          })}
        </div>
      </ToastContext.Provider>
    )
  }
)
ToastProvider.displayName = "ToastProvider"

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icons = {
    default: null,
    success: <CheckCircle className="h-5 w-5 text-success" />,
    error: <AlertCircle className="h-5 w-5 text-destructive" />,
    warning: <AlertTriangle className="h-5 w-5 text-warning" />,
    info: <Info className="h-5 w-5 text-info" />,
  }

  return (
    <div
      className={cn(
        "pointer-events-auto flex w-80 items-start gap-3 rounded-lg border bg-background p-4 shadow-lg animate-scale-in",
        "transition-all duration-200 hover:shadow-xl"
      )}
    >
      {toast.variant && toast.variant !== "default" && icons[toast.variant]}
      <div className="flex-1 space-y-1">
        {toast.title && <p className="text-body-sm font-semibold">{toast.title}</p>}
        {toast.description && (
          <p className="text-body-xs text-muted-foreground">{toast.description}</p>
        )}
      </div>
      <button
        onClick={onClose}
        className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

function toast(options: Omit<Toast, "id">) {
  // This is a simplified version - in real usage, use the hook from context
  console.warn("Toast called outside provider. Use ToastProvider or useToast hook.")
}

export { ToastProvider, useToast, toast }
export type { Toast, ToastPosition }
