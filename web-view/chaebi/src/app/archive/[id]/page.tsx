'use client'

import { useParams } from 'next/navigation'

export default function Archive() {
  const { id } = useParams()

  return <div>{id}의 Archive 페이지 입니다.</div>
}
