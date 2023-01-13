/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.html',
    './src/**/*.jsx',
    './src/**/*.js',
  ],
  theme: {
    extend: {
      colors : {
        'primary': '#1E90FF',
        'secondary': '#FF1493',
        'danger': '#DC143C',
      }
    },
  },
  plugins: [],
}
