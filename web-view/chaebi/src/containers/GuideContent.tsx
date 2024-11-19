'use client'

import { useEffect, useState } from 'react'
import { GuideContentProps } from '@/types/guide'
import GuideMessage from '@/components/guide/GuideMessage'
import CodeInput from '@/components/ui/CodeInput'
import NextButton from '@/components/ui/NextButton'
import { useRouter } from 'next/navigation'
import { verifyEnterCode } from '@/services/auth'
import useUserStore from '@/stores/useUserStore'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
      if (data) {
        const { userInfo, enterRecipient } = data
        setUserInfo(userInfo)
        setRecipientRes(enterRecipient)
        router.push('/security')
      }
    } catch (error) {
      toast.error('입장 코드를 다시 확인해주세요.')
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
