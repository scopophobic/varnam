'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Reveal from './Reveal'

const districts = [
  'Alappuzha',
  'Ernakulam',
  'Idukki',
  'Kannur',
  'Kasaragod',
  'Kollam',
  'Kottayam',
  'Kozhikode',
  'Malappuram',
  'Palakkad',
  'Pathanamthitta',
  'Thiruvananthapuram',
  'Thrissur',
  'Wayanad',
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    scope: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    const message = encodeURIComponent(
      `Hello Varnam Painting and Designs! I'd like to inquire about your services.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nLocation: ${formData.district}\nScope: ${formData.scope}`,
    )
    window.open(`https://wa.me/919526100862?text=${message}`, '_blank')

    setSubmitted(true)
    setFormData({ name: '', phone: '', district: '', scope: '' })
  }

  return (
    <section className="bg-cream/75">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-16 lg:py-32">
        <Reveal y={20}>
          <div className="text-center">
            <span className="inline-block rounded-full bg-pink/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-pink">
              <span className="mlm text-sm tracking-normal">ബന്ധപ്പെടുക</span>
              <span className="mx-2 opacity-40">·</span>
              Get In Touch
            </span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-charcoal md:text-5xl">
              Let&apos;s Discuss
              <br />
              <span className="text-gold">Your Project</span>
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-gold to-pink" />
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-charcoal/85 md:text-base">
              Fill out the form below and we&apos;ll get back to you within 24
              hours. Or reach us directly via phone or WhatsApp.
            </p>
          </div>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl bg-white p-8 shadow-lg"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-bold uppercase tracking-[0.15em] text-charcoal/75"
              >
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-bold uppercase tracking-[0.15em] text-charcoal/75"
              >
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="+91 98765 43210"
              />
            </div>

            <div>
              <label
                htmlFor="district"
                className="block text-xs font-bold uppercase tracking-[0.15em] text-charcoal/75"
              >
                Project Location (District)
              </label>
              <select
                id="district"
                required
                value={formData.district}
                onChange={(e) =>
                  setFormData({ ...formData, district: e.target.value })
                }
                className="mt-2 w-full rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
              >
                <option value="" disabled>
                  Select your district
                </option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="scope"
                className="block text-xs font-bold uppercase tracking-[0.15em] text-charcoal/75"
              >
                Service Scope
              </label>
              <textarea
                id="scope"
                required
                rows={3}
                value={formData.scope}
                onChange={(e) =>
                  setFormData({ ...formData, scope: e.target.value })
                }
                className="mt-2 w-full resize-none rounded-xl border border-border bg-cream-50 px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-gold focus:ring-2 focus:ring-gold/20"
                placeholder="Briefly describe your project..."
              />
            </div>

            {submitted ? (
              <div className="rounded-xl bg-gradient-to-r from-gold/20 to-pink/20 p-6 text-center">
                <p className="font-serif text-lg font-bold text-gold-dark">
                  Thank You!
                </p>
                <p className="mt-1 text-sm text-charcoal/75">
                  Your message has been sent. We&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-gold to-orange px-7 py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
              >
                Send via WhatsApp
              </button>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-7 rounded-2xl bg-white p-8 shadow-lg">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  Call Us
                </span>
                <div className="mt-2 space-y-1.5">
                  <a
                    href="tel:+919526100862"
                    className="link-underline block font-serif text-lg text-charcoal sm:text-xl"
                  >
                    +91 9526100862
                  </a>
                  <a
                    href="tel:+919656200862"
                    className="link-underline block font-serif text-lg text-charcoal sm:text-xl"
                  >
                    +91 9656200862
                  </a>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  Email Us
                </span>
                <a
                  href="mailto:info@varnampainting.com"
                  className="link-underline mt-2 block font-serif text-lg text-charcoal sm:text-xl"
                >
                  info@varnampainting.com
                </a>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  Visit Us
                </span>
                <p className="mt-2 font-serif text-base leading-relaxed text-charcoal/85 sm:text-lg">
                  Nandanam, Peringilipuram
                  <br />
                  Ennackadu (Via), Alappuzha (Dist.)
                  <br />
                  Kerala, India
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                  WhatsApp
                </span>
                <a
                  href="https://wa.me/919526100862"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-2 block font-serif text-lg text-charcoal sm:text-xl"
                >
                  +91 9526100862
                </a>
              </div>

              <div className="pt-2">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-border px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-charcoal transition-all duration-300 hover:border-gold hover:bg-gold/10 sm:px-6 sm:py-3"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">
                    ←
                  </span>
                  Back to Home
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
