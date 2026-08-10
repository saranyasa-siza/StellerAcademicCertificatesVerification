# CertChain — Academic Certificate Verification on Stellar

<img width="1919" height="898" alt="Screenshot 2026-08-02 142113" src="https://github.com/user-attachments/assets/8b31c1bf-3c26-4681-b0d8-73c463e4bb49" />

<img width="1919" height="908" alt="Screenshot 2026-08-02 143239" src="https://github.com/user-attachments/assets/697e706a-e73b-4200-8fac-08393ae8cfc8" />

<img width="1919" height="904" alt="Screenshot 2026-08-02 143300" src="https://github.com/user-attachments/assets/52f4d6b0-46e8-460b-82c6-ab2933a88944" />


A fully permissionless decentralized application (DApp) for issuing and verifying academic certificates on the Stellar blockchain using Soroban smart contracts.

## Live Demo

> **Deployed:** https://steller-academic-certificates-verif.vercel.app/

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
- ✅ **Multi-wallet support via StellarWalletsKit** (Freighter, xBull, Albedo, LOBSTR)
- ✅ **3 error types handled**: wallet not found, user rejected, insufficient balance
- ✅ **Transaction status tracking**: pending → success / failed with explorer link
- ✅ Send XLM on Stellar Testnet
- ✅ **CI/CD pipeline** via GitHub Actions
- ✅ **6 contract tests** — all passing
- ✅ **Production deployment** on Vercel
- ✅ Mobile responsive UI

---

## Level 2 — Multi-Wallet, Contract Deployment & Real-Time Events

### Multi-Wallet Integration (StellarWalletsKit)

Wallet selection is handled by `@creit.tech/stellar-wallets-kit`. Clicking **Connect Wallet** opens a modal showing all available wallets:

| Wallet | Type |
|---|---|
| Freighter | Browser extension |
| xBull | Browser extension |
| Albedo | Web-based |
| LOBSTR | Mobile + extension |

### Error Handling (3 Types)

| Error Type | Trigger | User Message |
|---|---|---|
| Wallet not found | Extension not installed | "Wallet not found. Please install Freighter, xBull, Albedo, or LOBSTR." |
| User rejected | User dismissed/denied modal | "Connection rejected. Please approve the request in your wallet." |
| Insufficient balance | `op_underfunded` / low XLM | "Insufficient XLM balance. Fund your account via Friendbot." |

### Transaction Status Tracking

Every contract call and XLM send shows a live status banner:
- 🟡 **Pending** — transaction submitted, waiting for on-chain confirmation
- ✅ **Success** — confirmed, with clickable Stellar Explorer link
- ❌ **Failed** — on-chain failure with error message

### Contract Called from Frontend

> **Tx Hash:** _(run the app, issue a certificate, and paste the hash here from the TxStatus banner)_
>
> **Explorer:** `https://stellar.expert/explorer/testnet/tx/<TX_HASH>`

---

## Level 3 — Production Architecture, CI/CD & Testing

### CI/CD Pipeline (GitHub Actions)

File: `.github/workflows/ci.yml`

Two jobs run on every push and pull request to `main`:

| Job | What it does |
|---|---|
| `contract-tests` | Installs Rust + wasm32v1-none target, runs `cargo test --package hello-world` |
| `frontend-build` | Installs Node 20, runs `npm ci` + `npm run build` with production env vars |

### Smart Contract Tests — 6 Passing

File: `soroban-hello-world/contracts/hello-world/src/test.rs`

| # | Test | What it verifies |
|---|---|---|
| 1 | `test_issue_and_verify` | Issue a cert, verify it exists and fields are correct |
| 2 | `test_revoke` | Issue then revoke, confirm `revoked = true` |
| 3 | `test_get_issuer_certificates` | Issue 2 certs from same wallet, confirm index returns 2 |
| 4 | `test_duplicate_id_rejected` | Second issue with same ID panics with correct message |
| 5 | `test_certificate_not_exists` | `certificate_exists` returns false for unknown ID |
| 6 | `test_wrong_issuer_cannot_revoke` | Different wallet trying to revoke panics with correct message |

Run locally:
```bash
cd soroban-hello-world
cargo test --package hello-world
```

Expected output:
```
running 6 tests
test test_certificate_not_exists ... ok
test test_duplicate_id_rejected ... ok
test test_get_issuer_certificates ... ok
test test_issue_and_verify ... ok
test test_revoke ... ok
test test_wrong_issuer_cannot_revoke ... ok

test result: ok. 6 passed; 0 failed
```

### Production Deployment (Vercel)

File: `vercel.json`

- SPA rewrites — all routes serve `index.html`
- Build command: `npm run build`
- Output: `dist/`
- Environment variables set in Vercel dashboard (same as `.env`)

### Production Architecture

