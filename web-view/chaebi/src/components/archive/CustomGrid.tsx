import Image from 'next/image'

export default function CustomGrid() {
  return (
    <div className="w-3/4 mx-auto">
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {[...Array(10)].map((_, i) => (
          <li key={i} className="relative">
            <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
              <Image
                src={`/dummy/dummy${i + 1}.png`}
                alt={`Dummy image ${i + 1}`}
                width={512}
                height={384}
                className="pointer-events-none object-cover group-hover:opacity-75"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
