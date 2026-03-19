/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#07664b',
          light: '#0a8a63',
          dark: '#054d38',
          darker: '#032e21',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#e8c96a',
          dark: '#a8883e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
