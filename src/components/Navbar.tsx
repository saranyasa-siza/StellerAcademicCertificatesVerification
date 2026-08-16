import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Send, Award, ShieldCheck, LayoutDashboard, Home } from 'lucide-react'
import { useWallet } from '../hooks/useWallet'
import { shortAddress } from '../utils/helpers'
import Logo from './Logo'
import Spinner from './Spinner'

const navLinks = [
  { to: '/',                label: 'Home',            icon: <Home className="w-3.5 h-3.5" /> },
  { to: '/issue',           label: 'Issue',           icon: <Award className="w-3.5 h-3.5" /> },
  { to: '/verify',          label: 'Verify',          icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  { to: '/my-certificates', label: 'My Certs',        icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
  { to: '/send',            label: 'Send XLM',        icon: <Send className="w-3.5 h-3.5" /> },
]

export default function Navbar() {
  const { publicKey, connected, connecting, connect, disconnect, balance } = useWallet()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
      {/* Top accent line */}
      <div className="h-0.5 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15 py-2.5">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <Logo size={34} />
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-lg text-slate-800 tracking-tight group-hover:text-blue-600 transition-colors">
                CertChain
              </span>
              <span className="text-[10px] font-medium text-slate-400 tracking-widest uppercase">
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
                  `flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
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
                  <span className="text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
                    {parseFloat(balance).toFixed(2)} XLM
                  </span>
                )}
                <div className="flex items-center gap-1.5 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-300" />
                  <span className="font-mono">{shortAddress(publicKey!)}</span>
                </div>
                <button
                  onClick={disconnect}
                  className="text-xs text-slate-400 hover:text-red-500 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connect}
                disabled={connecting}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm shadow-blue-200 disabled:opacity-50"
              >
                {connecting ? <><Spinner size="sm" /> Connecting…</> : 'Connect Wallet'}
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-slate-100">
            {connected ? (
              <div className="space-y-2">
                {balance !== null && (
                  <div className="px-4 py-2 bg-blue-50 rounded-xl text-sm font-bold text-blue-700 border border-blue-100">
                    Balance: {parseFloat(balance).toFixed(2)} XLM
                  </div>
                )}
                <div className="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="flex items-center gap-1.5 text-sm text-slate-600 font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {shortAddress(publicKey!)}
                  </span>
                  <button
                    onClick={() => { disconnect(); setMenuOpen(false) }}
                    className="text-xs text-red-500 font-medium"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { connect(); setMenuOpen(false) }}
                disabled={connecting}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
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
