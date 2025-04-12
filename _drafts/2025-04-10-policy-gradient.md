---
layout: post
comments: true
title: "Policy gradient"
excerpt: "Don't ever forget about policy gradient"
date:   2025-04-09 15:00:00
mathjax: true
---
Pieter Abbeel is such a great teacher.

[Video](https://youtu.be/AKbX1Zvo7r8?si=kZHp5nD0VLhF8yHI)

We consider utility $U(\theta)$, dynamics $P$, reward $R$ and trajectories $\tau \in \mathcal D$

$$
U(\theta) = \sum_{\tau} P(\tau; \theta)\, R(\tau)
$$

Taking the gradient w.r.t. $\theta$ gives:

$$
\begin{aligned}
\nabla_\theta U(\theta) &= \nabla_\theta \sum_{\tau} P(\tau; \theta) R(\tau) \\\\
&= \sum_{\tau} \nabla_\theta P(\tau; \theta) R(\tau) \\\\
&= \sum_{\tau} \frac{P(\tau; \theta)}{P(\tau; \theta)} \nabla_\theta P(\tau; \theta) R(\tau) \\\\
&= \sum_{\tau} P(\tau; \theta) \frac{\nabla_\theta P(\tau; \theta)}{P(\tau; \theta)} R(\tau) \\\\
&= \sum_{\tau} P(\tau; \theta) \nabla_\theta \log P(\tau; \theta) R(\tau)
\end{aligned}
$$

Approximate with the empirical estimate for $m$ sample paths under policy $\pi_\theta$:

$$
\nabla_\theta U(\theta) \approx \hat{g} = \frac{1}{m} \sum_{i=1}^m \nabla_\theta \log P(\tau^{(i)}; \theta) R(\tau^{(i)})
$$

Decompsing paths into states and actions

$$
\begin{aligned}
\nabla_\theta \log P(\tau^{(i)}; \theta) 
&= \nabla_\theta \log \left[ 
\prod_{t=0}^{H} 
\underbrace{P(s_{t+1}^{(i)} \mid s_t^{(i)}, u_t^{(i)})}_{\text{dynamics model}} 
\cdot 
\underbrace{\pi_\theta(u_t^{(i)} \mid s_t^{(i)})}_{\text{policy}} 
\right] \\\\
&= \nabla_\theta \left[
\sum_{t=0}^{H} \log P(s_{t+1}^{(i)} \mid s_t^{(i)}, u_t^{(i)}) 
+ 
\sum_{t=0}^{H} \log \pi_\theta(u_t^{(i)} \mid s_t^{(i)})
\right] \\\\
&= \nabla_\theta 
\sum_{t=0}^{H} \log \pi_\theta(u_t^{(i)} \mid s_t^{(i)}) \\\\
&= \sum_{t=0}^{H} 
\underbrace{
\nabla_\theta \log \pi_\theta(u_t^{(i)} \mid s_t^{(i)})
}_{\text{no dynamics model required!!}}
\end{aligned}
$$
