// @ts-check
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const seoSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    seo: seoSchema.optional(),
  }),
});

const faqItemSchema = z.object({
  q: z.string(),
  a: z.string(),
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    toolKey: z.string(),
    tagline: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    price: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    bestFor: z.array(z.string()),
    affiliateKey: z.string(),
    ctaLabel: z.string(),
    faq: z.array(faqItemSchema).optional(),
    seo: seoSchema,
  }),
});

const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comparisons' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    toolAKey: z.string(),
    toolBKey: z.string(),
    verdict: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    seo: seoSchema.optional(),
  }),
});

const alternatives = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/alternatives' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    toolKey: z.string(),
    topAlternatives: z.array(z.string()),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    seo: seoSchema.optional(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    readingTime: z.number().optional(),
    seo: seoSchema.optional(),
  }),
});

const best = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/best' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    categoryKey: z.string(),
    featuredTools: z.array(z.string()),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    seo: seoSchema.optional(),
  }),
});

const featuredPageSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const categories = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/categories' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    intro: z.string(),
    featuredPages: z.array(featuredPageSchema),
    seo: seoSchema.optional(),
  }),
});

export const collections = {
  pages,
  reviews,
  comparisons,
  alternatives,
  guides,
  best,
  categories,
};
