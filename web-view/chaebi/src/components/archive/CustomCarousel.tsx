'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ThemeModal from './ThemeModal'
import { Theme } from '@/types/archive'
import { fetchFilteredGallery } from '@/services/archive'
import useUserStore from '@/stores/useUserStore'
import { keywordMap } from '@/constants/keywordMap'

function shuffleArray(array: Theme[]): Theme[] {
  return array.sort(() => Math.random() - 0.5)
}

export default function CustomCarousel() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [themes, setThemes] = useState<Theme[]>([])
  const { userInfo, recipientRes } = useUserStore()

  useEffect(() => {
    async function loadFilteredGallery() {
      if (userInfo && recipientRes) {
        try {
          const {
            christmas,
            endstart,
            yearClassification,
            locationClassification,
            keywordClassification,
          } = await fetchFilteredGallery(userInfo.userId, recipientRes.id)

          const generatedThemes: Theme[] = [
            {
              id: 1,
              name: '크리스마스',
              images: christmas.map((item) => item.fileUrl),
            },
            {
              id: 2,
              name: '연말연시',
              images: endstart.map((item) => item.fileUrl),
            },
            ...Object.keys(yearClassification).map((year, index) => ({
              id: index + 3,
              name: `${year}년`,
              images: yearClassification[year].map((item) => item.fileUrl),
            })),
            ...Object.keys(locationClassification).map((location, index) => ({
              id: Object.keys(yearClassification).length + index + 3,
              name: location,
              images: locationClassification[location].map(
                (item) => item.fileUrl,
              ),
            })),
            ...Object.keys(keywordClassification).map((keyword, index) => ({
              id:
                Object.keys(yearClassification).length +
                Object.keys(locationClassification).length +
                index +
                3,
              name: keywordMap[keyword] || keyword,
              images: keywordClassification[keyword].map(
                (item) => item.fileUrl,
              ),
            })),
          ].filter((theme) => theme.images.length > 0)

          const uniqueThemes = Array.from(
            new Map(
              generatedThemes.map((theme) => [theme.name, theme]),
            ).values(),
          )

          setThemes(shuffleArray(uniqueThemes))
        } catch (error) {
          console.error('Failed to fetch and group gallery data:', error)
        }
      }
    }

    loadFilteredGallery()
  }, [userInfo, recipientRes])

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: themes.length > 2,
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
      <div className="-mx-5 w-screen overflow-hidden">
        <style>{`
          .slick-slide {
            padding: 0 .375rem;
          }
        `}</style>
        <Slider {...sliderSettings}>
          {themes.map((theme, index) => (
            <div
              key={theme.id || index}
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
