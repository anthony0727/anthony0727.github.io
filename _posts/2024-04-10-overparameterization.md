---
layout: post
comments: true
title: "overdetermined, overcomplete, and overparameterized"
excerpt: "The three terms all describe redundancy, but they compare different objects."
date: 2025-04-09 18:00:00
mathjax: true
---

The three terms sound similar because each suggests that there is "more than necessary" of something. The difference is what is being counted.

| Term | What is compared? | What does it describe? |
| --- | --- | --- |
| Overdetermined | Equations and unknowns | An equation-solving problem |
| Underdetermined | Unknowns and equations | An equation-solving problem |
| Overcomplete | Representing vectors and ambient dimension | A representation system |
| Overparameterized | Model parameters or capacity and training constraints | A model in a fitting regime |

## Overdetermined and underdetermined systems

Consider

$$
b=Ax,
$$

where $A\in\mathbb{R}^{m\times p}$, $b\in\mathbb{R}^{m}$, and $x\in\mathbb{R}^{p}$ is unknown.

There are $m$ scalar equations and $p$ unknowns:

- If $m>p$, the system is **overdetermined**.
- If $m<p$, the system is **underdetermined**.
- If $m=p$, it is **square**.

These names describe the shape of the problem, not its solution. Rank and consistency still determine whether an exact solution exists and whether it is unique.

For example, an overdetermined system may have no exact solution. If $A$ has full column rank, it nevertheless has a unique least-squares solution. An underdetermined system has a nontrivial null space; whenever it is consistent, it has infinitely many solutions.

Determinedness therefore applies to a system with a specified unknown. It is not a property of a matrix in isolation.

## Overcomplete representations

Now consider

$$
x=D\alpha,
$$

where $x\in\mathbb{R}^{d}$, the columns of $D\in\mathbb{R}^{d\times k}$ are dictionary atoms, and $\alpha\in\mathbb{R}^{k}$ contains their coefficients.

If the columns of $D$ span $\mathbb{R}^{d}$, the dictionary is complete. If it has more atoms than the dimension of the space, so that $k>d$, it is **overcomplete**.

An overcomplete dictionary is redundant: its columns cannot all be linearly independent. Consequently, the coefficient problem $D\alpha=x$ is underdetermined. If one coefficient vector represents $x$, then other coefficient vectors generally represent the same $x$.

This redundancy can be useful. Different atoms can capture different structures in the data, while an inference rule can select a particular representation. But overcompleteness alone does not make that representation sparse or compact. Sparsity comes from an additional constraint, penalty, or prior on $\alpha$.

Overcompleteness describes the representation system. It does not describe how many trainable parameters were used to construct it.

## Overparameterized models

Consider a model

$$
f_{\theta}(x), \qquad \theta\in\mathbb{R}^{P}.
$$

A model is called **overparameterized** when its parameterization has more degrees of freedom than are needed to satisfy the training constraints. In this regime, many parameter settings may fit the training data equally well.

The comparison $P>n$, where $n$ is the number of training examples, is a useful intuition but not a complete definition. One example can impose several scalar constraints; parameters can be redundant because of model symmetries; and the architecture determines which functions the model can express. In practice, whether the model can interpolate the training data is often more informative than the raw parameter count.

Overparameterization is also different from **overfitting**. The former describes a model and its fitting problem. The latter describes a gap between training performance and performance on unseen data. An overparameterized model may overfit, but the terms are not synonyms.

## Where the terms overlap

In linear regression,

$$
y=Xw,
$$

with $X\in\mathbb{R}^{n\times p}$, the same inequality can bring the three ideas together. Suppose $p>n$ and $X$ has full row rank.

- Solving for $w$ is **underdetermined** because there are more unknown coefficients than equations.
- The $p$ columns of $X$ form an **overcomplete** spanning set for the $n$-dimensional sample space.
- The linear model is **overparameterized** relative to the $n$ scalar training constraints.

These statements coincide in this particular setup, but they name different aspects of it: the first refers to the equation, the second to the spanning set, and the third to the model.

## The encoder example

The distinction matters when an encoder is followed by a linear head:

$$
Z=f_{\phi}(X), \qquad \hat{Y}=ZW^{\top},
$$

where $Z\in\mathbb{R}^{n\times k}$ contains $k$ features for $n$ data points.

If the encoder is frozen, $Z$ is known and only $W$ is fitted. Under a squared loss, each output dimension reduces to a linear system:

- If $n>k$ and $Z$ has full column rank, fitting the head is overdetermined and has a unique least-squares solution.
- If $k>n$ and $Z$ has full row rank, fitting the head is underdetermined and has many interpolating solutions.

This analysis applies only to the linear head. It does not establish whether the entire network is overparameterized, because freezing $Z$ removes the encoder parameters $\phi$ from the fitting problem. During end-to-end training, both $\phi$ and $W$ are unknown.

That is the central distinction:

- **Overdetermined** and **underdetermined** refer to equations after the unknowns have been chosen.
- **Overcomplete** refers to a redundant set of representing elements.
- **Overparameterized** refers to the capacity of a model relative to the problem used to fit it.

They can describe the same setup from different angles, but they are not interchangeable.

---

**References**

- [What is the relationship between orthogonal, correlation and independence?](https://jaejunyoo.blogspot.com/2018/08/what-is-relationship-between-orthogonal.html)
