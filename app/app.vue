<script setup lang="ts">
// Portfolio single-page — converti depuis le design Portfolio.dc.html.
// La navigation interne (Home / Projects / Experience / Skills / Contact) est une
// simple machine à états côté client : pas de routing, tout vit dans cette page.
// i18n en/fr via @nuxtjs/i18n (stratégie no_prefix : bascule sans changer d'URL).

const { t, locale, setLocale } = useI18n()

const accent = '#B87333'
const muted = '#8FA8B2'

// <html lang> suit la locale active.
useHead({ htmlAttrs: { lang: locale } })

type Page = 'accueil' | 'projets' | 'experience' | 'competences' | 'contact'
const page = ref<Page>('accueil')
const showMap = ref(false)

// Réglages repris des props du design (valeurs par défaut).
const waveMotion = true
const motifDensity = ref<'subtle' | 'moderate'>('moderate')
const showCoordinates = computed(() => motifDensity.value !== 'subtle')

const nav = [
  { id: 'accueil', key: 'home', num: '01' },
  { id: 'projets', key: 'projects', num: '02' },
  { id: 'experience', key: 'experience', num: '03' },
  { id: 'competences', key: 'skills', num: '04' },
  { id: 'contact', key: 'contact', num: '05' },
] as const

function langStyle(code: string) {
  return {
    cursor: 'pointer',
    fontSize: '12px',
    letterSpacing: '1px',
    fontWeight: locale.value === code ? 600 : 400,
    color: locale.value === code ? accent : muted,
  }
}

// Coordonnées de contact.
const contact = {
  email: 'francklebas@ik.me',
  phone: '+33 7 45 65 51 08',
}

// CV servi statiquement (edge Cloudflare = CDN). Déposer le PDF dans public/cv.pdf.
const cvUrl = '/cv.pdf'

// Métadonnées non traduisibles (noms propres, stack, liens) ; rôle + description via i18n.
// Corrections vs design d'origine : Resume AI = Nuxt/Mistral (pas Next/OpenAI) + lien démo ;
// jobs ajouté (démo live) ; Fanny AI sans lien (non exposé).
const projectMeta = [
  { key: 'portail', num: '01', title: 'Portail Autoentrepreneur', stack: ['Vue 3', 'TypeScript', 'SCSS'], link: 'https://portail-autoentrepreneur.fr', linkLabel: 'portail-autoentrepreneur.fr' },
  { key: 'jobs', num: '02', title: 'Suivi de candidatures', stack: ['Nuxt 4', 'TypeScript', 'Supabase'], link: 'https://jobs.francklebas.com', linkLabel: 'jobs.francklebas.com' },
  { key: 'resume', num: '03', title: 'Resume AI', stack: ['Nuxt 4', 'TypeScript', 'Mistral AI', 'Cloudflare'], link: 'https://resume.francklebas.com', linkLabel: 'resume.francklebas.com' },
  { key: 'fanny', num: '04', title: 'Fanny AI', stack: ['Python', 'Docker'], link: '', linkLabel: '' },
  { key: 'aurora', num: '05', title: 'AURORA Commerce', stack: ['Nuxt 4', 'Stripe'], link: 'https://aurora.francklebas.com', linkLabel: 'aurora.francklebas.com' },
  { key: 'llm', num: '06', title: 'LLM Review Framework', stack: ['Node.js', 'CLI', 'LLM'], link: 'https://github.com/francklebas/llm-review-framework', linkLabel: 'github.com/francklebas' },
] as const

const projects = computed(() =>
  projectMeta.map((p) => ({
    ...p,
    role: t(`projects.${p.key}.role`),
    desc: t(`projects.${p.key}.desc`),
    hasLink: !!p.link,
  })),
)

const timelineMeta = [
  { key: 'y2008', year: '2008' },
  { key: 'y2013', year: '2013' },
  { key: 'y2018', year: '2018' },
  { key: 'y2022', year: '2022' },
  { key: 'y2024', year: '2024' },
  { key: 'now', year: '' },
] as const

const timeline = computed(() =>
  timelineMeta.map((e) => ({
    year: e.key === 'now' ? t('timeline.nowLabel') : e.year,
    role: t(`timeline.${e.key}.role`),
    company: t(`timeline.${e.key}.company`),
    desc: t(`timeline.${e.key}.desc`),
  })),
)

