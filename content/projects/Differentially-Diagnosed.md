---
title: Differentially Diagnosed
date: 2024-12-19
tags:
  - machine-learning
  - privacy
  - python
---

# Differentially Diagnosed

> This is my most techincal project to date. I created it for my CS3110 class Data Privacy's final project. It is the longest I have spent on the project and I am still continously working on it trying to obtain better accuracy and more in-depth analysis.

## Languages, Frameworks, and Algorithms
* **Language:** [[Python]]
* **Frameworks:** [[PyTorch]], [[Opacus]]
* **Algorithm:** Differentially Private Stochastic Gradient Descent (DP-SGD)

## How it works
Standard neural networks can often "memorize" their training data, which is a major risk for medical records (HIPAA compliance).

In this project, I used **DP-SGD**, which modifies the standard learning process in two ways:
1.  **Gradient Clipping:** It caps the maximum influence any single training example can have on the model.
2.  **Noise Injection:** It adds random statistical noise to the gradients during backpropagation.

### Trade-off
The core challenge of this project was balancing **Privacy** (epsilon) vs **Accuracy**.
* Too much noise = The model learns nothing (random guessing).
* Too little noise = The model might leak patient data.

## Results
Using a synthetic diabetes dataset, I was able to achieve a classification accuracy comparable to a non-private model, proving that sensitive medical data can be used for ML training without compromising patient confidentiality.

## Look at the Code
Here is the link to the repository on github. (Repository)[https://github.com/shamusmurphy/dp-medical-test-classifier]