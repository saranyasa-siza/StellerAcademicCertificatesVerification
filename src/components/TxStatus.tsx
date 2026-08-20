import { ExternalLink, CheckCircle2, Clock, XCircle, Loader2 } from 'lucide-react'

export type TxState = 'pending' | 'success' | 'failed'

interface Props {
  hash?: string
  status?: TxState
  error?: string
}

export default function TxStatus({ hash, status = 'success', error }: Props) {
  if (status === 'pending') {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 overflow-hidden">
        {/* Animated progress bar */}
        <div className="h-1 bg-amber-200 overflow-hidden">
          <div className="h-full bg-amber-400 animate-[slide_1.5s_ease-in-out_infinite]" style={{ width: '40%', animation: 'progress 1.5s ease-in-out infinite' }} />
        </div>
        <div className="flex items-start gap-3 p-4">
          <Loader2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-spin" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Transaction pending…</p>
            <p className="text-xs text-amber-600 mt-0.5">Waiting for on-chain confirmation from Stellar</p>
          </div>
        </div>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
        <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-red-800">Transaction failed</p>
          {error && (
            <p className="text-xs text-red-600 mt-1 break-all bg-red-100 rounded-lg px-2 py-1 font-mono">
              {error}
            </p>
          )}
        </div>
      </div>
    )
  }

  if (!hash) return null

  return (
    <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-emerald-800">Transaction confirmed ✓</p>
        <a
          href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-900 font-mono bg-emerald-100 hover:bg-emerald-200 transition-colors px-2 py-1 rounded-lg mt-1.5 break-all"
        >
          {hash.slice(0, 20)}…{hash.slice(-10)}
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      </div>
    </div>
  )
}
