import React, { useState, useRef, useEffect } from 'react'

const defaultPlaceholder = (
  <div className="w-full aspect-[16/9] bg-zinc-100 rounded" />
)

export default function LazyImage({
  src,
  alt = '',
  className = '',
  placeholder = defaultPlaceholder,
  fallbackSrc = null,
  ...rest
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    if (!imgRef.current) return

    if ('loading' in HTMLImageElement.prototype) {
      // 原生支持懒加载，直接设置状态为已加载
      setIsLoaded(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry], observerInstance) => {
        if (entry.isIntersecting) {
          if (imgRef.current) {
            imgRef.current.src = src
          }
          observerInstance.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(imgRef.current)

    return () => observer.disconnect()
  }, [src])

  const handleLoad = () => setIsLoaded(true)
  const handleError = () => setHasError(true)

  if (hasError && fallbackSrc) {
    return <img src={fallbackSrc} alt={alt} className={className} {...rest} />
  }

  return (
    <>
      {!isLoaded && placeholder}
      <img
        ref={imgRef}
        src={'loading' in HTMLImageElement.prototype ? src : undefined}
        alt={alt}
        loading="lazy"
        className={`${className} transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        {...rest}
      />
    </>
  )
}
