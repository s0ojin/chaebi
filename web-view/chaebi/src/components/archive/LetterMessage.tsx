import { SoBangGwan } from '@/utils/fonts'
import TopEmblem from 'public/svg/top-emblem.svg'
import BottomEmblem from 'public/svg/bottom-emblem.svg'

interface LetterMessageProps {
  content: string
}

export default function LetterMessage({ content }: LetterMessageProps) {
  return (
    <div className="h-full flex flex-col justify-between overflow-y-auto">
      <div className="mt-2 px-1">
        <TopEmblem className="w-full" />
      </div>
      <div className={`${SoBangGwan.variable} font-SoBangGwan p-3 text-xs`}>
        {content}
      </div>
      <div className="mb-2 px-1">
        <BottomEmblem className="w-full" />
      </div>
    </div>
  )
}
