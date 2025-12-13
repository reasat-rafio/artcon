/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts,tsx}'],
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
        '3xl': '1600px',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1424px',
      '3xl': '1600px',
    },
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 0px 30px rgba(0, 0, 0, 1)',
          '0 4px 12px rgba(0, 0, 0, 0.8)',
          '0 8px 24px rgba(0, 0, 0, 0.7)',
        ],
      },
      zIndex: {
        god: 9999999,
        demigod: 666666,
      },
      maxWidth: {
        '2xl': '1424px',
        section: '1500px',
      },
      spacing: {
        xl: '144px',
        lg: '80px',
        md: '50px',
        sm: '40px',
      },
      borderRadius: {
        lg: '20px',
        xl: '25px',
        '2xl': '64px',
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
        'eerie-black': '#1B1B1E',
        'rich-black': '#020202',
        'raisin-black': '#1d1d25',
        'cultured-gray': '#F8F8F8',
        'sonic-silver': '#77777C',
        'quick-silver': '#A5A5A8',
        'quartz-silver': '#4A4A51',
        'light-gray': '#D2D2D3',
        'taupe-gray': '#888888',
        'pigment-red': '#ED1C24',
        'imperial-red': '#EA234080',
        platinum: '#E8E6E3',
        alabaster: '#F5EEE6',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        'optiberling-agency': ['OPTIBerling-Agency', 'sans-serif'],
      },
      fontSize: {
        'head-1': ['120px', { lineHeight: '139.2px' }],
        'head-2': ['50px', { lineHeight: '60px', letterSpacing: '1px' }],
        'head-3': ['36px', { lineHeight: '42px', letterSpacing: '0.72px' }],
        'head-4': ['32px', { lineHeight: '37px', letterSpacing: '0.64px' }],
        'head-5': ['28px', { lineHeight: '37px', letterSpacing: '0.56px' }],
        'head-6': ['20px', { lineHeight: '24px', letterSpacing: '0.4px' }],
        'head-7': ['18px', { lineHeight: '21.6px', letterSpacing: '0.9px' }],
        'head-8': ['16px', { lineHeight: '19.2px', letterSpacing: '0.32px' }],

        'body-1': ['16px', { lineHeight: '27.2px' }],
        'body-2': ['14px', { lineHeight: '23.1px' }],

        'title-1': ['16px', { lineHeight: '19.2px' }],
        'title-2': ['14px', { lineHeight: '16.8px' }],
        'title-3': ['10px', { lineHeight: '12px' }],

        'subtitle-1': [
          '13px',
          { lineHeight: '15.6px', letterSpacing: '0.26px' },
        ],
        'subtitle-2': [
          '12px',
          { lineHeight: '14.4px', letterSpacing: '0.24px' },
        ],

        button: ['13px', {}],
      },
    },
  },
  plugins: [],
};
