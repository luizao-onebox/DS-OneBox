# DS-OneBox: LLM Context & Documentation
This file provides context for Large Language Models (LLMs) to understand, consume, and generate code using the DS-OneBox Design System.

## 1. Technology Stack
- Framework: React 18
- Styling: Tailwind CSS v4
- Component Base: Radix UI primitives (Shadcn UI approach)
- Icons: lucide-react
- Font: Inter (Default sans-serif)

## 2. Design Tokens (Strict Usage Required)
DO NOT use arbitrary tailwind classes for colors or typography. ALWAYS use the semantic tokens defined below.

### 2.1 Typography (Semantic Classes)
The design system abstracts font-size, line-height, letter-spacing, and font-weight into single semantic utility classes.
- Display: text-display-2xl, text-display-xl, text-display-lg, text-display-md, text-display-sm
- Headings: text-h1, text-h2, text-h3, text-h4, text-h5, text-h6
- Body: text-body-xl, text-body-lg, text-body-md (default), text-body-sm, text-body-xs
- Labels: text-label-xl, text-label-lg, text-label-md, text-label-sm, text-label-xs
- Code: text-code-lg, text-code-md, text-code-sm, text-code-xs

### 2.2 Colors (Scales 50 to 950)
Colors follow a semantic 3-layer architecture.
- Brand/Primary: primary-{scale} (e.g., bg-primary-500)
- Semantic States: success-{scale}, warning-{scale}, destructive-{scale}, info-{scale}
- Neutrals: neutral-{scale} (Use for borders, backgrounds)

### 2.3 Layout Primitives
Avoid hardcoding pixel values (e.g., w-[400px]). Use fluid classes like w-full max-w-md or primitives:
- <Container>, <Section>, <Grid>, <Flex> (Exported from ds-onebox)

## 3. Golden Rules for Code Generation
1. Icons: Always import from lucide-react. For buttons, use className="mr-2 h-4 w-4".
2. Responsive Spacing: Prefer tailwind spacing (p-4, gap-4) over arbitrary values (p-[16px]).
3. Shadcn UI Architecture: Many components use dot notation or multiple exports (e.g., Card, CardHeader, CardTitle, CardContent). Always read the component's source code below to see the exact exports and props before using them.

## 4. UI Components Source Code (Shadcn)
Below is the exact source code for each component. Read this to understand the exported sub-components, the props interfaces, and the CVA variants available.

### Component: Accordion
\	sx
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
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all duration-200 hover:text-primary [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
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
 * @description
 * Container retrátil para exibir listas de conteúdos (FAQ, detalhes avançados).
 * 
 * **REGRAS PARA A IA:**
 * - Sempre envolva os `<AccordionItem>` com `<Accordion type="single" collapsible>` para abrir apenas um por vez, ou `type="multiple"` para vários simultaneamente.
 * - Todos `<AccordionItem>` precisam de um `value="..."` único.
 */
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

\\n
### Component: Alert
\	sx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"

import { cn } from "../../lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-body-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-success/50 text-success dark:border-success [&>svg]:text-success bg-success/10",
        warning: "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning bg-warning/10",
        info: "border-info/50 text-info dark:border-info [&>svg]:text-info bg-info/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  /** Se false, não injetará automaticamente os ícones baseados na variante */
  showIcon?: boolean
}

/**
 * @description
 * Alertas e notificações inline (ex: topo do formulário, avisos de sistema).
 * 
 * **REGRAS PARA A IA:**
 * - Use para comunicar o resultado de uma ação, avisos de bloqueio ou informações.
 * - Por padrão, ícones (Lucide) são injetados automaticamente baseados na variante (destructive=AlertCircle, success=CheckCircle, warning=AlertTriangle, default=Info).
 * - Se precisar de um ícone customizado, passe `<Alert showIcon={false}> <CustomIcon /> <AlertTitle>... </Alert>`.
 * - Não confunda com Toast. Alert é estático na tela, Toast some após X segundos.
 */
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, showIcon = true, children, ...props }, ref) => {
    
    // Injeção inteligente de ícones
    let DefaultIcon = null
    if (showIcon) {
      if (variant === "destructive") DefaultIcon = AlertCircle
      else if (variant === "success") DefaultIcon = CheckCircle2
      else if (variant === "warning") DefaultIcon = AlertTriangle
      else if (variant === "info") DefaultIcon = Info
      else DefaultIcon = Info
    }

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {DefaultIcon && <DefaultIcon className="h-4 w-4" />}
        {children}
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-medium leading-none tracking-tight", className)}
      {...props}
    />
  )
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-body-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }

\\n
### Component: Avatar
\	sx
import * as React from "react"
import { cn } from "../../lib/utils"

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}
export interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * @description
 * Componente visual de Avatar circular (foto de perfil) com fallback.
 * 
 * **REGRAS PARA A IA:**
 * - A estrutura deve ser sempre `<Avatar><AvatarImage src="..." /><AvatarFallback>XX</AvatarFallback></Avatar>`.
 * - Se a imagem falhar ao carregar ou não existir, o `AvatarFallback` será renderizado (coloque as iniciais do usuário nele).
 * - Para mudar o tamanho, passe classes de altura e largura (ex: `className="h-16 w-16"`) no componente pai `<Avatar>`.
 */
const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
)
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, ...props }, ref) => {
    const [error, setError] = React.useState(false)

    if (!src || error) return null

    return (
      <img
        ref={ref}
        src={src}
        onError={() => setError(true)}
        className={cn("absolute inset-0 aspect-square h-full w-full object-cover z-10", className)}
        {...props}
      />
    )
  }
)
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 flex h-full w-full items-center justify-center rounded-full bg-muted text-label-md z-0",
        className
      )}
      {...props}
    />
  )
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }

\\n
### Component: Badge
\	sx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center border text-label-sm",
  {
    variants: {
      variant: {
        solid: "border-transparent shadow-sm",
        soft: "border-transparent",
        outline: "bg-transparent",
      },
      color: {
        neutral: "",
        primary: "",
        success: "",
        warning: "",
        destructive: "",
        info: "",
        indigo: "",
        purple: "",
        pink: "",
      },
      size: {
        default: "px-2.5 py-0.5 rounded-md",
        pill: "px-3 py-1 rounded-full",
        icon: "h-6 w-6 rounded-full p-0",
      },
    },
    compoundVariants: [
      // Solid Variants
      { variant: "solid", color: "neutral", className: "bg-neutral-900 text-neutral-50" },
      { variant: "solid", color: "primary", className: "bg-primary-500 text-white" },
      { variant: "solid", color: "success", className: "bg-success-500 text-white" },
      { variant: "solid", color: "warning", className: "bg-warning-500 text-white" },
      { variant: "solid", color: "destructive", className: "bg-destructive-500 text-white" },
      { variant: "solid", color: "info", className: "bg-info-500 text-white" },
      { variant: "solid", color: "indigo", className: "bg-indigo-500 text-white" },
      { variant: "solid", color: "purple", className: "bg-purple-500 text-white" },
      { variant: "solid", color: "pink", className: "bg-pink-500 text-white" },

      // Soft Variants
      { variant: "soft", color: "neutral", className: "bg-neutral-100 text-neutral-800" },
      { variant: "soft", color: "primary", className: "bg-primary-100 text-primary-800" },
      { variant: "soft", color: "success", className: "bg-success-100 text-success-800" },
      { variant: "soft", color: "warning", className: "bg-warning-100 text-warning-800" },
      { variant: "soft", color: "destructive", className: "bg-destructive-100 text-destructive-800" },
      { variant: "soft", color: "info", className: "bg-info-100 text-info-800" },
      { variant: "soft", color: "indigo", className: "bg-indigo-100 text-indigo-800" },
      { variant: "soft", color: "purple", className: "bg-purple-100 text-purple-800" },
      { variant: "soft", color: "pink", className: "bg-pink-100 text-pink-800" },

      // Outline Variants
      { variant: "outline", color: "neutral", className: "border-neutral-200 text-neutral-800" },
      { variant: "outline", color: "primary", className: "border-primary-200 text-primary-800" },
      { variant: "outline", color: "success", className: "border-success-200 text-success-800" },
      { variant: "outline", color: "warning", className: "border-warning-200 text-warning-800" },
      { variant: "outline", color: "destructive", className: "border-destructive-200 text-destructive-800" },
      { variant: "outline", color: "info", className: "border-info-200 text-info-800" },
      { variant: "outline", color: "indigo", className: "border-indigo-200 text-indigo-800" },
      { variant: "outline", color: "purple", className: "border-purple-200 text-purple-800" },
      { variant: "outline", color: "pink", className: "border-pink-200 text-pink-800" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "neutral",
      size: "default",
    },
  }
)

export interface BadgeProps 
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">, 
    VariantProps<typeof badgeVariants> {
  /** 
   * Se true, o badge renderizará seu filho (child) como elemento principal.
   * Útil para estilizar componentes <Link> ou <a> como badges clicáveis.
   */
  asChild?: boolean
}

/**
 * @description
 * Badge para exibir status, contadores ou rótulos pequenos.
 * 
 * **REGRAS PARA A IA:**
 * - Use 'destructive' para erros, 'success' para sucesso, 'warning' para alertas.
 * - Use 'secondary' ou 'outline' para tags neutras ou filtros selecionados.
 * - Para criar um badge clicável, use `asChild` e coloque a tag `<a>` dentro.
 */
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, color, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp ref={ref} className={cn(badgeVariants({ variant, color, size }), className)} {...props}>
        {children}
      </Comp>
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }

\\n
### Component: Breadcrumb
\	sx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "../../lib/utils"

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode
}

/**
 * @description
 * Mostra a hierarquia de navegação da página atual (Breadcrumbs / Trilhas de Pão).
 * 
 * **REGRAS PARA A IA:**
 * - Sempre estruture os itens na seguinte ordem: `<Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink/></BreadcrumbItem><BreadcrumbSeparator/>...</BreadcrumbList></Breadcrumb>`.
 * - O último item não recebe Separator e deve ser um `<BreadcrumbPage>` (texto plano sem link) para indicar a página atual.
 * - Para rotas de react-router ou next, passe `<BreadcrumbLink asChild><Link>...</Link></BreadcrumbLink>`.
 */
const Breadcrumb = React.forwardRef<
  HTMLElement,
  BreadcrumbProps
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-body-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">Mais links</span>
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}

\\n
### Component: Button
\	sx
import * as React from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-label-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:shadow-md hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow hover:shadow-md hover:bg-destructive/90",
        destructiveOutline:
          "border border-destructive text-destructive shadow-sm hover:shadow hover:bg-destructive/10",
        success:
          "bg-success text-success-foreground shadow hover:shadow-md hover:bg-success/90",
        outline:
          "border border-input bg-background shadow-sm hover:shadow hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:shadow hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-label-sm",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** 
   * Se true, o botão renderizará seu filho (child) como elemento principal.
   * Útil para estilizar componentes <Link> como botões.
   */
  asChild?: boolean
  /** 
   * Exibe um spinner de carregamento e desabilita o botão temporariamente.
   */
  isLoading?: boolean
  /**
   * Ícone da biblioteca `lucide-react`.
   * @deprecated Prefira compor ícones diretamente no `children` (ex: <Button><Mail className="mr-2 h-4 w-4" /> Email</Button>)
   */
  icon?: React.ComponentType<any>
  /**
   * Posição do ícone antigo. Padrão é 'left'.
   * @deprecated
   */
  iconPosition?: "left" | "right"
}

/**
 * @description
 * Botão Principal da OneBox.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre use a variante 'destructive' APENAS para exclusões e alertas severos.
 * - Use 'outline' ou 'secondary' como botão de cancelamento/secundário ao lado de um botão 'default'.
 * - Não use dois botões 'default' juntos na mesma linha.
 * - Para ícones, insira o ícone do `lucide-react` dentro do componente com a classe `mr-2 h-4 w-4` (se for à esquerda).
 * - Se precisar de um estado de salvamento/carregamento, apenas passe a prop `isLoading={true}`.
 * - Para usar com roteadores (Next.js, React Router), passe a prop `asChild` e coloque o `<Link>` dentro.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, icon, iconPosition = "left", children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Suporte legado à prop `icon` antiga para retrocompatibilidade
    const iconSizeClass = size === "sm" || size === "icon-sm" ? "h-3 w-3" : size === "lg" || size === "icon-lg" ? "h-5 w-5" : "h-4 w-4"
    const hasChildren = React.Children.count(children) > 0;
    const iconMarginClass = !hasChildren ? "" : iconPosition === "left" ? "mr-2" : "ml-2"
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 className={cn("animate-spin", hasChildren ? "mr-2" : "", iconSizeClass)} />
        )}
        
        {!isLoading && icon && iconPosition === "left" && 
          React.createElement(icon, { className: cn(iconSizeClass, iconMarginClass) })
        }
        
        <Slottable>{children}</Slottable>
        
        {!isLoading && icon && iconPosition === "right" && 
          React.createElement(icon, { className: cn(iconSizeClass, iconMarginClass) })
        }
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

\\n
### Component: Calendar
\	sx
import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "../../lib/utils"
import { buttonVariants } from "./Button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4 relative",
        month_caption: "flex justify-center pt-1 relative items-center h-8",
        caption_label: "text-label-md hidden",
        caption_dropdowns: "flex justify-center gap-1 w-full",
        dropdown: "text-label-md bg-transparent border-0 focus:ring-0 cursor-pointer appearance-none px-1 rounded hover:bg-accent hover:text-accent-foreground",
        dropdown_month: "flex items-center capitalize",
        dropdown_year: "flex items-center",
        dropdown_icon: "hidden",
        nav: "flex items-center absolute inset-x-0 top-0 justify-between pt-1",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-10 ml-1"
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 z-10 mr-1"
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-body-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        range_end: "day-range-end",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === "left" ? ChevronLeft : ChevronRight
          return <Icon className="h-4 w-4" />
        },
        Dropdown: ({ value, onChange, options, "aria-label": ariaLabel, ...props }: any) => {
          const selected = options?.find((child: any) => child.value === value)
          
          const handleChange = (value: string) => {
            const changeEvent = {
              target: { value },
            } as React.ChangeEvent<HTMLSelectElement>
            onChange?.(changeEvent)
          }

          return (
            <Select
              value={value?.toString()}
              onValueChange={handleChange}
            >
              <SelectTrigger 
                aria-label={ariaLabel}
                className={cn(
                  "h-7 w-fit gap-1 border-0 focus:ring-0 focus:ring-offset-0 bg-transparent hover:bg-accent hover:text-accent-foreground py-0 pl-2 pr-1 font-medium shadow-none",
                  props.className
                )}
              >
                <SelectValue>{selected?.label}</SelectValue>
              </SelectTrigger>
              <SelectContent position="popper" className="max-h-48 min-w-32">
                {options?.map((option: any, id: number) => (
                  <SelectItem
                    key={`${option.value}-${id}`}
                    value={option.value?.toString() ?? ""}
                    disabled={option.disabled}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        },
      }}
      captionLayout="dropdown"
      fromYear={2000}
      toYear={2030}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

\\n
### Component: Card
\	sx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "../../lib/utils"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Transforma o Card num link ou botão clicável preservando seus estilos. */
  asChild?: boolean
  /** Adiciona animação leve de hover se for verdadeiro e não usar asChild */
  isPressable?: boolean
}

