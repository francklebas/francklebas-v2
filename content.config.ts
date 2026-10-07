import { defineContentConfig, defineCollection, z } from "@nuxt/content";

const localized = z.object({
  en: z.string(),
  fr: z.string(),
});

const caseSection = z.object({
  title: localized,
  body: localized,
});

export default defineContentConfig({
  collections: {
    projects: defineCollection({
      type: "data",
      source: "projects/*.yml",
      schema: z.object({
        key: z.string(),
        num: z.string(),
        title: z.string(),
        image: z.string().optional(),
        stack: z.array(z.string()),
        link: z.string().optional(),
        linkLabel: localized.optional(),
        role: localized,
        desc: localized,
        hasLanding: z.boolean().default(false),
        // Résumé problème → solution → résultat affiché sur la home (optionnel).
        highlight: z
          .object({
            problem: localized,
            solution: localized,
            result: localized,
          })
          .optional(),
      }),
    }),
    projectLandings: defineCollection({
      type: "data",
      source: "project-landings/*.yml",
      schema: z.object({
        key: z.string(),
        hero: z.object({
          title: localized,
          body: localized,
          image: z.string().optional(),
          cta: z
            .object({
              label: localized,
              href: z.string(),
            })
            .optional(),
        }),
        context: caseSection.optional(),
        approach: caseSection.optional(),
        results: caseSection.optional(),
        gallery: z
          .array(
            z.object({
              src: z.string(),
              alt: z.string().optional(),
              href: z.string().optional(),
            }),
          )
          .optional(),
      }),
    }),
  },
});
