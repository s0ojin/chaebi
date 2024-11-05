'use client'

import { useRouter, useParams } from 'next/navigation'
import GuideMessage from '@/components/ui/GuideMessage'
import SecurityQuestion from '@/components/ui/SecurityQuestion'
import CodeInput from '@/components/ui/CodeInput'
import NextButton from '@/components/ui/NextButton'

export default function Security() {
  const router = useRouter()
  const { id } = useParams()

  function handleNextClick() {
    if (id) {
      router.push(`/${id}`)
    }
  }

  return (
    <div className="min-h-screen h-screen w-screen overflow-hidden flex flex-col">
      <div className="flex flex-1 items-center justify-center flex-col">
        <div className="w-full flex flex-col items-center justify-center p-5">
          <GuideMessage senderName="김싸피" receiverName="박수진" />
          <SecurityQuestion />
          <div className="mb-10 w-full flex justify-center">
            <CodeInput mode="code" />
          </div>
          <NextButton label="다음" onClick={handleNextClick} />
        </div>
      </div>
    </div>
  )
}
