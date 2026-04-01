---
title: Foundations of Secure Aggregation
date: 2026-02-19
tags:
  - cryptography
  - privacy
  - research
  - python
---

# Secure Aggregation: The 1-Server Model

This project marks my first deep dive into the intersection of **distributed systems** and **cryptography**. After spending time on local differential privacy, I wanted to explore how we can compute global sums from decentralized data without the server ever seeing individual contributions.

## Pairwise Masking
The goal of this protocol is to allow a server to compute the sum $S = \sum x_i$ for all users $i$, while ensuring that $x_i$ remains private. This implementation relies on **pairwise** masking to function.


### How it Works
In a world without dropouts, the math is elegantly simple. For every pair of users $(u, v)$, they agree on a random seed via a **Diffie-Hellman Key Exchange** to generate a shared secret $s_{uv}$. 
* User $u$ adds $s_{uv}$ to their value.
* User $v$ subtracts $s_{uv}$ from their value.

When the server aggregates all masked values, the pairwise masks $s_{uv}$ and $-s_{uv}$ cancel each other out, leaving only the true sum.

## Implementation
* **One-Time Pads**: I used cryptographically secure pseudorandom generators (CSPRNGs) to create the masks.
* **Diffie-Hellman**: Implemented the key exchange to ensure the server cannot learn the masks even if it snoops on the communication.
* **The "No-Dropout" Constraint**: This implementation is highly efficient but fragile; if even one user fails to submit their masked value, the masks do not cancel out, and the aggregate sum remains obscured by the remaining "orphaned" masks.

## Progression
This served as the prototype for my more advanced work. Understanding the limitations of this "honest-but-curious" server model led directly to my current research into handling active dropouts using **Shamir's Secret Sharing**.