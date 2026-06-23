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

    const canvasA = document.createElement('canvas')
    const canvasB = document.createElement('canvas')

    canvasB.style.cssText =
      'width:100%;height:100%;pointer-events:none;'

    container.appendChild(canvasB)

    const ctxA = canvasA.getContext('2d')!
    const ctxB = canvasB.getContext('2d')!

    const circleCount = 180
    const circlePropCount = 8
    const circlePropsLength = circleCount * circlePropCount
    const baseSpeed = 0.1
    const rangeSpeed = 1
    const baseTTL = 150
    const rangeTTL = 200
    const baseRadius = 120
    const rangeRadius = 220
    const rangeHue = 360
    const xOff = 0.0015
    const yOff = 0.0015
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
      const x = rand(canvasA.width)
      const y = rand(canvasA.height)
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
      ctxA.save()
      ctxA.fillStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`
      ctxA.beginPath()
      ctxA.arc(x, y, radius, 0, TAU)
      ctxA.fill()
      ctxA.restore()
    }

    function checkBounds(x: number, y: number, radius: number) {
      return (
        x < -radius ||
        x > canvasA.width + radius ||
        y < -radius ||
        y > canvasA.height + radius
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

    function renderCanvas() {
      ctxB.save()
      ctxB.filter = 'blur(50px)'
      ctxB.drawImage(canvasA, 0, 0)
      ctxB.restore()
    }

    let animationId: number

    function draw() {
      ctxA.clearRect(0, 0, canvasA.width, canvasA.height)
      ctxB.fillStyle = backgroundColor
      ctxB.fillRect(0, 0, canvasB.width, canvasB.height)
      updateCircles()
      renderCanvas()
      animationId = requestAnimationFrame(draw)
    }

    function resize() {
      const { innerWidth, innerHeight } = window
      canvasA.width = innerWidth
      canvasA.height = innerHeight
      ctxA.drawImage(canvasB, 0, 0)
      canvasB.width = innerWidth
      canvasB.height = innerHeight
      ctxB.drawImage(canvasA, 0, 0)
    }

    resize()
    initCircles()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      container.removeChild(canvasB)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="content--canvas fixed inset-0 z-0 bg-[#0d0a08]"
      aria-hidden="true"
    />
  )
}
