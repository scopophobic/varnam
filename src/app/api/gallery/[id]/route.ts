import { NextResponse } from 'next/server'
import { getTokenFromCookies, verifyToken } from '@/lib/auth'
import { deleteGalleryItem, getGalleryItems } from '@/lib/db'
import { deleteImage } from '@/lib/cloudinary'

function getPublicIdFromUrl(url: string): string | null {
  try {
    const parts = url.split('/')
    const uploadIndex = parts.indexOf('upload')
    if (uploadIndex === -1) return null

    // Get everything after '/upload/'
    let pathParts = parts.slice(uploadIndex + 1)

    // Filter out transformations and version segments
    pathParts = pathParts.filter(part => {
      // Skip version tag (e.g. v1782220018)
      if (/^v\d+$/.test(part)) return false
      // Skip transformations (e.g. contains commas or w_, h_, q_, f_, c_)
      if (part.includes(',') || part.includes('w_') || part.includes('h_') || part.includes('q_') || part.includes('f_')) return false
      return true
    })

    const lastPart = pathParts[pathParts.length - 1]
    if (!lastPart) return null
    
    const lastPartWithoutExt = lastPart.split('.')[0]
    pathParts[pathParts.length - 1] = lastPartWithoutExt

    return pathParts.join('/')
  } catch {
    return null
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
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
      const publicId = getPublicIdFromUrl(item.url)
      if (publicId) {
        console.log(`Deleting Cloudinary asset: ${publicId}`)
        await deleteImage(publicId)
      }
    } catch (err) {
      console.error('Error deleting image from Cloudinary:', err)
    }

    deleteGalleryItem(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('CRITICAL: Error in DELETE /api/gallery/[id]:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    )
  }
}
