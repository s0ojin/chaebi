import Image from 'next/image'
import { ImageCardProps } from '@/types/archive'

function ImageCard({ src, alt, index }: ImageCardProps) {
  return (
    <li className="relative">
      <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={src}
          alt={alt}
          width={512}
          height={384}
          className="pointer-events-none object-cover group-hover:opacity-75"
        />
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for image {index + 1}</span>
        </button>
      </div>
    </li>
  )
}

export default ImageCard