const skillMeta = [
  { key: 'core', items: ['Vue 3', 'React', 'TypeScript'] },
  { key: 'meta', items: ['Nuxt 4'] },
  { key: 'styling', items: ['SCSS', 'Tailwind'] },
  { key: 'runtime', items: ['Node.js', 'Bun'] },
] as const

const skillGroups = computed(() =>
  skillMeta.map((g) => ({ group: t(`skills.${g.key}`), items: g.items })),
)

// Titres d'articles / réseaux : noms propres, non traduits.
const writing = [
  { title: 'Frontend best practices', source: 'Medium', link: 'https://medium.com/codex/front-end-best-practices-666f09a4dfd' },
  { title: 'TDD for frontend developers', source: 'Medium', link: 'https://wearelion.medium.com/fast-and-reliable-coding-through-tdd-1b50c8ad0028' },
  { title: 'React 16.3 and the new Context API', source: 'Putain de Code', link: 'https://putaindecode.io/articles/react-16-3-et-la-nouvelle-api-context' },
  { title: 'AURORA Commerce articles', source: 'DEV Community', link: 'https://dev.to/francklebas' },
]

const socials = [
  { label: 'LinkedIn', link: 'https://linkedin.com/in/francklebas' },
  { label: 'GitHub', link: 'https://github.com/francklebas' },
  { label: 'DEV.to', link: 'https://dev.to/francklebas' },
  { label: 'francklebas.com', link: 'https://francklebas.com' },
]

const stackChips = ['Vue 3', 'Nuxt 4', 'React', 'TypeScript', 'SCSS', 'Tailwind', 'Node.js', 'Bun']

const waveWrapStyle = computed(() => ({
  position: 'absolute' as const,
  bottom: 0,
  left: 0,
  width: '100%',
  filter: 'blur(14px)',
  animation: waveMotion ? 'wavePulse 10s ease-in-out infinite' : 'none',
}))
</script>

