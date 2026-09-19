/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          950: '#320614',
          900: '#4A0E22',
          800: '#5C122C',
          700: '#751437',
          600: '#8E1843',
          500: '#A81F51',
        },
        bloom: {
          rose: '#D61C7C',       // Primary vibrant hot pink / rose
          'rose-hover': '#BF156C',
          'rose-light': '#FCE4F0',
          'rose-border': '#F8BBD0',
          wine: '#751437',       // Dark wine/burgundy for text & header
          'wine-dark': '#550E28',
          blush: '#FFF0F5',      // Background blush
          'blush-card': '#FFF5F8',
          'blush-soft': '#FDF2F7',
          'blush-dark': '#FADBE7',
          pastel: '#FCE7F0',
          cream: '#FFFDF9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'soft-card': '0 4px 20px -2px rgba(214, 28, 124, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-hover': '0 10px 30px -4px rgba(214, 28, 124, 0.16), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
        'glow-pink': '0 0 25px rgba(214, 28, 124, 0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
