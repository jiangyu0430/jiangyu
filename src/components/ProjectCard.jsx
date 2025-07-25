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

  let resolvedImage = ''
  if (typeof finalImage === 'string') {
    resolvedImage = finalImage
  } else if (finalImage && typeof finalImage === 'object') {
    resolvedImage = isDark
      ? finalImage.dark ?? finalImage.light
      : finalImage.light ?? finalImage.dark
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

      {/* 中部分：支持本地/网络图，带 hover 动效 */}
      <div
        onClick={onClick}
        className="block w-full aspect-video overflow-hidden group cursor-pointer"
      >
        <LazyImage
          src={resolvedImage}
          alt={finalTitle}
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
            entered ? 'scale-100 translate-y-0' : 'scale-[1.04] translate-y-4'
          }`}
        />
      </div>

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
