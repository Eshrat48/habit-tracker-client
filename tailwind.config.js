// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './public/**/*.html',
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  // FIX: Remove the daisyui block or set themes: true
  // If you keep this block, set themes to true or an array:
  daisyui: {
    themes: true, // ⬅️ Change this to true!
  },
};