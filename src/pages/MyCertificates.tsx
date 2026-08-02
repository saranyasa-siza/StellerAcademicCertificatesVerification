import { useState, useEffect, useCallback } from 'react'
import { Award, AlertCircle, RefreshCw } from 'lucide-react'
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
      // Refresh the list
      await loadCerts()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Revocation failed'
      toast.error(msg)
    } finally {
      setRevoking(null)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
            <Award className="w-5 h-5 text-brand-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Certificates</h1>
            <p className="text-sm text-slate-500">Certificates you have issued</p>
          </div>
        </div>
        {connected && (
          <button
            onClick={loadCerts}
            disabled={loading}
            className="btn-secondary text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        )}
      </div>

      {!connected ? (
        <div className="card text-center py-12">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium mb-4">
            Connect your wallet to view your certificates
          </p>
          <button onClick={connect} disabled={connecting} className="btn-primary">
            {connecting ? <><Spinner size="sm" /> Connecting…</> : 'Connect Wallet'}
          </button>
        </div>
      ) : loading ? (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      ) : certs.length === 0 ? (
        <EmptyState
          icon={<Award className="w-8 h-8" />}
          title="No certificates yet"
          description="You haven't issued any certificates from this wallet."
          action={
            <Link to="/issue" className="btn-primary">
              Issue your first certificate
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-slate-500">
            {certs.length} certificate{certs.length !== 1 ? 's' : ''} issued
          </p>
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
