'use client'

import { useEffect, useState } from 'react'
import { MasonryItem } from '@/types/archive'
import IntroMessage from '@/components/archive/IntroMessage'
import CustomTab from '@/components/ui/CustomTab'
import CustomCarousel from '@/components/archive/CustomCarousel'
import MasonryGrid from '@/components/archive/MasonryGrid'
import AnimatedLetter from '@/components/archive/AnimatedLetter'

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
      <div className="mb-4">
        <IntroMessage senderName="김싸피" receiverName="박수진" />
      </div>
      <div className="mb-3">
        <CustomTab onTabChange={handleTabChange} />
      </div>
      {currentTab === '편지' ? (
        <AnimatedLetter />
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
