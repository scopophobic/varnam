/**
 * Utility functions for optimizing Cloudinary URLs on the client-side.
 * This avoids proxying remote images through the Next.js server,
 * improving performance, response times, and reducing server CPU load.
 */

interface LoaderProps {
  src: string
  width: number
  quality?: number
}

/**
 * Custom Next.js image loader for Cloudinary images.
 */
export function cloudinaryLoader({ src, width, quality }: LoaderProps): string {
  if (src.includes('res.cloudinary.com')) {
    const parts = src.split('/upload/')
    if (parts.length === 2) {
      let rest = parts[1]
      const firstSlash = rest.indexOf('/')
      if (firstSlash !== -1) {
        const firstSegment = rest.substring(0, firstSlash)
        // If there's an existing transformation segment (contains w_, q_, or f_), strip it out
        if (firstSegment.includes('w_') || firstSegment.includes('q_') || firstSegment.includes('f_')) {
          rest = rest.substring(firstSlash + 1)
        }
      }
      const q = quality || 'auto'
      return `${parts[0]}/upload/q_${q},f_auto,w_${width}/${rest}`
    }
  }
  return src
}

/**
 * Direct URL generator to get a specific width from a Cloudinary URL.
 */
export function getOptimizedCloudinaryUrl(url: string, width: number, quality?: number): string {
  if (!url || !url.includes('res.cloudinary.com')) return url
  const parts = url.split('/upload/')
  if (parts.length !== 2) return url

  let rest = parts[1]
  const firstSlash = rest.indexOf('/')
  if (firstSlash !== -1) {
    const firstSegment = rest.substring(0, firstSlash)
    if (firstSegment.includes('w_') || firstSegment.includes('q_') || firstSegment.includes('f_')) {
      rest = rest.substring(firstSlash + 1)
    }
  }
  const q = quality || 'auto'
  return `${parts[0]}/upload/q_${q},f_auto,w_${width}/${rest}`
}
