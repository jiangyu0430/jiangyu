//博客卡片
import React from 'react'
import PropTypes from 'prop-types'
import blogs from '../data/blogs'
import LazyImage from './LazyImage'

export function BlogSnippet({
  slug,
  image,
  title,
  date,
  description,
  layout = 'horizontal',
  size = 'small',
  onClick,
}) {
  const blog = slug ? blogs.find((b) => b.slug === slug) : {}

  const finalImage = image ?? blog?.image
  const finalTitle = title ?? blog?.title
  const finalDate = date ?? blog?.date
  const finalDescription = description ?? blog?.description

  const isVertical = layout === 'vertical'
  const isLarge = size === 'large'
  const Wrapper = 'div'

  return (
    <Wrapper
      onClick={onClick}
      className={`cursor-pointer ${
        isVertical ? 'flex flex-col' : 'flex gap-4 items-start'
      } transition`}
    >
      <div
        className={`relative overflow-hidden group ${
          isVertical
            ? isLarge
              ? 'h-60 w-full rounded-xl'
              : 'h-40 w-full rounded-lg'
            : 'w-24 h-16 rounded-md flex-shrink-0'
        }`}
      >
        <LazyImage
          src={finalImage}
          alt={finalTitle}
          className="object-cover transition-transform duration-200 ease-out hover:scale-105 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      <div
        className={`${
          isVertical
            ? 'mt-2 sm:mt-4 text-left'
            : 'flex-1 self-start flex flex-col justify-between overflow-hidden'
        }`}
      >
        {!(isVertical && isLarge) && (
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {finalDate}
          </p>
        )}
        <h4
          className={`${
            isVertical
              ? 'text-lg font-semibold mt-2 line-clamp-2'
              : 'text-base font-medium mt-1 truncate'
          }`}
        >
          {finalTitle}
        </h4>
        {isVertical && finalDescription && (
          <p className="text-sm text-zinc-400 mt-2 line-clamp-3">
            {finalDescription}
          </p>
        )}
      </div>
    </Wrapper>
  )
}

BlogSnippet.propTypes = {
  slug: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  size: PropTypes.oneOf(['small', 'large']),
  onClick: PropTypes.func,
}
