/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter Variable', 'sans-serif'],
        'optiberling-agency': ['OPTIBerling Agency', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
