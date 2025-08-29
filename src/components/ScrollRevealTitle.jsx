import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, useEffect } from 'react'

export default function ScrollRevealTitle({
  children,
  offsetY = -400,
  initialScale = 1.3,
  scrollDistance = 300,
  lenis, // optional Lenis instance
}) {
  const containerRef = useRef(null)
  const y = useMotionValue(offsetY)
  const scale = useMotionValue(initialScale)

  const smoothY = useSpring(y, { stiffness: 200, damping: 30 })
  const smoothScale = useSpring(scale, { stiffness: 200, damping: 30 })

  useEffect(() => {
    if (!containerRef.current) return

    let rafId

    const update = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const progress = Math.min(
        Math.max((viewportHeight - rect.top) / scrollDistance, 0),
        1
      )

      y.set(offsetY * (1 - progress))
      scale.set(initialScale - (initialScale - 1) * progress)

      rafId = requestAnimationFrame(update)
    }

    update() // start RAF loop

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [offsetY, initialScale, scrollDistance, y, scale])

  return (
    <motion.div ref={containerRef} style={{ y: smoothY, scale: smoothScale }}>
      {children}
    </motion.div>
  )
}
