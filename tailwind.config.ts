import animation from './src/styles/tailwind.animation';
import colors from './src/styles/tailwind.colors';
import keyframes from './src/styles/tailwind.keyframes';
import screens from './src/styles/tailwind.screens';
import typography from './src/styles/tailwind.typography';

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
      typography,
      keyframes,
      animation,
    },
  },
  plugins: [],
};
export default config;
