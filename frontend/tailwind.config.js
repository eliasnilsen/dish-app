/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        offBlack: "#262626",
        caution: "#FFC94A",
        teal: "#43766C",
        borderPrimary: "#000000"
      },
    },
  },
  plugins: [],
}

