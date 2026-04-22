import { Progress } from "./Progress"

// Função auxiliar apenas para retornar a cor do texto, já que o gradiente agora é interno no Progress
function getRiskTextClass(value: number) {
  if (value < 33) return "text-emerald-600"
  if (value < 66) return "text-amber-600"
  return "text-red-700"
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
                  variant="gradient"
                />
              </div>
            )
          })}
        </div>
      </section>

      {/* Variações de Tamanho */}
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Sizes</h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Small (sm)</span>
            <Progress value={40} size="sm" />
          </div>
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Default</span>
            <Progress value={60} size="default" />
          </div>
          <div className="space-y-2">
            <span className="text-xs text-muted-foreground">Large (lg)</span>
            <Progress value={80} size="lg" />
          </div>
        </div>
      </section>
    </div>
  ),
}
