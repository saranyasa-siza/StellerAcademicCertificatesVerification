import { Link } from 'react-router-dom'
import {
  Award, ShieldCheck, Search, Users, Zap, Lock, Globe,
  ArrowRight, FileText, Hash, Network, CheckCircle2, ChevronDown,
} from 'lucide-react'
import Logo from '../components/Logo'
import StarField from '../components/StarField'
import { useScrollReveal } from '../hooks/useScrollReveal'

/* ── Scroll-reveal wrapper ── */
function Reveal({ children, delay = '', className = '', dir = '' }: {
  children: React.ReactNode; delay?: string; className?: string; dir?: string
}) {
  const ref = useScrollReveal()
  return (
    <div ref={ref} className={`reveal ${dir} ${delay} ${className}`}>
      {children}
    </div>
  )
}

/* ── Data ── */
const features = [
  {
    icon: <Award className="w-5 h-5 text-blue-400" />,
    title: 'Issue Certificates',
    desc: 'Any wallet can issue tamper-proof academic or professional certificates directly on-chain. No approval needed.',
    border: 'hover:border-blue-500/30',
    glow: 'group-hover:shadow-blue-500/10',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
    title: 'Verify Instantly',
    desc: 'Anyone can verify the authenticity of a certificate in seconds using just the Certificate ID.',
    border: 'hover:border-emerald-500/30',
    glow: 'group-hover:shadow-emerald-500/10',
  },
  {
    icon: <Search className="w-5 h-5 text-violet-400" />,
    title: 'Search & Explore',
    desc: 'Look up any certificate by ID. All data is permanently stored on the Stellar blockchain.',
    border: 'hover:border-violet-500/30',
    glow: 'group-hover:shadow-violet-500/10',
  },
  {
    icon: <Users className="w-5 h-5 text-cyan-400" />,
    title: 'No Central Authority',
    desc: 'No admin. No owner. Your wallet is your identity. The protocol is open to everyone.',
    border: 'hover:border-cyan-500/30',
    glow: 'group-hover:shadow-cyan-500/10',
  },
]

const flowSteps = [
  { icon: <FileText className="w-5 h-5" />,    label: 'Certificate',      sub: 'Issued on-chain' },
  { icon: <Hash className="w-5 h-5" />,         label: 'SHA-256 Hash',     sub: 'Tamper detection' },
  { icon: <Network className="w-5 h-5" />,      label: 'Stellar Network',  sub: 'Soroban contract' },
  { icon: <CheckCircle2 className="w-5 h-5" />, label: '✓ Verified',       sub: 'Immutable record', highlight: true },
]

const stats = [
  { label: 'Permissionless',      icon: <Globe className="w-4 h-4" /> },
  { label: 'On-chain Storage',    icon: <Lock className="w-4 h-4" /> },
  { label: 'Instant Verification',icon: <Zap className="w-4 h-4" /> },
  { label: 'Multi-wallet',        icon: <ShieldCheck className="w-4 h-4" /> },
]

