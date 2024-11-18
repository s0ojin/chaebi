'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ThemeModal from './ThemeModal'
import { Theme, GalleryItem } from '@/types/archive'
import { groupByYear, groupByLocation, groupByKeyword } from '@/utils/filter'
import { fetchGallery } from '@/services/archive'
import useUserStore from '@/stores/useUserStore'
import { keywordMap } from '@/constants/keywordMap'

export default function CustomCarousel() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [themes, setThemes] = useState<Theme[]>([])
  const { userInfo, recipientRes } = useUserStore()

  useEffect(() => {
    async function loadGallery() {
      if (userInfo && recipientRes) {
        try {
          const galleryData: GalleryItem[] = await fetchGallery(
            userInfo.userId,
            recipientRes.id,
          )

          const yearGroups = groupByYear(galleryData)
          const locationGroups = groupByLocation(galleryData)
          const keywords = Object.keys(keywordMap)
          const keywordGroups = keywords
            .map((keyword, index: number) => ({
              id:
                Object.keys(yearGroups).length +
                Object.keys(locationGroups).length +
                index +
                1,
              name: keywordMap[keyword] || keyword,
              images: groupByKeyword(galleryData, keyword).map(
                (item) => item.fileUrl,
              ),
            }))
            .filter((theme) => theme.images.length > 0)

          const generatedThemes: Theme[] = [
            ...Object.keys(yearGroups).map((year, index) => ({
              id: index + 1,
              name: `${year}년`,
              images: yearGroups[year].map((item) => item.fileUrl),
            })),
            ...Object.keys(locationGroups).map((location, index) => ({
              id: Object.keys(yearGroups).length + index + 1,
              name: location,
              images: locationGroups[location].map((item) => item.fileUrl),
            })),
            ...keywordGroups,
          ].sort(() => Math.random() - 0.5)

          setThemes(generatedThemes)
        } catch (error) {
          console.error('Failed to fetch and group gallery data:', error)
        }
      }
    }

    loadGallery()
  }, [userInfo, recipientRes])

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
  }

  function openModal(theme: Theme): void {
    setSelectedTheme(theme)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  function closeModal(): void {
    setIsModalOpen(false)
    setSelectedTheme(null)
    document.body.style.overflow = 'unset'
  }

  return (
    <>
      <div className="-mx-5 w-screen">
        <style>{`
          .slick-slide {
            padding: 0 .375rem;
          }
        `}</style>
        <Slider {...sliderSettings}>
          {themes.map((theme) => (
            <div
              key={theme.id}
              className="relative aspect-1 cursor-pointer"
              onClick={() => openModal(theme)}
            >
              <Image
                src={theme.images[0]}
                alt={theme.name}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-xl transition-opacity duration-300"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-3 right-4 text-_white text-4xl font-NotoSansKR">
                {theme.name}
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {isModalOpen && selectedTheme && (
        <ThemeModal theme={selectedTheme} onClose={closeModal} />
      )}
    </>
  )
}
