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

const SoBangGwan = localFont({
  src: [
    {
      path: '../../public/fonts/SoBangGwan.ttf',
      weight: '400',
    },
  ],
  display: 'swap',
  variable: '--font-SoBangGwan',
})

const NotoSansKR = localFont({
  src: [
    {
      path: '../../public/fonts/NotoSansKR.ttf',
      weight: '400',
    },
  ],
  display: 'swap',
  variable: '--font-NotoSansKR',
})

export { ChosunNm, SoBangGwan, NotoSansKR }
