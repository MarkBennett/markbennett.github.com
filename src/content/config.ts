import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    bskyUrl: z.string().url().optional(),
  }),
});

const project = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(["project", "talk"]),
    url: z.string(),
    order: z.number(),
  }),
});

export const collections = { blog, project };
