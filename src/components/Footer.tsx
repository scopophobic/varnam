import Link from 'next/link'
import FloralOrnament from './FloralOrnament'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-charcoal to-charcoal-800 text-cream/80 relative overflow-hidden">
      <FloralOrnament className="absolute top-8 right-8 h-20 w-20 text-gold/8" />
      <FloralOrnament className="absolute bottom-8 left-8 h-14 w-14 -rotate-12 text-teal/8" />
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-16 lg:py-24">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-serif text-lg tracking-wide text-white">
              Varnam<span className="text-gold">.</span>
            </h3>
            <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-cream/40 mlm lg:text-[10px]">
              Painting and Designs
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/65">
              Bringing life to spaces through colours. Varnam means colours in
              Malayalam — and we bring the perfect palette to every corner of
              Kerala.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Quick Links
            </h4>
            <ul className="mt-5 space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/#about' },
                { label: 'Services', href: '/#services' },
                { label: 'Gallery', href: '/gallery' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-cream/65 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Our Services
            </h4>
            <ul className="mt-5 space-y-2.5">
              {[
                'Architectural Design & Visualisation',
                'Residential & Commercial Painting',
                'Advanced Texture Coating',
                'Surface Protection Coatings',
              ].map((service) => (
                <li key={service}>
                  <span className="text-sm text-cream/65">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              Contact
            </h4>
            <div className="mt-5 space-y-3.5 text-sm text-cream/65">
              <p className="leading-relaxed">
                Nandanam, Peringilipuram
                <br />
                Ennackadu (Via), Alappuzha (Dist.)
                <br />
                Kerala, India
              </p>
              <div className="space-y-1">
                <a
                  href="tel:+919526100862"
                  className="link-underline block text-cream/65 transition-colors hover:text-cream"
                >
                  +91 9526100862
                </a>
                <a
                  href="tel:+919656200862"
                  className="link-underline block text-cream/65 transition-colors hover:text-cream"
                >
                  +91 9656200862
                </a>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/varnam_painting_and_designs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/40 transition-colors hover:text-cream"
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/people/Varnam-painting-designing/100063485036683/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/40 transition-colors hover:text-cream"
                  aria-label="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/919526100862"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/40 transition-colors hover:text-cream"
                  aria-label="WhatsApp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 md:flex-row lg:pt-8">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} Varnam Painting and Designs. All
            Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/varnam_painting_and_designs/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/30 transition-colors hover:text-cream"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/people/Varnam-painting-designing/100063485036683/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/30 transition-colors hover:text-cream"
              aria-label="Facebook"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
          </div>
          <p className="text-xs text-cream/30">
            Site developed & maintained by{' '}
            <a
              href="https://scopophobic.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-cream/45 hover:text-gold transition-colors font-medium"
            >
              Adithyan Madhu
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
