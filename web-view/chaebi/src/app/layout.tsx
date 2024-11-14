import type { Metadata, Viewport } from 'next'
import ChosunNm from '@/utils/fonts'
import Logo from 'public/svg/logo.svg'
import './globals.css'

export const metadata: Metadata = {
  title: 'ChaeBi',
  description: '채우고 비우기, 채비',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${ChosunNm.variable} font-ChosunNm w-full h-screen`}>
        <div className="h-full flex flex-col">
          <header className="hidden md:flex w-full p-5 bg-_gray-800 justify-start shrink-0">
            <Logo />
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
