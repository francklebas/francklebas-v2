# francklebas-v2

Refonte du portfolio [francklebas.com](https://francklebas.com), en **Nuxt 4** (Vue 3,
TypeScript). Une page par section (`app/pages/`), i18n en/fr sans changement d'URL
(`@nuxtjs/i18n`, stratégie `no_prefix`), contenu (projets, études de cas) géré via
`@nuxt/content` plutôt qu'en dur dans les composants.

## Développement

```bash
bun install
bun run dev        # http://localhost:3000
```

## Contenu — ajouter un projet ou une étude de cas

Les projets affichés sur `/projects` viennent de `content/projects/*.yml` (un fichier
par projet, schéma dans `content.config.ts`). Ajouter un projet = ajouter un fichier,
aucun code à toucher :

```yaml
key: monprojet
num: "07"
title: Mon Projet
image: /images/monprojet-thumb.png   # optionnel, sinon placeholder "Project screenshot"
stack: [Vue 3, TypeScript]
link: https://monprojet.example.com   # optionnel
linkLabel: monprojet.example.com
role: { en: Creator, fr: Créateur }
desc: { en: "...", fr: "..." }
hasLanding: true   # true si une page d'étude de cas existe (voir ci-dessous)
```

Les images référencées par `image:` doivent être déposées dans `public/` (ex.
`public/images/monprojet-thumb.png`) pour que le chemin `/images/...` fonctionne.

Si `hasLanding: true`, une page `/projects/<key>` est générée à partir de
`content/project-landings/<key>.yml` :

```yaml
key: monprojet
hero:
  title: { en: "...", fr: "..." }
  body: { en: "...", fr: "..." }
  image: /images/monprojet-hero.png   # optionnel
  cta: { label: { en: "...", fr: "..." }, href: https://... }   # optionnel

# Sections libres, toutes optionnelles — n'affichées que si présentes :
context:  { title: { en: "...", fr: "..." }, body: { en: "...", fr: "..." } }
approach: { title: { en: "...", fr: "..." }, body: { en: "...", fr: "..." } }
results:  { title: { en: "...", fr: "..." }, body: { en: "...", fr: "..." } }
gallery:
  - src: /images/monprojet-1.png
    alt: "..."
```

## Build statique

Le site est purement statique — `generate` produit un dossier déployable partout
(Cloudflare Pages, GitHub Pages, Netlify…) :

```bash
bun run generate   # sortie dans .output/public
bun run preview
```

## Déploiement — recette `v2.francklebas.com`

Cloudflare Workers Static Assets (config dans `wrangler.jsonc`) :

```bash
bun run generate
bunx wrangler deploy   # sert .output/public + crée le DNS de v2.francklebas.com
```

Prérequis : la zone `francklebas.com` doit être sur le même compte Cloudflare (login
`wrangler login` au préalable). Le domaine est en `custom_domain`, wrangler crée
l'enregistrement DNS au premier deploy.

## À finaliser

- **Captures projets** : les cartes supportent une image (`image:` dans
  `content/projects/*.yml`), mais aucun projet n'en a encore — elles affichent le
  placeholder « Project screenshot » en attendant.
- **Polices** : Fraunces / Space Grotesk chargées depuis Google Fonts (`nuxt.config.ts`) —
  à self-host si tu veux zéro dépendance externe.
- **CSS global** : les styles de toutes les pages vivent encore dans `app/app.vue`
  (`<style>` global) plutôt que scoped par page/composant.
- **Listes en dur** : `skills.vue`, `experience.vue` et `index.vue` gardent leurs
  listes (compétences, timeline, stack, réseaux) dans le script plutôt qu'en content
  collection — contrairement à `projects`, les modifier demande de toucher au code.

## Liens démo vérifiés (live)

- Suivi de candidatures → https://jobs.francklebas.com
- Resume AI → https://resume.francklebas.com
