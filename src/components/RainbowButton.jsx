//彩虹按钮
import React, { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * 拼接 className 字符串用
 */
function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const RainbowButton = React.forwardRef(
  (
    {
      children,
      className,
      popoverContent,
      popoverText,
      popoverDirection = 'down',
      ...props
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false)

    const popoverPositionClass =
      popoverDirection === 'down'
        ? 'absolute top-full mt-2 left-0'
        : 'absolute bottom-full mb-2 left-0'

    return (
      <div className="relative inline-block">
        <button
          ref={ref}
          className={cn(
            'group relative tracking-wider inline-flex h-[40px] animate-rainbow cursor-pointer items-center justify-center rounded-lg border-0 bg-[length:200%] px-6 py-2 font-medium text-[14px] leading-none text-white dark:text-black transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
            'before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:[filter:blur(calc(0.8*1rem))]',
            'dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]',
            'bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))]',
            className
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          {...props}
        >
          {children}
        </button>
        {popoverContent && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
            transition={{ duration: 0.2 }}
            className={cn(
              popoverPositionClass,
              'w-[200px] bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-50 pointer-events-none'
            )}
          >
            <div className="flex flex-col items-center p-1">
              {popoverContent}
              {popoverText && (
                <p className="mb-1 text-[14px] text-gray-500">{popoverText}</p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    )
  }
)

RainbowButton.displayName = 'RainbowButton'
