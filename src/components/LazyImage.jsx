import React, { useState, useRef, useEffect } from 'react'

export default function LazyImage({
  src,
  alt = '',
  className = '',
  placeholder = null,
  fallbackSrc = null,
  aspectRatio: propAspectRatio = null,
  ...rest
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [aspectRatio, setAspectRatio] = useState(propAspectRatio)
  const imgRef = useRef(null)

  useEffect(() => {
    if (propAspectRatio) return

    const img = new Image()
    img.src = src
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        setAspectRatio(img.naturalWidth / img.naturalHeight)
      } else {
        setAspectRatio(16 / 9)
      }
    }
    img.onerror = () => {
      setAspectRatio(16 / 9)
    }
  }, [src, propAspectRatio])

  useEffect(() => {
    if (!imgRef.current || 'loading' in HTMLImageElement.prototype) return

    const observer = new IntersectionObserver(
      ([entry], observerInstance) => {
        if (entry.isIntersecting && imgRef.current) {
          imgRef.current.src = src
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

  const dynamicPlaceholder = (
    <div
      className="w-full bg-zinc-200 dark:bg-zinc-800 rounded aspect-[16/9]"
      style={{ aspectRatio: aspectRatio || 16 / 9 }}
    />
  )

  if (hasError && fallbackSrc) {
    return <img src={fallbackSrc} alt={alt} className={className} {...rest} />
  }

  return (
    <>
      {!isLoaded && (placeholder || dynamicPlaceholder)}
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
