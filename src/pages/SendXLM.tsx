import { useState } from 'react'
import { Send, AlertCircle, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import { useWallet } from '../hooks/useWallet'
import { sendXLM } from '../lib/stellar'
import TxStatus from '../components/TxStatus'
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
    try {
      const hash = await sendXLM(publicKey, destination.trim(), amount, memo.trim() || undefined)
      setTxHash(hash)
      toast.success('XLM sent successfully!')
      setDestination('')
      setAmount('')
      setMemo('')
      // Refresh balance after send
      await refreshBalance()
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Transaction failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
          <Send className="w-5 h-5 text-brand-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Send XLM</h1>
          <p className="text-sm text-slate-500">Send XLM on Stellar Testnet</p>
        </div>
      </div>

      {!connected ? (
        <div className="card text-center py-12">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium mb-4">Connect your wallet to send XLM</p>
          <button onClick={connect} disabled={connecting} className="btn-primary">
            {connecting ? <><Spinner size="sm" /> Connecting…</> : 'Connect Wallet'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Balance card */}
          <div className="card bg-gradient-to-br from-brand-600 to-brand-700 text-white">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-brand-200">Your Balance</span>
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="text-brand-200 hover:text-white transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <p className="text-3xl font-bold tracking-tight">
              {balance !== null ? `${balance} XLM` : '—'}
            </p>
            <p className="text-xs text-brand-300 mt-2 font-mono">{shortAddress(publicKey!)}</p>
          </div>

          {/* Send form */}
          <form onSubmit={handleSend} className="card space-y-4">
            {txHash && <TxStatus hash={txHash} />}

            <div>
              <label className="label">Destination Address <span className="text-red-500">*</span></label>
              <input
                className="input font-mono text-xs"
                placeholder="G…"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Amount (XLM) <span className="text-red-500">*</span></label>
              <input
                className="input"
                type="number"
                min="0.0000001"
                step="0.0000001"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Memo (optional)</label>
              <input
                className="input"
                placeholder="Optional text memo"
                maxLength={28}
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center"
            >
              {loading ? (
                <><Spinner size="sm" /> Sending…</>
              ) : (
                <><Send className="w-4 h-4" /> Send XLM</>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
