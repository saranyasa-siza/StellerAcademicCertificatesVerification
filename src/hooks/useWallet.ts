import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { connectWithModal, disconnectKit, initWalletsKit } from '../lib/wallets'
import { getXLMBalance } from '../lib/stellar'

export interface UseWalletReturn {
  publicKey: string | null
  connected: boolean
  connecting: boolean
  balance: string | null
  refreshBalance: () => Promise<void>
  connect: () => Promise<void>
  disconnect: () => void
}

/** Classify wallet errors into 3 types for Level 2 requirement */
function classifyError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err)
  const lower = msg.toLowerCase()

  // Error type 1: Wallet not found / not installed
  if (
    lower.includes('not found') ||
    lower.includes('not installed') ||
    lower.includes('not available') ||
    lower.includes('no wallet') ||
    lower.includes('extension')
  ) {
    return 'Wallet not found. Please install Freighter, xBull, Albedo, or LOBSTR.'
  }

  // Error type 2: User rejected / cancelled
  if (
    lower.includes('reject') ||
    lower.includes('cancel') ||
    lower.includes('denied') ||
    lower.includes('declined') ||
    lower.includes('user closed') ||
    lower.includes('user abort')
  ) {
    return 'Connection rejected. Please approve the request in your wallet.'
  }

  // Error type 3: Insufficient balance
  if (
    lower.includes('insufficient') ||
    lower.includes('balance') ||
    lower.includes('underfunded') ||
    lower.includes('op_underfunded')
  ) {
    return 'Insufficient XLM balance. Fund your account via Friendbot.'
  }

  return msg || 'Failed to connect wallet'
}

export function useWallet(): UseWalletReturn {
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [balance, setBalance] = useState<string | null>(null)

  const refreshBalance = useCallback(async () => {
    if (!publicKey) return
    try {
      const bal = await getXLMBalance(publicKey)
      setBalance(bal)
    } catch {
      setBalance(null)
    }
  }, [publicKey])

  // Init kit on mount
  useEffect(() => {
    initWalletsKit()
  }, [])

  useEffect(() => {
    if (publicKey) refreshBalance()
    else setBalance(null)
  }, [publicKey, refreshBalance])

  const connect = useCallback(async () => {
    setConnecting(true)
    try {
      const address = await connectWithModal()
      setPublicKey(address)
      toast.success('Wallet connected!')
    } catch (err: unknown) {
      const classified = classifyError(err)
      toast.error(classified)
    } finally {
      setConnecting(false)
    }
  }, [])

  const disconnect = useCallback(() => {
    disconnectKit().catch(() => {})
    setPublicKey(null)
    setBalance(null)
    toast('Wallet disconnected', { icon: '👋' })
  }, [])

  return {
    publicKey,
    connected: !!publicKey,
    connecting,
    balance,
    refreshBalance,
    connect,
    disconnect,
  }
}
