import LazyImage from './LazyImage'
//项目集作品卡片
import { InteractiveHoverButton } from './InteractiveHoverButton'
import projects from '../data/projects'
import { useEffect, useState, useRef } from 'react'

export function ProjectCard({
  slug,
  type,
  date,
  title,
  description,
  image,
  tags,
  onClick = () => {},
}) {
  // Custom cursor ball state and refs
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
  }

  const fallback = slug ? projects.find((p) => p.slug === slug) : {}

  const finalTitle = title ?? fallback?.title
  const finalDate = date ?? fallback?.date
  const finalType = type ?? fallback?.type
  const finalDesc = description ?? fallback?.description
  const finalImage = image ?? fallback?.image
  const finalTags = tags ?? fallback?.tags ?? []

  const [isDark, setIsDark] = useState(false)

  const containerRef = useRef(null)
  const [entered, setEntered] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.3,
      }
    )

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [])

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

  // Smooth cursor animation effect
  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor

    const animate = () => {
      cursorX.current = lerp(cursorX.current, targetX.current, 0.2)
      cursorY.current = lerp(cursorY.current, targetY.current, 0.2)

      if (cursorRef.current) {
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
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current)
    }
  }, [showCursor])

  let resolvedImage = ''
  if (typeof finalImage === 'string') {
    resolvedImage = finalImage
  } else if (finalImage && typeof finalImage === 'object') {
    // 优先使用 wide，如果没有 wide 则走原有 dark/light 逻辑
    if (finalImage.wide) {
      resolvedImage = finalImage.wide
    } else {
      resolvedImage = isDark
        ? finalImage.dark ?? finalImage.light
        : finalImage.light ?? finalImage.dark
    }
  }

  return (
    <div
      ref={containerRef}
      className="bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800 rounded-xl"
    >
      {/* 上部分 */}
      <div className="py-6 px-6 space-y-2">
        <div className="flex flex-wrap gap-1 text-[12px] items-center">
          <span className="text-indigo-500 dark:text-indigo-400">
            {finalType.split('/').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i !== arr.length - 1 && (
                  <span
                    style={{
                      fontFamily: 'Arial',
                      color: 'inherit',
                      margin: '0 0.2em',
                    }}
                  >
                    /
                  </span>
                )}
              </span>
            ))}
          </span>
          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-500 mx-1" />
          <span className="text-gray-500 dark:text-zinc-400">{finalDate}</span>
        </div>
        <h3 className="text-[26px] font-semibold">{finalTitle}</h3>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed text-justify">
          {finalDesc}
        </p>
      </div>

      {/* 中部分：支持本地/网络图、gif、mp4，带 hover 动效 */}
      <div
        onClick={onClick}
        className="block w-full aspect-video overflow-hidden group cursor-pointer"
        onMouseEnter={(e) => {
          targetX.current = e.clientX
          targetY.current = e.clientY
          cursorX.current = e.clientX
          cursorY.current = e.clientY
          setShowCursor(true)
        }}
        onMouseLeave={() => setShowCursor(false)}
        onMouseMove={handleMouseMove}
      >
        {resolvedImage && resolvedImage.endsWith('.mp4') ? (
          <video
            ref={videoRef}
            src={resolvedImage}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
              entered ? 'scale-100 translate-y-0' : 'scale-[1.1] translate-y-4'
            }`}
            muted
            loop
            playsInline
            onMouseEnter={() => videoRef.current?.play()}
            onMouseLeave={() => videoRef.current?.pause()}
          />
        ) : (
          <LazyImage
            src={resolvedImage}
            alt={finalTitle}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
              entered ? 'scale-100 translate-y-0' : 'scale-[1.04] translate-y-4'
            }`}
          />
        )}
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
            className="w-6 h-6"
          >
            <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
          </svg>
        </div>
      )}

      {/* 下部分 */}
      <div className="py-4 px-6  flex items-center justify-between">
        <div className="flex flex-wrap gap-3 text-gray-500 dark:text-zinc-400 text-[12px]">
          {finalTags.map((tag, index) => (
            <span key={index}># {tag}</span>
          ))}
        </div>
        <InteractiveHoverButton onClick={onClick}>
          了解更多
        </InteractiveHoverButton>
      </div>
    </div>
  )
}
