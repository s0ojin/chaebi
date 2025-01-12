import type { Metadata, Viewport } from 'next'
import { ChosunNm } from '@/utils/fonts'
import LogoIcon from 'public/svg/logo.svg'
import './globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
      <body
        className={`${ChosunNm.variable} font-ChosunNm w-full h-screen overflow-auto`}
      >
        <div className="h-screen flex flex-col relative">
          <header className="hidden md:flex w-full p-5 bg-_gray-800 justify-start shrink-0">
            <LogoIcon />
          </header>
          <main className="flex-1">{children}</main>
          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      </body>
    </html>
  )
}
