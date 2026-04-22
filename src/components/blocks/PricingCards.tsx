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
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Preços simples e transparentes
        </h2>
        <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
          Escolha o plano ideal para a sua equipe. Cancele a qualquer momento.
        </p>
      </div>

      {/* Toggle Biling Cycle */}
      <div className="flex items-center gap-3">
        <Label
          htmlFor="billing"
          className={`text-sm ${!isAnnual ? "font-bold" : "text-muted-foreground"}`}
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
          className={`flex items-center gap-1.5 text-sm ${
            isAnnual ? "font-bold" : "text-muted-foreground"
          }`}
        >
          Anual
          <Badge variant="secondary" className="text-[10px] uppercase rounded-sm">
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
                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                {plan.popular && (
                  <Badge className="uppercase text-[10px]">Mais Popular</Badge>
                )}
              </div>
              <CardDescription className="pt-1.5">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 space-y-6">
              <div className="flex items-baseline gap-1 text-5xl font-extrabold">
                {isAnnual ? plan.priceAnnually : plan.priceMonthly}
                <span className="text-lg font-medium text-muted-foreground">
                  /mês
                </span>
              </div>
              
              {isAnnual && plan.priceAnnually !== "$0" && (
                <p className="text-sm text-muted-foreground">
                  Cobrado anualmente ({parseInt(plan.priceAnnually.replace('$', '')) * 12} USD)
                </p>
              )}

              <ul className="space-y-3 pt-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm">{feature}</span>
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
