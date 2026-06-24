# PR Process

## Raising a PR

1. Push your branch to GitHub
2. Open a pull request targeting `master`
3. GitHub will automatically populate the **PR template** — fill in every section
4. If it's a visual or design change, add a screenshot

## PR Template Sections

**What does this PR do?** — one plain-English sentence.

**Type of change** — tick the relevant checkbox:
- 🍽️ New recipe
- ✏️ Recipe update
- ✨ New feature
- 🐛 Bug fix
- 🎨 Style / design
- 🔧 Config / chore

**Recipe details** — only for recipe PRs. Fill in the name, category, servings, and whether you've cooked and tested the recipe in real life.

**Checklist** — work through this before marking the PR ready:

| Check | Why it matters |
|-------|---------------|
| `npm run build` passes | Catches TypeScript errors, broken frontmatter, missing images |
| Recipe page renders correctly | Confirm ingredients scale, internal links open, images load |
| Mobile layout | Cards and recipe pages must work on small screens |
| Dark mode | Check the recipe page and any new components in dark mode |
| Images in correct folder | `public/assets/images/` — anything outside won't be deployed |
| Internal links | Must use `/recipes/{category}/{slug}` format |

**Screenshots** — required for any `style/` or `feature/` PR; optional but appreciated for recipe PRs if there's a photo.

## Merging

1. Confirm the checklist is complete and the build is green
2. Merge the PR into `master`
3. Delete the branch — GitHub Actions will automatically build and deploy to [connollyrecipes.co.uk](https://connollyrecipes.co.uk) within ~2 minutes

## Hotfixes

For urgent fixes (broken link, missing image on live site):

```bash
git checkout -b fix/broken-hero-image
# fix it
git push -u origin fix/broken-hero-image
# open PR, merge immediately, branch deletes automatically
```
