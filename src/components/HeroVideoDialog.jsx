import React, { useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { XIcon } from 'lucide-react'

const animationVariants = {
  'from-center': {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
}

export function HeroVideoDialog({ isOpen, videoSrc, onClose }) {
  const videoRef = useRef(null)
  const [aspectRatio, setAspectRatio] = useState(16 / 9)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleMetadata = () => {
    const video = videoRef.current
    if (video && video.videoWidth && video.videoHeight) {
      setAspectRatio(video.videoWidth / video.videoHeight)
    }
  }

  const videoStyle = isMobile
    ? { width: 'calc(100vw - 40px)', height: 'auto', maxHeight: '100%' }
    : { height: 'calc(100vh - 80px)', width: 'auto', maxWidth: '100%' }

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-modal flex items-center justify-center bg-black/85 backdrop-blur-md"
        >
          <motion.div
            {...animationVariants['from-center']}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="relative inline-flex mx-4 md:mx-0"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile close button */}
            <button
              className="absolute -top-14 right-3 md:hidden p-2 bg-white/20 hover:bg-white/30 text-white rounded transition"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
            >
              <XIcon className="size-5" />
            </button>
            {/* Desktop close button */}
            <button
              className="hidden md:block absolute top-0 right-[-56px] p-2 bg-white/20 hover:bg-white/30 text-white rounded transition"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
            >
              <XIcon className="size-5" />
            </button>
            <div className="relative isolate z-[1] size-full overflow-hidden bg-background">
              <video
                ref={videoRef}
                onLoadedMetadata={handleMetadata}
                src={videoSrc}
                className=" max-w-[90vw] max-h-[90vh] h-auto w-auto"
                controls
                autoPlay
                muted
                playsInline
                style={videoStyle}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
