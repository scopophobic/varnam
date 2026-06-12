'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import galleryData from '@/lib/gallery-data'
import type { GalleryImage } from '@/lib/gallery-data'
import Reveal from './Reveal'

interface DbImage {
  id: string
  url: string
  title: string
  category: string
  location: string
  createdAt: string
}

export default function Gallery() {
  const [allImages, setAllImages] = useState<GalleryImage[]>(galleryData)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => (r.ok ? r.json() : []))
      .then((dbItems: DbImage[]) => {
        if (dbItems.length > 0) {
          const mapped: GalleryImage[] = dbItems.map((i) => ({
            url: i.url,
            title: i.title,
            category: i.category,
            location: i.location,
          }))
          setAllImages([...mapped, ...galleryData])
        }
      })
      .catch(() => {})
  }, [])

  const selected = selectedIndex !== null ? allImages[selectedIndex] : null

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex(
      selectedIndex === 0 ? allImages.length - 1 : selectedIndex - 1,
    )
  }, [selectedIndex, allImages.length])

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return
    setSelectedIndex(
      selectedIndex === allImages.length - 1 ? 0 : selectedIndex + 1,
    )
  }, [selectedIndex, allImages.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedIndex === null) return
      if (e.key === 'Escape') setSelectedIndex(null)
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [selectedIndex, handlePrev, handleNext])

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedIndex])

  return (
    <section className="bg-cream/75">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-16 lg:py-32">
        <Reveal y={20}>
          <div className="text-center">
            <span className="inline-block rounded-full bg-pink/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-pink">
              Gallery
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-charcoal md:text-5xl">
              Our Portfolio
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-pink to-gold" />
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-charcoal/85 md:text-base">
              Browse through our completed projects across Kerala — from luxury
              interiors to commercial transformations.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 columns-1 gap-4 sm:columns-2 sm:gap-6 lg:columns-3">
          {allImages.map((image, index) => (
            <motion.div
              key={`${image.url}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: (index % 6) * 0.06 }}
              className="group relative mb-4 cursor-pointer overflow-hidden break-inside-avoid sm:mb-6"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="relative overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.title}
                  width={800}
                  height={index % 3 === 0 ? 1000 : index % 3 === 1 ? 700 : 850}
                  className="w-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-6">
                  <h3 className="font-serif text-sm text-white sm:text-lg">
                    {image.title}
                  </h3>
                  <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-white/80 sm:text-xs">
                    {image.category}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal y={20} delay={0.3}>
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-border px-7 py-3 text-xs font-bold uppercase tracking-[0.15em] text-charcoal transition-all duration-300 hover:border-gold hover:bg-gold/10 sm:px-8 sm:py-3.5"
            >
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Back to Home
            </Link>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected && selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 backdrop-blur-sm"
            onClick={() => setSelectedIndex(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedIndex(null)
              }}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center text-cream/60 transition-colors hover:text-cream sm:top-6 sm:right-6"
              aria-label="Close lightbox"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                handlePrev()
              }}
              className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-cream/40 transition-colors hover:text-cream sm:left-6 sm:h-12 sm:w-12"
              aria-label="Previous image"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sm:w-5 sm:h-5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNext()
              }}
              className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-cream/40 transition-colors hover:text-cream sm:right-6 sm:h-12 sm:w-12"
              aria-label="Next image"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="sm:w-5 sm:h-5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="relative max-h-[80vh] max-w-[92vw] sm:max-h-[85vh] sm:max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected.url}
                alt={selected.title}
                width={1200}
                height={900}
                className="max-h-[80vh] w-auto object-contain shadow-2xl sm:max-h-[85vh]"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-4 pt-10 sm:p-6 sm:pt-12">
                <h3 className="font-serif text-base text-white sm:text-xl">
                  {selected.title}
                </h3>
                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-gold sm:text-xs">
                  {selected.category}
                </p>
                <p className="mt-0.5 text-[10px] text-white/70 sm:text-xs">
                  {selected.location}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