export default function Home() {
  return (
    <div className="min-h-screen">

      {/* ══════════════════════════════════════════
          HERO — Space / Stellar atmosphere
      ══════════════════════════════════════════ */}
      <section className="relative overflow-hidden min-h-[92vh] flex flex-col">
        {/* Deep space background */}
        <div className="absolute inset-0 bg-[#020818]" />

        {/* Nebula gradients */}
        <div className="nebula w-[600px] h-[600px] bg-blue-600/8 top-[-10%] left-[-5%]" />
        <div className="nebula w-[500px] h-[500px] bg-indigo-700/6 top-[20%] right-[-10%]" />
        <div className="nebula w-[400px] h-[400px] bg-violet-800/5 bottom-[10%] left-[30%]" />

        {/* Stars */}
        <StarField count={90} />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(148,163,184,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Hero content */}
        <div className="relative flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">

          {/* Logo mark — floats */}
          <div className="animate-float mb-8 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
            <div className="inline-flex p-4 rounded-3xl bg-white/[0.05] border border-white/[0.10] shadow-2xl shadow-blue-900/30">
              <Logo size={52} />
            </div>
          </div>

          {/* Eyebrow */}
          <div className="opacity-0 animate-fade-up" style={{ animationFillMode: 'forwards' }}>
            <span className="badge badge-info mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              STELLAR ACADEMIC CREDENTIALS
            </span>
          </div>

          {/* Heading */}
          <h1 className="opacity-0 animate-fade-up-d1 text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.1] tracking-tight mb-6"
              style={{ animationFillMode: 'forwards' }}>
            <span className="text-white">Academic Certificate</span>
            <br />
            <span className="text-gradient">Verification</span>
          </h1>

          {/* Sub */}
          <p className="opacity-0 animate-fade-up-d2 text-base sm:text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
             style={{ animationFillMode: 'forwards' }}>
            Verify academic credentials securely and transparently on the Stellar network.
            Tamper-proof. Permissionless. Permanent.
          </p>

          {/* CTAs */}
          <div className="opacity-0 animate-fade-up-d3 flex flex-col sm:flex-row items-center justify-center gap-4"
               style={{ animationFillMode: 'forwards' }}>
            <Link
              to="/verify"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-blue-900/50 hover:shadow-blue-500/30 hover:-translate-y-0.5 text-base"
            >
              <ShieldCheck className="w-5 h-5" />
              Verify Certificate
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/issue"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white/[0.07] hover:bg-white/[0.12] text-slate-200 font-bold rounded-xl border border-white/[0.12] hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 text-base"
            >
              <Award className="w-5 h-5" />
              Issue Certificate
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="opacity-0 animate-fade-up-d4 absolute bottom-8 left-1/2 -translate-x-1/2"
               style={{ animationFillMode: 'forwards' }}>
            <ChevronDown className="w-5 h-5 text-slate-600 animate-bounce" />
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center justify-center gap-2 text-sm text-slate-500 font-medium">
                  <span className="text-blue-500">{s.icon}</span>
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Reveal className="text-center mb-14">
          <span className="text-xs font-bold text-blue-500 uppercase tracking-[0.2em]">Why CertChain</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
            A permissionless certificate protocol
          </h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            Built on Stellar Soroban smart contracts — open, transparent, and unstoppable.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={`reveal-d${(i % 4) + 1}`} dir={i % 2 === 0 ? 'reveal-left' : 'reveal-right'}>
              <div className={`group card border border-white/[0.07] ${f.border} hover:shadow-xl ${f.glow} transition-all duration-300 hover:-translate-y-1 flex gap-4`}>
                <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-200">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 mb-1.5">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VERIFICATION FLOW
      ══════════════════════════════════════════ */}
      <section className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Reveal className="text-center mb-14">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-[0.2em]">How It Works</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3">
              The verification flow
            </h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto text-sm">
              Every certificate is cryptographically hashed and stored on Stellar — verifiable by anyone, forever.
            </p>
          </Reveal>

          {/* Flow diagram */}
          <Reveal>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-0">
              {flowSteps.map((step, i) => (
                <div key={step.label} className="flex flex-col sm:flex-row items-center">
                  <div className={`flow-step px-4 py-2 ${step.highlight ? 'scale-105' : ''}`}>
                    <div className={`flow-icon ${step.highlight ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-emerald-500/10' : ''}`}>
                      {step.icon}
                    </div>
                    <p className={`text-sm font-bold mt-2 ${step.highlight ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-slate-600 mt-0.5">{step.sub}</p>
                  </div>
                  {i < flowSteps.length - 1 && (
                    <div className="flex sm:flex-row flex-col items-center">
                      <div className="w-px h-6 sm:w-8 sm:h-px bg-gradient-to-b sm:bg-gradient-to-r from-blue-500/40 to-blue-500/10 my-1 sm:my-0 sm:mx-1" />
                      <ArrowRight className="w-3.5 h-3.5 text-blue-600/50 rotate-90 sm:rotate-0" />
                      <div className="w-px h-6 sm:w-8 sm:h-px bg-gradient-to-b sm:bg-gradient-to-r from-blue-500/10 to-blue-500/40 my-1 sm:my-0 sm:mx-1" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Reveal>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14">
            {[
              { n: '01', title: 'Connect Wallet',   desc: 'Connect any Stellar wallet — Freighter, xBull, Albedo, or LOBSTR.' },
              { n: '02', title: 'Issue or Verify',  desc: 'Fill the form to issue a certificate, or enter an ID to verify one instantly.' },
              { n: '03', title: 'On-chain Forever', desc: 'The certificate is stored permanently on Stellar Testnet, verifiable by anyone.' },
            ].map((item, i) => (
              <Reveal key={item.n} delay={`reveal-d${i + 1}`}>
                <div className="card border border-white/[0.07] hover:border-blue-500/20 transition-all duration-300 text-center hover:-translate-y-1">
                  <div className="text-5xl font-black text-blue-500/10 mb-3 leading-none">{item.n}</div>
                  <h3 className="font-bold text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-[#020818] p-10 sm:p-14 text-center shadow-2xl shadow-blue-900/20">
            {/* Subtle nebula inside CTA */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <Logo size={44} className="mx-auto mb-5" />
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Ready to get started?
              </h2>
              <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto leading-relaxed">
                Issue your first certificate in under a minute. No sign-up. No approval. Just your wallet.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/issue" className="btn-primary px-7 py-3 text-base">
                  <Award className="w-5 h-5" /> Issue Certificate
                </Link>
                <Link to="/verify" className="btn-secondary px-7 py-3 text-base">
                  <ShieldCheck className="w-5 h-5" /> Verify Certificate
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══════════════════════════════════════════
          CONTRACT INFO
      ══════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Reveal>
          <div className="card border border-white/[0.07] text-center">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-[0.2em] mb-3">
              Deployed Smart Contract
            </p>
            <p className="mono-chip inline-block text-slate-400 text-xs sm:text-sm">
              {import.meta.env.VITE_CONTRACT_ID}
            </p>
            <div className="mt-3">
              <a
                href={`https://stellar.expert/explorer/testnet/contract/${import.meta.env.VITE_CONTRACT_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-500 hover:text-blue-400 transition-colors font-medium"
              >
                View on Stellar Expert ↗
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
