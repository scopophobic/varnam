'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface Message {
  id: string
  name: string
  phone: string
  district: string
  scope: string
  createdAt: string
  read: boolean
}

interface GalleryItem {
  id: string
  url: string
  title: string
  category: string
  location: string
  createdAt: string
}

type Tab = 'messages' | 'gallery'

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [tab, setTab] = useState<Tab>('messages')
  const [messages, setMessages] = useState<Message[]>([])
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadForm, setUploadForm] = useState({ title: '', category: '', location: '' })
  const [dragging, setDragging] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/me').then((res) => {
      if (!res.ok) router.push('/admin/login')
      else setAuthenticated(true)
    })
  }, [router])

  const loadMessages = useCallback(async () => {
    const res = await fetch('/api/messages')
    if (res.ok) setMessages(await res.json())
  }, [])

  const loadGallery = useCallback(async () => {
    const res = await fetch('/api/gallery')
    if (res.ok) setGalleryItems(await res.json())
  }, [])

  useEffect(() => {
    if (!authenticated) return
    loadMessages()
    loadGallery()
  }, [authenticated, loadMessages, loadGallery])

  const handleDeleteMessage = async (id: string) => {
    const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' })
    if (res.ok) setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const handleDeleteGallery = async (id: string) => {
    const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
    if (res.ok) setGalleryItems((prev) => prev.filter((i) => i.id !== id))
  }

  const handleFileUpload = async (file: File) => {
    if (!file || !uploadForm.title) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('image', file)
      fd.append('title', uploadForm.title)
      fd.append('category', uploadForm.category)
      fd.append('location', uploadForm.location)

      const res = await fetch('/api/gallery', { method: 'POST', body: fd })
      if (res.ok) {
        const item = await res.json()
        setGalleryItems((prev) => [item, ...prev])
        setUploadForm({ title: '', category: '', location: '' })
      }
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) handleFileUpload(file)
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  if (authenticated === null) return null

  return (
    <div className="min-h-screen bg-cream pt-24">
      <div className="mx-auto max-w-6xl px-6 py-8 lg:px-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl text-charcoal">
              Admin<span className="text-gold">.</span>
            </h1>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-stone-400">
              Dashboard
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="border border-border px-5 py-2 text-xs uppercase tracking-[0.15em] text-charcoal/75 transition-colors hover:border-charcoal"
          >
            Sign Out
          </button>
        </div>

        <div className="mb-8 flex gap-1 border-b border-border">
          {(['messages', 'gallery'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 text-xs uppercase tracking-[0.15em] transition-all ${
                tab === t
                  ? 'border-b-2 border-gold text-charcoal'
                  : 'text-charcoal/50 hover:text-charcoal'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'messages' && (
          <div className="space-y-3">
            {messages.length === 0 && (
              <p className="py-12 text-center text-sm text-charcoal/50">
                No messages yet.
              </p>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="group border border-border bg-cream p-6 transition-all hover:border-gold/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-serif text-lg text-charcoal">
                        {msg.name}
                      </span>
                      <span className="text-xs text-stone-400">
                        {new Date(msg.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="text-charcoal/75">
                        <span className="text-xs uppercase tracking-[0.1em] text-gold">
                          Phone:{' '}
                        </span>
                        <a href={`tel:${msg.phone}`} className="link-underline">
                          {msg.phone}
                        </a>
                      </span>
                      <span className="text-charcoal/75">
                        <span className="text-xs uppercase tracking-[0.1em] text-gold">
                          Location:{' '}
                        </span>
                        {msg.district}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-charcoal/75">
                      {msg.scope}
                    </p>
                    <div className="flex gap-2">
                      <a
                        href={`https://wa.me/91${msg.phone.replace(/[^0-9]/g, '').slice(-10)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-teal/30 px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-teal transition-colors hover:bg-teal hover:text-cream"
                      >
                        Reply via WhatsApp
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteMessage(msg.id)}
                    className="shrink-0 border border-border px-3 py-1.5 text-xs text-stone-400 opacity-0 transition-all                     hover:border-warm hover:text-warm group-hover:opacity-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'gallery' && (
          <div className="space-y-8">
            <div className="border border-dashed border-border bg-cream-50 p-8">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`space-y-4 text-center transition-colors ${
                  dragging ? 'opacity-60' : ''
                }`}
              >
                <p className="text-xs uppercase tracking-[0.15em] text-stone-400">
                  Add New Image
                </p>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-charcoal/60">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={uploadForm.title}
                      onChange={(e) =>
                        setUploadForm({ ...uploadForm, title: e.target.value })
                      }
                      className="mt-1 w-full border-b border-border bg-transparent py-2 text-sm text-charcoal outline-none focus:border-gold"
                      placeholder="Project name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal/60">
                      Category
                    </label>
                    <input
                      type="text"
                      value={uploadForm.category}
                      onChange={(e) =>
                        setUploadForm({ ...uploadForm, category: e.target.value })
                      }
                      className="mt-1 w-full border-b border-border bg-transparent py-2 text-sm text-charcoal outline-none focus:border-gold"
                      placeholder="e.g. Residential"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-charcoal/60">
                      Location
                    </label>
                    <input
                      type="text"
                      value={uploadForm.location}
                      onChange={(e) =>
                        setUploadForm({ ...uploadForm, location: e.target.value })
                      }
                      className="mt-1 w-full border-b border-border bg-transparent py-2 text-sm text-charcoal outline-none focus:border-gold"
                      placeholder="e.g. Kochi, Kerala"
                    />
                  </div>
                </div>

                <label className="inline-flex cursor-pointer border border-charcoal bg-charcoal px-8 py-3 text-xs uppercase tracking-[0.15em] text-cream transition-all hover:bg-gold hover:border-gold">
                  {uploading ? 'Uploading...' : 'Choose Image'}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading || !uploadForm.title}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file)
                      e.target.value = ''
                    }}
                  />
                </label>
                <p className="text-xs text-stone-400">
                  or drag & drop an image here
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {galleryItems.length === 0 && (
                <p className="col-span-full py-12 text-center text-sm text-charcoal/50">
                  No gallery images yet.
                </p>
              )}
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative overflow-hidden border border-border"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="aspect-[4/3] w-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/70 via-transparent to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="font-serif text-sm text-white">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.1em] text-white/70">
                      {item.category}
                    </p>
                    <button
                      onClick={() => handleDeleteGallery(item.id)}
                      className="mt-2 self-start border border-white/30 px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] text-white/70 transition-colors hover:border-warm hover:text-warm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
