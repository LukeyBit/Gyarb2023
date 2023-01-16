/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'lobster': ['Lobster', 'cursive'],
        'roboto-slab': ['Roboto Slab', 'serif'],
        'cambo': ['Cambo', 'serif'],
      },
      colors : {
        'primary': '#F57966',
        'secondary': '#F7BBB1',
        'text-color-primary': '#292727',
        'text-color-secondary': '#4D3A37',
        'fill-color': '#FFE4DF',
        'trueGray': colors.trueGray,
      },
    },
  },
  plugins: [],
}
