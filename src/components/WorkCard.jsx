//首页作品卡片
import React, { useEffect, useState } from 'react'
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

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="relative h-[260px] sm:h-[420px] rounded-xl overflow-hidden group cursor-pointer block"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick && onClick()
        }
      }}
    >
      {/* 背景图片 */}
      <LazyImage
        src={resolvedImage}
        alt={finalTitle}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />

      {/* 底部文字区域 */}
      <div className="absolute bottom-0 w-full h-[72px] sm:h-[80px] px-4 py-4 flex flex-col justify-center space-y-1 bg-gradient-to-t from-black/80 to-transparent ">
        <div
          className="text-[16px] sm:text-[18px] font-medium text-white truncate transition-all duration-300 group-hover:translate-y-[-2px]"
          title={finalTitle}
        >
          {finalTitle}
        </div>
        <div
          className="text-[13px] sm:text-[14px] text-white/80 leading-tight transition-all duration-300 group-hover:translate-y-[-1px] truncate whitespace-nowrap overflow-hidden"
          title={finalSubtitle}
        >
          {finalSubtitle}
        </div>
      </div>
    </div>
  )
}

export default WorkCard
