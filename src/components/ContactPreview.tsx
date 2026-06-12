'use client'

import Link from 'next/link'
import Reveal from './Reveal'

export default function ContactPreview() {
  return (
    <section id="contact" className="bg-cream/75">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-16 lg:py-32">
        <Reveal y={20}>
          <div className="text-center">
            <span className="inline-block rounded-full bg-pink/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-pink">
              Get In Touch
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-charcoal md:text-5xl">
              Let&apos;s Discuss
              <br />
              <span className="text-gold">Your Project</span>
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-gold to-pink" />
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-charcoal/85 md:text-base">
              Reach out to us for a complimentary consultation. We serve
              residential and commercial clients across all of Kerala.
            </p>
          </div>
        </Reveal>

        <Reveal y={20} delay={0.2}>
          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href="tel:+919526100862"
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-5 py-4 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 sm:w-auto sm:px-6"
            >
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-gold">
                Call
              </span>
              <span className="font-serif text-base text-charcoal sm:text-lg">
                +91 9526100862
              </span>
            </a>
            <Link
              href="/contact"
              className="w-full rounded-full bg-gradient-to-r from-gold to-orange px-7 py-4 text-center text-xs font-bold uppercase tracking-[0.15em] text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-[0.98] sm:w-auto sm:px-8"
            >
              Full Contact Page
            </Link>
          </div>
        </Reveal>

        <Reveal y={20} delay={0.3}>
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-charcoal/60">
            <a href="tel:+919656200862" className="link-underline">
              +91 9656200862
            </a>
            <span className="hidden text-stone-300 sm:inline">·</span>
            <a href="mailto:info@varnampainting.com" className="link-underline">
              info@varnampainting.com
            </a>
            <span className="hidden text-stone-300 sm:inline">·</span>
            <span>Alappuzha, Kerala</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
