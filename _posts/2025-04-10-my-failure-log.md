---
layout: post
comments: true
title: "My failure log"
excerpt: "It's hard to digest that I've failed. These are fragments from years past—a reflection I hope turns out to be meaningful progress."
date: 2025-04-09 18:00:00
mathjax: true
---

<style>
.post-header h1 {
    font-size: 35px;
}
.post pre,
.post code {
    background-color: #fcfcfc;
    font-size: 13px; /* make code smaller for this post... */
}
</style>

2020-10~

- studied GAN
- started David Silver's lecture, Sutton book, PRML in a study club. Younghoon is such a brilliant guy
- multi-agent snake game
    - celery, dockerized agent, redis, mongodb
    - ranking system (trueskill), belief network
    - **came up with the idea of DFS to solve initialization of snakes’ positions**
- imitation learning, implemented GAIL, we built custom expert trajectories, partial observation
    - fixed discriminator collapsing
    - **felt happy when it worked**
        
        <img src="/assets/my-failure-log/image.png" width="60%" />
        
- tried to abstract RL, and tried to implement RL library, RL2
- tried to observe emergent behavior from multi-agent RL, game theory
    - studied QMix, COMA
- deployed alpha version of snake battle, ~10 people participated, Azure
- worked with intern on decision tree + deep model; fell into "rabbit hole" of fractal math
- helped outsider on dockerizing R + Python environment for genomics area
- implemented VAIL
- another rabbit hole into instrumental variable, graphical model, GLS (Generalized Least Squares)
- little interest in the acceleration of RL, GPU simulator, FPGA

2021-09~

- started working with Wontae, Rescaled Representation Space for Robust RL (r2d2). overfitting and catastrophic forgetting
- rabbit hole of smoothness (Lipshitz), functional analysis of DQN, algorithmic error
- **gained new perspective on RL from value improvement path, value polytope**
- pondering about weight dynamics of DQN, regularization
    
<img src="/assets/my-failure-log/image 1.png" width="60%" />

- AI for music, ISMIR. thought about EGG, what is emotion? should be more complex than discrete variable on valance/arousal plane. met Keunwoo Choi there! Another rabbit hole into definition of emotion.
    
<img src="/assets/my-failure-log/image 2.png" width="60%" />
    
- scratched surface of signal processing, librosa, etc. melspectrogram
- rabbit hole into complex-valued NN
<!-- , during research on <span markdown="0">\(||\cdot||_{0<p<1}\)</span> -->
- weight's magnitude, direction (angle) of the representation in RL
- **intepretability! distill.pub, Christopher Olah.** he is a genius. later he co-founded Anthropic, and I think the company will pioneer AI
- started compiler optimization
- little interest in continual learning
- rabbit hole into group theory, manifold from Neurips 2021 tutorial
- **spent the entire night of 12/31 running experiments for r2d2, no sleep**
- observed hopeful experimental results, failed to justify the work and failed to submit to ICML
- server maintenance
- graph convolutional RL for MARL
- traffic routing, flatland
- little interest in optimizing replay buffer in cpp, pre-allocation
- started using ray/RLlib
- started studying GNN, laplacian operator, Chevyshev convolution
- **had really fun with Eunki and Yongsun**, stable matching, gale-shapley, multi-agent RL
- MARL on various envs, l2rpn, magent
- keep studying GNN, using program graph, CompilerGym
- MCMC, Jeremy Kun
- adopt language encoding methods for program sequence
- **made RLlib work with graphs, really hacky**, dynamic observation space
- adjacency matrix consumes huge memory → multi gpu training (sparse matrix has its cons, trade-off)
- isotropy in graph
- made RL2 work on CompilerGym. Wait, I kept using RL2 until now..?
- rabbit hole into sheaf theory, oversquashing in graph, graph rewiring, strong collapse, discrete ricci flow, TDA, persistent homology. Michael Bronstein, Aleksa Gordić
- failed to submit to ISCA compiler competition
- jpeg-d sped up 13.6% with RL+GNN approach
- gave feedback of their product, and MakinaRocks CEO gave me 10만원 starbucks card!

2022-05~

<span style="color: gray;">→ sometimes, life is hard, life got a little toxic</span>

- servers keep crashing, fix, fix, fix…
- stable matching
- **contributed to FAIR repository! (the penguin)**
    
    <img src="/assets/my-failure-log/image 3.png" width="40%" />
    
