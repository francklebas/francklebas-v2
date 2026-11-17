import { globSync } from "node:fs";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@nuxtjs/i18n", "nuxt-studio", "@nuxt/content", "@nuxt/fonts"],

  // Polices auto-hébergées (téléchargées au build dans public/_fonts) : plus de feuille Google
  // bloquante, préchargement, et police de repli aux mêmes métriques (pas de saut de mise en page).
  fonts: {
    families: [
      {
        name: "Fraunces",
        provider: "google",
        weights: [400, 500, 600, 700],
        styles: ["normal"],
        // Axe optique conservé (titres en opsz 144) : nécessite `subset-font` en devDependency.
        variableAxis: { opsz: [["9", "144"]] },
        preload: { subsets: ["latin"] },
      },
      {
        name: "Space Grotesk",
        provider: "google",
        weights: [400, 500, 600, 700],
        styles: ["normal"],
        preload: { subsets: ["latin"] },
      },
    ],
  },

  // Palettes par page (couleur dominante), appliquées via <html data-palette>.
  css: ["~/assets/css/palettes.scss"],

  studio: {
    repository: {
      provider: "github",
      owner: "francklebas",
      repo: "francklebas-v2",
      branch: "main",
    },
  },

  i18n: {
    strategy: "no_prefix", // single-page à état client : la langue bascule sans changer d'URL
    defaultLocale: "en",
    locales: [
      { code: "en", language: "en-US", name: "English" },
      { code: "fr", language: "fr-FR", name: "Français" },
      { code: "sv", language: "sv-SE", name: "Svenska" },
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

  // Les variantes /blog/<locale>/<slug> (prévisualisation Studio) ne sont liées nulle part :
  // on les prérend explicitement à partir des fichiers de content/blog.
  hooks: {
    "nitro:config"(config) {
      const routes = globSync("content/blog/*/*.md").map(
        (file) => `/${file.replace(/^content\//, "").replace(/\.md$/, "")}`,
      );
      config.prerender ??= {};
      config.prerender.routes = [...(config.prerender.routes ?? []), ...routes];
    },
  },

  // Navigation enveloppée dans document.startViewTransition (désactivé si prefers-reduced-motion).
  // Le balayage diagonal est défini dans app.vue (::view-transition-new(root)).
  experimental: {
    viewTransition: true,
  },

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
      ],
      script: [
        {
          // Applique le thème mémorisé avant le premier rendu (évite le flash sombre → clair).
          innerHTML:
            "try{if(localStorage.getItem('theme')==='light')document.documentElement.dataset.theme='light'}catch(e){}",
          tagPosition: "head",
        },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      ],
    },
  },
});