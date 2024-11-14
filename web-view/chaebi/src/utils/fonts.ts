import localFont from 'next/font/local'

const ChosunNm = localFont({
  src: [
    {
      path: '../../public/fonts/ChosunNm.woff',
      weight: '400',
    },
  ],
  display: 'swap',
  variable: '--font-ChosunNm',
})

export default ChosunNm
