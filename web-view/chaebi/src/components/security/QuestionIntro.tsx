import { motion } from 'framer-motion'
import { GuideMessageProps } from '@/types/guide'

function QuestionIntro(props: GuideMessageProps) {
  return (
    <motion.div
      className="md:mt-10 text-center text-lg md:text-2xl leading-8 md:leading-_46 text-_white"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <p>안녕하세요, {props.receiverName}님.</p>
      <p>
        {props.senderName} 님께서 {props.receiverName} 님만을 위한
        <span className="block md:inline"> 암호 질문을 남기셨습니다.</span>
      </p>
    </motion.div>
  )
}

export default QuestionIntro
