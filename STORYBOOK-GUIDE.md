# Storybook shadcn/ui Components - Documentation

## Estrutura do Projeto

```
src/
├── components/
│   └── shadcn/
│       ├── index.js           # Barrel export - facilita imports
│       ├── Button.jsx        # Componente principal
│       ├── Button.stories.jsx # Stories do Storybook
│       └── ...outros componentes
├── lib/
│   └── utils.js              # Utilitários (cn function)
└── index.css                 # Estilos globais e variáveis CSS
```

## Padrões de Componentes

### 1. Estrutura de Arquivos
Cada componente segue o padrão:
- `{ComponentName}.jsx` - Implementação do componente
- `{ComponentName}.stories.jsx` - Stories do Storybook

### 2. Estrutura de Stories (CSF 3.0)

```javascript
// Padrão recomendado para stories
export default {
  title: 'Components/shadcn/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: { /* controles */ },
}

export const Playground = {
  args: { /* args padrão */ },
  render: (args) => <Button {...args} />,
}
```

### 3. Categorização de Props nos ArgTypes

```javascript
argTypes: {
  variant: {
    control: 'select',
    options: ['default', 'outline', 'destructive'],
    description: 'Visual style variant',
    table: {
      category: 'Appearance',  // Árvore de categorias
      defaultValue: { summary: 'default' },
    },
  },
}
```

Categorias recomendadas:
- **Appearance** - variant, size, className
- **Icon** - icon, iconPosition
- **State** - disabled, loading
- **Behavior** - onClick, onChange

### 4. JSDoc para Componentes

```javascript
/**
 * Button component with support for multiple variants and icons.
 *
 * @param {'default'|'outline'} props.variant - Visual style
 * @param {React.ComponentType} props.icon - Lucide icon component
 * @param {boolean} props.disabled - Disable state
 *
 * @example
 * // Basic usage
 * <Button>Click me</Button>
 *
 * @example
 * // With icon
 * <Button icon={Mail}>Send</Button>
 */
```

## Lista de Componentes

### Form Components
| Componente | Props principais |
|------------|-----------------|
| Button | variant, size, icon, iconPosition, disabled |
| Input | type, placeholder, disabled |
| Label | htmlFor, required |
| Textarea | placeholder, disabled |
| Checkbox | checked, disabled |
| Switch | checked, disabled |
| RadioGroup | value, onValueChange |
| Slider | value, min, max, step |
| Toggle | pressed, variant |

### Display Components
| Componente | Props principais |
|------------|-----------------|
| Badge | variant |
| Avatar | src, alt, fallback |
| Progress | value, max |
| Skeleton | className |

### Layout Components
| Componente | Props principais |
|------------|-----------------|
| Card | className |
| Tabs | defaultValue, orientation |
| Separator | orientation |

### Navigation Components
| Componente | Props principais |
|------------|-----------------|
| Breadcrumb | separator |
| DropdownMenu | open, onOpenChange |
| Sheet | open, side |
| Tabs | value, onValueChange |

### Overlay Components
| Componente | Props principais |
|------------|-----------------|
| Dialog | open, onOpenChange |
| Popover | open, onOpenChange |
| Tooltip | content, side |
| Command | open |

### Feedback Components
| Componente | Props principais |
|------------|-----------------|
| Alert | variant |
| Toast | title, description |
| Accordion | type, defaultValue |
| Progress | value |

## Contributing

### Adicionando novo componente

1. Criar `{ComponentName}.jsx` com JSDoc completo
2. Criar `{ComponentName}.stories.jsx` com estrutura CSF 3.0
3. Exportar no `index.js`
4. Adicionar documentação nesta página

### Checklist de Quality

- [ ] Componente com JSDoc
- [ ] displayName definido
- [ ] forwardRef utilizado
- [ ] Stories com Controls (argTypes)
- [ ] Múltiplas variações de stories
- [ ] Export no index.js
- [ ] Descrição clara no Args Table

### Boas Práticas

1. **Composição sobre configuração** - Prefira composable components
2. **Remova dependências externas** - Manter componentes isolados
3. **Use TypeScript** - Migração futura recomendada
4. **Teste visual** - Screenshots com Chromatic
5. **Documente estados** - Loading, error, empty states

## Links Úteis

- [Storybook Docs](https://storybook.js.org/docs/react/writing-stories/introduction)
- [shadcn/ui](https://ui.shadcn.com/)
- [CSF 3.0](https://storybook.js.org/docs/react/api/csf)
- [Chromatic](https://www.chromatic.com/) - Visual testing