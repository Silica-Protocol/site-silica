# Consensus Source of Truth (SOT) Phrases

This document contains canonical phrases for describing Silica's current consensus architecture. These phrases should be used consistently across website content, blog posts, explainer docs, and architecture summaries.

## Canonical definition

### Alluvium definition SOT
**Canonical phrase:**
> Alluvium is Silica's data plane: the Narwhal-inspired layer for transaction admission, batching, and payload dissemination into consensus.

**Key points:**
- Alluvium owns ingress, batching, and dissemination language.
- Narwhal inspiration belongs here, not on Tephra.
- Alluvium feeds payloads into the consensus layer; it does not decide final order.

### Tephra definition SOT
**Canonical phrase:**
> Tephra is Silica's consensus and ordering layer: a gossip-about-gossip hashgraph that reconstructs a shared event DAG at every honest node and derives deterministic order locally through structural rules and virtual voting.

**Usage context:** Use this when introducing Tephra as the ordering/consensus layer.

**Key points:**
- Tephra is the live ordering/consensus system name.
- Tephra consumes Alluvium-fed payloads and consensus metadata.
- Every honest node computes the same order from the same event DAG.
- Extra vote messages are minimized because virtual voting is computed locally from gossip history.

### Crystallite definition SOT
**Canonical phrase:**
> Crystallite is Silica's execution/apply layer: it executes committed Tephra order in deterministic lanes and applies the result locally.

**Key points:**
- Crystallite is where execution/apply language belongs.
- Crystallite does not invent ordering; it applies Tephra order.

### Lithification definition SOT
**Canonical phrase:**
> Lithification is Silica's proof/checkpoint layer: it packages finalized state transitions into anchors, certificates, receipts, and replay-friendly checkpoints.

**Key points:**
- Lithification is where finality-proof and checkpoint language belongs.
- Lithification reports and packages the finalized result; it does not invent order.

### Ordering SOT
**Canonical phrase:**
> Tephra consensus order is the only ordering truth. Crystallite applies Tephra order; it does not invent a new one.

**Usage context:** When describing how transactions become ordered before execution.

**Key points:**
- Same event DAG = same ordered proposals on all honest nodes.
- Ordering comes from Tephra's event graph, witness/round logic, and virtual voting.
- Execution lanes preserve that order when applying state transitions.

### Finality SOT
**Canonical phrase:**
> A block is final when Tephra order is committed and applied locally by Crystallite. Lithification packages anchors, certificates, and receipts as proofs and checkpoints, not independent ordering authorities.

**Usage context:** When describing finality, permanence, or auditability.

**Key points:**
- Execution/apply language belongs to Crystallite.
- Proof/checkpoint/finality packaging language belongs to Lithification.
- Local apply finalizes the ordered result.
- Anchors, proofs, and receipts support audit, monitoring, replay, and recovery.

## Canonical pipeline

**Canonical description:**
> Alluvium batching & dissemination → Tephra gossip-sync / event DAG / ordering → Crystallite execution apply → Lithification proofs & checkpoints → Cali monitoring & recovery.

**5-stage breakdown:**
1. **Alluvium:** Transactions are admitted, batched, and disseminated into consensus.
2. **Tephra sync:** Peers exchange unknown events and record who saw what.
3. **Tephra ordering:** Virtual voting and structural rules compute a shared proposal order.
4. **Crystallite:** Ordered proposals are executed in deterministic lanes and applied locally.
5. **Lithification:** Anchors, certificates, receipts, and finalized checkpoints package the result.
6. **Cali:** Health telemetry and watchdog systems support audit and restart safety.

## Influence wording

These phrases are acceptable when explaining influences, but they must be framed as influences rather than live subsystem names.

### Narwhal / Bullshark
**Correct descriptions:**
- "Alluvium is the Narwhal-inspired batching and dissemination layer."
- "Tephra is informed by DAG-based ordering research and virtual-voting hashgraph ideas."

**Avoid saying:**
- "Bullshark is the live Silica consensus protocol" ❌
- "Narwhal is Tephra" ❌

### TigerBeetle
**Correct descriptions:**
- "TigerBeetle influences Silica's engineering discipline: bounded queues, batching, deterministic hot paths, and fail-fast correctness checks."
- "TigerBeetle is an implementation influence, not the consensus algorithm itself."

**Avoid saying:**
- "Silica uses TigerBeetle-style consensus" ❌
- "TigerBeetle determines network ordering/finality" ❌

## Historical terminology guidance

Older research notes may use these names inconsistently. The current canonical meaning is:

- **Alluvium** = ingress / batching / dissemination
- **Tephra** = ordering / consensus
- **Crystallite** = execution apply
- **Lithification** = proofs / checkpoints / finality packaging
- **Cali** = monitoring / recovery

## Common mistakes to avoid

### ❌ Incorrect: "Tephra is the Narwhal-inspired batching layer"
**Why wrong:** Narwhal-style batching/dissemination belongs to Alluvium.

**✅ Correct:** "Alluvium is the Narwhal-inspired data plane; Tephra is the ordering layer above it."

### ❌ Incorrect: "Crystallite is Silica's current ordering engine"
**Why wrong:** Current ordering is Tephra ordering derived from the event DAG.

**✅ Correct:** "Tephra derives deterministic ordering locally from gossip-about-gossip history and virtual voting; Crystallite applies that order."

### ❌ Incorrect: "TigerBeetle consensus powers Silica"
**Why wrong:** TigerBeetle informs implementation discipline, not network consensus semantics.

**✅ Correct:** "Silica borrows TigerBeetle-style engineering discipline for batching, deterministic hot paths, and bounded resource use."

### ❌ Incorrect: "Lithification decides ordering"
**Why wrong:** Ordering comes from Tephra; Lithification only packages the finalized result.

**✅ Correct:** "Tephra decides order; Crystallite applies it; Lithification packages the proofs and checkpoints."

## Performance language

### Finality time
**Template:**
> Silica targets sub-second deterministic finality. Blocks are final when Tephra order is committed and applied locally by Crystallite. Lithification packages the resulting proofs and checkpoints. User-facing pre-final indicators may appear earlier for UX purposes.

### Throughput
**Template:**
> Silica targets high throughput through Alluvium batching, Tephra ordering, Crystallite execution, and Lithification checkpoints. Published metrics may evolve as the network is optimized.

## Updating this document

Update this document whenever:
- Tephra ordering/finality semantics change
- Naming around anchors, proofs, or recovery changes
- Historical terminology needs clearer migration guidance

**Last Updated:** 2026-03-30
**Current Basis:** `protocol/src/consensus/hashgraph/*`, `docs/abft_refactoring_runsheet.md`, and `protocol/docs/ARCHITECTURE.md`
