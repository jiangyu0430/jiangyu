import React, { useState, useEffect, useMemo } from 'react'
import FadeInWhenVisible from '../components/FadeInWhenVisible'
import { HeroImageDialog } from '../components/HeroImageDialog'
import { HeroVideoDialog } from '../components/HeroVideoDialog'
import { NotesImage } from '../components/NotesImage'
import Masonry from 'react-masonry-css'
import { notesImages } from '../data/notes.js'

export default function Notes() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(null)
  const [dialogType, setDialogType] = useState('') // 'image' | 'video'
  const [columnCount, setColumnCount] = useState(() => {
    const saved = localStorage.getItem('notesColumnCount')
    return saved ? Number(saved) : 4
  })

  const breakpointColumnsObj = useMemo(
    () => ({
      default: columnCount,
      640: 2,
    }),
    [columnCount]
  )

  useEffect(() => {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }, [])

  useEffect(() => {
    localStorage.setItem('notesColumnCount', columnCount)
  }, [columnCount])

  const openDialog = (src) => {
    const isVideo = src.endsWith('.mp4')
    setCurrentSrc(src)
    setDialogType(isVideo ? 'video' : 'image')
    setIsOpen(true)
  }

  const closeDialog = () => {
    setIsOpen(false)
    setCurrentSrc(null)
    setDialogType('')
  }

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <FadeInWhenVisible delay={0.1} once>
          <div className="flex justify-between items-center mb-10">
            <div className="max-[1280px] text-5xl font-bold text-gray-900 dark:text-white">
              生活片段
            </div>
            <div className="hidden sm:block">
              <input
                type="range"
                min="3"
                max="6"
                step="1"
                value={columnCount}
                onChange={(e) => setColumnCount(Number(e.target.value))}
                className="w-32 h-0.5 rounded-lg cursor-pointer bg-zinc-400 dark:bg-zinc-500 appearance-none"
              />
              <style>{`
                input[type='range']::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  height: 20px;
                  width: 20px;
                  border-radius: 9999px;
                  border: 2px solid black;
                  background-color: white;
                  box-shadow: none;
                }
                .dark input[type='range']::-webkit-slider-thumb {
                  border: 2px solid white;
                  background-color: black;
                }
                input[type='range']:focus {
                  outline: none;
                }
                input[type='range']:focus::-webkit-slider-thumb,
                input[type='range']::-webkit-slider-thumb:active {
                  box-shadow: none;
                  filter: none;
                }
              `}</style>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.2} y={60} once>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex -ml-4"
            columnClassName="pl-4"
          >
            {notesImages.map((src, i) => {
              const isVideo = src.endsWith('.mp4')
              return (
                <div
                  key={i}
                  className="mb-4 break-inside-avoid cursor-pointer"
                  onClick={() => openDialog(src)}
                >
                  {isVideo ? (
                    <video
                      src={src}
                      className="w-full rounded"
                      preload="metadata"
                      muted
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause()
                        e.currentTarget.currentTime = 0
                      }}
                      style={{ objectFit: 'contain' }}
                    />
                  ) : (
                    <NotesImage imageSrc={src} aspectRatio={3 / 4.5} />
                  )}
                </div>
              )
            })}
          </Masonry>
        </FadeInWhenVisible>
      </div>

      {isOpen && dialogType === 'image' && (
        <HeroImageDialog
          imageSrc={currentSrc}
          thumbnailSrc={currentSrc}
          isOpen={isOpen}
          onClose={closeDialog}
        />
      )}

      {isOpen && dialogType === 'video' && (
        <HeroVideoDialog
          videoSrc={currentSrc}
          isOpen={isOpen}
          onClose={closeDialog}
        />
      )}
    </div>
  )
}
