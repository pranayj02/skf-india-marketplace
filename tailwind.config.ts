import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'skf-blue':        '#003366',
        'skf-blue-mid':    '#004d99',
        'skf-blue-light':  '#0066cc',
        'skf-blue-pale':   '#e8f0f8',
        'skf-red':         '#E31B23',
        'skf-red-dark':    '#c01018',
        'skf-grey':        '#f8fafc',
        'skf-border':      '#e2e8f0',
        'skf-border-mid':  '#cbd5e1',
        'skf-text':        '#1a2535',
        'skf-muted':       '#64748b',
        'skf-subtle':      '#94a3b8',
      },
      fontFamily: {
        display: ['SKF Display', 'Segoe UI', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['SKF Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'skf':        '0 1px 4px rgba(0,51,102,0.08), 0 2px 12px rgba(0,51,102,0.06)',
        'skf-card':   '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,51,102,0.07)',
        'skf-nav':    '0 1px 0 #e2e8f0',
        'skf-modal':  '0 8px 40px rgba(0,51,102,0.14)',
      },
      animation: {
        'count-up': 'countUp 1.5s ease-out forwards',
        'fade-in':  'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
      },
      keyframes: {
        countUp:  { from: { opacity: '0', transform: 'translateY(8px)' },  to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp:  { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
export default config
