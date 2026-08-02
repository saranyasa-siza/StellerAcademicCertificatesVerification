import { ExternalLink, CheckCircle, Clock, XCircle } from 'lucide-react'

export type TxState = 'pending' | 'success' | 'failed'

interface Props {
  hash?: string
  status?: TxState
  error?: string
}

export default function TxStatus({ hash, status = 'success', error }: Props) {
  if (status === 'pending') {
    return (
      <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
        <Clock className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5 animate-pulse" />
        <div>
          <p className="text-sm font-semibold text-yellow-800">Transaction pending…</p>
          <p className="text-xs text-yellow-700 mt-0.5">Waiting for on-chain confirmation</p>
        </div>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
        <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-red-800">Transaction failed</p>
          {error && <p className="text-xs text-red-700 mt-0.5 break-all">{error}</p>}
        </div>
      </div>
    )
  }

  if (!hash) return null

  return (
    <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-green-800">Transaction confirmed</p>
        <a
          href={`https://stellar.expert/explorer/testnet/tx/${hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-green-700 hover:text-green-900 font-mono break-all mt-0.5"
        >
          {hash.slice(0, 16)}…{hash.slice(-8)}
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      </div>
    </div>
  )
}
