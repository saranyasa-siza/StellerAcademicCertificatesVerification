import { useState } from 'react'
import { Send, AlertCircle, RefreshCw, Wallet, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'
import { useWallet } from '../hooks/useWallet'
import { sendXLM } from '../lib/stellar'
import TxStatus, { type TxState } from '../components/TxStatus'
import Spinner from '../components/Spinner'
import { shortAddress } from '../utils/helpers'

export default function SendXLM() {
  const { publicKey, connected, connecting, connect, balance, refreshBalance } = useWallet()
  const [destination, setDestination] = useState('')
  const [amount, setAmount] = useState('')
  const [memo, setMemo] = useState('')
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [txStatus, setTxStatus] = useState<TxState | null>(null)
  const [txError, setTxError] = useState<string | null>(null)

  const handleRefresh = async () => {
    setRefreshing(true)
    await refreshBalance()
    setRefreshing(false)
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey) return

    const amt = parseFloat(amount)
    if (!destination.trim() || isNaN(amt) || amt <= 0) {
      toast.error('Please enter a valid destination and amount')
      return
    }
    if (destination.trim() === publicKey) {
      toast.error('Cannot send XLM to yourself')
      return
    }

    setLoading(true)
    setTxHash(null)
    setTxStatus('pending')
    setTxError(null)
    try {
      const hash = await sendXLM(publicKey, destination.trim(), amount, memo.trim() || undefined)
      setTxHash(hash)
      setTxStatus('success')
      toast.success('XLM sent successfully!')
      setDestination('')
      setAmount('')
      setMemo('')
      await refreshBalance()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Transaction failed'
      const lower = msg.toLowerCase()
      if (lower.includes('insufficient') || lower.includes('underfunded') || lower.includes('op_underfunded')) {
        toast.error('Insufficient XLM balance. Fund your account via Friendbot.')
      } else {
        toast.error(msg)
      }
      setTxStatus('failed')
      setTxError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-12">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-11 h-11 rounded-2xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center shadow-lg shadow-cyan-900/20">
          <Send className="w-5 h-5 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-white">Send XLM</h1>
          <p className="text-sm text-slate-400">Transfer XLM on Stellar Testnet</p>
        </div>
      </div>

      {!connected ? (
        <div className="card border border-dashed border-white/[0.10] text-center py-14">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7 text-slate-400" />
          </div>
          <p className="text-slate-200 font-semibold mb-1">Wallet not connected</p>
          <p className="text-sm text-slate-400 mb-6">Connect your Stellar wallet to send XLM</p>
          <button onClick={connect} disabled={connecting} className="btn-primary mx-auto">
            {connecting ? <><Spinner size="sm" /> Connecting…</> : 'Connect Wallet'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Balance card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/80 via-blue-900/60 to-[#0a1a3a] border border-blue-500/30 text-white p-6 shadow-xl">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl pointer-events-none" />

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-blue-300" />
                  <span className="text-sm font-medium text-slate-300">Your Balance</span>
                </div>
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="p-1.5 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Refresh balance"
                >
                  <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>

              <p className="text-4xl font-black tracking-tight mb-1 text-white">
                {balance !== null ? (
                  <>{parseFloat(balance).toFixed(4)} <span className="text-2xl font-bold text-blue-400">XLM</span></>
                ) : '—'}
              </p>
              <p className="font-mono text-xs text-slate-400 mt-3">{shortAddress(publicKey!)}</p>

              {/* Friendbot link */}
              <a
                href={`https://friendbot.stellar.org?addr=${publicKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-blue-300 hover:text-white mt-3 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                Fund via Friendbot (Testnet)
              </a>
            </div>
          </div>

          {/* Send form */}
          <div className="card border border-white/[0.07] space-y-4">
            {txStatus && <TxStatus hash={txHash ?? undefined} status={txStatus} error={txError ?? undefined} />}

            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="label">Destination Address <span className="text-red-400">*</span></label>
                <input
                  className="input font-mono text-xs"
                  placeholder="G…"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label">Amount (XLM) <span className="text-red-400">*</span></label>
                <div className="relative">
                  <input
                    className="input pr-14"
                    type="number"
                    min="0.0000001"
                    step="0.0000001"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">XLM</span>
                </div>
              </div>

              <div>
                <label className="label">
                  Memo <span className="text-slate-400 font-normal text-xs">(optional, max 28 chars)</span>
                </label>
                <input
                  className="input"
                  placeholder="Optional text memo"
                  maxLength={28}
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-base">
                {loading ? (
                  <><Spinner size="sm" /> Sending…</>
                ) : (
                  <><Send className="w-5 h-5" /> Send XLM</>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
