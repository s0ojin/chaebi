'use client'

import { useRouter } from 'next/navigation'
import SecurityContent from '@/containers/SecurityContent'
import useUserStore from '@/store/userStore'

export default function Security() {
  const router = useRouter()
  const { recipientRes } = useUserStore()

  function handleNextClick() {
    if (recipientRes?.id) {
      router.push(`/${recipientRes.id}`)
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
