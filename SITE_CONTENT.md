# SITE_CONTENT.md
# Single source of truth for wenqifu.github.io
# Edit this file, then say "sync" to Claude Code to update the website

---

## Config

```yaml
name: Qifu (Danny) Wen
email: qfwen@bu.edu
description: Visiting Researcher at Boston University. Efficient training, federated learning, sim-to-real robotics.
google_scholar: -YHHQvkAAAAJ
github: wenqifu
linkedin: danny-wen-51a567290
orcid: 0009-0009-8458-144X
twitter: # leave blank for now
```

---

## About

I am a visiting researcher in the [ML Group](https://www.bu.edu/cs/profiles/reza-rawassizadeh/) at [Boston University](https://www.bu.edu/cs/), advised by [Prof. Reza Rawassizadeh](https://www.bu.edu/cs/profiles/reza-rawassizadeh/). I completed my M.S. in Computer Science at BU (GPA: 3.83/4.00) and my B.S. in Mathematics at [NYU Shanghai](https://shanghai.nyu.edu/).

My research focuses on **efficient training of large models** — my recent work [GradES](https://arxiv.org/abs/2509.01842) achieves 1.2–1.57× faster LoRA fine-tuning of transformers by selectively freezing components at convergence. I also work on **federated learning** (gradient stable rank adaptive compression), **sim-to-real robotics** (OceanEnv marine simulation), and **HCI evaluation** of AI systems. I have a strong mathematical foundation in measure-theoretic probability, stochastic processes, and parameter estimation.

I am a reviewer for ICML. I am currently applying to PhD programs for Fall 2026.

Outside of my research, I enjoy playing basketball, hiking and playing rimworld.

Feel free to [reach out](mailto:qfwen@bu.edu) if you'd like to chat about research or collaboration!

---

## Publications

### J.1 - From Clicks to Conversations
- **Title:** From Clicks to Conversations: Evaluating the Effectiveness of Conversational Agents in Statistical Analysis
- **Authors:** Qifu Wen, Prerana Kochhar, Salma Zeyada, Tahereh Javaheri, Reza Rawassizadeh
- **Venue:** International Journal of Human-Computer Interaction
- **Publisher:** Taylor & Francis
- **Year:** 2025
- **Month:** October
- **Status:** published
- **DOI:** 10.1080/10447318.2025.2561760
- **URL:** https://doi.org/10.1080/10447318.2025.2561760
- **Abstract:** We compared conversational agents to traditional GUIs for statistical analysis through a user study with 51 participants. Conversational agents significantly outperformed GUI-based software on accuracy, completion time, and user satisfaction.
- **Preview:** statz.png
- **Selected:** true

### J.2 - Estimation of Distribution Parameters
- **Title:** Estimation of Distribution Parameters by Mean Absolute Deviations of a Truncated Distribution Using Quantile Functions
- **Authors:** Eugene Pinsky*, Qifu Wen* (co-first authors)
- **Venue:** Statistical Papers
- **Publisher:** Springer
- **Year:** 2026
- **Month:** February
- **Volume:** 67
- **Article:** 31
- **Status:** published
- **Abstract:** Novel parameter estimation method using mean absolute deviations around quartiles for truncated distributions without moments or variance, providing closed-form solutions comparable to MLE for Lévy, Cauchy, and Pareto distributions.
- **Preview:** estimate_distribution.png
- **Selected:** false

### C.1 - GradES
- **Title:** GradES: Significantly Faster Training in Transformers with Gradient-Based Early Stopping
- **Authors:** Qifu Wen, Xinyu Zeng, Ziyi Zhou, Shuwei Liu, Mahdi Hosseinzadeh, Ning Su, Reza Rawassizadeh
- **Year:** 2025
- **Status:** preprint
- **ArXiv:** 2509.01842
- **Note:** Targeting ICLR 2026
- **Abstract:** GradES is a gradient-based early stopping algorithm that individually freezes transformer components when their gradients fall below a convergence threshold. Achieves 1.2–1.57× faster LoRA fine-tuning on Llama-3.1-8B and Qwen3-14B.
- **Preview:** grades.png
- **Selected:** true

### C.2 - OceanEnv
- **Title:** One Ocean, All Tasks: A Holistic Simulation Environment for Marine Robotics
- **Authors:** Shuwei Liu, Qifu Wen, Xiang Chen, Xinyu Hu, Ning Su
- **Venue:** IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)
- **Year:** 2026
- **Status:** under review
- **Abstract:** OceanEnv is a modular framework unifying large-scale ocean data with simulation tools for 3-DOF and 6-DOF marine robotics training.
- **Selected:** false

### C.3 - GNN Compression
- **Title:** Pruning and Quantization Impact on Graph Neural Networks
- **Authors:** Kasra Khedri, Reza Rawassizadeh, Qifu Wen, Mahdi Hosseinzadeh
- **Venue:** Journal of Machine Learning Research
- **Year:** 2025
- **Status:** under review
- **ArXiv:** 2510.22058
- **Abstract:** Empirical evaluation of pruning and quantization compression techniques on graph neural networks across multiple tasks and datasets.
- **Preview:** graphic_pruning.png
- **Selected:** false

### C.4 - ECRL
- **Title:** Ensemble Variance as Exploration Regularization: A Predictive Diagnostic for Contrastive Reinforcement Learning
- **Authors:** Ziyi Zhou*, Qifu Wen*, Xinyu Zeng (co-first authors)
- **Venue:** Neural Information Processing Systems (NeurIPS)
- **Year:** 2026
- **Status:** under review
- **Abstract:** We propose using ensemble variance as an exploration regularization term and a predictive diagnostic in contrastive reinforcement learning settings.
- **Preview:** ecrl.png
- **Selected:** false

### C.5 - Pose as a Lens
- **Title:** Pose as a Lens: Diagnosing Self-Supervised Visual Representations Through Frozen Keypoint Probing
- **Authors:** Xinyu Zeng, Ziyi Zhou, Qifu Wen
- **Venue:** Neural Information Processing Systems (NeurIPS)
- **Year:** 2026
- **Status:** under review
- **Abstract:** We use human pose estimation as a self-supervised diagnostic probe to evaluate the quality of visual representations learned without labels.
- **Selected:** false

---

## News

2025-01-01 | Started as Visiting Researcher at Boston University ML Group.
2025-03-01 | [GradES preprint](https://arxiv.org/abs/2509.01842) released on arXiv — achieves 1.57–7.22× faster transformer fine-tuning.
2025-03-15 | OceanEnv submitted to **IROS 2026**.
2025-05-01 | Paper "Estimation of Distribution Parameters" accepted at _Statistical Papers_ (Springer).
2025-06-01 | Paper "[From Clicks to Conversations](https://doi.org/10.1080/10447318.2025.2561760)" published in _International Journal of Human-Computer Interaction_ (October 2025).
2026-02-01 | Paper "Estimation of Distribution Parameters" published in _Statistical Papers_ (Springer), Vol. 67, Article 31.
2026-05-01 | ECRL and Pose as a Lens submitted to **NeurIPS 2026**.

---

## Projects

### GradES
- **Description:** Gradient-based early stopping for efficient transformer fine-tuning. Achieves 1.57–7.22× speedup with 1.2% accuracy gain on Llama-3.1-8B and Qwen3-14B.
- **Category:** research
- **Importance:** 1
- **Content:**

GradES is a gradient-based early stopping algorithm that individually freezes transformer components when their gradients fall below a convergence threshold, rather than halting all parameters simultaneously. Tested on Llama-3.1-8B, Qwen3-0.6B, and Qwen3-14B.

[arXiv Paper](https://arxiv.org/abs/2509.01842)

### OceanEnv
- **Description:** A unified marine-robotics simulation environment integrating bathymetry, ocean physics, biodiversity, and pollution data for 3-DOF/6-DOF sim-to-real training.
- **Category:** research
- **Importance:** 2
- **Content:**

OceanEnv is a modular framework that unifies large-scale ocean data with advanced simulation tools for marine robotics training. Features PollutionModel3D for pollutant dynamics simulation and supports 3-DOF and 6-DOF robotic training scenarios.

Submitted to IROS 2026.

### LLM Orchestra
- **Description:** Multi-agent LLM system (v6.x) with Claude as orchestrator, five-mode operation, and structured state management. Built Paper Forge academic writing system on top.
- **Category:** tools
- **Importance:** 3
- **Content:**

Multi-agent LLM system (v6.x) with Claude as orchestrator, five-mode operation (Explore / Ideate / Analyze / Architect / Write), structured SESSION.md state management, and browser automation via PyAutoGUI.

Built **Paper Forge** on top of it — an automated academic paper writing system.

---

## CV

### Education

**Boston University** | Boston, MA
M.S. in Computer Science | 2023 - 2025
- Advisor: Prof. Reza Rawassizadeh

**NYU Shanghai** | Shanghai, China
B.S. in Mathematics | 2019 - 2023

### Experience

**Boston University, ML Group** | Boston, MA
Visiting Researcher | May 2025 - Apr 2026
- Lead author on GradES [C.1]: gradient-based early stopping for LoRA fine-tuning, achieving 1.2–1.57× speedup; targeting ICLR 2026.
- Co-first author on OceanEnv [C.2]: unified marine robotics simulation environment; submitted to IROS 2026.
- Developing Fed-GSR federated learning framework (gradient stable rank adaptive compression); targeting ICLR 2026.
- Co-first author on ECRL [C.4]: ensemble variance as exploration regularization in contrastive RL; submitted to NeurIPS 2026.
- Co-author on Pose as a Lens [C.5]: frozen keypoint probing for diagnosing self-supervised visual representations; submitted to NeurIPS 2026.

**Boston University, ML Group** | Boston, MA
Graduate Research Assistant | Sept 2023 - Jan 2025
- First author on IJHCI journal paper on conversational agents for statistical analysis.
- Contributed to GNN compression study submitted to JMLR.

### Professional Service

Conference Reviewing: ICML (2025, 2026)

### Awards

**AI & Computer Vision Lab Student Research Grant** | Top 1% | 2024 | Boston University

### Competitions

**MIT Media Lab** | Cambridge, MA
AI Intelligent Motion Detection System (Edge Motion Labs) | Top 20

### Core Courses

GPA 4.0/4.0 in core courses | Top 5% in major

Stochastic Processes, Stochastic PDEs, Algorithms, Machine Learning, Statistical Machine Learning, Advanced Machine Learning, Generative AI, Operating Systems, Database Systems, Theory of Computation, Software Engineering

---

# USAGE INSTRUCTIONS

## To update your website:

1. **Edit this file** (SITE_CONTENT.md) with your changes
2. **Save the file**
3. **Say "sync" to Claude Code**

Claude will automatically update all the scattered files (_pages/about.md, _bibliography/papers.bib, _news/*.md, _projects/*.md, _data/cv.yml, _config.yml) to match this file.

## Quick commands:

- `sync` - Update all files from SITE_CONTENT.md
- `add paper: [details]` - Add a new publication
- `add news: [text]` - Add a news item
- `update bio: [text]` - Update the About section
- `deploy` - Commit and push changes to GitHub

## Adding content:

**New publication:** Add a new `### J.X` or `### C.X` section under Publications
**New news item:** Add a new line under News (format: `YYYY-MM-DD | Your news text`)
**New project:** Add a new `### Project Name` section under Projects
**Update bio:** Edit the text under `## About`
**Update CV:** Edit the sections under `## CV`
