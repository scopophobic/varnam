'use client'

import { motion } from 'framer-motion'
import Reveal from './Reveal'

const values = [
  {
    icon: '⟳',
    title: 'Velocity of Execution',
    description:
      'With our skilled professionals, we will complete your painting job(s) within minimal time windows without cutting structural corners.',
    gradient: 'from-gold to-orange',
    shadow: 'shadow-gold/20',
  },
  {
    icon: '◈',
    title: 'Budget Optimization',
    description:
      'We are experienced painting professionals specializing in premium residential and commercial configurations, offering both interior and exterior architectural painting at competitive, reasonable price tiers.',
    gradient: 'from-teal to-blue',
    shadow: 'shadow-teal/20',
  },
  {
    icon: '✦',
    title: 'Uncompromising Finish',
    description:
      'With reasonable expense and minimal disruption to your timeline, you will receive your building painted exactly to the peak structural quality metrics you expect.',
    gradient: 'from-pink to-terracotta',
    shadow: 'shadow-pink/20',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="bg-cream/75">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-16 lg:py-32">
        <Reveal y={20}>
          <div className="text-center">
            <span className="inline-block rounded-full bg-gold/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">
              Why Choose Us
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-charcoal md:text-5xl">
              Built on{' '}
              <span className="text-gold italic">Excellence</span>
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-gold to-pink" />
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
              className={`group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${value.shadow}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-5`} />
              <div className="relative z-10">
                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${value.gradient} text-white text-2xl shadow-md`}>
                  {value.icon}
                </div>
                <h3 className="mt-5 font-serif text-lg text-charcoal sm:text-xl">
                  {value.title}
                </h3>
                <div className={`mt-3 h-1 w-10 rounded-full bg-gradient-to-r ${value.gradient} transition-all duration-500 group-hover:w-16`} />
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
