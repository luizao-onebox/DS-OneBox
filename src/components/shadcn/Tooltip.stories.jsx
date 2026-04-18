import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip"
import { Button } from "./Button"

export default {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
}

export const TooltipPlayground = {
  render: () => (
    <Tooltip content="This is a tooltip">
      <TooltipTrigger>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent />
    </Tooltip>
  ),
}

export const TooltipGallery = {
  render: () => (
    <div className="space-y-6">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Positions</h2>
        <div className="flex gap-2 flex-wrap">
          <Tooltip content="Top tooltip" side="top">
            <TooltipTrigger>
              <Button variant="outline">Top</Button>
            </TooltipTrigger>
            <TooltipContent />
          </Tooltip>
          <Tooltip content="Bottom tooltip" side="bottom">
            <TooltipTrigger>
              <Button variant="outline">Bottom</Button>
            </TooltipTrigger>
            <TooltipContent />
          </Tooltip>
          <Tooltip content="Left tooltip" side="left">
            <TooltipTrigger>
              <Button variant="outline">Left</Button>
            </TooltipTrigger>
            <TooltipContent />
          </Tooltip>
          <Tooltip content="Right tooltip" side="right">
            <TooltipTrigger>
              <Button variant="outline">Right</Button>
            </TooltipTrigger>
            <TooltipContent />
          </Tooltip>
        </div>
      </section>
    </div>
  ),
}
