import { Progress } from "./Progress"

// Função auxiliar para calcular a cor e texto de risco
function getRiskProps(value: number) {
  if (value < 33) {
    return {
      label: "Baixo risco de manipulação",
      textColor: "text-emerald-600 dark:text-emerald-500",
      gradient: "bg-gradient-to-r from-emerald-400 to-emerald-500",
    }
  }
  if (value < 66) {
    return {
      label: "Indícios de manipulação",
      textColor: "text-amber-600 dark:text-amber-500",
      gradient: "bg-gradient-to-r from-emerald-400 to-amber-400",
    }
  }
  return {
    label: "Alto risco de manipulação",
    textColor: "text-red-700 dark:text-red-500",
    gradient: "bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500",
  }
}

export default {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "number", min: 0, max: 100 },
  },
}

export const ProgressPlayground = {
  args: {
    value: 50,
  },
}

export const ProgressGallery = {
  render: () => (
    <div className="space-y-12 w-full max-w-3xl">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <Progress value={50} />
      </section>

      {/* Variação de Risco baseada nos estilos primitivos */}
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Variação de Risco (Gradient)</h2>
        <div className="space-y-6">
          {[
            { val: 25, prefix: "Storage" },
            { val: 50, prefix: "Usage" },
            { val: 75, prefix: "Storage" },
            { val: 95, prefix: "Complete" },
          ].map((item, idx) => {
            const risk = getRiskProps(item.val)
            return (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1.5 text-foreground">
                    <span>{item.prefix}</span>
                  </div>
                  <span className="text-foreground">{item.val}%</span>
                </div>
                <Progress 
                  value={item.val} 
                  indicatorClassName={risk.gradient}
                />
              </div>
            )
          })}
        </div>
      </section>
    </div>
  ),
}
