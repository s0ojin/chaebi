import { SoBangGwan } from '@/utils/fonts'

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
      <div
        className={`${SoBangGwan.variable} font-SoBangGwan my-2 p-3 text-3xl text-primary whitespace-pre-wrap leading-10`}
        style={{ WebkitTextStroke: '0.7px #0A0A0A' }}
      >
        {content}
      </div>
    </div>
  )
}
