import React, { useEffect, useRef } from 'react'

export type ParticleMode = 'attract' | 'repel' | 'float'
export type ColorPreset = 'stellar' | 'neon' | 'emerald' | 'amber' | 'monochrome'
export type BackgroundTheme = 'dark' | 'navy' | 'transparent'

export interface GravityParticlesConfig {
  particleCount: number
  mode: ParticleMode
  gravityStrength: number
  interactionRadius: number
  speed: number
  particleSizeMin: number
  particleSizeMax: number
  colorPreset: ColorPreset
  backgroundTheme: BackgroundTheme
  connectParticles: boolean
  connectCursor: boolean
  glowingEffect: boolean
  showCursorRing: boolean
  zoomIntensity: number // 1.0 to 4.0 fast zoom scale
}

export const COLOR_PALETTES: Record<ColorPreset, string[]> = {
  stellar: ['#38bdf8', '#60a5fa', '#3b82f6', '#818cf8', '#c084fc', '#06b6d4', '#e0e7ff'],
  neon: ['#f43f5e', '#d946ef', '#a855f7', '#8b5cf6', '#06b6d4', '#ec4899', '#f472b6'],
  emerald: ['#34d399', '#10b981', '#059669', '#2dd4bf', '#14b8a6', '#6ee7b7', '#a7f3d0'],
  amber: ['#fbbf24', '#f59e0b', '#f97316', '#eab308', '#fb923c', '#fef08a', '#d97706'],
  monochrome: ['#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#ffffff', '#38bdf8', '#cbd5e1'],
}

export const DEFAULT_PARTICLE_CONFIG: GravityParticlesConfig = {
  particleCount: 130,
  mode: 'attract',
  gravityStrength: 3.2,
  interactionRadius: 240,
  speed: 1.4,
  particleSizeMin: 2.0,
  particleSizeMax: 5.5,
  colorPreset: 'stellar',
  backgroundTheme: 'dark',
  connectParticles: true,
  connectCursor: true,
  glowingEffect: true,
  showCursorRing: true,
  zoomIntensity: 2.8,
}

interface Particle {
  x: number
  y: number
  z: number // Depth layer for 3D parallax zoom
  vx: number
  vy: number
  baseVx: number
  baseVy: number
  baseRadius: number
  currentRadius: number
  color: string
  alpha: number
  glowIntensity: number
  hoverZoom: number
}

interface DepthStar {
  x: number
  y: number
  radius: number
  alpha: number
  color: string
}

interface Shockwave {
  x: number
  y: number
  radius: number
  maxRadius: number
  alpha: number
}

interface Props {
  config?: Partial<GravityParticlesConfig>
  className?: string
}

