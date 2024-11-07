'use client'

import { useEffect, useState } from 'react'
import { GuideContentProps } from '@/types/guide'
import GuideMessage from '@/components/guide/GuideMessage'
import CodeInput from '@/components/ui/CodeInput'
import NextButton from '@/components/ui/NextButton'

export default function GuideContent({ onNextClick }: GuideContentProps) {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    function handleResize() {
      const isVisible =
        window.innerHeight < document.documentElement.clientHeight
      setIsKeyboardVisible(isVisible)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="w-full flex flex-col items-center px-5 min-h-screen md:min-h-screen md:justify-center">
      <div className="flex-1 md:flex-initial flex flex-col items-center w-full">
        <GuideMessage />
        <div className="mt-10 md:mb-10 w-full flex justify-center">
          <CodeInput mode="code" />
        </div>
      </div>
      <div
        className={`w-full ${isKeyboardVisible ? 'mb-20' : 'mb-8'} sticky bottom-8 flex justify-center`}
      >
        <NextButton label="다음" onClick={onNextClick} />
      </div>
    </div>
  )
}
