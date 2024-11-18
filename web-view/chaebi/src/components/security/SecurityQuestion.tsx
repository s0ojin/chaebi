import { motion } from 'framer-motion'
import { SecurityQuestionProps } from '@/types/security'

function SecurityQuestion({ question }: SecurityQuestionProps) {
  return (
    <div>
      <motion.div
        className="text-xl md:text-3xl text-_white text-center leading-9 break-words whitespace-normal"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        Q. {question}
      </motion.div>
    </div>
  )
}

export default SecurityQuestion
