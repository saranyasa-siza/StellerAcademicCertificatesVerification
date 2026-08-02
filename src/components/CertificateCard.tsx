import { ExternalLink, ShieldCheck, ShieldX, Copy } from 'lucide-react'
import type { Certificate } from '../lib/stellar'
import { shortAddress, formatDate } from '../utils/helpers'
import toast from 'react-hot-toast'

interface Props {
  cert: Certificate
  onRevoke?: (id: string) => void
  revoking?: boolean
  showRevoke?: boolean
}

export default function CertificateCard({ cert, onRevoke, revoking, showRevoke }: Props) {
  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied!`)
  }

  return (
    <div className="card space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {cert.revoked ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                <ShieldX className="w-3.5 h-3.5" /> Revoked
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" /> Active
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-slate-800">{cert.student_name}</h3>
          <p className="text-sm text-slate-500">{cert.course_name}</p>
        </div>
        <span className="text-xs text-slate-400 font-mono bg-slate-50 px-2 py-1 rounded-lg whitespace-nowrap">
          {cert.id}
        </span>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <Detail label="Institution" value={cert.institution_name} />
        <Detail label="Issue Date" value={formatDate(cert.issue_date)} />
        <div className="sm:col-span-2">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Issuer</span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-xs text-slate-700 break-all">{cert.issuer}</span>
            <button
              onClick={() => copy(cert.issuer, 'Issuer address')}
              className="shrink-0 text-slate-400 hover:text-brand-500 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
        <div className="sm:col-span-2">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Certificate Hash
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="font-mono text-xs text-slate-700 break-all">{cert.hash}</span>
            <button
              onClick={() => copy(cert.hash, 'Hash')}
              className="shrink-0 text-slate-400 hover:text-brand-500 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* IPFS link */}
      {cert.ipfs_cid && cert.ipfs_cid.length > 0 && (
        <a
          href={`https://ipfs.io/ipfs/${cert.ipfs_cid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 font-medium"
        >
          <ExternalLink className="w-4 h-4" />
          View on IPFS
        </a>
      )}

      {/* Revoke button */}
      {showRevoke && !cert.revoked && onRevoke && (
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={() => onRevoke(cert.id)}
            disabled={revoking}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl border border-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {revoking ? 'Revoking…' : 'Revoke Certificate'}
          </button>
        </div>
      )}
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</span>
      <p className="text-slate-800 font-medium mt-0.5">{value || '—'}</p>
    </div>
  )
}
