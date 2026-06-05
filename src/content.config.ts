import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** 产品集合 */
const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/products' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    image: z.string(),
    images: z.array(z.string()).optional().default([]),
    moq: z.string().optional().default(''),
    deliveryTime: z.string().optional().default(''),
    certifications: z.array(z.string()).optional().default([]),
    features: z.array(z.string()).optional().default([]),
    specifications: z.array(z.object({
      name: z.string(),
      value: z.string(),
    })).optional().default([]),
    customOptions: z.array(z.string()).optional().default([]),
    // Packaging & shipping
    packagingInfo: z.string().optional().default(''),
    cartonDimensions: z.string().optional().default(''),
    grossWeight: z.string().optional().default(''),
    netWeight: z.string().optional().default(''),
    containerLoading: z.string().optional().default(''),
    // FAQs
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional().default([]),
    featured: z.boolean().optional().default(false),
    order: z.number().optional().default(0),
    updated: z.date().optional(),
  }),
});

/** 博客集合 */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    author: z.string().optional().default('JinDa Rehab Medical'),
    date: z.date(),
    updated: z.date().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

export const collections = { products, blog };
