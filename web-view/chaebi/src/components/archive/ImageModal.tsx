import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { MasonryItem } from '@/types/archive'
import LeftArrow from 'public/svg/left-arrow.svg'

interface ImageModalProps {
  images: MasonryItem[]
  initialSlide: number
  onClose: () => void
}

export default function ImageModal({
  images,
  initialSlide,
  onClose,
}: ImageModalProps) {
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide,
    fade: true,
    cssEase: 'linear',
    pauseOnHover: false,
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
          {images.map((item) => (
            <div
              key={item.id}
              className="relative flex items-center justify-center"
            >
              <div className="relative h-[80vh]">
                <Image
                  src={item.uri}
                  alt={`Image ${item.id}`}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="transition-opacity duration-300"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}
