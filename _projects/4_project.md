---
layout: page
title: Reinforcement Learning for Autonomous Systems
description: Efficient learning with LLM-derived priors
img: assets/img/7.jpg
importance: 4
category: work
related_publications: true
---

This research focuses on developing efficient reinforcement learning algorithms for autonomous vehicle control and biomedical applications.

## Key Research Areas

### Cache-Efficient Posterior Sampling
Developed novel algorithms for reinforcement learning that leverage LLM-derived priors across both discrete and continuous domains:
- **Efficiency**: Reduced computational overhead through cache-efficient sampling
- **Generalization**: Unified approach works across diverse problem domains
- **LLM Integration**: Uses language models to provide structured priors for faster learning

**Publication**: Accepted to EMNLP 2025

### Sparse-Reward Learning
Investigating fundamental structures in reward functions that enable efficient learning in sparse-reward environments:
- Analysis of reward geometry and its impact on learning
- Novel entropy regularization techniques for geometry-aware learning
- Theoretical and empirical contributions

**Publications**: Submitted to ICLR 2026

### Applications

#### Autonomous Vehicle Control
- Decision-making in complex traffic scenarios
- Motion planning under uncertainty
- Safe exploration in safety-critical systems

#### Biomedical Engineering
Collaborated on reinforcement learning-guided control strategies for CAR T-cell activation and expansion:
- Optimized therapy parameters using RL
- Cellular simulation and modeling
- Published in **Biotechnology and Bioengineering** (2024)

## Technical Tools
- **Frameworks**: Ray RLlib, Stable Baselines3
- **Simulation**: CARLA, SUMO (for autonomous driving)
- **Programming**: Python, PyTorch

## Impact

These algorithms enable more sample-efficient learning in domains where data collection is expensive or dangerous, with applications ranging from autonomous vehicles to personalized medicine.
