'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FloralOrnament from './FloralOrnament'

const contactDetails = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: 'Call Us',
    value: (
      <div className="space-y-1">
        <a href="tel:+919526100862" className="block font-serif text-base text-charcoal transition-colors hover:text-gold sm:text-lg">+91 9526 100 862</a>
        <a href="tel:+919656200862" className="block font-serif text-base text-charcoal transition-colors hover:text-gold sm:text-lg">+91 9656 200 862</a>
      </div>
    ),
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Visit Us',
    value: (
      <p className="font-serif text-sm leading-relaxed text-charcoal sm:text-base">
        Nandanam, Peringilipuram<br />
        Ennackadu (Via), Alappuzha (Dist.)<br />
        Kerala, India
      </p>
    ),
  },
]

const socialLinks = [
  {
    href: 'https://www.instagram.com/varnam_painting_and_designs/',
    label: 'Instagram',
    className: 'bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400',
    path: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    href: 'https://www.facebook.com/people/Varnam-painting-designing/100063485036683/',
    label: 'Facebook',
    className: 'bg-[#1877F2]',
    path: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
      </svg>
    ),
  },
  {
    href: 'https://wa.me/919526100862',
    label: 'WhatsApp',
    className: 'bg-teal',
    path: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
      </svg>
    ),
  },
]

const KERALA_DISTRICTS = [
  'Alappuzha',
  'Ernakulam',
  'Kottayam',
  'Kollam',
  'Pathanamthitta',
  'Thiruvananthapuram',
  'Idukki',
  'Thrissur',
  'Palakkad',
  'Malappuram',
  'Kozhikode',
  'Wayanad',
  'Kannur',
  'Kasaragod',
]

const PROJECT_SCOPES = [
  'Residential Painting (Interior/Exterior)',
  'Commercial Property Painting',
  'Advanced Texture Coating',
  'Color Visualisation & Consultation',
  'Full Spatial Redesign',
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: 'Alappuzha',
    scope: 'Residential Painting (Interior/Exterior)',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.district || !formData.scope) {
      setErrorMsg('Please fill in all details.')
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      // 1. Submit to local API for backend logging
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        // 2. Redirect to WhatsApp with formatted details
        const message = encodeURIComponent(
          `Hello Varnam Painting!\n\nI would like to request a Free On-Site Consultation:\n\n` +
          `• *Name:* ${formData.name}\n` +
          `• *Phone:* ${formData.phone}\n` +
          `• *District:* ${formData.district}\n` +
          `• *Project Scope:* ${formData.scope}`
        )
        
        const whatsappUrl = `https://wa.me/919526100862?text=${message}`
        window.open(whatsappUrl, '_blank')

        setStatus('success')
        setFormData({
          name: '',
          phone: '',
          district: 'Alappuzha',
          scope: 'Residential Painting (Interior/Exterior)',
        })
      } else {
        const err = await res.json()
        setErrorMsg(err.error || 'Failed to submit request.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('A network error occurred. Please try again.')
      setStatus('error')
    }
  }

  return (
    <section className="relative overflow-hidden bg-cream-100">
      <FloralOrnament className="absolute top-12 right-6 h-20 w-20 text-gold/10 lg:right-16 lg:h-28 lg:w-28" />
      <FloralOrnament className="absolute bottom-12 left-6 h-16 w-16 rotate-45 text-teal/8 lg:left-16 lg:h-24 lg:w-24" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-16 lg:py-28">
        
        {/* Main Title Section */}
        <div className="text-center mb-16">
          <span className="inline-block rounded-full bg-pink/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-pink">
            <span className="mlm text-sm tracking-normal">ബന്ധപ്പെടുക</span>
            <span className="mx-2 opacity-40">·</span>
            Get In Touch
          </span>
          <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-charcoal md:text-5xl">
            Let&apos;s Design <span className="text-gold italic">Your Space</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-gold to-pink" />
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-charcoal/80 md:text-base">
            Book a free on-site consultation. Our engineers and paint experts serve homes, offices, and resorts all across Kerala.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Quick Info Cards & Social Links */}
          <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
            <h3 className="font-serif text-xl text-charcoal tracking-wide">
              Direct Contact Details
            </h3>
            
            <div className="space-y-4">
              {contactDetails.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-2xl bg-white/60 backdrop-blur-sm p-5 border border-white/50 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold-dark">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-stone-400">
                      {item.label}
                    </p>
                    <div className="mt-0.5">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Social Cards */}
            <div className="rounded-2xl bg-white/60 backdrop-blur-sm p-6 border border-white/50 shadow-sm mt-2">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 text-center mb-4">
                Follow Our Portfolios
              </p>
              <div className="flex items-center justify-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-11 w-11 items-center justify-center rounded-xl text-white shadow-sm transition-all duration-300 hover:scale-110 active:scale-95 ${link.className}`}
                    aria-label={link.label}
                  >
                    {link.path}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form Panel */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="rounded-3xl bg-white/80 backdrop-blur-md p-6 sm:p-8 shadow-xl border border-white/65 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.08)_0%,_transparent_70%)]" />
              
              <h3 className="font-serif text-2xl text-charcoal leading-tight">
                Request Free Consultation
              </h3>
              <p className="mt-2 text-xs text-charcoal/70 mb-6">
                Fill in your details below. We will coordinate a site walkthrough, color visualization, and provide a detailed cost breakdown.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-border bg-cream/20 px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-teal focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      pattern="[0-9]*"
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9526100862"
                      className="w-full rounded-xl border border-border bg-cream/20 px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-teal focus:bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="district" className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1.5">
                      Kerala District *
                    </label>
                    <select
                      id="district"
                      name="district"
                      required
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-border bg-cream/20 px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-teal focus:bg-white appearance-none"
                      style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232A2520' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}
                    >
                      {KERALA_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="scope" className="block text-xs font-bold uppercase tracking-wider text-charcoal/70 mb-1.5">
                    Project Scope *
                  </label>
                  <select
                    id="scope"
                    name="scope"
                    required
                    value={formData.scope}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-border bg-cream/20 px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-teal focus:bg-white appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232A2520' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', backgroundSize: '16px' }}
                  >
                    {PROJECT_SCOPES.map((scope) => (
                      <option key={scope} value={scope}>
                        {scope}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full relative overflow-hidden flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal py-4 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Connecting to WhatsApp...
                      </span>
                    ) : (
                      <>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 -mt-0.5">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Book Free Consultation via WhatsApp
                      </>
                    )}
                  </button>
                </div>

                {/* Submissions Toast Messages */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 mt-4"
                    >
                      <div className="flex gap-3">
                        <svg className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                            Enquiry Sent Successfully!
                          </p>
                          <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                            Thank you! We have received your project details. A senior representative from Varnam Painting & Designs will contact you shortly via phone or WhatsApp.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="rounded-xl bg-rose-50 border border-rose-200 p-4 mt-4"
                    >
                      <div className="flex gap-3">
                        <svg className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <p className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                            Submission Error
                          </p>
                          <p className="text-xs text-rose-700 mt-1 leading-relaxed">
                            {errorMsg || 'Something went wrong. Please double-check your form inputs or contact us directly.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
