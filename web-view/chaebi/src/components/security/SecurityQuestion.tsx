import { SecurityQuestionProps } from '@/types/security'

function SecurityQuestion({ question }: SecurityQuestionProps) {
  return (
    <div>
      <div className="text-xl md:text-3xl text-_white text-center leading-9 break-words whitespace-normal">
        Q. {question}
      </div>
    </div>
  )
}

export default SecurityQuestion
