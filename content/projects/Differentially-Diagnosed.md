---
title: Differentially Diagnosed
date: 2024-12-19
tags:
  - machine-learning
  - privacy
  - python
---

# Differentially Diagnosed

> [!abstract] Overview
> A neural network designed to diagnose diabetes using patient data while preserving individual privacy. This project implements **Stochastic Gradient Descent (SGD)** with **Differential Privacy (DP)** to ensure the model learns general patterns without memorizing specific patient records.

## ⚙️ The Tech Stack
* **Language:** [[Python]]
* **Frameworks:** [[PyTorch]], [[Opacus]] (Meta's library for training private models)
* **Algorithm:** Differentially Private Stochastic Gradient Descent (DP-SGD)

## 🔍 How it Works
Standard neural networks can often "memorize" their training data, which is a major risk for medical records (HIPAA compliance).

In this project, I used **DP-SGD**, which modifies the standard learning process in two ways:
1.  **Gradient Clipping:** It caps the maximum influence any single training example can have on the model.
2.  **Noise Injection:** It adds random statistical noise to the gradients during backpropagation.

### The Trade-off
The core challenge of this project was balancing **Privacy** (epsilon) vs **Accuracy**.
* Too much noise = The model learns nothing (random guessing).
* Too little noise = The model might leak patient data.

## 📊 Results
Using a synthetic diabetes dataset, I was able to achieve a classification accuracy comparable to a non-private model, proving that sensitive medical data can be used for ML training without compromising patient confidentiality.
