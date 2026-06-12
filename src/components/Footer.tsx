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
              <a
                href="mailto:info@varnampainting.com"
                className="link-underline block text-cream/65 transition-colors hover:text-cream"
              >
                info@varnampainting.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-7 md:flex-row lg:pt-8">
          <p className="text-xs text-cream/40">
            &copy; {new Date().getFullYear()} Varnam Painting and Designs. All
            Rights Reserved.
          </p>
          <p className="text-xs text-cream/30">
            Site developed & maintained by{' '}
            <a
              href="#"
              className="link-underline text-cream/40 transition-colors hover:text-cream/60"
            >
              Adithyan Info Solution
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
