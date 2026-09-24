/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        foreground: '#0b132b',
        accent: '#06b6d4',
        skyLight: '#f0f7ff',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'Albert Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Fragment Mono', 'Geist Mono', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.085em',
      }
    },
  },
  plugins: [],
}
