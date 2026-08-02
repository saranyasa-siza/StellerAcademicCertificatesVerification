import { useState } from 'react'
import { Search, ShieldCheck } from 'lucide-react'
import toast from 'react-hot-toast'
import { getCertificate, certificateExists, type Certificate } from '../lib/stellar'
import CertificateCard from '../components/CertificateCard'
import Spinner from '../components/Spinner'
import EmptyState from '../components/EmptyState'

export default function VerifyCertificate() {
  const [certId, setCertId] = useState('')
  const [loading, setLoading] = useState(false)
  const [cert, setCert] = useState<Certificate | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    const id = certId.trim()
    if (!id) return

    setLoading(true)
    setCert(null)
    setNotFound(false)
    setSearched(false)

    try {
      const exists = await certificateExists(id)
      if (!exists) {
        setNotFound(true)
        setSearched(true)
        setLoading(false)
        return
      }
      const result = await getCertificate(id)
      setCert(result)
      setSearched(true)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Lookup failed'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
          <ShieldCheck className="w-5 h-5 text-brand-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Verify Certificate</h1>
          <p className="text-sm text-slate-500">
            Enter a Certificate ID to verify its authenticity on-chain
          </p>
        </div>
      </div>

      {/* Search form */}
      <form onSubmit={handleSearch} className="card mb-6">
        <label className="label">Certificate ID</label>
        <div className="flex gap-3">
          <input
            className="input flex-1"
            placeholder="e.g. CERT-MIT-2024-001"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            required
          />
          <button type="submit" disabled={loading || !certId.trim()} className="btn-primary shrink-0">
            {loading ? <Spinner size="sm" /> : <Search className="w-4 h-4" />}
            {loading ? 'Searching…' : 'Verify'}
          </button>
        </div>
      </form>

      {/* Result */}
      {loading && (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      )}

      {!loading && searched && notFound && (
        <EmptyState
          icon={<Search className="w-8 h-8" />}
          title="Certificate not found"
          description={`No certificate with ID "${certId.trim()}" exists on-chain.`}
        />
      )}

      {!loading && cert && <CertificateCard cert={cert} />}
    </div>
  )
}
