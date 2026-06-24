'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Reveal from './Reveal'
import { cloudinaryLoader } from '@/lib/cloudinary-helper'

interface CatalogItem {
  id: string
  name: string
  malayalam: string
  category: 'colors' | 'textures' | 'patterns'
  hex?: string
  image?: string
  desc: string
  rooms: string
  finish: string
  maintenance: string
}

type FilterTab = 'all' | 'colors' | 'textures' | 'patterns'

export default function Catalog() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null)

  // Dynamic Asian Paints catalog lists loaded from JSON files
  const [dbColors, setDbColors] = useState<CatalogItem[]>([])
  const [dbTexturesStencils, setDbTexturesStencils] = useState<CatalogItem[]>([])
  const [loading, setLoading] = useState(true)

  // Visible item pagination count to prevent DOM lagging from 2,200 grid elements
  const [visibleLimit, setVisibleLimit] = useState(24)

  useEffect(() => {
    Promise.all([
      fetch('/data/asianpaints-shades.json').then((res) => res.json()),
      fetch('/data/asianpaints-textures-stencils.json').then((res) => res.json())
    ])
      .then(([shadesData, texturesStencilsData]) => {
        const mappedShades: CatalogItem[] = shadesData.map((item: { id: string; code: string; name: string; family: string; hex: string }) => {
          const familyMalayalam: Record<string, string> = {
            'off whites': 'ഓഫ് വൈറ്റ് ഷേഡ്',
            'pinks': 'പിങ്ക് ഷേഡ്',
            'oranges': 'ഓറഞ്ച് ഷേഡ്',
            'browns': 'ബ്രൗൺ ഷേഡ്',
            'greys': 'ഗ്രേ ഷേഡ്',
            'greens': 'പച്ച ഷേഡ്',
            'whites': 'വെള്ള ഷേഡ്',
            'reds': 'ചുവപ്പ് ഷേഡ്',
            'yellows': 'മഞ്ഞ ഷേഡ്',
            'blues': 'നീല ഷേഡ്',
            'purples': 'പർപ്പിൾ ഷേഡ്',
          }
          const malName = familyMalayalam[item.family] || 'വർണ്ണം'

          return {
            id: item.id,
            name: `${item.name} (${item.code})`,
            malayalam: malName,
            category: 'colors',
            hex: item.hex,
            desc: `Official Asian Paints Colour Catalogue shade from the ${item.family} family (Code: ${item.code}). Formulated for premium coverage, washability, and modern interior/exterior aesthetics.`,
            rooms: 'Living Room, Accent Walls, Bedrooms, Workspaces',
            finish: 'Royale Luxury Emulsion / Royale Glitz',
            maintenance: '100% Scrubbable & Stain Resistant',
          }
        })

        const mappedTexturesStencils: CatalogItem[] = texturesStencilsData.map((item: { id: string; name: string; malayalam: string; category: 'textures' | 'patterns'; image: string; desc: string; rooms: string; finish: string; maintenance: string }) => ({
          id: item.id,
          name: item.name,
          malayalam: item.malayalam,
          category: item.category,
          image: item.image,
          desc: item.desc,
          rooms: item.rooms,
          finish: item.finish,
          maintenance: item.maintenance
        }))

        setDbColors(mappedShades)
        setDbTexturesStencils(mappedTexturesStencils)
      })
      .catch((err) => {
        console.error('Error loading Asian Paints catalog:', err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Combine dynamic colors and textures/stencils
  const combinedItems = useMemo(() => {
    return [...dbTexturesStencils, ...dbColors]
  }, [dbColors, dbTexturesStencils])

  // Filter items based on active tab and query search
  const filteredItems = useMemo(() => {
    return combinedItems.filter((item) => {
      const matchesTab = activeTab === 'all' || item.category === activeTab
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.malayalam.includes(searchQuery) ||
        item.rooms.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesTab && matchesSearch
    })
  }, [combinedItems, activeTab, searchQuery])





  // Slice visible items to respect pagination limit
  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleLimit)
  }, [filteredItems, visibleLimit])

  const handleWhatsAppInquiry = (item: CatalogItem) => {
    const message = encodeURIComponent(
      `Hello Varnam Painting! I'm interested in the ${item.name} (${item.category}) catalog option for my project.`
    )
    window.open(`https://wa.me/919526100862?text=${message}`, '_blank')
  }

  return (
    <section className="bg-cream/75 min-h-screen pb-20 pt-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-16">
        
        {/* Title Header */}
        <Reveal y={20}>
          <div className="text-center">
            <span className="inline-block rounded-full bg-gold/20 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gold-dark">
              Design Catalog
            </span>
            <h1 className="mt-4 font-serif text-4xl leading-tight tracking-tight text-charcoal md:text-6xl">
              Colors, Textures <br />
              <span className="text-teal font-normal">& Patterns</span>
            </h1>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-gold to-teal" />
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-charcoal/80 md:text-base">
              Browse through our curated collection of Kerala-inspired color tones, premium architectural stuccos, and modern wall stencils.
            </p>
          </div>
        </Reveal>

        {/* Partnership Banner Card */}
        <Reveal y={20} delay={0.15}>
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl bg-white border border-border/80 p-6 md:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="relative h-12 w-40 overflow-hidden rounded-xl border border-border bg-stone-50 p-1 flex-shrink-0 hover:scale-102 transition-transform duration-300">
                <Image
                  src="/asian-paints-partner.jpg"
                  alt="Authorized Asian Paints Painting Contractor"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="font-serif text-lg text-charcoal font-semibold">
                  Authorized Asian Paints Contractor Partner
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-charcoal/70">
                  Varnam is proud to serve as an authorized <strong className="text-teal font-bold">Asian Paints Home Painting Services</strong> contractor. Browse our live catalog of 2,200+ Colour Catalogue shades, official Royale Play textures, and Wall Fashion stencils.
                </p>
              </div>
            </div>
            <Link
              href="/contact"
              className="rounded-xl bg-charcoal hover:bg-stone-800 text-cream px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-sm text-center w-full md:w-auto"
            >
              Book Free Site Consultation
            </Link>
          </div>
        </Reveal>

        {/* Filter Controls Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-b border-border pb-6 md:flex-row">
          
          {/* Tab Filters */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Catalog' },
              { id: 'colors', label: 'Colors' },
              { id: 'textures', label: 'Wall Textures' },
              { id: 'patterns', label: 'Stencil Patterns' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as FilterTab)
                  setVisibleLimit(24)
                }}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-charcoal text-cream shadow-md'
                    : 'bg-white hover:bg-cream-100 text-charcoal/70 border border-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full max-w-xs shrink-0">
            <input
              type="text"
              placeholder="Search by name or room..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setVisibleLimit(24)
              }}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 pl-10 text-xs font-bold text-charcoal tracking-wide outline-none transition-all focus:border-teal"
            />
            <svg
              className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>

        </div>

        {/* Results Grid */}
        <div className="mt-10">
          {loading && dbColors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-charcoal/60 gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal border-t-transparent" />
              <p className="text-xs font-bold tracking-widest uppercase">Loading Asian Paints Catalog...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <p className="text-center py-20 text-charcoal/50 text-sm">
              No matching items found. Try searching something else.
            </p>
          ) : (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                <AnimatePresence mode="popLayout">
                  {visibleItems.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: (idx % 8) * 0.05 }}
                      onClick={() => setSelectedItem(item)}
                      className="group cursor-pointer rounded-2xl bg-white border border-border/70 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                    <div>
                      {/* CARD IMAGE or SOLID COLOR SWATCH */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border/50">
                        {item.category === 'colors' ? (
                          <div
                            className="absolute inset-0 flex flex-col items-center justify-center p-4 transition-transform duration-500 group-hover:scale-102"
                            style={{ backgroundColor: item.hex }}
                          >
                            <span className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-white/20 backdrop-blur-sm ${item.hex === '#ECFDF5' || item.hex === '#FAF7F2' ? 'text-charcoal' : 'text-cream'}`}>
                              {item.hex}
                            </span>
                          </div>
                        ) : (
                          <>
                            <Image
                              loader={cloudinaryLoader}
                              src={item.image || ''}
                              alt={item.name}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            />
                            <div className="absolute inset-0 bg-charcoal/10 transition-opacity duration-300 group-hover:opacity-0" />
                          </>
                        )}
                        
                        {/* Category Tag */}
                        <div className="absolute left-3 bottom-3 rounded-lg bg-charcoal/80 px-2 py-1 text-[8px] font-bold uppercase tracking-widest text-cream backdrop-blur-sm shadow-sm pointer-events-none">
                          {item.category}
                        </div>
                      </div>

                      {/* Card Content info */}
                      <div className="p-5">
                        <span className="text-[10px] font-bold tracking-wider text-charcoal-600 block mlm">
                          {item.malayalam}
                        </span>
                        <h3 className="font-serif text-lg text-charcoal mt-0.5 leading-tight group-hover:text-teal transition-colors">
                          {item.name}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-charcoal/70 line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                       <div className="border-t border-border-light pt-3.5 flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-charcoal/80">
                        <span>Rooms:</span>
                        <span className="text-teal-dark truncate max-w-[150px]">{item.rooms.split(',')[0]}</span>
                      </div>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Load More Button */}
            {filteredItems.length > visibleLimit && (
              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setVisibleLimit((prev) => prev + 24)}
                  className="rounded-xl border border-border hover:border-teal hover:text-teal bg-white text-charcoal/80 px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-sm active:scale-95"
                >
                  Load More Options ({filteredItems.length - visibleLimit} remaining)
                </button>
              </div>
            )}
          </>
          )}
        </div>

      </div>

      {/* DETAIL LIGHTBOX DRAWER */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-border"
            >
              
              {/* Close Button */}
               <button
                 onClick={() => setSelectedItem(null)}
                 className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 shadow text-charcoal hover:bg-white transition-all active:scale-95"
                 aria-label="Close details"
               >
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                   <path d="M18 6L6 18M6 6l12 12" />
                 </svg>
               </button>

              {/* Top Banner Swatch or Image */}
              <div className="relative h-56 w-full overflow-hidden border-b border-border-light">
                {selectedItem.category === 'colors' ? (
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-6"
                    style={{ backgroundColor: selectedItem.hex }}
                  >
                    <span className={`text-xs uppercase font-bold tracking-widest px-4 py-1.5 rounded-lg bg-white/20 backdrop-blur-sm ${selectedItem.hex === '#ECFDF5' || selectedItem.hex === '#FAF7F2' ? 'text-charcoal' : 'text-cream'}`}>
                      {selectedItem.hex}
                    </span>
                  </div>
                ) : (
                  <Image
                    loader={cloudinaryLoader}
                    src={selectedItem.image || ''}
                    alt={selectedItem.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                )}
                
                {/* Category Badge */}
                <div className="absolute left-5 bottom-5 rounded-lg bg-charcoal/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-cream backdrop-blur-sm shadow-sm pointer-events-none">
                  {selectedItem.category}
                </div>
              </div>

              {/* Detail Info Panel */}
              <div className="p-6">
                 <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-dark mlm block">
                   {selectedItem.malayalam}
                 </span>
                <h3 className="font-serif text-2xl text-charcoal mt-1 leading-tight">
                  {selectedItem.name}
                </h3>
                
                <p className="mt-4 text-xs leading-relaxed text-charcoal/80">
                  {selectedItem.desc}
                </p>

                {/* Specs List */}
                <div className="mt-6 border-t border-border-light pt-4 space-y-2.5 text-xs">
                   <div className="flex justify-between">
                     <span className="font-bold text-charcoal-600 uppercase tracking-wider text-[10px]">Recommended Rooms:</span>
                     <span className="text-charcoal font-medium text-right max-w-[280px]">{selectedItem.rooms}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="font-bold text-charcoal-600 uppercase tracking-wider text-[10px]">Material Finish:</span>
                     <span className="text-charcoal font-medium">{selectedItem.finish}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="font-bold text-charcoal-600 uppercase tracking-wider text-[10px]">Maintenance / Wash:</span>
                     <span className="text-charcoal font-medium">{selectedItem.maintenance}</span>
                   </div>
                </div>

                {/* Interactive Consultation Enquiry Button */}
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => handleWhatsAppInquiry(selectedItem)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-teal py-3.5 text-xs font-bold uppercase tracking-[0.15em] text-white shadow-md hover:bg-teal-dark active:scale-[0.98] transition-all"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/>
                    </svg>
                    Inquire on WhatsApp
                  </button>
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-5 py-3.5 border border-border rounded-xl text-xs font-bold uppercase tracking-[0.15em] text-charcoal hover:bg-cream-100 transition-all active:scale-[0.98]"
                  >
                    Close
                  </button>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}
