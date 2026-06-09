'use client'

import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'
import Reveal from './Reveal'

export default function QuoteBanner() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-charcoal">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#D4AF37_0%,_transparent_60%)] opacity-5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_#136557_0%,_transparent_60%)] opacity-5" />
      <Reveal y={20}>
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center lg:py-32">
          <span className="text-xs uppercase tracking-[0.25em] text-gold/80">
            Start Your Project
          </span>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-cream md:text-5xl lg:text-6xl">
            Get Free Quote
            <br />
            <span className="text-gold">for Your Project</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-cream/60 md:text-base">
            Reach out to us today for a complimentary consultation and precise
            estimate for your painting or design project.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <MagneticButton href="#contact">
              <span className="block border border-gold bg-gold px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-charcoal transition-colors hover:bg-gold-dark sm:px-10 sm:py-4">
                Contact Us
              </span>
            </MagneticButton>
            <MagneticButton href="tel:+919526100862">
              <span className="block border border-cream/20 px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-cream transition-colors hover:border-cream/50 sm:px-10 sm:py-4">
                +91 9526100862
              </span>
            </MagneticButton>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
