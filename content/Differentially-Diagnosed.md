---
title: Differentially Diagnosed
date: 2024-12-19
tags:
  - machine-learning
  - privacy
  - python
---

# Differentially Diagnosed: Privacy and Utility Tradeoffs in Medical Risk Prediction

> Final project for **CS 3110 – Data Privacy**. I trained a differentially private neural network to predict diabetes, then measured how much accuracy the model gives up as the privacy guarantee gets stronger.
> **Stack:** Python, PyTorch, Opacus

## Why I Made This
The Data Privacy final project had several options. We could contribute to OpenDP's collection of real-world differential privacy deployments, analyze an existing deployment, or take a new dataset and apply differential privacy to it ourselves. As the semester went on, I kept doing extra reading after every class because I found differential privacy so interesting, so I picked the hands-on option and decided to go well beyond the minimum.

Medical data was a natural fit. A diabetes risk model is only useful if it is trained on real patient records, and those are exactly the records that should never leak.

## The Setup
* **Dataset:** a medical dataset with **100,000 records**. The target is whether a patient has diabetes.
* **Avoiding leakage:** I removed columns that would leak the target, such as `diabetes stage`, which already tells you whether a patient has been diagnosed.
* **Baseline model:** a three-layer neural network trained with SGD (learning rate **0.1**, momentum **0.9**, **50** epochs, mini-batch size **64** with shuffling). It reached **90.4%** accuracy without any privacy.
* **Private model:** the same network trained with **DP-SGD** through [Opacus](https://opacus.ai), with $\delta = 10^{-5}$.

### How DP-SGD Works
In normal SGD, every training example's gradient feeds straight into the update, so a single unusual patient can noticeably move the model. DP-SGD limits that influence in two steps:
1. **Clip** each example's gradient to a maximum norm $C$, which bounds how much any one person can contribute.
2. **Add Gaussian noise** scaled by a *noise multiplier* $\sigma$ to the summed gradients before taking the step.

Opacus tracks how much privacy is spent over the whole training run and reports the resulting $(\varepsilon, \delta)$ guarantee. A smaller $\varepsilon$ means stronger privacy.

## Results
I swept the noise multiplier from **0.45 to 1.5**, which corresponds to **$\varepsilon$ from 9.3 down to 0.33**, and compared each run to the non-private baseline.

| Model | $\varepsilon$ | Accuracy | % of baseline |
|---|---|---|---|
| Non-private baseline | $\infty$ | **90.4%** | 100% |
| DP-SGD | 9.3 | ~89% | ~99% |
| DP-SGD | 1.45 | **88.6%** | **98%** |
| DP-SGD | 0.33 | **79.5%** | 88% |

**Key findings:**
* **Privacy costs very little at moderate $\varepsilon$.** At $\varepsilon = 1.45$, which is a fairly strong guarantee, the model keeps **98%** of the baseline accuracy.
* **There is a cliff.** Utility drops sharply once $\varepsilon$ goes **below about 0.5**, falling to 79.5% at $\varepsilon = 0.33$. Past that point the noise overwhelms the signal from the gradients.

So for this task there is a broad range where you can get meaningful privacy almost for free, but you can't push the guarantee arbitrarily far.

## Later Experiments
After the semester, I kept working on the project with a four-layer network, a dropout rate of **0.2**, and a much larger mini-batch size (**265**). Dropout helped the non-private accuracy, but the private accuracy fell further. My working explanation is that the batch size changes the sampling rate, and with it how much noise is needed for a given $\varepsilon$, so hyperparameters that work well without privacy don't automatically carry over to DP-SGD.

## Further Ideas
* **Predicting diabetes stage:** use the `diabetes stage` column I dropped as a second target. The task would become multiclass, and harder under DP noise.
* **Tuning with privacy in mind:** sweep batch size and clipping norm together with the noise multiplier, instead of reusing the hyperparameters from the non-private model.

## Code
The repository includes a Jupyter notebook with fuller explanations: [dp-medical-test-classifier](https://github.com/shamusmurphy/dp-medical-test-classifier)

Related: [[Foundations of Secure Aggregation]], a different approach to privacy-preserving computation, where the protection comes from cryptography instead of noise.
