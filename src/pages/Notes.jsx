import React, { useState, useEffect } from 'react'
import FadeInWhenVisible from '../components/FadeInWhenVisible'
import { HeroImageDialog } from '../components/HeroImageDialog'
import { NotesImage } from '../components/NotesImage'
import { notesItems } from '../data/notes' // 只保留这一个导入

export default function Notes() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)

  useEffect(() => {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''

    window.scrollTo(0, 0)

    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('scroll'))
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
    <div className="max-w-screen-xl mx-auto px-4 py-12">
      <FadeInWhenVisible delay={0.1} once>
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-10">
          生活片段
        </h1>
      </FadeInWhenVisible>

      <FadeInWhenVisible delay={0.2} y={60} once>
        <div className="columns-2 md:columns-3" style={{ columnGap: '16px' }}>
          {notesItems.map((item, idx) => (
            <div
              key={idx}
              style={{ marginBottom: '16px' }}
              className="break-inside-avoid"
            >
              <NotesImage
                key={idx}
                imageSrc={item.image}
                onClick={() => openDialog(item.image)}
              />
            </div>
          ))}
        </div>
      </FadeInWhenVisible>

      <HeroImageDialog
        imageSrc={currentImage}
        thumbnailSrc={currentImage}
        isOpen={isOpen}
        onClose={closeDialog}
      />
    </div>
  )
}
