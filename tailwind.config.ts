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
        'skf-blue':   '#003366',
        'skf-blue-mid': '#004d99',
        'skf-blue-light': '#0066cc',
        'skf-red':    '#E8001D',
        'skf-orange': '#FF6B00',
        'skf-grey':   '#F4F6F9',
        'skf-border': '#D1D9E6',
        'skf-text':   '#1A2535',
        'skf-muted':  '#6B7A99',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'skf': '0 4px 24px rgba(0,51,102,0.10)',
        'skf-lg': '0 8px 40px rgba(0,51,102,0.15)',
        'skf-card': '0 2px 12px rgba(0,51,102,0.08)',
      },
      animation: {
        'count-up': 'countUp 1.5s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        countUp: { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
export default config
