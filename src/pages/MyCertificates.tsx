import { useState, useEffect, useCallback } from 'react'
import { Award, AlertCircle, RefreshCw, LayoutDashboard } from 'lucide-react'
import toast from 'react-hot-toast'
import { useWallet } from '../hooks/useWallet'
import { getIssuerCertificates, getCertificate, revokeCertificate, type Certificate } from '../lib/stellar'
import CertificateCard from '../components/CertificateCard'
import Spinner from '../components/Spinner'
import EmptyState from '../components/EmptyState'
import { Link } from 'react-router-dom'

export default function MyCertificates() {
  const { publicKey, connected, connect, connecting } = useWallet()
  const [certs, setCerts] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(false)
  const [revoking, setRevoking] = useState<string | null>(null)

  const loadCerts = useCallback(async () => {
    if (!publicKey) return
    setLoading(true)
    try {
      const ids = await getIssuerCertificates(publicKey)
      const details = await Promise.all(ids.map((id) => getCertificate(id)))
      setCerts(details)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load certificates'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }, [publicKey])

  useEffect(() => {
    if (connected) loadCerts()
  }, [connected, loadCerts])

  const handleRevoke = async (id: string) => {
    if (!publicKey) return
    if (!window.confirm(`Revoke certificate "${id}"? This cannot be undone.`)) return
    setRevoking(id)
    try {
      await revokeCertificate(id, publicKey)
      toast.success('Certificate revoked')
      await loadCerts()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Revocation failed'
      toast.error(msg)
    } finally {
      setRevoking(null)
    }
  }

  const active = certs.filter((c) => !c.revoked).length
  const revoked = certs.filter((c) => c.revoked).length

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* Page header */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shadow-lg shadow-violet-900/20">
            <LayoutDashboard className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">My Certificates</h1>
            <p className="text-sm text-slate-400">Certificates issued from your wallet</p>
          </div>
        </div>
        {connected && !loading && certs.length > 0 && (
          <button onClick={loadCerts} disabled={loading} className="btn-secondary text-sm shrink-0">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        )}
      </div>

      {/* Stats row */}
      {connected && !loading && certs.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Total', value: certs.length, color: 'text-white', bg: 'bg-white/[0.04] border-white/[0.08]' },
            { label: 'Active', value: active, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
            { label: 'Revoked', value: revoked, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20' },
          ].map((s) => (
            <div key={s.label} className={`rounded-2xl border px-4 py-3 text-center ${s.bg}`}>
              <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-xs font-medium text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* States */}
      {!connected ? (
        <div className="card border border-dashed border-white/[0.10] text-center py-14">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7 text-slate-400" />
          </div>
          <p className="text-slate-200 font-semibold mb-1">Wallet not connected</p>
          <p className="text-sm text-slate-400 mb-6">Connect your wallet to view your issued certificates</p>
          <button onClick={connect} disabled={connecting} className="btn-primary mx-auto">
            {connecting ? <><Spinner size="sm" /> Connecting…</> : 'Connect Wallet'}
          </button>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Spinner size="lg" />
          <p className="text-sm text-slate-400">Loading your certificates…</p>
        </div>
      ) : certs.length === 0 ? (
        <EmptyState
          icon={<Award className="w-8 h-8" />}
          title="No certificates yet"
          description="You haven't issued any certificates from this wallet address."
          action={
            <Link to="/issue" className="btn-primary">
              <Award className="w-4 h-4" /> Issue your first certificate
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {certs.map((cert) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              showRevoke
              onRevoke={handleRevoke}
              revoking={revoking === cert.id}
            />
          ))}
        </div>
      )}
    </div>
  )
}
