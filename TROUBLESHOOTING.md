# DS-OneBox Troubleshooting

## 1. Variáveis CSS em Atributos SVG
O objeto `config` dos gráficos aceita cores. No entanto, atributos SVG como `stroke` e `fill` não resolvem corretamente funções `var()` do CSS quando aplicadas dinamicamente inline.
**Correção:** Sempre use valores `hex` ou `rgb()` no `config.color` quando usado em SVG. O uso de `hsl(var(--success))` fará com que a cor não apareça nos gráficos.

## 2. ActivityTimeline API
O componente `ActivityTimeline` deve sempre ser construído utilizando o seu subcomponente `TimelineItem` como `children`, em vez de passar um array de items por props.

## 3. Cache do Vite (Erros de Resolução pós Update)
Após atualizar o DS-OneBox, o Vite pode manter o cache antigo em `node_modules/.vite`, causando erros de resolução de módulos e tela branca.
Para corrigir, limpe o cache e reinicie:
```bash
rm -rf node_modules/.vite
npm run dev
```

## 4. Peer Dependency do Recharts
Caso você encontre o erro `Failed to resolve import "react-is"`, instale-o manualmente na sua aplicação:
```bash
npm install react-is
```
