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
    },
  },
  plugins: [],
};
export default config;
