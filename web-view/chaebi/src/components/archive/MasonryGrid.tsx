import { useState } from 'react'
import Image from 'next/image'
import { MasonryItem } from '@/types/archive'
import ImageModal from './ImageModal'

type MasonryGridProps = {
  items: MasonryItem[]
}

export default function MasonryGrid({ items }: MasonryGridProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const columns: MasonryItem[][] = [[], []]
  items.forEach((item, index) => {
    columns[index % 2].push(item)
  })

  function openModal(startIndex: number): void {
    setSelectedIndex(startIndex)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  function closeModal(): void {
    setIsModalOpen(false)
    document.body.style.overflow = 'unset'
  }

  return (
    <>
      <div className="flex justify-between gap-2">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex-1">
            {column.map((item, index) => {
              const globalIndex = colIndex + index * 2
              return (
                <div
                  key={item.id}
                  className="mb-2 rounded-lg overflow-hidden cursor-pointer transition-transform"
                  style={{ height: `${item.height}px`, width: '100%' }}
                  onClick={() => openModal(globalIndex)}
                >
                  <Image
                    src={item.uri}
                    alt={`Image ${item.id}`}
                    width={300}
                    height={item.height}
                    className="object-cover w-full h-full"
                  />
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {isModalOpen && (
        <ImageModal
          images={items}
          initialSlide={selectedIndex}
          onClose={closeModal}
        />
      )}
    </>
  )
}
