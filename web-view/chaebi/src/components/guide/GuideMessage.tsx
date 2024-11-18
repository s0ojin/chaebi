import { motion } from 'framer-motion'

function GuideMessage() {
  return (
    <div>
      <motion.div
        className="mb-10 text-2xl md:text-4xl text-_white text-center"
        style={{ WebkitTextStroke: '0.5px #FAFAFA' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        삼가 고인의 명복을 빕니다.
      </motion.div>
      <div>
        <motion.div
          className="hidden md:block mb-14 text-2xl text-center text-_white leading-9"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          생전 고인이 작성하신 기록을 전달해드립니다.
          <br />
          문자로 받은 코드를 입력해주세요.
        </motion.div>
        <motion.div
          className="block md:hidden text-xl text-center text-_white leading-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          고인의 기록을 전달해 드립니다.
          <br />
          문자로 받은 코드를 입력해주세요.
        </motion.div>
      </div>
    </div>
  )
}

export default GuideMessage
