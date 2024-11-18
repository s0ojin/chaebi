import { SoBangGwan } from '@/utils/fonts'
import TopEmblem from 'public/svg/top-emblem.svg'
import BottomEmblem from 'public/svg/bottom-emblem.svg'

interface LetterMessageProps {
  content: string
}

export default function LetterMessage({ content }: LetterMessageProps) {
  const backgroundStyle: React.CSSProperties = {
    backgroundImage: 'url("/images/letter-background.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }

  return (
    <div
      className="p-2 h-full flex flex-col justify-start overflow-y-auto"
      style={backgroundStyle}
    >
      <div className="mt-2 px-1">
        <TopEmblem className="w-full" />
      </div>
      <div className={`${SoBangGwan.variable} font-SoBangGwan p-3 text-2xl`}>
        {content}
      </div>
      <div className="mt-auto mb-2 px-1">
        <BottomEmblem className="w-full" />
      </div>
    </div>
  )
}
