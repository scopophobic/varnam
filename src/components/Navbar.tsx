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
          className={`relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-[5px] transition-opacity md:hidden ${
            scrolled ? 'opacity-100' : 'opacity-80'
          }`}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[2px] w-5 bg-charcoal transition-all duration-300 origin-center ${
              mobileOpen ? 'translate-y-[3.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-5 bg-charcoal transition-all duration-300 ${
              mobileOpen ? 'opacity-0 scale-x-0' : ''
            }`}
          />
          <span
            className={`block h-[2px] w-5 bg-charcoal transition-all duration-300 origin-center ${
              mobileOpen ? '-translate-y-[3.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-white via-cream-50 to-white"
          >
            <div className="flex flex-col items-center gap-7">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
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
              transition={{ delay: 0.35 }}
              className="absolute bottom-12 left-0 right-0 text-center"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
                Follow Us
              </p>
              <div className="mt-3 flex items-center justify-center gap-4">
                <a href="https://www.instagram.com/varnam_painting_and_designs/" target="_blank" rel="noopener noreferrer" className="text-xs text-charcoal/60 hover:text-gold font-bold uppercase tracking-[0.15em] transition-colors">
                  Instagram
                </a>
                <span className="text-stone-300">·</span>
                <a href="https://www.facebook.com/people/Varnam-painting-designing/100063485036683/" target="_blank" rel="noopener noreferrer" className="text-xs text-charcoal/60 hover:text-gold font-bold uppercase tracking-[0.15em] transition-colors">
                  Facebook
                </a>
                <span className="text-stone-300">·</span>
                <a href="tel:+919526100862" className="text-xs text-charcoal/60 hover:text-gold font-bold uppercase tracking-[0.15em] transition-colors">
                  Call
                </a>
                <span className="text-stone-300">·</span>
                <a href="mailto:info@varnampainting.com" className="text-xs text-charcoal/60 hover:text-gold font-bold uppercase tracking-[0.15em] transition-colors">
                  Email
                </a>
                <span className="text-stone-300">·</span>
                <a href="https://wa.me/919526100862" target="_blank" rel="noopener noreferrer" className="text-xs text-charcoal/60 hover:text-gold font-bold uppercase tracking-[0.15em] transition-colors">
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
