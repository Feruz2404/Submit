import colors from 'tailwindcss/colors'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        "rasm": "url('./src/assets/bg.jpg')",
      }
    },
    colors:{
      ...colors,
      primary: "crimson",
      lorem: "#0f0",
    },
    fontFamily:{
      "edu": ["Edu"],
      "dancing": ["Dancing", "sans-serif"],
    },
    container:{
      center: true,
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1040px',
        '2xl': '1180px',
      },
      padding: "1rem"
    }
  },
  plugins: [],
}