'use client'

import { motion } from 'framer-motion'
import FloralOrnament from './FloralOrnament'

const contactDetails = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: 'Call Us',
    value: (
      <>
        <a href="tel:+919526100862" className="block font-serif text-lg text-charcoal transition-colors hover:text-gold sm:text-xl">+91 9526 100 862</a>
        <a href="tel:+919656200862" className="block font-serif text-lg text-charcoal transition-colors hover:text-gold sm:text-xl">+91 9656 200 862</a>
      </>
    ),
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Visit Us',
    value: (
      <p className="font-serif text-lg leading-relaxed text-charcoal sm:text-xl">
        Nandanam, Peringilipuram<br />
        Ennackadu (Via), Alappuzha (Dist.)<br />
        Kerala, India
      </p>
    ),
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    label: 'WhatsApp',
    value: (
      <a
        href="https://wa.me/919526100862"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow transition-all hover:bg-teal-dark active:scale-95"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
        </svg>
        Chat on WhatsApp
      </a>
    ),
  },
]

const socialLinks = [
  {
    href: 'https://www.instagram.com/varnam_painting_and_designs/',
    label: 'Instagram',
    className: 'bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400',
    path: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    href: 'https://www.facebook.com/people/Varnam-painting-designing/100063485036683/',
    label: 'Facebook',
    className: 'bg-[#1877F2]',
    path: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    href: 'https://wa.me/919526100862',
    label: 'WhatsApp',
    className: 'bg-teal',
    path: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
      </svg>
    ),
  },
]

export default function Contact() {
  return (
    <section className="relative overflow-hidden bg-cream/75">
      <FloralOrnament className="absolute top-12 right-6 h-20 w-20 text-gold/10 lg:right-16 lg:h-28 lg:w-28" />
      <FloralOrnament className="absolute bottom-12 left-6 h-16 w-16 rotate-45 text-teal/8 lg:left-16 lg:h-24 lg:w-24" />

      <div className="mx-auto max-w-4xl px-6 py-20 lg:px-16 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-pink/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-pink">
            <span className="mlm text-sm tracking-normal">ബന്ധപ്പെടുക</span>
            <span className="mx-2 opacity-40">·</span>
            Get In Touch
          </span>
          <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-charcoal md:text-5xl">
            Let&apos;s Discuss
            <br />
            <span className="text-gold">Your Project</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-gold to-pink" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-charcoal/85 md:text-base">
            Reach out to us directly — we&apos;re always happy to discuss your next project.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {contactDetails.map((item) => (
            <div
              key={item.label}
              className="group rounded-2xl bg-white/90 p-6 shadow shadow-black/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-cream transition-all duration-300">
                {item.icon}
              </div>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                {item.label}
              </p>
              <div className="mt-1">
                {item.value}
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
            Follow Us
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-white shadow transition-all hover:scale-110 active:scale-95 ${link.className}`}
                aria-label={link.label}
              >
                {link.path}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