/**
 * @description
 * Container de conteúdo em blocos.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre componha um Card com suas partes: `<Card><CardHeader><CardTitle/></CardHeader><CardContent/></Card>`.
 * - Se o Card for inteiro clicável, use a prop `isPressable` ou `<Card asChild><a>...</a></Card>`.
 * - Nunca use Cards infinitos. Delimite seu tamanho usando colunas ou largura máxima.
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, asChild = false, isPressable = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200",
          isPressable 
            ? "cursor-pointer hover:shadow-md hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent/10 active:scale-[0.98]"
            : "hover:shadow-md hover:-translate-y-0.5",
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-body-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

\\n
### Component: Carousel
\	sx
import * as React from "react"
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "./Button"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    React.useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    React.useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className="overflow-hidden">
      <div
        ref={ref}
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </div>
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  )
})
CarouselNext.displayName = "CarouselNext"

/**
 * @description
 * Carrossel de imagens ou cards.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre envolva a listagem em: `<Carousel><CarouselContent><CarouselItem>...</CarouselItem></CarouselContent></Carousel>`.
 * - Lembre-se de adicionar `CarouselPrevious` e `CarouselNext` ao lado do `CarouselContent`.
 */
export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
}

\\n
### Component: Chart
\	sx
import * as React from "react"
import { Legend, ResponsiveContainer, Tooltip } from "recharts"

import { cn } from "../../lib/utils"

// Variáveis CSS para lidar com temas claros/escuros nos gráficos
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

/**
 * @description
 * Container que envolve qualquer componente Recharts para injetar as variáveis de cor dinâmicas.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre envolva a tag do Recharts (ex: `<BarChart>`) com este container.
 * - Passe um objeto `config` mapeando as chaves dos dados para rótulos e cores.
 */
const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<
      typeof ResponsiveContainer
    >["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-body-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
          className
        )}
        {...props}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: Object.entries(config)
              .filter(([_, value]) => value.color)
              .map(
                ([key, value]) =>
                  `[data-chart=${chartId}] {
                    --color-${key}: ${value.color};
                  }`
              )
              .join("\n"),
          }}
        />
        <ResponsiveContainer>{children}</ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartTooltip = Tooltip

/**
 * @description
 * Conteúdo do Tooltip estilizado para os gráficos (aparece no hover).
 */
const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
      payload?: any[]
      label?: React.ReactNode
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-body-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-sm border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "line",
                              "h-1 w-1": indicator === "dot",
                              "h-1 w-1 border-b-2 border-dotted bg-transparent":
                                indicator === "dashed",
                            }
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as React.CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span className="font-mono font-medium tabular-nums text-foreground">
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltip"

const ChartLegend = Legend

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Omit<React.ComponentProps<typeof Legend>, "payload"> & {
      payload?: any[]
      verticalAlign?: "top" | "middle" | "bottom"
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className
        )}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <div
              key={item.value}
              className={cn(
                "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
              )}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-sm"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          )
        })}
      </div>
    )
  }
)
ChartLegendContent.displayName = "ChartLegend"

// Helper function to get config from payload
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: any,
  key: string
) {
  if (typeof payload !== "object" || payload === null) {
    return undefined
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined

  let configLabelKey: string = key

  if (
    key in payload &&
    typeof payload[key] === "string"
  ) {
    configLabelKey = payload[key]
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key] === "string"
  ) {
    configLabelKey = payloadPayload[key]
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
}

\\n
### Component: Checkbox
\	sx
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "../../lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground data-[state=checked]:scale-105 hover:data-[state=unchecked]:border-primary/50 hover:data-[state=unchecked]:bg-accent/30",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current transition-transform duration-200 data-[state=checked]:animate-checkbox-bounce")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

/**
 * @description
 * Caixa de seleção múltipla (Input de tipo Checkbox customizado via Radix UI).
 * 
 * **REGRAS PARA A IA:**
 * - Sempre envolva o `<Checkbox>` com um `<Label>` correspondente para manter a acessibilidade ou relacione via `id` e `htmlFor`.
 * - Este componente injeta um SVG interno do Lucide (Check) quando ativado (estado 'checked').
 */
export { Checkbox }

\\n
### Component: Command
\	sx
import * as React from "react"
import { type DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "../../lib/utils"
import { Dialog, DialogContent } from "./Dialog"
import { ScrollArea } from "./ScrollArea"

export interface CommandDialogProps extends DialogProps {}

/**
 * @description
 * Componente de paleta de comandos (Command Menu/Combobox).
 * 
 * **REGRAS PARA A IA:**
 * - Sempre que um sistema requerer atalhos rápidos (`Ctrl+K` / `Cmd+K`), use este componente montado dentro de `<CommandDialog>`.
 * - Certifique-se de envolver os `<CommandItem>` dentro de um `<CommandGroup>` para categorização e correta leitura do teclado.
 * - Não use o Command como select normal de formulário.
 */
const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialog {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-body-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = CommandPrimitive.Input.displayName

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <ScrollArea className="max-h-72">
    <CommandPrimitive.List
      ref={ref}
      className={cn("overflow-y-auto overflow-x-hidden", className)}
      {...props}
    />
  </ScrollArea>
))
CommandList.displayName = CommandPrimitive.List.displayName

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-body-sm"
    {...props}
  />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-label-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-body-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitive.Item.displayName

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-label-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}

\\n
### Component: Container
\	sx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const containerVariants = cva(
  "mx-auto w-full px-4 sm:px-6 lg:px-8",
  {
    variants: {
      maxWidth: {
        default: "max-w-7xl",
        sm: "max-w-3xl",
        md: "max-w-5xl",
        lg: "max-w-7xl",
        xl: "max-w-screen-2xl",
        full: "max-w-none",
      },
    },
    defaultVariants: {
      maxWidth: "default",
    },
  }
)

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  asChild?: boolean
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    return (
      <Comp
        className={cn(containerVariants({ maxWidth, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Container.displayName = "Container"

\\n
### Component: ContextMenu
\	sx
import * as React from "react"
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "../../lib/utils"

const ContextMenu = ContextMenuPrimitive.Root

const ContextMenuTrigger = ContextMenuPrimitive.Trigger

const ContextMenuGroup = ContextMenuPrimitive.Group

const ContextMenuPortal = ContextMenuPrimitive.Portal

const ContextMenuSub = ContextMenuPrimitive.Sub

const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-body-sm outline-none focus:bg-accent data-[state=open]:bg-accent transition-colors duration-150",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
))
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-scale-in data-[state=closed]:animate-fade-out transition-all duration-200 ease-out",
      className
    )}
    {...props}
  />
))
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-scale-in data-[state=closed]:animate-fade-out transition-all duration-200 ease-out",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
))
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-body-sm outline-none transition-colors duration-150 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-body-sm outline-none transition-colors duration-150 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
))
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-body-sm outline-none transition-colors duration-150 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
))
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-label-md font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-label-xs tracking-widest opacity-60",
        className
      )}
      {...props}
    />
  )
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

/**
 * @description
 * Menu de contexto acionado por clique direito do mouse.
 *
 * **REGRAS PARA A IA:**
 * - Use em elementos de tabela, arquivos, ou qualquer item que precise de ações rápidas via clique direito.
 * - Mantenha as ações consistentes com o DropdownMenu para padrões de UI uniformes.
 * - Use `<ContextMenuShortcut>` para exibir atalhos de teclado (ex: ⌘+C para Copiar).
 */
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
}

\\n
### Component: DatePicker
\	sx
import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format, Locale } from "date-fns"
import { enUS } from "date-fns/locale/en-US"
import { ptBR } from "date-fns/locale/pt-BR"

import { cn } from "../../lib/utils"
import { Button } from "./Button"
import { Calendar } from "./Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./Popover"

export { enUS, ptBR }

export interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  fromDate?: Date
  toDate?: Date
  fromYear?: number
  toYear?: number
  locale?: Locale
  format?: string
}

const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      date,
      onDateChange,
      placeholder = "Pick a date",
      disabled = false,
      className,
      fromDate,
      toDate,
      fromYear,
      toYear,
      locale = enUS,
      format: dateFormat = "PPP",
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)

    const handleDateSelect = (selectedDate: Date | undefined) => {
      onDateChange?.(selectedDate)
      if (selectedDate) {
        setIsOpen(false)
      }
    }

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal transition-all duration-200 hover:border-primary/50",
              !date && "text-muted-foreground",
              className
            )}
            {...props}
          >
            <CalendarIcon className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            {date ? format(date, dateFormat, { locale }) : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={[
              { from: new Date(1900, 0, 1), to: fromDate ? new Date(fromDate.getTime() - 86400000) : undefined },
              { from: toDate ? new Date(toDate.getTime() + 86400000) : new Date(2100, 0, 1), to: new Date(2100, 0, 1) },
            ]}
            fromYear={fromYear}
            toYear={toYear}
            locale={locale}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)
DatePicker.displayName = "DatePicker"

export { DatePicker }

/**
 * @description
 * Seletor de data com calendário visual.
 *
 * **REGRAS PARA A IA:**
 * - Use para收集 datas de forma visual (nascimento, agendamento, reservas).
 * - Suporta限制 de intervalo com `fromDate` e `toDate`.
 * - Formata a data com date-fns (padrão: "PPP" = "Jan 1, 2024").
 */

\\n
### Component: Dialog
\	sx
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "../../lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-h5 leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-body-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

/**
 * @description
 * Janela modal (Overlay) usada para focar a atenção do usuário em uma tarefa ou informação.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre estruture como: `<Dialog><DialogTrigger /><DialogContent><DialogHeader><DialogTitle /></DialogHeader>...</DialogContent></Dialog>`.
 * - Não use Dialogs para fluxos imensos. Se for formulário longo, prefira o componente `Sheet`.
 * - Dialogs são bloqueantes por natureza (foco preso no modal). 
 */
export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

\\n
### Component: DropdownMenu
\	sx
import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "../../lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-body-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-body-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-body-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-body-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-label-md font-semibold",
      inset && "pl-8",
      className
    )}
    {...props}
  />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-label-xs tracking-widest opacity-60",
        className
      )}
      {...props}
    />
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

/**
 * @description
 * Menus flutuantes (Dropdown) ativados por clique para exibir ações.
 * 
 * **REGRAS PARA A IA:**
 * - Diferente de um Select, DropdownMenu é para AÇÕES (ex: Editar, Excluir, Compartilhar) e não para selecionar um valor em formulário.
 * - Use `<DropdownMenuShortcut>` dentro de `<DropdownMenuItem>` para exibir atalhos de teclado alinhados à direita.
 * - Use `DropdownMenuSeparator` para agrupar ações visualmente.
 */
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

\\n
### Component: Flex
\	sx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const flexVariants = cva(
  "flex",
  {
    variants: {
      direction: {
        row: "flex-row",
        col: "flex-col",
        rowReverse: "flex-row-reverse",
        colReverse: "flex-col-reverse",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
      justify: {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly",
      },
      wrap: {
        nowrap: "flex-nowrap",
        wrap: "flex-wrap",
        wrapReverse: "flex-wrap-reverse",
      },
      gap: {
        none: "gap-0",
        sm: "gap-2",
        default: "gap-4",
        md: "gap-6",
        lg: "gap-8",
        xl: "gap-12",
      },
    },
    defaultVariants: {
      direction: "row",
      align: "center",
      justify: "start",
      wrap: "nowrap",
      gap: "default",
    },
  }
)

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  asChild?: boolean
}

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction, align, justify, wrap, gap, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    return (
      <Comp
        className={cn(flexVariants({ direction, align, justify, wrap, gap, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Flex.displayName = "Flex"

\\n
### Component: Form
\	sx
import * as React from "react"
import type * as LabelPrimitive from "@radix-ui/react-label"
import type { ControllerProps, FieldPath, FieldValues } from "react-hook-form"
import { Controller, FormProvider, useFormContext } from "react-hook-form"

import { cn } from "../../lib/utils"
import { Label } from "./Label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const { getFieldState, formState } = useFormContext()

  if (!fieldContext) {
    throw new Error("useFormField must be used within FormField")
  }

  const fieldState = getFieldState(fieldContext.name, formState)

  return {
    ...fieldState,
    name: fieldContext.name,
    formItemId: `${fieldContext.name}-form-item`,
    formDescriptionId: `${fieldContext.name}-form-item-description`,
    formMessageId: `${fieldContext.name}-form-item-message`,
  }
}

interface FormItemProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    const { id } = React.useId()

    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        {...props}
      />
    )
  }
)
FormItem.displayName = "FormItem"

interface FormLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  required?: boolean
}

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  FormLabelProps
>(({ className, required, children, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(
        error && "text-destructive",
        className
      )}
      htmlFor={formItemId}
      {...props}
    >
      {children}
      {required && <span className="text-destructive ml-1">*</span>}
    </Label>
  )
})
FormLabel.displayName = "FormLabel"

interface FormControlProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ className, ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
      <div
        ref={ref}
        id={formItemId}
        aria-describedby={
          !error
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={!!error}
        className={cn(className)}
        {...props}
      />
    )
  }
)
FormControl.displayName = "FormControl"

interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-body-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  FormMessageProps
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-body-sm text-destructive animate-fade-in", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"

