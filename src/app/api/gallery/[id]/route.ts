import { NextResponse } from 'next/server'
import { getTokenFromCookies, verifyToken } from '@/lib/auth'
import { deleteGalleryItem, getGalleryItems } from '@/lib/db'
import { deleteImage } from '@/lib/cloudinary'

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = await getTokenFromCookies()
  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const items = getGalleryItems()
  const item = items.find((i) => i.id === id)

  if (!item) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  try {
    const publicId = item.url.split('/').pop()?.split('.')[0]
    if (publicId) await deleteImage(`varnam-gallery/${publicId}`)
  } catch {
    // image may already be gone from Cloudinary
  }

  deleteGalleryItem(id)
  return NextResponse.json({ success: true })
}
