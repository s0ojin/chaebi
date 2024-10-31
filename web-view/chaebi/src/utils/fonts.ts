import localFont from 'next/font/local'

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Regular.woff',
      weight: '400',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.woff',
      weight: '500',
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.woff',
      weight: '600',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.woff',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
})

export default pretendard
