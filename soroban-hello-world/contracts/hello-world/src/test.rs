#![cfg(test)]

use super::*;
use soroban_sdk::{Env, String};

fn s(env: &Env, val: &str) -> String {
    String::from_str(env, val)
}

#[test]
fn test_issue_and_verify() {
    let env = Env::default();
    let contract_id = env.register(CertChainContract, ());
    let client = CertChainContractClient::new(&env, &contract_id);

    client.issue_certificate(
        &s(&env, "CERT-001"),
        &s(&env, "Alice"),
        &s(&env, "Blockchain 101"),
        &s(&env, "MIT"),
        &s(&env, "2024-01-01"),
        &s(&env, "abc123hash"),
        &s(&env, ""),
        &s(&env, "GD4M2QBEUC4VBI7EWDEJONRRXYR6GXBOKYW262CNJ26IQABJ47PXKEVC"),
    );

    assert!(client.certificate_exists(&s(&env, "CERT-001")));

    let cert = client.verify_certificate(&s(&env, "CERT-001"));
    assert_eq!(cert.student_name, s(&env, "Alice"));
    assert_eq!(cert.revoked, false);
}

#[test]
fn test_revoke() {
    let env = Env::default();
    let contract_id = env.register(CertChainContract, ());
    let client = CertChainContractClient::new(&env, &contract_id);

    let issuer = s(&env, "GD4M2QBEUC4VBI7EWDEJONRRXYR6GXBOKYW262CNJ26IQABJ47PXKEVC");

    client.issue_certificate(
        &s(&env, "CERT-002"),
        &s(&env, "Bob"),
        &s(&env, "Rust Programming"),
        &s(&env, "Udemy"),
        &s(&env, "2024-06-01"),
        &s(&env, "def456hash"),
        &s(&env, "QmSomeIPFSHash"),
        &issuer,
    );

    client.revoke_certificate(&s(&env, "CERT-002"), &issuer);

    let cert = client.get_certificate(&s(&env, "CERT-002"));
    assert_eq!(cert.revoked, true);
}

#[test]
fn test_get_issuer_certificates() {
    let env = Env::default();
    let contract_id = env.register(CertChainContract, ());
    let client = CertChainContractClient::new(&env, &contract_id);

    let issuer = s(&env, "GD4M2QBEUC4VBI7EWDEJONRRXYR6GXBOKYW262CNJ26IQABJ47PXKEVC");

    client.issue_certificate(
        &s(&env, "CERT-A"),
        &s(&env, "Carol"),
        &s(&env, "DeFi"),
        &s(&env, "Coursera"),
        &s(&env, "2024-03-01"),
        &s(&env, "hash-a"),
        &s(&env, ""),
        &issuer,
    );
    client.issue_certificate(
        &s(&env, "CERT-B"),
        &s(&env, "Dave"),
        &s(&env, "Web3"),
        &s(&env, "Coursera"),
        &s(&env, "2024-04-01"),
        &s(&env, "hash-b"),
        &s(&env, ""),
        &issuer,
    );

    let ids = client.get_issuer_certificates(&issuer);
    assert_eq!(ids.len(), 2);
}

#[test]
#[should_panic(expected = "certificate id already exists")]
fn test_duplicate_id_rejected() {
    let env = Env::default();
    let contract_id = env.register(CertChainContract, ());
    let client = CertChainContractClient::new(&env, &contract_id);

    let issuer = s(&env, "GD4M2QBEUC4VBI7EWDEJONRRXYR6GXBOKYW262CNJ26IQABJ47PXKEVC");

    client.issue_certificate(
        &s(&env, "CERT-DUP"),
        &s(&env, "Eve"),
        &s(&env, "Course"),
        &s(&env, "Inst"),
        &s(&env, "2024-01-01"),
        &s(&env, "hash"),
        &s(&env, ""),
        &issuer,
    );
    // Second call with same ID must panic
    client.issue_certificate(
        &s(&env, "CERT-DUP"),
        &s(&env, "Eve2"),
        &s(&env, "Course"),
        &s(&env, "Inst"),
        &s(&env, "2024-01-01"),
        &s(&env, "hash"),
        &s(&env, ""),
        &issuer,
    );
}

#[test]
#[should_panic(expected = "only the original issuer can revoke")]
fn test_wrong_issuer_cannot_revoke() {
    let env = Env::default();
    let contract_id = env.register(CertChainContract, ());
    let client = CertChainContractClient::new(&env, &contract_id);

    client.issue_certificate(
        &s(&env, "CERT-X"),
        &s(&env, "Frank"),
        &s(&env, "Course"),
        &s(&env, "Inst"),
        &s(&env, "2024-01-01"),
        &s(&env, "hash"),
        &s(&env, ""),
        &s(&env, "GD4M2QBEUC4VBI7EWDEJONRRXYR6GXBOKYW262CNJ26IQABJ47PXKEVC"),
    );

    // Different wallet tries to revoke — must panic
    client.revoke_certificate(
        &s(&env, "CERT-X"),
        &s(&env, "GDIFFERENTWALLETADDRESSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"),
    );
}
