import { defineCollection, z } from 'astro:content';

const recipes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['smoking', 'cakes', 'traybakes', 'breads', 'cooking', 'rubs', 'sauces']),
    tags: z.array(z.string()).optional().default([]),
    image: z.string().optional(),
    servings: z.number().optional().default(4),
    prepTime: z.string().optional(),
    cookTime: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { recipes };
