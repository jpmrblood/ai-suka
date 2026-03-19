---
title: "A 4-Part Prompt Framework for Building Apps with AI Coding Tools"
description: "Learn a practical framework for writing better prompts when building apps with AI tools like Lovable, Cursor, and Bolt. Improve code quality and avoid bug loops."
pubDate: "2026-03-17"
heroImage: "../../assets/2026/03/ai-app-prompt-framework.png"
tags: ["ai", "prompt-engineering", "app-development", "productivity"]
categories: ["youtube", "prompt-engineering"]
---

The quality of prompts you give AI coding tools directly impacts the quality of code you get back. If you've been prompting with simple instructions like "add login and sign up" and hoping for the best, you're likely getting stuck in bug loops.

This article breaks down a practical 4-part framework for writing prompts that get significantly better results from AI coding tools.

## Why Prompts Matter

AI coding tools like Lovable, Cursor, Bolt, and Replit are still fundamentally coding tools. They write code behind the scenes based on your instructions. The more specific and detailed your instructions, the better the code they produce.

Think of it this way: these tools behave as if they're your developer. You need to give them instructions the same way you'd brief a developer to build a feature for you.

## The 4-Part Prompt Framework

### Part 1: Context

Start by explaining *why* you're building this feature. Context helps the AI understand the goal and make better decisions about implementation.

**Example:**
> "I want to build a progress tracking feature to help people training their dog to track how well they are doing and be incentivized to continue training."

This gives the AI the reason behind the feature. Progress tracking could be implemented many ways, but knowing the goal (incentivizing continued training) helps the AI choose an appropriate approach—perhaps using points, ratings, or achievements.

### Part 2: User Journey

Outline how users should move through the feature. This tells the AI what pages, interactions, and actions it needs to build.

**Example:**
> "Every time a user completes a training task, show a congrats screen and message. Then take them to their progress page and show the completed task and give them actionable next tasks to complete from this page. Users can also go into their account to see their progress at any time."

This clarifies:
- What screens to build
- What interactions to create
- What navigation flows to implement

### Part 3: Technology

Specify any APIs, services, or technologies you want to use. This reduces errors with databases, authentication, and backend integration.

**Example:**
> "I want progress to be stored against a user's account in Supabase."

Without this, the AI might choose different technologies or miss critical implementation details like properly linking data to user accounts.

### Part 4: Design Direction

Add any specific design or interaction requirements to improve quality and user experience.

**Example:**
> "Use the same color as the buttons for the progress bar. Use the same font weight for headings. Animate the progress bar as it goes up."

## Putting It Together: Before vs After

**Before (weak prompt):**
> "I want to add progress tracking to my app."

**After (strong prompt):**
> "I want to build a progress tracking feature to help people training their dog to track how well they are doing and be incentivized to continue training.
>
> Every time a user completes a training task, show a congrats screen and message. Then take them to their progress page and show the completed task and give them actionable next tasks to complete. Users can also go into their account to see their progress at any time.
>
> I want progress to be stored against a user's account in Supabase.
>
> Use the same color as the buttons for the progress bar. Animate the progress bar as it goes up."

## Tips for Small Changes

When iterating on a feature after the initial build:

1. **Be specific and do one thing at a time**
2. **Tag the relevant file** if your tool supports it
3. **Add context** for why you're making the change

**Example:**
> `@progress-bar.tsx` - "When it animates, I want to add easing to the animation so that it feels smooth and is more engaging for the user. Do not change the functionality."

## Best Practices

### One Feature at a Time

Focus each prompt on one specific task or feature. This gives the AI clear, specific instructions to follow.

### Start Fresh for Each Feature

Clear your chat history or start a new chat for each new feature. This prevents context pollution.

### Don't Be Afraid to Discard

If a prompt doesn't work after 2-4 iterations and you're going in circles, discard the changes and start fresh. Sometimes starting over is faster than debugging.

## Workflow Summary

```
1. Write prompt using 4-part framework
2. AI builds feature
3. Iterate with small, specific changes
4. If working → Start new chat for next feature
5. If stuck → Discard and restart
```

## Conclusion

This framework transforms vague prompts into detailed instructions that AI coding tools can execute effectively. By providing context, outlining user journeys, specifying technologies, and adding design direction, you'll get better code with fewer bugs and faster iterations.

The key insight is simple: treat AI coding tools like you would a developer. The better your brief, the better the implementation.

*This article was written by Claude, based on content from: https://www.youtube.com/watch?v=MUVwtIvSDBg*
