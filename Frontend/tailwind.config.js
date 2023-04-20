/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode:'class',
  theme: {
    extend: {
        colors:{
          "lightMain": "var(--light-primary-color)",
          "lightSecond":"var(--light-secondary-color)",
          "lightFont":"var(--light-heading-color)",
          "darkMain":"var(--dark-primary-color)",
          "darkFont": "var(--dark-heading-color)",
          "darkSecond": "var(--dark-secondary-color)"
        },
        fontFamily:{
          inter:['"Inter"', ...defaultTheme.fontFamily.sans]
        }
    },
  },
  plugins: [],
}

