import type { Metadata } from 'next'
import pretendard from '@/utils/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChaeBi',
  description: '채우고 비우기, 채비',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard w-full`}>
        {children}
      </body>
    </html>
  )
}
