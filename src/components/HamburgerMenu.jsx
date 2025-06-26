import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import animationData from '../assets/menuV2.json'

export default function HamburgerMenu({ isOpen }) {
  const container = useRef(null)
  const anim = useRef(null)

  useEffect(() => {
    if (container.current) {
      anim.current = lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        animationData,
      })
    }
    return () => anim.current?.destroy()
  }, [])

  useEffect(() => {
    if (anim.current) {
      anim.current.setDirection(isOpen ? 1 : -1)
      anim.current.play()
    }
  }, [isOpen])

  return (
    <div
      ref={container}
      style={{ width: 32, height: 32, cursor: 'pointer' }}
      className="dark:invert"
    />
  )
}
