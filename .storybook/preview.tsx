import type { Preview } from '@storybook/react'
import React, { useState, useEffect } from 'react'
import '../src/index.css'

const ThemeToggle = ({ theme, onToggle }: { theme: string; onToggle: () => void }) => (
  <div style={{
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 99999,
    display: 'flex',
    gap: '4px',
    padding: '4px',
    background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    border: '1px solid',
    borderColor: theme === 'dark' ? '#333' : '#e5e5e5',
  }}>
    <button
      onClick={onToggle}
      style={{
        padding: '6px 12px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 500,
        background: theme === 'light' ? '#4F6EF7' : 'transparent',
        color: theme === 'light' ? 'white' : '#888',
        transition: 'all 0.2s',
      }}
    >
      ☀️ Light
    </button>
    <button
      onClick={onToggle}
      style={{
        padding: '6px 12px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 500,
        background: theme === 'dark' ? '#4F6EF7' : 'transparent',
        color: theme === 'dark' ? 'white' : '#888',
        transition: 'all 0.2s',
      }}
    >
      🌙 Dark
    </button>
  </div>
)

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const [theme, setTheme] = useState('light')

      useEffect(() => {
        const root = document.documentElement
        if (theme === 'dark') {
          root.classList.add('dark')
        } else {
          root.classList.remove('dark')
        }
      }, [theme])

      const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light')

      return (
        <div style={{
          minHeight: '100vh',
          background: theme === 'dark' ? '#0a0a0a' : '#ffffff',
          transition: 'background 0.3s',
        }}>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <div style={{ padding: '20px' }}>
            <Story />
          </div>
        </div>
      )
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0a0a0a' },
      ],
    },
  },
}

export default preview
