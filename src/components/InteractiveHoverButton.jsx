//小球按钮
import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// 简易 className 合并函数
function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const InteractiveHoverButton = React.forwardRef(
  ({ children, className, fixedTheme, href, onClick, ...restProps }, ref) => {
    return (
      <Link
        ref={ref}
        to={href}
        onClick={onClick}
        className={cn(
          fixedTheme
            ? 'group relative w-auto h-10 cursor-pointer overflow-hidden whitespace-nowrap text-center font-medium flex-shrink-0 rounded-lg bg-neutral-900 border border-neutral-600 text-white hover:bg-neutral-700 transition-colors p-2 px-6'
            : 'group relative w-auto h-10 cursor-pointer overflow-hidden whitespace-nowrap flex-shrink-0 rounded-lg bg-gray-100 border p-2 px-6 text-center font-medium text-primary-foreground transition-colors dark:bg-transparent dark:border dark:border-neutral-600 dark:text-white',
          className
        )}
        {...restProps}
      >
        {/* 默认内容：文字 + 彩球 */}
        <div className="flex items-center gap-2">
          <div
            className={
              fixedTheme
                ? 'h-[6px] w-[6px] rounded-full bg-white transition-all duration-300 group-hover:scale-[100.8]'
                : 'h-[6px] w-[6px] rounded-full bg-black dark:bg-white transition-all duration-300 group-hover:scale-[100.8]'
            }
          ></div>
          <span className="inline-block text-sm transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
            {children}
          </span>
        </div>

        {/* Hover 状态下浮现的文字 + 图标 */}
        <div
          className={
            fixedTheme
              ? 'absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-1 group-hover:text-black opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100'
              : 'absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-1 text-primary-foreground group-hover:text-white dark:group-hover:text-black opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100'
          }
        >
          <span className="text-sm">{children}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </div>
      </Link>
    )
  }
)

InteractiveHoverButton.displayName = 'InteractiveHoverButton'
