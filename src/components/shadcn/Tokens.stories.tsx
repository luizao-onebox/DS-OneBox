/**
 * Design Tokens - Visual documentation for all design system values.
 * This story provides a comprehensive overview of all design tokens.
 */
import { useState } from 'react'

const colors = [
  { name: 'Background', hex: '#FFFFFF', description: 'Main background' },
  { name: 'Foreground', hex: '#0A0A0A', description: 'Primary text' },
  { name: 'Primary', hex: '#4F6EF7', description: 'Primary actions' },
  { name: 'Primary Foreground', hex: '#F8FAFC', description: 'Text on primary' },
  { name: 'Secondary', hex: '#F1F5F9', description: 'Secondary elements' },
  { name: 'Secondary Foreground', hex: '#111827', description: 'Text on secondary' },
  { name: 'Muted', hex: '#F1F5F9', description: 'Muted backgrounds' },
  { name: 'Muted Foreground', hex: '#6B7280', description: 'Muted text' },
  { name: 'Accent', hex: '#F1F5F9', description: 'Accent backgrounds' },
  { name: 'Accent Foreground', hex: '#111827', description: 'Text on accent' },
  { name: 'Destructive', hex: '#EF4444', description: 'Destructive actions' },
  { name: 'Border', hex: '#E2E8F0', description: 'Borders' },
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
        <h1 className="text-2xl font-bold mb-2">Design Tokens</h1>
        <p className="text-muted-foreground">Source of truth for all visual design values.</p>
      </div>

      {/* Colors */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Colors</h2>
        <div className="grid grid-cols-4 gap-4">
          {colors.map((c) => (
            <div key={c.name} className="space-y-2">
              <div className="h-12 rounded-lg border shadow-sm" style={{ backgroundColor: c.hex }} />
              <p className="font-medium text-sm">{c.name}</p>
              <p className="text-xs font-mono text-muted-foreground">{c.hex}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Typography</h2>
        <div className="space-y-3">
          <p className="text-xs">Extra Small (12px) - Labels and captions</p>
          <p className="text-sm">Small (14px) - Secondary text</p>
          <p className="text-base">Base (16px) - Primary text</p>
          <p className="text-lg">Large (18px) - Subtitles</p>
          <p className="text-xl">Extra Large (20px) - Section titles</p>
          <p className="text-2xl">2XL (24px) - Page titles</p>
        </div>
      </section>

      {/* Spacing */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Spacing</h2>
        <div className="space-y-3">
          {spacing.map((s) => (
            <div key={s} className="flex items-center gap-4">
              <span className="w-12 text-sm text-muted-foreground">{s}px</span>
              <div className="h-4 bg-primary rounded" style={{ width: `${s}px` }} />
            </div>
          ))}
        </div>
      </section>

      {/* Border Radius */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Border Radius</h2>
        <div className="flex gap-6">
          {radius.map((r) => (
            <div key={r.name} className="text-center">
              <div className="w-16 h-16 bg-primary mb-2" style={{ borderRadius: r.value }} />
              <p className="text-sm font-medium">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Shadows */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Shadows</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="p-4 bg-background rounded-lg border shadow-sm">
            <p className="font-medium">sm</p>
            <p className="text-xs text-muted-foreground">Subtle elevation</p>
          </div>
          <div className="p-4 bg-background rounded-lg border shadow">
            <p className="font-medium">default</p>
            <p className="text-xs text-muted-foreground">Cards</p>
          </div>
          <div className="p-4 bg-background rounded-lg border shadow-md">
            <p className="font-medium">md</p>
            <p className="text-xs text-muted-foreground">Dropdowns</p>
          </div>
          <div className="p-4 bg-background rounded-lg border shadow-lg">
            <p className="font-medium">lg</p>
            <p className="text-xs text-muted-foreground">Modals</p>
          </div>
          <div className="p-4 bg-background rounded-lg border shadow-xl">
            <p className="font-medium">xl</p>
            <p className="text-xs text-muted-foreground">Popovers</p>
          </div>
        </div>
      </section>

      {/* Components with Tokens */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Components Preview</h2>
        <div className="space-y-4">
          <div className="flex gap-3">
            <button className="px-4 py-2 rounded-md bg-primary text-primary-foreground">Primary</button>
            <button className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground">Secondary</button>
            <button className="px-4 py-2 rounded-md bg-destructive text-destructive-foreground">Destructive</button>
            <button className="px-4 py-2 rounded-md border border-input">Outline</button>
          </div>
          <div className="flex gap-3">
            <span className="px-2.5 py-0.5 text-xs rounded-md bg-primary text-primary-foreground">Badge</span>
            <span className="px-2.5 py-0.5 text-xs rounded-md bg-secondary text-secondary-foreground">Secondary</span>
            <span className="px-2.5 py-0.5 text-xs rounded-md bg-destructive text-destructive-foreground">Destructive</span>
            <span className="px-2.5 py-0.5 text-xs rounded-md border">Outline</span>
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
          <h2 className="text-lg font-semibold mb-4">Theme Customizer</h2>
          <p className="text-sm text-muted-foreground">Pick colors to see how components adapt.</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Background</label>
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
            <p className="text-xs font-mono text-muted-foreground">{bg}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Foreground</label>
            <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
            <p className="text-xs font-mono text-muted-foreground">{fg}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Accent</label>
            <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
            <p className="text-xs font-mono text-muted-foreground">{accent}</p>
          </div>
        </div>
        <div className="p-6 rounded-lg border space-y-4" style={{ backgroundColor: bg, color: fg }}>
          <h3 className="text-xl font-bold">Preview Card</h3>
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