import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    interactiveContent?: boolean
  }
>(({ className, children, interactiveContent = false, ...props }, ref) => {
  if (interactiveContent) {
    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          asChild
          {...props}
        >
          <div
            role="button"
            tabIndex={0}
            className={cn(
              "flex flex-1 items-center justify-between py-4 font-medium transition-all duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md cursor-pointer",
              className
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
              }
            }}
          >
            {children}
          </div>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    )
  }

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-body-sm transition-all duration-300 ease-out data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

/**
 * @name Accordion
 * @description
 * Container retrátil para exibir listas de conteúdos (FAQ, detalhes avançados, configurações).
 *
 * ## Workflow (LEIA PRIMEIRO)
 * 1. Envolva tudo com `<Accordion type="single" collapsible>` (um aberto por vez) ou `type="multiple"` (vários abertos)
 * 2. Cada item é um `<AccordionItem value="único">`
 * 3. Dentro do Item: `<AccordionTrigger>` + `<AccordionContent>`
 *
 * ## Uso Básico
 * ```tsx
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Pergunta 1</AccordionTrigger>
 *     <AccordionContent>Resposta 1</AccordionContent>
 *   </AccordionItem>
 *   <AccordionItem value="item-2">
 *     <AccordionTrigger>Pergunta 2</AccordionTrigger>
 *     <AccordionContent>Resposta 2</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 *
 * ## Regras Obrigatórias
 * - **Máximo 2 níveis de aninhamento**. 3 níveis é confuso e inacessível.
 * - **Cada AccordionItem precisa de `value` único**
 * - **Para elementos interativos dentro do Trigger** (Switch, Button): use `interactiveContent={true}`
 *
 * ## AccordionTrigger com Elementos Interativos
 * O Trigger é um `<button>` nativo. Colocar Switch/Button dentro causa validateDOMNesting.
 * Solução:
 * ```tsx
 * // ❌ ERRADO
 * <AccordionTrigger><Switch /> Título</AccordionTrigger>
 *
 * // ✅ CERTO
 * <AccordionTrigger interactiveContent>
 *   <Flex align="center" justify="between" className="w-full">
 *     <span>Título</span>
 *     <Switch />
 *   </Flex>
 * </AccordionTrigger>
 * ```
 *
 * ## Props do AccordionTrigger
 * - `interactiveContent?: boolean` — Substitui button nativo por div role="button". Use quando houver elementos interativos dentro.
 */
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
