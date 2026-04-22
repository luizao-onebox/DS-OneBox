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
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Variação de Risco (Gradient)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 p-8 bg-slate-50 dark:bg-slate-950 rounded-xl border">
          {[
            { val: 6, label: false, prefix: "Foto:" },
            { val: 6, label: false, prefix: "DI:" },
            { val: 25, label: true, prefix: "Foto:" },
            { val: 25, label: true, prefix: "DI:" },
            { val: 50, label: true, prefix: "Foto:" },
            { val: 50, label: true, prefix: "DI:" },
            { val: 95, label: true, prefix: "Foto:" },
            { val: 95, label: true, prefix: "DI:" },
          ].map((item, idx) => {
            const risk = getRiskProps(item.val)
            return (
              <div key={idx} className="space-y-3">
                <div className="flex items-center gap-1.5 text-base font-bold">
                  <span className="text-slate-500 dark:text-slate-400">{item.prefix}</span>
                  {item.label && <span className={risk.textColor}>{risk.label}</span>}
                </div>
                <Progress 
                  value={item.val} 
                  className="h-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                  indicatorClassName={risk.gradient}
                />
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Basic</h2>
        <Progress value={50} />
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Various Values</h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage</span>
              <span>25%</span>
            </div>
            <Progress value={25} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Usage</span>
              <span>50%</span>
            </div>
            <Progress value={50} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage</span>
              <span>75%</span>
            </div>
            <Progress value={75} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Complete</span>
              <span>100%</span>
            </div>
            <Progress value={100} />
          </div>
        </div>
      </section>
    </div>
  ),
}
