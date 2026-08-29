import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import IssueCertificate from './pages/IssueCertificate'
import VerifyCertificate from './pages/VerifyCertificate'
import MyCertificates from './pages/MyCertificates'
import SendXLM from './pages/SendXLM'
import GravityParticles, {
  GravityParticlesConfig,
  DEFAULT_PARTICLE_CONFIG,
} from './components/GravityParticles'
import ParticleControls from './components/ParticleControls'

export default function App() {
  const [particleConfig, setParticleConfig] =
    useState<GravityParticlesConfig>(DEFAULT_PARTICLE_CONFIG)

  return (
    <div className="min-h-screen flex flex-col relative bg-slate-900/5 selection:bg-brand-500 selection:text-white">
      {/* Interactive Gravity Particle Canvas Background */}
      <GravityParticles config={particleConfig} />

      {/* Floating Control Toolbar */}
      <ParticleControls config={particleConfig} onChange={setParticleConfig} />

      {/* Main Content UI */}
      <div className="relative z-10 flex flex-col flex-1">
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
        <footer className="py-6 text-center text-sm text-slate-500/80 border-t border-slate-200/50 backdrop-blur-sm bg-white/40">
          CertChain — Powered by Stellar Soroban · Testnet
        </footer>
      </div>
    </div>
  )
}
