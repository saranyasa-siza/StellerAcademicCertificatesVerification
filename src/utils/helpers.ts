/** Generate a deterministic SHA-256-like hex hash from certificate fields using Web Crypto */
export async function generateCertHash(fields: {
  id: string
  studentName: string
  courseName: string
  institutionName: string
  issueDate: string
  issuer: string
}): Promise<string> {
  const data = JSON.stringify(fields)
  const encoded = new TextEncoder().encode(data)
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded.buffer as ArrayBuffer)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/** Shorten a Stellar address for display */
export function shortAddress(address: string): string {
  if (!address || address.length < 10) return address
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

/** Format an ISO date string to a readable format */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateStr
  }
}
