import { GuideMessageProps } from '@/types/guideMessage'

function GuideMessage(props: GuideMessageProps) {
  return (
    <div className="md:mt-10 text-center text-lg md:text-2xl leading-8 md:leading-_46 text-_white">
      <p>안녕하세요, {props.receiverName}님.</p>
      <p>
        {props.senderName} 님께서 {props.receiverName} 님만을 위한
        <span className="block md:inline"> 암호 질문을 남기셨습니다.</span>
      </p>
    </div>
  )
}

export default GuideMessage
