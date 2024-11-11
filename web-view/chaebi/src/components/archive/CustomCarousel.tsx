'use client'

import { useState } from 'react'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ThemeModal from './ThemeModal'
import { Theme } from '@/types/archive'

const themes: Theme[] = [
  {
    id: 1,
    name: '테마1',
    images: ['/dummy/dummy1.png', '/dummy/dummy2.png', '/dummy/dummy3.png'],
  },
  {
    id: 2,
    name: '테마2',
    images: ['/dummy/dummy4.png', '/dummy/dummy5.png', '/dummy/dummy6.png'],
  },
  {
    id: 3,
    name: '테마3',
    images: [
      '/dummy/dummy7.png',
      '/dummy/dummy8.png',
      '/dummy/dummy9.png',
      '/dummy/dummy10.png',
    ],
  },
]

export default function CustomCarousel() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
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
      <div className="w-full">
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
