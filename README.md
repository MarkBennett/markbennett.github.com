# MarkBennett.ca

Personal website built with [Astro](https://astro.build/).

## 🚀 Project Structure

```
/
├── public/              # Static assets (images, CNAME, robots.txt, etc.)
│   ├── images/          # All website images
│   ├── styles/          # Global CSS
│   └── ...              # Other static files
├── src/
│   ├── content/
│   │   └── blog/        # Blog posts in Markdown
│   ├── layouts/
│   │   └── Layout.astro # Main layout component
│   └── pages/
│       ├── index.astro      # Home page
│       ├── vote2025.astro   # Vote 2025 page
│       └── blog/
│           └── [slug].astro # Dynamic blog post pages
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |

## 📝 Blog Posts

Blog posts are stored in `src/content/blog/` as Markdown files. Each post should have frontmatter with:

```yaml
---
title: "Post Title"
description: "Brief description"
pubDate: YYYY-MM-DD
---
```

The URL structure for blog posts is: `/blog/YYYY-MM-DD-slug/`

## 🚀 Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` or `master` branch. See `.github/workflows/deploy.yml` for the deployment configuration.

## 🔗 URL Structure

- Home: `/`
- Blog list: `/blog/`
- Blog posts: `/blog/YYYY-MM-DD-slug/`
- Vote 2025: `/vote2025/`

## 📦 Technologies

- [Astro v5](https://astro.build/) - Static site generator
- [MDX](https://mdxjs.com/) - Markdown with JSX support
- [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) - Automatic sitemap generation
- GitHub Actions - Automated deployment to GitHub Pages

## 🎨 Styling

The site uses custom CSS with a clean, modern, responsive design. Global styles are in `public/styles/global.css`.

## 📜 License

Content © Mark Bennett. All rights reserved.
