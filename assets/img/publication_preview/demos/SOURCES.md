# Paper-based motion previews

These are animations of original paper panels, not newly recorded videos or reconstructed 3D scenes. No intermediate observations or model outputs were synthesized.

- `srjepa-masking.gif`: SR-JEPA, arXiv:2608.05774, Figure 4 (supp-cubic-mask.png), panels A, B, C in source order. Each view is held for 2.2 seconds. It explains occupied-region masking, not a model-generated completion trajectory.
- `cowam-lift-pot.gif`: CoWAM, arXiv:2608.02578, appendix Figure A7(a), eight sampled source frames comparing Future-Consensus and CoWAM pot lifting from the same initial condition. Source file fig01b_lift_pot_future_consensus_vs_cowam_task_success_process_8x2.pdf. Each sampled state is held for 0.9 seconds; timing is editorial and not real time. Outcome labels describe the full source sequence, not an outcome at every frame.
- WebP posters are the first frames. They replace the larger PNG copies without changing the displayed content. The local development record retains source paths and the renderer.
- `oceanenv.webp`: the existing 60-frame OceanEnv simulation preview converted from GIF to animated WebP. Frame order and 160 ms timing are unchanged; the transfer size falls from 2,276,916 to 449,216 bytes.
