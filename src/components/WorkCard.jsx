//首页作品卡片
import React from 'react'
import projects from '../data/projects'
import LazyImage from './LazyImage'

const WorkCard = ({ slug, image, title, subtitle, onClick }) => {
  const project = slug ? projects.find((p) => p.slug === slug) : {}

  const finalImage = image ?? project?.image
  const finalTitle = title ?? project?.title
  const finalSubtitle = subtitle ?? project?.description

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
        src={finalImage}
        alt={finalTitle}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
      />

      {/* 底部文字区域 */}
      <div className="absolute bottom-0 w-full h-[72px] sm:h-[80px] px-4 py-4 flex flex-col justify-center space-y-1 bg-black/20 backdrop-blur-sm">
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
