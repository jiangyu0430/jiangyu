//滚动条
'use client'

import React, { forwardRef, useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const ScrollProgress = forwardRef(
  ({ className, target, ...props }, ref) => {
    const [progress, setProgress] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false)
    const timeoutRef = useRef(null)

    useEffect(() => {
      const el = target?.current || window

      const handleScroll = () => {
        const scrollTop = el === window ? window.scrollY : el.scrollTop
        const scrollHeight =
          el === window
            ? document.documentElement.scrollHeight
            : el.scrollHeight
        const clientHeight =
          el === window ? window.innerHeight : el.clientHeight
        const percent = scrollTop / (scrollHeight - clientHeight)
        setProgress(percent)
        setIsScrolling(true)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setIsScrolling(false), 300)
      }

      el.addEventListener('scroll', handleScroll, { passive: true })
      handleScroll()

      return () => {
        el.removeEventListener('scroll', handleScroll)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
      }
    }, [target])

    return (
      <motion.div
        ref={ref}
        className={cn(
          'fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-[#A97CF8] via-[#AE48FF] to-[#18CCFC] transition-opacity duration-300',
          className
        )}
        style={{
          scaleX: progress,
          opacity: isScrolling ? 1 : 0.4,
        }}
        {...props}
      />
    )
  }
)

ScrollProgress.displayName = 'ScrollProgress'
