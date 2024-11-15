'use client'

import { useEffect, useState } from 'react'
import { GuideContentProps } from '@/types/guide'
import GuideMessage from '@/components/guide/GuideMessage'
import CodeInput from '@/components/ui/CodeInput'
import NextButton from '@/components/ui/NextButton'
import { useRouter } from 'next/navigation'
import { verifyEnterCode } from '@/services/auth'
import useUserStore from '@/store/userStore'

export default function GuideContent({
  enterCode,
  setEnterCode,
}: GuideContentProps) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)
  const router = useRouter()
  const { setUserInfo, setRecipientRes } = useUserStore()

  useEffect(() => {
    function handleResize() {
      const isVisible =
        window.innerHeight < document.documentElement.clientHeight
      setIsKeyboardVisible(isVisible)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  async function handleNextClick() {
    try {
      const data = await verifyEnterCode(enterCode)
      console.log('API Response Data:', data)
      if (data) {
        const { userInfo, enterRecipient } = data
        console.log('Extracted userInfo:', userInfo)
        console.log('Extracted recipientRes:', enterRecipient)
        setUserInfo(userInfo)
        setRecipientRes(enterRecipient)
        router.push('/security')
      }
    } catch (error) {
      console.error('Error occurred while verifying enter code:', error)
    }
  }

  return (
    <div className="w-full flex flex-col items-center px-5 min-h-screen md:min-h-screen md:justify-center">
      <div className="flex-1 md:flex-initial flex flex-col items-center w-full">
        <GuideMessage />
        <div className="mt-10 md:mb-10 w-full flex justify-center">
          <CodeInput mode="code" value={enterCode} onChange={setEnterCode} />
        </div>
      </div>
      <div
        className={`w-full ${
          isKeyboardVisible ? 'mb-20' : 'mb-8'
        } sticky bottom-8 flex justify-center`}
      >
        <NextButton label="다음" onClick={handleNextClick} />
      </div>
    </div>
  )
}
