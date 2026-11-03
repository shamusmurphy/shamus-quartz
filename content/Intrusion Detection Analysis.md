---
title: Intrusion Detection Analysis
date: 2026-03-28
tags:
  - data-science
  - cybersecurity
  - machine-learning
  - python
---

# Network Intrusion Detection on CIC-IDS2017

> Final project for **CS 3870 – Data Science Pinnacle**. I led a team of three building an intrusion detection system with random forests and gradient boosting.
> **Stack:** Python, pandas, NumPy, scikit-learn, LightGBM

The **CIC-IDS2017** dataset is a standard benchmark for intrusion detection. It mixes benign traffic with common attacks (DoS, DDoS, brute force, web attacks such as XSS, and more), and that makes it a lot closer to real-world network data than older benchmarks. We used the parquet version from Kaggle because it downloads faster and loads more efficiently than the raw CSVs.

## Goals
1. **Detection:** decide whether a network flow is benign or an attack (binary classification).
2. **Identification:** if it is an attack, decide *which* attack it is (multiclass classification).
3. **Interpretation:** work out which traffic features drive these decisions.

## Data Cleaning
The raw data needed a lot of work before any model could use it:
* **2.2 million network flows** to start with.
* **Removed ~82K duplicate records**, so that identical flows could not end up in both the training and test sets and make our scores look better than they were.
* **Handled infinite flow-rate values.** Rate features such as bytes/s and packets/s become infinite when a flow's duration is zero, so we had to deal with them explicitly.
* **Removed redundant features**, cutting **78 raw columns down to 60 features**.

For the binary task, we encoded the `Label` column as `0` for benign traffic and `1` for any attack.

## Model 1: Random Forest (Binary Detection)
We trained a random forest to separate benign traffic from attacks and evaluated it on **~446K held-out flows**:

| Metric | Attack class |
|---|---|
| Recall | **0.97** |
| Precision | **1.00** |

In practice this means the model catches 97% of attacks and almost never flags benign traffic as malicious. A low false-positive rate matters in real deployments, because analysts quickly start ignoring a noisy IDS. We also looked at the features the forest relied on most when splitting, to see which properties of the traffic actually separate attacks from normal behavior.

## Model 2: Weighted LightGBM (14-Way Attack Identification)
Next we built a **LightGBM** classifier that labels each flow as one of 14 classes. This task is much harder, because the class distribution is extremely skewed. Most traffic is benign, and some attack types have only a handful of examples.

To deal with this, we **weighted the classes** so the model could not get a good loss just by predicting the majority classes. The classifier reached **0.97–1.00 F1** on:
* DoS
* DDoS
* FTP and SSH brute force

## Takeaways
* **Cleaning mattered as much as modeling.** Duplicates and infinite values in CIC-IDS2017 can quietly inflate results if you don't handle them.
* **Class imbalance is the core difficulty.** Binary detection is fairly easy at this point. Reliably identifying *rare* attack types is the open problem.
* This project ties into my broader interest in [[Cybersecurity]] and pairs well with my privacy work in [[Differentially Diagnosed]], where I approached machine learning from the opposite direction, protecting the data rather than defending the network.
