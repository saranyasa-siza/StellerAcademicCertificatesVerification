import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import IssueCertificate from './pages/IssueCertificate'
import VerifyCertificate from './pages/VerifyCertificate'
import MyCertificates from './pages/MyCertificates'
import SendXLM from './pages/SendXLM'
import StarfieldOverlay from './components/StarfieldOverlay'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative bg-[#020818] selection:bg-blue-600 selection:text-white">
      {/* ── COSMIC BACKGROUND — preserves exact theme ── */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none max-w-full"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,#0a1a3a_0%,#020818_65%)]" />
        <div className="absolute top-[-8%] left-[-6%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[48px]" />
        <div className="absolute top-[5%] right-[-10%] w-[520px] h-[520px] bg-indigo-600/10 rounded-full blur-[56px]" />
        <div className="absolute bottom-[0%] left-[30%] w-[460px] h-[460px] bg-violet-600/10 rounded-full blur-[64px]" />
      </div>

      {/* ── FULL-PAGE INTERACTIVE PARTICLE STARFIELD OVERLAY (SCROLLS WITH PAGE + DEPTH ZOOM) ── */}
      <StarfieldOverlay particleCount={420} interactionRadius={150} />

      {/* ── All real content sits above the background & particle overlay ── */}
      <div className="relative z-10 flex flex-col flex-1 min-h-screen">
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
        <footer className="py-6 text-center text-sm text-slate-400 border-t border-white/[0.06] bg-[#020818]/80 backdrop-blur-sm">
          CertChain — Powered by Stellar Soroban · Testnet
        </footer>
      </div>
    </div>
  )
}
