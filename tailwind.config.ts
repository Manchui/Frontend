import animation from './src/styles/tailwind.animation';
import backgroundImage from './src/styles/tailwind.backgroundImage';
import colors from './src/styles/tailwind.colors';
import height from './src/styles/tailwind.height';
import inset from './src/styles/tailwind.inset';
import keyframes from './src/styles/tailwind.keyframes';
import screens from './src/styles/tailwind.screens';
import typography from './src/styles/tailwind.typography';
import width from './src/styles/tailwind.width';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './.storybook/preview.js',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors,
      screens,
      keyframes,
      animation,
      height,
      width,
      inset,
      backgroundImage,
      ...typography,
    },
    keyframes: {
      animateTop: {
        '25%': { width: '100%', opacity: '1' },
        '30%, 100%': { opacity: '0' },
      },
      animateBottom: {
        '0%, 50%': { opacity: '0', width: '0' },
        '75%': { opacity: '1', width: '100%' },
        '76%, 100%': { opacity: '0' },
      },
      animateRight: {
        '0%, 25%': { opacity: '0', height: '0' },
        '50%': { opacity: '1', height: '100%' },
        '55%, 100%': { opacity: '0', height: '100%' },
      },
      animateLeft: {
        '0%, 75%': { opacity: '0', height: '0' },
        '100%': { opacity: '1', height: '100%' },
      },
    },
    animation: {
      animateTop: 'animateTop 3s ease-in-out infinite',
      animateBottom: 'animateBottom 3s ease-in-out infinite',
      animateRight: 'animateRight 3s ease-in-out infinite',
      animateLeft: 'animateLeft 3s ease-in-out infinite',
    },
  },
  plugins: [],
};
export default config;
