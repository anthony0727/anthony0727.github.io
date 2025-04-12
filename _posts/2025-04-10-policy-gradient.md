---
layout: post
comments: true
title: "Policy gradient"
excerpt: "Don't ever forget about policy gradient."
date:   2025-04-09 15:00:00
mathjax: true
---
Pieter Abbeel is such a great teacher.

[Video](https://youtu.be/AKbX1Zvo7r8?si=kZHp5nD0VLhF8yHI)

We consider utility $U(\theta)$, dynamics $P$, reward $R$ and trajectories $\tau \in \mathcal D$.

Policy gradient aims to maximize the utility, under (semi-)supervision of reward.

$$
U(\theta) = \sum_{\tau} P(\tau; \theta)\, R(\tau)
$$

> In microeconomics, the utility maximization problem is the problem consumers face: "How should I 
> spend my money in order to maximize my utility?" It is a type of optimal decision problem. 

Dynamics describe how the world will change, given previous state and action.

It can be any dynamics such as classical mechanics, fluid dynamics, ecnomics, etc, but oftentimes, the real-world is more complex than simple lines of abstract equations.

Vanilla policy gradient is free from the model (dynamics) of the world, as dervied below.

Taking the gradient w.r.t. $\theta$ gives :

$$
\begin{aligned}
\nabla_\theta U(\theta) &= \nabla_\theta \sum_{\tau} P(\tau; \theta) R(\tau) \\\\
&= \sum_{\tau} \nabla_\theta P(\tau; \theta) R(\tau) \\\\
&= \sum_{\tau} \frac{P(\tau; \theta)}{P(\tau; \theta)} \nabla_\theta P(\tau; \theta) R(\tau) \\\\
&= \sum_{\tau} P(\tau; \theta) \frac{\nabla_\theta P(\tau; \theta)}{P(\tau; \theta)} R(\tau) \\\\
&= \sum_{\tau} P(\tau; \theta) \nabla_\theta \log P(\tau; \theta) R(\tau)
\end{aligned}
$$

Approximate with the empirical estimate for $m$ sample paths under policy $\pi_\theta$ :

<div class="math-scroll">
$$
\nabla_\theta U(\theta) \approx \hat{g} = \frac{1}{m} \sum_{i=1}^m \nabla_\theta \log P(\tau^{(i)}; \theta) R(\tau^{(i)})
$$
</div>

The average is Monte-carlo estimation, and practically, single sample $m=1$ is used.

Introducing the concept of "control", i.e. action under stochastic policy $\pi$, we can decompse trajectory into state $s$ and action $u$.

You might read it as, "the probability of observing $s_{t+1}$ by taking an action at a state".

<div class="math-scroll">
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
</div>

Under parameterization of the policy, the dynamics model is cancelled out and the utility function solely depends on policy and reward function.

The gradient tries to increase probability of paths with positive $R$, and vice versa.

However, the high variance of the observed rewards $R$ leads to high variance in policy gradient, making it unstable.

To solve this, baseline $b$ is introduced, lowering the variance but making the gradient estimator  still unbiased.

Improving from constant baseline substraction, value function is adopted and actor-critic methods emerged, GAE, TRPO and PPO, so on.

Other post will talk about TRPO.

---

**References**

- [Pieter Abbeel's lecture](https://youtu.be/AKbX1Zvo7r8?si=kZHp5nD0VLhF8yHI)
- [Wikipedia - Utility maximization problem](https://en.wikipedia.org/wiki/Utility_maximization_problem)
- [REINFORCE, Williams (1992)](https://link.springer.com/content/pdf/10.1007/BF00992696.pdf)
- [John Schulman's thesis](http://joschu.net/docs/thesis.pdf)