import LazyImage from './LazyImage'

export function NotesImage({ imageSrc, alt, onClick, className }) {
  return (
    <div className={`overflow-hidden rounded-xl ${className || ''}`}>
      <LazyImage
        src={
          typeof imageSrc === 'string'
            ? imageSrc
            : imageSrc?.src || imageSrc?.default
        }
        alt={alt || 'Image thumbnail'}
        className="block cursor-pointer select-none transition-transform duration-300 ease-in-out hover:scale-110"
        onClick={onClick}
        loading="lazy"
        draggable={false}
      />
    </div>
  )
}
