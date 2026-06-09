import { NextResponse } from 'next/server'
import { getTokenFromCookies, verifyToken } from '@/lib/auth'
import { getGalleryItems, addGalleryItem } from '@/lib/db'
import { uploadImage } from '@/lib/cloudinary'

export async function GET() {
  const items = getGalleryItems()
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  const token = await getTokenFromCookies()
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('image') as File | null
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const location = formData.get('location') as string

    if (!file || !title) {
      return NextResponse.json({ error: 'Image and title required' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

    const { url } = await uploadImage(base64)
    const item = addGalleryItem({ url, title, category: category || '', location: location || '' })

    return NextResponse.json(item, { status: 201 })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
