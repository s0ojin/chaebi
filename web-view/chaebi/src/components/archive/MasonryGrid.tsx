import Image from 'next/image'
import { MasonryItem } from '@/types/archive'

type MasonryGridProps = {
  items: MasonryItem[]
}

export default function MasonryGrid({ items }: MasonryGridProps) {
  const columns: MasonryItem[][] = [[], []]

  items.forEach((item, index) => {
    columns[index % 2].push(item)
  })

  return (
    <div className="flex justify-between gap-2">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex-1">
          {column.map((item) => {
            return (
              <div
                key={item.id}
                className="mb-2 rounded-lg overflow-hidden"
                style={{ height: `${item.height}px`, width: '100%' }}
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
  )
}
