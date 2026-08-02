/**
 * Freighter wallet integration helpers.
 * Uses @stellar/freighter-api — exposes requestAccess, getAddress, setAllowed, signTransaction.
 */

/** Check if Freighter extension is installed and connected */
export async function isFreighterInstalled(): Promise<boolean> {
  try {
    const { isConnected } = await import('@stellar/freighter-api')
    const result = await isConnected()
    return result.isConnected
  } catch {
    return false
  }
}

/** Grant permission and return the wallet's public key */
export async function connectWallet(): Promise<string> {
  const { setAllowed, requestAccess, getAddress } = await import('@stellar/freighter-api')
  // setAllowed grants the dApp permission to interact with Freighter
  await setAllowed()
  await requestAccess()
  const result = await getAddress()
  if (result.error) throw new Error(String(result.error))
  return result.address
}

/** Return the already-connected public key, or null if not connected */
export async function getConnectedPublicKey(): Promise<string | null> {
  try {
    const { isConnected, getAddress } = await import('@stellar/freighter-api')
    const conn = await isConnected()
    if (!conn.isConnected) return null
    const result = await getAddress()
    return result.address || null
  } catch {
    return null
  }
}

/** Sign a transaction XDR string using Freighter */
export async function signTx(xdr: string, networkPassphrase: string): Promise<string> {
  const { signTransaction } = await import('@stellar/freighter-api')
  const result = await signTransaction(xdr, { networkPassphrase })
  if (result.error) throw new Error(String(result.error))
  return result.signedTxXdr
}
