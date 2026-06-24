import FloralOrnament from './FloralOrnament'

export default function Footer() {
  return (
    <footer className="bg-black text-cream/80 relative overflow-hidden">
      <FloralOrnament className="absolute top-8 right-8 h-20 w-20 text-gold/8" />
      <FloralOrnament className="absolute bottom-8 left-8 h-14 w-14 -rotate-12 text-teal/8" />
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-16 lg:py-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <h3 className="font-serif text-lg tracking-wide text-white">
              Varnam<span className="text-gold">.</span>
            </h3>
            <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-cream/40 mlm lg:text-[10px]">
              Painting and Designs
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cream/65 max-w-md">
              Bringing life to spaces through colours. Varnam means colours in
              Malayalam — and we bring the perfect palette to every corner of
              Kerala.
            </p>
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
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-cream/15 bg-white/5 text-cream transition-all duration-300 hover:bg-cream hover:text-charcoal hover:border-cream hover:scale-105 shadow-sm cursor-pointer"
                  aria-label="Instagram"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/people/Varnam-painting-designing/100063485036683/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-cream/15 bg-white/5 text-cream transition-all duration-300 hover:bg-cream hover:text-charcoal hover:border-cream hover:scale-105 shadow-sm cursor-pointer"
                  aria-label="Facebook"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/919526100862"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-cream/15 bg-white/5 text-cream transition-all duration-300 hover:bg-cream hover:text-charcoal hover:border-cream hover:scale-105 shadow-sm cursor-pointer"
                  aria-label="WhatsApp"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a
                  href="https://www.google.com/search?q=Varnam+Painting+and+Designs+Alappuzha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-cream/15 bg-white/5 text-cream transition-all duration-300 hover:bg-cream hover:text-charcoal hover:border-cream hover:scale-105 shadow-sm cursor-pointer"
                  aria-label="Google Search"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.535 0-6.403-2.868-6.403-6.403s2.868-6.403 6.403-6.403c1.582 0 3.02.576 4.137 1.526l3.078-3.078C19.11 2.387 15.938 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c5.895 0 10.865-4.047 11.202-9.76H12.24z" />
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
