/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  darkMode: 'class',
  mode: 'jit',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors : {
        'primary': '#F57966',
        'secondary': '#F7BBB1',
        'text-color-primary': '#625E5E',
        'text-color-secondary': '#755954',
        'fill-color': '#FFE4DF',
        'gray': colors.trueGray,
      },
    },
  },
  plugins: [],
}
