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
        blue: "#51829B",
        lightBlue: "#9BB0C1",
        orange: "#F6995C",
        beige: "#EADFB4",
        teal: "#43766C"
      }
    },
  },
  plugins: [],
}

