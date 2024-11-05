'use client'

import SecurityContent from '@/containers/SecurityContent'

export default function Security() {
  return (
    <div className="min-h-screen h-screen w-screen flex flex-col">
      <div className="flex flex-1 items-center justify-center md:justify-start flex-col">
        <SecurityContent />
      </div>
    </div>
  )
}
