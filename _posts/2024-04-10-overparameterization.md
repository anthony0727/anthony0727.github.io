---
layout: post
comments: true
title: "[Editing] Overdetermined vs Overcomplete vs Overparameterized"
excerpt: ""
date: 2025-04-09 18:00:00
mathjax: true
---

<div style="display: flex; flex-direction: column; gap: 40px; align-items: center;">

  <!-- Underdetermined -->
  <div style="display: flex; gap: 40px; align-items: center;">
  <p><strong>Underdetermined</strong></p>
    <div style="text-align: left;">
      
      $$
      \begin{aligned}
      x + y + z &= 3 \\
      x + y + 2z &= 4
      \end{aligned}
      $$
    </div>
    <div>
      $$
      A|b = \left[\begin{array}{ccc|c}
      1 & 1 & 1 & 3 \\
      1 & 1 & 2 & 4
      \end{array}\right]
      $$
    </div>
  </div>

  <!-- Overdetermined -->
  <div style="display: flex; gap: 40px; align-items: center;">
  <p><strong>Overdetermined</strong></p>
    <div style="text-align: left;">
      $$
      \begin{aligned}
      x + y &= 3 \\
      x + 2y &= 7 \\
      4x + 6y &= 21
      \end{aligned}
      $$
    </div>
    <div>
      $$
      A|b = \left[\begin{array}{cc|c}
      1 & 1 & 3 \\
      1 & 2 & 7 \\
      4 & 6 & 21
      \end{array}\right]
      $$
    </div>
  </div>

</div>




usually overdetermined
more data (the number of equations) than features

representation + decision layer (linear regression)



### Overcompleteness

Formally, a subset of vectors $\\{\phi_{i}\\}\_{i \in J}$ in a Banach space $X$, sometimes called a *system*, is **complete** if every element in $X$ can be approximated arbitrarily well in norm by finite linear combinations of elements in $\\{\phi_{i}\\}\_{i \in J}$.

A system is called **overcomplete** if it contains more vectors than necessary to be complete — that is, there exists some $\phi_{j} \in \\{\phi_{i}\\}\_{i \in J}$ such that removing $\phi_{j}$ still leaves the system complete $\\{\phi_{i}\\}\_{i \in J} \setminus \\{\phi_j\\}$ remains complete.

In research areas such as signal processing and function approximation, overcompleteness can help achieve more stable, robust, or compact representations than using a basis.

**References**

* wiki