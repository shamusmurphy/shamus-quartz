---
title: Foundations of Secure Aggregation
date: 2026-02-19
tags:
  - cryptography
  - privacy
  - research
  - python
---

# Secure Aggregation in PyChor

> **Research Experience for Undergraduates (REU), Cryptographic Protocols**, January 2026 – May 2026
> With another student and under the supervision of my professor, I implemented a secure aggregation protocol in **PyChor**, a choreographic programming library for Python.

This project was my first deep dive into where **distributed systems** and **cryptography** meet. After working on differential privacy in [[Differentially Diagnosed]], I wanted to explore a different question: how can a server compute a global sum over decentralized data without ever seeing any single person's contribution?

## The Problem
Suppose $n$ clients each hold a private value $x_i$. The server wants

$$S = \sum_{i=1}^{n} x_i$$

but must learn **nothing** about any individual $x_i$ beyond what the sum itself reveals. This is the core building block of privacy-preserving **federated learning**, where the $x_i$ are model updates trained on users' devices.

## Pairwise Masking
The protocol uses **pairwise masks** that cancel out when everything is added up.

1. Each pair of clients $(u, v)$ runs a **Diffie–Hellman key exchange** to agree on a shared secret.
2. They use that secret to seed a **cryptographically secure PRG** and expand it into a mask $s_{uv}$.
3. Client $u$ adds $s_{uv}$ to its value, and client $v$ subtracts it:

$$y_u = x_u + \sum_{v > u} s_{uv} - \sum_{v < u} s_{vu}$$

4. The server only ever sees the masked values $y_u$, each of which looks uniformly random. When it adds them all, every $+s_{uv}$ meets its matching $-s_{uv}$, and only the true sum $S$ is left.

The server can watch the key exchange, but it never learns the shared secrets, so it can't remove any individual mask.

## Why Choreographic Programming?
Protocols like this are usually written as separate programs for the client and the server, and a send on one side has to match a receive on the other. Those mismatches are a common source of bugs and deadlocks.

**Choreographic programming** reverses this approach. You write **one global program** (the *choreography*) that describes the whole interaction, such as "client $u$ sends its public key to client $v$", and the library *projects* it into the local code each party actually runs. Since sends and receives are written together in one place, they can't fall out of sync. That made PyChor a good fit for reasoning about a multi-party protocol whose correctness depends on every message arriving where it should.

## What I Built
* **Version 1, no dropouts:** pairwise masking with Diffie–Hellman key agreement and PRG-expanded masks, written as a PyChor choreography. If every client submits, the masks cancel and the server recovers exactly $S$.
* **Correctness:** we verified that the protocol is correct **up to the client-dropout phase**, using choreography-based abstractions for secure distributed computation.

## Dropouts and Shamir's Secret Sharing
The first version is efficient but fragile. If even one client goes offline after the masks are set up, its partners' masks never cancel, and the "orphaned" masks hide the sum.

The fix, from Bonawitz et al.'s *Practical Secure Aggregation for Privacy-Preserving Machine Learning* (2017), is to have each client split its key material with **Shamir's Secret Sharing**:
* A secret is encoded as a random polynomial of degree $t-1$, and each client receives one point on it.
* Any $t$ points recover the secret, while fewer than $t$ reveal nothing.
* If a client drops out, the surviving clients send the server their shares of the dropped client's mask secrets. The server can then reconstruct and remove the orphaned masks, but still can't unmask anyone who stayed online.

## Status
Adding Shamir sharing and the dropout-recovery round to the choreography was the planned next stage, and **it isn't finished yet**. The REU ended with the no-dropout version working and verified. I may pick the dropout phase back up in the coming weeks, and I'll update this page if I do.

## What I Took Away
* The tension between **robustness and privacy** shows up everywhere. Every mechanism that helps the protocol survive failures also gives the server more information, and that has to be bounded carefully.
* Writing the protocol as a choreography made the communication pattern explicit, and it made the security argument easier to follow too.
