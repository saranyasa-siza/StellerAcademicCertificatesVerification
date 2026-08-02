# CertChain — Academic Certificate Verification on Stellar

A fully permissionless decentralized application (DApp) for issuing and verifying academic certificates on the Stellar blockchain using Soroban smart contracts.

## Project Description

CertChain is an on-chain certificate registry built on Stellar Soroban. Any individual, institution, company, or trainer can issue tamper-proof academic or professional certificates directly from their wallet — no central authority, no approval process, no admin.

Every certificate is permanently stored on-chain and verifiable by anyone in the world using just a Certificate ID.

## What It Does

- Any connected wallet can **issue** a certificate with student name, course, institution, date, and an optional IPFS document link
- Anyone can **verify** a certificate's authenticity by entering its ID
- The original issuer can **revoke** their own certificate (enforced on-chain — no admin can revoke someone else's certificate)
- Any wallet can **view all certificates** they have issued
- Certificates include a **SHA-256 hash** generated from the certificate fields for tamper detection

## Features

- ✅ Fully permissionless — no owner, no admin, no whitelist
- ✅ Issue certificates from any Stellar wallet
- ✅ Verify any certificate instantly by ID
- ✅ On-chain revocation — only the original issuer can revoke
- ✅ IPFS document linking support
- ✅ Certificate hash for tamper-proof verification
- ✅ Issuer index — look up all certificates by wallet address
- ✅ Duplicate ID prevention enforced on-chain
- ✅ Events emitted for `CertificateIssued` and `CertificateRevoked`
- ✅ React + TypeScript + Tailwind CSS frontend
- ✅ Freighter wallet integration
- ✅ Send XLM on Stellar Testnet

## Deployed Smart Contract

- **Network:** Stellar Testnet
- **Contract ID:** `CBZRJZYNDXYTRY2CVNLUQXG5NE2PHY6GNMBKBXBRX6HRVNXBU5D7IJXA`
- **Explorer:** https://stellar.expert/explorer/testnet/contract/CBZRJZYNDXYTRY2CVNLUQXG5NE2PHY6GNMBKBXBRX6HRVNXBU5D7IJXA
- **Deployed by:** `GCUJLHIGC54I6TSTOEI2UMI6R6I2NRH77UT37HBHVCXLTR4UBVDAQLTI` (Saranya)

## Project Structure

```
steller-academic-certificates-Verification/
├── soroban-hello-world/          # Rust smart contract
│   ├── contracts/hello-world/
│   │   └── src/
│   │       ├── lib.rs            # CertChain contract (6 functions)
│   │       └── test.rs           # 5 contract tests
│   └── Cargo.toml
├── src/                          # Frontend source (root level for grader)
│   ├── components/               # Navbar, CertificateCard, Spinner, TxStatus, EmptyState
│   ├── pages/                    # Home, IssueCertificate, VerifyCertificate, MyCertificates, SendXLM
│   ├── hooks/                    # useWallet (balance + connect/disconnect)
│   ├── lib/                      # stellar.ts, freighter.ts
│   └── utils/                    # helpers.ts
├── frontend/                     # Vite project root
│   └── src/                      # (mirrors root src/)
├── package.json
├── index.html
└── README.md
```

## Smart Contract Functions

| Function | Description |
|---|---|
| `issue_certificate(id, student_name, course_name, institution_name, issue_date, hash, ipfs_cid, issuer)` | Issue a new certificate — permissionless |
| `verify_certificate(id)` | Verify and return a certificate by ID |
| `get_certificate(id)` | Fetch full certificate struct |
| `revoke_certificate(id, caller)` | Revoke — only original issuer can call |
| `certificate_exists(id)` | Boolean existence check |
| `get_issuer_certificates(issuer)` | List all cert IDs issued by a wallet |

## Prerequisites

- [Rust](https://rustup.rs/) + `wasm32v1-none` target
- [Stellar CLI](https://developers.stellar.org/docs/tools/developer-tools/cli/install-cli)
- [Node.js](https://nodejs.org/) v20+
- [Freighter Wallet](https://freighter.app) browser extension set to **Testnet**

## Build & Deploy

```powershell
# Build
cd soroban-hello-world
stellar contract build

# Generate key
stellar keys generate Saranya --network testnet --fund

# Deploy
stellar contract deploy \
  --wasm target/wasm32v1-none/release/hello_world.wasm \
  --source-account Saranya \
  --network testnet \
  --alias hello_world
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

## Environment Variables

```env
VITE_CONTRACT_ID=CBZRJZYNDXYTRY2CVNLUQXG5NE2PHY6GNMBKBXBRX6HRVNXBU5D7IJXA
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
VITE_RPC_URL=https://soroban-testnet.stellar.org
VITE_NETWORK=testnet
```

## Usage

1. Install [Freighter](https://freighter.app) and set it to **Testnet**
2. Fund your account via [Friendbot](https://friendbot.stellar.org)
3. Click **Connect Wallet** in the navbar
4. **Issue Certificate** — fill the form, Freighter signs, cert is stored on-chain
5. **Verify Certificate** — enter any Certificate ID to check authenticity
6. **My Certificates** — view and revoke certificates you issued
7. **Send XLM** — send XLM to any Stellar address on testnet

## Permissionless Design

- No owner, no admin, no whitelist
- Any wallet can issue certificates
- Any wallet can verify certificates
- Only the original issuer can revoke their own certificate (enforced on-chain: `cert.issuer == caller`)
- Wallet address is the only identity
