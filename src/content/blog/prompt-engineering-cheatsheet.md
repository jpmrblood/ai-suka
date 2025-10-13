---
title: 'Prompt Engineering Cheat-Sheet: A Complete Guide to Better AI Results'
description: 'A comprehensive prompt engineering cheatsheet drawing from IBM techniques and best practices to help you write better prompts and get more reliable AI results'
pubDate: '2025-10-13T00:00:00.000Z'
heroImage: '../../assets/2025/10/ai-brain.png'
categories: ['ai', 'prompt-engineering', 'productivity', 'best-practices']
---

# Prompt Engineering Cheat-Sheet ✅

Use this step by step. You don't have to use *all* items every time, just the ones most relevant.

| #                                                          | Do this                                                                                                                                                 | Why it helps / What to watch out for |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| **1. Be very clear about the **task***                     | Explicitly state what you want: type of output (explanation, list, summary, code), audience, format. Avoid vague terms.                                 |                                      |
| **2. Provide context**                                     | Give background: why you want the result, who it's for (audience), constraints (length, style, style level). This steers the AI in the right direction. |                                      |
| **3. Use examples (few-shot) if needed**                   | Showing 1-3 examples of what you expect greatly reduces ambiguity. If no example, model has to guess.                                                   |                                      |
| **4. For complex or multi-step tasks, break into parts**   | Use chain-of-thought, prompt chaining, tree of thoughts, etc. Helps manage complexity, reduces mistakes.                                                |                                      |
| **5. Specify structure / formatting**                      | Format matters: bullet points, numbered lists, tables, headings, JSON, etc. Tell the model how to deliver the output.                                   |                                      |
| **6. Indicate tone / style / voice**                       | Formal / casual / persuasive / technical / simple language etc. Helps match audience.                                                                   |                                      |
| **7. Use directional cues if needed**                      | Eg: "from the perspective of …", "focusing on …", "avoid …", "include …". These nudges shape the response.                                              |                                      |
| **8. Make sure it's factual / up-to-date where necessary** | If topic involves recent data or specific domain, use Retrieval-Augmented Generation (RAG) or give the model source material.                           |                                      |
| **9. Allow for iteration / refinement**                    | First draft → get feedback from the AI (e.g. "What could be improved?") → refine. Or ask the model to critique its own output.                          |                                      |
| **10. Handle edge cases explicitly**                       | Instructions for what to do if information is missing / ambiguous / out of scope. That avoids random or wrong guesses.                                  |                                      |
| **11. Be mindful of prompt security**                      | Prevent prompt injection, phrase so that unintended interpretation is minimized. If needed, guard with constraints.                                     |                                      |
| **12. Optimize / tune**                                    | If using repeatedly: save good prompts, version them, test small variations (more details vs fewer), track which ones work best.                        |                                      |

## Introduction

Here's a **cheat-sheet** drawing on IBM's *Prompt Engineering Techniques* plus other best practices — a handy checklist you can use whenever you write a prompt, to get better, more reliable results.

## Why Prompt Engineering Matters

Prompt engineering is the art and science of crafting effective prompts to get the best results from AI models. Good prompts lead to:
- More accurate and relevant responses
- Better formatted output
- Consistent results across different queries
- Reduced need for follow-up clarifications

## The Complete 12-Step Framework

### 1. Be Very Clear About the Task
**What to do:**
- Explicitly state what you want as output
- Specify the type: explanation, list, summary, code, analysis
- Define your audience and their needs
- Avoid vague terms like "analyze this" or "tell me about"

**Example:**
Instead of: "Write about AI"
Use: "Write a 300-word beginner-friendly explanation of neural networks for high school students"

### 2. Provide Context
**What to do:**
- Give relevant background information
- Explain why you need this result
- Specify who the audience is
- Mention any constraints (length, style, technical level)

**Why it helps:**
Context steers the AI in the right direction and helps it understand the bigger picture.

### 3. Use Examples (Few-Shot)
**What to do:**
- Show 1-3 examples of what you expect
- Include both input and expected output formats
- Use this technique when the desired format or style is specific

**Why it helps:**
Examples greatly reduce ambiguity. Without them, the model has to guess what you want.

