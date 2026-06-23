import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { visit } from 'unist-util-visit';

const BASE = '/ConnollyRecipes';

// Rewrite absolute image paths to include the base path
function remarkPrefixImages() {
  return function (tree) {
    visit(tree, 'image', function (node) {
      if (node.url && node.url.startsWith('/') && !node.url.startsWith(BASE)) {
        node.url = BASE + node.url;
      }
    });
    // Also strip Jekyll image attributes like {: .dark .w-75 .normal }
    visit(tree, 'paragraph', function (node) {
      if (node.children) {
        node.children.forEach(child => {
          if (child.type === 'text') {
            child.value = child.value.replace(/\{:[^}]+\}/g, '').trim();
          }
        });
      }
    });
  };
}

export default defineConfig({
  site: 'https://sqltechhead.github.io/ConnollyRecipes',
  base: BASE,
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [remarkPrefixImages],
  },
});
