import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShieldCheck, Menu, X, Send } from 'lucide-react'
import { useWallet } from '../hooks/useWallet'
import { shortAddress } from '../utils/helpers'

export default function Navbar() {
  const { publicKey, connected, connecting, connect, disconnect, balance } = useWallet()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/issue', label: 'Issue Certificate' },
    { to: '/verify', label: 'Verify' },
    { to: '/my-certificates', label: 'My Certificates' },
    { to: '/send', label: 'Send XLM' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-brand-700">
            <ShieldCheck className="w-7 h-7 text-brand-600" />
            CertChain
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-700'
                      : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                  }`
                }
              >
                {link.to === '/send' ? (
                  <span className="flex items-center gap-1">
                    <Send className="w-3.5 h-3.5" /> {link.label}
                  </span>
                ) : link.label}
              </NavLink>
            ))}
          </div>

          {/* Wallet button */}
          <div className="hidden md:flex items-center gap-3">
            {connected ? (
              <div className="flex items-center gap-2">
                {balance !== null && (
                  <span className="text-sm font-semibold text-brand-700 bg-brand-50 px-3 py-1.5 rounded-lg">
                    {parseFloat(balance).toFixed(2)} XLM
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                  {shortAddress(publicKey!)}
                </span>
                <button
                  onClick={disconnect}
                  className="text-sm text-slate-500 hover:text-red-500 transition-colors px-2 py-1"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button onClick={connect} disabled={connecting} className="btn-primary text-sm">
                {connecting ? 'Connecting…' : 'Connect Wallet'}
              </button>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:text-brand-600 hover:bg-slate-50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-2">
            {connected ? (
              <div className="space-y-2">
                {balance !== null && (
                  <div className="px-4 py-2 bg-brand-50 rounded-lg text-sm font-semibold text-brand-700">
                    Balance: {parseFloat(balance).toFixed(2)} XLM
                  </div>
                )}
                <div className="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-lg">
                  <span className="flex items-center gap-1.5 text-sm text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    {shortAddress(publicKey!)}
                  </span>
                  <button
                    onClick={() => { disconnect(); setMenuOpen(false) }}
                    className="text-sm text-red-500"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => { connect(); setMenuOpen(false) }}
                disabled={connecting}
                className="btn-primary w-full justify-center text-sm"
              >
                {connecting ? 'Connecting…' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
