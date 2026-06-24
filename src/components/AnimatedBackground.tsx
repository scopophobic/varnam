'use client'

import { useEffect, useRef } from 'react'
import { createNoise3D } from 'simplex-noise'

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const noise3D = createNoise3D()
    const TAU = Math.PI * 2
    const scale = 0.125 // Scale down to 1/8th resolution for extreme performance

    const canvas = document.createElement('canvas')
    
    // Position fixed, sized slightly larger (110%) to push blurred edges off-screen,
    // and apply hardware-accelerated CSS blur (compositor thread)
    canvas.style.cssText =
      'position:absolute;width:110%;height:110%;top:-5%;left:-5%;filter:blur(40px);transform:translate3d(0,0,0);backface-visibility:hidden;pointer-events:none;'

    container.appendChild(canvas)

    // Using non-alpha context for faster fills
    const ctx = canvas.getContext('2d', { alpha: false })!

    const circleCount = 180
    const circlePropCount = 8
    const circlePropsLength = circleCount * circlePropCount
    
    // Scale speed, radii, and noise offsets by the scale factor
    const baseSpeed = 0.1 * scale
    const rangeSpeed = 1 * scale
    const baseTTL = 150
    const rangeTTL = 200
    const baseRadius = 120 * scale
    const rangeRadius = 220 * scale
    const rangeHue = 360
    const xOff = 0.0015 / scale
    const yOff = 0.0015 / scale
    const zOff = 0.0015
    const backgroundColor = 'hsla(0,0%,3%,1)'
    let baseHue = 0

    const circleProps = new Float32Array(circlePropsLength)

    const rand = (n: number) => Math.random() * n

    function fadeInOut(t: number, m: number) {
      const hm = m * 0.5
      return Math.abs(((t + hm) % m) - hm) / hm
    }

    function initCircle(i: number) {
      const x = rand(canvas.width)
      const y = rand(canvas.height)
      const n = noise3D(x * xOff, y * yOff, baseHue * zOff)
      const t = rand(TAU)
      const speed = baseSpeed + rand(rangeSpeed)
      const vx = speed * Math.cos(t)
      const vy = speed * Math.sin(t)
      const ttl = baseTTL + rand(rangeTTL)
      const radius = baseRadius + rand(rangeRadius)
      const hue = baseHue + n * rangeHue

      circleProps.set([x, y, vx, vy, 0, ttl, radius, hue], i)
    }

    function initCircles() {
      for (let i = 0; i < circlePropsLength; i += circlePropCount) {
        initCircle(i)
      }
    }

    function drawCircle(x: number, y: number, life: number, ttl: number, radius: number, hue: number) {
      ctx.save()
      ctx.fillStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, TAU)
      ctx.fill()
      ctx.restore()
    }

    function checkBounds(x: number, y: number, radius: number) {
      return (
        x < -radius ||
        x > canvas.width + radius ||
        y < -radius ||
        y > canvas.height + radius
      )
    }

    function updateCircle(i: number) {
      const x = circleProps[i]
      const y = circleProps[i + 1]
      const vx = circleProps[i + 2]
      const vy = circleProps[i + 3]
      const life = circleProps[i + 4]
      const ttl = circleProps[i + 5]
      const radius = circleProps[i + 6]
      const hue = circleProps[i + 7]

      drawCircle(x, y, life, ttl, radius, hue)

      circleProps[i] = x + vx
      circleProps[i + 1] = y + vy
      circleProps[i + 4] = life + 1

      if (checkBounds(x, y, radius) || life > ttl) {
        initCircle(i)
      }
    }

    function updateCircles() {
      baseHue = (baseHue + 1) % 360
      for (let i = 0; i < circlePropsLength; i += circlePropCount) {
        updateCircle(i)
      }
    }

    let animationId: number

    function draw() {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      updateCircles()
      animationId = requestAnimationFrame(draw)
    }

    function resize() {
      const { innerWidth, innerHeight } = window
      canvas.width = innerWidth * scale
      canvas.height = innerHeight * scale
      initCircles()
    }

    resize()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      container.removeChild(canvas)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="content--canvas fixed inset-0 z-0 bg-[#0d0a08] overflow-hidden"
      aria-hidden="true"
    />
  )
}
