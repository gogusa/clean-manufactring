/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0B2545',
          navyDark: '#071A2F',
          navyLight: '#133B5C',
          blue: '#0077B6',
          sky: '#00B4D8',
          cyan: '#00F0FF',
          ice: '#EBF4F6',
          emerald: '#10B981',
          accent: '#0284C7'
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "-apple-system", "sans-serif"],
        display: ["'Space Grotesk'", "'Plus Jakarta Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"]
      },
      boxShadow: {
        'glass': '0 8px 30px rgba(11, 37, 69, 0.06), 0 1px 3px rgba(11, 37, 69, 0.03)',
        'glass-hover': '0 16px 40px rgba(11, 37, 69, 0.12), 0 4px 12px rgba(11, 37, 69, 0.05)',
        'glow-blue': '0 0 25px rgba(0, 119, 182, 0.25)',
        'glow-cyan': '0 0 25px rgba(0, 240, 255, 0.35)',
      }
    },
  },
  plugins: [],
}
