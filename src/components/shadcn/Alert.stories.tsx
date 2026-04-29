import { Alert, AlertDescription, AlertTitle } from "./Alert"

export default {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `

O componente de Alerta exibe uma mensagem de atenção ou aviso proeminente que interrompe visualmente a tela (callout box). É ideal para mostrar confirmações, falhas em submissões ou informações úteis e não-dispensáveis no momento.

## Anatomia do Componente

A estrutura de uso é feita pela composição de:
1. **\`<Alert>\`:** O contêiner de fundo colorido ou com borda contornada.
2. **Ícone Decorativo:** Posicionado no topo à esquerda via filhos injetados no \`<Alert>\` (Normalmente usando os ícones do Lucide).
3. **\`<AlertTitle>\`:** O título (em negrito \`font-medium\`) com tamanho maior e espaçamentos no fundo.
4. **\`<AlertDescription>\`:** O texto principal, menor (\`text-sm\`), descrevendo a ação, erro ou contexto.

## Variantes (Tokens)

- **default**: Uma mensagem informativa, que tem fundo transparente, texto da cor primária (\`text-foreground\`) e bordas suaves (\`border-border\`).
- **destructive**: O clássico alerta de erro ou perigo. As bordas, textos, e qualquer \`svg\` injetado, recebem a cor vermelha \`text-destructive\`.
- **success**: Alerta de sucesso (ex: "Salvo com sucesso", "Operação concluída").
- **warning**: Alerta de atenção (ex: "Atenção", "Verifique os dados").

## Boas Práticas

### ✅ Faça
- Use Alertas para mensagens importantes que requerem atenção do usuário.
- Mantenha o texto conciso e direto.
- Forneça uma ação quando possível (ex: "Tentar novamente", "Ver detalhes").
- Use títulos descritivos que resumam o problema ou informação.

### ❌ Não Faça
- Não use Alertas para mensagens de sucesso muito breves — um Toast pode ser mais adequado.
- Não abuse de alertas na mesma tela — se many elementos precisam de alerta, use Cards ou mensagens inline.
- Não use alertas destrutivos (\`destructive\`) para avisos informativos.

## Acessibilidade

- Alertas usam \`role="alert"\` automaticamente via Radix quando há \`children\`.
- Se o alerta for estático (não crítico), considere \`role="status"\` para não interromper leitores de tela.
- Forneça \`aria-label\` se o ícone decorativo não tiver contexto textual.

## Variants

| Variant | Uso | Exemplo |
|---------|-----|---------|
| \`default\` | Mensagem informativa | "Aqui está o que mudou" |
| \`destructive\` | Erro/Falha | "Falha ao salvar dados" |
| \`success\` | Sucesso da operação | "Documento salvo com sucesso" |
| \`warning\` | Alerta/Atenção | "Verifique os campos obrigatórios" |
        `,
      },
    },
  },
  tags: ["autodocs"],
}

export const AlertPlayground = {
  render: () => (
    <Alert>
      <AlertTitle>Default Alert</AlertTitle>
      <AlertDescription>
        This is a default alert message.
      </AlertDescription>
    </Alert>
  ),
}

export const AlertGallery = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <section>
        <h2 className="text-sm font-semibold mb-3 text-muted-foreground">Variants</h2>
        <div className="flex flex-col gap-4">
          <Alert>
            <AlertTitle>Default</AlertTitle>
            <AlertDescription>Default alert variant.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Destructive</AlertTitle>
            <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your changes have been saved successfully.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>This action may have unintended consequences.</AlertDescription>
          </Alert>
        </div>
      </section>
    </div>
  ),
}
