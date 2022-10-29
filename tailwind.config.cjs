/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: { screens: { xs: '380px', sm: '480px' } },
  },
  plugins: [],
};
