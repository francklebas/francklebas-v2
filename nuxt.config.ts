// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxtjs/i18n"],

  i18n: {
    strategy: "no_prefix", // single-page à état client : la langue bascule sans changer d'URL
    defaultLocale: "en",
    locales: [
      { code: "en", language: "en-US", name: "English" },
      { code: "fr", language: "fr-FR", name: "Français" },
    ],
    vueI18n: "i18n.config.ts",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_locale",
      fallbackLocale: "en",
      redirectOn: "root",
    },
  },

  // Portfolio statique : `bun run generate` produit un dossier .output/public
  // déployable tel quel sur Cloudflare Pages, GitHub Pages, etc.
  ssr: true,

  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Franck Lebas — Frontend Architect",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Frontend architect designing durable, high-performance interfaces since 2008. Vue, React, TypeScript.",
        },
        // Recette : on empêche l'indexation (doublon du site prod). À RETIRER au passage en production.
        { name: "robots", content: "noindex, nofollow" },
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Space+Grotesk:wght@400;500;600;700&display=swap",
        },
      ],
    },
  },
});
