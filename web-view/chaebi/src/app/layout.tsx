import type { Metadata } from 'next'
import LeeSeoyun from '@/utils/fonts'
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
      <body className={`${LeeSeoyun.variable} font-LeeSeoyun w-full`}>
        {children}
      </body>
    </html>
  )
}
