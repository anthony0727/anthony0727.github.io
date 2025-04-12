---
layout: post
comments: true
title: "Function approximation in Q learning"
excerpt: ""
date: 2025-04-09 18:00:00
mathjax: true
---

Q. Is RL guaranteed to find optimal policy and value function? The discrepancy between tabular methods and function approximation.

For any finite Markov decision process, Q-learning finds an optimal policy.

Q-learning is off-policy TD control (Sarsa is on-policy TD control)

<img src="/assets/optimality-of-q/image 1.png" width="40%" />

* Policy evaluation : Estimate $v_{\pi}(s)$
* Policy improvement : Generate $\pi' \geq \pi$


<img src="/assets/optimality-of-q/image.png" width="60%" />

$\hat{v}(s; \theta) \approx v_\pi(s)$


The Bellman equation is linear equation that can be solved directly, but only for small state space.

$$
\begin{aligned}
v &= R + \gamma P v \\\\
(I - \gamma P) v &= R \\\\
v &= (I - \gamma P)^{-1} R
\end{aligned}
$$

Updates : 

Monte Carlo  : $S_t \mapsto G_t$,  

TD(0) : $S_t \mapsto R_{t+1} + \gamma \hat{v}(S_{t+1}, \mathbf{w}_t)$

$n$-step TD : $S_t \mapsto G_{t:t+n}$

DP : $s \mapsto \mathbb{E}\_\pi \left[ R_{t+1} + \gamma \hat{v}(S_{t+1}, \mathbf{w}_t) \mid S_t = s \right]$



# Reference

david silver lecture

sutton 

value improvement path