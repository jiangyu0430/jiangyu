import React, { useState, useEffect, useRef } from 'react'
import FadeInWhenVisible from '../components/FadeInWhenVisible'
import { HeroImageDialog } from '../components/HeroImageDialog'
import { NotesImage } from '../components/NotesImage'
import { notesItems } from '../data/notes'
import Masonry from 'react-masonry-css'

const breakpointColumnsObj = {
  default: 3,
  640: 2,
}

export default function Notes() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''

    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'))
    })
  }, [])

  const openDialog = (img) => {
    setCurrentImage(img)
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
    setCurrentImage(null)
  }

  return (
    <div ref={scrollRef} className="min-h-screen w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <FadeInWhenVisible delay={0.1} once>
          <div className="max-[1280px] text-5xl font-bold text-gray-900 dark:text-white mb-10">
            生活片段
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.2} y={60} once>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex -ml-4"
            columnClassName="pl-4"
          >
            {notesItems.map((item, idx) => (
              <FadeInWhenVisible key={idx} delay={0 + idx * 0.04} y={30}>
                <div className="mb-4 break-inside-avoid">
                  <NotesImage
                    imageSrc={item.image}
                    onClick={() => openDialog(item.image)}
                    aspectRatio={3 / 4}
                  />
                </div>
              </FadeInWhenVisible>
            ))}
          </Masonry>
        </FadeInWhenVisible>
      </div>
      <HeroImageDialog
        imageSrc={currentImage}
        thumbnailSrc={currentImage}
        isOpen={isOpen}
        onClose={closeDialog}
      />
    </div>
  )
}
