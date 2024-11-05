'use client'

import { LogoWhite } from '../../public/svg/index'
import MemorialMessage from '@/components/ui/MemorialMessage'
import CodeInput from '@/components/ui/CodeInput'
import NextButton from '@/components/ui/NextButton'

export default function Home() {
  return (
    <div className="min-h-screen h-screen w-screen overflow-hidden flex flex-col">
      <header className="w-full p-5 bg-_gray-800 flex justify-start">
        <LogoWhite />
      </header>

      <div className="flex flex-1 items-center justify-center md:flex-row flex-col">
        <div className="w-full md:w-1/2 flex items-center justify-center p-5">
          <LogoWhite />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-5">
          <MemorialMessage />
          <div className="mb-10 w-full flex justify-center">
            <CodeInput mode="code" />
          </div>
          <NextButton label="다음" />
        </div>
      </div>
    </div>
  )
}
