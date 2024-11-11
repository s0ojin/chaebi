'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Mum from '../../public/dummy/MUM.png'
import GuideContent from '@/containers/GuideContent'

export default function Guide() {
  const router = useRouter()

  function handleNextClick() {
    router.push('/security')
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-1 items-center md:flex-row flex-col">
        <div className="w-full md:w-1/2 flex items-center justify-center px-5 md:pl-5 md:pr-0 mt-_72 mb-10">
          <div className="h-[8.875rem] md:h-[21.75rem] aspect-[664/348]">
            <Image
              src={Mum}
              alt="Mum Image"
              width={664}
              height={348}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <GuideContent onNextClick={handleNextClick} />
      </div>
    </div>
  )
}
