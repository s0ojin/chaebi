import useUserStore from '@/stores/userStore'
import IntroMessage from '@/components/archive/IntroMessage'
import AnimatedLetter from '@/components/archive/AnimatedLetter'
import LetterMessage from '@/components/archive/LetterMessage'

export default function LetterContent() {
  const { userInfo, recipientRes } = useUserStore()
  const senderName = userInfo?.userName || '보낸 사람'
  const receiverName = recipientRes?.name || '받는 사람'

  return (
    <div>
      <div className="mt-10">
        <IntroMessage senderName={senderName} receiverName={receiverName} />
      </div>
      <AnimatedLetter>
        <LetterMessage />
      </AnimatedLetter>
    </div>
  )
}
