---
title: Intrusion Detection Analysis
date: 2026-03-28
tags:
  - data-science
  - cybersecurity
  - machine-learning
  - python
---

# Analyzing Network Traffic: The CIC-IDS2017 Dataset

For my Data Science final project, I am performing an in-depth analysis of the **CIC-IDS2017 dataset**. This dataset is crucial for modern cybersecurity as it contains benign traffic and the most up-to-date common attacks, which resembles true real-world data.


## Project Objectives
The aim is to build a classifier that can accurately distinguish between normal network behavior and malicious activities like DDoS, Brute Force, and XSS attacks.
* **Data Preprocessing**: Using **pandas** and **numpy** to clean the 2.8 million records and handle missing values.
* **Feature Engineering**: Identifying which network features (flow duration, packet length, etc.) are the strongest indicators of an intrusion.
* **Model Selection**: Testing various discrete math and probability-based approaches alongside standard machine learning classifiers.

## Challenges
One of the challenges with the CIC-IDS2017 set is the heavy class imbalance. Most traffic is benign, so I am exploring different sampling techniques to ensure the model doesn't overlook the rare, but high-risk, attack vectors.