# Branching Conventions

All work branches off `master`. Branch names follow the pattern:

```
type/short-description
```

- All lowercase, kebab-case
- Keep the description to 3–4 words
- No special characters beyond hyphens

## Prefixes

| Prefix | Use for | Examples |
|--------|---------|---------|
| `recipe/` | Adding a new recipe or editing an existing one | `recipe/add-sourdough-bread` `recipe/update-brisket-servings` |
| `feature/` | New website functionality | `feature/search-bar` `feature/dark-mode` `feature/shopping-list` |
| `fix/` | Bug fixes (broken links, layout issues, broken behaviour) | `fix/broken-image-links` `fix/scaler-not-updating` |
| `style/` | Visual / design changes with no functional impact | `style/card-hover-effect` `style/header-redesign` |
| `chore/` | Config, dependencies, CI, non-user-facing changes | `chore/update-astro` `chore/github-actions` `chore/wiki-docs` |

## Workflow

```bash
# Start from an up-to-date master
git checkout master
git pull

# Create your branch
git checkout -b recipe/add-focaccia

# Do your work, then push
git add .
git commit -m "Add focaccia recipe with rosemary and sea salt"
git push -u origin recipe/add-focaccia

# Open a pull request on GitHub — the PR template fills in automatically
```

## Tips

- One recipe per branch keeps PRs small and easy to review
- Use the `recipe/` prefix for both new recipes **and** edits to existing ones
- `fix/` is for anything broken; `style/` is for polish that doesn't change behaviour
- Avoid long-running branches — merge and delete once the PR is in
