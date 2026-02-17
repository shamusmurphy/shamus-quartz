---
title: Induction (Weak)
date: 2026-01-16
draft: false
tags:
  - lecture
  - numbertheory
  - math
---
Induction is considered the general proof method in mathematics.

### When to use it:
You have a statement to prove of the form:
		*"For Each positive integer $n$ or $n \geq 1$, the statement $P(n)$ is true."* 
		Where $P(n)$ is a function of $n$.
## **Format:**
**Base Case:** 
		Verify $P(1)$ is true.
	**Inductive Hypothesis:** 
		For some $m$, a positive integer, the statement $P(m)$ is true.
	**Inductive Step:**
		Using the inductive hypothesis and some reasoning, we can show that $P(m+1)$ is true.
#### Example:
$$\forall n\in \mathbb{N}:\sum_{k=1}^{n}k=\frac{n(n+1)}{2}$$
**Proof:** 
	**Base Case:** $n=1$ 
	$$\sum_{k=1}^{1}k=1=\frac{1(1+1)}{2}=\frac{1*2}{2}=1$$
	**Inductive Hypothesis:** Suppose that for some positive integer $m$, $$\sum_{k=1}^{m}k=\frac{m(m+1)}{2}$$
	**Inductive Step:** We wish to prove that 
	$$\sum_{k=1}^{m+1}k=\frac{(m+1)((m+1)+1)}{2}$$
	using the **Inductive Hypothesis** and some reasoning. 
		
		$$\sum_{k=1}^{m+1}k=\left( \sum_{k=1}^{m}k \right)+(m+1)=\frac{m(m+1)}{2}+(m+1)=(m+1)\left( \frac{m}{2}+1 \right)$$$$=(m+1)\left( \frac{m+2}{2} \right)=\frac{(m+1)((m+1)+1)}{2}$$
	as desired. This completes the proof by induction.$\blacksquare$