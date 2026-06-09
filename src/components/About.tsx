'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import CountUp from './CountUp'
import Reveal from './Reveal'
import ParallaxImage from './ParallaxImage'

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-border bg-cream"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[radial-gradient(ellipse_at_center,_#1365570D_0%,_transparent_60%)] blur-3xl"
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-20 lg:px-16 lg:py-32">
        <Reveal x={-30}>
          <ParallaxImage speed={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden lg:h-[600px]">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=85&auto=format&fit=crop"
                alt="Modern architecture"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-6 left-6 right-6 border-l-2 border-gold pl-4"
              >
                <p className="font-serif text-xl italic leading-tight text-white md:text-2xl">
                  Precision in every stroke
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/80">
                  Since establishment
                </p>
              </motion.div>
            </div>
          </ParallaxImage>
        </Reveal>

        <div className="flex flex-col">
          <Reveal y={10} delay={0.1}>
            <span className="text-xs uppercase tracking-[0.25em] text-gold">
              <span className="mlm text-sm tracking-normal">വർണ്ണം</span>
              <span className="mx-2 opacity-40">·</span>
              About Us
            </span>
          </Reveal>

          <Reveal y={20} delay={0.2}>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-charcoal md:text-5xl">
              Welcome to{' '}
              <span className="text-gold">Varnam Painting</span>
              <br />
              <span className="text-teal">and Designs</span>
            </h2>
          </Reveal>

          <Reveal y={10} delay={0.25}>
            <div className="mt-2 h-[2px] w-12 bg-gold" />
          </Reveal>

          <Reveal y={20} delay={0.3}>
            <p className="mt-6 text-sm leading-relaxed text-charcoal/85 md:text-base">
              We are a highly professional painting company in Kerala, serving
              both residential and commercial buildings all across the State.
            </p>
          </Reveal>

          <Reveal y={20} delay={0.35}>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/85 md:text-base">
              Varnam Painting and Designs offers the very best interior and exterior
              painting services for your home, office, or apartments in Kerala,
              India. You will have an exceptionally positive experience from our
              staff from the very moment you call us.
            </p>
          </Reveal>

          <Reveal y={20} delay={0.4}>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/85 md:text-base">
              You will have nothing to be worried about the quality and
              perfection of your building&apos;s painting as you hand over the
              work to us.
            </p>
          </Reveal>

          <Reveal y={20} delay={0.45}>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-8 sm:gap-6">
              {[
                { end: 150, suffix: '+', label: 'Projects', color: 'text-gold' },
                { end: 12, suffix: '+', label: 'Years', color: 'text-teal' },
                { end: 100, suffix: '%', label: 'Satisfaction', color: 'text-warm' },
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

      <div className="border-t border-border bg-cream-100">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-16 lg:py-28">
          <Reveal y={20}>
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs uppercase tracking-[0.25em] text-gold">
                Our Process
              </span>
              <h2 className="mt-4 font-serif text-2xl leading-tight tracking-tight text-charcoal md:text-4xl">
                Seamless Execution & Clean Workspaces
              </h2>
              <div className="mx-auto mt-4 h-[2px] w-12 bg-gold" />
              <p className="mt-6 text-sm leading-relaxed text-charcoal/85 md:text-base">
                Our communication is the key to completing a quality, on-time
                project that meets your precise specifications. Painting begins
                with an on-site walkthrough of the areas to be painted to confirm
                the exact details of your project.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/85 md:text-base">
                During our service, we systematically identify areas that need to
                be cleared or protected, care for home security, and arrange
                necessary temporary facilities to keep your space completely
                functional.
              </p>
            </div>
          </Reveal>

          <Reveal y={20} delay={0.2}>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'On-Site Walkthrough',
                  desc: 'We visit your property to assess and confirm exact project specifications.',
                },
                {
                  step: '02',
                  title: 'Systematic Preparation',
                  desc: 'Areas are cleared or protected with care for your home security.',
                },
                {
                  step: '03',
                  title: 'Flawless Execution',
                  desc: 'Our skilled team delivers pristine results on time, every time.',
                },
              ].map((item, i) => {
                const colors = ['text-gold', 'text-teal', 'text-warm']
                const borderColors = [
                  'hover:border-gold',
                  'hover:border-teal',
                  'hover:border-warm',
                ]
                return (
                  <div
                    key={item.step}
                    className={`group border border-border p-6 transition-all duration-300 hover:shadow-lg sm:p-8 ${borderColors[i]}`}
                  >
                    <span className={`font-serif text-4xl ${colors[i]}/30`}>
                      {item.step}
                    </span>
                    <h3 className="mt-4 font-serif text-lg text-charcoal sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                      {item.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
