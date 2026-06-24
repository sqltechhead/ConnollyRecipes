# Connolly Recipes — Wiki

A personal recipe site covering smoking, baking and cooking, built with Astro 4 and deployed to [connollyrecipes.co.uk](https://connollyrecipes.co.uk).

## Pages

| Page | What it covers |
|------|---------------|
| [[Branching-Conventions]] | How to name branches when working on the site |
| [[PR-Process]] | Raising and merging pull requests |

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Astro 4 (static site generation) |
| Styling | Tailwind CSS with custom brown/cream/terracotta palette |
| Content | Markdown with YAML frontmatter (Astro Content Collections) |
| Fonts | Playfair Display (headings), Lato (body) |
| Hosting | GitHub Pages → connollyrecipes.co.uk |
| CI/CD | GitHub Actions (build + deploy on push to `master`) |

## Project Structure

```
src/
  content/recipes/   ← all recipe markdown files, organised by category
  pages/             ← Astro page routes
  layouts/           ← BaseLayout.astro (header, footer, dark mode)
  components/        ← RecipeCard, etc.
  styles/            ← global.css
public/
  assets/images/     ← recipe photography
wiki/                ← source for this wiki (synced via GitHub Actions)
.github/
  workflows/         ← deploy.yml, sync-wiki.yml
  pull_request_template.md
```

## Recipe Categories

`smoking` · `cakes` · `traybakes` · `breads` · `cooking` · `rubs` · `sauces`

## Adding a Recipe (quick reference)

1. Create `src/content/recipes/{category}/{slug}.md`
2. Add required frontmatter — `title`, `date`, `category`, `servings`
3. Drop any images in `public/assets/images/`
4. Branch name: `recipe/add-{slug}`, open a PR

Full frontmatter schema:

```yaml
---
title: "Recipe Title"
date: YYYY-MM-DD
category: smoking        # one of the seven categories above
tags: ["Tag1", "Tag2"]   # optional
servings: 4
prepTime: "30 mins"      # optional
cookTime: "2 hours"      # optional
image: assets/images/filename.jpg  # optional
description: "One sentence description shown on the recipe card."
---
```
