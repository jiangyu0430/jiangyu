import LazyImage from './LazyImage'

export function NotesImage({ imageSrc, alt, onClick, className, aspectRatio }) {
  // 直接使用传入路径作为基础，不拆后缀
  const srcBase = imageSrc

  return (
    <div
      className={`notes-image overflow-hidden rounded-sm cursor-pointer ${
        className || ''
      }`}
    >
      <LazyImage
        src={srcBase}
        srcSet={`
          ${srcBase} 1x
        `}
        alt={alt || 'Image thumbnail'}
        loading="lazy"
        aspectRatio={aspectRatio}
        onClick={onClick}
        className="block transition-transform duration-300 ease-in-out hover:scale-110"
      />
    </div>
  )
}
