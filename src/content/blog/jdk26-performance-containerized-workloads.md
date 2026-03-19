---
title: "JDK 26: Performance Optimizations for Containerized Java Workloads"
description: "Despite having no features graduating to final status, JDK 26 delivers meaningful performance improvements for containerized workloads, including G1 garbage collector enhancements, HTTP/3 API, and continued progress on Project Loom and Valhalla."
pubDate: "2026-03-19"
tags: ["java", "jdk26", "performance", "containers", "jvm", "project-loom", "project-valhalla"]
categories: ["java", "backend"]
heroImage: "../../assets/2026/03/jdk26-performance.png"
---

JDK 26 may appear skippable at first glance. It's not an LTS release, and zero preview features have graduated to final status. But dismissing it would be a mistake. This release delivers measurable performance gains, especially for containerized workloads—the modern standard for enterprise Java deployments.

## What's New in JDK 26

Simon Ritter, Deputy CTO at Azul, describes JDK 26 as "not one of the bigger releases, but also not one of the smallest." The release includes 10 JEPs (JDK Enhancement Proposals), with several focused on improving runtime performance and developer productivity.

### No Features Made Final

A notable characteristic: no preview features or incubator modules have been promoted to final status. This is unusual but reflects the ongoing development of major projects like Loom and Valhalla, which require more iteration before finalization.

---

## Performance Improvements for Containerized Workloads

### G1 Garbage Collector Optimizations

The G1 garbage collector receives synchronization improvements that reduce time-to-safe-point. When garbage collection occurs, the JVM must reach a "global safe point" where all threads are paused at a common location. The overhead of synchronizing threads to reach this point has been reduced, minimizing pause times and improving throughput.

This matters particularly for containerized environments where:
- Multiple JVM instances share the same host
- Predictable latency is critical
- Resource constraints make efficient GC essential

### HTTP/3 API

JDK 26 introduces a new HTTP/3 API. HTTP/3 switches from TCP to UDP (using QUIC protocol), offering:

| Protocol | Connection Type | Characteristics |
|----------|-----------------|-----------------|
| HTTP/1.1, HTTP/2 | TCP | Reliable, ordered delivery; head-of-line blocking |
| HTTP/3 | UDP + QUIC | Reliable delivery built on UDP; no head-of-line blocking |

UDP is inherently unreliable, but HTTP/3 builds reliability on top of it. The result is better performance for distributed microservices where latency matters.

---

## Language and API Enhancements

### Making Final Truly Final

Java's `final` fields have always had a loophole: reflection can modify them. This complicates JVM optimization because the runtime must account for potential reflection-based changes.

JDK 26 moves toward making `final` genuinely immutable. Once set, a final field cannot be changed—even through reflection. This enables:

- More aggressive compiler optimizations
- Better inlining decisions
- Predictable runtime behavior

### Lazy Constants (Previously Stable Values)

Lazy constants provide controlled initialization timing for fixed values. Unlike regular `final` fields, lazy constants let developers specify *when* initialization occurs, which can improve startup performance and memory efficiency.

### Primitive Types in Patterns

Pattern matching for `instanceof` and `switch` now supports primitive types. This bridges the gap between primitives (`int`, `long`) and their wrapper classes (`Integer`, `Long`), though edge cases around precedence and ordering required careful handling.

---

## Project Loom: Structured Concurrency

Structured concurrency remains in preview, continuing Project Loom's mission to simplify multi-threaded programming. Writing correct concurrent code is notoriously difficult; structured concurrency provides a model where:

- Tasks have clear lifecycles
- Child threads are bounded by parent scope
- Error handling is predictable

**Timeline:** Simon expects structured concurrency to become final in JDK 27 or JDK 28 (the next LTS). The API saw no significant changes in JDK 26, suggesting it's nearing completion.

---

## Project Valhalla: Vector API

The Vector API enters its 11th incubator iteration. The delay stems from its dependency on other Valhalla components—specifically value types.

### What Vector API Enables

Vector API leverages SIMD (Single Instruction, Multiple Data) capabilities of modern CPUs:

| CPU Architecture | Vector Register Width |
|------------------|----------------------|
| Intel x86 | 128–512 bits |
| ARM | Up to 4,096 bits (SVE) |

A single instruction can operate on multiple data elements simultaneously. For numerically intensive workloads—AI inference, scientific computing, image processing—this delivers substantial speedups.

### Why the Delay?

Vector API depends on value types from Project Valhalla. Value types will allow:
- Collections of primitives (e.g., `List<int>` instead of `List<Integer>`)
- More efficient memory layout
- Reduced indirection and boxing overhead

Once Valhalla's core components ship (expected within a year), Vector API can finalize.

---

## Applet API Removed

JDK 26 removes the Applet API entirely. Applets made Java famous in 1995 but have been obsolete for years:

- Browsers discontinued plugin support
- JDK 11 removed the browser plugin
- The API remained in the class library for compatibility

This is cleanup, not functionality loss. No modern cloud or containerized application uses applets.

---

## Technical Deep Dive

### Structured Concurrency: Code Example

Structured concurrency simplifies managing concurrent tasks. Here's how it works:

```java
// Before: Managing threads manually is error-prone
ExecutorService executor = Executors.newCachedThreadPool();
try {
    Future<String> user = executor.submit(() -> fetchUser(id));
    Future<List<Order>> orders = executor.submit(() -> fetchOrders(id));
    // What if fetchUser fails? Orders continues running...
    return new Response(user.get(), orders.get());
} finally {
    executor.shutdown();
}
```

