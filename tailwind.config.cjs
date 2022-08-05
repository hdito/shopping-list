/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],  theme: {
    screens:{xs:"380px",sm:"480px"},
    extend: {},
  },
  plugins: [],
}
