/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'draw': 'draw 2s ease-in-out infinite',
      },
      keyframes: {
        draw: {
          '0%': { 'stroke-dasharray': '0 200' },
          '50%': { 'stroke-dasharray': '200 0' },
          '100%': { 'stroke-dasharray': '0 200' },
        }
      },
    },
  },
  plugins: [],
} 