<template>
  <div class="root">
    <nav class="top">
      <div style="display:flex;align-items:center;gap:10px;cursor:pointer;" @click="page = 'accueil'">
        <span style="width:12px;height:12px;border:2px solid #B87333;border-radius:50%;display:flex;align-items:center;justify-content:center;">
          <span style="width:4px;height:4px;background:#B87333;border-radius:50%;" />
        </span>
        <span style="font-size:13px;font-weight:600;letter-spacing:2px;">FRANCK LEBAS</span>
      </div>
      <div style="display:flex;align-items:center;gap:32px;flex-wrap:wrap;">
        <div
          v-for="n in nav"
          :key="n.id"
          class="nav-item"
          :style="{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px', fontWeight: page === n.id ? 600 : 400, color: page === n.id ? accent : muted }"
          @click="page = n.id"
        >
          <span style="color:#B87333;font-size:11px;margin-right:6px;">{{ n.num }}</span>{{ t(`nav.${n.key}`) }}
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="nav-item" :style="langStyle('en')" @click="setLocale('en')">EN</span>
          <span style="color:rgba(143,168,178,0.4);font-size:12px;">/</span>
          <span class="nav-item" :style="langStyle('fr')" @click="setLocale('fr')">FR</span>
        </div>
      </div>
    </nav>

    <!-- 01 — HOME -->
    <div v-if="page === 'accueil'" class="page-enter" style="padding-top:96px;">
      <section class="hero pad-x">
        <div :style="waveWrapStyle">
          <svg width="100%" height="320" viewBox="0 0 800 320" preserveAspectRatio="none" style="display:block;">
            <defs>
              <linearGradient id="waveFade1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#8FA8B2" stop-opacity="0.35" />
                <stop offset="35%" stop-color="#8FA8B2" stop-opacity="0.16" />
                <stop offset="70%" stop-color="#8FA8B2" stop-opacity="0.05" />
                <stop offset="100%" stop-color="#8FA8B2" stop-opacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,320 L0,90 Q100,50 200,90 T400,90 T600,90 T800,90 L800,320 Z" fill="url(#waveFade1)" />
          </svg>
        </div>
        <div style="position:relative;z-index:2;max-width:960px;">
          <div style="font-size:13px;letter-spacing:3px;color:#B87333;font-weight:600;margin-bottom:20px;">{{ t('hero.eyebrow') }}</div>
          <h1 class="fr" style="font-weight:500;font-size:clamp(40px,6vw,84px);line-height:1.05;margin:0;max-width:920px;">{{ t('hero.headline') }}</h1>
          <p style="font-size:19px;color:#8FA8B2;max-width:640px;margin:28px 0 0;line-height:1.6;">{{ t('hero.subtitle') }}</p>
          <div
            v-if="showCoordinates"
            style="font-size:13px;letter-spacing:1px;color:#B87333;margin-top:20px;cursor:pointer;text-decoration:underline;text-decoration-style:dotted;text-underline-offset:4px;"
            @click="showMap = true"
          >
            43.2965° N, 5.3698° E
          </div>
          <div style="display:flex;gap:16px;margin-top:44px;flex-wrap:wrap;">
            <div style="background:#B87333;color:#0B1D26;padding:14px 28px;font-weight:600;font-size:15px;cursor:pointer;border-radius:2px;" @click="page = 'projets'">{{ t('hero.viewProjects') }}</div>
            <a :href="cvUrl" download style="border:1px solid #8FA8B2;color:#EDEEE9;padding:14px 28px;font-weight:500;font-size:15px;cursor:pointer;border-radius:2px;text-decoration:none;">{{ t('cta.downloadCV') }}</a>
          </div>
        </div>
      </section>

      <section class="two-col pad-x" style="padding-top:100px;padding-bottom:140px;display:grid;grid-template-columns:1fr 1fr;gap:64px;">
        <div>
          <h2 class="fr" style="font-weight:500;font-size:32px;margin:0 0 20px;">{{ t('home.whatIdoHeading') }}</h2>
          <p style="color:#8FA8B2;font-size:16px;line-height:1.75;margin:0;max-width:480px;">{{ t('home.whatIdoBody') }}</p>
        </div>
        <div>
          <h2 class="fr" style="font-weight:500;font-size:22px;margin:0 0 20px;color:#8FA8B2;">{{ t('home.stack') }}</h2>
          <div style="display:flex;flex-wrap:wrap;gap:10px;">
            <span v-for="chip in stackChips" :key="chip" style="border:1px solid rgba(143,168,178,0.3);padding:8px 16px;font-size:13px;border-radius:2px;color:#EDEEE9;">{{ chip }}</span>
          </div>
        </div>
      </section>
    </div>

    <!-- 02 — PROJECTS -->
    <div v-else-if="page === 'projets'" class="page-enter" style="padding-top:96px;">
      <header class="pad-x" style="padding-top:100px;padding-bottom:40px;">
        <div style="font-size:13px;letter-spacing:3px;color:#B87333;font-weight:600;margin-bottom:16px;">{{ t('sections.selectedWork') }}</div>
        <h2 class="fr" style="font-weight:500;font-size:56px;margin:0;">{{ t('sections.projects') }}</h2>
      </header>
      <section class="two-col pad-x" style="padding-bottom:140px;display:grid;grid-template-columns:1fr 1fr;gap:32px;">
        <div v-for="project in projects" :key="project.num" class="card" style="border:1px solid rgba(143,168,178,0.2);border-radius:4px;overflow:hidden;background:rgba(255,255,255,0.02);">
          <div class="shot">Project screenshot</div>
          <div style="padding:28px;">
            <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:8px;">
              <span class="fr" style="color:#B87333;font-size:15px;">{{ project.num }}</span>
              <h3 class="fr" style="font-weight:500;font-size:24px;margin:0;">{{ project.title }}</h3>
            </div>
            <div style="font-size:12px;letter-spacing:1.5px;color:#8FA8B2;text-transform:uppercase;margin-bottom:14px;">{{ project.role }}</div>
            <p style="font-size:15px;color:#c8d2d6;line-height:1.6;margin:0 0 18px;">{{ project.desc }}</p>
            <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;">
              <span v-for="tech in project.stack" :key="tech" style="font-size:12px;border:1px solid rgba(143,168,178,0.3);padding:5px 12px;border-radius:2px;color:#8FA8B2;">{{ tech }}</span>
            </div>
            <a v-if="project.hasLink" :href="project.link" target="_blank" rel="noopener" style="color:#B87333;font-size:14px;text-decoration:none;">{{ project.linkLabel }} →</a>
          </div>
        </div>
      </section>
    </div>

    <!-- 03 — EXPERIENCE -->
    <div v-else-if="page === 'experience'" class="page-enter" style="padding-top:96px;">
      <header class="pad-x" style="padding-top:100px;padding-bottom:40px;">
        <div style="font-size:13px;letter-spacing:3px;color:#B87333;font-weight:600;margin-bottom:16px;">{{ t('sections.career') }}</div>
        <h2 class="fr" style="font-weight:500;font-size:56px;margin:0;">{{ t('sections.experience') }}</h2>
      </header>
      <section class="pad-x" style="max-width:820px;margin:0 auto;padding-bottom:140px;">
        <div v-for="entry in timeline" :key="entry.year + entry.role" style="display:flex;gap:28px;padding-bottom:48px;">
          <div class="fr" style="width:70px;flex-shrink:0;color:#B87333;font-size:18px;padding-top:2px;">{{ entry.year }}</div>
          <div class="tl-line" style="width:20px;flex-shrink:0;border-left:2px solid rgba(143,168,178,0.25);" />
          <div style="padding-bottom:8px;">
            <h3 class="fr" style="font-weight:500;font-size:22px;margin:0 0 4px;">{{ entry.role }}</h3>
            <div style="font-size:13px;color:#8FA8B2;letter-spacing:0.5px;margin-bottom:10px;">{{ entry.company }}</div>
            <p style="font-size:15px;color:#c8d2d6;line-height:1.6;margin:0;max-width:560px;">{{ entry.desc }}</p>
          </div>
        </div>
      </section>
    </div>

    <!-- 04 — SKILLS -->
    <div v-else-if="page === 'competences'" class="page-enter" style="padding-top:96px;">
      <header class="pad-x" style="padding-top:100px;padding-bottom:40px;">
        <div style="font-size:13px;letter-spacing:3px;color:#B87333;font-weight:600;margin-bottom:16px;">{{ t('sections.craft') }}</div>
        <h2 class="fr" style="font-weight:500;font-size:56px;margin:0;">{{ t('sections.skills') }}</h2>
      </header>
      <section class="two-col pad-x" style="display:grid;grid-template-columns:1fr 1fr;gap:28px;max-width:960px;">
        <div v-for="grp in skillGroups" :key="grp.group" style="border-left:2px solid #B87333;padding:6px 0 6px 20px;">
          <h3 class="fr" style="font-weight:500;font-size:19px;margin:0 0 14px;color:#8FA8B2;">{{ grp.group }}</h3>
          <div style="display:flex;flex-wrap:wrap;gap:10px;">
            <span v-for="skill in grp.items" :key="skill" style="border:1px solid rgba(143,168,178,0.3);padding:7px 14px;font-size:13px;border-radius:2px;">{{ skill }}</span>
          </div>
        </div>
      </section>
      <section class="pad-x" style="padding-top:100px;padding-bottom:140px;max-width:820px;">
        <h3 class="fr" style="font-weight:500;font-size:26px;margin:0 0 24px;">{{ t('skills.writing') }}</h3>
        <a
          v-for="post in writing"
          :key="post.link"
          :href="post.link"
          target="_blank"
          rel="noopener"
          class="row-link"
          style="display:flex;align-items:baseline;justify-content:space-between;gap:16px;padding:16px 0;border-bottom:1px solid rgba(143,168,178,0.15);text-decoration:none;color:#EDEEE9;"
        >
          <span style="font-size:16px;">{{ post.title }}</span>
          <span style="font-size:12px;color:#8FA8B2;letter-spacing:0.5px;white-space:nowrap;">{{ post.source }}</span>
        </a>
      </section>
    </div>

    <!-- 05 — CONTACT -->
    <div v-else-if="page === 'contact'" class="page-enter" style="padding-top:96px;">
      <header class="pad-x" style="padding-top:100px;padding-bottom:40px;">
        <div style="font-size:13px;letter-spacing:3px;color:#B87333;font-weight:600;margin-bottom:16px;">{{ t('sections.contactEyebrow') }}</div>
        <h2 class="fr" style="font-weight:500;font-size:56px;margin:0;">{{ t('sections.letsTalk') }}</h2>
      </header>
      <section class="two-col pad-x" style="padding-bottom:140px;display:grid;grid-template-columns:1fr 1fr;gap:64px;max-width:1000px;">
        <div>
          <div style="margin-bottom:32px;">
            <div style="font-size:12px;letter-spacing:1.5px;color:#8FA8B2;text-transform:uppercase;margin-bottom:8px;">{{ t('contact.email') }}</div>
            <a :href="`mailto:${contact.email}`" class="fr row-link" style="color:#EDEEE9;font-size:20px;text-decoration:none;">{{ contact.email }}</a>
          </div>
          <div style="margin-bottom:32px;">
            <div style="font-size:12px;letter-spacing:1.5px;color:#8FA8B2;text-transform:uppercase;margin-bottom:8px;">{{ t('contact.phone') }}</div>
            <a :href="`tel:${contact.phone.replace(/\s/g, '')}`" class="fr row-link" style="color:#EDEEE9;font-size:20px;text-decoration:none;">{{ contact.phone }}</a>
          </div>
          <a :href="cvUrl" download style="background:#B87333;color:#0B1D26;padding:14px 28px;font-weight:600;font-size:15px;cursor:pointer;border-radius:2px;display:inline-block;text-decoration:none;">{{ t('cta.downloadCV') }}</a>
        </div>
        <div>
          <div style="font-size:12px;letter-spacing:1.5px;color:#8FA8B2;text-transform:uppercase;margin-bottom:16px;">{{ t('contact.elsewhere') }}</div>
          <a
            v-for="social in socials"
            :key="social.link"
            :href="social.link"
            target="_blank"
            rel="noopener"
            class="row-link"
            style="display:flex;align-items:center;justify-content:space-between;padding:16px 0;border-bottom:1px solid rgba(143,168,178,0.15);text-decoration:none;color:#EDEEE9;font-size:16px;"
          >
            <span>{{ social.label }}</span><span style="color:#B87333;">→</span>
          </a>
        </div>
      </section>
    </div>

    <!-- MAP MODAL -->
    <div v-if="showMap" style="position:fixed;inset:0;background:rgba(11,29,38,0.85);z-index:200;display:flex;align-items:center;justify-content:center;padding:24px;" @click="showMap = false">
      <div style="background:#0B1D26;border:1px solid rgba(143,168,178,0.3);border-radius:4px;padding:20px;max-width:640px;width:100%;" @click.stop>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
          <span class="fr" style="font-size:18px;color:#EDEEE9;">Marseille — 43.2965° N, 5.3698° E</span>
          <span style="cursor:pointer;color:#8FA8B2;font-size:20px;" @click="showMap = false">×</span>
        </div>
        <iframe src="https://www.google.com/maps?q=43.2965,5.3698&output=embed" width="100%" height="380" style="border:0;border-radius:2px;" loading="lazy" />
      </div>
    </div>

    <footer class="pad-x" style="padding-top:32px;padding-bottom:32px;border-top:1px solid rgba(143,168,178,0.15);display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:12px;color:#8FA8B2;">
      <span>© 2026 Franck Lebas</span>
      <span>Marseille · Stockholm · Bordeaux</span>
    </footer>
  </div>
</template>

<style>
* { box-sizing: border-box; }
html, body { margin: 0; }

.root {
  background: #0B1D26;
  color: #EDEEE9;
  font-family: 'Space Grotesk', sans-serif;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.fr { font-family: 'Fraunces', serif; }

.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 48px;
  background: rgba(11, 29, 38, 0.88);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(143, 168, 178, 0.15);
}

.pad-x { padding-left: 48px; padding-right: 48px; }

.hero {
  position: relative;
  min-height: calc(100vh - 96px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.nav-item { transition: color 0.2s ease; }

.card { transition: transform 0.3s ease, border-color 0.3s ease; }
.card:hover { transform: translateY(-6px); border-color: #B87333; }

.shot {
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(143, 168, 178, 0.08);
  color: #8FA8B2;
  font-size: 13px;
  letter-spacing: 1px;
}

.row-link { transition: color 0.2s ease; }
.row-link:hover { color: #B87333 !important; }

.tl-line { position: relative; }
.tl-line::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #B87333;
}

.page-enter { animation: swellIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }

@keyframes swellIn {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes wavePulse {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* Mobile : les grilles deux colonnes s'empilent, on resserre les marges. */
@media (max-width: 720px) {
  .two-col { grid-template-columns: 1fr !important; }
  .top { padding: 16px 20px !important; }
  .pad-x { padding-left: 20px !important; padding-right: 20px !important; }
}

@media (prefers-reduced-motion: reduce) {
  .page-enter { animation: none; }
}
</style>
