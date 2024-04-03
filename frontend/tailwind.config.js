/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"]
      },
      colors: {
        caution: "#FFC94A",
        teal: "#43766C"
      }
    },
  },
  plugins: [],
}

