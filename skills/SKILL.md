---
title: DS-OneBox Impeccable Skill
description: Design skill for DS-OneBox that combines component library expertise with design best practices
version: 1.0.0
updated: 2026-01-01
skill_version: "3.0"
author: DS-OneBox Team
builds_on:
  - ds-onebox-components
  - impeccable-frontend-design
---

# DS-OneBox Impeccable Skill

## Overview

DS-OneBox Impeccable é a fusão do poder do DS-OneBox (componentes, tokens, workflow) com a expertise de design do Impeccable. Este skill ensina IA a criar interfaces bonitas e consistentes usando os componentes e tokens do DS-OneBox.

## How This Skill Works

DS-OneBox Impeccable funciona em 3 camadas:

```
┌─────────────────────────────────────────────────┐
│            CAMADA 3: Commands                   │
│  /ds-audit  /ds-extract  /ds-teach  /ds-polish │
├─────────────────────────────────────────────────┤
│            CAMADA 2: References                 │
│  typography  color  spatial  motion  ux-writing│
├─────────────────────────────────────────────────┤
│            CAMADA 1: Foundation                 │
│  DS-OneBox Components + Tokens + Skills        │
└─────────────────────────────────────────────────┘
```

## Quick Start

1. **READ FIRST**: Sempre leia `skills/RESOLVER.md` antes de usar componentes
2. **USE COMPONENTS**: Use componentes do DS-OneBox, não construa do zero
3. **FOLLOW WORKFLOWS**: Siga os workflows em `skills/FORMS.md`, `skills/DATA.md`, etc.
4. **CHECK TOKENS**: Use tokens de cor e tipografia do DS, não valores hardcoded
5. **AUDIT**: Use `/ds-audit` antes de considerar uma tela pronta

## Core Principle: Shape Before Build

Semelhante ao Impeccable, DS-OneBox Impeccable segue o princípio **Shape Before Build**:

```
1. SHAPE  → Planear UX/UI mentalmente
2. CHOOSE → Selecionar componentes do DS-OneBox
3. COMPOSE → Juntar componentes seguindo workflows
4. STYLE  → Aplicar tokens do DS-OneBox
5. POLISH → Refinar com /ds-polish
```

## The 7 Design References

| Reference | Purpose | When to Read |
|---|---|---|
| [typography](reference/typography.md) | Font hierarchy, sizes, weights | Before any text element |
| [color-contrast](reference/color-contrast.md) | Color tokens, contrast ratios | Before any color decision |
| [spatial-design](reference/spatial-design.md) | Spacing, layout rhythm | Before layout decisions |
| [motion-design](reference/motion-design.md) | Animations, transitions | Before adding motion |
| [interaction-design](reference/interaction-design.md) | Forms, focus, loading | Before interactive elements |
| [responsive-design](reference/responsive-design.md) | Breakpoints, mobile-first | Before responsive layouts |
| [ux-writing](reference/ux-writing.md) | Labels, errors, empty states | Before any copy |

## The 4 Commands

### /ds-audit

Verifica se o código está usando DS-OneBox corretamente.

```bash
/ds-audit src/components/
```

**O que verifica:**
- ✅ Componentes do DS-OneBox sendo usados
- ✅ Tokens de cor (não hardcoded)
- ✅ Form workflow (Zod + RHF)
- ✅ Chart colors (HEX, não hsl)
- ❌ Anti-patterns conhecidos

### /ds-extract

Extrai componentes genéricos e sugere equivalentes do DS-OneBox.

```bash
/ds-extract src/
```

**O que faz:**
- Detecta `<div onClick>` → sugere `<Button />`
- Detecta `useState` para form → sugere `Form + Zod + RHF`
- Detecta `toast` manual → sugere `toast()` do DS
- Detecta `table.map()` → sugere `<Table />` ou `<DataTable />`

### /ds-teach

Gera PRODUCT.md e DESIGN.md baseado nos tokens e componentes do DS-OneBox.

```bash
/ds-teach
```

**O que faz:**
- Analisa tokens em uso
- Mapeia componentes usados
- Gera DESIGN.json com compliance score
- Sugere gaps no uso do DS

### /ds-polish

Refina código para alinhar com DS-OneBox e princípios de design.

```bash
/ds-polish src/components/Dashboard.tsx
```

**O que faz:**
- Substitui valores hardcoded por tokens
- Adiciona estados de loading/error/empty
- Refina espaçamento e hierarquia visual
- Adiciona animações de transição

