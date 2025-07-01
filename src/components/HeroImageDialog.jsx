import React, { useEffect, useCallback, useRef } from 'react'
import ReactDOM from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { XIcon } from 'lucide-react'
import LazyImage from './LazyImage'

const animationVariants = {
  'from-center': {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
  },
}

// 简易防抖函数
function useDebouncedCallback(callback, delay) {
  const timeoutRef = useRef(null)

  const debouncedFunction = useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return debouncedFunction
}

export function HeroImageDialog({
  imageSrc,
  thumbnailSrc,
  thumbnailAlt = 'Image thumbnail',
  animationStyle = 'from-center',
  className,
  isOpen,
  onClose,
}) {
  const selectedAnimation = animationVariants[animationStyle]

  const debouncedClose = useDebouncedCallback(() => {
    onClose && onClose()
  }, 100)

  const onOverlayClick = useCallback(
    (e) => {
      // 如果点击的是蒙层或其子节点，但不是弹窗内容，则关闭
      // 这里简单判断是否点击了遮罩层元素
      if (e.currentTarget.contains(e.target)) {
        e.stopPropagation()
        debouncedClose()
      }
    },
    [debouncedClose]
  )

  const LOCK_SCROLL_CLASS = 'lock-scroll'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose && onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    if (isOpen) {
      document.body.classList.add(LOCK_SCROLL_CLASS)
    } else {
      document.body.classList.remove(LOCK_SCROLL_CLASS)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove(LOCK_SCROLL_CLASS)
    }
  }, [isOpen, onClose])

  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onOverlayClick}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center"
        >
          <motion.div
            {...selectedAnimation}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`relative inline-block px-4 sm:px-0 ${className || ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                onClose && onClose()
              }}
              aria-label="Close dialog"
              className="
                absolute
                -top-14 right-3
                md:hidden
                 p-2 bg-white/20 hover:bg-white/30 text-white rounded
                transition
              "
            >
              <XIcon className="w-5 h-5" />
            </motion.button>

            {/* 桌面端关闭按钮 */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                onClose && onClose()
              }}
              aria-label="Close dialog"
              className="
                hidden
                md:block
                absolute
                top-0
                right-[-56px]
                p-2 bg-white/20 hover:bg-white/30 text-white rounded
                transition
              "
            >
              <XIcon className="w-5 h-5" />
            </motion.button>

            <div className="relative inline-block overflow-hidden rounded-lg">
              <LazyImage
                src={imageSrc}
                alt={thumbnailAlt}
                className="w-full object-contain"
                style={{ maxHeight: 'calc(100vh - 80px)', height: 'auto' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
