#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, symbol_short, vec, Env, Map, String, Symbol, Vec,
};

// ── Data model ────────────────────────────────────────────────────────────────

#[contracttype]
#[derive(Clone)]
pub struct Certificate {
    pub id: String,
    pub student_name: String,
    pub course_name: String,
    pub institution_name: String,
    pub issue_date: String,
    pub hash: String,
    pub ipfs_cid: String, // empty string when not provided
    pub issuer: String,   // Stellar public key (G…)
    pub revoked: bool,
}

// Storage keys
const CERTS: Symbol = symbol_short!("CERTS");
const ISSUER_IDX: Symbol = symbol_short!("ISSRIDX");

// Events
const CERT_ISSUED: Symbol = symbol_short!("ISSUED");
const CERT_REVOKED: Symbol = symbol_short!("REVOKED");

// ── Contract ──────────────────────────────────────────────────────────────────

#[contract]
pub struct CertChainContract;

#[contractimpl]
impl CertChainContract {
    /// Issue a new certificate. Completely permissionless — any wallet may call this.
    /// `issuer` must match the transaction source account (enforced off-chain via Freighter).
    pub fn issue_certificate(
        env: Env,
        id: String,
        student_name: String,
        course_name: String,
        institution_name: String,
        issue_date: String,
        hash: String,
        ipfs_cid: String,
        issuer: String,
    ) {
        // Reject duplicate IDs
        let mut certs: Map<String, Certificate> = env
            .storage()
            .persistent()
            .get(&CERTS)
            .unwrap_or(Map::new(&env));

        assert!(!certs.contains_key(id.clone()), "certificate id already exists");

        let cert = Certificate {
            id: id.clone(),
            student_name,
            course_name,
            institution_name,
            issue_date,
            hash,
            ipfs_cid,
            issuer: issuer.clone(),
            revoked: false,
        };

        certs.set(id.clone(), cert);
        env.storage().persistent().set(&CERTS, &certs);
        env.storage().persistent().extend_ttl(&CERTS, 100_000, 100_000);

        // Update issuer index: issuer → Vec<cert_id>
        let mut idx: Map<String, Vec<String>> = env
            .storage()
            .persistent()
            .get(&ISSUER_IDX)
            .unwrap_or(Map::new(&env));

        let mut issuer_certs: Vec<String> = idx
            .get(issuer.clone())
            .unwrap_or(vec![&env]);

        issuer_certs.push_back(id.clone());
        idx.set(issuer.clone(), issuer_certs);
        env.storage().persistent().set(&ISSUER_IDX, &idx);
        env.storage().persistent().extend_ttl(&ISSUER_IDX, 100_000, 100_000);

        env.events().publish((CERT_ISSUED, issuer), id);
    }

    /// Revoke a certificate. Only the original issuer may revoke their own certificate.
    pub fn revoke_certificate(env: Env, id: String, caller: String) {
        let mut certs: Map<String, Certificate> = env
            .storage()
            .persistent()
            .get(&CERTS)
            .unwrap_or(Map::new(&env));

        let mut cert = certs.get(id.clone()).expect("certificate not found");
        assert!(cert.issuer == caller, "only the original issuer can revoke");
        assert!(!cert.revoked, "certificate already revoked");

        cert.revoked = true;
        certs.set(id.clone(), cert);
        env.storage().persistent().set(&CERTS, &certs);
        env.storage().persistent().extend_ttl(&CERTS, 100_000, 100_000);

        env.events().publish((CERT_REVOKED, caller), id);
    }

    /// Fetch a certificate by ID. Returns the full Certificate struct.
    pub fn get_certificate(env: Env, id: String) -> Certificate {
        let certs: Map<String, Certificate> = env
            .storage()
            .persistent()
            .get(&CERTS)
            .unwrap_or(Map::new(&env));

        certs.get(id).expect("certificate not found")
    }

    /// Returns true if a certificate with the given ID exists.
    pub fn certificate_exists(env: Env, id: String) -> bool {
        let certs: Map<String, Certificate> = env
            .storage()
            .persistent()
            .get(&CERTS)
            .unwrap_or(Map::new(&env));

        certs.contains_key(id)
    }

    /// Verify a certificate — returns the certificate (same as get_certificate, kept for ABI clarity).
    pub fn verify_certificate(env: Env, id: String) -> Certificate {
        Self::get_certificate(env, id)
    }

    /// Return all certificate IDs issued by a given wallet address.
    pub fn get_issuer_certificates(env: Env, issuer: String) -> Vec<String> {
        let idx: Map<String, Vec<String>> = env
            .storage()
            .persistent()
            .get(&ISSUER_IDX)
            .unwrap_or(Map::new(&env));

        idx.get(issuer).unwrap_or(vec![&env])
    }
}

mod test;
