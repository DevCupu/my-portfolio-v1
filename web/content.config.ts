import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const imageSchema = z.object({
  src: z.string(),
  alt: z.string()
})

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: 'page',
      source: 'projects/*.md',
      schema: z.object({
        title: z.string(),
        kicker: z.string(),
        subtitle: z.string(),
        tags: z.array(z.string()),
        image: imageSchema.optional(),
        gallery: z.array(imageSchema).optional(),
        github: z.string().optional(),
        links: z.array(z.object({ label: z.string(), url: z.string() })).optional(),
        home: z.object({
          order: z.number(),
          title: z.string(),
          summary: z.string(),
          description: z.string(),
          tags: z.array(z.string()),
          image: z.string().optional()
        }).optional(),
        listing: z.object({
          period: z.string(),
          type: z.string(),
          icon: z.string(),
          gradient: z.string(),
          description: z.string(),
          tags: z.array(z.string())
        })
      })
    }),
    products: defineCollection({
      type: 'page',
      source: 'products/*.md',
      schema: z.object({
        title: z.string(),
        tagline: z.string(),
        price: z.string(),
        image: imageSchema.optional(),
        link: z.string(),
        tags: z.array(z.string())
      })
    })
  }
})
