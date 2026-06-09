import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import QuoteBanner from '@/components/QuoteBanner'
import WhyChooseUs from '@/components/WhyChooseUs'
import GalleryPreview from '@/components/GalleryPreview'
import ContactPreview from '@/components/ContactPreview'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <QuoteBanner />
      <WhyChooseUs />
      <GalleryPreview />
      <ContactPreview />
      <Footer />
    </main>
  )
}
