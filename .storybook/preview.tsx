import type { Preview } from '@storybook/react'
import { withThemeByClassName } from '@storybook/addon-themes'
import React from 'react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Introdução', 'Design Tokens', 'Blocks', 'Components'],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // Desativa o fundo nativo para usar o do Tailwind
    },
    layout: 'padded', 
  },
  decorators: [
    (Story) => (
      // Força a tela inteira do Storybook a adotar as cores do tema ativo
      <div className="bg-background text-foreground min-h-screen w-full transition-colors duration-300">
        <Story />
      </div>
    ),
    // Configuração OFICIAL do addon-themes que obriga o botão a aparecer na Toolbar do topo
    withThemeByClassName({
      themes: {
        light: 'light',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
}

export default preview
