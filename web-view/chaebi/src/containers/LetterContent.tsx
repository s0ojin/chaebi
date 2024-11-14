import IntroMessage from '@/components/archive/IntroMessage'
import AnimatedLetter from '@/components/archive/AnimatedLetter'
import LetterMessage from '@/components/archive/LetterMessage'

export default function LetterContent() {
  return (
    <div>
      <div className="mt-10">
        <IntroMessage senderName="김싸피" receiverName="박수진" />
      </div>
      <AnimatedLetter>
        <LetterMessage />
      </AnimatedLetter>
    </div>
  )
}
