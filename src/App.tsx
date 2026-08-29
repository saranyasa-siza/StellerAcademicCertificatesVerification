import { useRef, useCallback } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import IssueCertificate from './pages/IssueCertificate'
import VerifyCertificate from './pages/VerifyCertificate'
import MyCertificates from './pages/MyCertificates'
import SendXLM from './pages/SendXLM'

/* ── Tiny deterministic star list (no runtime random, stable across renders) ── */
const STARS = Array.from({ length: 140 }, (_, i) => ({
  id: i,
  top:  `${((i * 7919 + 1301) % 10000) / 100}%`,
  left: `${((i * 6271 + 4999) % 10000) / 100}%`,
  size: i % 18 === 0 ? 2 : i % 6 === 0 ? 1.5 : 1,
  dur:  2.5 + ((i * 3491) % 1000) / 280,
  del:  ((i * 2311) % 1000) / 250,
  op:   i % 9 === 0 ? 0.65 : i % 3 === 0 ? 0.40 : 0.22,
}))

export default function App() {
  const shimmerRef = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = shimmerRef.current
    if (!el) return
    const { left, top } = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - left}px`)
    el.style.setProperty('--my', `${e.clientY - top}px`)
    el.style.setProperty('--mo', '1')
  }, [])

  const onMouseLeave = useCallback(() => {
    shimmerRef.current?.style.setProperty('--mo', '0')
  }, [])

  return (
    <div
      className="min-h-screen flex flex-col bg-[#020818]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* ── SHIMMER GRID — follows cursor, sits above bg, below content ── */}
      <div
        ref={shimmerRef}
        aria-hidden="true"
        className="shimmer-grid fixed inset-0 z-[1] pointer-events-none select-none"
        style={{ '--mx': '-9999px', '--my': '-9999px', '--mo': '0' } as React.CSSProperties}
      />

      {/* ── COSMIC BACKGROUND — fixed, behind everything, never affects layout ── */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
      >
        {/* Breathing zoom layer — only this div scales, nothing else */}
        <div className="absolute inset-0 animate-zoom-breathe origin-center">
          {/* Base deep-space gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,#0a1a3a_0%,#020818_65%)]" />

          {/* Nebula blob 1 — blue, top-left */}
          <div className="absolute animate-drift animate-nebula-pulse" style={{ top: '-8%', left: '-6%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(37,99,235,0.11) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(48px)' }} />

          {/* Nebula blob 2 — indigo, top-right */}
          <div className="absolute animate-drift-slow" style={{ top: '5%', right: '-10%', width: 520, height: 520, background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(56px)' }} />

          {/* Nebula blob 3 — violet, bottom-center */}
          <div className="absolute animate-drift" style={{ bottom: '0%', left: '30%', width: 460, height: 460, background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(64px)' }} />

          {/* Nebula blob 4 — cyan, mid-left */}
          <div className="absolute animate-drift-slow" style={{ top: '45%', left: '-5%', width: 380, height: 380, background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(52px)' }} />

          {/* Stars */}
          {STARS.map((s) => (
            <span
              key={s.id}
              style={{
                position: 'absolute',
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                borderRadius: '50%',
                background: '#fff',
                opacity: 0,
                animation: `twinkle ${s.dur.toFixed(2)}s ${s.del.toFixed(2)}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── All real content sits above the background ── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/issue" element={<IssueCertificate />} />
            <Route path="/verify" element={<VerifyCertificate />} />
            <Route path="/my-certificates" element={<MyCertificates />} />
            <Route path="/send" element={<SendXLM />} />
          </Routes>
        </main>
        <footer className="border-t border-white/[0.06] bg-[#020818]/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="font-bold text-slate-400">CertChain</span>
              <span className="text-slate-700">·</span>
              <span>Powered by Stellar Soroban</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Stellar</a>
              <a href="https://soroban.stellar.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Soroban</a>
              <a href={`https://stellar.expert/explorer/testnet/contract/${import.meta.env.VITE_CONTRACT_ID}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Contract ↗</a>
              <span className="text-slate-700">Testnet</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
