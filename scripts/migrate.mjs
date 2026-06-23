import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { join, basename } from 'path';

const POSTS_DIR = '_posts';
const OUT_DIR   = 'src/content/recipes';

// Which _posts/ subdirs map to which content category
const CATEGORY_MAP = {
  Cooking: 'cooking',
  Smoking: 'smoking',
  Baking:  'baking',
  Rubs:    'rubs',
  Sauces:  'sauces',
};

async function migrate() {
  const dirs = await readdir(POSTS_DIR);

  for (const dir of dirs) {
    const category = CATEGORY_MAP[dir];
    if (!category) { console.warn(`Skipping unknown dir: ${dir}`); continue; }

    const outDir = join(OUT_DIR, category);
    await mkdir(outDir, { recursive: true });

    let files;
    try { files = await readdir(join(POSTS_DIR, dir)); }
    catch { continue; }

    for (const file of files) {
      if (!file.endsWith('.md')) continue;

      const content = await readFile(join(POSTS_DIR, dir, file), 'utf-8');
      const transformed = transform(content, category);
      if (!transformed) { console.warn(`  Skipping (no frontmatter): ${file}`); continue; }

      // Strip YYYY-MM-DD- prefix and lowercase
      const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').toLowerCase();
      await writeFile(join(outDir, slug), transformed);
      console.log(`  ✓ ${dir}/${file} → ${outDir}/${slug}`);
    }
  }

  console.log('\nMigration complete.');
}

function transform(content, category) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return null;

  const [, fm, body] = match;

  const titleM = fm.match(/^title:\s*(.+)/m);
  const dateM  = fm.match(/^date:\s*(\d{4}-\d{2}-\d{2})/m);
  const catsM  = fm.match(/^categories:\s*\[([^\]]+)\]/m);

  const title = titleM ? titleM[1].trim() : 'Untitled';
  const date  = dateM  ? dateM[1] : new Date().toISOString().split('T')[0];

  // First category element is the folder (already known), rest become tags
  let tags = [];
  if (catsM) {
    const parts = catsM[1].split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
    tags = parts.slice(1); // skip the first (main category)
  }

  // Strip Jekyll-specific image attributes and clean up body
  const cleanBody = body
    .replace(/\{:[^}]+\}/g, '')        // {: .class .class }
    .replace(/\n{3,}/g, '\n\n')        // excessive blank lines
    .trimStart();

  const lines = [
    `title: "${title.replace(/"/g, "'")}"`,
    `date: ${date}`,
    `category: ${category}`,
    tags.length > 0 ? `tags: [${tags.map(t => `"${t}"`).join(', ')}]` : null,
    `servings: 4`,
  ].filter(Boolean);

  return `---\n${lines.join('\n')}\n---\n\n${cleanBody}`;
}

migrate().catch(err => { console.error(err); process.exit(1); });
