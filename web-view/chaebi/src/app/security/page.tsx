'use client'

import { useRouter } from 'next/navigation'
import SecurityContent from '@/containers/SecurityContent'
import useUserStore, { useInitializeUserStore } from '@/stores/useUserStore'

export default function Security() {
  useInitializeUserStore()

  const router = useRouter()
  const { recipientRes } = useUserStore()

  function handleNextClick() {
    if (recipientRes?.id) {
      router.push(`/archive/${recipientRes.id}`)
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
