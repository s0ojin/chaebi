// CustomCarousel.tsx
import { useState } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ThemeModal from './archive/ThemeModal';
import { GalleryItem } from '../types/archive';

interface CustomCarouselProps {
  items: GalleryItem[];
}

export default function CustomCarousel({ items }: CustomCarouselProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

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
  };

  function openModal(item: GalleryItem): void {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closeModal(): void {
    setIsModalOpen(false);
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
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
          {items.map((item) => (
            <div
              key={item.id}
              className="relative aspect-1 cursor-pointer"
              onClick={() => openModal(item)}
            >
              <Image
                src={item.fileUrl}
                alt={item.fileName}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-xl transition-opacity duration-300"
              />
              <div className="absolute bottom-3 right-4 text-_white text-4xl">
                {item.capturedDate?.split('-')[0] || 'Unknown Year'}
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {isModalOpen && selectedItem && (
        <ThemeModal theme={{ id: selectedItem.id, name: selectedItem.fileName, images: [selectedItem.fileUrl] }} onClose={closeModal} />
      )}
    </>
  );
}
