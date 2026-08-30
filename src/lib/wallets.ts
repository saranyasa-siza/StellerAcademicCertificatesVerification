/**
 * StellarWalletsKit — multi-wallet integration
 * Supports: Freighter, xBull, Albedo, LOBSTR
 */
import { StellarWalletsKit, Networks, KitEventType } from '@creit.tech/stellar-wallets-kit'
import { FreighterModule } from '@creit.tech/stellar-wallets-kit/modules/freighter'
import { xBullModule } from '@creit.tech/stellar-wallets-kit/modules/xbull'
import { AlbedoModule } from '@creit.tech/stellar-wallets-kit/modules/albedo'
import { LobstrModule } from '@creit.tech/stellar-wallets-kit/modules/lobstr'

export { StellarWalletsKit, KitEventType, Networks }

let initialized = false

export function initWalletsKit() {
  if (initialized) return
  initialized = true
  StellarWalletsKit.init({
    network: Networks.TESTNET,
    modules: [
      new FreighterModule(),
      new xBullModule(),
      new AlbedoModule(),
      new LobstrModule(),
    ],
  })
}

/** Open the wallet selection modal and return the chosen address */
export async function connectWithModal(): Promise<string> {
  initWalletsKit()
  const { address } = await StellarWalletsKit.authModal()
  return address
}

/** Sign a transaction XDR using the currently selected wallet module */
export async function signWithKit(xdr: string, networkPassphrase: string, address?: string): Promise<string> {
  const { signedTxXdr } = await StellarWalletsKit.signTransaction(xdr, { networkPassphrase, address })
  return signedTxXdr
}

/** Disconnect the active wallet */
export async function disconnectKit(): Promise<void> {
  await StellarWalletsKit.disconnect()
}
