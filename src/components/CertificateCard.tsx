import { ExternalLink, ShieldCheck, ShieldX, Copy, Calendar, Building2, User, Hash, Link2 } from 'lucide-react'
import type { Certificate } from '../lib/stellar'
import { formatDate } from '../utils/helpers'
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

  const isActive = !cert.revoked

  return (
    <div className={`bg-white rounded-2xl border overflow-hidden shadow-sm hover:shadow-md transition-shadow ${isActive ? 'border-slate-100' : 'border-red-100'}`}>

      {/* Header band */}
      <div className={`px-6 py-4 ${isActive ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gradient-to-r from-red-500 to-rose-500'}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              {isActive ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-white/20 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3" /> Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-white/20 px-2.5 py-0.5 rounded-full">
                  <ShieldX className="w-3 h-3" /> Revoked
                </span>
              )}
            </div>
            <h3 className="text-xl font-extrabold text-white truncate">{cert.student_name}</h3>
            <p className="text-sm text-white/80 mt-0.5">{cert.course_name}</p>
          </div>
          <button
            onClick={() => copy(cert.id, 'Certificate ID')}
            className="shrink-0 text-right group"
            title="Copy ID"
          >
            <p className="text-[10px] text-white/60 uppercase tracking-widest mb-0.5">Cert ID</p>
            <p className="font-mono text-xs text-white/90 group-hover:text-white transition-colors bg-white/10 px-2 py-1 rounded-lg">
              {cert.id}
            </p>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5 space-y-4">

        {/* Main details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DetailRow icon={<Building2 className="w-4 h-4" />} label="Institution" value={cert.institution_name} />
          <DetailRow icon={<Calendar className="w-4 h-4" />} label="Issue Date" value={formatDate(cert.issue_date)} />
        </div>

        {/* Issuer */}
        <div className="bg-slate-50 rounded-xl px-4 py-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
            <User className="w-3.5 h-3.5" /> Issuer
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-600 break-all flex-1">{cert.issuer}</span>
            <button
              onClick={() => copy(cert.issuer, 'Issuer address')}
              className="shrink-0 p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              title="Copy issuer address"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Hash */}
        <div className="bg-slate-50 rounded-xl px-4 py-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
            <Hash className="w-3.5 h-3.5" /> Certificate Hash
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-slate-600 break-all flex-1">{cert.hash}</span>
            <button
              onClick={() => copy(cert.hash, 'Hash')}
              className="shrink-0 p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
              title="Copy hash"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* IPFS + Revoke row */}
        <div className="flex items-center justify-between pt-1">
          {cert.ipfs_cid && cert.ipfs_cid.length > 0 ? (
            <a
              href={`https://ipfs.io/ipfs/${cert.ipfs_cid}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <Link2 className="w-4 h-4" />
              View on IPFS
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <span />
          )}

          {showRevoke && isActive && onRevoke && (
            <button
              onClick={() => onRevoke(cert.id)}
              disabled={revoking}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl border border-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShieldX className="w-4 h-4" />
              {revoking ? 'Revoking…' : 'Revoke'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
        {icon} {label}
      </div>
      <p className="text-sm font-semibold text-slate-800">{value || '—'}</p>
    </div>
  )
}