### 4. Break Complex Tasks Into Parts
**What to do:**
- Use chain-of-thought prompting
- Try prompt chaining for multi-step processes
- Consider tree of thoughts for complex decision-making

**Why it helps:**
Manages complexity and reduces mistakes in intricate tasks.

### 5. Specify Structure and Formatting
**What to do:**
- Be explicit about format: bullet points, numbered lists, tables, headings
- Consider JSON for structured data
- Specify if you want sections, subsections, or specific layout

**Why it helps:**
Format matters for readability and usability of the output.

### 6. Indicate Tone, Style, and Voice
**What to do:**
- Specify formal vs casual language
- Choose persuasive, technical, simple, or professional tone
- Match the audience's expectations

**Example:**
- "Write in a friendly, conversational tone"
- "Use formal academic language"
- "Make it persuasive and compelling"

### 7. Use Directional Cues
**What to do:**
- "From the perspective of..."
- "Focusing on..."
- "Avoid discussing..."
- "Include details about..."

**Why it helps:**
These nudges help shape the response in specific directions.

### 8. Ensure Factual Accuracy
**What to do:**
- For current topics, use RAG (Retrieval-Augmented Generation)
- Provide source material when needed
- Specify if you need up-to-date information

**Why it helps:**
Ensures responses are based on accurate, current information.

### 9. Allow for Iteration and Refinement
**What to do:**
- Generate first draft
- Ask for feedback: "What could be improved?"
- Request self-critique from the AI
- Refine based on results

**Why it helps:**
Improves quality through iterative improvement.

### 10. Handle Edge Cases Explicitly
**What to do:**
- Specify what to do if information is missing
- Handle ambiguous situations
- Define out-of-scope responses

**Why it helps:**
Avoids random or wrong guesses when faced with incomplete information.

### 11. Be Mindful of Prompt Security
**What to do:**
- Prevent prompt injection attacks
- Phrase instructions to minimize unintended interpretation
- Use constraints and guardrails when needed

**Why it helps:**
Protects against malicious or unintended prompt manipulations.

### 12. Optimize and Tune
**What to do:**
- Save effective prompts for reuse
- Version your prompts
- Test variations (more vs fewer details)
- Track which prompts work best

**Why it helps:**
Improves efficiency when using prompts repeatedly.

## Advanced Techniques

### Chain-of-Thought Prompting
```
"Solve this step by step:
First, identify the key components...
Second, analyze the relationships...
Third, draw conclusions...
Finally, provide recommendations..."
```

### Few-Shot Examples
```
"Here are examples of good product descriptions:
Product: Wireless headphones
Description: Immerse yourself in crystal-clear audio with our premium wireless headphones. Featuring advanced noise-cancellation technology and 30-hour battery life, these headphones deliver exceptional sound quality for music lovers and professionals alike.

Now write a description for: Smart water bottle"
```

### Role-Based Prompting
```
"You are an expert UX designer with 10 years of experience. Review this interface design and provide detailed feedback on usability, accessibility, and visual design aspects."
```

## Common Mistakes to Avoid

1. **Being too vague** - "Make it better" doesn't help
2. **Not specifying format** - You might get a paragraph when you need a list
3. **Forgetting context** - The AI doesn't know your specific situation
4. **Not iterating** - First results are rarely perfect
5. **Overloading with instructions** - Sometimes less is more

## Quick Reference for Different Tasks

### For Creative Writing
- Specify genre, tone, length, target audience
- Provide character descriptions and setting details
- Use examples of similar writing styles

### For Code Generation
- Specify programming language and framework
- Include dependencies and environment details
- Provide input/output specifications
- Mention any particular coding standards

### For Analysis Tasks
- Define the scope and boundaries
- Specify analytical framework or methodology
- Indicate depth of analysis needed
- Mention specific aspects to focus on

## Conclusion

Effective prompt engineering is a skill that improves with practice. Start with the basics (clear task, context, format) and gradually incorporate more advanced techniques as needed. Remember that different AI models may respond differently to the same prompts, so experimentation and iteration are key to mastering this craft.

Use this cheatsheet as a starting point and adapt it to your specific needs and the AI model you're working with.