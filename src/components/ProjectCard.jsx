import LazyImage from './LazyImage'
//项目集作品卡片
import { InteractiveHoverButton } from './InteractiveHoverButton'
import projects from '../data/projects'

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

  return (
    <div className="bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800 rounded-xl">
      {/* 上部分 */}
      <div className="py-6 px-6 space-y-2">
        <div className="flex flex-wrap gap-1 text-[12px] items-center">
          <span className="text-indigo-500 dark:text-indigo-400">
            {finalType}
          </span>
          <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-500 mx-1" />
          <span className="text-gray-500 dark:text-zinc-400">{finalDate}</span>
        </div>
        <h3 className="text-[26px] font-semibold">{finalTitle}</h3>
        <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed text-justify">
          {finalDesc}
        </p>
      </div>

      {/* 中部分：支持本地/网络图，带 hover 动效 */}
      <div
        onClick={onClick}
        className="block w-full aspect-video overflow-hidden group cursor-pointer"
      >
        <LazyImage
          src={finalImage}
          alt={finalTitle}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
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
