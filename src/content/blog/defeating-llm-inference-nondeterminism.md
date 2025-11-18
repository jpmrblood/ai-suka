---
title: "Defeating Non-Determinism in LLM Inference: Achieving Reproducible AI Results"
description: "Explore how batch invariance issues cause non-determinism in large language models and the solutions to achieve reproducible results in AI systems."
pubDate: "2025-11-18"
tags: ["llm", "determinism", "ai-reproducibility", "machine-learning", "inference", "neural-networks"]
categories: ["technical", "ai", "research"]
heroImage: "../../assets/2025/10/ai-brain.png"
---

## Introduction

Reproducibility stands as a cornerstone of scientific progress, yet achieving consistent, reproducible results from large language models (LLMs) remains remarkably challenging. The common assumption that LLM inference engines are inherently non-deterministic due to "concurrency + floating point" issues only scratches the surface of a deeper problem. As revealed by research from Thinking Machines, the real culprit behind this non-determinism lies in batch invariance issues that fundamentally affect how LLMs process data.

The challenge is more significant than many realize: LLMs can show substantial non-determinism even at temperature 0, with studies demonstrating 80 unique completions out of 1,000 attempts for the same prompt. This variability undermines the scientific rigor of AI research and creates unpredictable behavior in production systems.

## The Root Cause: Floating-Point Non-Associatitivity

### Understanding the Mathematical Foundation

The fundamental issue stems from how floating-point arithmetic works in computer hardware. Floating-point numbers have finite precision, which leads to rounding errors during mathematical operations. Most critically, floating-point addition is not associative—meaning (a + b) + c ≠ a + (b + c). This non-associativity becomes problematic when GPUs perform parallel computations across neural network layers.

These rounding errors manifest during the matrix multiplications, reductions, and normalization operations that form the backbone of LLM inference. Different execution paths and parallelization strategies can lead to different orders of operations, resulting in subtly different numerical outcomes even when processing identical inputs.

### Beyond the Concurrency Hypothesis

While the "concurrency + floating point" hypothesis is widely accepted as the explanation for LLM inference non-determinism, it doesn't reveal the complete picture. In typical LLM forward passes, atomic operations are rarely needed for most neural network computations. Most optimizations in neural networks specifically avoid atomic operations due to performance penalties, yet non-determinism persists.

This observation indicates that the source of variability runs deeper than simple thread scheduling differences. The real issue lies in how batch processing affects the numerical computations themselves.

## Batch Invariance: The Hidden Problem

### Understanding Batch Processing Effects

Batch invariance refers to the property that computation results should remain consistent regardless of the batch size used during processing. In an ideal deterministic system, whether you process one sequence or a thousand sequences simultaneously, the individual outputs should be identical. However, current LLM implementations violate this principle.

The problem becomes apparent in matrix multiplications, where outputs differ when computed as part of different batch sizes. This means that the exact same prompt processed at different times—when server load varies—can produce different results. If the system is lightly loaded and processes one sequence at a time, versus heavily loaded and processes many sequences in a batch, the numerical outcomes vary.

### Real-World Implications

This batch dependence creates several significant challenges:

- **Scientific reproducibility**: Experiments cannot be reliably reproduced when system load varies
- **Production consistency**: The same prompt may yield different responses depending on server conditions
- **Debugging complexity**: Issues that appear under specific load conditions become nearly impossible to isolate
- **Quality assurance**: Testing becomes unreliable when results vary unpredictably

The batch invariance issue particularly affects high-stakes applications where consistency and predictability are crucial, such as scientific computing, financial modeling, or safety-critical systems.

## Solutions: Achieving Batch-Invariant Operations

### RMSNorm: Data-Parallel Strategy

Root Mean Square Normalization (RMSNorm) can achieve batch invariance through data-parallel strategies that maintain reductions within single processing cores. Instead of allowing batch-dependent reduction patterns, the implementation forces consistent computational paths regardless of batch size.

