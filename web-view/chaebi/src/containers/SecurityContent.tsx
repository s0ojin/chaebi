import GuideMessage from '@/components/ui/GuideMessage'
import SecurityQuestion from '@/components/ui/SecurityQuestion'
import CodeInput from '@/components/ui/CodeInput'
import NextButton from '@/components/ui/NextButton'
import { useRouter, useParams } from 'next/navigation'

export default function SecurityContainer() {
  const router = useRouter()
  const { id } = useParams()

  function handleNextClick() {
    if (id) {
      router.push(`/${id}`)
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-center p-5">
      <div className="mb-16 md:mb-20">
        <GuideMessage senderName="김싸피" receiverName="박수진" />
      </div>
      <SecurityQuestion question="저의 고등학교 3학년 담임선생님 성함은 무엇일까요?" />
      <div className="mt-5 md:mt-12 mb-10 w-full flex justify-center">
        <CodeInput mode="code" />
      </div>
      <NextButton label="다음" onClick={handleNextClick} />
    </div>
  )
}
