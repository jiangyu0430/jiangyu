//首页作品卡片
import React, { useEffect, useState, useRef } from 'react'
import projects from '../data/projects'
import LazyImage from './LazyImage'

const WorkCard = ({ slug, image, title, subtitle, onClick }) => {
  const project = slug ? projects.find((p) => p.slug === slug) : {}

  const finalImage = image ?? project?.image
  const finalTitle = title ?? project?.title
  const finalSubtitle = subtitle ?? project?.description

  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    updateTheme()

    return () => observer.disconnect()
  }, [])

  // 响应式图片选择逻辑
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const hasSquare = typeof finalImage === 'object' && finalImage.square
  const hasWide = typeof finalImage === 'object' && finalImage.wide

  const resolvedImage =
    typeof finalImage === 'string'
      ? finalImage
      : hasSquare && !isMobile
      ? finalImage.square
      : hasWide
      ? finalImage.wide
      : isDark
      ? finalImage?.dark ?? finalImage?.light
      : finalImage?.light ?? finalImage?.dark

  const [showCursor, setShowCursor] = useState(false)
  const cursorRef = useRef(null)
  const cursorX = useRef(0)
  const cursorY = useRef(0)
  const targetX = useRef(0)
  const targetY = useRef(0)
  const animationFrameId = useRef(null)

  const handleMouseMove = (e) => {
    targetX.current = e.clientX
    targetY.current = e.clientY
    // Snap the cursor position immediately to mouse position to prevent drift
    // cursorX.current = e.clientX
    // cursorY.current = e.clientY
  }

  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor

    const animate = () => {
      cursorX.current = lerp(cursorX.current, targetX.current, 0.2)
      cursorY.current = lerp(cursorY.current, targetY.current, 0.2)

      if (cursorRef.current) {
        // Offset the ball to lower-right of the pointer by 20px
        cursorRef.current.style.left = `${cursorX.current + 20}px`
        cursorRef.current.style.top = `${cursorY.current + 20}px`
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    if (showCursor) {
      animationFrameId.current = requestAnimationFrame(animate)
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
      }
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [showCursor])

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="cursor-pointer block rounded-2xl p-2 hover:bg-gray-100"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick && onClick()
        }
      }}
    >
      {/* 图片部分 */}
      <div
        className="relative h-[240px] sm:h-[420px] lg:h-[620px] rounded-2xl overflow-hidden group"
        onMouseEnter={(e) => {
          // When entering a new card, reset the ball position to mouse position to prevent drift
          targetX.current = e.clientX
          targetY.current = e.clientY
          cursorX.current = e.clientX
          cursorY.current = e.clientY
          setShowCursor(true)
        }}
        onMouseLeave={() => setShowCursor(false)}
        onMouseMove={handleMouseMove}
      >
        <LazyImage
          src={resolvedImage}
          alt={finalTitle}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105 rounded-2xl"
        />
      </div>

      {/* 文字部分 */}
      <div className="sm:p-5 p-2 flex flex-col justify-center space-y-2">
        <div
          className="text-xl sm:text-[22px] font-medium text-zinc-950 truncate"
          title={finalTitle}
        >
          {finalTitle}
        </div>
        <div
          className="text-[13px] sm:text-base text-gray-500 leading-tight truncate whitespace-nowrap overflow-hidden"
          title={finalSubtitle}
        >
          {finalSubtitle}
        </div>
      </div>

      {showCursor && (
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9999] bg-white/30 backdrop-blur-sm -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
          </svg>
        </div>
      )}
    </div>
  )
}

export default WorkCard
