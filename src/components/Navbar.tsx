'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? 'bg-white/95 backdrop-blur-lg shadow-lg'
          : 'bg-cream/75'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-10 lg:py-4">
        <Link href="/" className="flex flex-col">
          <span className="font-serif text-base tracking-[0.15em] text-charcoal transition-colors hover:text-gold lg:text-xl">
            Varnam
            <span className="text-gold">.</span>
          </span>
          <span className="-mt-0.5 text-[9px] uppercase tracking-[0.3em] text-stone-400 mlm lg:text-[10px]">
            Painting and Designs
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex lg:gap-10">
          {navLinks.map((link) => {
            const isActive =
              (link.href === '/' && pathname === '/') ||
              (link.href !== '/' && link.href !== '/#about' && link.href !== '/#services' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${
                  isActive
                    ? 'text-gold'
                    : 'text-charcoal/85 hover:text-gold'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="z-50 flex h-9 w-9 shrink-0 items-center justify-center md:hidden"
          aria-label="Toggle menu"
        >
          <div className="flex w-[18px] flex-col items-center gap-[5px]">
            <span
              className={`block h-[2px] w-full rounded-full bg-charcoal transition-all duration-300 origin-center ${
                mobileOpen ? 'translate-y-[7px] -rotate-45' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-full rounded-full bg-charcoal transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-[2px] w-full rounded-full bg-charcoal transition-all duration-300 origin-center ${
                mobileOpen ? '-translate-y-[7px] rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </nav>
    </header>

    <AnimatePresence>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-40 flex flex-col bg-gradient-to-b from-white via-cream-50 to-white"
        >
          <div className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 pb-28 pt-24">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl tracking-wide text-charcoal transition-colors hover:text-gold"
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-10 left-0 right-0 text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
              Follow Us
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6">
              <a href="https://www.instagram.com/varnam_painting_and_designs/" target="_blank" rel="noopener noreferrer" className="text-xs text-charcoal/60 hover:text-gold font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-colors">
                Instagram
              </a>
              <span className="text-stone-300">·</span>
              <a href="https://www.facebook.com/people/Varnam-painting-designing/100063485036683/" target="_blank" rel="noopener noreferrer" className="text-xs text-charcoal/60 hover:text-gold font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-colors">
                Facebook
              </a>
              <span className="text-stone-300">·</span>
              <a href="tel:+919526100862" className="text-xs text-charcoal/60 hover:text-gold font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-colors">
                Call
              </a>
              <span className="text-stone-300">·</span>
              <a href="https://wa.me/919526100862" target="_blank" rel="noopener noreferrer" className="text-xs text-charcoal/60 hover:text-gold font-bold uppercase tracking-[0.15em] whitespace-nowrap transition-colors">
                WhatsApp
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
