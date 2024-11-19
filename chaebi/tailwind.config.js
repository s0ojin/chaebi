/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './*.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        leeseoyoon: ['이서윤체', 'system-ui'],
        notosans: ['notosanskr', 'system-ui'],
      },
      colors: {
        _white: '#fafafa',
        _black: '#0a0a0a',
        _red: '#e10000',
        'primary-400': '#444444',
        'primary-300': '#808080',
        'primary-200': '#d9d9d9',
        'primary-100': '#f4f4f4',
      },
      backgroundColor: {
        _white: '#fafafa',
        _black: '#0a0a0a',
        _red: '#e10000',
        'primary-400': '#444444',
        'primary-300': '#808080',
        'primary-200': '#d9d9d9',
        'primary-100': '#f4f4f4',
      },
    },
  },
  plugins: [],
};