This approach ensures that the normalization operations follow the same sequence of floating-point operations, maintaining numerical consistency across different batch configurations. The key is to keep all reduction computations within predetermined boundaries that don't vary with batch size.

### Matrix Multiplication: Fixed Tile Sizes

For matrix multiplication operations, batch invariance is achieved by maintaining consistent tile sizes and tensor-core instructions regardless of batch size. Rather than allowing the GPU to optimize tile sizes based on the current batch dimensions, fixed-size tiles ensure that the same sequence of mathematical operations occurs consistently.

This approach requires careful engineering to maintain performance while enforcing deterministic behavior. The tensor-core instructions must follow predetermined patterns that remain identical across different batch scenarios, ensuring that matrix multiplications produce consistent results.

### Attention Mechanisms: Fixed-Size Split Strategies

Attention computations, crucial for transformer-based LLMs, require fixed-size split strategies to ensure consistent reduction order. Instead of allowing dynamic splitting based on batch characteristics, the implementation enforces predetermined split patterns that remain constant regardless of batch size.

This approach guarantees that attention weights and values are computed through identical mathematical sequences, eliminating batch-dependent variations in the attention mechanism. The fixed splitting ensures that softmax operations and dot products follow the same computational path every time.

## Implementation and Performance Considerations

### Practical Implementation with vLLM

Thinking Machines demonstrated deterministic inference using vLLM (Virtual Large Language Model) with batch-invariant kernels. Their implementation, available in the thinking-machines-lab/batch-invariant-ops repository, provides a practical example of how these principles translate to production systems.

The implementation shows that deterministic inference is achievable with acceptable performance trade-offs. In unoptimized implementations, performance drops from 26 seconds to 55 seconds for 1,000 sequences—a 2x slowdown that represents a reasonable cost for deterministic behavior.

### Performance Optimization Opportunities

While the initial implementations show performance impact, several optimization opportunities exist:

- **Kernel optimization**: Custom assembly implementations can reduce the overhead of batch-invariant operations
- **Hardware-specific tuning**: GPU architecture optimizations can minimize the performance penalty
- **Selective determinism**: Applying deterministic operations only where crucial for reproducibility
- **Hybrid approaches**: Combining deterministic and non-deterministic operations strategically

## Impact on AI Research and Applications

### Enabling True On-Policy Reinforcement Learning

Deterministic inference enables "true on-policy reinforcement learning" by eliminating numerical differences between training and sampling phases. This consistency is crucial for reinforcement learning applications where subtle numerical variations can lead to dramatically different learning outcomes.

### Scientific Research Applications

For scientific applications requiring reproducible AI results, deterministic inference provides the foundation for rigorous experimentation. Researchers can now conduct controlled studies with LLMs, knowing that identical inputs will produce identical outputs across different sessions and computational environments.

### Quality Assurance and Testing

Deterministic systems enable more effective quality assurance and testing of AI applications. Developers can create reliable test suites that verify consistent behavior, making it easier to catch regressions and ensure system reliability.

## Conclusion

The research from Thinking Machines reveals that non-determinism in LLM inference is not an inevitable consequence of hardware limitations, but rather a consequence of batch invariance issues that can be addressed through careful engineering. By implementing batch-invariant kernels for key operations—RMSNorm, matrix multiplication, and attention mechanisms—researchers and developers can achieve deterministic inference with acceptable performance trade-offs.

This breakthrough challenges the acceptance of nondeterminism as inevitable in machine learning systems. With proper understanding of the root causes and implementation of batch-invariant operations, deterministic inference becomes achievable, opening new possibilities for scientific rigor, quality assurance, and reliable AI applications.

The path forward involves continued optimization of deterministic implementations while maintaining the numerical consistency that reproducible AI research demands. As the field evolves, deterministic LLM inference may become the standard for applications where consistency and reproducibility are paramount.

*This article was written by Qwen, based on content from: https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/*