import IntroMessage from '@/components/archive/IntroMessage'
import AnimatedLetter from '@/components/archive/AnimatedLetter'

export default function ArchiveContent() {
  return (
    <div>
      <div className="mt-10">
        <IntroMessage senderName="김싸피" receiverName="박수진" />
      </div>
      <AnimatedLetter letterContent={'응애'} />
    </div>
  )
}
