'use client'

import { useRouter, useParams } from 'next/navigation'
import SecurityContent from '@/containers/SecurityContent'

export default function Security() {
  const router = useRouter()
  const { id } = useParams()

  function handleNextClick() {
    if (id) {
      router.push(`/${id}`)
    }
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-1 items-center md:justify-start flex-col">
        <SecurityContent onNextClick={handleNextClick} />
      </div>
    </div>
  )
}
