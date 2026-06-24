# CLAUDE.md

Project-specific rules and conventions for working on Connolly Recipes.

## Documentation Formatting

| Format | When to use |
|--------|-------------|
| Table | Any structured data with two or more columns — tech stacks, option comparisons, labelled lists |
| Numbered list | Ordered steps where sequence matters — workflows, how-to guides, processes |
| Bullet points | Unordered items that don't fit a table — tips, constraints, feature lists |

Never use bullet points for sequential steps. Never use numbered lists for unordered items.

## Build Commands

`npm run build` fails in WSL due to UNC path issues. Always use:

```bash
# Build
~/.local/bin/mise exec -- /home/connollyd/projects/recipes/node_modules/.bin/astro build

# Dev server
~/.local/bin/mise exec -- /home/connollyd/projects/recipes/node_modules/.bin/astro dev --host
```

## Astro / View Transitions

All page-level scripts must be wrapped in `astro:page-load` — not top-level module execution — so they reinitialise correctly after View Transitions navigation:

```ts
document.addEventListener('astro:page-load', () => {
  // all init logic here
});
```

The header and progress bar use `transition:persist` and must not be re-mounted on navigation.

## Base URL

`base` is `/` — the site is served from the root of `connollyrecipes.co.uk`. Internal links in markdown use `/recipes/{category}/{slug}` with no prefix. In templates, always derive the base from `import.meta.env.BASE_URL`:

```ts
const rawBase = import.meta.env.BASE_URL;
const base = rawBase.endsWith('/') ? rawBase : rawBase + '/';
```

## Recipe Content

### Frontmatter schema

```yaml
title: "Recipe Title"
date: YYYY-MM-DD
category: smoking        # smoking | cakes | traybakes | breads | cooking | rubs | sauces
tags: ["Tag1"]           # optional
servings: 4
prepTime: "30 mins"      # optional
cookTime: "2 hours"      # optional
image: assets/images/filename.jpg  # optional
description: "One sentence shown on the recipe card."
```

### Markdown conventions

- Ingredient lists use `- [ ]` task-list checkboxes (rendered as interactive checkboxes)
- Sub-sections within ingredients use `###` headings between `## Ingredients` and `## Method`
- Internal links use `/recipes/{category}/{slug}` — the remark plugin no longer prefixes these
- Images go in `public/assets/images/`

### Servings scaler

The client-side scaler collects all `ul` elements between `## Ingredients` and the next `## Method` h2, walking siblings to handle sub-sectioned recipes. It scales text nodes using fraction symbols (½ ¼ etc.) and integrates with the unit converter — always call the unified `render()` function rather than updating text nodes directly.

## localStorage Keys

| Key | Type | Purpose |
|-----|------|---------|
| `theme` | `'dark' \| 'light'` | Dark mode preference |
| `fav-recipes` | `string[]` | Slugs of favourited recipes |
| `ratings` | `Record<string, number>` | Star ratings keyed by slug (1–5) |
| `units` | `'imperial' \| 'metric'` | Unit converter preference |
| `shopping-list` | `ShoppingItem[]` | Shopping list items |

## Branching & PRs

See [wiki/Branching-Conventions.md](wiki/Branching-Conventions.md) and [wiki/PR-Process.md](wiki/PR-Process.md).

Branch format: `type/short-description` — types are `recipe/`, `feature/`, `fix/`, `style/`, `chore/`.
