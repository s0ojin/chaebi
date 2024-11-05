'use client'

import { LogoWhite } from '../../public/svg/index'
import GuideContent from '@/containers/GuideContent'

export default function Home() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-1 items-center justify-center md:flex-row flex-col">
        <div className="w-full md:w-1/2 flex items-center justify-center p-5">
          <LogoWhite />
        </div>
        <GuideContent />
      </div>
    </div>
  )
}
