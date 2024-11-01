import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        LeeSeoyun: ['var(--font-LeeSeoyun)', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        primary: '#444444',
        _black: '#0A0A0A',
        _white: '#FAFAFA',
        '_gray-100': '#F4F4F4',
        '_gray-200': '#D2D2D2',
        '_gray-300': '#808080',
      },
    },
  },
  plugins: [],
}
export default config
