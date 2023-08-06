/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1424px',
      },
    },

    extend: {
      zIndex: {
        god: 9999999,
        demigod: 666666,
      },
      maxWidth: {
        '2xl': '1424px',
      },
      spacing: {
        xl: '144px',
      },
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
        'dark-gunmetal': '#1A202C',
        'sonic-silver': '#77777C',
      },

      fontFamily: {
        inter: ['Inter Variable', 'sans-serif'],
        'abc-arizona-sans': ['ABC Arizona Sans', 'sans-serif'],
        'abc-arizona-serif': ['ABC Arizona Serif', 'sans-serif'],
        'optiberling-agency': ['OPTIBerling Agency', 'sans-serif'],
      },
      fontSize: {
        'head-1': ['120px', { fontWeight: 500, lineHeight: '139.2px' }],
        'head-2': [
          '50px',
          { lineHeight: '60px', letterSpacing: '1px', fontWeight: 500 },
        ],
        'head-3': [
          '36px',
          { lineHeight: '42px', letterSpacing: '0.72px', fontWeight: 500 },
        ],
        'head-4': [
          '32px',
          { lineHeight: '37px', letterSpacing: '0.64px', fontWeight: 500 },
        ],
        'head-5': [
          '28px',
          { lineHeight: '37px', letterSpacing: '0.56px', fontWeight: 500 },
        ],
        'head-6': [
          '20px',
          { lineHeight: '24px', letterSpacing: '0.4px', fontWeight: 500 },
        ],
        'head-7': [
          '18px',
          { lineHeight: '21.6px', letterSpacing: '0.9px', fontWeight: 700 },
        ],
        'head-8': [
          '16px',
          { lineHeight: '19.2px', letterSpacing: '0.32px', fontWeight: 500 },
        ],

        'body-1': ['16px', { lineHeight: '27.2px' }],

        'title-1': ['16px', { lineHeight: '19.2px' }],
        'title-2': ['14px', { lineHeight: '16.8px' }],
        'title-3': ['10px', { lineHeight: '12px', fontWeight: 600 }],

        'subtitle-1': [
          '13px',
          { lineHeight: '15.6px', letterSpacing: '0.26px' },
        ],
        'subtitle-2': [
          '12px',
          { lineHeight: '14.4px', letterSpacing: '0.24px' },
        ],

        button: ['13px', { lineHeight: '15.6px', letterSpacing: '0.5%' }],
      },
    },
  },
  plugins: [],
};
