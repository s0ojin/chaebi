import { useRef, useEffect } from 'react'
import { InfiniteScrollTriggerProps } from '@/types/archive'

function InfiniteScrollTrigger({ onIntersect }: InfiniteScrollTriggerProps) {
  const observerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect()
        }
      },
      { threshold: 1.0 },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [onIntersect])

  return <div ref={observerRef} className="h-10"></div>
}

export default InfiniteScrollTrigger
