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
    <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-5">
      <MemorialMessage />
      <div className="mb-10 w-full flex justify-center">
        <CodeInput mode="code" />
      </div>
      <NextButton label="다음" onClick={handleNextClick} />
    </div>
  )
}