/**
 * @description
 * Sistema de formulários com validação Zod e React Hook Form.
 *
 * **REGRAS PARA A IA:**
 * - Sempre use `<Form>` como wrapper do formulário.
 * - Use `<FormField>` para cada campo com `name` correspondendo ao schema Zod.
 * - Use `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormDescription>`, `<FormMessage>` dentro do Field.
 * - Para validação customizada, use `setError` do `useForm` ou schema Zod.
 */
export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
}

\\n
### Component: Grid
\	sx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const gridVariants = cva(
  "grid",
  {
    variants: {
      columns: {
        1: "grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        12: "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
        none: "",
      },
      gap: {
        none: "gap-0",
        sm: "gap-2",
        default: "gap-4",
        md: "gap-6",
        lg: "gap-8",
        xl: "gap-12",
      },
      alignItems: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
        baseline: "items-baseline",
      },
    },
    defaultVariants: {
      columns: 1,
      gap: "default",
    },
  }
)

export interface GridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  asChild?: boolean
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, columns, gap, alignItems, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "div"
    return (
      <Comp
        className={cn(gridVariants({ columns, gap, alignItems, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Grid.displayName = "Grid"

\\n
### Component: HoverCard
\	sx
import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "../../lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }

\\n
### Component: Input
\	sx
import * as React from "react"
import { cn } from "../../lib/utils"
import { AlertCircle } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Se true, marca o input visualmente com erro (borda vermelha e icone) */
  hasError?: boolean
  /** Ícone ou elemento para ser renderizado à esquerda do texto */
  leftIcon?: React.ReactNode
  /** Ícone ou elemento para ser renderizado à direita do texto */
  rightIcon?: React.ReactNode
}

/**
 * @description
 * Campo de entrada de texto principal.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre que um campo for inválido após submit, use a prop `hasError={true}`. Não injete 'border-destructive' manualmente.
 * - Para campos de busca, passe `leftIcon={<Search className="h-4 w-4" />}`.
 * - Para revelar senhas, use o `rightIcon` e passe um botão.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError = false, leftIcon, rightIcon, ...props }, ref) => {
    
    // Se tem ícones ou erro, precisamos envolver o input em um container relativo
    if (leftIcon || rightIcon || hasError) {
      return (
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 text-muted-foreground flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-body-sm transition-all duration-200 file:border-0 file:bg-transparent file:text-body-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
              leftIcon ? "pl-9" : "",
              rightIcon || hasError ? "pr-9" : "",
              hasError
                ? "border-destructive focus-visible:ring-destructive/50"
                : "focus-visible:ring-primary/30",
              className
            )}
            ref={ref}
            {...props}
          />

          {(rightIcon || hasError) && (
            <div className={cn(
              "absolute right-3 flex items-center", 
              !rightIcon ? "pointer-events-none" : ""
            )}>
              {hasError && !rightIcon ? (
                <AlertCircle className="h-4 w-4 text-destructive" />
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-body-sm transition-colors file:border-0 file:bg-transparent file:text-body-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

\\n
### Component: Label
\	sx
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const labelVariants = cva(
  "text-label-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

/**
 * @description
 * Rótulo acessível associado a um campo de formulário.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre envolva controles como Checkbox e Switch em um container com flex e gap, com este Label adjacente.
 * - Certifique-se de associar o Label ao Input usando `htmlFor="id-do-input"`.
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

\\n
### Component: Logo
\	sx
import * as React from "react"
import { cn } from "../../lib/utils"

import logoLight from "../../assets/logos/logo-light.svg"
import logoDark from "../../assets/logos/logo-dark.svg"
import logoIconLight from "../../assets/logos/logo-icon-light.svg"
import logoIconDark from "../../assets/logos/logo-icon-dark.svg"

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tipo do logo a ser renderizado.
   * 'full' = Logotipo completo com nome "onebox"
   * 'icon' = Apenas o ícone (Bolinha com o recorte)
   */
  variant?: "full" | "icon"
  /**
   * Força um tema específico para o logo.
   * Se não fornecido, o logo adotará o padrão 'light'.
   */
  theme?: "light" | "dark" | "auto"
}

export function Logo({ 
  className, 
  variant = "full", 
  theme = "light",
  ...props 
}: LogoProps) {
  
  const isIcon = variant === "icon"
  const lightSrc = isIcon ? logoIconLight : logoLight
  const darkSrc = isIcon ? logoIconDark : logoDark

  // Renderiza a versão clara (padrão)
  if (theme === "light") {
    return (
      <div className={cn("flex items-center justify-center", className)} {...props}>
        <img 
          src={lightSrc} 
          alt={`Onebox ${variant} logo`} 
          className="h-full w-full object-contain"
        />
      </div>
    )
  }

  // Renderiza a versão escura
  if (theme === "dark") {
    return (
      <div className={cn("flex items-center justify-center", className)} {...props}>
        <img 
          src={darkSrc} 
          alt={`Onebox ${variant} logo`} 
          className="h-full w-full object-contain"
        />
      </div>
    )
  }

  // Renderiza auto adaptável (muda sozinho usando classes Tailwind)
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <img 
        src={lightSrc} 
        alt={`Onebox ${variant} logo`} 
        className="h-full w-full object-contain dark:hidden block"
      />
      <img 
        src={darkSrc} 
        alt={`Onebox ${variant} logo`} 
        className="h-full w-full object-contain dark:block hidden"
      />
    </div>
  )
}

\\n
### Component: NavigationMenu
\	sx
import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
))
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-label-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
)

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDown
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
))
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      className
    )}
    {...props}
  />
))
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName

const NavigationMenuLink = NavigationMenuPrimitive.Link

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
        className
      )}
      ref={ref}
      {...props}
    />
  </div>
))
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      className
    )}
    {...props}
  >
    <div className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuPrimitive.Indicator>
))
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
}
\\n
### Component: Pagination
\	sx
import * as React from "react"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "../../lib/utils"
import { ButtonProps, buttonVariants } from "./Button"

const Pagination = ({
  className,
  ...props
}: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    <span>Anterior</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Próximo</span>
    <ChevronRight className="h-4 w-4" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}

\\n
### Component: Popover
\	sx
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "../../lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

/**
 * @description
 * Balão de conteúdo flutuante ancorado a um botão.
 * 
 * **REGRAS PARA A IA:**
 * - Use para mostrar detalhes extras, formulários curtos (como popover de data/calendário) ou informações adicionais.
 * - Ao contrário do Tooltip (hover), o Popover é ativado por clique e retém foco interativo (formulários).
 * - O conteúdo dentro de `PopoverContent` deve ter padding apropriado (já vem com `p-4` por padrão).
 */
export { Popover, PopoverTrigger, PopoverContent }

\\n
### Component: Progress
\	sx
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      size: {
        sm: "h-2",
        default: "h-4",
        lg: "h-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  value?: number
  indicatorClassName?: string
  variant?: "default" | "gradient"
}

// Função auxiliar para calcular a cor do gradiente baseado no valor
function getGradientStyle(value: number) {
  if (value < 33) {
    return "bg-gradient-to-r from-emerald-400 to-emerald-500"
  }
  if (value < 66) {
    return "bg-gradient-to-r from-emerald-400 to-amber-400"
  }
  return "bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500"
}

/**
 * @description
 * Barra de progresso para indicar andamento de tarefas.
 * 
 * **REGRAS PARA A IA:**
 * - Passe `value={x}` para definir o progresso (onde `x` é de 0 a 100).
 * - A largura do elemento `ProgressIndicator` preencherá automaticamente com base no `value` definido.
 * - Use `size` para alterar a altura (sm, default, lg).
 * - Use `variant="gradient"` para a variação automática de cores baseada no risco.
 */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, size, variant = "default", indicatorClassName, ...props }, ref) => {
  const gradientClass = variant === "gradient" && value !== undefined ? getGradientStyle(value) : ""

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(progressVariants({ size }), className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full transition-all duration-500 ease-in-out",
          variant === "default" ? "bg-primary" : gradientClass,
          indicatorClassName
        )}
        style={{ width: `${value || 0}%` }}
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }

\\n
### Component: RadioGroup
\	sx
import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "../../lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary/70 hover:bg-accent/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:scale-105",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center transition-transform duration-200 data-[state=checked]:animate-radio-bounce">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

/**
 * @description
 * Opções agrupadas onde apenas uma pode ser selecionada.
 * 
 * **REGRAS PARA A IA:**
 * - Use apenas se as escolhas forem mutuamente exclusivas e não binárias (ligado/desligado).
 * - Envolva todos os `<RadioGroupItem>` com o container principal `<RadioGroup>`.
 * - Assine sempre um `Label` ao lado do `RadioGroupItem` para manter acessibilidade.
 */
export { RadioGroup, RadioGroupItem }

\\n
### Component: ScrollArea
\	sx
import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "../../lib/utils"

interface ScrollAreaProps extends React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> {
  orientation?: "vertical" | "horizontal" | "both"
}

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  ScrollAreaProps
>(({ className, children, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    {(orientation === "vertical" || orientation === "both") && (
      <ScrollBar orientation="vertical" />
    )}
    {(orientation === "horizontal" || orientation === "both") && (
      <ScrollBar orientation="horizontal" />
    )}
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }

\\n
### Component: Section
\	sx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const sectionVariants = cva(
  "w-full",
  {
    variants: {
      padding: {
        none: "py-0",
        sm: "py-4 md:py-8",
        default: "py-8 md:py-12 lg:py-16",
        lg: "py-12 md:py-24 lg:py-32",
        xl: "py-24 md:py-32 lg:py-48",
      },
    },
    defaultVariants: {
      padding: "default",
    },
  }
)

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  asChild?: boolean
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, padding, asChild = false, ...props }, ref) => {
    const Comp = asChild ? React.Fragment : "section"
    return (
      <Comp
        className={cn(sectionVariants({ padding, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Section.displayName = "Section"

\\n
### Component: Select
\	sx
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "../../lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-body-sm ring-offset-background placeholder:text-muted-foreground transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary/50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50 transition-transform duration-200" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg transition-all duration-200 ease-out data-[state=open]:animate-scale-in data-[state=closed]:animate-fade-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-center",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-label-md font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-body-sm outline-none transition-colors duration-150 focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent/50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
\\n
### Component: Separator
\	sx
import * as React from "react"
import { cn } from "../../lib/utils"

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** A orientação da linha separadora */
  orientation?: "horizontal" | "vertical"
  /** Se true, o separador é puramente visual e ignorado por leitores de tela */
  decorative?: boolean
}

/**
 * @description
 * Linha visual para separar conteúdos.
 * 
 * **REGRAS PARA A IA:**
 * - Use para dividir seções longas em Cards, Dropdowns ou Layouts principais.
 * - Para separadores horizontais, a altura padrão é de 1px. Para separadores verticais, a largura é de 1px.
 * - Se você usar `orientation="vertical"`, lembre-se que o elemento pai precisa ter uma altura definida (ex: `h-5` ou `h-full`).
 */
const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <div
      ref={ref}
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation === "horizontal" ? "horizontal" : "vertical"}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = "Separator"

export { Separator }

\\n
### Component: Sheet
\	sx
import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "../../lib/utils"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-h5 text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-body-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

/**
 * @description
 * Painel lateral deslizante (Sidebar/Drawer) para formulários e filtros complexos.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre prefira `Sheet` em vez de `Dialog` quando o conteúdo for longo ou requerer rolagem.
 * - Use a propriedade `side` no `<SheetContent side="left" | "right" | "top" | "bottom">` para escolher a origem. O padrão é `right`.
 * - Certifique-se de que o conteúdo interno tenha espaçamento adequado e scroll se necessário.
 */
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}

\\n
### Component: Skeleton
\	sx
import * as React from "react"
import { cn } from "../../lib/utils"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * @description
 * Placeholder visual usado durante o carregamento de conteúdo.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre que uma página ou componente buscar dados de uma API, implemente um Skeleton que tenha o mesmo formato do conteúdo final.
 * - Use as classes de altura (h) e largura (w) do Tailwind para modelar o Skeleton. Ex: `className="h-4 w-64"`
 * - Para simular um avatar circular, use `className="h-12 w-12 rounded-full"`.
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "animate-shimmer rounded-md bg-gradient-to-r from-muted via-muted/60 to-muted bg-[length:200%_100%]",
        className
      )}
      {...props}
    />
  )
)
Skeleton.displayName = "Skeleton"

export { Skeleton }

\\n
### Component: Slider
\	sx
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "../../lib/utils"

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {}

/**
 * @description
 * Controle de input para valores numéricos contínuos em um intervalo definido.
 * 
 * **REGRAS PARA A IA:**
 * - Passe `min`, `max` e `step` para controlar o comportamento do cursor.
 * - Use para ajustes analógicos como volumes, configurações ou quantias onde a precisão exata do número não é tão crítica, mas sim a escala.
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }

\\n
### Component: Sonner
\	sx
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  // Num cenário real de Next.js/React global, isso pegaria o tema (light/dark) do context:
  const theme = "light" 

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }

\\n
### Component: Switch
\	sx
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "../../lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input hover:data-[state=checked]:bg-primary/90 hover:data-[state=unchecked]:bg-input/80",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-all duration-200 ease-out data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 data-[state=checked]:shadow-primary/30 data-[state=checked]:shadow-lg"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

/**
 * @description
 * Controle alternativo entre dois estados (ligado/desligado) com Radix UI.
 * 
 * **REGRAS PARA A IA:**
 * - Use para alternar configurações ou estados binários de ativação imediata.
 * - Este componente suporta estado não-controlado (defaultChecked) ou controlado (checked / onCheckedChange).
 */
export { Switch }

\\n
### Component: Table
\	sx
import * as React from "react"
import { cn } from "../../lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-body-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-body-sm text-muted-foreground", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

/**
 * @description
 * Tabela de dados responsiva.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre envolva linhas em `<TableHeader>` e `<TableBody>`.
 * - Use `<TableHead>` para os cabeçalhos das colunas, `<TableCell>` para os dados.
 * - Para exibir o total no fim, use `<TableFooter>`.
 */
export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

\\n
### Component: Tabs
\	sx
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "../../lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground relative",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-1.5 text-label-md ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:relative hover:text-foreground z-10",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:animate-fade-in-up",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

