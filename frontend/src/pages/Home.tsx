import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  Award,
  Search,
  LayoutDashboard,
  Send,
  ArrowRight,
  Hash,
  ExternalLink,
  CheckCircle2,
  Lock,
} from 'lucide-react'

export default function Home() {
  const quickActions = [
    {
      to: '/verify',
      icon: <Search className="w-5 h-5 text-emerald-400" />,
      title: 'Verify Certificate',
      desc: 'Verify authenticity and cryptographic proof of any certificate on-chain.',
      badge: 'Public lookup',
      badgeClass: 'badge-success',
      btnText: 'Verify Now',
      btnClass: 'btn-primary',
    },
    {
      to: '/issue',
      icon: <Award className="w-5 h-5 text-blue-400" />,
      title: 'Issue Certificate',
      desc: 'Issue tamper-proof academic and professional certificates directly on-chain.',
      badge: 'Permissionless',
      badgeClass: 'badge-info',
      btnText: 'Issue Certificate',
      btnClass: 'btn-secondary',
    },
    {
      to: '/my-certificates',
      icon: <LayoutDashboard className="w-5 h-5 text-violet-400" />,
      title: 'My Certificates',
      desc: 'View, filter, manage, and inspect all certificates issued by your wallet.',
      badge: 'Wallet view',
      badgeClass: 'badge-warning',
      btnText: 'View Dashboard',
      btnClass: 'btn-secondary',
    },
    {
      to: '/send',
      icon: <Send className="w-5 h-5 text-cyan-400" />,
      title: 'Send XLM',
      desc: 'Send native Stellar Lumens (XLM) to any testnet account with optional memo.',
      badge: 'Payments',
      badgeClass: 'badge-info',
      btnText: 'Send XLM',
      btnClass: 'btn-secondary',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* ── Page Header matching other pages ── */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-900/20">
            <ShieldCheck className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-extrabold text-white">CertChain</h1>
              <span className="badge badge-info">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Soroban Testnet
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Academic Certificate Verification Protocol on Stellar
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="badge badge-info flex items-center gap-1">
            <Lock className="w-3 h-3" /> Tamper-proof
          </span>
          <span className="badge badge-success flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Instant Verification
          </span>
          <span className="badge bg-white/[0.06] text-slate-300 border border-white/[0.10]">
            SHA-256 On-Chain
          </span>
        </div>
      </div>

      {/* ── Main Hero Card ── */}
      <div className="card border border-white/[0.07] space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-white/[0.07]">
          <span className="text-blue-400">
            <ShieldCheck className="w-4 h-4" />
          </span>
          <span className="text-sm font-bold text-slate-200">Protocol Overview</span>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">
          CertChain is a permissionless decentralized protocol for issuing, managing, and verifying
          academic credentials on the Stellar network using Soroban smart contracts. No central authority,
          no private servers — all cryptographic hashes are stored permanently on-chain.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link to="/verify" className="btn-primary">
            <Search className="w-4 h-4" />
            Verify a Certificate
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/issue" className="btn-secondary">
            <Award className="w-4 h-4" />
            Issue a Certificate
          </Link>
        </div>
      </div>

      {/* ── Quick Action Cards (2-column Grid) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((item) => (
          <div
            key={item.to}
            className="card border border-white/[0.07] hover:border-blue-500/30 transition-all duration-200 flex flex-col justify-between p-5 space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <span className={`badge ${item.badgeClass}`}>{item.badge}</span>
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-base mb-1">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.05]">
              <Link to={item.to} className={`${item.btnClass} w-full justify-center text-xs py-2`}>
                {item.btnText}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* ── Deployed Contract Section Card ── */}
      <div className="card border border-white/[0.07] space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.07]">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold text-slate-200">Deployed Soroban Contract</span>
          </div>
          <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            Stellar Testnet
          </span>
        </div>

        <p className="text-xs text-slate-400">
          All smart contract methods and state verifications execute directly on Stellar Soroban.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-black/25 p-3.5 rounded-xl border border-white/[0.06]">
          <span className="font-mono text-xs text-slate-300 break-all select-all">
            {import.meta.env.VITE_CONTRACT_ID}
          </span>
          <a
            href={`https://stellar.expert/explorer/testnet/contract/${import.meta.env.VITE_CONTRACT_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs px-3 py-1.5 shrink-0 inline-flex items-center gap-1.5"
          >
            Explorer
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
