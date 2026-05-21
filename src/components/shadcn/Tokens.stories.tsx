// @ts-nocheck
/**
 * Design Tokens - Visual documentation for all design system values.
 * This story provides a comprehensive overview of all design tokens.
 */
import { useState } from 'react'

const colors = [
  { name: 'Background', class: 'bg-background', hex: 'var(--background)', description: 'Main background' },
  { name: 'Foreground', class: 'bg-foreground', hex: 'var(--foreground)', description: 'Primary text' },
  { name: 'Primary', class: 'bg-primary-500', hex: 'var(--primary-500)', description: 'Primary actions' },
  { name: 'Success', class: 'bg-success-500', hex: 'var(--success-500)', description: 'Success states' },
  { name: 'Warning', class: 'bg-warning-500', hex: 'var(--warning-500)', description: 'Warning states' },
  { name: 'Destructive', class: 'bg-destructive-500', hex: 'var(--destructive-500)', description: 'Error states' },
  { name: 'Info', class: 'bg-info-500', hex: 'var(--info-500)', description: 'Informational states' },
  { name: 'Neutral', class: 'bg-neutral-500', hex: 'var(--neutral-500)', description: 'Secondary text and borders' },
]

const spacing = [4, 8, 12, 16, 24, 32, 48, 64]
const radius = [
  { name: 'sm', value: '6px' },
  { name: 'md', value: '6px' },
  { name: 'lg', value: '8px' },
  { name: 'xl', value: '12px' },
  { name: 'full', value: '9999px' },
]

export default {
  title: "Design System/Tokens",
  component: null,
  tags: ["autodocs"],
}

