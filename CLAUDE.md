# Instruções para o Claude (Claude Code)

Bem-vindo ao repositório do `DS-OneBox`, nosso Design System proprietário e arquitetura base para aplicações frontend (Web e Desktop via Tauri/Electron).

Ao atuar como assistente de programação neste repositório (ou em repositórios que consomem este Design System), você **DEVE** seguir estritamente as regras abaixo para garantir a consistência visual, acessibilidade e manutenibilidade do código.

## 🎨 1. Arquitetura de Cores e Tokens (White-Label)

Este projeto usa uma arquitetura de temas white-label baseada puramente em CSS Custom Properties. 
**NUNCA use cores hardcoded do Tailwind.**

**ERRADO:**
```tsx
<div className="bg-blue-500 text-white rounded-md p-4">
  <span className="text-gray-400 text-sm">...</span>
</div>
```

**CORRETO:**
```tsx
<div className="bg-primary text-primary-foreground rounded-md p-4">
  <span className="text-muted-foreground text-label-sm">...</span>
</div>
```

### Tokens Disponíveis (Sempre prefira estes):
- **Fundos:** `bg-background`, `bg-card`, `bg-muted`, `bg-secondary`
- **Textos:** `text-foreground`, `text-muted-foreground`, `text-primary`
- **Ações/Estados:** `primary`, `secondary`, `destructive`, `success`, `warning`, `info`
- **Tipografia:** `text-display-*`, `text-h*`, `text-body-*`, `text-label-*`, `text-code-*`

> *Nota: Todos os utilitários de tipografia (ex: `text-label-md`) já incluem o tamanho da fonte, peso e altura da linha corretos. Não adicione classes extras como `font-bold` a menos que seja para um override explícito.*

## 🧩 2. Uso de Componentes

Se a interface exigir um componente (Botão, Input, Modal, Sidebar, Kanban), verifique primeiro se ele já existe na nossa biblioteca.

1. **Leia a documentação:** Consulte o arquivo `public/llms.txt` (ou a versão exportada dele) para entender a API exata dos nossos componentes.
2. **Sem dependências externas:** NUNCA instale ou use componentes do Material UI, Chakra, AntDesign ou implementações cruas do Headless UI/Radix se já tivermos um wrapper criado.
3. **Padrão de Importação:** Em projetos consumidores, importe de `ds-onebox`. Neste repositório, importe usando os caminhos relativos ou aliases configurados.

## 📐 3. Estrutura e Estilização

- **Tailwind Merge (`cn`):** Sempre que um componente aceitar a propriedade `className`, use a nossa função utilitária `cn()` localizada em `lib/utils.ts` para mesclar as classes passadas via prop com as classes padrão do componente de forma segura.
- **CVA (Class Variance Authority):** Use `cva` para definir variantes de componentes (ex: `solid`, `outline`, `soft`, `sizes`).
- **Ícones:** Usamos exclusivamente a biblioteca `lucide-react`.

## ⚙️ 4. Fluxo de Desenvolvimento

1. **Ao criar um novo componente:**
   - Coloque os primitivos (baseados no Shadcn) em `src/components/shadcn/`.
   - Coloque componentes compostos ou seções de tela (ex: MarketingBanner, Kanban, Sidebar) em `src/components/blocks/`.
   - SEMPRE crie a documentação interativa `.stories.tsx` junto com o componente.

2. **Ao modificar estilos globais:**
   - Modifique o arquivo `src/index.css`.
   - Lembre-se que as variáveis do dark mode vivem sob o seletor `.dark, [data-theme="dark"]`.

3. **Geração de Docs para IA:**
   - Sempre que criar ou modificar a API de um componente, lembre o desenvolvedor de rodar o comando para atualizar o `llms.txt` na pasta `public/`.

---
*Lembre-se: O objetivo principal deste Design System é permitir a geração de telas por IA mantendo a identidade visual perfeita e o contraste acessível através do nosso sistema de Tokens.*