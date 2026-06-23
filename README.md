# Connolly Recipes

A recipe site for smoking, baking, and cooking — built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Running Locally

### Prerequisites

Install [mise](https://mise.jdx.dev/) to manage Node versions:

```bash
curl https://mise.run | sh
eval "$(mise activate bash)"   # or zsh
```

### Setup

```bash
mise install       # installs Node 22
npm install        # installs dependencies
```

### Dev server

```bash
npm run dev        # → http://localhost:4300
```

### Build

```bash
npm run build      # outputs to dist/
npm run preview    # preview the build locally
```

## Adding a Recipe

Create a `.md` file in `src/content/recipes/<category>/`:

```markdown
---
title: "Smoked Brisket"
date: 2026-06-23
category: smoking
tags: ["beef", "low-and-slow"]
servings: 6
cookTime: "12 hours"
---

## Ingredients
- [ ] 5kg brisket
...

## Method
1. ...
```

**Categories:** `smoking` | `baking` | `cooking` | `rubs` | `sauces`

## Deploying

Push to `master` — GitHub Actions builds and deploys automatically.

Make sure GitHub Pages is configured to use **GitHub Actions** as the source (Settings → Pages → Source).
