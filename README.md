# Astro Starter Kit: Blog

```sh
bun create astro@latest -- --template blog
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:4321`      |
| `bun build`           | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

## 📝 Creating Blog Posts

Blog posts are stored as Markdown files in the `src/content/blog/` directory. Each post must follow a specific structure to work properly with the site.

### Title Guidelines

When creating blog post titles, follow these principles for professional, technical writing:

**Preferred Title Style:**
- **Specific and descriptive** - Mention key characteristics (e.g., "Lightweight", "Systematic", "AI-Native")
- **Professional tone** - Avoid sensational language like "Revolutionizing", "Ultimate", "Amazing"
- **Accurate claims** - Don't claim to be "the first" or "the best" unless verifiably true
- **Technical focus** - Emphasize methodology, approach, or specific benefits

**Examples:**
- ✅ "OpenSpec: Lightweight Change Management for AI-Assisted Development"
- ✅ "Spec Kit: Executable Specifications for Development Teams"
- ❌ "OpenSpec: Revolutionizing AI-Driven Development" (too sensational)
- ❌ "The Ultimate Guide to Specification-Driven Development" (too generic)

**Title Structure:**
- **[Tool/Project]: [Key Characteristic] [Focus Area] for [Target Audience]**
- Keep under 80 characters for better SEO and readability
- Use title case consistently

### File Structure

1. **Location**: All blog posts go in `src/content/blog/`
2. **File naming**: Use descriptive kebab-case names (e.g., `my-awesome-post.md`)
3. **File extension**: Use `.md` for Markdown files

### Frontmatter Requirements

Each blog post must include the following frontmatter at the top of the file:

```markdown
---
title: "Your Post Title"
description: "Brief description of your post content"
pubDate: "2025-10-15"
tags: ["tag1", "tag2", "tag3"]
categories: ["category-name"]
heroImage: "../../assets/year/month/image-name.png"
---
```

### Frontmatter Field Details

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | Yes | The post title (appears in listings and as page title) | `"My Awesome Blog Post"` |
| `description` | Yes | Brief description (used in meta tags and previews) | `"Learn how to create amazing content"` |
| `pubDate` | Yes | Publication date in YYYY-MM-DD format | `"2025-10-15"` |
| `tags` | Yes | Array of relevant tags for the post | `["javascript", "tutorial", "web-dev"]` |
| `categories` | Yes | **Array of categories (maximum 3 per post)** | `["technology"]` |
| `heroImage` | Yes | Path to hero image | `"../../assets/2025/10/hero-image.png"` |

### Important Rules

- **Category Limit**: Each post must not exceed 3 categories. This ensures better organization and navigation.
- **YouTube Content**: When creating articles based on YouTube videos, always include `"youtube"` as one of the categories alongside relevant topic categories (e.g., `["youtube", "prompt-engineering"]`).
- **Image Path**: Hero images should be placed in `src/assets/` with organized folder structure (year/month).
- **Date Format**: Use ISO date format (YYYY-MM-DD) for `pubDate`.
- **Consistent Naming**: Use kebab-case for file names and organize assets logically.

### Content Guidelines

- Write in Markdown format
- Use appropriate heading levels (start with H2 `##` for main sections)
- Include alt text for images
- Keep content focused and well-structured
- Use the established categories from existing posts as reference

### Example Post Structure

```markdown
---
title: "Getting Started with Astro"
description: "Learn the basics of building a blog with Astro framework"
pubDate: "2025-10-15"
tags: ["astro", "tutorial", "static-site"]
categories: ["web-development"]
heroImage: "../../assets/2025/10/astro-tutorial.png"
---

## Introduction

This is the first paragraph of your blog post...

## Main Content

Continue with your content here...

## Conclusion

Wrap up your thoughts...
```
