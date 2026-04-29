---
layout: post
comments: true
title: "State vs Observation in RL"
excerpt: ""
date: 2025-04-09 18:00:00
mathjax: true
---

I want to distinguish the words "state" and "observation".

State can only be observed by an oracle, that fully describes the world with complete knowledge.

However, the sensory input to agent is "the observation of a state", which may only contain partial information.

A good example of state being equal to observation is games like chess, where the positions of pieces are complete enough for winning. You don't need chess board's thickness to win the game.

However, many real-world scenarios the state cannot be observed, and in oracle perspective, cannot be even defined. (First principles can be broken!)

Camera sensors outputs occluded images from 2D projection. 

Trading bot using fundamentals, indicators and order books cannot fully encode the market with exogenous variables like Trump's and Elon's tweets. --- but according to efficient-market hypothesis (all information is summarized into asset price) and using sufficiently wide neural network (universal approximation theorem), can we recontruct features solely from asset price? 


Therefore, we resort to experssivity and generalization capability of deep models to find approximately optimal solution with observations. (My other post talks about function approximation in RL)

The designer should carefully choose the observation space, which should sufficiently describe the state.

Applying RL to various problems and making it work, required me to do in-depth discussion with domain experts, spending much time on formulation of the problem (ideally Markovian), developing the RL environment and feature engineering, rather than fancy algorithms.
