import { Link } from 'react-router-dom'
import { Award, ShieldCheck, Search, Users, Zap, Lock, Globe, ArrowRight } from 'lucide-react'
import Logo from '../components/Logo'

const features = [
  {
    icon: <Award className="w-5 h-5 text-blue-600" />,
    title: 'Issue Certificates',
    description: 'Any wallet can issue tamper-proof academic or professional certificates directly on-chain. No approval needed.',
    bg: 'bg-blue-50',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
    title: 'Verify Instantly',
    description: 'Anyone can verify the authenticity of a certificate in seconds using just the Certificate ID.',
    bg: 'bg-emerald-50',
  },
  {
    icon: <Search className="w-5 h-5 text-violet-600" />,
    title: 'Search & Explore',
    description: 'Look up any certificate by ID. All data is permanently stored on the Stellar blockchain.',
    bg: 'bg-violet-50',
  },
  {
    icon: <Users className="w-5 h-5 text-orange-500" />,
    title: 'No Central Authority',
    description: 'No admin. No owner. Your wallet is your identity. The protocol is open to everyone.',
    bg: 'bg-orange-50',
  },
]

const stats = [
  { label: 'Permissionless', icon: <Globe className="w-4 h-4" /> },
  { label: 'On-chain Storage', icon: <Lock className="w-4 h-4" /> },
  { label: 'Instant Verification', icon: <Zap className="w-4 h-4" /> },
  { label: 'Multi-wallet Support', icon: <ShieldCheck className="w-4 h-4" /> },
]

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white">
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-10 translate-y-1/2" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          {/* Logo mark */}
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-white/10 backdrop-blur rounded-2xl border border-white/20 shadow-xl">
              <Logo size={48} />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border border-white/20 text-blue-200 tracking-wide uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live on Stellar Testnet
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Academic Certificates
            <br />
            <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
              On the Blockchain
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Issue tamper-proof academic and professional certificates on Stellar Soroban.
            Anyone can issue. Anyone can verify. No centralized authority — ever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/issue"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/40 hover:shadow-blue-500/30 hover:-translate-y-0.5"
            >
              <Award className="w-5 h-5" />
              Issue Certificate
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/verify"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur text-white font-bold rounded-xl border border-white/25 hover:bg-white/20 transition-all hover:-translate-y-0.5"
            >
              <ShieldCheck className="w-5 h-5" />
              Verify Certificate
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center justify-center gap-2 text-sm text-slate-300 font-medium">
                  <span className="text-blue-400">{s.icon}</span>
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Why CertChain</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mt-2">
            A permissionless certificate protocol
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm">
            Built on Stellar Soroban smart contracts — open, transparent, and unstoppable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex gap-4"
            >
              <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Simple Flow</span>
            <h2 className="text-2xl font-bold text-slate-800 mt-2">How it works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Connect Wallet', desc: 'Connect any Stellar wallet — Freighter, xBull, Albedo, or LOBSTR.' },
              { step: '02', title: 'Issue or Verify', desc: 'Fill the form to issue a certificate, or enter an ID to verify one instantly.' },
              { step: '03', title: 'On-chain Forever', desc: 'The certificate is stored permanently on Stellar Testnet, verifiable by anyone.' },
            ].map((item) => (
              <div key={item.step} className="relative bg-white rounded-2xl border border-slate-100 p-6 shadow-sm text-center">
                <div className="text-4xl font-black text-blue-100 mb-3">{item.step}</div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-center text-white shadow-xl shadow-blue-200">
          <Logo size={40} className="mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Ready to get started?</h2>
          <p className="text-blue-200 text-sm mb-7 max-w-md mx-auto">
            Issue your first certificate in under a minute. No sign-up. No approval. Just your wallet.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/issue"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-md"
            >
              <Award className="w-4 h-4" /> Issue Certificate
            </Link>
            <Link
              to="/verify"
              className="inline-flex items-center gap-2 px-7 py-3 bg-white/15 text-white font-bold rounded-xl border border-white/30 hover:bg-white/25 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" /> Verify Certificate
            </Link>
          </div>
        </div>
      </section>

      {/* Contract info */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
            Deployed Smart Contract
          </p>
          <p className="font-mono text-sm text-slate-700 break-all">
            {import.meta.env.VITE_CONTRACT_ID}
          </p>
          <a
            href={`https://stellar.expert/explorer/testnet/contract/${import.meta.env.VITE_CONTRACT_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-2 font-medium"
          >
            View on Stellar Expert ↗
          </a>
        </div>
      </section>
    </div>
  )
}
