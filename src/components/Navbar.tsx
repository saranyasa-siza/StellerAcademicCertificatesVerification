import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Send, Award, ShieldCheck, LayoutDashboard, Home } from 'lucide-react'
import { useWallet } from '../hooks/useWallet'
import { shortAddress } from '../utils/helpers'
import Logo from './Logo'
import Spinner from './Spinner'

const navLinks = [
  { to: '/',                label: 'Home',      icon: <Home className="w-3.5 h-3.5" /> },
  { to: '/issue',           label: 'Issue',     icon: <Award className="w-3.5 h-3.5" /> },
  { to: '/verify',          label: 'Verify',    icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  { to: '/my-certificates', label: 'My Certs',  icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
  { to: '/send',            label: 'Send XLM',  icon: <Send className="w-3.5 h-3.5" /> },
]

export default function Navbar() {
  const { publicKey, connected, connecting, connect, disconnect, balance } = useWallet()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#020818]/80 backdrop-blur-xl border-b border-white/[0.07]">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <Logo size={32} />
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-base text-white tracking-tight group-hover:text-blue-300 transition-colors duration-200">
                CertChain
              </span>
              <span className="text-[9px] font-semibold text-slate-500 tracking-[0.2em] uppercase">
                Stellar · Testnet
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-500/15 text-blue-300 border border-blue-500/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Wallet */}
          <div className="hidden md:flex items-center gap-2">
            {connected ? (
              <div className="flex items-center gap-2">
                {balance !== null && (
                  <span className="text-sm font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg">
                    {parseFloat(balance).toFixed(2)} XLM
                  </span>
                )}
                <div className="flex items-center gap-1.5 text-sm text-slate-300 bg-white/[0.06] border border-white/[0.10] px-3 py-1.5 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                  <span className="font-mono text-xs">{shortAddress(publicKey!)}</span>
                </div>
                <button
                  onClick={disconnect}
                  className="text-xs text-slate-500 hover:text-red-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-500/10"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                disabled={connecting}
                className="btn-primary text-sm py-2 px-4"
              >
                {connecting ? <><Spinner size="sm" /> Connecting…</> : 'Connect Wallet'}
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-white/[0.06] transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.07] bg-[#020818]/95 backdrop-blur-xl px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-500/15 text-blue-300 border border-blue-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.06]'
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-white/[0.07]">
            {connected ? (
              <div className="space-y-2">
                {balance !== null && (
                  <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm font-bold text-blue-300">
                    Balance: {parseFloat(balance).toFixed(2)} XLM
                  </div>
                )}
                <div className="flex items-center justify-between px-4 py-2 bg-white/[0.05] border border-white/[0.08] rounded-xl">
                  <span className="flex items-center gap-1.5 text-sm text-slate-300 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {shortAddress(publicKey!)}
                  </span>
                  <button
                    onClick={() => { disconnect(); setMenuOpen(false) }}
                    className="text-xs text-red-400 font-medium"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { connect(); setMenuOpen(false) }}
                disabled={connecting}
                className="btn-primary w-full justify-center"
              >
                {connecting ? <><Spinner size="sm" /> Connecting…</> : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
