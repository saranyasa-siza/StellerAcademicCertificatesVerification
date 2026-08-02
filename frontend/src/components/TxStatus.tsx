import { ExternalLink, CheckCircle } from 'lucide-react'

interface Props {
  hash: string
}

export default function TxStatus({ hash }: Props) {
  const explorerUrl = `https://stellar.expert/explorer/testnet/tx/${hash}`
  return (
    <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
      <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-sm font-semibold text-green-800">Transaction confirmed</p>
        <a
          href={explorerUrl}
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
