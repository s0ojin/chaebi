import localFont from 'next/font/local'

const LeeSeoyun = localFont({
  src: [
    {
      path: '../../public/fonts/LeeSeoyun.woff',
      weight: '400',
    },
  ],
  display: 'swap',
  variable: '--font-LeeSeoyun',
})

export default LeeSeoyun
