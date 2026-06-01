import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Camera, Upload, ChevronRight, Building2, Globe, MapPin, CreditCard, Sparkles, Zap } from "lucide-react"

import { ExpandableRadioItem, ExpandableRadioGroup } from "./ExpandableRadioItem"
import { Button } from "../shadcn/Button"
import { Badge } from "../shadcn/Badge"

const meta = {
  title: "Blocks/ExpandableRadioItem",
  component: ExpandableRadioItem,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ExpandableRadioItem>

export default meta
type Story = StoryObj<typeof meta>

// =====================================================
// COMPONENTES AUXILIARES REUTILIZÁVEIS
// =====================================================

const GreenBadge = () => (
  <span className="px-2 py-0.5 text-xs font-medium rounded-md whitespace-nowrap bg-green-100 text-green-800">
    Aprovação mais rápida
  </span>
)

const AmberBadge = () => (
  <span className="px-2 py-0.5 text-xs font-medium rounded-md whitespace-nowrap bg-amber-100 text-amber-900">
    Aprovação pode demorar mais
  </span>
)

const BlueBadge = () => (
  <span className="px-2 py-0.5 text-xs font-medium rounded-md whitespace-nowrap bg-blue-100 text-blue-800">
    Mais popular
  </span>
)

const DocumentActions = () => (
  <div className="flex flex-col gap-3 pt-2">
    <Button 
      variant="outline" 
      className="w-full justify-between h-14 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 bg-white"
    >
      <span className="flex items-center text-base font-normal">
        <Camera className="mr-3 h-5 w-5" />
        Tirar foto do documento
      </span>
      <ChevronRight className="h-5 w-5 opacity-50" />
    </Button>
    <Button 
      variant="outline" 
      className="w-full justify-between h-14 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 bg-white"
    >
      <span className="flex items-center text-base font-normal">
        <Upload className="mr-3 h-5 w-5" />
        Fazer upload do documento
      </span>
      <ChevronRight className="h-5 w-5 opacity-50" />
    </Button>
  </div>
)

const AddressFields = () => (
  <div className="pt-2 space-y-3">
    <div>
      <label className="text-xs font-medium text-muted-foreground">CEP</label>
      <div className="mt-1 px-3 py-2 border rounded-md bg-white text-sm">
        01310-100
      </div>
    </div>
    <div>
      <label className="text-xs font-medium text-muted-foreground">Rua</label>
      <div className="mt-1 px-3 py-2 border rounded-md bg-white text-sm">
        Avenida Paulista
      </div>
    </div>
    <Button className="w-full">
      Confirmar endereço
    </Button>
  </div>
)

const PaymentFields = () => (
  <div className="pt-2 space-y-3">
    <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 bg-slate-50 rounded-md">
      <CreditCard className="h-4 w-4" />
      <span>Você será redirecionado para o ambiente seguro do banco.</span>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="w-full">Pagar à vista</Button>
      <Button variant="outline" className="w-full">Parcelado</Button>
    </div>
  </div>
)

const PlanFeatures = ({ features }: { features: string[] }) => (
  <ul className="pt-2 space-y-2">
    {features.map((feature) => (
      <li key={feature} className="flex items-center gap-2 text-sm">
        <Sparkles className="h-4 w-4 text-primary" />
        <span>{feature}</span>
      </li>
    ))}
  </ul>
)

// =====================================================
// VARIAÇÕES (STORIES)
// =====================================================

/**
 * Caso de uso: Validação de identidade com upload de documento
 * - 5 documentos (CNH, CIN, RNE, Passaporte, RG)
 * - Badges indicativas (verde para rápido, âmbar para demorado)
 * - Conteúdo expandido: botões de tirar foto e upload
 */
export const Default: Story = {
  render: () => {
    return (
      <div className="w-[400px] border rounded-xl overflow-hidden shadow-sm">
        <ExpandableRadioGroup defaultValue="rg">
          <ExpandableRadioItem value="cnh" label="CNH" badge={<GreenBadge />}>
            <DocumentActions />
          </ExpandableRadioItem>

          <ExpandableRadioItem value="cin" label="CIN">
            <DocumentActions />
          </ExpandableRadioItem>

          <ExpandableRadioItem value="rne" label="RNE">
            <DocumentActions />
          </ExpandableRadioItem>

          <ExpandableRadioItem value="passaporte" label="Passaporte">
            <DocumentActions />
          </ExpandableRadioItem>

          <ExpandableRadioItem value="rg" label="RG" badge={<AmberBadge />}>
            <DocumentActions />
          </ExpandableRadioItem>
        </ExpandableRadioGroup>
      </div>
    )
  },
}

/**
 * Caso de uso: Lista de opções sem badge
 * - Variante mais simples para mostrar que o badge é totalmente opcional
 * - Conteúdo expandido pode ser texto simples, formulário ou qualquer ReactNode
 */
export const WithoutBadge: Story = {
  render: () => {
    return (
      <div className="w-[400px] border rounded-xl overflow-hidden shadow-sm">
        <ExpandableRadioGroup defaultValue="shipping">
          <ExpandableRadioItem value="shipping" label="Endereço de entrega">
            <AddressFields />
          </ExpandableRadioItem>

          <ExpandableRadioItem value="pickup" label="Retirar na loja">
            <div className="pt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Rua das Flores, 123 - Centro</span>
            </div>
          </ExpandableRadioItem>

          <ExpandableRadioItem value="digital" label="Entrega digital">
            <div className="pt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" />
              <span>Disponível em alguns minutos no seu e-mail.</span>
            </div>
          </ExpandableRadioItem>
        </ExpandableRadioGroup>
      </div>
    )
  },
}

/**
 * Caso de uso: Componente controlado externamente
 * - O estado é controlado via props `value` e `onValueChange`
 * - Demonstra o valor selecionado em tempo real
 * - Útil para sincronizar com formulários ou outros componentes
 */
export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState("pro")
    const [submitted, setSubmitted] = React.useState(false)

    return (
      <div className="w-[400px] space-y-4">
        <div className="p-3 bg-slate-100 rounded-md text-sm font-mono">
          selected: <strong className="text-primary">{selected || "null"}</strong>
        </div>

        <div className="border rounded-xl overflow-hidden shadow-sm">
          <ExpandableRadioGroup value={selected} onValueChange={setSelected}>
            <ExpandableRadioItem value="basic" label="Básico" badge={<span className="px-2 py-0.5 text-xs font-medium rounded-md whitespace-nowrap bg-slate-100 text-slate-700">R$ 29/mês</span>}>
              <PlanFeatures features={["1 usuário", "5 projetos", "Suporte por e-mail"]} />
            </ExpandableRadioItem>

            <ExpandableRadioItem value="pro" label="Pro" badge={<BlueBadge />}>
              <PlanFeatures features={["10 usuários", "Projetos ilimitados", "Suporte 24/7", "Relatórios avançados"]} />
            </ExpandableRadioItem>

            <ExpandableRadioItem value="enterprise" label="Enterprise" badge={<span className="px-2 py-0.5 text-xs font-medium rounded-md whitespace-nowrap bg-slate-100 text-slate-700">Sob consulta</span>}>
              <div className="pt-2 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="h-4 w-4 text-primary" />
                  <span>Solução corporativa</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-primary" />
                  <span>Implantação dedicada</span>
                </div>
              </div>
            </ExpandableRadioItem>
          </ExpandableRadioGroup>
        </div>

        <Button 
          className="w-full" 
          disabled={!selected}
          onClick={() => setSubmitted(true)}
        >
          Continuar com plano selecionado
        </Button>

        {submitted && (
          <div className="p-3 bg-green-50 text-green-800 rounded-md text-sm">
            ✓ Plano <strong>{selected}</strong> selecionado com sucesso!
          </div>
        )}
      </div>
    )
  },
}

/**
 * Caso de uso: Componente desabilitado
 * - Item bloqueado, sem conteúdo expandido
 * - Estado visual mais opaco
 */
export const Disabled: Story = {
  render: () => {
    return (
      <div className="w-[400px] border rounded-xl overflow-hidden shadow-sm">
        <ExpandableRadioGroup defaultValue="debit">
          <ExpandableRadioItem value="debit" label="Cartão de débito">
            <PaymentFields />
          </ExpandableRadioItem>

          <ExpandableRadioItem value="credit" label="Cartão de crédito">
            <PaymentFields />
          </ExpandableRadioItem>

          <ExpandableRadioItem value="pix" label="PIX">
            <div className="pt-2 text-sm text-muted-foreground">
              Pagamento instantâneo via QR Code.
            </div>
          </ExpandableRadioItem>

          <ExpandableRadioItem value="boleto" label="Boleto" className="opacity-50 pointer-events-none">
            <p className="text-sm text-muted-foreground pt-2">
              Indisponível para esta compra.
            </p>
          </ExpandableRadioItem>
        </ExpandableRadioGroup>
      </div>
    )
  },
}
