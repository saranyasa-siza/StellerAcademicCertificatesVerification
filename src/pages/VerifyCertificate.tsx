import { useState } from 'react'
import { Search, ShieldCheck, Info } from 'lucide-react'
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
      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-900/20">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Verify Certificate</h1>
            <p className="text-sm text-slate-400">Check the authenticity of any certificate on-chain</p>
          </div>
        </div>
      </div>

      {/* Search card */}
      <div className="card border border-white/[0.07] mb-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div>
            <label className="label">Certificate ID</label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  className="input pl-9"
                  placeholder="e.g. CERT-MIT-2024-001"
                  value={certId}
                  onChange={(e) => {
                    setCertId(e.target.value)
                    if (searched) { setCert(null); setNotFound(false); setSearched(false) }
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading || !certId.trim()}
                className="btn-primary shrink-0"
              >
                {loading ? <Spinner size="sm" /> : <Search className="w-4 h-4" />}
                {loading ? 'Searching…' : 'Verify'}
              </button>
            </div>
          </div>

          {/* Hint */}
          <div className="flex items-start gap-2 text-xs text-slate-400 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3.5 py-2.5">
            <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-slate-400" />
            Enter the exact Certificate ID as issued. Verification reads directly from the Stellar blockchain — no login required.
          </div>
        </form>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <Spinner size="lg" />
          <p className="text-sm text-slate-400">Querying Stellar blockchain…</p>
        </div>
      )}

      {/* Not found */}
      {!loading && searched && notFound && (
        <EmptyState
          icon={<Search className="w-8 h-8" />}
          title="Certificate not found"
          description={`No certificate with ID "${certId.trim()}" exists on-chain. Double-check the ID and try again.`}
        />
      )}

      {/* Result */}
      {!loading && cert && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/20 rounded-xl px-4 py-2.5">
            <ShieldCheck className="w-4 h-4" />
            Certificate found and verified on-chain
          </div>
          <CertificateCard cert={cert} />
        </div>
      )}
    </div>
  )
}