export default function GravityParticles({ config = {}, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fullConfig: GravityParticlesConfig = { ...DEFAULT_PARTICLE_CONFIG, ...config }

  const configRef = useRef<GravityParticlesConfig>(fullConfig)
  configRef.current = fullConfig

  const mouseRef = useRef<{ x: number; y: number; active: boolean; targetX: number; targetY: number }>({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    active: false,
  })

  const shockwavesRef = useRef<Shockwave[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = (canvas.width = window.innerWidth * dpr)
    let height = (canvas.height = window.innerHeight * dpr)
    ctx.scale(dpr, dpr)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth * dpr
      height = canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('resize', handleResize)

    // Fast responsive mouse tracking
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0]?.clientY : e.clientY
      if (clientX !== undefined && clientY !== undefined) {
        mouseRef.current.targetX = clientX
        mouseRef.current.targetY = clientY
        mouseRef.current.active = true
      }
    }

    const handlePointerLeave = () => {
      mouseRef.current.active = false
    }

    // Shockwave pulse on click
    const handlePointerDown = (e: MouseEvent) => {
      shockwavesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 10,
        maxRadius: configRef.current.interactionRadius * 1.8,
        alpha: 1.0,
      })
    }

    window.addEventListener('mousemove', handlePointerMove)
    window.addEventListener('mouseleave', handlePointerLeave)
    window.addEventListener('touchmove', handlePointerMove)
    window.addEventListener('touchend', handlePointerLeave)
    window.addEventListener('mousedown', handlePointerDown)

    // Micro space dust background stars
    const depthStars: DepthStar[] = []
    const w = window.innerWidth
    const h = window.innerHeight

    for (let i = 0; i < 90; i++) {
      depthStars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.2 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
        color: '#ffffff',
      })
    }

    // Main particles setup
    let particles: Particle[] = []

    const createParticles = (count: number) => {
      const currentConfig = configRef.current
      const palette = COLOR_PALETTES[currentConfig.colorPreset] || COLOR_PALETTES.stellar
      const newParticles: Particle[] = []

      for (let i = 0; i < count; i++) {
        const radius =
          Math.random() * (currentConfig.particleSizeMax - currentConfig.particleSizeMin) +
          currentConfig.particleSizeMin

        const angle = Math.random() * Math.PI * 2
        const speedMag = (Math.random() * 1.2 + 0.6) * currentConfig.speed
        const baseVx = Math.cos(angle) * speedMag
        const baseVy = Math.sin(angle) * speedMag

        newParticles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 0.8 + 0.2, // depth factor
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          baseRadius: radius,
          currentRadius: radius,
          color: palette[Math.floor(Math.random() * palette.length)],
          alpha: Math.random() * 0.5 + 0.45,
          glowIntensity: 0,
          hoverZoom: 1.0,
        })
      }
      return newParticles
    }

    particles = createParticles(configRef.current.particleCount)

    let lastCount = configRef.current.particleCount
    let lastPreset = configRef.current.colorPreset

    const render = () => {
      const cfg = configRef.current
      const curW = window.innerWidth
      const curH = window.innerHeight

      // Fast lerp mouse position for smooth reactivity
      const mouse = mouseRef.current
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.35
        mouse.y += (mouse.targetY - mouse.y) * 0.35
      } else {
        mouse.x = -1000
        mouse.y = -1000
      }

      // Re-create particles if count or preset changed
      if (lastCount !== cfg.particleCount || lastPreset !== cfg.colorPreset) {
        particles = createParticles(cfg.particleCount)
        lastCount = cfg.particleCount
        lastPreset = cfg.colorPreset
      }

      ctx.clearRect(0, 0, curW, curH)

      // Backdrop space rendering
      if (cfg.backgroundTheme === 'dark') {
        ctx.fillStyle = '#060913'
        ctx.fillRect(0, 0, curW, curH)
      } else if (cfg.backgroundTheme === 'navy') {
        ctx.fillStyle = '#0a1024'
        ctx.fillRect(0, 0, curW, curH)
      }

      // Render Deep Space Micro-stars with Parallax Zoom
      for (let i = 0; i < depthStars.length; i++) {
        const star = depthStars[i]
        let starAlpha = star.alpha

        if (mouse.active) {
          const dx = mouse.x - star.x
          const dy = mouse.y - star.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < cfg.interactionRadius * 1.4) {
            starAlpha = Math.min(0.8, star.alpha + (1 - dist / (cfg.interactionRadius * 1.4)) * 0.5)
          }
        }

        ctx.save()
        ctx.globalAlpha = starAlpha
        ctx.fillStyle = star.color
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // Click Shockwave Pulse Rings
      for (let s = shockwavesRef.current.length - 1; s >= 0; s--) {
        const wave = shockwavesRef.current[s]
        wave.radius += 14 // Fast wave expansion
        wave.alpha -= 0.03

        if (wave.alpha <= 0 || wave.radius >= wave.maxRadius) {
          shockwavesRef.current.splice(s, 1)
          continue
        }

        ctx.save()
        ctx.strokeStyle = COLOR_PALETTES[cfg.colorPreset][0]
        ctx.globalAlpha = wave.alpha * 0.8
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
        ctx.stroke()
        ctx.restore()

        // Push particles violently during shockwave
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          const dx = p.x - wave.x
          const dy = p.y - wave.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (Math.abs(dist - wave.radius) < 50) {
            const angle = Math.atan2(dy, dx)
            const force = (1 - Math.abs(dist - wave.radius) / 50) * 8
            p.vx += Math.cos(angle) * force
            p.vy += Math.sin(angle) * force
            p.glowIntensity = 1.0
            p.hoverZoom = cfg.zoomIntensity
          }
        }
      }

      // Cursor Radial Space Field & Focal Aura
      if (mouse.active) {
        ctx.save()
        // Deep Space Focus Glow
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 10, mouse.x, mouse.y, cfg.interactionRadius)
        const primaryColor = COLOR_PALETTES[cfg.colorPreset][0]
        const secondaryColor = COLOR_PALETTES[cfg.colorPreset][1] || primaryColor

        grad.addColorStop(0, primaryColor + '35')
        grad.addColorStop(0.4, secondaryColor + '18')
        grad.addColorStop(1, 'transparent')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, cfg.interactionRadius, 0, Math.PI * 2)
        ctx.fill()

        if (cfg.showCursorRing) {
          ctx.strokeStyle = primaryColor + '50'
          ctx.lineWidth = 1.2
          ctx.setLineDash([6, 6])
          ctx.beginPath()
          ctx.arc(mouse.x, mouse.y, cfg.interactionRadius, 0, Math.PI * 2)
          ctx.stroke()
        }
        ctx.restore()
      }

      const radius = cfg.interactionRadius
      const gravity = cfg.gravityStrength
      const currentSpeed = cfg.speed
      const maxZoom = cfg.zoomIntensity

      // Update & Render Particles with Fast Zoom In / Zoom Out
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        let targetZoom = 1.0

        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < radius && dist > 1) {
            const forceRatio = 1 - dist / radius
            // Fast non-linear force
            const force = (forceRatio * forceRatio * 0.7 + forceRatio * 0.3) * gravity * 0.65
            const angle = Math.atan2(dy, dx)

            if (cfg.mode === 'attract') {
              p.vx += Math.cos(angle) * force
              p.vy += Math.sin(angle) * force
            } else if (cfg.mode === 'repel') {
              p.vx -= Math.cos(angle) * force * 2.2
              p.vy -= Math.sin(angle) * force * 2.2
            } else {
              // Fast vortex float
              p.vx += Math.cos(angle + Math.PI / 2) * force * 1.2
              p.vy += Math.sin(angle + Math.PI / 2) * force * 1.2
            }

            // FAST ZOOM IN EFFECT on hover
            targetZoom = 1.0 + forceRatio * (maxZoom - 1.0)
            p.glowIntensity = Math.min(1.0, p.glowIntensity + 0.15)

            // Fast Cursor Web lines
            if (cfg.connectCursor && dist < radius * 0.9) {
              ctx.save()
              ctx.globalAlpha = (1 - dist / (radius * 0.9)) * 0.55 * p.alpha
              ctx.strokeStyle = p.color
              ctx.lineWidth = 1.0 + forceRatio * 1.2
              ctx.beginPath()
              ctx.moveTo(mouse.x, mouse.y)
              ctx.lineTo(p.x, p.y)
              ctx.stroke()
              ctx.restore()
            }
          } else {
            p.glowIntensity = Math.max(0, p.glowIntensity - 0.05)
          }
        } else {
          p.glowIntensity = Math.max(0, p.glowIntensity - 0.05)
        }

        // Fast Zoom In / Zoom Out interpolation
        p.hoverZoom += (targetZoom - p.hoverZoom) * 0.22 // Fast zoom response
        p.currentRadius = p.baseRadius * p.hoverZoom

        // Friction & natural return speed
        p.vx *= 0.93
        p.vy *= 0.93
        p.vx += (p.baseVx * currentSpeed - p.vx) * 0.04
        p.vy += (p.baseVy * currentSpeed - p.vy) * 0.04

        p.x += p.vx
        p.y += p.vy

        // Wrap around canvas screen edges
        if (p.x < -30) p.x = curW + 30
        if (p.x > curW + 30) p.x = -30
        if (p.y < -30) p.y = curH + 30
        if (p.y > curH + 30) p.y = -30

        // FAST GLOW BLOOM (Space Warp Visual)
        if (cfg.glowingEffect) {
          const glowRadius = p.currentRadius * (3.5 + p.glowIntensity * 7.0)
          const grad = ctx.createRadialGradient(p.x, p.y, p.currentRadius * 0.3, p.x, p.y, glowRadius)
          const glowAlpha = (0.25 + p.glowIntensity * 0.65) * p.alpha

          grad.addColorStop(0, p.color)
          grad.addColorStop(0.35, p.color + '66')
          grad.addColorStop(1, 'transparent')

          ctx.save()
          ctx.globalAlpha = glowAlpha
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }

        // Core Particle with Zoomed Scale
        ctx.save()
        ctx.globalAlpha = Math.min(1, p.alpha + p.glowIntensity * 0.55)
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.currentRadius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // Constellation Connection Web
      if (cfg.connectParticles) {
        const maxConnectDist = 135
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i]
            const p2 = particles[j]
            const dx = p1.x - p2.x
            const dy = p1.y - p2.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < maxConnectDist) {
              const lineAlpha = (1 - dist / maxConnectDist) * 0.3 * ((p1.alpha + p2.alpha) / 2)
              ctx.save()
              ctx.globalAlpha = lineAlpha
              ctx.strokeStyle = p1.color
              ctx.lineWidth = 0.7 + ((p1.hoverZoom + p2.hoverZoom) / 2 - 1) * 0.6
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.stroke()
              ctx.restore()
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('mouseleave', handlePointerLeave)
      window.removeEventListener('touchmove', handlePointerMove)
      window.removeEventListener('touchend', handlePointerLeave)
      window.removeEventListener('mousedown', handlePointerDown)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 transition-all duration-700 ${className}`}
    />
  )
}
