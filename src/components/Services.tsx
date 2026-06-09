'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import ParallaxImage from './ParallaxImage'
import Reveal from './Reveal'

const services = [
  {
    title: 'Architectural Design & Visualisation',
    tagline: 'Spatial Planning & Aesthetic Simulation',
    description:
      'Quality of painting is heavily dependent on technical preparation. The brushes, application equipment, and substrate-specific materials used for your painting must be of premium grade to secure a flawless, enduring structural finish.',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=900&q=85&auto=format&fit=crop',
    align: 'left',
  },
  {
    title: 'Full-Service Residential & Commercial Painting',
    tagline: 'Expert Application Lifecycle',
    description:
      'Our team of experienced painters has the technical skills and heavy equipment to get the job done right—the first time, every time. We know how highly valuable your home is to you. We invest the necessary time to prepare and set up properly to make sure your home is painted exactly the way you expect, guaranteeing that nothing else gets damaged in the process.',
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=85&auto=format&fit=crop',
    align: 'right',
  },
  {
    title: 'Advanced Texture Coating Works',
    tagline: 'Architectural Accents & Specialized Texturing',
    description:
      'We host a dedicated team of quality finish artisans who specialize in advanced texture coating works. Implementing texture coating work is an exceptional architectural method to provide an awesome finishing touch to your interior walls as well as structural exterior elevations. We provide tailored texture coating services featuring premium high-quality finishing, managing our structural processes efficiently to protect client timeframes.',
    image:
      'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=900&q=85&auto=format&fit=crop',
    align: 'left',
  },
]

const colorClasses = [
  { number: 'text-gold/20', tagline: 'text-gold', numberHover: 'group-hover:text-gold' },
  { number: 'text-teal/20', tagline: 'text-teal', numberHover: 'group-hover:text-teal' },
  { number: 'text-warm/20', tagline: 'text-warm', numberHover: 'group-hover:text-warm' },
]

export default function Services() {
  return (
    <section id="services" className="border-t border-border bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-16 lg:py-32">
        <Reveal y={20}>
          <div className="text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-gold">
              What We Do
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-charcoal md:text-5xl">
              Our Services
            </h2>
            <div className="mx-auto mt-4 h-[2px] w-12 bg-gold" />
          </div>
        </Reveal>

        <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className={`grid grid-cols-1 items-center gap-8 lg:gap-16 ${
                service.align === 'right'
                  ? 'lg:grid-cols-[1.2fr_1fr]'
                  : 'lg:grid-cols-[1fr_1.2fr]'
              }`}
            >
              {service.align === 'right' ? (
                <>
                  <div className="order-2 lg:order-1">
                    <span
                      className={`font-serif text-6xl leading-none transition-colors duration-500 sm:text-7xl ${colorClasses[index].number} ${colorClasses[index].numberHover}`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 font-serif text-xl leading-tight text-charcoal md:text-3xl">
                      {service.title}
                    </h3>
                    <p className={`mt-2 text-xs uppercase tracking-[0.2em] ${colorClasses[index].tagline}`}>
                      {service.tagline}
                    </p>
                    <div className={`mt-4 h-[1px] w-16 ${colorClasses[index].tagline.replace('text-', 'bg-')}/50`} />
                    <p className="mt-5 text-sm leading-relaxed text-charcoal/85 md:text-base">
                      {service.description}
                    </p>
                    <Link
                      href="/contact"
                      className="link-underline mt-5 inline-block text-xs uppercase tracking-[0.2em] text-charcoal"
                    >
                      Enquire About This Service
                    </Link>
                  </div>
                  <div className="order-1 lg:order-2">
                    <ParallaxImage speed={0.08}>
                      <div className="group relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                    </ParallaxImage>
                  </div>
                </>
              ) : (
                <>
                  <div className="order-2 lg:order-2">
                    <span
                      className={`font-serif text-6xl leading-none transition-colors duration-500 sm:text-7xl ${colorClasses[index].number} ${colorClasses[index].numberHover}`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 font-serif text-xl leading-tight text-charcoal md:text-3xl">
                      {service.title}
                    </h3>
                    <p className={`mt-2 text-xs uppercase tracking-[0.2em] ${colorClasses[index].tagline}`}>
                      {service.tagline}
                    </p>
                    <div className={`mt-4 h-[1px] w-16 ${colorClasses[index].tagline.replace('text-', 'bg-')}/50`} />
                    <p className="mt-5 text-sm leading-relaxed text-charcoal/85 md:text-base">
                      {service.description}
                    </p>
                    <Link
                      href="/contact"
                      className="link-underline mt-5 inline-block text-xs uppercase tracking-[0.2em] text-charcoal"
                    >
                      Enquire About This Service
                    </Link>
                  </div>
                  <div className="order-1 lg:order-1">
                    <ParallaxImage speed={0.08}>
                      <div className="group relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                    </ParallaxImage>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
