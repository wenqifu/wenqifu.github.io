---
layout: page
title: GradES
description: Gradient-based early stopping for efficient transformer fine-tuning. Achieves 1.70–1.77× faster full-parameter fine-tuning at neutral accuracy on Qwen3-0.6B, Llama-3.1-8B, and Qwen3-14B.
img:
importance: 1
category: research
---

GradES is a gradient-based early stopping algorithm that individually freezes transformer components when their gradients fall below a convergence threshold, rather than halting all parameters simultaneously. On Qwen3-0.6B, Llama-3.1-8B, and Qwen3-14B it speeds up full-parameter fine-tuning by 1.70–1.77× at accuracy within run-to-run variance of standard fine-tuning. Under review at AAAI 2027.

[arXiv Paper](https://arxiv.org/abs/2509.01842)
