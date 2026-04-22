import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/Card"
import { Alert, AlertDescription } from "../shadcn/Alert"

interface DistributionItem {
  id: string
  label: string
  value: number // percentage
  colorClass: string
  description: string
}

export function ScoreDistribution() {
  const items: DistributionItem[] = [
    {
      id: "captured",
      label: "Capturado",
      value: 56.1,
      colorClass: "bg-emerald-500",
      description: "sobreposição entre referência e amostra",
    },
    {
      id: "unbalanced",
      label: "Desbalanceamento",
      value: 15.5,
      colorClass: "bg-amber-400 text-amber-950",
      description: "IFs presentes com proporção incorreta",
    },
    {
      id: "missing",
      label: "IFs ausentes",
      value: 28.4,
      colorClass: "bg-red-500",
      description: "C6, Itaú Mercantil, Itaú Consignado",
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
          Decomposição do Score — Distribuição do peso de referência
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Progress Bar */}
        <div className="flex h-8 w-full overflow-hidden rounded-md mb-4">
          {items.map((item) => (
            <div
              key={item.id}
              style={{ width: `${item.value}%` }}
              className={`${item.colorClass} flex items-center justify-center text-xs font-bold transition-all hover:brightness-110 ${
                item.id === "unbalanced" ? "text-amber-950" : "text-white"
              }`}
            >
              {item.value}%
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-xs sm:text-sm">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <div className={`h-3 w-3 shrink-0 rounded-[2px] ${item.colorClass.split(" ")[0]}`} />
              <div className="leading-none mt-[2px]">
                <span className="font-bold text-foreground">
                  {item.label} ({item.value}%)
                </span>
                <span className="text-muted-foreground"> — {item.description}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Methodology Note */}
        <Alert className="mt-2 text-xs">
          <AlertDescription>
            <span className="font-bold">Metodologia — Coeficiente de Sobreposição:</span> para cada IF da referência, computa-se min(ref%, amostra%). A soma desses mínimos dividida pelo total de peso da referência (82,35%) mede a fração do universo de contratos efetivamente coberta pela amostra com as proporções corretas. Base: 61 docs na amostra vs. dataset do cliente (14 IFs, ~82% do universo).
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
