'use client'

import Link from 'next/link'
import Reveal from './Reveal'

export default function ContactPreview() {
  return (
    <section id="contact" className="border-t border-border bg-cream-100">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-16 lg:py-32">
        <Reveal y={20}>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-gold">
              Get In Touch
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-charcoal md:text-5xl">
              Let&apos;s Discuss
              <br />
              <span className="text-gold">Your Project</span>
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-12 bg-gold" />
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
              className="flex w-full items-center justify-center gap-3 border border-border bg-cream px-5 py-4 transition-all duration-300 hover:border-gold hover:shadow-md sm:w-auto sm:px-6"
            >
              <span className="text-xs uppercase tracking-[0.15em] text-gold">
                Call
              </span>
              <span className="font-serif text-base text-charcoal sm:text-lg">
                +91 9526100862
              </span>
            </a>
            <Link
              href="/contact"
              className="w-full border border-charcoal bg-charcoal px-7 py-4 text-center text-xs uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-gold hover:border-gold active:scale-[0.98] sm:w-auto sm:px-8"
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
