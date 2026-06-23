'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import FloralOrnament from './FloralOrnament'

const heroImages = [
  { src: 'https://res.cloudinary.com/drzdylixy/image/upload/q_auto,f_auto,w_1200/v1782220021/varnam-carousel/b271ruodvegyssx4q44o.jpg', alt: 'Kerala Home Painting' },
  { src: 'https://res.cloudinary.com/drzdylixy/image/upload/q_auto,f_auto,w_1200/v1782220023/varnam-carousel/w8l0w6zitv0ca7lob48n.jpg', alt: 'Authorized Asian Paints Partner Finish' },
  { src: 'https://res.cloudinary.com/drzdylixy/image/upload/q_auto,f_auto,w_1200/v1782220024/varnam-carousel/w9htsypa7tzyk4adacdi.jpg', alt: 'Premium Exterior Coating' },
  { src: 'https://res.cloudinary.com/drzdylixy/image/upload/q_auto,f_auto,w_1200/v1782220025/varnam-carousel/kuhaq2sabc4vlupg82sc.jpg', alt: 'Luxury Design Finish' },
  { src: 'https://res.cloudinary.com/drzdylixy/image/upload/q_auto,f_auto,w_1200/v1782220026/varnam-carousel/zwir244nfdkpim50fgn1.jpg', alt: 'Varnam Painting and Designs' },
]

const whatsappMsg = encodeURIComponent(
  'Hello Varnam Painting and Designs! I\'d like a free quote for my project.',
)

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.5])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const next = (currentIndex + 1) % heroImages.length
    const img = new window.Image()
    img.src = heroImages[next].src
  }, [currentIndex])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-cream/75"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[radial-gradient(ellipse_at_center,_#D4AF3714_0%,_transparent_60%)] blur-3xl"
      />

      <FloralOrnament className="absolute top-20 left-6 h-16 w-16 text-gold/20 lg:left-10" />
      <FloralOrnament className="absolute bottom-20 right-6 h-20 w-20 rotate-45 text-teal/15 lg:right-10" />

      <div className="relative z-10 grid min-h-screen grid-cols-1 items-start gap-0 lg:min-h-screen lg:grid-cols-2 lg:items-center lg:gap-0">
        <motion.div
          style={{ y: imgY, opacity }}
          className="order-1 lg:order-2 relative w-full h-[33vh] lg:h-[50vh] xl:h-[56vh] overflow-hidden rounded-none lg:rounded-l-[2.5rem] shadow-none lg:shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-none lg:border-t lg:border-b lg:border-l lg:border-white/60 mt-16 lg:mt-0"
        >
          <AnimatePresence mode="sync">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <Image
                src={heroImages[currentIndex].src}
                alt={heroImages[currentIndex].alt}
                fill
                className="object-cover"
                priority={currentIndex < 2}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </AnimatePresence>

          {/* Bottom shadow gradient overlay for indicators */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        <div className="order-2 lg:order-1 flex flex-col justify-center px-5 pb-8 pt-8 lg:py-0 lg:pl-10 xl:pl-[calc((100vw-1280px)/2+40px)] lg:pr-12 xl:pr-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-5 flex items-center gap-3"
          >
            <div className="relative h-9 w-28 overflow-hidden rounded-lg border border-border/70 bg-white p-1 shadow-sm shrink-0">
              <Image
                src="/asian-paints-partner.jpg"
                alt="Authorized Asian Paints Painting Contractor"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-stone-500">
              Authorized Partner
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className=""
          >
            <h1 className="font-serif text-5xl leading-[1.08] tracking-tight text-charcoal md:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-r from-teal via-gold to-terracotta bg-clip-text text-transparent text-gradient-shift">Varnam</span>
              <br />
              <span>Painting</span>
              <br />
              <span className="text-teal">and Designs</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-1.5 max-w-md text-xs leading-relaxed text-charcoal/85 sm:text-sm md:text-base"
          >
            Bringing life to spaces through colours — with care, craftsmanship,
            and the perfect palette for every corner of Kerala.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-4 flex flex-wrap gap-3"
          >
            <a
              href={`https://wa.me/919526100862?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden border border-teal bg-teal px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-teal-dark hover:border-teal-dark active:scale-95 sm:px-8 sm:py-3.5"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2 inline-block -mt-0.5"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="#services"
              className="group relative overflow-hidden border border-border bg-transparent px-6 py-3 text-xs uppercase tracking-[0.2em] text-charcoal transition-all duration-300 hover:border-charcoal sm:px-8 sm:py-3.5"
            >
              <span className="relative z-10">Our Services</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
