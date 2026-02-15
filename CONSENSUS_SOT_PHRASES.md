# Consensus Source of Truth (SOT) Phrases

This document contains canonical phrases for describing Silica's consensus architecture. These phrases should be used consistently across all website content (technology pages, blog posts, documentation) to prevent drift from the technical source of truth defined in `abft-fixes.md`.

## Core SOT Principles

### Ordering SOT
**Canonical phrase:**
> CommittedSubDag output from the linearizer is the only ordering truth. Lithification must not re-order.

**Usage context:** When describing how transaction ordering is determined in Silica.

**Key points:**
- The linearizer (Crystallite-like) produces deterministic CommittedSubDag sequences
- Lithification applies this ordering; it does not change or re-order transactions
- Same DAG structure = same ordering on all honest nodes

### Finality SOT
**Canonical phrase:**
> A block is final when it is committed by the DAG commit rule and finalized/applied locally. Certificates and receipts are proofs (reports), not gates.

**Usage context:** When describing finality and what makes a transaction permanent.

**Key points:**
- Finality is achieved through DAG structural commit + local application
- Certificates/receipts provide cryptographic proofs for monitoring and auditing
- Certificate aggregation does NOT gate finality (non-blocking for consensus)

### Consensus Pipeline
**Canonical description:**
> DA/Dissemination → Deterministic DAG Ordering/Commit → Lithification Apply → Monitoring/Recovery

**4-Stage breakdown:**
1. **DA / Dissemination (Alluvium):** Workers gossip transaction batches across the network
2. **Ordering / Commit (Crystallite + Linearizer):** DAG structural rules produce deterministic CommittedSubDag sequences
3. **Lithification Apply (Lithification):** Applies committed ordering to execution/storage, emits certificates
4. **Monitoring / Recovery (Cali / Arb):** Asynchronous verification and watchdog actions (non-gating)

## Layer Descriptions

### Alluvium Layer
**Purpose:** Data Availability & Dissemination

**Avoid saying:**
- "Alluvium orders transactions" ❌
- "Alluvium achieves consensus" ❌

**Correct descriptions:**
- "Alluvium disseminates transaction batches across the network"
- "Alluvium provides data availability through erasure-coded batches"
- "Workers gossip batches in a DAG structure"

### Crystallite Layer
**Purpose:** Deterministic DAG Ordering/Commit

**Avoid saying:**
- "Crystallite achieves finality" ❌
- "Crystallite is the finality layer" ❌
- "Crystallite orders using vote-based voting" ❌

**Correct descriptions:**
- "Crystallite provides deterministic DAG ordering using structural commit rules"
- "The linearizer applies Crystallite-like rules to produce CommittedSubDag sequences"
- "DAG commit rules ensure same ordering on all honest nodes"

### Lithification Layer
**Purpose:** Finality Apply & Safety

**Avoid saying:**
- "Lithification orders transactions" ❌
- "Lithification reorders blocks" ❌
- "Certificates gate finality" ❌
- "Lithification is the ordering layer" ❌

**Correct descriptions:**
- "Lithification validates, executes, and finalizes the committed ordering from the linearizer"
- "Lithification does not order; it validates certificates, executes blocks, and finalizes state"
- "Certificates provide cryptographic proofs of finalization"
- "Lithification ensures safety even under asynchronous network conditions"

### Cali (The Calibrator / Arb)
**Purpose:** Monitoring, Verification & Recovery (Non-Gating)

**Key points:**
- Verifies audit receipts and execution proofs asynchronously
- Detects Byzantine behavior and submits slashing evidence
- Can trigger recovery/restart procedures during stalls
- Does NOT gate ordering or finality (certificates/receipts are proofs, not gates)

## Common Mistakes to Avoid

### ❌ Incorrect: "Crystallite achieves finality"
**Why wrong:** Finality is achieved by DAG commit + local apply, not by Crystallite alone.

**✅ Correct:** "Finality is achieved when blocks are committed by the DAG rule and applied locally. Crystallite provides the deterministic ordering that feeds into finality."

### ❌ Incorrect: "Validators vote to order transactions"
**Why wrong:** Lithification does not order; it validates certificates, executes blocks, and finalizes state.

**✅ Correct:** "Lithification validates, executes, and finalizes the committed ordering from the linearizer."

### ❌ Incorrect: "Certificates must be aggregated before a block is final"
**Why wrong:** Certificates are proofs, not gates. Finality happens at commit + apply.

**✅ Correct:** "Blocks are final when committed and applied locally. Certificates provide cryptographic proofs for monitoring and recovery."

### ❌ Incorrect: "Alluvium provides transaction ordering"
**Why wrong:** Alluvium provides dissemination; ordering comes from the DAG linearizer.

**✅ Correct:** "Alluvium provides data availability by disseminating transaction batches. The linearizer produces deterministic ordering."

## When Describing Performance

### Finality Time
**Template:**
> Silica achieves sub-second finality. Blocks are final when committed by the DAG rule and applied locally (typically 0.8–1.5s). Pre-final indicators can be shown earlier (100–300ms) for UX purposes.

**Key point:** Distinguish between "pre-final UX signal" and "true finality."

### Throughput
**Template:**
> Silica targets [X]+ TPS through parallel DAG processing and efficient batch propagation. Performance metrics may evolve as the network optimizes.

**Key point:** Always include disclaimer that numbers may change.

## Updating This Document

This document should be updated whenever:
- The technical SOT in `abft-fixes.md` changes
- New consensus features are added
- Terminology is clarified or revised

**Last Updated:** 2025-12-19
**Based on:** `/abft-fixes.md` (Sources of Truth section)
