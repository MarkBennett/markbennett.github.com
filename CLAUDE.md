# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for markbennett.ca built with Astro 5, deployed to Cloudflare via Wrangler. The site is a static blog with BlueSky comment integration.

## Development Commands

All commands run from project root:

- **`npm run dev`** or **`npm start`** - Start local dev server with Astro at `http://localhost:4321`
- **`npm run build`** - Build production site to `./dist/`
- **`npm run preview`** - Preview production build locally
- **`npm run deploy`** - Deploy to Cloudflare via Wrangler

## Architecture

### Static Site Generation

- **Framework**: Astro 5.x with static output (`output: 'static'`)
- **Deployment**: Cloudflare adapter with Wrangler
- **Build format**: Directory-based URLs (e.g., `/blog/2026-02-03-back-to-the-blog/`)
- **Site URL**: https://www.markbennett.ca

### Content Collections

Defined in `src/content/config.ts` with Zod validation:

1. **Blog Collection** (`src/content/blog/*.md`)
   - Required: `title` (string), `pubDate` (date)
   - Optional: `description` (string), `updatedDate` (date), `bskyUrl` (URL string)
   - URL structure: `/blog/YYYY-MM-DD-slug/`
   - Files named with date prefix: `YYYY-MM-DD-title.md`

2. **Project Collection** (`src/content/project/*.md`)
   - Required: `title`, `description`, `type` (enum: 'project' | 'talk'), `url`, `order` (number)
   - Used for portfolio/work display

### BlueSky Comments Integration

Located in `src/components/BlueskyComments.astro`:

- **Client-side rendered** via inline `<script>` tag with `define:vars`
- **API Integration**: Calls BlueSky public API (`public.api.bsky.app`)
  - Resolves handle to DID via `com.atproto.identity.resolveHandle`
  - Fetches thread via `app.bsky.feed.getPostThread`
- **Security**: Uses `escapeHtml()` to prevent XSS attacks
- **URL Conversion**: Converts web URLs (`bsky.app/profile/{handle}/post/{id}`) to AT-URIs (`at://{did}/app.bsky.feed.post/{id}`)
- **Reply Button**: Opens BlueSky in centered popup window with security measures (`popup.opener = null`)

To add comments to a blog post, include `bskyUrl` in frontmatter pointing to the BlueSky post URL.

### Styling System

- **Framework**: Tailwind CSS with custom theme in `tailwind.config.mjs`
- **Custom Colors**:
  - `primary` (#3498db) and `primary-dark` (#2980b9) - Links and CTAs
  - `heading` (#2c3e50) - Headings and titles
  - `muted` (#7f8c8d) - Secondary text
  - `border` (#ecf0f1) - Borders and dividers
- **Blog Content Styling**: Applied via `<style is:global>` in `src/pages/blog/[slug].astro`
  - Article-specific styles for h2-h4, p, a, ul, ol, pre, code, blockquote

### Key Files

- `astro.config.mjs` - Astro configuration with MDX, sitemap, Tailwind integrations
- `wrangler.jsonc` - Cloudflare Workers configuration
- `src/layouts/Layout.astro` - Main site layout
- `src/pages/blog/[slug].astro` - Dynamic blog post pages with content rendering
- `src/content/config.ts` - Content collection schemas

## Important Patterns

### Adding Blog Posts

1. Create markdown file in `src/content/blog/` with format: `YYYY-MM-DD-slug.md`
2. Include frontmatter:
   ```yaml
   ---
   title: "Post Title"
   description: "Optional description"
   pubDate: 2026-02-03
   bskyUrl: "https://bsky.app/profile/handle/post/id" # Optional for comments
   ---
   ```
3. Write content in Markdown (MDX supported)

### BlueSky Comments Setup

1. Create a post on BlueSky about the blog article
2. Add `bskyUrl` to blog post frontmatter with the BlueSky post URL
3. Comments component will automatically render replies from BlueSky

### Git Workflow

- **Branch**: Development on feature branches
- **Commits**: Use specific file paths with `git add` (avoid `git add -A` to prevent accidental commits)
- **Commit Style**: Descriptive messages with bullet points for multi-part changes

## Technology Stack

- Astro 5.x (static site generator)
- TypeScript (strict config extends `astro/tsconfigs/strict`)
- Tailwind CSS (utility-first styling)
- MDX (Markdown with JSX)
- Cloudflare Workers (deployment platform via Wrangler)
- BlueSky AT Protocol API (comments integration)

## Deployment

Site deploys to Cloudflare via `npm run deploy` (uses Wrangler). The Cloudflare adapter handles SSG output transformation for Workers runtime. Build output goes to `./dist/` with `_worker.js` entry point.
