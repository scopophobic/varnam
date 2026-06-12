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
    gradient: 'from-gold to-orange',
  },
  {
    title: 'Full-Service Residential & Commercial Painting',
    tagline: 'Expert Application Lifecycle',
    description:
      'Our team of experienced painters has the technical skills and heavy equipment to get the job done right—the first time, every time. We know how highly valuable your home is to you. We invest the necessary time to prepare and set up properly to make sure your home is painted exactly the way you expect, guaranteeing that nothing else gets damaged in the process.',
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=900&q=85&auto=format&fit=crop',
    align: 'right',
    gradient: 'from-teal to-blue',
  },
  {
    title: 'Advanced Texture Coating Works',
    tagline: 'Architectural Accents & Specialized Texturing',
    description:
      'We host a dedicated team of quality finish artisans who specialize in advanced texture coating works. Implementing texture coating work is an exceptional architectural method to provide an awesome finishing touch to your interior walls as well as structural exterior elevations. We provide tailored texture coating services featuring premium high-quality finishing, managing our structural processes efficiently to protect client timeframes.',
    image:
      'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=900&q=85&auto=format&fit=crop',
    align: 'left',
    gradient: 'from-pink to-terracotta',
  },
]

export default function Services() {
  return (
    <section id="services" className="bg-cream/75 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-16 lg:py-32">
        <Reveal y={20}>
          <div className="text-center">
            <span className="inline-block rounded-full bg-blue/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-blue">
              What We Do
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-charcoal md:text-5xl">
              Our Services
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue to-pink" />
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
                    <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} text-white text-2xl font-bold shadow-lg`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-serif text-xl leading-tight text-charcoal md:text-3xl">
                      {service.title}
                    </h3>
                    <p className={`mt-2 text-xs font-bold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}>
                      {service.tagline}
                    </p>
                    <div className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r ${service.gradient}`} />
                    <p className="mt-5 text-sm leading-relaxed text-charcoal/85 md:text-base">
                      {service.description}
                    </p>
                    <Link
                      href="/contact"
                      className="link-underline mt-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-charcoal hover:text-gold"
                    >
                      Enquire About This Service →
                    </Link>
                  </div>
                  <div className="order-1 lg:order-2">
                    <ParallaxImage speed={0.08}>
                      <div className={`group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl`}>
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      </div>
                    </ParallaxImage>
                  </div>
                </>
              ) : (
                <>
                  <div className="order-2 lg:order-2">
                    <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${service.gradient} text-white text-2xl font-bold shadow-lg`}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <h3 className="font-serif text-xl leading-tight text-charcoal md:text-3xl">
                      {service.title}
                    </h3>
                    <p className={`mt-2 text-xs font-bold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r ${service.gradient}`}>
                      {service.tagline}
                    </p>
                    <div className={`mt-4 h-1 w-16 rounded-full bg-gradient-to-r ${service.gradient}`} />
                    <p className="mt-5 text-sm leading-relaxed text-charcoal/85 md:text-base">
                      {service.description}
                    </p>
                    <Link
                      href="/contact"
                      className="link-underline mt-5 inline-block text-xs font-bold uppercase tracking-[0.2em] text-charcoal hover:text-gold"
                    >
                      Enquire About This Service →
                    </Link>
                  </div>
                  <div className="order-1 lg:order-1">
                    <ParallaxImage speed={0.08}>
                      <div className={`group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl`}>
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
