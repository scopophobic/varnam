import { Playfair_Display, Plus_Jakarta_Sans, Noto_Sans_Malayalam } from 'next/font/google'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
import AnimatedBackground from '@/components/AnimatedBackground'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const malayalam = Noto_Sans_Malayalam({
  subsets: ['malayalam'],
  variable: '--font-mlm',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Varnam Painting and Designs | Bringing Life to Spaces Through Colours',
  description:
    'Varnam means colours in Malayalam. We are a trusted painting company in Kerala offering premium interior and exterior painting for homes, offices, and commercial spaces.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${playfair.variable} ${jakarta.variable} ${malayalam.variable}`}>
      <body className="font-sans bg-[#0d0a08] text-charcoal antialiased selection:bg-gold selection:text-charcoal">
        <AnimatedBackground />
        <div className="relative z-[1]">
          <ScrollProgress />
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  )
}
