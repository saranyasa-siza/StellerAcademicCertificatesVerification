import { useState } from 'react'
import { Award, AlertCircle } from 'lucide-react'
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

    // Basic validation
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
      // Check for duplicate ID before submitting
      const exists = await certificateExists(form.id.trim())
      if (exists) {
        toast.error('A certificate with this ID already exists on-chain')
        setLoading(false)
        return
      }

      // Generate deterministic hash from certificate fields
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
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
          <Award className="w-5 h-5 text-brand-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Issue Certificate</h1>
          <p className="text-sm text-slate-500">
            Issue a tamper-proof certificate on the Stellar blockchain
          </p>
        </div>
      </div>

      {!connected ? (
        <div className="card text-center py-12">
          <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-600 font-medium mb-4">Connect your wallet to issue certificates</p>
          <button onClick={connect} disabled={connecting} className="btn-primary">
            {connecting ? <><Spinner size="sm" /> Connecting…</> : 'Connect Wallet'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card space-y-5">
          {txStatus && <TxStatus hash={txHash ?? undefined} status={txStatus} error={txError ?? undefined} />}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="label">
                Certificate ID <span className="text-red-500">*</span>
              </label>
              <input
                className="input"
                placeholder="e.g. CERT-MIT-2024-001"
                value={form.id}
                onChange={set('id')}
                required
              />
              <p className="text-xs text-slate-400 mt-1">Must be unique on-chain</p>
            </div>

            <div>
              <label className="label">
                Student Name <span className="text-red-500">*</span>
              </label>
              <input
                className="input"
                placeholder="Full name"
                value={form.student_name}
                onChange={set('student_name')}
                required
              />
            </div>

            <div>
              <label className="label">
                Course Name <span className="text-red-500">*</span>
              </label>
              <input
                className="input"
                placeholder="e.g. Blockchain Development"
                value={form.course_name}
                onChange={set('course_name')}
                required
              />
            </div>

            <div>
              <label className="label">
                Institution Name <span className="text-red-500">*</span>
              </label>
              <input
                className="input"
                placeholder="e.g. MIT, Coursera, Udemy"
                value={form.institution_name}
                onChange={set('institution_name')}
                required
              />
            </div>

            <div>
              <label className="label">
                Issue Date <span className="text-red-500">*</span>
              </label>
              <input
                className="input"
                type="date"
                value={form.issue_date}
                onChange={set('issue_date')}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className="label">IPFS CID (optional)</label>
              <input
                className="input"
                placeholder="QmXxx… — paste your IPFS CID if you have one"
                value={form.ipfs_cid}
                onChange={set('ipfs_cid')}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-400 mb-4">
              Issuer: <span className="font-mono">{publicKey}</span>
            </p>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
              {loading ? (
                <>
                  <Spinner size="sm" />
                  Submitting transaction…
                </>
              ) : (
                <>
                  <Award className="w-4 h-4" />
                  Issue Certificate
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
