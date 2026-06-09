import fs from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'

const DATA_DIR = path.join(process.cwd(), 'data')

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

function filePath(collection: string) {
  return path.join(DATA_DIR, `${collection}.json`)
}

export interface Message {
  id: string
  name: string
  phone: string
  district: string
  scope: string
  createdAt: string
  read: boolean
}

export interface GalleryItem {
  id: string
  url: string
  title: string
  category: string
  location: string
  createdAt: string
}

function readCollection<T>(name: string): T[] {
  ensureDir()
  const fp = filePath(name)
  if (!fs.existsSync(fp)) return []
  try {
    return JSON.parse(fs.readFileSync(fp, 'utf-8'))
  } catch {
    return []
  }
}

function writeCollection<T>(name: string, data: T[]) {
  ensureDir()
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2))
}

export function getMessages(): Message[] {
  return readCollection<Message>('messages')
}

export function addMessage(msg: Omit<Message, 'id' | 'createdAt' | 'read'>): Message {
  const messages = getMessages()
  const entry: Message = { ...msg, id: uuid(), createdAt: new Date().toISOString(), read: false }
  messages.unshift(entry)
  writeCollection('messages', messages)
  return entry
}

export function deleteMessage(id: string): boolean {
  const messages = getMessages().filter((m) => m.id !== id)
  const before = getMessages().length
  writeCollection('messages', messages)
  return messages.length < before
}

export function getGalleryItems(): GalleryItem[] {
  return readCollection<GalleryItem>('gallery')
}

export function addGalleryItem(item: Omit<GalleryItem, 'id' | 'createdAt'>): GalleryItem {
  const items = getGalleryItems()
  const entry: GalleryItem = { ...item, id: uuid(), createdAt: new Date().toISOString() }
  items.push(entry)
  writeCollection('gallery', items)
  return entry
}

export function deleteGalleryItem(id: string): boolean {
  const items = getGalleryItems().filter((i) => i.id !== id)
  const before = getGalleryItems().length
  writeCollection('gallery', items)
  return items.length < before
}
