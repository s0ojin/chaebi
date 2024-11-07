'use client'

import { useRouter } from 'next/navigation'
import { Mum } from '../../public/svg/index'
import GuideContent from '@/containers/GuideContent'

export default function Guide() {
  const router = useRouter()

  function handleNextClick() {
    router.push('/auth')
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-1 items-center md:flex-row flex-col">
        <div className="w-full md:w-1/2 flex items-center justify-center px-5 md:pl-5 md:pr-0 mt-_72 mb-10">
          <Mum className="h-[8.875rem] md:h-[21.75rem] aspect-[664/348]" />
        </div>
        <GuideContent onNextClick={handleNextClick} />
      </div>
    </div>
  )
}
