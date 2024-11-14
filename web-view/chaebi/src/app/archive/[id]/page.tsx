'use client'

import { useEffect, useState } from 'react'
import { MasonryItem } from '@/types/archive'
import CustomTab from '@/components/ui/CustomTab'
import CustomCarousel from '@/components/archive/CustomCarousel'
import MasonryGrid from '@/components/archive/MasonryGrid'
import LetterContent from '@/containers/LetterContent'

export default function Archive() {
  const [data, setData] = useState<MasonryItem[]>([])
  const [currentTab, setCurrentTab] = useState('편지')

  useEffect(() => {
    const generatedData = Array.from({ length: 10 }).map((_, index) => ({
      uri: `/dummy/dummy${index + 1}.png`,
      id: index.toString(),
      height: 150 + Math.floor(Math.random() * 150),
    }))
    setData(generatedData)
  }, [])

  function handleTabChange(selectedTab: string) {
    setCurrentTab(selectedTab)
  }

  return (
    <div className="flex flex-col items-center w-full p-5">
      <div className="mt-5 mb-3">
        <CustomTab onTabChange={handleTabChange} />
      </div>
      {currentTab === '편지' ? (
        <LetterContent />
      ) : (
        <>
          <div className="w-full mb-4">
            <CustomCarousel />
          </div>
          <div>
            <MasonryGrid items={data} />
          </div>
        </>
      )}
    </div>
  )
}
