import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import GuideMessage from '@/components/ui/GuideMessage'
import SecurityQuestion from '@/components/ui/SecurityQuestion'
import CodeInput from '@/components/ui/CodeInput'
import NextButton from '@/components/ui/NextButton'

export default function SecurityContent() {
  const router = useRouter()
  const { id } = useParams()
  const [isClient, setIsClient] = useState(false)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    function handleResize() {
      if (typeof window !== 'undefined') {
        const isVisible =
          window.innerHeight < document.documentElement.clientHeight
        setIsKeyboardVisible(isVisible)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (!isClient) return null

  function handleNextClick() {
    if (id) {
      router.push(`/${id}`)
    }
  }

  return (
    <div className="w-full flex flex-col items-center p-5 min-h-screen md:min-h-screen md:justify-center">
      <div className="flex-1 md:flex-initial flex flex-col items-center w-full">
        <div className="mt-_140 mb-_72 md:mt-0 md:mb-24">
          <GuideMessage senderName="김싸피" receiverName="박수진" />
        </div>
        <SecurityQuestion question="저의 고등학교 3학년 담임선생님 성함은 무엇일까요?" />
        <div className="mt-8 md:mt-12 md:mb-10 w-full flex justify-center">
          <CodeInput mode="code" />
        </div>
      </div>
      <div
        className={`w-full ${isKeyboardVisible ? 'mb-20' : 'mb-8'} sticky bottom-8 flex justify-center`}
      >
        <NextButton label="다음" onClick={handleNextClick} />
      </div>
    </div>
  )
}
