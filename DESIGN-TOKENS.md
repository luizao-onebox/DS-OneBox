# Design Tokens

Este documento descreve todos os tokens de design do sistema, serving como fonte de verdade para cores, tipografia, espaçamento e outros valores visuais.

## Overview

Tokens são valores atômicos que definem a aparência visual do sistema. Eles são usados para garantir consistência e facilitar customizações.

---

## 🎨 Cores (Colors)

### Cores Base (Light Mode)

```css
--background: 0 0% 100%;        /* #FFFFFF - Background principal */
--foreground: 222.2 84% 4.9%;   /* #0A0A0A - Texto principal */
```

### Cores de Tema

| Token | HSL | Hex | Uso |
|-------|-----|-----|-----|
| `--background` | `0 0% 100%` | `#FFFFFF` | Background principal |
| `--foreground` | `222.2 84% 4.9%` | `#0A0A0A` | Texto principal |
| `--primary` | `221.2 83.2% 53.3%` | `#4F6EF7` | Cor primária (botões, links) |
| `--primary-foreground` | `210 40% 98%` | `#F8FAFC` | Texto sobre primária |
| `--secondary` | `210 40% 96.1%` | `#F1F5F9` | Cor secundária |
| `--secondary-foreground` | `222.2 47.4% 11.2%` | `#111827` | Texto sobre secundária |
| `--muted` | `210 40% 96.1%` | `#F1F5F9` | Fundos sutis |
| `--muted-foreground` | `215.4 16.3% 46.9%` | `#6B7280` | Texto secundário |
| `--accent` | `210 40% 96.1%` | `#F1F5F9` | Destaque sutil |
| `--accent-foreground` | `222.2 47.4% 11.2%` | `#111827` | Texto sobre acento |
| `--destructive` | `0 84.2% 60.2%` | `#EF4444` | Ações destrutivas |
| `--destructive-foreground` | `210 40% 98%` | `#F8FAFC` | Texto sobre destrutiva |

### Cores de Feedback

| Token | HSL | Hex | Uso |
|-------|-----|-----|-----|
| `--success` | `142 76% 36%` | `#22C55E` | Sucesso |
| `--warning` | `38 92% 50%` | `#F59E0B` | Avisos |
| `--error` | `0 84% 60%` | `#EF4444` | Erros |
| `--info` | `199 89% 48%` | `#0EA5E9` | Informações |

### Cores de Borda

| Token | HSL | Hex |
|-------|-----|-----|
| `--border` | `214.3 31.8% 91.4%` | `#E2E8F0` |
| `--input` | `214.3 31.8% 91.4%` | `#E2E8F0` |
| `--ring` | `221.2 83.2% 53.3%` | `#4F6EF7` |

---

## 📝 Tipografia (Typography)

### Font Family

```css
--font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

### Tamanhos de Fonte

| Token | Size | Line Height | Uso |
|-------|------|-------------|-----|
| `--text-xs` | 12px | 16px | Labels pequenos |
| `--text-sm` | 14px | 20px | Texto secundário |
| `--text-base` | 16px | 24px | Texto principal |
| `--text-lg` | 18px | 28px | Títulos pequenos |
| `--text-xl` | 20px | 28px | Subtítulos |
| `--text-2xl` | 24px | 32px | Títulos de seção |
| `--text-3xl` | 30px | 36px | Títulos de página |

### Font Weights

| Token | Value | Uso |
|-------|-------|-----|
| `--font-normal` | 400 | Texto regular |
| `--font-medium` | 500 | Texto emphasis |
| `--font-semibold` | 600 | Títulos |
| `--font-bold` | 700 | Destaque |

---

## 📐 Espaçamento (Spacing)

Baseado em escala de 4px.

| Token | Value | Equivalente |
|-------|-------|-------------|
| `--space-0` | 0px | 0 |
| `--space-1` | 4px | 0.25rem |
| `--space-2` | 8px | 0.5rem |
| `--space-3` | 12px | 0.75rem |
| `--space-4` | 16px | 1rem |
| `--space-5` | 20px | 1.25rem |
| `--space-6` | 24px | 1.5rem |
| `--space-8` | 32px | 2rem |
| `--space-10` | 40px | 2.5rem |
| `--space-12` | 48px | 3rem |
| `--space-16` | 64px | 4rem |

---

## 🔲 Bordas (Borders)

### Border Radius

| Token | Value | Uso |
|-------|-------|-----|
| `--radius-sm` | `calc(0.5rem - 4px)` | Elementos pequenos |
| `--radius-md` | `calc(0.5rem - 2px)` | Elementos médios |
| `--radius-lg` | `0.5rem` | Cards, modais |
| `--radius-xl` | `0.75rem` | Containers grandes |
| `--radius-full` | `9999px` | Círculos, pills |

### Border Width

| Token | Value |
|-------|-------|
| `--border-width` | 1px |
| `--border-width-2` | 2px |

---

## 🌫️ Sombras (Shadows)

| Token | Value | Uso |
|-------|-------|-----|
| `--shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Elevação sutil |
| `--shadow` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` | Cards |
| `--shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1)` | Dropdowns |
| `--shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1)` | Modais |
| `--shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1)` | Popovers |

---

## ⚡ Animações (Transitions)

| Token | Value |
|-------|-------|
| `--transition-fast` | 150ms |
| `--transition-normal` | 200ms |
| `--transition-slow` | 300ms |

### Easing

```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 📱 Breakpoints

| Token | Value | Dispositivo |
|-------|-------|-------------|
| `--breakpoint-sm` | 640px | Mobile landscape |
| `--breakpoint-md` | 768px | Tablet |
| `--breakpoint-lg` | 1024px | Desktop |
| `--breakpoint-xl` | 1280px | Desktop grande |
| `--breakpoint-2xl` | 1536px | Telas extra grandes |

---

## 🎯 Z-Index Scale

| Token | Value | Uso |
|-------|-------|-----|
| `--z-0` | 0 | Base |
| `--z-10` | 10 | Elementos internos |
| `--z-20` | 20 | Dropdowns |
| `--z-30` | 30 | Sticky headers |
| `--z-40` | 40 | Modais |
| `--z-50` | 50 | Toasts |

---

## Uso nos Componentes

### Via Tailwind Classes

```jsx
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Primary Button
</button>
```

### Via CSS Variables

```css
.my-component {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

### Via JavaScript

```javascript
const color = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary').trim();
```

---

## Dark Mode

Para usar dark mode, adicione a classe `.dark` ao elemento raiz:

```html
<html class="dark">
  <!-- conteúdo -->
</html>
```

Dark mode inverte as variáveis CSS automaticamente via Tailwind.

---

## Manutenção

Ao alterar tokens:
1. Atualize este documento
2. Atualize `src/index.css`
3. Atualize `tailwind.config.js`
4. Rebuild do Storybook

## Links

- [Tailwind CSS Customization](https://tailwindcss.com/docs/customizing-colors)
- [shadcn/ui Themes](https://ui.shadcn.com/docs/theming)