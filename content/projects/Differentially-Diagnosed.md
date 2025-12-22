---
title: Differentially Diagnosed
date: 2024-12-19
tags:
  - machine-learning
  - privacy
  - python
---

# Differentially Diagnosed

> This is my most techincal project to date. I created it for my CS3110 class Data Privacy's final project. It is the longest I have spent on the project and I am still continously working on it trying to obtain better accuracy and more in-depth analysis. The jupyter notebook in the github repository has more explanations, but here I will give a brief synopsis along with some analysis.

## Why Did I Make This?
For the Data Privacy final project, us students had many different options to choose from. I could have submitted an entry to Open-DP's real world implementations of differential privacy, analyzed a current deployment of it, or take a new dataset and implement different variants of differential privacy. But as I progressed through this class I began to notice that I was doing further reading after every class and became very intrigued by differential privacy. It was at that moment I decided to go above and beyond for this project.


## How It Worked (Initially)
The original neural network that I submitted for my final project is three layers and it acheived an accuracy a little above **90%**. I trained it using stochastic gradient descent with a learning rate of **0.1**, a momentuam value of **0.9**, and **50** epochs. The data set contains **100,000** rows and my mini-batch size was **64** with shuffling enabled. 

The highest **epsilon value ($\boldsymbol{\epsilon}$)** I tested was **9.30** and the lowest was **0.33**. With the higher epsilon value, the model accuracy changed by a little more than **1%**, and the lower accuracy dropped **>10%**. Below I have the graph showing the differences in accuracy compared to epsilon values. (Need to insert this)

## Current Structure
I am currently reworking the project now that the semester is over to be a four layer neural network with a mini batch size of **265**. I also added a dropout rate of **0.2** which has helped with the accuracy. I am going to analyze the affects of different noise multipliers thoroughly and attached to this will be a nice paper by the end of winter break so stay tuned.

This current structure is affecting the differentially private accuracy quite a bit. I think the drop off in accuracy is greater because of the larger batch size. Adding noise to more rows of the 

## Further Ideas
Something I've been thinking about is adding another level to this project. From the initial dataset, I dropped the column `diabetes stage`. What I am thinking about now is having another target column determining a patients diabetes stage based on the original features, and if they are diagnosed. 

## Look at the Code
Here is the link to the repository on github. [Repository](https://github.com/shamusmurphy/dp-medical-test-classifier)