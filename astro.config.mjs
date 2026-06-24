import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { visit } from 'unist-util-visit';

// Rewrite absolute image paths — no-op now that base is '/', kept for Jekyll attribute stripping
function remarkPrefixImages() {
  return function (tree) {
    visit(tree, 'image', function () {});
    visit(tree, 'link', function () {});
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
  site: 'https://connollyrecipes.co.uk',
  base: '/',
  integrations: [tailwind()],
  markdown: {
    remarkPlugins: [remarkPrefixImages],
  },
});
