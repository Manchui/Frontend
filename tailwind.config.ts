/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      black: '#1B1B1B',
      white: '#ffffff',
      gray: {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
        950: '#030713',
      },
      red: {
        600: '#DC2626',
      },
      orange: {
        50: '#FFF4E8',
        100: '#FFEDD5',
        200: '#FED7AA',
        300: '#FDBA74',
        400: '#FB923C',
        500: '#F97316',
        600: '#EA580C',
        700: '#C2410C',
        800: '#9A3412',
        900: '#7C2D12',
        950: '#431407',
      },
    },
    screens: {
      mobile: '424px',
      tablet: '768px',
      pc: '1240px',
    },
    fontSize: {
      'xs': ['12px', '18px'],
      'sm': ['13px', '22px'],
      'md': ['14px', '24px'],
      'lg': ['16px', '26px'],
      '2lg': ['18px', '26px'],
      'xl': ['20px', '32px'],
      '2xl': ['24px', '32px'],
      '3xl': ['32px', '42px'],
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  plugins: [],
};
export default config;
