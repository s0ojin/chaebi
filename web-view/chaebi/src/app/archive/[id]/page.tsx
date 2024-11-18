'use client'

import { useEffect, useState } from 'react'
import { MasonryItem, GalleryItem } from '@/types/archive'
import CustomTab from '@/components/ui/CustomTab'
import CustomCarousel from '@/components/archive/CustomCarousel'
import MasonryGrid from '@/components/archive/MasonryGrid'
import LetterContent from '@/containers/LetterContent'
import { fetchGallery } from '@/services/archive'
import useUserStore, { useInitializeUserStore } from '@/stores/useUserStore'

export default function Archive() {
  useInitializeUserStore()

  const [data, setData] = useState<MasonryItem[]>([])
  const [currentTab, setCurrentTab] = useState('편지')
  const { userInfo, recipientRes } = useUserStore()

  useEffect(() => {
    async function getGallery() {
      if (userInfo && recipientRes) {
        try {
          const galleryData: GalleryItem[] = await fetchGallery(
            userInfo.userId,
            recipientRes.id,
          )
          const masonryData: MasonryItem[] = galleryData.map((item) => ({
            uri: item.fileUrl,
            id: item.id.toString(),
            height: 150 + Math.floor(Math.random() * 150),
          }))
          setData(masonryData)
        } catch (error) {
          console.error('Failed to fetch gallery data:', error)
        }
      }
    }
    getGallery()
  }, [userInfo, recipientRes])

  function handleTabChange(selectedTab: string) {
    setCurrentTab(selectedTab)

    if (data.length > 0) {
      const updatedData = data.map((item) => ({
        ...item,
        height: 150 + Math.floor(Math.random() * 150),
      }))
      setData(updatedData)
    }
  }

  return (
    <div className="flex flex-col items-center w-full min-h-screen h-screen p-5">
      <div className="mt-5 mb-3">
        <CustomTab onTabChange={handleTabChange} isVisible={true} />
      </div>
      {currentTab === '편지' ? (
        <div className="flex-1 w-full h-full">
          <LetterContent />
        </div>
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
