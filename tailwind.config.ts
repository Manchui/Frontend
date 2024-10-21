import colors from './src/styles/tailwind.colors';
import screens from './src/styles/tailwind.screens';
import typography from './src/styles/tailwind.typography';

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors,
      screens,
      typography,
      animation: {
        'modal-open': 'open 300ms ease-in-out forwards',
        'modal-close': 'close 300ms ease-in-out forwards',
      },
      keyframes: {
        open: {
          from: { opacity: '0%', transform: 'translateY(-20px)' },
          to: { opacity: '100%', transform: 'translateY(0)' },
        },
        close: {
          from: { opacity: '100%', transform: 'translateY(0)' },
          to: { opacity: '0%', transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
