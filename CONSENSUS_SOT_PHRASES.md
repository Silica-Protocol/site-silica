# Consensus Source of Truth (SOT) Phrases

This document contains canonical phrases for describing Silica's current consensus architecture. These phrases should be used consistently across website content, blog posts, explainer docs, and architecture summaries.

## Canonical definition

### Tephra definition SOT
**Canonical phrase:**
> Tephra is Silica's consolidated consensus fabric: a gossip-about-gossip hashgraph that carries transaction batch references and peer sync metadata, reconstructs a shared event DAG at every honest node, and derives deterministic order locally through structural rules and virtual voting.

**Usage context:** Use this when introducing Tephra or explaining what replaced the older Alluvium/Crystallite split.

**Key points:**
- Tephra is the live consensus system name.
- Tephra combines batching, gossip sync, causal history, ordering, and finality handoff into one fabric.
- Every honest node computes the same order from the same event DAG.
- Extra vote messages are minimized because virtual voting is computed locally from gossip history.

### Ordering SOT
**Canonical phrase:**
> Tephra consensus order is the only ordering truth. Execution applies Tephra order; it does not invent a new one.

**Usage context:** When describing how transactions become ordered before execution.

**Key points:**
- Same event DAG = same ordered proposals on all honest nodes.
- Ordering comes from Tephra's event graph, witness/round logic, and virtual voting.
- Execution lanes preserve that order when applying state transitions.

### Finality SOT
**Canonical phrase:**
> A block is final when Tephra order is committed and applied locally. Anchors, certificates, and receipts are proofs and checkpoints, not independent ordering authorities.

**Usage context:** When describing finality, permanence, or auditability.

**Key points:**
- Finality is not a separate branded subsystem anymore.
- Local apply finalizes the ordered result.
- Anchors, proofs, and receipts support audit, monitoring, replay, and recovery.

## Canonical pipeline

**Canonical description:**
> Transaction ingress & batching → Tephra gossip-sync / event DAG → virtual voting & deterministic ordering → execution apply → anchors, monitoring, and recovery.

**5-stage breakdown:**
1. **Ingress & batching:** Transactions are admitted, batched, and attached to Tephra events.
2. **Tephra gossip-sync:** Peers exchange unknown events and record who saw what.
3. **Deterministic ordering:** Virtual voting and structural rules compute a shared proposal order.
4. **Execution apply:** Ordered proposals are executed in deterministic lanes and applied locally.
5. **Anchors / recovery:** Proofs, checkpoints, and watchdog systems support audit and restart safety.

## Influence wording

These phrases are acceptable when explaining influences, but they must be framed as influences rather than live subsystem names.

### Narwhal / Bullshark
**Correct descriptions:**
- "Tephra retains Narwhal-style transaction batching and DAG-first dissemination ideas."
- "Tephra is informed by DAG-based ordering research, including Bullshark-era commit discipline."

**Avoid saying:**
- "Bullshark is the live Silica consensus protocol" ❌
- "Narwhal is a current Silica subsystem" ❌

### TigerBeetle
**Correct descriptions:**
- "TigerBeetle influences Silica's engineering discipline: bounded queues, batching, deterministic hot paths, and fail-fast correctness checks."
- "TigerBeetle is an implementation influence, not the consensus algorithm itself."

**Avoid saying:**
- "Silica uses TigerBeetle-style consensus" ❌
- "TigerBeetle determines network ordering/finality" ❌

## Historical terminology guidance

Older research notes may refer to **Alluvium** and **Crystallite**.

- Use those names only when explicitly describing historical designs or earlier research phases.
- When describing the current system, say that their responsibilities are now **consolidated into Tephra**.

**Practical mapping:**
- **Alluvium** maps most closely to transaction ingress, batching, and payload dissemination responsibilities.
- In the live design, those responsibilities are split between **Ingress & Batching** and **Tephra gossip sync**.
- **Crystallite** maps most closely to deterministic ordering/commit logic, which now lives inside **Tephra**.
- **Execution Apply** is a separate stage after consensus ordering; it is not a renamed Crystallite.

**Canonical historical bridge sentence:**
> Earlier Silica research split dissemination and ordering into Alluvium and Crystallite. The current implementation consolidates those responsibilities into Tephra.

## Common mistakes to avoid

### ❌ Incorrect: "Alluvium is Silica's current data layer"
**Why wrong:** That is historical terminology, not the current production-facing system name.

**✅ Correct:** "Silica now uses Tephra as the consolidated batching, gossip, and ordering fabric."

### ❌ Incorrect: "Crystallite is Silica's current ordering engine"
**Why wrong:** Current ordering is described as Tephra ordering derived from the event DAG.

**✅ Correct:** "Tephra derives deterministic ordering locally from gossip-about-gossip history and virtual voting."

### ❌ Incorrect: "TigerBeetle consensus powers Silica"
**Why wrong:** TigerBeetle informs implementation discipline, not network consensus semantics.

**✅ Correct:** "Silica borrows TigerBeetle-style engineering discipline for batching, deterministic hot paths, and bounded resource use."

### ❌ Incorrect: "Anchors or certificates decide ordering"
**Why wrong:** Ordering comes from Tephra. Anchors and certificates report or checkpoint the result.

**✅ Correct:** "Tephra decides order; anchors and proofs make the result auditable and recoverable."

## Performance language

### Finality time
**Template:**
> Silica targets sub-second deterministic finality. Blocks are final when Tephra order is committed and applied locally. User-facing pre-final indicators may appear earlier for UX purposes.

### Throughput
**Template:**
> Silica targets high throughput through aggressive batching, efficient gossip-sync, deterministic ordering, and parallel execution. Published metrics may evolve as the network is optimized.

## Updating this document

Update this document whenever:
- Tephra ordering/finality semantics change
- Naming around anchors, proofs, or recovery changes
- Historical terminology needs clearer migration guidance

**Last Updated:** 2026-03-30
**Current Basis:** `protocol/src/consensus/hashgraph/*`, `docs/abft_refactoring_runsheet.md`, and `protocol/docs/ARCHITECTURE.md`
