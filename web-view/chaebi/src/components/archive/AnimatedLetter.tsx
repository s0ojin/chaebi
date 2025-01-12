import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CloseIcon from 'public/svg/close.svg'

export default function AnimatedLetter({
  children,
  onOpenComplete,
  onCloseComplete,
}: {
  children: React.ReactNode
  onOpenComplete?: () => void
  onCloseComplete?: () => void // 추가된 prop
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

  function handleCloseClick() {
    setTimeout(() => {
      setIsOpening(false)
      if (onCloseComplete) {
        onCloseComplete() // 콜백 호출
      }
    }, 500)

    setTimeout(() => {
      setIsFullyOpen(false)
    }, 2000)
  }

  return (
    <div
      className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center ${
        !isFullyOpen ? 'z-0' : 'z-50'
      }`}
    >
      <AnimatePresence>
        {!isFullyOpen ? (
          <motion.div
            key="envelope"
            className="relative cursor-pointer"
            onClick={handleEnvelopeClick}
            initial={{ scale: 0.8, opacity: 0, y: 0 }}
            animate={{
              scale: isOpening ? 1.2 : 1,
              opacity: 1,
              y: isOpening ? 0 : [0, -10, 0],
            }}
            exit={{ scale: 0.8, rotateX: '0deg', opacity: 0 }}
            transition={{
              duration: 0.5,
              y: {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          >
            {/* Envelope Body */}
            <div className="w-64 h-40 bg-gray-200 relative rounded-md shadow-lg z-10">
              {/* Envelope Flap */}
              <motion.div
                className="absolute top-0 left-0 w-0 h-0 border-l-[128px] border-r-[128px] border-t-[96px] border-l-transparent border-r-transparent border-t-gray-200"
                style={{
                  top: '2px',
                  transformOrigin: 'top center',
                  filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25))',
                }}
                initial={{ rotateX: '0deg' }}
                animate={
                  isOpening ? { rotateX: '-180deg' } : { rotateX: '0deg' }
                }
                exit={{ rotateX: '0deg' }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        ) : null}

        {isOpening && (
          <motion.div
            key="letter"
            className={`fixed w-full h-full shadow-lg rounded-lg overflow-hidden`}
            style={{
              backgroundImage: 'url("/images/letter-background.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseClick}
              className="absolute top-2 right-2"
            >
              <CloseIcon width={24} height={24} />
            </button>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