- interest in sparse modeling
- suddenly I started gravitational wave classification…?
- thought about window function of fourier transform
- suddenly I started audio sentiment analysis, trying to distill semantic features from teacher (kogpt) to student (audio model). scraped 700,000 lyrics from Melon
- probabilistic model using pyro
- metrics in gnn, Weisfeiler-Lehman, Gromov-Wasserstein, isomorphism
- diffusion model, langevin dynamics
- after few hours of brainstorming session, Sanmun and Chaejin asked me for collaboration, KAIST
- reduced training time 60 hours to 10 hours in few days after joining! weird file IO and GPU wasn’t utilized, who coded this…
- kept trying to find topics that I can delve into, but kept diverging…
- started blockchain analysis with Jungyoon
- re-implemented everything in RLlib for JLAB
- interest in optimal transport and NTK
- gathered anomaly transaction label from etherscan
- Neo4j to deal with gigantic graph, dumped the chain and loaded into DB
- study dynamics graph (Ethereum transaction), also refer to Uber’s dynamic graph
- how to sample from huge graph that, samples can cover mother population?
- Skill-based RL on mujoco, 
- studied state clusters during skill-based RL training

2023-05~

- made physics-informed RL work for optical device design! KAIST prof. invited me for lunch and was offered co-first author
- rabbit hole into complex-valued autoencoder, hyperspherical representation, tried to derive Von-Mises latent, ELBO
- conjugate graph (line graph)
- studying Dreamer V3, world-model
- tried to implement Dreamer V3 in RLlib, failed
- testing typical decision tree, logistic regression on blockchain anomaly detection
- museli, mpo
- adapt Dreamer V1 into compiler optimization
- rabbit hole into equivariant CNN
- writing physics-informed RL paper to publish at physics journal, Chaejin is such a hard-working, smart student
- eigenvalue of graph Laplacian, Fiedler eigenvalue
- started working on superoptimization with RL. MCTS, muzero, efficientzero, reproduce AlphaDev with STOKE, x86
- studying natural language processing to handle assembly language

<span style="color: gray;">→ Leave of absence for a month, due to anxiety attack</span>

2024~

- physics journal paper got accepted!
- started working on neural operator
- wrote manuscript for superoptimization
- my co-worker in superoptimization project left
- made Dreamer V3 work on material design problem, that was quick!
- made FNO work on electric field prediction, that was quick!
- got productive, didn't know that getting rest is important
- wrote manuscript on scientific ML, submitted to neurips — I doubted that this paper will be accepted and insisted this work should change direction. failed to convince manager

2024-06~

- thinking about control problem in PDE
- thinking about model collapse when training on recursively generated data; should humanity have downloaded snapshot of internet at some point? probably openai already did
- received quite good scores for neurips but rejected — as expected
- working on the extension of physics journal paper
- little bit of RAG
- started AI compiler study and led deep model compiler team, triton, CUDA, but implementing kernels don’t really interest me…
- diffusion model (Flux.1-dev) fine-tuning in study club
- optimizing Flux.1-dev on tinygrad in study club
- diffusion for control in PDE, also offline RL
- re-submitted the SciML paper to ICLR, rejected
- my co-author left the team
- went to neurips and met Will Dabney and Marc G. Bellemere, I want to work with them so bad
- met great people including Hyungwon Chung, Kyunghyun Cho, could listen to their stories, and later on I found his "Don't teach. Incentivize." seminar. it gave me new perspective.
- some progress on the extension of physics journal paper, thanks to the literature Will Dabney shared
- found interesting work, SINDy-RL, Steve Brunton, very nice literature
- tried to use fluid dynamics (CFD) simulator, very torturing, but finally made it work
- re-visiting weight dynamics, plasticity loss in continual RL. Nikishin, Clare lyle and Sutton
- re-submitted the SciML paper to ICML, rejected, of course
- CoT fine-tuning DeepSeek-R1
- can't we track the change of weight magnitude when normalizing the weight in RL? similar to the idea from r2d2 3 years ago -> nice work on this by adding new axis to the weight, came out from KAIST
- can't we regularize the weight with orthogonality to keep "effective rank"? -> found exact same idea published recently
- started working on semiconductor manufactoring data

2025-04
- I left the team