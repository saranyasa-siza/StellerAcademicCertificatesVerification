import {
  Contract,
  Horizon,
  rpc,
  TransactionBuilder,
  BASE_FEE,
  xdr,
  scValToNative,
  nativeToScVal,
  Asset,
  Operation,
  Memo,
} from '@stellar/stellar-sdk'
import { signWithKit } from './wallets'

export const CONTRACT_ID = import.meta.env.VITE_CONTRACT_ID as string
export const RPC_URL = import.meta.env.VITE_RPC_URL as string
export const NETWORK_PASSPHRASE = import.meta.env.VITE_NETWORK_PASSPHRASE as string
export const HORIZON_URL = 'https://horizon-testnet.stellar.org'

export const server = new rpc.Server(RPC_URL, { allowHttp: false })
export const horizon = new Horizon.Server(HORIZON_URL)

export interface Certificate {
  id: string
  student_name: string
  course_name: string
  institution_name: string
  issue_date: string
  hash: string
  ipfs_cid: string
  issuer: string
  revoked: boolean
}

// ── XLM balance ───────────────────────────────────────────────────────────────

/** Fetch the native XLM balance for a given Stellar address */
export async function getXLMBalance(address: string): Promise<string> {
  const account = await horizon.loadAccount(address)
  const native = account.balances.find((b) => b.asset_type === 'native')
  return native ? parseFloat(native.balance).toFixed(7) : '0.0000000'
}

// ── XLM payment transaction ───────────────────────────────────────────────────

/**
 * Send XLM from `senderAddress` to `destination`.
 * Signs via Freighter and submits to Horizon testnet.
 * Returns the transaction hash.
 */
export async function sendXLM(
  senderAddress: string,
  destination: string,
  amount: string,
  memo?: string
): Promise<string> {
  const account = await horizon.loadAccount(senderAddress)

  const txBuilder = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  }).addOperation(
    Operation.payment({
      destination,
      asset: Asset.native(),
      amount,
    })
  )

  if (memo) txBuilder.addMemo(Memo.text(memo))

  const tx = txBuilder.setTimeout(30).build()

  // Sign with Freighter
  const signedXdr = await signWithKit(tx.toXDR(), NETWORK_PASSPHRASE)

  // Submit to Horizon
  const signedTx = TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE)
  const result = await horizon.submitTransaction(signedTx)
  return result.hash
}

// ── helpers ───────────────────────────────────────────────────────────────────

function str(val: string): xdr.ScVal {
  return nativeToScVal(val, { type: 'string' })
}

/** Simulate a read-only Soroban contract call and return the result ScVal */
async function simulateRead(method: string, args: xdr.ScVal[]): Promise<xdr.ScVal> {
  const contract = new Contract(CONTRACT_ID)
  const account = await server.getAccount('GAAZI4TCR3TY5OJHCTJC2A4QSY6CJWJH5IAJTGKIN2ER7LBNVKOCCWN')
  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call(method, ...args))
    .setTimeout(30)
    .build()

  const result = await server.simulateTransaction(tx)
  if (rpc.Api.isSimulationError(result)) throw new Error(result.error)
  const simSuccess = result as rpc.Api.SimulateTransactionSuccessResponse
  if (!simSuccess.result) throw new Error('No result from simulation')
  return simSuccess.result.retval
}

function parseCertificate(val: xdr.ScVal): Certificate {
  const native = scValToNative(val) as Record<string, unknown>
  return {
    id: String(native.id ?? ''),
    student_name: String(native.student_name ?? ''),
    course_name: String(native.course_name ?? ''),
    institution_name: String(native.institution_name ?? ''),
    issue_date: String(native.issue_date ?? ''),
    hash: String(native.hash ?? ''),
    ipfs_cid: String(native.ipfs_cid ?? ''),
    issuer: String(native.issuer ?? ''),
    revoked: Boolean(native.revoked ?? false),
  }
}

// ── read functions ────────────────────────────────────────────────────────────

export async function getCertificate(id: string): Promise<Certificate> {
  const val = await simulateRead('get_certificate', [str(id)])
  return parseCertificate(val)
}

export async function certificateExists(id: string): Promise<boolean> {
  const val = await simulateRead('certificate_exists', [str(id)])
  return scValToNative(val) as boolean
}

export async function getIssuerCertificates(issuer: string): Promise<string[]> {
  const val = await simulateRead('get_issuer_certificates', [str(issuer)])
  const native = scValToNative(val)
  return Array.isArray(native) ? (native as string[]) : []
}

// ── write functions ───────────────────────────────────────────────────────────

/** Build, simulate, sign via Freighter, and submit a Soroban contract call */
export async function sendContractTransaction(
  method: string,
  args: xdr.ScVal[],
  signerAddress: string
): Promise<string> {
  const contract = new Contract(CONTRACT_ID)
  const account = await server.getAccount(signerAddress)

  const tx = new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call(method, ...args))
    .setTimeout(30)
    .build()

  const simResult = await server.simulateTransaction(tx)
  if (rpc.Api.isSimulationError(simResult)) throw new Error(simResult.error)

  const preparedTx = rpc.assembleTransaction(tx, simResult).build()
  const signedXdr = await signWithKit(preparedTx.toXDR(), NETWORK_PASSPHRASE)

  const signedTx = TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE)
  const sendResult = await server.sendTransaction(signedTx)
  if (sendResult.status === 'ERROR') throw new Error(JSON.stringify(sendResult.errorResult))

  // Poll for confirmation
  let getResult = await server.getTransaction(sendResult.hash)
  while (getResult.status === 'NOT_FOUND') {
    await new Promise((r) => setTimeout(r, 1500))
    getResult = await server.getTransaction(sendResult.hash)
  }
  if (getResult.status === 'FAILED') throw new Error('Transaction failed on-chain')

  return sendResult.hash
}

export async function issueCertificate(
  params: {
    id: string
    student_name: string
    course_name: string
    institution_name: string
    issue_date: string
    hash: string
    ipfs_cid: string
  },
  issuer: string
): Promise<string> {
  return sendContractTransaction(
    'issue_certificate',
    [
      str(params.id),
      str(params.student_name),
      str(params.course_name),
      str(params.institution_name),
      str(params.issue_date),
      str(params.hash),
      str(params.ipfs_cid),
      str(issuer),
    ],
    issuer
  )
}

export async function revokeCertificate(id: string, caller: string): Promise<string> {
  return sendContractTransaction('revoke_certificate', [str(id), str(caller)], caller)
}
