import type { Config } from 'tailwindcss'
import aspectRatio from '@tailwindcss/aspect-ratio'

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
      stroke: {
        _white: '#FAFAFA',
      },
      strokeWidth: {
        '0.5': '.0313rem',
      },
      lineHeight: {
        _46: '2.875rem',
      },
      spacing: {
        _72: '4.5rem',
        _74: '4.625rem',
        _140: '8.75rem',
      },
      boxShadow: {
        inner: 'inset 0 0 0 2px #F4F4F4',
      },
    },
  },
  plugins: [aspectRatio],
}
export default config
