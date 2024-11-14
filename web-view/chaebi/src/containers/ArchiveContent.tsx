import IntroMessage from '@/components/archive/IntroMessage'
import AnimatedLetter from '@/components/archive/AnimatedLetter'
import LetterContent from '@/components/archive/LetterContent'

export default function ArchiveContent() {
  return (
    <div>
      <div className="mt-10">
        <IntroMessage senderName="김싸피" receiverName="박수진" />
      </div>
      <AnimatedLetter>
        <LetterContent />
      </AnimatedLetter>
    </div>
  )
}
