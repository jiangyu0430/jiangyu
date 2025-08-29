// 伪footer
import { useState, useLayoutEffect } from 'react'

export default function PseudoFooter({ footerRef, lenisRef }) {
  const [height, setHeight] = useState(400)

  useLayoutEffect(() => {
    function updateHeight() {
      requestAnimationFrame(() => {
        if (footerRef.current) {
          const h = footerRef.current.getBoundingClientRect().height
          if (h > 0) {
            setHeight(h)
            if (lenisRef.current) lenisRef.current.resize()
          }
        }
      })
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [footerRef, lenisRef])

  return <div style={{ height, pointerEvents: 'none' }} aria-hidden="true" />
}
