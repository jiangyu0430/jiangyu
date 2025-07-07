import LazyImage from './LazyImage'

export function NotesImage({ imageSrc, alt, onClick, className, aspectRatio }) {
  return (
    <div
      className={`notes-image overflow-hidden rounded-xl cursor-pointer ${
        className || ''
      }`}
    >
      <LazyImage
        src={
          typeof imageSrc === 'string'
            ? imageSrc
            : imageSrc?.src || imageSrc?.default
        }
        alt={alt || 'Image thumbnail'}
        loading="lazy"
        aspectRatio={aspectRatio}
        onClick={onClick}
        className="block transition-transform duration-300 ease-in-out hover:scale-110"
      />
    </div>
  )
}
