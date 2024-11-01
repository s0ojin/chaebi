import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        LeeSeoyun: ['var(--font-LeeSeoyun)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