export const TokensGallery = {
  render: () => (
    <div className="p-6 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-h3 mb-2">Design Tokens</h1>
        <p className="text-muted-foreground">Source of truth for all visual design values.</p>
      </div>

      {/* Colors */}
      <section>
        <h2 className="text-h5 mb-4">Colors</h2>
        <div className="grid grid-cols-4 gap-4">
          {colors.map((c) => (
            <div key={c.name} className="space-y-2">
              <div className={`h-12 rounded-lg border shadow-sm ${c.class}`} />
              <p className="font-medium text-body-sm">{c.name}</p>
              <p className="text-body-xs font-mono text-muted-foreground">{c.hex}</p>
              <p className="text-body-xs text-muted-foreground">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-h5 mb-4">Typography (Semantic)</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-label-md text-muted-foreground mb-3 uppercase tracking-wider">Display</h3>
            <div className="space-y-2">
              <p className="text-display-2xl">Display 2XL</p>
              <p className="text-display-xl">Display XL</p>
              <p className="text-display-lg">Display Large</p>
              <p className="text-display-md">Display Medium</p>
              <p className="text-display-sm">Display Small</p>
            </div>
          </div>
          <div>
            <h3 className="text-label-md text-muted-foreground mb-3 uppercase tracking-wider">Headings</h3>
            <div className="space-y-2">
              <p className="text-h1">Heading 1</p>
              <p className="text-h2">Heading 2</p>
              <p className="text-h3">Heading 3</p>
              <p className="text-h4">Heading 4</p>
              <p className="text-h5">Heading 5</p>
              <p className="text-h6">Heading 6</p>
            </div>
          </div>
          <div>
            <h3 className="text-label-md text-muted-foreground mb-3 uppercase tracking-wider">Body</h3>
            <div className="space-y-2">
              <p className="text-body-xl">Body Extra Large - Lead paragraphs and hero descriptions.</p>
              <p className="text-body-lg">Body Large - Utilizado para parágrafos de destaque.</p>
              <p className="text-body-md">Body Medium - O corpo de texto padrão do sistema.</p>
              <p className="text-body-sm">Body Small - Textos secundários e auxiliares.</p>
              <p className="text-body-xs">Body Extra Small - Disclaimers e notas de rodapé.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-label-md text-muted-foreground mb-3 uppercase tracking-wider">Label / Caption</h3>
              <div className="space-y-2">
                <p className="text-label-xl">Label Extra Large</p>
                <p className="text-label-lg">Label Large</p>
                <p className="text-label-md">Label Medium</p>
                <p className="text-label-sm">Label Small</p>
                <p className="text-label-xs">Label Extra Small</p>
              </div>
            </div>
            <div>
              <h3 className="text-label-md text-muted-foreground mb-3 uppercase tracking-wider">Code</h3>
              <div className="space-y-2">
                <p className="text-code-lg font-mono">text-code-lg</p>
                <p className="text-code-md font-mono">text-code-md</p>
                <p className="text-code-sm font-mono">text-code-sm</p>
                <p className="text-code-xs font-mono">text-code-xs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="text-h5 mb-4">Spacing</h2>
        <div className="space-y-3">
          {spacing.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <span className="w-12 text-body-sm text-muted-foreground">{s}px</span>
              <div className="h-4 bg-primary rounded" style={{ width: `${s}px` }} />
            </div>
          ))}
        </div>
      </section>

      {/* Border Radius */}
      <section>
        <h2 className="text-h5 mb-4">Border Radius</h2>
        <div className="flex gap-6">
          {radius.map((r) => (
            <div key={r.name} className="text-center">
              <div className="w-16 h-16 bg-primary mb-2" style={{ borderRadius: r.value }} />
              <p className="text-label-md">{r.name}</p>
              <p className="text-body-xs text-muted-foreground">{r.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section>
        <h2 className="text-h5 mb-4">Shadows</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-background rounded-lg border shadow-sm">
            <p className="font-medium">sm</p>
            <p className="text-body-xs text-muted-foreground">Subtle elevation</p>
          </div>
          <div className="p-4 bg-background rounded-lg border shadow">
            <p className="font-medium">default</p>
            <p className="text-body-xs text-muted-foreground">Cards</p>
          </div>
          <div className="p-4 bg-background rounded-lg border shadow-md">
            <p className="font-medium">md</p>
            <p className="text-body-xs text-muted-foreground">Dropdowns</p>
          </div>
          <div className="p-4 bg-background rounded-lg border shadow-lg">
            <p className="font-medium">lg</p>
            <p className="text-body-xs text-muted-foreground">Modals</p>
          </div>
          <div className="p-4 bg-background rounded-lg border shadow-xl">
            <p className="font-medium">xl</p>
            <p className="text-body-xs text-muted-foreground">Popovers</p>
          </div>
        </div>
      </section>

      {/* Components with Tokens */}
      <section>
        <h2 className="text-h5 mb-4">Components Preview</h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-md bg-primary-500 hover:bg-primary-600 text-primary-foreground">Primary</button>
            <button className="px-4 py-2 rounded-md bg-success-500 hover:bg-success-600 text-success-foreground">Success</button>
            <button className="px-4 py-2 rounded-md bg-warning-500 hover:bg-warning-600 text-warning-foreground">Warning</button>
            <button className="px-4 py-2 rounded-md bg-destructive-500 hover:bg-destructive-600 text-destructive-foreground">Destructive</button>
            <button className="px-4 py-2 rounded-md bg-info-500 hover:bg-info-600 text-info-foreground">Info</button>
            <button className="px-4 py-2 rounded-md border border-neutral-300 text-neutral-900 dark:text-neutral-50">Outline</button>
          </div>
          <div className="flex gap-3">
            <span className="px-2.5 py-0.5 text-body-xs rounded-md bg-primary-100 text-primary-800 border border-primary-200">Primary</span>
            <span className="px-2.5 py-0.5 text-body-xs rounded-md bg-success-100 text-success-800 border border-success-200">Success</span>
            <span className="px-2.5 py-0.5 text-body-xs rounded-md bg-warning-100 text-warning-800 border border-warning-200">Warning</span>
            <span className="px-2.5 py-0.5 text-body-xs rounded-md bg-destructive-100 text-destructive-800 border border-destructive-200">Destructive</span>
            <span className="px-2.5 py-0.5 text-body-xs rounded-md bg-info-100 text-info-800 border border-info-200">Info</span>
            <span className="px-2.5 py-0.5 text-body-xs rounded-md border border-neutral-300 text-neutral-700">Outline</span>
          </div>
        </div>
      </section>
    </div>
  ),
}

export const ThemeCustomizer = {
  render: () => {
    const [bg, setBg] = useState('#FFFFFF')
    const [fg, setFg] = useState('#0A0A0A')
    const [accent, setAccent] = useState('#4F6EF7')

    return (
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-h5 mb-4">Theme Customizer</h2>
          <p className="text-body-sm text-muted-foreground">Pick colors to see how components adapt.</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-label-md">Background</label>
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
            <p className="text-body-xs font-mono text-muted-foreground">{bg}</p>
          </div>
          <div className="space-y-2">
            <label className="text-label-md">Foreground</label>
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
            <p className="text-body-xs font-mono text-muted-foreground">{fg}</p>
          </div>
          <div className="space-y-2">
            <label className="text-label-md">Accent</label>
            <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
            <p className="text-body-xs font-mono text-muted-foreground">{accent}</p>
          </div>
        </div>
        <div className="p-6 rounded-lg border space-y-4" style={{ backgroundColor: bg, color: fg }}>
          <h3 className="text-h4 font-bold">Preview Card</h3>
          <p>This card adapts to your custom theme colors.</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: accent }}>Primary</button>
            <button className="px-4 py-2 rounded-md border" style={{ borderColor: accent, color: accent }}>Outline</button>
          </div>
        </div>
      </div>
    )
  },
}
