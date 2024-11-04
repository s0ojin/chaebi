'use client'

import { LogoWhite } from '../../public/svg/index'
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
          <img
            src="/path/to/your/image.png"
            alt="고인의 이미지"
            className="max-h-[80%] max-w-[80%] object-contain"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-5">
          <div className="mb-10 text-2xl md:text-4xl text-_white text-center">
            삼가 고인의 명복을 빕니다.
          </div>
          <div>
            <div className="hidden md:block mb-14 text-2xl text-center text-_white leading-9">
              생전 고인이 작성하신 기록을 전달해드립니다.
              <br />
              문자로 받은 코드를 입력해주세요.
            </div>
            <div className="block md:hidden text-xl mb-11 text-center text-_white leading-8">
              고인의 기록을 전달해 드립니다.
              <br />
              문자로 받은 코드를 입력해주세요.
            </div>
          </div>
          <div className="mb-10 w-full flex justify-center">
            <CodeInput mode="code" />
          </div>
          <NextButton label="다음" />
        </div>
      </div>
    </div>
  )
}
