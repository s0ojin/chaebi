'use client'

import { useParams } from 'next/navigation'
import CustomCarousel from '@/components/archive/CustomCarousel'
import CustomGrid from '@/components/archive/CustomGrid'

export default function Archive() {
  const { id } = useParams()

  return (
    <div className="flex flex-col items-center w-full p-4">
      <div className="text-_white mb-4">{id}의 Archive 페이지 입니다.</div>
      <div className="w-2/3">
        <CustomCarousel />
      </div>
      <div className="w-full mt-5">
        <CustomGrid />
      </div>
    </div>
  )
}
