import { Playfair_Display, Plus_Jakarta_Sans, Noto_Sans_Malayalam } from 'next/font/google'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
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
  title: 'Varnam Painting and Designs | Premium Painting & Interior Design in Kerala',
  description:
    'Premium residential and commercial painting, architectural design visualization, and protective wall coatings across Kerala.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${playfair.variable} ${jakarta.variable} ${malayalam.variable}`}>
      <body className="font-sans bg-cream text-charcoal antialiased">
        <ScrollProgress />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
