import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../shadcn/Table"
import { Checkbox } from "../shadcn/Checkbox"

export interface Permission {
  id: string
  name: string
  description?: string
  read: boolean
  write: boolean
  delete: boolean
}

export interface RoleManagerProps {
  permissions: Permission[]
  onPermissionChange: (
    id: string,
    type: "read" | "write" | "delete" | "all",
    value: boolean
  ) => void
}

export function RoleManager({ permissions, onPermissionChange }: RoleManagerProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[300px]">Módulo / Recurso</TableHead>
            <TableHead className="text-center w-[100px]">Ler</TableHead>
            <TableHead className="text-center w-[100px]">Escrever</TableHead>
            <TableHead className="text-center w-[100px]">Excluir</TableHead>
            <TableHead className="text-right">Acesso Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map((perm) => {
            const hasAll = perm.read && perm.write && perm.delete
            return (
              <TableRow key={perm.id}>
                <TableCell className="font-medium">
                  <div>{perm.name}</div>
                  {perm.description && (
                    <div className="text-xs text-muted-foreground font-normal">
                      {perm.description}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    checked={perm.read}
                    onCheckedChange={(checked) =>
                      onPermissionChange(perm.id, "read", checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    checked={perm.write}
                    onCheckedChange={(checked) =>
                      onPermissionChange(perm.id, "write", checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    checked={perm.delete}
                    onCheckedChange={(checked) =>
                      onPermissionChange(perm.id, "delete", checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end pr-4">
                    <Checkbox
                      checked={hasAll}
                      onCheckedChange={(checked) =>
                        onPermissionChange(perm.id, "all", checked as boolean)
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
