'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import CountUp from './CountUp'
import Reveal from './Reveal'
import FloralOrnament from './FloralOrnament'

const steps = [
  {
    step: '01',
    title: 'Project Planning & Design',
    desc: 'We understand your ideas, recommend suitable colour combinations, and create a plan that brings your vision to life.',
    color: 'from-gold to-amber-500',
  },
  {
    step: '02',
    title: 'Surface Preparation & Protection',
    desc: 'We clean and prepare surfaces, protect furniture, maintain home security, and ensure your property stays safe throughout.',
    color: 'from-teal to-emerald-500',
  },
  {
    step: '03',
    title: 'Expert Painting Work',
    desc: 'Using quality paints, modern techniques, and professional craftsmanship for smooth, long-lasting finishes.',
    color: 'from-terracotta to-rose-400',
  },
  {
    step: '04',
    title: 'Quality Inspection & Handover',
    desc: 'Senior team members inspect every detail to ensure quality standards before handing over your beautifully transformed space.',
    color: 'from-purple-500 to-pink-400',
  },
]

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-cream/75">
      <FloralOrnament className="absolute top-10 right-10 h-24 w-24 text-teal/10" />
      <FloralOrnament className="absolute bottom-10 left-10 h-16 w-16 -rotate-12 text-terracotta/10" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-16 lg:py-32">
        <Reveal x={-30}>
          <div className="relative aspect-[4/5] overflow-hidden lg:h-[600px]">
            <Image
              src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=900&q=85&auto=format&fit=crop"
              alt="Colourful interior with flowers"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute bottom-6 left-6 right-6 border-l-2 border-gold pl-4"
            >
              <p className="font-serif text-xl italic leading-tight text-white md:text-2xl">
                Transforming spaces with colours
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/80">
                Varnam — colours that tell your story
              </p>
            </motion.div>
          </div>
        </Reveal>

        <div className="flex flex-col">
          <Reveal y={10} delay={0.1}>
            <span className="text-xs uppercase tracking-[0.25em] text-gold">
              <span className="mlm text-sm tracking-normal">വർണ്ണം</span>
              <span className="mx-2 opacity-40">·</span>
              Our Story
            </span>
          </Reveal>

          <Reveal y={20} delay={0.2}>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-charcoal md:text-5xl">
              Transforming Spaces with{' '}
              <span className="text-gold">Colours</span>,
              <br />
              <span className="text-teal">Care</span>, and{' '}
              <span className="text-terracotta">Craftsmanship</span>
            </h2>
          </Reveal>

          <Reveal y={10} delay={0.25}>
            <div className="mt-2 h-[2px] w-12 bg-gold" />
          </Reveal>

          <Reveal y={20} delay={0.3}>
            <p className="mt-6 text-sm leading-relaxed text-charcoal/85 md:text-base">
              At Varnam Painting and Designs, we believe that painting is more
              than just applying colours to walls — it is about creating
              beautiful spaces where people live, work, and build memories.
            </p>
          </Reveal>

          <Reveal y={20} delay={0.35}>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/85 md:text-base">
              Based in Kerala, we are a trusted professional painting company
              offering high-quality interior and exterior painting services for
              homes, offices, apartments, and commercial properties across the
              state. We understand the challenges of finding reliable painters
              who deliver on time with the expected quality — so we bring a team
              of skilled professionals right to your doorstep.
            </p>
          </Reveal>

          <Reveal y={20} delay={0.4}>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/85 md:text-base">
              From the moment you contact us, our experts visit your project
              location, understand your vision, and prepare a customized
              painting plan that matches your requirements, budget, and style
              preferences.
            </p>
          </Reveal>

          <Reveal y={20} delay={0.42}>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                  Official Partner
                </p>
                <div className="mt-1.5 relative h-12 w-40 overflow-hidden rounded-xl border border-border shadow-sm bg-white p-1">
                  <Image
                    src="/asian-paints-partner.jpg"
                    alt="Authorized Asian Paints Painting Contractor"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="max-w-xs">
                <p className="text-xs text-charcoal/80 leading-relaxed mt-2 sm:mt-5">
                  Proudly serving as an authorized <strong className="text-teal font-bold">Asian Paints Home Painting Services</strong> partner.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal y={20} delay={0.45}>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8 sm:gap-6">
              {[
                { end: 150, suffix: '+', label: 'Projects', color: 'text-gold' },
                { end: 12, suffix: '+', label: 'Years', color: 'text-teal' },
                { end: 100, suffix: '%', label: 'Satisfaction', color: 'text-terracotta' },
              ].map((stat) => (
                <div key={stat.label}>
                  <span className={`font-serif text-2xl sm:text-3xl ${stat.color}`}>
                    <CountUp end={stat.end} suffix={stat.suffix} />
                  </span>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-charcoal/65 sm:text-xs">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="border-t border-border bg-cream-100 relative overflow-hidden">
        <FloralOrnament className="absolute top-6 right-6 h-14 w-14 text-gold/15" />
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-16 lg:py-28">
          <Reveal y={20}>
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs uppercase tracking-[0.25em] text-gold">
                A Professional Approach
              </span>
              <h2 className="mt-4 font-serif text-2xl leading-tight tracking-tight text-charcoal md:text-4xl">
                From Start to Finish
              </h2>
              <div className="mx-auto mt-4 h-[2px] w-12 bg-gold" />
              <p className="mt-6 text-sm leading-relaxed text-charcoal/85 md:text-base">
                Every successful painting project begins with proper planning.
                We carefully study your space, suggest the best solutions,
                visualize the final outcome, and provide a transparent budget
                before starting the work.
              </p>
            </div>
          </Reveal>

          <Reveal y={20} delay={0.2}>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {steps.map((item) => (
                <div
                  key={item.step}
                  className="group border border-border bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8"
                >
                  <div
                    className={`mb-4 inline-flex h-10 w-10 items-center justify-center bg-gradient-to-br ${item.color} text-sm font-bold text-white shadow-md`}
                  >
                    {item.step}
                  </div>
                  <h3 className="font-serif text-lg text-charcoal sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
