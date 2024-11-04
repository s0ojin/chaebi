import type { Metadata } from 'next'
import ChosunNm from '@/utils/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChaeBi',
  description: '채우고 비우기, 채비',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${ChosunNm.variable} font-ChosunNm w-full`}>
        {children}
      </body>
    </html>
  )
}
