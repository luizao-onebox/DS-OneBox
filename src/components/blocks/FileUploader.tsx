import * as React from "react"
import { UploadCloud, File, X, CheckCircle, AlertCircle } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../shadcn/Button"
import { Progress } from "../shadcn/Progress"

export interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilesSelected?: (files: File[]) => void
  maxFiles?: number
  maxSize?: number // in MB
  accept?: string
}

export function FileUploader({
  className,
  onFilesSelected,
  maxFiles = 5,
  maxSize = 10,
  accept = "*",
  ...props
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [files, setFiles] = React.useState<{ file: File; progress: number; status: "uploading" | "success" | "error" }[]>([])

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files))
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const handleFiles = (newFiles: File[]) => {
    // In a real scenario, we would validate sizes and types here.
    // For this UI component, we simulate an upload process.
    const newFileObjects = newFiles.slice(0, maxFiles).map(file => ({
      file,
      progress: 0,
      status: "uploading" as const
    }))
    
    setFiles(prev => [...prev, ...newFileObjects])
    if (onFilesSelected) onFilesSelected(newFiles)

    // Simulate upload progress
    newFileObjects.forEach((fileObj, idx) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 20
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setFiles(prev => {
            const updated = [...prev]
            const index = updated.findIndex(f => f.file.name === fileObj.file.name)
            if (index !== -1) {
              updated[index].progress = 100
              updated[index].status = "success"
            }
            return updated
          })
        } else {
          setFiles(prev => {
            const updated = [...prev]
            const index = updated.findIndex(f => f.file.name === fileObj.file.name)
            if (index !== -1) {
              updated[index].progress = progress
            }
            return updated
          })
        }
      }, 300)
    })
  }

  const removeFile = (fileName: string) => {
    setFiles(prev => prev.filter(f => f.file.name !== fileName))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      {/* Dropzone Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative flex flex-col items-center justify-center w-full h-48 rounded-lg border-2 border-dashed transition-colors cursor-pointer bg-muted/20 hover:bg-muted/50",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          className="hidden"
          accept={accept}
          multiple={maxFiles > 1}
        />
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
          <div className={cn("p-3 rounded-full mb-3", isDragging ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground")}>
            <UploadCloud className="w-8 h-8" />
          </div>
          <p className="mb-2 text-sm text-foreground font-semibold">
            <span className="text-primary hover:underline">Clique para selecionar</span> ou arraste e solte
          </p>
          <p className="text-xs text-muted-foreground">
            SVG, PNG, JPG ou PDF (Máx. {maxSize}MB)
          </p>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((fileObj, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 border rounded-lg bg-card">
              <div className="p-2 bg-primary/10 text-primary rounded-md shrink-0">
                <File className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between mb-1">
                  <p className="text-sm font-medium truncate text-foreground">
                    {fileObj.file.name}
                  </p>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {formatFileSize(fileObj.file.size)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={fileObj.progress} className="h-1.5" />
                  {fileObj.status === "success" && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
                  {fileObj.status === "error" && <AlertCircle className="w-4 h-4 text-destructive shrink-0" />}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(fileObj.file.name)
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
