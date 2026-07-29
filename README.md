# francklebas-v2

Refonte du portfolio [francklebas.com](https://francklebas.com), convertie depuis le design
`Portfolio.dc.html` vers un projet **Nuxt 4** (Vue 3, TypeScript).

Single-page avec navigation interne (Home / Projects / Experience / Skills / Contact) :
une machine à états côté client, pas de routing. Tout vit dans `app/app.vue`.

## Développement

```bash
bun install
bun run dev        # http://localhost:3000
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

> ⚠️ Recette : `nuxt.config.ts` pose un `robots: noindex, nofollow`.
> **Le retirer** quand v2 remplace la prod.

## À finaliser

- **Bouton « Download CV »** : câblé sur `/cv.pdf` (hero + contact). Déposer le PDF dans
  `public/cv.pdf` — servi depuis l'edge Cloudflare (CDN).
- **Captures projets** : les cartes affichent un placeholder « Project screenshot ».
- **Polices** : Fraunces / Space Grotesk chargées depuis Google Fonts (`nuxt.config.ts`) —
  à self-host si tu veux zéro dépendance externe.

## Liens démo vérifiés (live)

- Suivi de candidatures → https://jobs.francklebas.com
- Resume AI → https://resume.francklebas.com
