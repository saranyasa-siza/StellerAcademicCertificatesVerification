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
      <footer className="border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="font-bold text-slate-700">CertChain</span>
            <span>·</span>
            <span>Powered by Stellar Soroban</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Stellar</a>
            <a href="https://soroban.stellar.org" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">Soroban</a>
            <a
              href={`https://stellar.expert/explorer/testnet/contract/${import.meta.env.VITE_CONTRACT_ID}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
            >
              Contract ↗
            </a>
            <span className="text-slate-300">Testnet</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
