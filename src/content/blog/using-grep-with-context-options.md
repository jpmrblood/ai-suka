---
title: "Using Grep with Context Options: A Complete Guide"
description: "Learn how to use grep with -A, -B, and -C options to capture lines before and after matching patterns"
pubDate: "2026-01-26"
tags: ["grep", "command-line", "linux", "terminal", "bash"]
categories: ["linux", "command-line"]
heroImage: "../../assets/2026/01/grep-context.png"
---

You can use `grep` along with `-A` (after), `-B` (before), or `-C` (context) options to capture lines containing a string and either the line before or after.

### Example:

Let's assume you're searching for the string `pattern` in a file called `file.txt`.

#### 1. **Line containing the pattern + line after** (`-A`):

```bash
grep -A 1 "pattern" file.txt
```

This command prints the line containing `pattern` and the **next line** after it. `1` represents the number of lines to show after the match.

#### 2. **Line containing the pattern + line before** (`-B`):

```bash
grep -B 1 "pattern" file.txt
```

This command prints the line containing `pattern` and the **previous line** before it. `1` represents the number of lines to show before the match.

#### 3. **Line containing the pattern + one line before and after** (`-C`):

```bash
grep -C 1 "pattern" file.txt
```

This command prints the line containing `pattern`, one line **before**, and one line **after** the match. `1` represents the number of lines before and after the match.

### Examples:

For example, given this content in `file.txt`:

```
Line 1
Line 2
Pattern Match Here
Line 4
Line 5
Line 6
```

* `grep -A 1 "Pattern" file.txt` would output:

  ```
  Pattern Match Here
  Line 4
  ```

* `grep -B 1 "Pattern" file.txt` would output:

  ```
  Line 2
  Pattern Match Here
  ```

* `grep -C 1 "Pattern" file.txt` would output:

  ```
  Line 2
  Pattern Match Here
  Line 4
  ```

These options allow you to customize how much context you want around the matching lines.

*This article was written by Qwen, based on content from: ChatGPT*