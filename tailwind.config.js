/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        stellar: {
          950: '#020818',
          900: '#040d24',
          800: '#071030',
          700: '#0a1a45',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
      },
      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.2' },
          '50%':      { opacity: '0.8' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        'slide-reveal': {
          '0%':   { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59,130,246,0.15)' },
          '50%':      { boxShadow: '0 0 40px rgba(59,130,246,0.30)' },
        },
        'scan-line': {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        'bg-breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.06)' },
        },
        'zoom-breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%':      { transform: 'scale(1.14)' },
        },
        'nebula-pulse': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.18)' },
        },
        'drift': {
          '0%':        { transform: 'translate(0px, 0px)' },
          '33%':       { transform: 'translate(6px, -8px)' },
          '66%':       { transform: 'translate(-4px, 5px)' },
          '100%':      { transform: 'translate(0px, 0px)' },
        },
      },
      animation: {
        'fade-up':      'fade-up 0.7s ease forwards',
        'fade-up-d1':   'fade-up 0.7s 0.15s ease forwards',
        'fade-up-d2':   'fade-up 0.7s 0.30s ease forwards',
        'fade-up-d3':   'fade-up 0.7s 0.45s ease forwards',
        'fade-up-d4':   'fade-up 0.7s 0.60s ease forwards',
        'fade-in':      'fade-in 1s ease forwards',
        'twinkle':      'twinkle 3s ease-in-out infinite',
        'twinkle-slow': 'twinkle 5s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
        'slide-reveal': 'slide-reveal 0.6s ease forwards',
        'glow-pulse':   'glow-pulse 3s ease-in-out infinite',
        'scan-line':    'scan-line 2s linear infinite',
        'bg-breathe':   'bg-breathe 18s ease-in-out infinite',
        'zoom-breathe': 'zoom-breathe 14s ease-in-out infinite',
        'nebula-pulse': 'nebula-pulse 10s ease-in-out infinite',
        'drift':        'drift 28s ease-in-out infinite',
        'drift-slow':   'drift 40s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
