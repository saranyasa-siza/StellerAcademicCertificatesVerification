import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import IssueCertificate from './pages/IssueCertificate'
import VerifyCertificate from './pages/VerifyCertificate'
import MyCertificates from './pages/MyCertificates'
import SendXLM from './pages/SendXLM'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
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
      <footer className="py-6 text-center text-sm text-slate-400 border-t border-slate-100">
        CertChain — Powered by Stellar Soroban · Testnet
      </footer>
    </div>
  )
}
