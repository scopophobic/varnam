'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [quotePhone, setQuotePhone] = useState('')
  const [quoteSent, setQuoteSent] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

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
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#D4AF3708_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_right,_#13655708_0%,_transparent_50%)]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-8 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block pb-2 text-[10px] uppercase tracking-[0.25em] text-gold sm:text-xs"
          >
            <span className="mlm text-sm tracking-normal">കേരളം</span>
            <span className="mx-2 opacity-40">·</span>
            Established in Kerala
          </motion.span>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 sm:mt-8"
          >
            <h1 className="font-serif text-4xl leading-[1.05] tracking-tight text-charcoal sm:text-6xl md:text-8xl lg:text-9xl">
              <span className="text-gold">Varnam</span>
              <br />
              <span>Painting</span>
              <br />
              <span className="text-teal">and Designs</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg font-serif text-sm tracking-wide text-charcoal/55 sm:text-base md:text-xl lg:text-2xl">
              Premium painting contractor across Kerala.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8"
          >
            <a
              href="/contact"
              className="group relative overflow-hidden border border-charcoal bg-charcoal px-6 py-3 text-xs uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-teal hover:border-teal sm:px-10 sm:py-4"
            >
              <span className="relative z-10">Get a Quote</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/5 to-transparent transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href="/#services"
              className="group relative overflow-hidden border border-border bg-transparent px-6 py-3 text-xs uppercase tracking-[0.2em] text-charcoal transition-all duration-300 hover:border-charcoal sm:px-10 sm:py-4"
            >
              <span className="relative z-10">Our Services</span>
            </a>
          </motion.div>

          <motion.form
            onSubmit={handleQuoteSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mx-auto mt-8 max-w-md border-t border-border pt-5"
          >
            <span className="text-xs uppercase tracking-[0.15em] text-stone-400">
              Get a Free Quote
            </span>
            <div className="mt-3 flex gap-2">
              {quoteSent ? (
                <div className="flex-1 border-b border-gold/40 py-2.5">
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
                    className="min-w-0 flex-1 border-b border-border bg-transparent py-2.5 text-sm text-charcoal outline-none transition-colors placeholder:text-stone-300 focus:border-gold"
                  />
                  <button
                    type="submit"
                    className="shrink-0 border border-charcoal bg-charcoal px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-teal hover:border-teal active:scale-95"
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