/**
 * @description
 * Controle de navegação em abas para alternar blocos de conteúdo no mesmo nível de página.
 * 
 * **REGRAS PARA A IA:**
 * - A estrutura deve ser `<Tabs><TabsList><TabsTrigger value="1" /></TabsList><TabsContent value="1">...</TabsContent></Tabs>`.
 * - Não use Tabs para navegação global entre páginas do site (use NavigationMenu ou Links).
 * - Certifique-se que os valores (`value`) batem exatamente entre os Triggers e os Contents.
 */
export { Tabs, TabsList, TabsTrigger, TabsContent }

\\n
### Component: Textarea
\	sx
import * as React from "react"
import { cn } from "../../lib/utils"
import { AlertCircle } from "lucide-react"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Se true, marca a textarea visualmente com erro (borda vermelha e icone) */
  hasError?: boolean
}

/**
 * @description
 * Campo de entrada para textos longos (multiline).
 * 
 * **REGRAS PARA A IA:**
 * - Use para biografias, descrições longas ou mensagens.
 * - Sempre que o campo falhar em validação de formulário, use a prop `hasError={true}`.
 * - Evite usar `resize-none` a menos que seja explicitamente solicitado pelo design.
 */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError = false, ...props }, ref) => {
    
    if (hasError) {
      return (
        <div className="relative w-full">
          <textarea
            className={cn(
              "flex min-min-h-16 w-full rounded-md border bg-transparent px-3 py-2 pr-9 text-body-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
              "border-destructive ring-destructive focus-visible:ring-destructive",
              className
            )}
            ref={ref}
            {...props}
          />
          <div className="absolute right-3 top-3 pointer-events-none">
            <AlertCircle className="h-4 w-4 text-destructive" />
          </div>
        </div>
      )
    }

    return (
      <textarea
        className={cn(
          "flex min-min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-body-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }

\\n
### Component: Toast
\	sx
import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "../../lib/utils"

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-full max-w-md gap-2",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all duration-300 ease-out data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full data-[state=open]:sm:scale-in-95 data-[state=open]:sm:animate-scale-in",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root>,
    VariantProps<typeof toastVariants> {}

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  ToastProps
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-label-md ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-destructive-300 group-[.destructive]:hover:text-destructive-50 group-[.destructive]:focus:ring-destructive-400 group-[.destructive]:focus:ring-offset-destructive-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-label-md font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-body-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

/**
 * @description
 * Notificação flutuante de canto que desaparece após segundos.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre envolva a aplicação raiz com um `ToastProvider` e instancie um `<ToastViewport />` na raiz.
 * - Este componente serve como molde visual. Ele deve ser manipulado via gancho (hook) como `useToast` ou instanciado com o componente `Toaster`.
 */
export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}

\\n
### Component: Toggle
\	sx
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-label-md ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {}

/**
 * @description
 * Botão que alterna entre o estado ativado e desativado.
 * 
 * **REGRAS PARA A IA:**
 * - Use Toggle para configurações textuais (ex: Negrito, Itálico) como uma Toolbar.
 * - Não confunda com o Switch. O Toggle se parece com um botão visual, enquanto o Switch é literalmente um interruptor físico.
 */
const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }

\\n
### Component: Tooltip
\	sx
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "../../lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const Tooltip = TooltipPrimitive.Root

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-label-xs text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      {children}
      <TooltipPrimitive.Arrow className="fill-popover" />
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

/**
 * @description
 * Balão flutuante que exibe informações extras no evento Hover.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre que for ocultar um rótulo em prol do minimalismo visual (ex: Botões apenas com ícones), utilize o `<Tooltip>` para revelar o nome do botão no mouse-over.
 * - Toda a árvore de tooltips deve ser encapsulada em um `TooltipProvider` (normalmente no Layout global).
 * - A estrutura é: `<Tooltip><TooltipTrigger>Icon</TooltipTrigger><TooltipContent>Label</TooltipContent></Tooltip>`.
 */
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }

\\n
## 5. Blocks Source Code (Complex Layouts)
Below is the exact source code for the complex blocks. Use this to understand the props they accept and how they compose the base components.

### Block: ActivityTimeline
\	sx
import * as React from "react"
import { cn } from "../../lib/utils"
import { Check, Circle } from "lucide-react"

export interface TimelineItemProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode
  description?: React.ReactNode
  time?: React.ReactNode
  icon?: React.ReactNode
  isLast?: boolean
  isActive?: boolean
  isDone?: boolean
}

export const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  (
    {
      className,
      title,
      description,
      time,
      icon,
      isLast = false,
      isActive = false,
      isDone = false,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn("relative flex gap-4 pb-8", className)} {...props}>
        {/* Linha vertical que conecta os itens */}
        {!isLast && (
          <div className="absolute left-[19px] top-8 h-[calc(100%-24px)] w-px bg-border" />
        )}

        {/* Ícone/Círculo */}
        <div className="relative mt-1 shrink-0">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border-2 bg-background",
              isActive ? "border-primary text-primary" : "border-muted text-muted-foreground",
              isDone && "border-primary bg-primary text-primary-foreground"
            )}
          >
            {icon ? (
              icon
            ) : isDone ? (
              <Check className="h-5 w-5" />
            ) : (
              <Circle className={cn("h-3 w-3", isActive && "fill-current")} />
            )}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col pt-1 w-full gap-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
            <h4
              className={cn(
                "text-label-md leading-none",
                isActive || isDone ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {title}
            </h4>
            {time && (
              <time className="text-body-xs text-muted-foreground shrink-0 tabular-nums">
                {time}
              </time>
            )}
          </div>
          {description && (
            <p className="text-body-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </div>
    )
  }
)
TimelineItem.displayName = "TimelineItem"

export const ActivityTimeline = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const items = React.Children.toArray(children)
  return (
    <div ref={ref} className={cn("space-y-0", className)} {...props}>
      {items.map((child, index) => {
        if (!React.isValidElement(child)) return child
        return React.cloneElement(child, {
          ...child.props,
          isLast: index === items.length - 1,
        })
      })}
    </div>
  )
})
ActivityTimeline.displayName = "ActivityTimeline"

\\n
### Block: AdvancedFilter
\	sx
import * as React from "react"
import { PlusCircle, Filter, X } from "lucide-react"

import { Button } from "../shadcn/Button"
import { Badge } from "../shadcn/Badge"
import { Separator } from "../shadcn/Separator"
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/Popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "../shadcn/Command"

export interface FilterOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface FilterCategory {
  title: string
  options: FilterOption[]
}

export interface AdvancedFilterProps {
  categories: FilterCategory[]
  selectedValues?: Record<string, string[]> // { categoryTitle: [values] }
  onFilterChange?: (categoryTitle: string, value: string, checked: boolean) => void
  onClearFilters?: () => void
  title?: string
}

