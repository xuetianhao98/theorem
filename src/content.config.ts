import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      category: z.enum(['tech', 'travel', 'life', 'reading']),
      tags: z.array(z.string()).default([]),
      summary: z.string(),
      icon: z.string().optional(),
      location: z.string().optional(),
      cover: image().optional(),
      coverCaption: z.string().optional(),
      book: z.object({ title: z.string(), author: z.string(), finished: z.coerce.date().optional() }).optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
