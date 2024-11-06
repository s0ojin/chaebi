'use client'

import SecurityContent from '@/containers/SecurityContent'

export default function Security() {
  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex flex-1 items-center md:justify-start flex-col">
        <SecurityContent />
      </div>
    </div>
  )
}
