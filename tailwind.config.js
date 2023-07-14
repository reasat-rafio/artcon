/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      red: {
        200: 'rgba(234, 35, 64, 0.20)',
        400: 'rgba(234, 35, 64, 0.40)',
        600: 'rgba(234, 35, 64, 0.60)',
        800: 'rgba(234, 35, 64, 0.80)',
        900: 'rgba(234, 35, 64, 1)',
      },
      'off-white': {
        200: 'rgba(245, 238, 230, 0.20)',
        400: 'rgba(245, 238, 230, 0.40)',
        600: 'rgba(245, 238, 230, 0.60)',
        800: 'rgba(245, 238, 230, 0.80)',
        900: 'rgba(245, 238, 230, 1)',
      },
      black: {
        200: 'rgba(29, 29, 37, 0.20)',
        400: 'rgba(29, 29, 37, 0.40)',
        600: 'rgba(29, 29, 37, 0.60)',
        800: 'rgba(29, 29, 37, 0.80)',
        900: 'rgba(29, 29, 37, 1)',
      },
      white: '#FFFFFF',
    },
    extend: {
      fontFamily: {
        inter: ['Inter Variable', 'sans-serif'],
        'optiberling-agency': ['OPTIBerling Agency', 'sans-serif'],
      },
      fontSize: {
        'head-1': ['120px', { lineHeight: '116%' }],
        'head-2': ['32px', { lineHeight: '110%', letterSpacing: '2%' }],
        'head-3': ['28px', { lineHeight: '120%', letterSpacing: '2%' }],
        'head-4': ['20px', { lineHeight: '120%', letterSpacing: '2%' }],
        'head-5': ['16px', { lineHeight: '120%', letterSpacing: '2%' }],

        title: ['14px', { lineHeight: '120%' }],
        subtitle: ['12px', { lineHeight: '120%', letterSpacing: '2%' }],

        button: ['13px', { lineHeight: '120%', letterSpacing: '0.5%' }],
      },
    },
  },
  plugins: [],
};
