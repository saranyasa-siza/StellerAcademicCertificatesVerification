import React, { useEffect, useRef } from 'react'

interface Star {
  originX: number
  originY: number
  x: number
  y: number
  vx: number
  vy: number
  baseRadius: number
  currentRadius: number
  baseOpacity: number
  currentOpacity: number
  color: string
  twinklePhase: number
  twinkleSpeed: number
  glowIntensity: number
}

// Dim gray / blue-white / white palette
const STAR_COLORS = [
  '#94a3b8', // slate-400
  '#cbd5e1', // slate-300
  '#e2e8f0', // slate-200
  '#bfdbfe', // blue-200
  '#93c5fd', // blue-300
  '#c7d2fe', // indigo-200
  '#64748b', // slate-500
  '#ffffff', // bright white
]

interface StarfieldOverlayProps {
  particleCount?: number
  interactionRadius?: number
  className?: string
}

export default function StarfieldOverlay({
  particleCount = 280,
  interactionRadius = 140,
  className = '',
}: StarfieldOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef<{ pageX: number; pageY: number; active: boolean }>({
    pageX: -1000,
    pageY: -1000,
    active: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let totalWidth = document.documentElement.clientWidth || window.innerWidth
    let totalHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight || 0)

    canvas.width = totalWidth * dpr
    canvas.height = totalHeight * dpr
    ctx.scale(dpr, dpr)

    // Generate ~200-300 stars distributed across full scrollable page height
    const stars: Star[] = []
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * totalWidth
      const y = Math.random() * totalHeight
      const isBright = Math.random() < 0.15 // ~15% brighter stars

      const baseRadius = isBright
        ? Math.random() * 1.4 + 1.6 // 1.6px to 3.0px for bright stars
        : Math.random() * 1.2 + 0.9 // 0.9px to 2.1px for regular stars

      const baseOpacity = isBright
        ? Math.random() * 0.25 + 0.65 // 0.65 to 0.90
        : Math.random() * 0.4 + 0.2 // 0.20 to 0.60 (dim)

      stars.push({
        originX: x,
        originY: y,
        x,
        y,
        vx: 0,
        vy: 0,
        baseRadius,
        currentRadius: baseRadius,
        baseOpacity,
        currentOpacity: baseOpacity,
        color: isBright ? '#ffffff' : STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.018 + 0.008, // Slow gentle twinkle
        glowIntensity: 0,
      })
    }

    const updateDimensions = () => {
      if (!canvas) return
      const prevW = totalWidth
      const prevH = totalHeight

      totalWidth = document.documentElement.clientWidth || window.innerWidth
      totalHeight = Math.max(window.innerHeight, document.documentElement.scrollHeight || 0)

      canvas.width = totalWidth * dpr
      canvas.height = totalHeight * dpr
      ctx.scale(dpr, dpr)

      // Reposition stars proportionally across full page height
      for (const s of stars) {
        s.originX = (s.originX / (prevW || 1)) * totalWidth
        s.originY = (s.originY / (prevH || 1)) * totalHeight
      }
    }

    window.addEventListener('resize', updateDimensions)

    // ResizeObserver on body to catch route changes or content height expansion
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (document.body) {
      resizeObserver.observe(document.body)
    }

    // Pointer tracking in page coordinates (clientX + scrollX, clientY + scrollY)
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY
      if (clientX !== undefined && clientY !== undefined) {
        mouseRef.current.pageX = clientX + window.scrollX
        mouseRef.current.pageY = clientY + window.scrollY
        mouseRef.current.active = true
      }
    }

    const handlePointerLeave = () => {
      mouseRef.current.active = false
      mouseRef.current.pageX = -1000
      mouseRef.current.pageY = -1000
    }

    window.addEventListener('mousemove', handlePointerMove, { passive: true })
    window.addEventListener('mouseleave', handlePointerLeave)
    window.addEventListener('touchmove', handlePointerMove, { passive: true })
    window.addEventListener('touchend', handlePointerLeave)

    let zoomTime = 0

    // Physics & render loop at 60fps
    const render = () => {
      ctx.clearRect(0, 0, totalWidth, totalHeight)

      // Slow looping zoom in/out (drifting through space depth effect: 1.0x to 1.08x)
      zoomTime += 0.007 // Seamless slow several-second cycle
      const zoomFactor = Math.sin(zoomTime) * 0.04 // -0.04 to +0.04
      const zoomScale = 1.0 + zoomFactor

      const viewportCenterX = window.scrollX + (document.documentElement.clientWidth || window.innerWidth) / 2
      const viewportCenterY = window.scrollY + window.innerHeight / 2

      ctx.save()
      ctx.translate(viewportCenterX, viewportCenterY)
      ctx.scale(zoomScale, zoomScale)
      ctx.translate(-viewportCenterX, -viewportCenterY)

      const mouse = mouseRef.current
      const radius = interactionRadius
      const maxPull = 36 // Subtle gravitational pull displacement in px

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]

        // 1. Idle Twinkle Animation (staggered slow sinusoidal fade in/out)
        s.twinklePhase += s.twinkleSpeed
        const twinkleOscillation = (Math.sin(s.twinklePhase) + 1) * 0.5 // 0.0 to 1.0
        const idleOpacity = s.baseOpacity * (0.35 + 0.65 * twinkleOscillation)

        let targetX = s.originX
        let targetY = s.originY
        let targetRadius = s.baseRadius
        let targetOpacity = idleOpacity
        let targetGlow = 0

        // 2. Cursor Anti-Gravity Interaction (~100-150px radius)
        if (mouse.active) {
          const dx = mouse.pageX - s.originX
          const dy = mouse.pageY - s.originY
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < radius && dist > 0.5) {
            const normDist = dist / radius // 0.0 to 1.0
            const ease = 1 - normDist
            const easeFactor = ease * ease * (3 - 2 * ease) // Smooth cubic hermite curve

            // Gentle gravitational drift toward cursor
            const dirX = dx / dist
            const dirY = dy / dist
            const pullDistance = maxPull * easeFactor

            targetX = s.originX + dirX * pullDistance
            targetY = s.originY + dirY * pullDistance

            // Brighten & slightly increase size
            targetRadius = s.baseRadius * (1 + easeFactor * 0.7) // 1.0x to 1.7x
            targetOpacity = Math.min(1.0, idleOpacity + easeFactor * 0.65)
            targetGlow = easeFactor
          }
        }

        // 3. Smooth Spring & Damping Physics (Physics-based easing, not linear)
        const springForce = 0.08
        const damping = 0.84

        const ax = (targetX - s.x) * springForce
        const ay = (targetY - s.y) * springForce
        s.vx = (s.vx + ax) * damping
        s.vy = (s.vy + ay) * damping
        s.x += s.vx
        s.y += s.vy

        // Smooth easing for radius, opacity, and glow
        s.currentRadius += (targetRadius - s.currentRadius) * 0.14
        s.currentOpacity += (targetOpacity - s.currentOpacity) * 0.14
        s.glowIntensity += (targetGlow - s.glowIntensity) * 0.14

        // 4. Render Soft Glow Halo if interacting
        if (s.glowIntensity > 0.02) {
          const glowRadius = s.currentRadius * (2.8 + s.glowIntensity * 3.2)
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowRadius)
          const glowAlpha = s.glowIntensity * 0.5 * s.currentOpacity

          grad.addColorStop(0, `rgba(255, 255, 255, ${glowAlpha})`)
          grad.addColorStop(0.4, `rgba(186, 230, 253, ${glowAlpha * 0.5})`)
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)')

          ctx.save()
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(s.x, s.y, glowRadius, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }

        // 5. Render Core Star Particle
        ctx.save()
        ctx.globalAlpha = Math.min(1.0, Math.max(0.1, s.currentOpacity))
        ctx.fillStyle = s.color
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.currentRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      ctx.restore()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', updateDimensions)
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('mouseleave', handlePointerLeave)
      window.removeEventListener('touchmove', handlePointerMove)
      window.removeEventListener('touchend', handlePointerLeave)
      resizeObserver.disconnect()
    }
  }, [particleCount, interactionRadius])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden max-w-full ${className}`}
      style={{ background: 'transparent' }}
    />
  )
}
