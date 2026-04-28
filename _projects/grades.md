---
layout: page
title: GradES
description: Gradient-based early stopping for efficient transformer fine-tuning. Achieves 1.57–7.22× speedup with 1.2% accuracy gain on Llama-3.1-8B and Qwen3-14B.
img:
importance: 1
category: research
---

GradES is a gradient-based early stopping algorithm that individually freezes transformer components when their gradients fall below a convergence threshold, rather than halting all parameters simultaneously. Tested on Llama-3.1-8B, Qwen3-0.6B, and Qwen3-14B.

[arXiv Paper](https://arxiv.org/abs/2509.01842)
