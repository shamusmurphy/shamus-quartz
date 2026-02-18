---
title: Well-Ordering-Principle
date: 2026-01-19
draft: false
tags:
  - numbertheory
  - math
---
The well-ordering-principle for $\mathbb{N}$ is every nonempty subset of the positive integers has a least element.

Well ordering is equivalent to the **first principle of induction**:
	Let $S\subseteq\mathbb{N}\text{ such that}$
		a) $1\in S$ <-- Base Case
		b) $\text{if }k\in S\implies k+1$ <-- inductive step
		Then $S=\mathbb{N}$ <-- inductive hypothesis

$\forall n\in\mathbb{N},\text{let }P(n)\text{ be a proposition}$
**Claim:** $\forall n\in\mathbb{N},\space P(n) \text{ is true.}$
This is equivalent to the following statement:
	$\text{Let }S=\{ n\in\mathbb{N}:P(n)\text{ is true} \}$
	Claim: $S=\mathbb{N}$

