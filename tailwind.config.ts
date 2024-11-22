import animation from './src/styles/tailwind.animation';
import backgroundImage from './src/styles/tailwind.backgroundImage';
import boxShadow from './src/styles/tailwind.boxShadow';
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
      boxShadow,
      ...typography,
    },
  },
  safelist: ['bg-[#fb9b9b]', 'bg-[#85c8f5]', 'bg-[#cdf86f]'],
  plugins: [],
};
export default config;
