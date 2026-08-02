import { useState, useEffect, useCallback } from 'react'
import { connectWallet, getConnectedPublicKey, isFreighterInstalled } from '../lib/freighter'
import { getXLMBalance } from '../lib/stellar'
import toast from 'react-hot-toast'

export interface UseWalletReturn {
  publicKey: string | null
  connected: boolean
  connecting: boolean
  freighterInstalled: boolean
  balance: string | null
  refreshBalance: () => Promise<void>
  connect: () => Promise<void>
  disconnect: () => void
}

export function useWallet(): UseWalletReturn {
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)
  const [freighterInstalled, setFreighterInstalled] = useState(false)
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

  // On mount: check Freighter and restore session
  useEffect(() => {
    isFreighterInstalled().then((installed) => {
      setFreighterInstalled(installed)
      if (installed) {
        getConnectedPublicKey().then((key) => {
          if (key) setPublicKey(key)
        })
      }
    })
  }, [])

  // Fetch balance whenever publicKey changes
  useEffect(() => {
    if (publicKey) refreshBalance()
    else setBalance(null)
  }, [publicKey, refreshBalance])

  const connect = useCallback(async () => {
    if (!freighterInstalled) {
      toast.error('Freighter wallet not found. Install it from freighter.app')
      window.open('https://freighter.app', '_blank')
      return
    }
    setConnecting(true)
    try {
      const key = await connectWallet()
      setPublicKey(key)
      toast.success('Wallet connected!')
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : 'Failed to connect wallet')
    } finally {
      setConnecting(false)
    }
  }, [freighterInstalled])

  const disconnect = useCallback(() => {
    setPublicKey(null)
    setBalance(null)
    toast('Wallet disconnected', { icon: '👋' })
  }, [])

  return {
    publicKey,
    connected: !!publicKey,
    connecting,
    freighterInstalled,
    balance,
    refreshBalance,
    connect,
    disconnect,
  }
}
