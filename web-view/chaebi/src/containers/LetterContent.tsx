import { useEffect } from 'react'
import useUserStore from '@/stores/useUserStore'
import useArchiveStore from '@/stores/useArchiveStore'
import { fetchLetter } from '@/services/archive'
import IntroMessage from '@/components/archive/IntroMessage'
import AnimatedLetter from '@/components/archive/AnimatedLetter'
import LetterMessage from '@/components/archive/LetterMessage'

export default function LetterContent() {
  const { userInfo, recipientRes } = useUserStore()
  const { letter, setLetter } = useArchiveStore()

  useEffect(() => {
    async function getLetter() {
      if (recipientRes) {
        console.log('Recipient ID being passed:', recipientRes.id)
        try {
          const letterData = await fetchLetter(recipientRes.id)
          setLetter(letterData)
        } catch (error) {
          console.error('Failed to fetch letter:', error)
        }
      }
    }
    getLetter()
  }, [setLetter, recipientRes])

  if (!userInfo || !recipientRes) return null

  return (
    <div>
      <div className="mt-10">
        <IntroMessage
          senderName={userInfo?.userName || '보낸 사람'}
          receiverName={recipientRes.name || '받는 사람'}
        />
      </div>
      <AnimatedLetter>
        <LetterMessage
          content={letter?.content || '남기신 메세지가 없습니다'}
        />
      </AnimatedLetter>
    </div>
  )
}
