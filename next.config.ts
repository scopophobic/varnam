import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // The admin invoice page is tested from a phone over the local network.
  // Without this, Next blocks the dev client/HMR origin and the form can
  // fall back to a native page refresh before React is hydrated.
  allowedDevOrigins: ['192.168.0.17'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
}

export default nextConfig
