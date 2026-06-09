'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import galleryData from '@/lib/gallery-data'
import Reveal from './Reveal'

interface DbImage {
  id: string
  url: string
  title: string
  category: string
  location: string
}

export default function GalleryPreview() {
  const [previewImages, setPreviewImages] = useState(galleryData.slice(0, 4))

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => (r.ok ? r.json() : []))
      .then((dbItems: DbImage[]) => {
        if (dbItems.length > 0) {
          const mapped = dbItems.map((i) => ({
            url: i.url, title: i.title, category: i.category, location: i.location,
          }))
          setPreviewImages([...mapped, ...galleryData].slice(0, 4))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="gallery" className="border-t border-border bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-16 lg:py-32">
        <Reveal y={20}>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-gold">
              Our Work
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-charcoal md:text-5xl">
              Featured Projects
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-12 bg-gold" />
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-6">
          {previewImages.map((image, index) => (
            <motion.div
              key={`${image.url}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative cursor-pointer overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={image.url}
                  alt={image.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-5">
                  <h3 className="font-serif text-xs text-white sm:text-base">
                    {image.title}
                  </h3>
                  <p className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-white/70 sm:text-xs">
                    {image.category}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Reveal y={20} delay={0.3}>
          <div className="mt-10 text-center sm:mt-12">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-2 border border-border px-7 py-3 text-xs uppercase tracking-[0.2em] text-charcoal transition-all duration-300 hover:border-charcoal sm:px-8 sm:py-3.5"
            >
              View Full Gallery
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
