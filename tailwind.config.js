// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  // CRITICAL: Tells Tailwind where to find your components
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  // If you installed DaisyUI, uncomment the line below:
  // plugins: [require('daisyui')],
}