import { Link } from 'react-router-dom'
import { ShieldCheck, Search, Award, Users } from 'lucide-react'

const features = [
  {
    icon: <Award className="w-6 h-6 text-brand-600" />,
    title: 'Issue Certificates',
    description:
      'Any wallet can issue tamper-proof academic or professional certificates directly on-chain. No approval needed.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-brand-600" />,
    title: 'Verify Instantly',
    description:
      'Anyone can verify the authenticity of a certificate in seconds using just the Certificate ID.',
  },
  {
    icon: <Search className="w-6 h-6 text-brand-600" />,
    title: 'Search & Explore',
    description:
      'Look up any certificate by ID. All data is permanently stored on the Stellar blockchain.',
  },
  {
    icon: <Users className="w-6 h-6 text-brand-600" />,
    title: 'No Central Authority',
    description:
      'No admin. No owner. Your wallet is your identity. The protocol is open to everyone.',
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <ShieldCheck className="w-4 h-4" />
            Powered by Stellar Soroban · Testnet
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Academic Certificate
            <br />
            Verification on Stellar
          </h1>
          <p className="text-lg sm:text-xl text-brand-100 max-w-2xl mx-auto mb-10">
            Issue tamper-proof academic and professional certificates on the Stellar blockchain.
            Anyone can issue. Anyone can verify. No centralized authority.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/issue"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-brand-700 font-bold rounded-xl hover:bg-brand-50 transition-colors shadow-lg"
            >
              <Award className="w-5 h-5" />
              Issue Certificate
            </Link>
            <Link
              to="/verify"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/10 backdrop-blur text-white font-bold rounded-xl border border-white/30 hover:bg-white/20 transition-colors"
            >
              <ShieldCheck className="w-5 h-5" />
              Verify Certificate
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-2xl font-bold text-center text-slate-800 mb-12">
          A permissionless certificate protocol
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
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

      {/* Contract info */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="card bg-slate-50 border-slate-200 text-center">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
            Deployed Contract
          </p>
          <p className="font-mono text-sm text-slate-700 break-all">
            {import.meta.env.VITE_CONTRACT_ID}
          </p>
          <a
            href={`https://stellar.expert/explorer/testnet/contract/${import.meta.env.VITE_CONTRACT_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 mt-2"
          >
            View on Stellar Expert ↗
          </a>
        </div>
      </section>
    </div>
  )
}