## Anti-Patterns Specific to DS-OneBox

### ❌ NEVER Do

1. **Chart com cores hsl**
   ```tsx
   // ❌ ERRADO
   const config = { color: 'hsl(var(--primary))' }

   // ✅ CERTO
   const config = { color: '#2563eb' }
   ```

2. **Button dentro de AccordionTrigger**
   ```tsx
   // ❌ ERRADO
   <AccordionTrigger><Switch /> Título</AccordionTrigger>

   // ✅ CERTO
   <AccordionTrigger interactiveContent>
     <Flex align="center" className="w-full">
       <span>Título</span>
       <Switch />
     </Flex>
   </AccordionTrigger>
   ```

3. **Table para > 50 linhas**
   ```tsx
   // ❌ ERRADO
   {bigData.map(item => <TableRow />)}

   // ✅ CERTO — use DataTable com TanStack
   ```

4. **Form sem Zod + RHF**
   ```tsx
   // ❌ ERRADO
   const [name, setName] = useState('')
   <input value={name} onChange={e => setName(e.target.value)} />

   // ✅ CERTO
   <Form><FormField name="name" render={({ field }) => (
     <Input {...field} />
   )} /></Form>
   ```

5. **Toast manual sem usar a API**
   ```tsx
   // ❌ ERRADO
   <div className="toast">{message}</div>

   // ✅ CERTO
   toast.success('Mensagem salva!')
   ```

6. **Spacing hardcoded**
   ```tsx
   // ❌ ERRADO
   <div style={{ padding: '16px' }}>

   // ✅ CERTO
   <div className="p-4">
   // ou use tokens do DS
   ```

7. **Sidebar sem SidebarProvider**
   ```tsx
   // ❌ ERRADO
   <Sidebar><Nav /></Sidebar>

   // ✅ CERTO
   <SidebarProvider>
     <div className="flex h-screen overflow-hidden">
       <Sidebar><Nav /></Sidebar>
       <main />
     </div>
   </SidebarProvider>
   ```

## Workflow Integration

O DS-OneBox Impeccable funciona junto com os skills existentes:

| Task | Skill to Read |
|---|---|
| Criar formulário | `skills/FORMS.md` |
| Criar tabela/gráfico | `skills/DATA.md` |
| Criar layout | `skills/LAYOUT.md` |
| Adicionar feedback | `skills/FEEDBACK.md` |
| Design de tipografia | `reference/typography.md` |
| Design de cores | `reference/color-contrast.md` |
| Design de espaço | `reference/spatial-design.md` |
| Design de motion | `reference/motion-design.md` |
| Design de UX writing | `reference/ux-writing.md` |

## Decision Tree

```
Preciso criar uma UI
├── É um formulário? → skills/FORMS.md
├── É uma tabela/gráfico? → skills/DATA.md
├── É um layout? → skills/LAYOUT.md
├── É feedback/notificação? → skills/FEEDBACK.md
└── Como deve ficar? → reference/
    ├── Texto está ruim? → typography.md
    ├── Cores estão erradas? → color-contrast.md
    ├── Espaçamento está estranho? → spatial-design.md
    ├── Falta vida? → motion-design.md
    └── Texto está confuso? → ux-writing.md
```

## Success Criteria

Uma tela está **DS-OneBox Compliant** quando:

- [ ] Usa componentes do DS-OneBox (não construiu do zero)
- [ ] Usa tokens de cor (não hardcoded)
- [ ] Segue workflow correto (ex: Form + Zod + RHF)
- [ ] Não tem anti-patterns conhecidos
- [ ] Passa em `/ds-audit`
- [ ] Tem estados de loading/error/empty
- [ ] Segue hierarquia de tipografia
- [ ] Tem contraste adequado

## Files in This Skill

```
skills/
├── SKILL.md                      ← Você está aqui
├── reference/
│   ├── typography.md             ← Tipografia do DS
│   ├── color-contrast.md          ← Cores do DS
│   ├── spatial-design.md         ← Espaçamento do DS
│   ├── motion-design.md          ← Animações do DS
│   ├── interaction-design.md     ← Interação do DS
│   ├── responsive-design.md      ← Responsivo do DS
│   └── ux-writing.md             ← UX Writing do DS
└── commands/
    ├── ds-audit.md              ← Audit command
    ├── ds-extract.md             ← Extract command
    ├── ds-teach.md               ← Teach command
    └── ds-polish.md              ← Polish command
```
