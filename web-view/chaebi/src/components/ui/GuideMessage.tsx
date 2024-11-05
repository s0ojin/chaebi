import { GuideMessageProps } from '@/types/guideMessage'

function GuideMessage(props: GuideMessageProps) {
  return (
    <div className="text-center">
      <p className="text-lg md:text-2xl mb-2 md:mb-4 text-_white leading-relaxed">
        안녕하세요, {props.receiverName}님.
      </p>
      <p className="text-lg md:text-2xl text-_white leading-relaxed">
        {props.senderName} 님께서 {props.receiverName} 님만을 위한 암호 질문을
        남기셨습니다.
      </p>
    </div>
  )
}

export default GuideMessage
