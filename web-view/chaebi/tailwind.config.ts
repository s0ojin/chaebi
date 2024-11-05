import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        ChosunNm: ['var(--font-ChosunNm)', 'sans-serif'],
      },
      colors: {
        primary: '#444444',
        _black: '#0A0A0A',
        _white: '#FAFAFA',
        '_gray-100': '#F4F4F4',
        '_gray-200': '#D2D2D2',
        '_gray-300': '#808080',
      },
      lineHeight: {
        _46: '46px',
      },
    },
    boxShadow: {
      inner: 'inset 0 0 0 2px #F4F4F4',
    },
  },
  plugins: [],
}
export default config
