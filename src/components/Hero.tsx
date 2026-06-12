'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import FloralOrnament from './FloralOrnament'

const heroImages = [
  { src: '/images/carousel/hero-1.jpeg', alt: 'Painting work' },
  { src: '/images/carousel/hero-2.jpeg', alt: 'Interior painting' },
  { src: '/images/carousel/hero-3.jpeg', alt: 'Design finish' },
  { src: '/images/carousel/hero-4.jpeg', alt: 'Living space' },
]

export default function Hero() {
  const [quotePhone, setQuotePhone] = useState('')
  const [quoteSent, setQuoteSent] = useState(false)
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

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quotePhone.trim()) return

    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Quote Request',
        phone: quotePhone,
        district: '',
        scope: 'Free quote request via Hero section',
      }),
    })

    const msg = encodeURIComponent(
      `Hello Varnam Painting and Designs! I'd like a free quote for my project. Please contact me at ${quotePhone}.`,
    )
    window.open(`https://wa.me/919526100862?text=${msg}`, '_blank')
    setQuotePhone('')
    setQuoteSent(true)
  }

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

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-start gap-0 lg:min-h-0 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10">
        <motion.div
          style={{ y: imgY, opacity }}
          className="order-1 lg:order-2 relative h-[38vh] w-full overflow-hidden lg:h-screen lg:min-h-screen"
        >
          <AnimatePresence mode="popLayout">
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

          <div className="absolute inset-0 bg-gradient-to-b from-cream/15 via-transparent to-cream/15 lg:bg-gradient-to-r lg:from-cream/20 lg:via-transparent lg:to-transparent" />

          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-6 bg-cream' : 'w-1.5 bg-cream/50'
                }`}
              />
            ))}
          </div>
        </motion.div>

        <div className="order-2 lg:order-1 flex flex-col justify-center px-5 pb-8 pt-3 lg:px-0 lg:py-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className=""
          >
            <h1 className="font-serif text-5xl leading-[1.08] tracking-tight text-charcoal md:text-7xl lg:text-8xl">
              <span>Varnam</span>
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
            className="mt-3 flex flex-wrap gap-2"
          >
            <a
              href="/contact"
              className="group relative overflow-hidden border border-charcoal bg-charcoal px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-teal hover:border-teal sm:px-7 sm:py-3"
            >
              <span className="relative z-10">Get a Quote</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/5 to-transparent transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="/#services"
              className="group relative overflow-hidden border border-border bg-transparent px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-charcoal transition-all duration-300 hover:border-charcoal sm:px-7 sm:py-3"
            >
              <span className="relative z-10">Our Services</span>
            </a>
          </motion.div>

          <motion.form
            onSubmit={handleQuoteSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-4 border-t border-border pt-3"
          >
            <span className="text-[10px] uppercase tracking-[0.15em] text-stone-400 sm:text-xs">
              Get a Free Quote
            </span>
            <div className="mt-1.5 flex gap-2">
              {quoteSent ? (
                <div className="flex-1 border-b border-gold/40 py-2">
                  <span className="text-sm text-gold-dark">✓ We&apos;ll call you back!</span>
                </div>
              ) : (
                <>
                  <input
                    type="tel"
                    value={quotePhone}
                    onChange={(e) => setQuotePhone(e.target.value)}
                    placeholder="Your phone number"
                    required
                    className="min-w-0 flex-1 border-b border-border bg-transparent py-2 text-sm text-charcoal outline-none transition-colors placeholder:text-stone-300 focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="shrink-0 border border-charcoal bg-charcoal px-4 py-2 text-xs uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-teal hover:border-teal active:scale-95"
                  >
                    Submit
                  </button>
                </>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