```
User Browser
    │
    ▼
Vercel CDN (React SPA)
    │
    ├── Read calls ──► Soroban RPC (simulate, no wallet needed)
    │                  https://soroban-testnet.stellar.org
    │
    └── Write calls ─► Wallet (Freighter / xBull / Albedo / LOBSTR)
                           │
                           ▼
                       Soroban RPC (sendTransaction)
                           │
                           ▼
                   Stellar Testnet Ledger
                   Contract: CBZRJZYNDXYTRY2CVNLUQXG5NE2PHY6GNMBKBXBRX6HRVNXBU5D7IJXA
```

### Inter-Contract Communication Pattern

The contract uses two persistent storage maps that act as an internal index:

- `CERTS` map: `cert_id → Certificate struct`
- `ISSUER_IDX` map: `issuer_address → Vec<cert_id>`

Both are updated atomically in `issue_certificate`, ensuring the issuer index is always consistent with the certificate store. TTL is extended to 100,000 ledgers on every write.

### Event Streaming

The contract emits two event types consumable via Horizon event streaming:

```rust
env.events().publish((CERT_ISSUED, issuer), id);   // on issue
env.events().publish((CERT_REVOKED, caller), id);  // on revoke
```

These can be subscribed to via:
```
GET https://horizon-testnet.stellar.org/accounts/<ADDRESS>/effects
```

---

## Deployed Smart Contract

- **Network:** Stellar Testnet
- **Contract ID:** `CBZRJZYNDXYTRY2CVNLUQXG5NE2PHY6GNMBKBXBRX6HRVNXBU5D7IJXA`
- **Explorer:** https://stellar.expert/explorer/testnet/contract/CBZRJZYNDXYTRY2CVNLUQXG5NE2PHY6GNMBKBXBRX6HRVNXBU5D7IJXA
- **Deployed by:** `GCUJLHIGC54I6TSTOEI2UMI6R6I2NRH77UT37HBHVCXLTR4UBVDAQLTI` (Saranya)

---

## Project Structure

```
steller-academic-certificates-Verification/
├── .github/
│   └── workflows/
│       └── ci.yml                # CI/CD — contract tests + frontend build
├── soroban-hello-world/          # Rust smart contract
│   ├── contracts/hello-world/
│   │   └── src/
│   │       ├── lib.rs            # CertChain contract (6 functions)
│   │       └── test.rs           # 6 contract tests
│   └── Cargo.toml
├── src/                          # Frontend source
│   ├── components/               # Navbar, CertificateCard, Spinner, TxStatus, EmptyState
│   ├── pages/                    # Home, IssueCertificate, VerifyCertificate, MyCertificates, SendXLM
│   ├── hooks/                    # useWallet (balance + connect/disconnect)
│   ├── lib/                      # stellar.ts, freighter.ts, wallets.ts (StellarWalletsKit)
│   └── utils/                    # helpers.ts
├── vercel.json                   # Production deployment config
├── .gitignore
├── package.json
├── index.html
└── README.md
```

---

## Smart Contract Functions

| Function | Description |
|---|---|
| `issue_certificate(id, student_name, course_name, institution_name, issue_date, hash, ipfs_cid, issuer)` | Issue a new certificate — permissionless |
| `verify_certificate(id)` | Verify and return a certificate by ID |
| `get_certificate(id)` | Fetch full certificate struct |
| `revoke_certificate(id, caller)` | Revoke — only original issuer can call |
| `certificate_exists(id)` | Boolean existence check |
| `get_issuer_certificates(issuer)` | List all cert IDs issued by a wallet |

---

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
## Demo Video


## Screenshots (Mobile Responsive UI)
<img width="487" height="771" alt="Screenshot 2026-08-10 215402" src="https://github.com/user-attachments/assets/f99dd0e8-f904-495f-8792-f1acd969a148" />
<img width="482" height="805" alt="Screenshot 2026-08-10 215453" src="https://github.com/user-attachments/assets/105402a3-940b-4cff-9bf2-ba863e6c56da" />

## CI/CD Pipeline
<img width="1893" height="525" alt="Screenshot 2026-08-10 215108" src="https://github.com/user-attachments/assets/aeaf7119-4124-46ac-a19b-222a8602fc09" />

## Contract Tests Passing
<img width="1408" height="557" alt="Screenshot 2026-08-10 205203" src="https://github.com/user-attachments/assets/21ddf5f8-01e2-4afe-af11-ffe8e795d3e4" />


## Usage

1. Install [Freighter](https://freighter.app) and set it to **Testnet**
2. Fund your account via [Friendbot](https://friendbot.stellar.org)
3. Click **Connect Wallet** in the navbar
4. **Issue Certificate** — fill the form, wallet signs, cert is stored on-chain
5. **Verify Certificate** — enter any Certificate ID to check authenticity
6. **My Certificates** — view and revoke certificates you issued
7. **Send XLM** — send XLM to any Stellar address on testnet

## Permissionless Design

- No owner, no admin, no whitelist
- Any wallet can issue certificates
- Any wallet can verify certificates
- Only the original issuer can revoke their own certificate (enforced on-chain: `cert.issuer == caller`)
- Wallet address is the only identity