export function AdvancedFilter({
  categories = [],
  selectedValues = {},
  onFilterChange,
  onClearFilters,
  title = "Filtros",
}: AdvancedFilterProps) {
  const activeCount = Object.values(selectedValues).reduce((acc, vals) => acc + vals.length, 0)

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 border-dashed">
            <Filter className="mr-2 h-4 w-4" />
            {title}
            {activeCount > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge variant="soft" color="neutral" className="rounded-sm px-1 font-normal lg:hidden">
                  {activeCount}
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {activeCount > 2 ? (
                    <Badge variant="soft" color="neutral" className="rounded-sm px-1 font-normal">
                      {activeCount} ativos
                    </Badge>
                  ) : (
                    Object.entries(selectedValues).flatMap(([cat, vals]) =>
                      vals.map(val => (
                        <Badge key={val} variant="soft" color="neutral" className="rounded-sm px-1 font-normal">
                          {val}
                        </Badge>
                      ))
                    )
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <Command>
            <CommandInput placeholder={title} />
            <CommandList>
              <CommandEmpty>Nenhum resultado.</CommandEmpty>
              {categories.map((category) => (
                <CommandGroup key={category.title} heading={category.title}>
                  {category.options.map((option) => {
                    const isSelected = selectedValues[category.title]?.includes(option.value)
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => onFilterChange?.(category.title, option.value, !isSelected)}
                      >
                        <div
                          className={`mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50 [&_svg]:invisible"
                          }`}
                        >
                          <Check className="h-4 w-4" />
                        </div>
                        {option.icon && (
                          <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{option.label}</span>
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              ))}
              {activeCount > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={onClearFilters}
                      className="justify-center text-center"
                    >
                      Limpar filtros
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Render Active Badges fora do botão */}
      {activeCount > 0 && (
        <div className="flex gap-2">
          {Object.entries(selectedValues).map(([categoryTitle, values]) => {
            if (values.length === 0) return null
            const category = categories.find(c => c.title === categoryTitle)
            
            return values.map(val => {
              const option = category?.options.find(o => o.value === val)
              return (
                <Badge key={`${categoryTitle}-${val}`} variant="soft" color="neutral" className="h-8 gap-1">
                  <span className="text-muted-foreground mr-1">{categoryTitle}:</span>
                  {option?.label || val}
                  <button
                    className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onClick={() => onFilterChange?.(categoryTitle, val, false)}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </Badge>
              )
            })
          })}
        </div>
      )}
    </div>
  )
}

function Check({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

\\n
### Block: Animation
\	sx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const animationVariants = cva("", {
  variants: {
    animate: {
      none: "animate-none",
      spin: "animate-spin",
      pulse: "animate-pulse",
      bounce: "animate-bounce",
      "fade-in": "animate-fade-in",
      "fade-in-up": "animate-fade-in-up",
      "fade-in-down": "animate-fade-in-down",
      "scale-in": "animate-scale-in",
      "slide-in-left": "animate-slide-in-left",
      "slide-in-right": "animate-slide-in-right",
      "slide-in-up": "animate-slide-in-up",
      "slide-in-down": "animate-slide-in-down",
      "accordion-down": "animate-accordion-down",
      "accordion-up": "animate-accordion-up",
      "progress-indeterminate": "animate-progress-indeterminate",
      "shimmer": "animate-shimmer",
      "ping": "animate-ping",
      "ripple": "animate-ripple",
    },
    duration: {
      "0": "duration-0",
      "75": "duration-75",
      "100": "duration-100",
      "150": "duration-150",
      "200": "duration-200",
      "300": "duration-300",
      "500": "duration-500",
      "700": "duration-700",
      "1000": "duration-1000",
    },
    easing: {
      linear: "ease-linear",
      in: "ease-in",
      out: "ease-out",
      "in-out": "ease-in-out",
      "spring": "ease-spring",
    },
    delay: {
      "0": "delay-0",
      "75": "delay-75",
      "100": "delay-100",
      "150": "delay-150",
      "200": "delay-200",
      "300": "delay-300",
      "500": "delay-500",
    },
  },
  defaultVariants: {
    animate: "none",
    duration: "300",
    easing: "out",
    delay: "0",
  },
})

export interface AnimationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof animationVariants> {
  repeat?: "once" | "infinite" | number
}

export function Animation({
  className,
  animate,
  duration,
  easing,
  delay,
  repeat,
  children,
  ...props
}: AnimationProps) {
  const repeatClass = React.useMemo(() => {
    if (repeat === "once" || repeat === undefined) return ""
    if (repeat === "infinite") return "repeat-infinite"
    return `repeat-${repeat}`
  }, [repeat])

  return (
    <div
      className={cn(
        animationVariants({ animate, duration, easing, delay }),
        repeatClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface StaggeredListProps extends React.HTMLAttributes<HTMLDivElement> {
  staggerDelay?: number
  initialDelay?: number
  animate?: boolean
}

export function StaggeredList({
  className,
  staggerDelay = 50,
  initialDelay = 0,
  animate = true,
  children,
  ...props
}: StaggeredListProps) {
  const childrenArray = React.Children.toArray(children)

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={cn(
            animate && "animate-fade-in-up",
            animate && "origin-top"
          )}
          style={
            animate
              ? {
                  animationDelay: `${initialDelay + index * staggerDelay}ms`,
                  animationFillMode: "both",
                }
              : undefined
          }
        >
          {child}
        </div>
      ))}
    </div>
  )
}

export interface AnimatedCounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  from?: number
  to: number
  duration?: number
  easing?: "linear" | "ease-out" | "ease-in"
  prefix?: string
  suffix?: string
  decimals?: number
}

export function AnimatedCounter({
  className,
  from = 0,
  to,
  duration = 1000,
  easing = "ease-out",
  prefix = "",
  suffix = "",
  decimals = 0,
  ...props
}: AnimatedCounterProps) {
  const [value, setValue] = React.useState(from)
  const rafRef = React.useRef<number>()

  React.useEffect(() => {
    const startTime = performance.now()
    const startValue = from

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
    const linear = (t: number) => t

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      const easedProgress = easing === "linear" ? linear(progress) : easeOut(progress)
      const currentValue = startValue + (to - startValue) * easedProgress

      setValue(currentValue)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [from, to, duration, easing])

  return (
    <span className={cn("tabular-nums", className)} {...props}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  )
}

\\n
### Block: CreationWizard
\	sx
import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/Dialog"
import { Button } from "../shadcn/Button"
import { Stepper } from "./Stepper"
import { ScrollArea } from "../shadcn/ScrollArea"

export interface CreationWizardProps {
  title: string
  description?: string
  trigger?: React.ReactNode
  steps: { title: string; description?: string }[]
  currentStep: number
  onNext: () => void
  onPrevious: () => void
  onFinish: () => void
  isNextDisabled?: boolean
  isFinishDisabled?: boolean
  children: React.ReactNode // Conteúdo dinâmico do formulário atual
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CreationWizard({
  title,
  description,
  trigger,
  steps,
  currentStep,
  onNext,
  onPrevious,
  onFinish,
  isNextDisabled = false,
  isFinishDisabled = false,
  children,
  open,
  onOpenChange,
}: CreationWizardProps) {
  const isLastStep = currentStep === steps.length - 1

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-6">
          <Stepper
            steps={steps}
            currentStep={currentStep}
            orientation="horizontal"
          />
        </div>

        <ScrollArea className="h-[50vh]">
          <div className="min-h-64 pr-2 pb-4">
            {children}
          </div>
        </ScrollArea>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentStep === 0}
          >
            Voltar
          </Button>

          {isLastStep ? (
            <Button onClick={onFinish} disabled={isFinishDisabled}>
              Finalizar
            </Button>
          ) : (
            <Button onClick={onNext} disabled={isNextDisabled}>
              Avançar
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

\\n
### Block: DashboardCharts
\	sx
import * as React from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
  Cell
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn/Card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../shadcn/Chart"

// -- DADOS MOCKADOS --
const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Fev", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Abr", desktop: 73, mobile: 190 },
  { month: "Mai", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const pieData = [
  { browser: "chrome", visitors: 275, fill: "#2563eb" },
  { browser: "safari", visitors: 200, fill: "#10b981" },
  { browser: "firefox", visitors: 187, fill: "#f59e0b" },
  { browser: "edge", visitors: 173, fill: "#8b5cf6" },
  { browser: "other", visitors: 90, fill: "#ec4899" },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb", // Azul
  },
  mobile: {
    label: "Mobile",
    color: "#10b981", // Verde
  },
} satisfies ChartConfig

const pieConfig = {
  visitors: { label: "Visitantes" },
  chrome: { label: "Chrome" },
  safari: { label: "Safari" },
  firefox: { label: "Firefox" },
  edge: { label: "Edge" },
  other: { label: "Outros" },
} satisfies ChartConfig

/**
 * @description
 * Bloco de exemplo exibindo vários tipos de Gráficos usando a biblioteca Recharts e o container do Shadcn.
 * 
 * **REGRAS PARA A IA:**
 * - Sempre que precisar de um gráfico (Pizza, Linha, Barra), baseie-se nesta estrutura.
 * - Use o `ChartContainer` com uma `config` para injetar cores compatíveis com o tema.
 */
export function DashboardCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
      
      {/* 1. Bar Chart (Vertical) */}
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Barras</CardTitle>
          <CardDescription>Acessos Jan - Jun 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent payload={[]} />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 1.5. Bar Chart (Horizontal) */}
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Barras Horizontal</CardTitle>
          <CardDescription>Acessos Jan - Jun 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData} layout="vertical" margin={{ left: -20 }}>
              <CartesianGrid horizontal={false} vertical={true} />
              <XAxis type="number" hide />
              <YAxis
                dataKey="month"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent payload={[]} />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 2. Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Linhas</CardTitle>
          <CardDescription>Tendência de Crescimento</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="desktop"
                type="monotone"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mobile"
                type="monotone"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 3. Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Gráfico de Área (Stacked)</CardTitle>
          <CardDescription>Volume Cumulativo</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="mobile"
                type="natural"
                fill="var(--color-mobile)"
                fillOpacity={0.4}
                stroke="var(--color-mobile)"
                stackId="a"
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 4. Donut/Pie Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Gráfico de Rosca (Donut)</CardTitle>
          <CardDescription>Distribuição de Navegadores</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={pieConfig}
            className="mx-auto aspect-square max-h-64"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={pieData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

    </div>
  )
}

\\n
### Block: DashboardMetrics
\	sx
import * as React from "react"
import { DollarSign, Users, CreditCard, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../shadcn/Card"

/**
 * @description
 * Bloco de painel (Dashboard) exibindo cartões de estatísticas rápidas.
 * 
 * **REGRAS PARA A IA:**
 * - Use este bloco na página inicial de aplicações SaaS, CRMs ou Painéis de Controle.
 * - É um componente de demonstração estrutural. Na prática, ele deve aceitar as métricas via Props em vez de estarem "hardcoded".
 */
export function DashboardMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-label-md">Receita Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-h3">R$ 45.231,89</div>
          <p className="text-body-xs text-muted-foreground">
            +20.1% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-label-md">Assinaturas</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-h3">+2350</div>
          <p className="text-body-xs text-muted-foreground">
            +180.1% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-label-md">Vendas Realizadas</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-h3">+12,234</div>
          <p className="text-body-xs text-muted-foreground">
            +19% em relação ao mês anterior
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-label-md">Ativos Agora</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-h3">+573</div>
          <p className="text-body-xs text-muted-foreground">
            +201 deste a última hora
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

\\n
### Block: DataCard
\	sx
import * as React from "react"
import { MoreVertical } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../shadcn/Card"
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/Avatar"
import { Badge } from "../shadcn/Badge"
import { Button } from "../shadcn/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shadcn/DropdownMenu"

export interface DataCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  avatarUrl?: string
  initials?: string
  status?: {
    label: string
    variant?: "solid" | "soft" | "outline"
    color?: "neutral" | "primary" | "success" | "warning" | "destructive" | "info" | "indigo" | "purple" | "pink"
  }
  tags?: string[]
  metadata?: {
    label: string
    value: string
  }[]
  onEdit?: () => void
  onDelete?: () => void
}

export function DataCard({
  title,
  subtitle,
  avatarUrl,
  initials,
  status,
  tags = [],
  metadata = [],
  onEdit,
  onDelete,
  className,
  ...props
}: DataCardProps) {
  return (
    <Card className={className} {...props}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div className="flex gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl} alt={title} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-body-lg">{title}</CardTitle>
            {subtitle && (
              <CardDescription>{subtitle}</CardDescription>
            )}
            {status && (
              <div className="mt-1">
                <Badge variant={status.variant || "solid"} color={status.color || "primary"}>
                  {status.label}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {(onEdit || onDelete) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onEdit && <DropdownMenuItem onClick={onEdit}>Editar</DropdownMenuItem>}
              {onDelete && (
                <DropdownMenuItem className="text-destructive focus:bg-destructive/10" onClick={onDelete}>
                  Excluir
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      
      {(tags.length > 0 || metadata.length > 0) && (
        <CardContent className="grid gap-4">
          {metadata.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-body-sm">
              {metadata.map((item, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <dt className="text-muted-foreground">{item.label}</dt>
                  <dd className="font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
          )}
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="soft" color="neutral" className="font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}

\\n
### Block: DataTable
\	sx
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { ChevronDown, Search, SlidersHorizontal } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shadcn/Table"
import { Button } from "../shadcn/Button"
import { Input } from "../shadcn/Input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../shadcn/DropdownMenu"

interface DataTableProps<TData, TValue> {
  /** As colunas configuradas via TanStack Table */
  columns: ColumnDef<TData, TValue>[]
  /** O array de dados que preencherá a tabela */
  data: TData[]
  /** A chave do campo (ex: 'email') que será usado para a busca global. Se não informado, o input de busca é escondido. */
  searchKey?: string
  /** Placeholder para o input de busca. Padrão: "Filtrar resultados..." */
  searchPlaceholder?: string
}

/**
 * @description
 * Bloco de Tabela de Dados Completa (Data Grid).
 * Motor de dados: @tanstack/react-table.
 * 
 * Funcionalidades inclusas:
 * - Ordenação de colunas (Sorting)
 * - Filtro de texto (Search/Filtering)
 * - Paginação de resultados (Pagination)
 * - Ocultar/Mostrar colunas (Visibility)
 * 
 * **REGRAS PARA A IA:**
 * - Use este componente sempre que o sistema exigir uma "Listagem" avançada de itens (ex: Painel Admin, Lista de Usuários).
 * - Defina as colunas (`columns`) e seus cabeçalhos fora do componente de renderização para evitar recálculos desnecessários.
 * - Para habilitar busca, passe o `searchKey` correspondente à propriedade dos dados (ex: `searchKey="email"`).
 */
export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Filtrar resultados...",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full space-y-4">
      {/* Header Toolbar */}
      <div className="flex items-center justify-between">
        {searchKey && (
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            leftIcon={<Search className="h-4 w-4" />}
          />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Colunas
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {typeof column.columnDef.header === 'string' 
                      ? column.columnDef.header 
                      : column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table Content */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination & Row Selection Info */}
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-body-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}

\\n
### Block: DatePicker
\	sx
import * as React from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../shadcn/Button"
import { Calendar } from "../shadcn/Calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../shadcn/Popover"

export function DatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-72 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  )
}

\\n
### Block: DetailDrawer
\	sx
import * as React from "react"
import { Copy, ExternalLink, FileText, History, Info } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../shadcn/Sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shadcn/Tabs"
import { ScrollArea } from "../shadcn/ScrollArea"
import { Badge } from "../shadcn/Badge"
import { Button } from "../shadcn/Button"
import { Separator } from "../shadcn/Separator"

export interface DetailDrawerProps {
  title: string
  subtitle?: string
  status?: string
  id?: string
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  detailsTabContent?: React.ReactNode
  historyTabContent?: React.ReactNode
  documentsTabContent?: React.ReactNode
  actions?: React.ReactNode
}

export function DetailDrawer({
  title,
  subtitle,
  status,
  id,
  trigger,
  open,
  onOpenChange,
  detailsTabContent,
  historyTabContent,
  documentsTabContent,
  actions,
}: DetailDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      
      <SheetContent className="sm:max-w-xl flex flex-col p-0 w-full">
        {/* Header Fixo */}
        <div className="px-6 py-6 pb-4">
          <SheetHeader className="text-left space-y-0">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-h4 flex items-center gap-2">
                {title}
                {status && <Badge variant="soft" color="neutral">{status}</Badge>}
              </SheetTitle>
              {actions && (
                <div className="flex items-center gap-2 pr-6">
                  {actions}
                </div>
              )}
            </div>
            {subtitle && <SheetDescription className="mt-1">{subtitle}</SheetDescription>}
            
            {id && (
              <div className="flex items-center gap-2 mt-4 text-body-xs text-muted-foreground">
                <span className="font-mono bg-muted px-1.5 py-0.5 rounded">{id}</span>
                <button className="hover:text-foreground transition-colors flex items-center gap-1" onClick={() => navigator.clipboard.writeText(id)}>
                  <Copy className="h-3 w-3" />
                  Copiar ID
                </button>
              </div>
            )}
          </SheetHeader>
        </div>

        <Separator />

        {/* Tabs e Conteúdo Scrollável */}
        <Tabs defaultValue="details" className="flex flex-col flex-1 overflow-hidden">
          <div className="px-6 pt-2">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-b rounded-none">
              <TabsTrigger 
                value="details" 
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-4"
              >
                <Info className="h-4 w-4 mr-2" />
                Detalhes
              </TabsTrigger>
              <TabsTrigger 
                value="documents"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-4"
              >
                <FileText className="h-4 w-4 mr-2" />
                Documentos
              </TabsTrigger>
              <TabsTrigger 
                value="history"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-2 px-4"
              >
                <History className="h-4 w-4 mr-2" />
                Histórico
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6">
              <TabsContent value="details" className="m-0 focus-visible:outline-none">
                {detailsTabContent}
              </TabsContent>
              <TabsContent value="documents" className="m-0 focus-visible:outline-none">
                {documentsTabContent}
              </TabsContent>
              <TabsContent value="history" className="m-0 focus-visible:outline-none">
                {historyTabContent}
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}

\\n
### Block: EmptyState
\	sx
import * as React from "react"
import { FileQuestion, FolderX, ServerCrash } from "lucide-react"
import { Button } from "../shadcn/Button"

interface EmptyStateProps {
  /** Título principal do estado vazio */
  title: string
  /** Texto explicativo abaixo do título */
  description: string
  /** Ícone central. Padrão: FileQuestion */
  icon?: React.ReactNode
  /** Rótulo do botão de ação. Se omitido, o botão não será renderizado. */
  actionLabel?: string
  /** Função disparada ao clicar no botão de ação */
  onAction?: () => void
}

/**
 * @description
 * Bloco de estado vazio (Empty State) para ser usado quando não houver dados.
 * 
 * **REGRAS PARA A IA:**
 * - Renderize este componente quando um fetch de API retornar 0 itens ou quando uma busca de DataTable não encontrar resultados.
 * - Use para orientar o usuário (ex: "Criar o primeiro projeto").
 */
export function EmptyState({
  title,
  description,
  icon = <FileQuestion className="h-10 w-10 text-muted-foreground" />,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex max-w-full max-w-md flex-col items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted/50 mb-4">
          {icon}
        </div>
        <h3 className="mt-4 text-h5">{title}</h3>
        <p className="mb-4 mt-2 text-body-sm text-muted-foreground">
          {description}
        </p>
        {actionLabel && (
          <Button onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

\\n
### Block: FileUploader
\	sx
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
          <p className="mb-2 text-body-sm text-foreground font-semibold">
            <span className="text-primary hover:underline">Clique para selecionar</span> ou arraste e solte
          </p>
          <p className="text-body-xs text-muted-foreground">
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
                  <p className="text-label-md truncate text-foreground">
                    {fileObj.file.name}
                  </p>
                  <span className="text-body-xs text-muted-foreground shrink-0">
                    {formatFileSize(fileObj.file.size)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={fileObj.progress} className="h-1.5" />
                  {fileObj.status === "success" && <CheckCircle className="w-4 h-4 text-success-500 shrink-0" />}
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

\\n
### Block: GlobalBanner
\	sx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../shadcn/Button"

const bannerVariants = cva(
  "relative flex w-full items-center justify-between gap-4 px-4 py-3 sm:px-6 md:px-8",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        info: "bg-info-500 text-info-foreground",
        warning: "bg-warning-500 text-warning-foreground",
        destructive: "bg-destructive-500 text-destructive-foreground",
        success: "bg-success-500 text-success-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface GlobalBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  onClose?: () => void
  action?: React.ReactNode
}

const GlobalBanner = React.forwardRef<HTMLDivElement, GlobalBannerProps>(
  ({ className, variant, children, onClose, action, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true)

    if (!isVisible) return null

    return (
      <div
        ref={ref}
        className={cn(bannerVariants({ variant }), className)}
        {...props}
      >
        <div className="flex flex-1 items-center justify-center gap-2 text-label-md">
          {children}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {action}
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-6 w-6 rounded-full hover:bg-black/10",
                variant === "default" && "text-primary-foreground hover:text-primary-foreground",
                variant === "destructive" && "text-destructive-foreground hover:text-destructive-foreground"
              )}
              onClick={() => {
                setIsVisible(false)
                onClose()
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Fechar banner</span>
            </Button>
          )}
        </div>
      </div>
    )
  }
)
GlobalBanner.displayName = "GlobalBanner"

export { GlobalBanner, bannerVariants }

\\n
### Block: Kanban
\	sx
import * as React from "react"
import { MoreHorizontal, Plus, Calendar } from "lucide-react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { cn } from "../../lib/utils"

import { Card, CardContent, CardHeader } from "../shadcn/Card"
import { Badge } from "../shadcn/Badge"
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/Avatar"
import { Button } from "../shadcn/Button"
import { ScrollArea } from "../shadcn/ScrollArea"

export interface KanbanTask {
  id: string
  title: string
  tag?: { label: string; variant?: "solid" | "soft" | "outline"; color?: "neutral" | "primary" | "success" | "warning" | "destructive" | "info" | "indigo" | "purple" | "pink" }
  assignee?: { name: string; avatarUrl?: string }
  dueDate?: string
}

export interface KanbanColumnData {
  id: string
  title: string
  tasks: KanbanTask[]
}

export interface KanbanBoardProps {
  columns: KanbanColumnData[]
  onDragEnd?: (result: DropResult) => void
  onAddTask?: (columnId: string) => void
  onTaskClick?: (task: KanbanTask, columnId: string) => void
  className?: string
}

export function KanbanBoard({ columns, onDragEnd, onAddTask, onTaskClick, className }: KanbanBoardProps) {
  // If no onDragEnd is provided, the board won't visually update tasks across columns
  // since the parent should handle the state. We expose it so the Story can hold state.
  return (
    <DragDropContext onDragEnd={onDragEnd || (() => {})}>
      <ScrollArea className="h-full w-full">
        <div className={cn("flex h-full w-max gap-4 p-4", className)}>
          {columns.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            onAddTask={onAddTask ? () => onAddTask(col.id) : undefined}
            onTaskClick={onTaskClick ? (task) => onTaskClick(task, col.id) : undefined}
          />
        ))}
        </div>
      </ScrollArea>
    </DragDropContext>
  )
}

function KanbanColumn({ column, onAddTask, onTaskClick }: { column: KanbanColumnData; onAddTask?: () => void; onTaskClick?: (task: KanbanTask) => void }) {
  return (
    <div className="flex h-full w-80 flex-col shrink-0 rounded-lg bg-muted/40">
      <div className="flex items-center justify-between p-3 font-medium text-body-sm text-foreground">
        <div className="flex items-center gap-2">
          <span>{column.title}</span>
          <Badge variant="soft" color="neutral" className="px-1.5 py-0">
            {column.tasks.length}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          {onAddTask && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onAddTask}>
              <Plus className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <ScrollArea className="flex-1">
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={cn(
                "flex flex-col gap-3 p-3 transition-colors",
                snapshot.isDraggingOver ? "bg-muted/60 rounded-b-lg" : ""
              )}
            >
              {column.tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        opacity: snapshot.isDragging ? 0.8 : 1,
                      }}
                    >
                      <KanbanCard task={task} onClick={onTaskClick ? () => onTaskClick(task) : undefined} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </ScrollArea>
        )}
      </Droppable>
    </div>
  )
}

export function KanbanCard({ task, onClick }: { task: KanbanTask; onClick?: () => void }) {
  return (
    <Card 
      className="cursor-grab active:cursor-grabbing hover:ring-1 hover:ring-primary/50 transition-all shadow-sm"
      onClick={onClick}
    >
      <CardHeader className="p-3 pb-0">
        {task.tag && (
          <div className="mb-2">
            <Badge variant={task.tag.variant || "soft"} color={task.tag.color || "neutral"} className="text-[10px] px-1.5 py-0 h-5">
              {task.tag.label}
            </Badge>
          </div>
        )}
        <h4 className="text-label-md leading-tight">{task.title}</h4>
      </CardHeader>
      <CardContent className="p-3 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-muted-foreground text-body-xs">
          {task.dueDate && (
            <>
              <Calendar className="h-3 w-3" />
              <span>{task.dueDate}</span>
            </>
          )}
        </div>
        {task.assignee && (
          <Avatar className="h-6 w-6">
            <AvatarImage src={task.assignee.avatarUrl} alt={task.assignee.name} />
            <AvatarFallback className="text-[10px]">
              {task.assignee.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </CardContent>
    </Card>
  )
}

\\n
### Block: LoginForm
\	sx
import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../shadcn/Card"
import { Input } from "../shadcn/Input"
import { Label } from "../shadcn/Label"
import { Button } from "../shadcn/Button"

/**
 * Propriedades para o bloco de Login.
 * A IA pode preencher isso para forçar um estado de loading, erro, etc.
 */
export interface LoginFormProps {
  /** Se o formulário está aguardando a requisição do servidor. */
  isLoading?: boolean
  /** Mensagem de erro global caso a autenticação falhe. */
  errorMessage?: string
  /** Função disparada ao submeter o formulário. A IA deve usar isso para Mocks. */
  onSubmit?: (e: React.FormEvent) => void
}

/**
 * @description
 * Bloco composto: Formulário de Login (LoginForm).
 * 
 * **Regras para a IA:**
 * - Sempre use esse bloco inteiro caso precise de uma tela de login no projeto.
 * - Nunca tente reconstruir os inputs "na mão", use essa estrutura pré-fabricada do `Card`.
 * - Este bloco já implementa as melhores práticas de espaçamento e UX da OneBox.
 */
export function LoginForm({ isLoading = false, errorMessage, onSubmit }: LoginFormProps) {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-h3 tracking-tight">Login na OneBox</CardTitle>
        <CardDescription>Insira seu email e senha abaixo para acessar sua conta</CardDescription>
      </CardHeader>
      
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(e);
      }}>
        <CardContent className="space-y-4">
          {errorMessage && (
            <div className="p-3 text-body-sm text-destructive-foreground bg-destructive/90 rounded-md">
              {errorMessage}
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@exemplo.com" 
              required 
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <a href="#" className="text-label-md text-primary hover:underline" tabIndex={-1}>
                Esqueceu a senha?
              </a>
            </div>
            <Input 
              id="password" 
              type="password" 
              required 
              disabled={isLoading}
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full" 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

\\n
### Block: MarketingBanner
\	sx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Button } from "../shadcn/Button"
import { Badge } from "../shadcn/Badge"
import { X } from "lucide-react"

const marketingBannerVariants = cva(
  "relative overflow-hidden flex flex-col items-start gap-4 transition-all duration-300",
  {
    variants: {
      variant: {
        hero: "bg-primary text-primary-foreground p-8 md:p-12 md:items-center text-center rounded-xl",
        split: "bg-card text-card-foreground border md:flex-row md:justify-between p-6 md:p-8 rounded-xl shadow-sm",
        gradient: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8 md:p-12 rounded-xl shadow-lg",
        floating: "fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md bg-foreground text-background p-6 rounded-xl shadow-2xl z-50",
      },
    },
    defaultVariants: {
      variant: "split",
    },
  }
)

export interface MarketingBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof marketingBannerVariants> {
  title: string
  description: string
  badge?: string
  actionText?: string
  onAction?: () => void
  secondaryActionText?: string
  onSecondaryAction?: () => void
  imageSlot?: React.ReactNode
  onDismiss?: () => void
  isDismissible?: boolean
}

export function MarketingBanner({
  className,
  variant,
  title,
  description,
  badge,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
  imageSlot,
  onDismiss,
  isDismissible = false,
  ...props
}: MarketingBannerProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  if (!isVisible) return null

  const handleDismiss = () => {
    setIsVisible(false)
    if (onDismiss) onDismiss()
  }

  // Determine button variants based on banner variant for proper contrast
  const getPrimaryButtonVariant = (): "secondary" | "default" => {
    if (variant === "hero" || variant === "gradient") return "secondary"
    if (variant === "floating") return "default"
    return "default"
  }

  const getSecondaryButtonVariant = (): "outline" => {
    return "outline"
  }

  const getBadgeVariant = () => {
    if (variant === "hero" || variant === "gradient") return "solid"
    return "soft"
  }

  const getBadgeColor = () => {
    if (variant === "gradient") return "neutral"
    return "primary"
  }

  return (
    <div
      className={cn(marketingBannerVariants({ variant, className }))}
      {...props}
    >
      {isDismissible && (
        <button
          onClick={handleDismiss}
          className={cn(
            "absolute top-4 right-4 p-1 rounded-full opacity-70 hover:opacity-100 transition-opacity",
            variant === "floating" ? "text-background" : "text-current"
          )}
          aria-label="Dismiss banner"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className={cn("flex flex-col gap-3", variant === "hero" ? "items-center" : "items-start")}>
        {badge && (
          <Badge 
            variant={getBadgeVariant()} 
            color={getBadgeColor()} 
            className={cn(
              "mb-1",
              variant === "hero" ? "bg-white/20 hover:bg-white/30 text-white border-transparent" : "",
              variant === "gradient" ? "bg-white/20 hover:bg-white/30 text-white border-transparent" : ""
            )}
          >
            {badge}
          </Badge>
        )}
        
        <h2 className={cn(
          "text-h3 md:text-h2 font-bold tracking-tight",
          variant === "floating" && "text-h4"
        )}>
          {title}
        </h2>
        
        <p className={cn(
          "text-body-md md:text-body-lg opacity-90 max-w-2xl",
          variant === "floating" && "text-body-sm"
        )}>
          {description}
        </p>

        {(actionText || secondaryActionText) && (
          <div className={cn(
            "flex flex-wrap gap-3 mt-4",
            variant === "hero" && "justify-center"
          )}>
            {actionText && (
              <Button 
                variant={getPrimaryButtonVariant()} 
                onClick={onAction}
                className={cn(
                  variant === "floating" && "bg-primary text-primary-foreground hover:bg-primary/90",
                  variant === "gradient" && "bg-white text-indigo-600 hover:bg-neutral-100"
                )}
              >
                {actionText}
              </Button>
            )}
            
            {secondaryActionText && (
              <Button 
                variant={getSecondaryButtonVariant()} 
                onClick={onSecondaryAction}
                className={cn(
                  (variant === "hero" || variant === "gradient") && "bg-transparent border-white text-white hover:bg-white/10",
                  variant === "floating" && "bg-transparent border-neutral-600 text-background hover:bg-neutral-800"
                )}
              >
                {secondaryActionText}
              </Button>
            )}
          </div>
        )}
      </div>

      {imageSlot && variant === "split" && (
        <div className="hidden md:block w-1/3 shrink-0 ml-8">
          {imageSlot}
        </div>
      )}

      {/* Decorative elements for gradient variant */}
      {variant === "gradient" && !imageSlot && (
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl pointer-events-none" />
      )}
    </div>
  )
}

\\n
### Block: MetricGrid
\	sx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const metricGridVariants = cva("grid items-stretch", {
  variants: {
    columns: {
      "1": "grid-cols-1",
      "2": "grid-cols-1 sm:grid-cols-2",
      "3": "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
      "4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      "6": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-6",
      "12": "grid-cols-4 md:grid-cols-8 lg:grid-cols-12",
    },
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
    },
  },
  defaultVariants: {
    columns: "4",
    gap: "md",
  },
})

export interface MetricGridProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricGridVariants> {}

export function MetricGrid({
  className,
  columns,
  gap,
  children,
  ...props
}: MetricGridProps) {
  return (
    <div
      className={cn(metricGridVariants({ columns, gap, className }))}
      {...props}
    >
      {children}
    </div>
  )
}

const metricCardVariants = cva("flex flex-col", {
  variants: {
    span: {
      auto: "",
      full: "col-span-full",
      half: "col-span-1 sm:col-span-2",
      third: "col-span-1 sm:col-span-2 lg:col-span-4",
      quarter: "col-span-1 sm:col-span-2 lg:col-span-3",
      twothirds: "col-span-full lg:col-span-8",
      threequarters: "col-span-full lg:col-span-9",
    },
  },
  defaultVariants: {
    span: "auto",
  },
})

export interface MetricCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof metricCardVariants> {}

export function MetricCard({
  className,
  span,
  children,
  ...props
}: MetricCardProps) {
  return (
    <div
      className={cn(metricCardVariants({ span, className }))}
      {...props}
    >
      {children}
    </div>
  )
}

\\n
### Block: NotificationCenter
\	sx
import * as React from "react"
import { Bell, Check, Trash2, MailOpen } from "lucide-react"

import { Button } from "../shadcn/Button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../shadcn/Popover"
import { ScrollArea } from "../shadcn/ScrollArea"
import { Separator } from "../shadcn/Separator"
import { Badge } from "../shadcn/Badge"
import { cn } from "../../lib/utils"

export interface Notification {
  id: string
  title: string
  description: string
  time: string
  isRead: boolean
  category?: "system" | "message" | "alert" | "success"
}

export interface NotificationCenterProps {
  notifications: Notification[]
  onMarkAllAsRead?: () => void
  onClearAll?: () => void
  onNotificationClick?: (id: string) => void
}

export function NotificationCenter({
  notifications = [],
  onMarkAllAsRead,
  onClearAll,
  onNotificationClick,
}: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="solid" color="destructive" 
              className="absolute -top-1 -right-1 h-4 min-w-4 px-1 text-[10px] flex items-center justify-center p-0 rounded-full"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0" sideOffset={8}>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <h4 className="text-label-md font-semibold">Notificações</h4>
            {unreadCount > 0 && (
              <Badge variant="soft" color="neutral" className="h-5">
                {unreadCount} novas
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onMarkAllAsRead}
              title="Marcar todas como lidas"
            >
              <Check className="h-4 w-4" />
              <span className="sr-only">Marcar todas como lidas</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={onClearAll}
              title="Limpar todas"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Limpar todas</span>
            </Button>
          </div>
        </div>
        <Separator />
        <ScrollArea className="max-h-96">
          {notifications.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-8 text-center">
              <MailOpen className="h-8 w-8 text-muted-foreground/50 mb-3" />
              <p className="text-label-md">Nenhuma notificação</p>
              <p className="text-body-xs text-muted-foreground">
                Você está em dia com suas tarefas.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-1 p-2">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => onNotificationClick?.(notification.id)}
                  className={cn(
                    "flex flex-col gap-1 rounded-lg p-3 text-left transition-colors hover:bg-muted/50",
                    !notification.isRead && "bg-muted/30"
                  )}
                >
                  <div className="flex w-full justify-between items-start gap-2">
                    <span className="text-label-md leading-none">
                      {notification.title}
                    </span>
                    <span className="text-body-xs text-muted-foreground whitespace-nowrap shrink-0">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-body-xs text-muted-foreground line-clamp-2 mt-1">
                    {notification.description}
                  </p>
                  {!notification.isRead && (
                    <div className="mt-2 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-2">
              <Button variant="ghost" size="sm" className="w-full h-8 justify-center">
                Ver todas as notificações
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}

\\n
### Block: PageHeader
\	sx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const pageHeaderVariants = cva("flex flex-col gap-1", {
  variants: {
    align: {
      left: "items-start",
      center: "items-center text-center",
      right: "items-end text-right",
    },
  },
  defaultVariants: {
    align: "left",
  },
})

export interface PageHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderVariants> {
  title: string
  description?: string
  actions?: React.ReactNode
}

export function PageHeader({
  className,
  align,
  title,
  description,
  actions,
  ...props
}: PageHeaderProps) {
  return (
    <div
      className={cn(pageHeaderVariants({ align, className }))}
      {...props}
    >
      <div className="flex flex-row flex-wrap items-start justify-between gap-4 w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-h1 font-bold tracking-tight text-foreground">
            {title}
          </h1>
          {description && (
            <p className="text-body-md text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex flex-row items-center gap-3 shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}

\\n
### Block: PageLayout
\	sx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const pageLayoutVariants = cva("flex flex-col", {
  variants: {
    spacing: {
      tight: "gap-4",
      default: "gap-6",
      loose: "gap-8",
    },
    flush: {
      true: "px-0",
      false: "px-6 py-6",
    },
  },
  defaultVariants: {
    spacing: "default",
    flush: false,
  },
})

export interface PageLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageLayoutVariants> {}

export function PageLayout({
  className,
  spacing,
  flush,
  children,
  ...props
}: PageLayoutProps) {
  return (
    <div
      className={cn(pageLayoutVariants({ spacing, flush, className }))}
      {...props}
    >
      {children}
    </div>
  )
}

\\n
### Block: PricingCards
\	sx
import * as React from "react"
import { Check } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcn/Card"
import { Button } from "../shadcn/Button"
import { Badge } from "../shadcn/Badge"
import { Switch } from "../shadcn/Switch"
import { Label } from "../shadcn/Label"

export function PricingCards() {
  const [isAnnual, setIsAnnual] = React.useState(true)

  const plans = [
    {
      title: "Hobby",
      description: "Para projetos pessoais e experimentações.",
      priceMonthly: "$0",
      priceAnnually: "$0",
      features: [
        "1 Projeto ativo",
        "Acesso à comunidade",
        "10GB de Armazenamento",
        "Suporte via Fórum",
      ],
      buttonText: "Começar Grátis",
      popular: false,
    },
    {
      title: "Pro",
      description: "Tudo que você precisa para crescer o seu negócio.",
      priceMonthly: "$29",
      priceAnnually: "$24",
      features: [
        "Projetos Ilimitados",
        "Membros de equipe ilimitados",
        "100GB de Armazenamento",
        "Suporte Prioritário 24/7",
        "Métricas Avançadas",
      ],
      buttonText: "Assinar o Pro",
      popular: true,
    },
    {
      title: "Enterprise",
      description: "Recursos avançados para grandes operações.",
      priceMonthly: "$99",
      priceAnnually: "$89",
      features: [
        "Tudo do plano Pro",
        "Armazenamento Ilimitado",
        "SLA de 99.9%",
        "Gerente de Conta Dedicado",
        "SSO (Single Sign-On)",
        "Auditoria de Segurança",
      ],
      buttonText: "Falar com Vendas",
      popular: false,
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-8 py-10">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h2 className="text-h1 font-bold tracking-tight sm:text-display-sm md:text-display-md">
          Preços simples e transparentes
        </h2>
        <p className="text-muted-foreground text-body-lg max-w-full max-w-2xl mx-auto">
          Escolha o plano ideal para a sua equipe. Cancele a qualquer momento.
        </p>
      </div>

      {/* Toggle Biling Cycle */}
      <div className="flex items-center gap-3">
        <Label
          htmlFor="billing"
          className={`text-body-sm ${!isAnnual ? "font-bold" : "text-muted-foreground"}`}
        >
          Mensal
        </Label>
        <Switch
          id="billing"
          checked={isAnnual}
          onCheckedChange={setIsAnnual}
        />
        <Label
          htmlFor="billing"
          className={`flex items-center gap-1.5 text-body-sm ${
            isAnnual ? "font-bold" : "text-muted-foreground"
          }`}
        >
          Anual
          <Badge variant="soft" color="neutral" className="text-[10px] uppercase rounded-sm">
            Save 20%
          </Badge>
        </Label>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
        {plans.map((plan) => (
          <Card
            key={plan.title}
            className={`flex flex-col ${
              plan.popular
                ? "border-primary shadow-lg scale-105 z-10"
                : "border-border"
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-h3">{plan.title}</CardTitle>
                {plan.popular && (
                  <Badge className="uppercase text-[10px]"variant="solid" color="primary">Mais Popular</Badge>
                )}
              </div>
              <CardDescription className="pt-1.5">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div className="flex items-baseline gap-1 text-display-md font-extrabold">
                {isAnnual ? plan.priceAnnually : plan.priceMonthly}
                <span className="text-body-lg font-medium text-muted-foreground">
                  /mês
                </span>
              </div>
              
              {isAnnual && plan.priceAnnually !== "$0" && (
                <p className="text-body-sm text-muted-foreground">
                  Cobrado anualmente ({parseInt(plan.priceAnnually.replace('$', '')) * 12} USD)
                </p>
              )}

              <ul className="space-y-3 pt-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-body-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

\\n
### Block: RegisterForm
\	sx
import * as React from "react"
import { Lock, Mail, User } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcn/Card"
import { Button } from "../shadcn/Button"
import { Input } from "../shadcn/Input"
import { Label } from "../shadcn/Label"
import { Checkbox } from "../shadcn/Checkbox"
import { Separator } from "../shadcn/Separator"

export function RegisterForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-h3">Criar uma conta</CardTitle>
        <CardDescription>
          Insira seus dados abaixo para começar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="João da Silva"
                className="pl-9"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="m@exemplo.com"
                className="pl-9"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Crie uma senha forte"
                className="pl-9"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="terms" required />
            <label
              htmlFor="terms"
              className="text-label-md leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Eu aceito os{" "}
              <a href="#" className="underline text-primary hover:text-primary/80">
                Termos de Serviço
              </a>{" "}
              e a{" "}
              <a href="#" className="underline text-primary hover:text-primary/80">
                Política de Privacidade
              </a>.
            </label>
          </div>

          <Button className="w-full mt-4" type="submit" disabled={isLoading}>
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Criando conta...
              </span>
            ) : (
              "Registrar"
            )}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-body-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Ou continue com
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" type="button" disabled={isLoading}>
            Github
          </Button>
          <Button variant="outline" type="button" disabled={isLoading}>
            Google
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-center gap-2 text-body-sm text-muted-foreground">
        Já tem uma conta?{" "}
        <a href="#" className="underline hover:text-primary">
          Fazer login
        </a>
      </CardFooter>
    </Card>
  )
}

\\n
### Block: RoleManager
\	sx
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
            <TableHead className="w-72">Módulo / Recurso</TableHead>
            <TableHead className="text-center w-24">Ler</TableHead>
            <TableHead className="text-center w-24">Escrever</TableHead>
            <TableHead className="text-center w-24">Excluir</TableHead>
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
                    <div className="text-body-xs text-muted-foreground font-normal">
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

\\n
### Block: ScoreDistribution
\	sx
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
      colorClass: "bg-success-500",
      description: "sobreposição entre referência e amostra",
    },
    {
      id: "unbalanced",
      label: "Desbalanceamento",
      value: 15.5,
      colorClass: "bg-warning-500 text-warning-950",
      description: "IFs presentes com proporção incorreta",
    },
    {
      id: "missing",
      label: "IFs ausentes",
      value: 28.4,
      colorClass: "bg-destructive-500",
      description: "C6, Itaú Mercantil, Itaú Consignado",
    },
  ]

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-body-xs text-muted-foreground uppercase tracking-wider font-bold">
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
              className={`${item.colorClass} flex items-center justify-center text-body-xs font-bold transition-all hover:brightness-110 ${
                item.id === "unbalanced" ? "text-warning-950" : "text-white"
              }`}
            >
              {item.value}%
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 text-body-xs sm:text-body-sm">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <div className={`h-3 w-3 shrink-0 rounded-sm ${item.colorClass.split(" ")[0]}`} />
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
        <Alert className="mt-2 text-body-xs">
          <AlertDescription>
            <span className="font-bold">Metodologia — Coeficiente de Sobreposição:</span> para cada IF da referência, computa-se min(ref%, amostra%). A soma desses mínimos dividida pelo total de peso da referência (82,35%) mede a fração do universo de contratos efetivamente coberta pela amostra com as proporções corretas. Base: 61 docs na amostra vs. dataset do cliente (14 IFs, ~82% do universo).
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}

\\n
### Block: SettingsLayout
\	sx
import * as React from "react"
import { cn } from "../../lib/utils"
import { Button } from "../shadcn/Button"

export interface SettingsLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  sidebarContent: React.ReactNode
  children: React.ReactNode
  title: string
  description?: string
}

export function SettingsLayout({
  sidebarContent,
  children,
  title,
  description,
  className,
  ...props
}: SettingsLayoutProps) {
  return (
    <div className={cn("hidden space-y-6 p-10 pb-16 md:block", className)} {...props}>
      <div className="space-y-0.5">
        <h2 className="text-h3 tracking-tight">{title}</h2>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="my-6 w-full h-px bg-border" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          {sidebarContent}
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          {children}
        </div>
      </div>
    </div>
  )
}

export interface SettingsNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href?: string
    title: string
    isActive?: boolean
    icon?: React.ReactNode
    onClick?: () => void
  }[]
}

export function SettingsNav({ className, items, ...props }: SettingsNavProps) {
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Button
          key={item.title}
          variant={item.isActive ? "secondary" : "ghost"}
          className={cn(
            "justify-start",
            item.isActive
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline"
          )}
          onClick={item.onClick}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          {item.title}
        </Button>
      ))}
    </nav>
  )
}

\\n
### Block: Sidebar
\	sx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import {
  ChevronDown,
  ChevronUp,
  Grip,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  Users,
} from "lucide-react"

import { cn } from "../../lib/utils"
import { ScrollArea } from "../shadcn/ScrollArea"
import { Button } from "../shadcn/Button"
import { Separator } from "../shadcn/Separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../shadcn/Tooltip"

// --- Contexto para gerenciar o estado Expandido/Colapsado ---
type SidebarContextType = {
  isCollapsed: boolean
  toggleCollapse: () => void
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

// --- Componentes Principais ---

export function SidebarProvider({
  children,
  defaultCollapsed = false,
}: {
  children: React.ReactNode
  defaultCollapsed?: boolean
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  const toggleCollapse = React.useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleCollapse }}>
      <TooltipProvider delayDuration={0}>
        <div className="flex h-screen overflow-hidden bg-background">
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

export function Sidebar({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const { isCollapsed } = useSidebar()

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r bg-card transition-all duration-300 ease-in-out",
        isCollapsed ? "w-[var(--sidebar-width-icon,4.5rem)]" : "w-[var(--sidebar-width,16rem)]",
        className
      )}
    >
      {children}
    </aside>
  )
}

// --- Header (Logo e Botão de Colapsar) ---
export function SidebarHeader({
  className,
  logo,
  title = "oneDocs",
}: {
  className?: string
  logo?: React.ReactNode
  title?: string
}) {
  const { isCollapsed, toggleCollapse } = useSidebar()

  return (
    <div
      className={cn(
        "flex h-16 items-center justify-between px-4 py-4",
        isCollapsed && "justify-center px-0",
        className
      )}
    >
      {!isCollapsed ? (
        <>
          <div className="flex items-center gap-2 font-bold text-body-lg text-foreground">
            {logo || <Grip className="h-5 w-5 text-primary" />}
            <span className="tracking-tight">{title}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={toggleCollapse}
          >
            <PanelLeftClose className="h-5 w-5" />
          </Button>
        </>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-muted-foreground hover:text-foreground"
              onClick={toggleCollapse}
            >
              <PanelLeftOpen className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Expandir Menu</TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}

// --- Conteúdo (Lista de Links) ---
export function SidebarContent({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <ScrollArea className="flex-1">
      <div className={cn("flex-1 py-2", className)}>
        <nav className="flex flex-col gap-1 px-2">{children}</nav>
      </div>
    </ScrollArea>
  )
}

// --- Item de Menu Principal ---
export function SidebarItem({
  icon,
  label,
  active,
  onClick,
  children, // Submenus
  className,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}) {
  const { isCollapsed } = useSidebar()
  const [isOpen, setIsOpen] = React.useState(active || false)

  const hasChildren = Boolean(children)

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren && !isCollapsed) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
    if (onClick) onClick();
  }

  const itemContent = (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex w-full items-center justify-between rounded-md px-3 py-2 text-label-md transition-colors hover:bg-accent hover:text-accent-foreground",
        active ? "bg-accent/50 text-foreground font-semibold" : "text-muted-foreground",
        isCollapsed && "justify-center px-0 py-3",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn("flex h-5 w-5 items-center justify-center", active && "text-primary")}>
          {icon}
        </span>
        {!isCollapsed && <span>{label}</span>}
      </div>
      {!isCollapsed && hasChildren && (
        <span className="text-muted-foreground">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </span>
      )}
    </button>
  )

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{itemContent}</TooltipTrigger>
        <TooltipContent side="right" className="font-medium">
          {label}
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <div className="flex flex-col">
      {itemContent}
      {/* Submenus (Accordion style) */}
      {hasChildren && isOpen && !isCollapsed && (
        <div className="mt-1 flex flex-col gap-1 border-l-2 border-border/50 ml-5 pl-2">
          {children}
        </div>
      )}
    </div>
  )
}

// --- Sub Item (Nível 2 e 3) ---
export function SidebarSubItem({
  label,
  active,
  onClick,
  children, // Suporta novos subníveis (nível 3)
  className,
}: {
  label: string
  active?: boolean
  onClick?: () => void
  children?: React.ReactNode
  className?: string
}) {
  const [isOpen, setIsOpen] = React.useState(active || false)
  const hasChildren = Boolean(children)

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      // Previne que o evento propague e recarregue ou faça comportamentos indesejados
      e.preventDefault();
      setIsOpen(!isOpen);
    }
    if (onClick) onClick();
  }

  return (
    <div className="flex flex-col w-full">
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          "flex w-full items-center justify-between rounded-md px-3 py-1.5 text-body-sm transition-colors hover:text-foreground hover:bg-accent/50",
          active ? "text-foreground font-medium bg-accent/30" : "text-muted-foreground",
          className
        )}
      >
        <span>{label}</span>
        {hasChildren && (
          <span className="text-muted-foreground/70">
            {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </span>
        )}
      </button>
      
      {/* Submenus nível 3 */}
      {hasChildren && isOpen && (
        <div className="mt-1 flex flex-col gap-1 border-l border-border/50 ml-4 pl-2">
          {children}
        </div>
      )}
    </div>
  )
}

// --- Footer (Configurações, Usuário, Status) ---
export function SidebarFooter({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-2 p-4", className)}>{children}</div>
}

// --- Item Simples do Footer (ex: online status, copyright) ---
export function SidebarFooterItem({
  icon,
  label,
  onClick,
  className,
}: {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  className?: string
}) {
  const { isCollapsed } = useSidebar()

  const content = (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 text-body-sm text-muted-foreground transition-colors hover:text-foreground",
        onClick && "cursor-pointer",
        isCollapsed && "justify-center",
        className
      )}
    >
      <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
      {!isCollapsed && <span>{label}</span>}
    </div>
  )

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right">{label}</TooltipContent>
      </Tooltip>
    )
  }

  return content
}

\\n
### Block: Stepper
\	sx
import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

export interface Step {
  title: string
  description?: string
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep: number
  orientation?: "horizontal" | "vertical"
}

export function Stepper({
  steps,
  currentStep,
  orientation = "horizontal",
  className,
  ...props
}: StepperProps) {
  if (orientation === "horizontal") {
    return (
      <div className={cn("w-full flex flex-col", className)} {...props}>
        {/* Camada superior: Bolinhas e Linhas conectoras */}
        <div className="flex items-center w-full">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep

            return (
              <React.Fragment key={`indicator-${index}`}>
                <div className="flex flex-col items-center relative z-10">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border-2 font-semibold text-body-sm shrink-0 transition-colors bg-background",
                      isCompleted
                        ? "border-primary bg-primary text-primary-foreground"
                        : isCurrent
                        ? "border-primary text-primary"
                        : "border-muted text-muted-foreground"
                    )}
                  >
                    {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                </div>

                {/* Linha conectora */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-[2px] transition-colors mx-2",
                      index < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Camada inferior: Textos alinhados sob as bolinhas */}
        <div className="flex items-start w-full mt-3">
          {steps.map((step, index) => {
            const isCurrent = index === currentStep
            
            return (
              <div 
                key={`text-${index}`} 
                className={cn(
                  "flex flex-col items-center text-center",
                  // Usa flex-1 e ajusta a margem para distribuir o texto embaixo dos círculos.
                  // Se for o primeiro, alinha à esquerda. Se for o último, alinha à direita.
                  index === 0 ? "w-1/4 items-start text-left" : 
                  index === steps.length - 1 ? "w-1/4 items-end text-right" : "flex-1"
                )}
              >
                {/* 
                  Gambiarra elegante: forçamos o container de texto do meio a ter o mesmo centro
                  que a bolinha. Para o primeiro e último, mantemos o alinhamento nas bordas.
                */}
                <div className={cn(
                  "flex flex-col",
                  index === 0 ? "items-start" : index === steps.length - 1 ? "items-end" : "items-center px-2"
                )}>
                  <span className={cn("text-label-md whitespace-nowrap", isCurrent ? "text-foreground font-semibold" : "text-muted-foreground")}>
                    {step.title}
                  </span>
                  {step.description && (
                    <span className="text-body-xs text-muted-foreground mt-0.5 hidden sm:block max-w-[120px]">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Vertical orientation
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isCurrent = index === currentStep

        return (
          <div key={index} className="flex relative pb-8 last:pb-0">
            {/* Linha conectora vertical */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-4 top-8 bottom-0 w-[2px] -ml-[1px] transition-colors",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
            
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 font-semibold text-body-sm shrink-0 transition-colors bg-background relative z-10",
                isCompleted
                  ? "border-primary bg-primary text-primary-foreground"
                  : isCurrent
                  ? "border-primary text-primary"
                  : "border-muted text-muted-foreground"
              )}
            >
              {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
            </div>

            <div className="ml-4 flex flex-col pt-1">
              <span className={cn("text-label-md", isCurrent ? "text-foreground font-semibold" : "text-muted-foreground")}>
                {step.title}
              </span>
              {step.description && (
                <span className="text-body-xs text-muted-foreground mt-0.5">{step.description}</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

\\n
### Block: Topbar
\	sx
import * as React from "react"
import { Bell, Maximize, Keyboard, ChevronDown } from "lucide-react"

import { cn } from "../../lib/utils"
import { Button } from "../shadcn/Button"
import { Separator } from "../shadcn/Separator"
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/DropdownMenu"

export function Topbar({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn(
        "flex h-16 w-full items-center justify-between border-b bg-card px-4",
        className
      )}
    >
      {children}
    </header>
  )
}

export function TopbarLeft({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {children}
    </div>
  )
}

export function TopbarRight({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {children}
    </div>
  )
}

// --- Logo Component ---
export function TopbarLogo({ logo, alt = "Logo" }: { logo?: React.ReactNode, alt?: string }) {
  return (
    <div className="flex items-center">
      {logo || <div className="h-6 w-24 bg-primary/20 rounded-sm" aria-label={alt} />}
    </div>
  )
}

// --- Divider Component ---
export function TopbarDivider() {
  return <Separator orientation="vertical" className="h-6 mx-2 bg-border/50" />
}

// --- Context Selectors (Module, Tenant, Product) ---
export function TopbarSelector({ 
  label, 
  value, 
  hasDropdown = false 
}: { 
  label?: string
  value: string
  hasDropdown?: boolean 
}) {
  return (
    <div className="flex items-center gap-2 text-body-sm text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
      {label && <span className="hidden sm:inline-block">{label}</span>}
      <span className="font-medium">{value}</span>
      {hasDropdown && <ChevronDown className="h-4 w-4 opacity-50" />}
    </div>
  )
}

// --- Status/Info Text ---
export function TopbarInfo({ text }: { text: string }) {
  return (
    <div className="text-body-sm text-muted-foreground hidden md:block">
      {text}
    </div>
  )
}

// --- Action Buttons (Fullscreen, Keyboard, Notifications) ---
export function TopbarAction({ 
  icon, 
  onClick, 
  hasBadge = false 
}: { 
  icon: React.ReactNode
  onClick?: () => void
  hasBadge?: boolean
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative text-muted-foreground hover:text-foreground h-9 w-9"
      onClick={onClick}
    >
      {icon}
      {hasBadge && (
        <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-card" />
      )}
    </Button>
  )
}

// --- User Profile Dropdown ---
export function TopbarProfile({ 
  initials, 
  src, 
  name, 
  email 
}: { 
  initials: string
  src?: string
  name?: string
  email?: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 rounded-full pl-2 pr-1 gap-2 flex items-center hover:bg-accent/50">
          <Avatar className="h-8 w-8 border border-primary/20">
            <AvatarImage src={src} alt={name} />
            <AvatarFallback className="bg-primary-50 text-primary-600 text-label-sm font-semibold">{initials}</AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {(name || email) && (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                {name && <p className="text-label-md leading-none">{name}</p>}
                {email && <p className="text-body-xs leading-none text-muted-foreground">{email}</p>}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Configurações</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

\\n
### Block: UserSettings
\	sx
import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shadcn/Card"
import { Button } from "../shadcn/Button"
import { Input } from "../shadcn/Input"
import { Label } from "../shadcn/Label"
import { Separator } from "../shadcn/Separator"
import { Switch } from "../shadcn/Switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shadcn/Tabs"
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/Avatar"
import { ScrollArea } from "../shadcn/ScrollArea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shadcn/Select"

export function UserSettings() {
  return (
    <div className="flex w-full max-w-4xl flex-col md:flex-row gap-6">
      {/* Sidebar Navigation */}
      <ScrollArea orientation="horizontal" className="md:hidden">
        <nav className="flex gap-2 w-max">
          <Button variant="secondary" className="justify-start">
            Perfil
          </Button>
          <Button variant="ghost" className="justify-start">
            Conta
          </Button>
          <Button variant="ghost" className="justify-start">
            Aparência
          </Button>
          <Button variant="ghost" className="justify-start">
            Notificações
          </Button>
        </nav>
      </ScrollArea>
      <nav className="hidden md:flex flex-col gap-2 md:w-52 shrink-0">
        <Button variant="secondary" className="justify-start">
          Perfil
        </Button>
        <Button variant="ghost" className="justify-start">
          Conta
        </Button>
        <Button variant="ghost" className="justify-start">
          Aparência
        </Button>
        <Button variant="ghost" className="justify-start">
          Notificações
        </Button>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1">
        <Card>
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>
              Gerencie suas informações públicas e de contato.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button size="sm">Alterar Foto</Button>
                  <Button size="sm" variant="outline">
                    Remover
                  </Button>
                </div>
                <p className="text-body-xs text-muted-foreground">
                  JPG, GIF ou PNG. Tamanho máximo 2MB.
                </p>
              </div>
            </div>

            <Separator />

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Nome</Label>
                  <Input id="first-name" defaultValue="Luiz" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Sobrenome</Label>
                  <Input id="last-name" defaultValue="Baptistella" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@luizbaptistella" />
                <p className="text-[0.8rem] text-muted-foreground">
                  Este é o seu nome de exibição público.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Input id="bio" placeholder="Fale um pouco sobre você..." />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Select defaultValue="brt">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Selecione o fuso" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                    <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="brt">Brasília Time (BRT)</SelectItem>
                    <SelectItem value="utc">Universal Coordinated Time (UTC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator />

            {/* Toggles */}
            <div className="space-y-4">
              <h3 className="text-label-md">Preferências de Email</h3>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-body-md">Notificações de Marketing</Label>
                  <p className="text-body-sm text-muted-foreground">
                    Receba emails sobre novos recursos e novidades.
                  </p>
                </div>
                <Switch id="marketing" defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-body-md">Emails de Segurança</Label>
                  <p className="text-body-sm text-muted-foreground">
                    Receba emails sobre atividades suspeitas na conta.
                  </p>
                </div>
                <Switch id="security" defaultChecked disabled />
              </div>
            </div>

          </CardContent>
          <CardFooter className="flex justify-end gap-2 border-t pt-6">
            <Button variant="ghost">Cancelar</Button>
            <Button>Salvar Alterações</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

\\n
## 6. Design Principles & Composition Rules
CRITICAL: When generating any page or screen, you MUST follow these composition rules.

### 6.1 Spacing System (Strict Scale)
Use ONLY these 3 spacing levels - never arbitrary pixel values:
- Tight: gap-4 (16px) - elements within the same visual group
- Default: gap-6 (24px) - separate distinct sections on a page
- Loose: gap-8 (32px) - separate large functional blocks

### 6.2 Page Structure (Always Use This Order)
Every page MUST follow this hierarchy:
1. <PageLayout spacing="default"> - root container
2. <PageHeader> - title + description + actions (top right)
3. Content sections - MetricGrid, DataTable, Charts, etc
4. Navigation/Pagination if needed

### 6.3 MetricGrid Usage
- columns="4" for desktop KPI dashboards
- columns="2" for forms or smaller grids
- columns="12" for mixed layouts (use span="twothirds", "third")
- ALWAYS wrap content in <MetricCard>

### 6.4 Grouping Rules
- Related items: share a Card border/shadow
- Actions of same flow: use <Flex gap="sm">
- Tabular data: use <DataTable>
- Empty state: ALWAYS provide <EmptyState> when list can be empty

### 6.5 Action Placement
- Primary action (Create, Save): top-right corner in PageHeader
- Secondary actions (Filters, Search): below PageHeader or in toolbar
- Row actions (Edit, Delete): last column in DataTable

### 6.6 Feedback & States
- Loading: use <Skeleton> or Button with disabled+text
- Success/Error: use <Badge variant="soft" color="success|destructive">
- Empty: use <EmptyState> component
- Form validation: inline error messages below inputs

### 6.7 Always Use Semantic Components
- DO NOT use <div className="flex"> - use <Flex>
- DO NOT use <div className="grid"> - use <Grid>
- DO NOT use <button> - use <Button>
- DO NOT use <table> - use <DataTable>

### 6.8 Layout Checklist (Verify Before Finishing)
Before marking a screen as complete, verify:
[ ] Uses <PageLayout> as root container
[ ] Uses <PageHeader> for title and actions
[ ] Metrics in <MetricGrid> with correct columns
[ ] Visual groups wrapped in <Card>
[ ] Spacing follows tight/default/loose scale
[ ] Primary action in top-right corner
[ ] Empty states handled
[ ] Loading states with <Skeleton>
[ ] Tables with +10 rows have <Pagination>
[ ] Responsive tested on mobile

## 7. Common Page Templates

### Dashboard Template:
<PageLayout spacing="default">
  <PageHeader title="..." description="..." actions={...</PageHeader}>
  <MetricGrid columns="4">...</MetricGrid>
  <MetricGrid columns="12">
    <MetricCard span="twothirds"><Chart />...</MetricCard>
    <MetricCard><ActivityTimeline />...</MetricCard>
  </MetricGrid>
</PageLayout>

### List/Management Template:
<PageLayout spacing="default">
  <PageHeader title="..." actions={<Button>Novo</Button>} />
  <AdvancedFilter>...</AdvancedFilter>
  <Card><DataTable columns={columns} data={data} /></Card>
  <Pagination />
</PageLayout>

### Wizard/Form Template:
<PageLayout spacing="default">
  <PageHeader title="..." description="..." />
  <Stepper steps={steps} currentStep={activeStep} />
  <Card><CardContent>...form fields...</CardContent></Card>
  <Flex justify="between"><Button variant="ghost">Voltar</Button><Button>Continuar</Button></Flex>
</PageLayout>

## 8. Full Design Principles Document
See: src/DesignPrinciples.mdx
