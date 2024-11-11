'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { MasonryItem } from '@/types/archive'
import CustomCarousel from '@/components/archive/CustomCarousel'
import MasonryGrid from '@/components/archive/MasonryGrid'

export default function Archive() {
  const { id } = useParams()
  const [data, setData] = useState<MasonryItem[]>([])

  useEffect(() => {
    const generatedData = Array.from({ length: 10 }).map((_, index) => ({
      uri: `/dummy/dummy${index + 1}.png`,
      id: index.toString(),
      height: 150 + Math.floor(Math.random() * 150),
    }))
    setData(generatedData)
  }, [])

  return (
    <div className="flex flex-col items-center w-full p-5">
      <div className="text-_white mb-4">{id}의 Archive 페이지 입니다.</div>
      <div className="w-full mb-4">
        <CustomCarousel />
      </div>
      <div>
        <MasonryGrid items={data} />
      </div>
    </div>
  )
}
