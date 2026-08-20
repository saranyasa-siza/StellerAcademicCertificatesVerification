import { useState } from 'react'
import { Award, AlertCircle, Fingerprint, BookOpen, Building2, CalendarDays, Link2, Hash } from 'lucide-react'
import toast from 'react-hot-toast'
import { useWallet } from '../hooks/useWallet'
import { issueCertificate, certificateExists } from '../lib/stellar'
import { generateCertHash } from '../utils/helpers'
import TxStatus, { type TxState } from '../components/TxStatus'
import Spinner from '../components/Spinner'

interface FormState {
  id: string
  student_name: string
  course_name: string
  institution_name: string
  issue_date: string
  ipfs_cid: string
}

const empty: FormState = {
  id: '',
  student_name: '',
  course_name: '',
  institution_name: '',
  issue_date: '',
  ipfs_cid: '',
}

function Field({
  label, hint, required, children,
}: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400 mt-1">{hint}</p>}
    </div>
  )
}

export default function IssueCertificate() {
  const { publicKey, connected, connect, connecting } = useWallet()
  const [form, setForm] = useState<FormState>(empty)
  const [loading, setLoading] = useState(false)
  const [txHash, setTxHash] = useState<string | null>(null)
  const [txStatus, setTxStatus] = useState<TxState | null>(null)
  const [txError, setTxError] = useState<string | null>(null)

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!publicKey) return

    if (!form.id.trim() || !form.student_name.trim() || !form.course_name.trim() ||
        !form.institution_name.trim() || !form.issue_date) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    setTxHash(null)
    setTxStatus('pending')
    setTxError(null)
    try {
      const exists = await certificateExists(form.id.trim())
      if (exists) {
        toast.error('A certificate with this ID already exists on-chain')
        setLoading(false)
        setTxStatus(null)
        return
      }

      const hash = await generateCertHash({
        id: form.id.trim(),
        studentName: form.student_name.trim(),
        courseName: form.course_name.trim(),
        institutionName: form.institution_name.trim(),
        issueDate: form.issue_date,
        issuer: publicKey,
      })

      const txhash = await issueCertificate(
        {
          id: form.id.trim(),
          student_name: form.student_name.trim(),
          course_name: form.course_name.trim(),
          institution_name: form.institution_name.trim(),
          issue_date: form.issue_date,
          hash,
          ipfs_cid: form.ipfs_cid.trim(),
        },
        publicKey
      )

      setTxHash(txhash)
      setTxStatus('success')
      toast.success('Certificate issued on-chain!')
      setForm(empty)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Transaction failed'
      setTxStatus('failed')
      setTxError(msg)
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
          <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center shadow-md shadow-blue-200">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-800">Issue Certificate</h1>
            <p className="text-sm text-slate-500">Permanently store a certificate on Stellar Soroban</p>
          </div>
        </div>
        {/* Info strip */}
        <div className="flex flex-wrap gap-3 mt-4">
          {['Permissionless', 'Tamper-proof', 'On-chain forever'].map((tag) => (
            <span key={tag} className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
              ✓ {tag}
            </span>
          ))}
        </div>
      </div>

      {!connected ? (
        <div className="card text-center py-14 border-dashed">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7 text-slate-400" />
          </div>
          <p className="text-slate-700 font-semibold mb-1">Wallet not connected</p>
          <p className="text-sm text-slate-400 mb-6">Connect your Stellar wallet to issue certificates</p>
          <button onClick={connect} disabled={connecting} className="btn-primary mx-auto">
            {connecting ? <><Spinner size="sm" /> Connecting…</> : 'Connect Wallet'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">

          {txStatus && (
            <TxStatus hash={txHash ?? undefined} status={txStatus} error={txError ?? undefined} />
          )}

          {/* Certificate Identity */}
          <div className="card space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Fingerprint className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-bold text-slate-700">Certificate Identity</span>
            </div>
            <Field label="Certificate ID" hint="Must be globally unique on-chain (e.g. CERT-MIT-2024-001)" required>
              <input className="input" placeholder="CERT-MIT-2024-001" value={form.id} onChange={set('id')} required />
            </Field>
          </div>

          {/* Student & Course */}
          <div className="card space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-bold text-slate-700">Student & Course Details</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Student Name" required>
                <input className="input" placeholder="Full name" value={form.student_name} onChange={set('student_name')} required />
              </Field>
              <Field label="Course Name" required>
                <input className="input" placeholder="e.g. Blockchain Development" value={form.course_name} onChange={set('course_name')} required />
              </Field>
            </div>
          </div>

          {/* Institution & Date */}
          <div className="card space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Building2 className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-bold text-slate-700">Institution & Date</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="Institution Name" required>
                <input className="input" placeholder="e.g. MIT, Coursera, Udemy" value={form.institution_name} onChange={set('institution_name')} required />
              </Field>
              <Field label="Issue Date" required>
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <input className="input pl-9" type="date" value={form.issue_date} onChange={set('issue_date')} required />
                </div>
              </Field>
            </div>
          </div>

          {/* Optional */}
          <div className="card space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Link2 className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-bold text-slate-700">Optional</span>
            </div>
            <Field label="IPFS CID" hint="Link to a document stored on IPFS (optional)">
              <input className="input" placeholder="QmXxx…" value={form.ipfs_cid} onChange={set('ipfs_cid')} />
            </Field>
          </div>

          {/* Issuer + Submit */}
          <div className="card bg-slate-50 border-slate-200 space-y-4">
            <div className="flex items-start gap-2">
              <Hash className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-0.5">Issuer (your wallet)</p>
                <p className="font-mono text-xs text-slate-600 break-all">{publicKey}</p>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 text-base">
              {loading ? (
                <><Spinner size="sm" /> Submitting to Stellar…</>
              ) : (
                <><Award className="w-5 h-5" /> Issue Certificate</>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
