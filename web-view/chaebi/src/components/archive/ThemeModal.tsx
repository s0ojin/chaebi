'use client'

import Image from 'next/image'
import Slider from 'react-slick'
import { Theme } from '@/types/archive'
import LeftArrow from 'public/svg/left-arrow.svg'

interface ThemeModalProps {
  theme: Theme
  onClose: () => void
}

export default function ThemeModal({ theme, onClose }: ThemeModalProps) {
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
      <div className="absolute top-4 left-4 z-50">
        <button onClick={onClose} className="p-2">
          <LeftArrow width={32} height={32} />
        </button>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4">
        <Slider {...sliderSettings}>
          {theme.images.map((image, index) => (
            <div
              key={index}
              className="relative flex items-center justify-center"
            >
              <Image
                src={image}
                alt={`${theme.name} ${index + 1}`}
                width={800}
                height={450}
                style={{ objectFit: 'contain' }}
                className="transition-opacity duration-500"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
