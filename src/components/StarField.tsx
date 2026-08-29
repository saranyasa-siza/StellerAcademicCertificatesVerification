import { useMemo } from 'react'

interface Star {
  id: number
  top: string
  left: string
  size: string
  dur: string
  delay: string
  opacity: string
}

export default function StarField({ count = 80 }: { count?: number }) {
  const stars = useMemo<Star[]>(() => {
    // Deterministic pseudo-random using index so SSR/hydration is stable
    return Array.from({ length: count }, (_, i) => {
      const seed = (i * 9301 + 49297) % 233280
      const r = () => { const s2 = (seed * (i + 1) * 1664525 + 1013904223) % 4294967296; return s2 / 4294967296 }
      const rand = (min: number, max: number) => min + (((i * 1664525 + 1013904223 + i * 9301) % 1000) / 1000) * (max - min)
      const rand2 = (min: number, max: number, offset: number) => min + (((i * 22695477 + 1 + offset) % 1000) / 1000) * (max - min)

      return {
        id: i,
        top:     `${rand(0, 100)}%`,
        left:    `${rand2(0, 100, i * 3)}%`,
        size:    i % 15 === 0 ? '2px' : i % 5 === 0 ? '1.5px' : '1px',
        dur:     `${rand2(2.5, 6, i * 7)}s`,
        delay:   `${rand2(0, 4, i * 11)}s`,
        opacity: i % 8 === 0 ? '0.6' : i % 3 === 0 ? '0.4' : '0.25',
      }
    })
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: 0,
            animation: `twinkle ${s.dur} ${s.delay} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}
