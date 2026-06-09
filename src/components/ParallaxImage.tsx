'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxImageProps {
  children: React.ReactNode
  speed?: number
}

export default function ParallaxImage({ children, speed = 0.15 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 200])

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}
