'use client'

import MagneticButton from './MagneticButton'
import Reveal from './Reveal'

export default function QuoteBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue via-teal to-teal-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_#FFFFFF20_0%,_transparent_50%),radial-gradient(circle_at_80%_50%,_#F59E0B20_0%,_transparent_50%)]" />
      <Reveal y={20}>
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center lg:py-32">
          <span className="inline-block rounded-full bg-white/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            Start Your Project
          </span>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-white md:text-5xl lg:text-6xl">
            Get Free Quote
            <br />
            <span className="text-yellow-200">for Your Project</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-white/80 md:text-base">
            Reach out to us today for a complimentary consultation and precise
            estimate for your painting or design project.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <MagneticButton href="#contact">
              <span className="block rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-charcoal shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:px-10 sm:py-4">
                Contact Us
              </span>
            </MagneticButton>
            <MagneticButton
              href="https://wa.me/919526100862?text=Hello%20Varnam%20Painting!%20I'd%20like%20to%20get%20a%20free%20quote%20for%20my%20painting%20and%20design%20project."
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="block rounded-full border-2 border-emerald-500 bg-emerald-600/90 px-8 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-lg transition-all duration-300 hover:bg-emerald-600 hover:scale-105 sm:px-10 sm:py-4">
                Chat on WhatsApp
              </span>
            </MagneticButton>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
