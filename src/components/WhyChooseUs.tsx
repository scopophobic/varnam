'use client'

import { motion } from 'framer-motion'
import Reveal from './Reveal'

const values = [
  {
    icon: '⟳',
    title: 'Velocity of Execution',
    description:
      'With our skilled professionals, we will complete your painting job(s) within minimal time windows without cutting structural corners.',
    accentColor: 'text-gold',
    bgGlow: 'from-gold/5',
  },
  {
    icon: '◈',
    title: 'Budget Optimization',
    description:
      'We are experienced painting professionals specializing in premium residential and commercial configurations, offering both interior and exterior architectural painting at competitive, reasonable price tiers.',
    accentColor: 'text-teal',
    bgGlow: 'from-teal/5',
  },
  {
    icon: '✦',
    title: 'Uncompromising Finish',
    description:
      'With reasonable expense and minimal disruption to your timeline, you will receive your building painted exactly to the peak structural quality metrics you expect.',
    accentColor: 'text-warm',
    bgGlow: 'from-warm/5',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="border-t border-border bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-16 lg:py-32">
        <Reveal y={20}>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-gold">
              Why Choose Us
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-charcoal md:text-5xl">
              Built on{' '}
              <span className="text-gold italic">Excellence</span>
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-12 bg-gold" />
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative overflow-hidden border border-border p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl active:scale-[0.98]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${value.bgGlow} to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />
              <div className="relative z-10">
                <span className={`font-serif text-3xl ${value.accentColor}`}>
                  {value.icon}
                </span>
                <h3 className="mt-5 font-serif text-lg text-charcoal sm:text-xl">
                  {value.title}
                </h3>
                <div
                  className={`mt-3 h-[1px] w-10 ${value.accentColor.replace('text-', 'bg-')}/40 transition-all duration-500 group-hover:w-16`}
                />
                <p className="mt-4 text-sm leading-relaxed text-charcoal/75">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
