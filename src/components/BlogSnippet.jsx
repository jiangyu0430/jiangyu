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
  imgWidth,
  imgHeight,
}) {
  const blog = slug ? blogs.find((b) => b.slug === slug) : {}

  const finalImage = image ?? blog?.image
  const finalTitle = title ?? blog?.title
  const finalDate = date ?? blog?.date
  const finalDescription = description ?? blog?.description

  const isVertical = layout === 'vertical'
  const isLarge = size === 'large'
  const Wrapper = 'div'

  const [showCursor, setShowCursor] = React.useState(false)
  const cursorRef = React.useRef(null)
  const cursorX = React.useRef(0)
  const cursorY = React.useRef(0)
  const targetX = React.useRef(0)
  const targetY = React.useRef(0)
  const animationFrameId = React.useRef(null)

  const handleMouseMove = (e) => {
    targetX.current = e.clientX
    targetY.current = e.clientY
  }

  React.useEffect(() => {
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
    } else if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current)
      animationFrameId.current = null
    }

    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current)
    }
  }, [showCursor])

  return (
    <Wrapper
      onClick={onClick}
      className={`cursor-pointer transition ${
        isVertical
          ? 'flex flex-col hover:bg-gray-100 p-2 rounded-2xl'
          : 'flex gap-4 items-start'
      }`}
    >
      <div
        className={`relative overflow-hidden group ${
          isVertical
            ? `${imgHeight ?? (isLarge ? 'h-60' : 'h-40')} ${
                imgWidth ?? 'w-full'
              } ${isLarge ? 'rounded-xl' : 'rounded-lg'}`
            : 'w-32 h-[72px] rounded-md flex-shrink-0'
        }`}
        onMouseEnter={(e) => {
          if (isVertical) {
            targetX.current = e.clientX
            targetY.current = e.clientY
            setShowCursor(true)
          }
        }}
        onMouseLeave={() => isVertical && setShowCursor(false)}
        onMouseMove={isVertical ? handleMouseMove : undefined}
      >
        <LazyImage
          src={finalImage}
          alt={finalTitle}
          className="object-cover transition-transform duration-200 ease-out hover:scale-105 w-full h-full"
        />
      </div>
      {isVertical && showCursor && (
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
      <div
        className={`${
          isVertical
            ? 'text-left p-5'
            : 'flex-1 self-start flex flex-col justify-between overflow-hidden'
        }`}
      >
        {!(isVertical && isLarge) && (
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            {finalDate}
          </p>
        )}
        <h4
          className={`${
            isVertical
              ? 'text-xl text-zinc-950 font-medium mt-2 line-clamp-1 sm:line-clamp-2'
              : 'text-base font-medium mt-1 line-clamp-2'
          }`}
        >
          {finalTitle}
        </h4>
        {isVertical && finalDescription && (
          <p className="text-base text-gray-500 mt-2 line-clamp-1 sm:line-clamp-2">
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
  imgWidth: PropTypes.string,
  imgHeight: PropTypes.string,
}
