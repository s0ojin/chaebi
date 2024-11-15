import { useEffect, useState } from 'react'
import { SecurityContentProps } from '@/types/security'
import QuestionIntro from '@/components/security/QuestionIntro'
import SecurityQuestion from '@/components/security/SecurityQuestion'
import CodeInput from '@/components/ui/CodeInput'
import NextButton from '@/components/ui/NextButton'
import useUserStore from '@/stores/userStore'

export default function SecurityContent({ onNextClick }: SecurityContentProps) {
  const [isClient, setIsClient] = useState(false)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const { userInfo, recipientRes } = useUserStore()

  useEffect(() => {
    console.log('userInfo:', userInfo)
    console.log('recipientRes:', recipientRes)
    console.log('isClient:', isClient)
  }, [userInfo, recipientRes, isClient])

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
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  function handleNextClick() {
    if (inputValue === recipientRes?.secretAnswer) {
      onNextClick()
    } else {
      alert('정답이 일치하지 않습니다. 다시 시도해 주세요.')
    }
  }

  if (!isClient || !userInfo || !recipientRes) return null

  return (
    <div className="w-full flex flex-col items-center p-5 min-h-screen md:min-h-screen md:justify-start">
      <div className="flex-1 md:flex-initial flex flex-col items-center w-full">
        <div className="mt-_140 mb-_72 md:mt-0 md:mb-24">
          <QuestionIntro
            senderName={userInfo.userName}
            receiverName={recipientRes.name}
          />
        </div>
        <SecurityQuestion question={recipientRes.secretQuestion} />
        <div className="mt-8 md:mt-12 md:mb-10 w-full flex justify-center">
          <CodeInput
            mode="answer"
            value={inputValue}
            onChange={setInputValue}
          />
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
