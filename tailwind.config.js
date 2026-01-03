/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: '#00E5FF',
          500: '#00B8D4',
        },
        dark: {
          900: '#0a0a0a',
          800: '#121212',
          950: '#050505',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      backgroundImage: {
        'cyber-grid': "linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}