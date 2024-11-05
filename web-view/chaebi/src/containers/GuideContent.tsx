'use client'

import MemorialMessage from '@/components/ui/MemorialMessage'
import CodeInput from '@/components/ui/CodeInput'
import NextButton from '@/components/ui/NextButton'
import { useRouter } from 'next/navigation'

export default function GuideContent() {
  const router = useRouter()

  function handleNextClick() {
    router.push('/auth')
  }

  return (
    <div className="w-full md:w-1/2 flex flex-col items-center px-5 min-h-[100dvh] md:min-h-screen md:justify-center">
      <div className="flex-1 md:flex-initial flex flex-col items-center w-full">
        <MemorialMessage />
        <div className="mt-8 md:mb-10 w-full flex justify-center">
          <CodeInput mode="code" />
        </div>
      </div>
      <div className="w-full mb-8 sticky bottom-8 md:flex md:justify-center">
        <NextButton label="다음" onClick={handleNextClick} />
      </div>
    </div>
  )
}