```java
// JDK 26: Structured Concurrency (Preview)
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Supplier<String> user = scope.fork(() -> fetchUser(id));
    Supplier<List<Order>> orders = scope.fork(() -> fetchOrders(id));
    
    scope.join();           // Wait for all tasks
    scope.throwIfFailed();  // Propagate exceptions
    
    return new Response(user.get(), orders.get());
}
```

Run with: `java --enable-preview --source 26 MyApp.java`

### Vector API: SIMD Operations

The Vector API enables data-parallel operations on CPU vector registers:

```java
static final VectorSpecies<Float> SPECIES = FloatVector.SPECIES_256;

void scalarComputation(float[] a, float[] b, float[] c) {
    for (int i = 0; i < a.length; i++) {
        c[i] = (a[i] * a[i] + b[i] * b[i]) * -1.0f;
    }
}

void vectorComputation(float[] a, float[] b, float[] c) {
    int i = 0;
    int upperBound = SPECIES.loopBound(a.length);
    for (; i < upperBound; i += SPECIES.length()) {
        var va = FloatVector.fromArray(SPECIES, a, i);
        var vb = FloatVector.fromArray(SPECIES, b, i);
        var vc = va.mul(va)
                   .add(vb.mul(vb))
                   .neg();
        vc.intoArray(c, i);
    }
    // Handle remaining elements
    for (; i < a.length; i++) {
        c[i] = (a[i] * a[i] + b[i] * b[i]) * -1.0f;
    }
}
```

Compile with: `javac --add-modules jdk.incubator.vector VectorDemo.java`

**Performance impact:** On a 256-bit AVX register, 8 floats process simultaneously—potential 8x speedup for numerically intensive loops.

### Primitive Types in Patterns

Pattern matching now works with primitives:

```java
// JDK 26: Primitive pattern matching (Preview)
Object value = 42;

if (value instanceof int i) {
    System.out.println("Integer: " + i);
} else if (value instanceof long l) {
    System.out.println("Long: " + l);
}

// Switch with primitive patterns
switch (value) {
    case int i -> System.out.println("int: " + i);
    case long l -> System.out.println("long: " + l);
    case float f -> System.out.println("float: " + f);
    case double d -> System.out.println("double: " + d);
    default -> System.out.println("other");
}
```

### HTTP/3 Client

The new HTTP/3 client uses QUIC over UDP:

```java
HttpClient client = HttpClient.newBuilder()
    .version(HttpClient.Version.HTTP_3)
    .build();

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://example.com/api"))
    .GET()
    .build();

HttpResponse<String> response = client.send(
    request, 
    HttpResponse.BodyHandlers.ofString()
);
```

**Note:** HTTP/3 requires server support. Most CDNs and cloud providers now support it.

### JVM Flags for Containerized Workloads

Key JVM options for running JDK 26 in containers:

```bash
# Container-aware resource limits (enabled by default in JDK 26)
java -XX:+UseContainerSupport \
     -XX:MaxRAMPercentage=75.0 \
     -XX:InitialRAMPercentage=50.0 \
     -Xlog:gc*:file=/var/log/gc.log:time,tags \
     -jar app.jar
```

```bash
# G1 GC tuning for low latency
java -XX:+UseG1GC \
     -XX:MaxGCPauseMillis=100 \
     -XX:G1HeapRegionSize=16m \
     -XX:+ParallelRefProcEnabled \
     -jar app.jar
```

```bash
# Enable preview features
java --enable-preview \
     --add-modules jdk.incubator.vector \
     -jar app.jar
```

### Ahead-of-Time Class Loading (JEP 483)

JDK 26 introduces AOT class loading and linking, reducing startup time:

```bash
# Create AOT cache during build
java -XX:AOTCache=app.aot -cp myapp.jar com.example.Main --AOT-cache-init

# Use AOT cache at runtime
java -XX:AOTCache=app.aot -cp myapp.jar com.example.Main
```

This is particularly valuable for serverless and microservices where cold starts matter.

---

## Should Enterprise Teams Adopt JDK 26?

For teams running containerized workloads with CI/CD pipelines:

| Factor | Consideration |
|--------|---------------|
| Non-LTS | No extended support; plan to upgrade again |
| Performance | Measurable gains from GC and runtime improvements |
| Risk | Low; no breaking changes to final APIs |
| Pipeline fit | High; containerized deployments already update frequently |

The performance improvements are "free" for teams already updating container images regularly. If you're on JDK 25 and can tolerate a non-LTS release, JDK 26 offers tangible benefits.

---

## Summary

JDK 26 proves that a release without headline-grabbing features can still matter. The G1 garbage collector improvements, HTTP/3 support, and progress toward immutable final fields all contribute to better performance for modern deployment patterns.

For containerized enterprise Java, the question isn't whether JDK 26 has new features—it's whether the performance gains justify an upgrade. For teams already running frequent deployments, the answer is likely yes.

---

## References

- [JDK 26 JEPs](https://openjdk.org/projects/jdk/26/)
- [Project Loom](https://openjdk.org/projects/loom/)
- [Project Valhalla](https://openjdk.org/projects/valhalla/)
- [Azul](https://www.azul.com/)

*This article was written by opencode (GLM-5), based on content from: https://www.youtube.com/watch?v=Sg_SEyZ0ntE*
