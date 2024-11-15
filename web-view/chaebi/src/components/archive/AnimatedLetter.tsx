import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AnimatedLetter({
  children,
  onOpenComplete,
}: {
  children: React.ReactNode
  onOpenComplete?: () => void
}) {
  const [isOpening, setIsOpening] = useState(false)
  const [isFullyOpen, setIsFullyOpen] = useState(false)

  function handleEnvelopeClick() {
    if (!isOpening) {
      setIsOpening(true)
      setTimeout(() => {
        setIsFullyOpen(true)
        if (onOpenComplete) {
          onOpenComplete()
        }
      }, 1000)
    }
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <AnimatePresence>
        {!isFullyOpen ? (
          <motion.div
            key="envelope"
            className="relative cursor-pointer"
            onClick={handleEnvelopeClick}
            initial={{ scale: 1 }}
            animate={isOpening ? { scale: 1.2 } : { scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Envelope Body */}
            <div className="w-40 h-20 bg-gray-200 relative z-10 rounded-md">
              {/* Envelope Flap */}
              <motion.div
                className="absolute top-0 left-0 w-0 h-0 border-l-[80px] border-r-[80px] border-t-[40px] border-l-transparent border-r-transparent border-t-gray-200"
                style={{
                  top: '2px',
                  transformOrigin: 'top center',
                  filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25))',
                }}
                initial={{ rotateX: '0deg' }}
                animate={
                  isOpening ? { rotateX: '-180deg' } : { rotateX: '0deg' }
                }
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        ) : null}

        {isOpening && (
          <motion.div
            key="letter"
            className="absolute w-4/5 h-80 bg-_white shadow-lg overflow-hidden"
            initial={{ y: '50%', scale: 0.8, opacity: 0 }}
            animate={{ y: '-50%', scale: 1.8, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.3 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 1 }}
              className="h-full overflow-y-auto"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
