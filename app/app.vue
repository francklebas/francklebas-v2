<script setup lang="ts">
// Portfolio single-page — converti depuis le design Portfolio.dc.html.
// La navigation interne (Home / Projects / Experience / Skills / Contact) est une
// simple machine à états côté client : pas de routing, tout vit dans cette page.
// i18n en/fr via @nuxtjs/i18n (stratégie no_prefix : bascule sans changer d'URL).

const { t, locale, setLocale } = useI18n();

// <html lang> suit la locale active.
useHead({ htmlAttrs: { lang: locale } });

type Page = "accueil" | "projets" | "experience" | "competences" | "contact";
const page = ref<Page>("accueil");
const showMap = ref(false);

// Réglages repris des props du design (valeurs par défaut).
const motifDensity = ref<"subtle" | "moderate">("moderate");
const showCoordinates = computed(() => motifDensity.value !== "subtle");

// Coordonnées de contact.
const contact = {
  email: "francklebas@ik.me",
  phone: "+33 7 45 65 51 08",
};

// Métadonnées non traduisibles (noms propres, stack, liens) ; rôle + description via i18n.
// Corrections vs design d'origine : Resume AI = Nuxt/Mistral (pas Next/OpenAI) + lien démo ;
// jobs ajouté (démo live) ; Fanny AI sans lien (non exposé).
const projectMeta = [
  {
    key: "portail",
    num: "01",
    title: "Portail Autoentrepreneur",
    stack: ["Vue 3", "TypeScript", "SCSS"],
    link: "https://portail-autoentrepreneur.fr",
    linkLabel: "portail-autoentrepreneur.fr",
  },
  {
    key: "jobs",
    num: "02",
    title: "Suivi de candidatures",
    stack: ["Nuxt 4", "TypeScript", "Supabase"],
    link: "https://jobs.francklebas.com",
    linkLabel: "jobs.francklebas.com",
  },
  {
    key: "resume",
    num: "03",
    title: "Resume AI",
    stack: ["Nuxt 4", "TypeScript", "Mistral AI", "Cloudflare"],
    link: "https://resume.francklebas.com",
    linkLabel: "resume.francklebas.com",
  },
  {
    key: "fanny",
    num: "04",
    title: "Fanny AI",
    stack: ["Python", "Docker"],
    link: "",
    linkLabel: "",
  },
  {
    key: "aurora",
    num: "05",
    title: "AURORA Commerce",
    stack: ["Nuxt 4", "Stripe"],
    link: "https://aurora.francklebas.com",
    linkLabel: "aurora.francklebas.com",
  },
  {
    key: "llm",
    num: "06",
    title: "LLM Review Framework",
    stack: ["Node.js", "CLI", "LLM"],
    link: "https://github.com/francklebas/llm-review-framework",
    linkLabel: "github.com/francklebas",
  },
] as const;

const projects = computed(() =>
  projectMeta.map((p) => ({
    ...p,
    role: t(`projects.${p.key}.role`),
    desc: t(`projects.${p.key}.desc`),
    hasLink: !!p.link,
  })),
);

const timelineMeta = [
  { key: "y2008", year: "2008" },
  { key: "y2013", year: "2013" },
  { key: "y2018", year: "2018" },
  { key: "y2022", year: "2022" },
  { key: "y2024", year: "2024" },
  { key: "now", year: "" },
] as const;

const timeline = computed(() =>
  timelineMeta.map((e) => ({
    year: e.key === "now" ? t("timeline.nowLabel") : e.year,
    role: t(`timeline.${e.key}.role`),
    company: t(`timeline.${e.key}.company`),
    desc: t(`timeline.${e.key}.desc`),
  })),
);

const skillMeta = [
  { key: "core", items: ["Vue 3", "React", "TypeScript"] },
  { key: "meta", items: ["Nuxt 4"] },
  { key: "styling", items: ["SCSS", "Tailwind"] },
  { key: "runtime", items: ["Node.js", "Bun"] },
] as const;

const skillGroups = computed(() =>
  skillMeta.map((g) => ({ group: t(`skills.${g.key}`), items: g.items })),
);

// Titres d'articles / réseaux : noms propres, non traduits.
const writing = [
  {
    title: "Frontend best practices",
    source: "Medium",
    link: "https://medium.com/codex/front-end-best-practices-666f09a4dfd",
  },
  {
    title: "TDD for frontend developers",
    source: "Medium",
    link: "https://wearelion.medium.com/fast-and-reliable-coding-through-tdd-1b50c8ad0028",
  },
  {
    title: "React 16.3 and the new Context API",
    source: "Putain de Code",
    link: "https://putaindecode.io/articles/react-16-3-et-la-nouvelle-api-context",
  },
  {
    title: "AURORA Commerce articles",
    source: "DEV Community",
    link: "https://dev.to/francklebas",
  },
];

const socials = [
  { label: "LinkedIn", link: "https://linkedin.com/in/francklebas" },
  { label: "GitHub", link: "https://github.com/francklebas" },
  { label: "DEV.to", link: "https://dev.to/francklebas" },
  { label: "francklebas.com", link: "https://francklebas.com" },
];
</script>

<template>
  <div class="root">
    <!-- 02 — PROJECTS -->
    <!--<div v-else-if="page === 'projets'" class="page page-enter">
      <header class="page-header pad-x">
        <div class="eyebrow">{{ t("sections.selectedWork") }}</div>
        <h2 class="fr page-title">{{ t("sections.projects") }}</h2>
      </header>
      <section class="two-col projects-grid pad-x">
        <article v-for="project in projects" :key="project.num" class="card">
          <div class="shot">Project screenshot</div>
          <div class="card-body">
            <div class="project-heading">
              <span class="fr project-number">{{ project.num }}</span>
              <h3 class="fr project-title">{{ project.title }}</h3>
            </div>
            <div class="project-role">{{ project.role }}</div>
            <p class="body-copy project-copy">{{ project.desc }}</p>
            <div class="chip-list project-chips">
              <span
                v-for="tech in project.stack"
                :key="tech"
                class="chip chip-muted"
                >{{ tech }}</span
              >
            </div>
            <a
              v-if="project.hasLink"
              :href="project.link"
              target="_blank"
              rel="noopener"
              class="button project-link button-primary chip chip-muted"
              >{{ project.linkLabel }} →</a
            >
          </div>
        </article>
      </section>
    </div>-->

    <!-- 03 — EXPERIENCE -->
    <!--<div v-else-if="page === 'experience'" class="page page-enter">
      <header class="page-header pad-x">
        <div class="eyebrow">{{ t("sections.career") }}</div>
        <h2 class="fr page-title">{{ t("sections.experience") }}</h2>
      </header>
      <section class="timeline pad-x">
        <div
          v-for="entry in timeline"
          :key="entry.year + entry.role"
          class="timeline-entry"
        >
          <div class="fr timeline-year">{{ entry.year }}</div>
          <div class="tl-line" />
          <div class="timeline-content">
            <h3 class="fr timeline-title">{{ entry.role }}</h3>
            <div class="timeline-company">{{ entry.company }}</div>
            <p class="body-copy timeline-copy">{{ entry.desc }}</p>
          </div>
        </div>
      </section>
    </div>-->

    <!-- 04 — SKILLS -->
    <!--<div v-else-if="page === 'competences'" class="page page-enter">
      <header class="page-header pad-x">
        <div class="eyebrow">{{ t("sections.craft") }}</div>
        <h2 class="fr page-title">{{ t("sections.skills") }}</h2>
      </header>
      <section class="two-col skills-grid pad-x">
        <div v-for="grp in skillGroups" :key="grp.group" class="skill-group">
          <h3 class="fr skill-title">{{ grp.group }}</h3>
          <div class="chip-list">
            <span v-for="skill in grp.items" :key="skill" class="chip">{{
              skill
            }}</span>
          </div>
        </div>
      </section>
      <section class="writing pad-x">
        <h3 class="fr writing-title">{{ t("skills.writing") }}</h3>
        <a
          v-for="post in writing"
          :key="post.link"
          :href="post.link"
          target="_blank"
          rel="noopener"
          class="row-link writing-link"
        >
          <span>{{ post.title }}</span>
          <span class="row-source">{{ post.source }}</span>
        </a>
      </section>
    </div>-->

    <!-- 05 — CONTACT -->
    <!--<div v-else-if="page === 'contact'" class="page page-enter">
      <header class="page-header pad-x">
        <div class="eyebrow">{{ t("sections.contactEyebrow") }}</div>
        <h2 class="fr page-title">{{ t("sections.letsTalk") }}</h2>
      </header>
      <section class="two-col contact-content pad-x">
        <div>
          <div class="contact-detail">
            <div class="label">{{ t("contact.email") }}</div>
            <a
              :href="`mailto:${contact.email}`"
              class="fr row-link contact-link"
              >{{ contact.email }}</a
            >
          </div>
          <div class="contact-detail">
            <div class="label">{{ t("contact.phone") }}</div>
            <a
              :href="`tel:${contact.phone.replace(/\s/g, '')}`"
              class="fr row-link contact-link"
              >{{ contact.phone }}</a
            >
          </div>
          <a :href="cvUrl" download class="button button-primary">{{
            t("cta.downloadCV")
          }}</a>
        </div>
        <div>
          <div class="label elsewhere-label">{{ t("contact.elsewhere") }}</div>
          <a
            v-for="social in socials"
            :key="social.link"
            :href="social.link"
            target="_blank"
            rel="noopener"
            class="row-link social-link"
          >
            <span>{{ social.label }}</span
            ><span class="arrow">→</span>
          </a>
        </div>
      </section>
    </div>-->

    <!-- MAP MODAL -->
    <!--<div v-if="showMap" class="map-modal" @click="showMap = false">
      <div class="map-dialog" @click.stop>
        <div class="map-header">
          <span class="fr map-title">Marseille — 43.2965° N, 5.3698° E</span>
          <button
            class="map-close"
            type="button"
            aria-label="Close map"
            @click="showMap = false"
          >
            ×
          </button>
        </div>
        <iframe
          src="https://www.google.com/maps?q=43.2965,5.3698&output=embed"
          width="100%"
          height="380"
          class="map-frame"
          loading="lazy"
        />
      </div>
    </div>-->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  --color-bg: #0b1d26;
  --color-text: #edeee9;
  --color-accent: #b87333;
  --color-muted: #8fa8b2;
  --color-copy: #c8d2d6;
  --line-subtle: rgba(143, 168, 178, 0.15);
  --line-medium: rgba(143, 168, 178, 0.3);
  --page-padding: 48px;
}

* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
}
button {
  font: inherit;
}

.root {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: "Space Grotesk", sans-serif;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.fr {
  font-family: "Fraunces", serif;
}

.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px var(--page-padding);
  background: rgba(11, 29, 38, 0.88);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(143, 168, 178, 0.15);
}

.pad-x {
  padding-left: var(--page-padding);
  padding-right: var(--page-padding);
}

.page {
  padding-top: 96px;
}

.brand,
.nav-item,
.map-close {
  border: 0;
  background: transparent;
  color: inherit;
}

.brand,
.nav-list,
.locale-switcher,
.nav-item,
.brand-mark,
.actions,
.chip-list,
.project-heading,
.timeline-entry,
.map-header,
.footer {
  display: flex;
}
.brand {
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 0;
}
.brand-mark {
  width: 12px;
  height: 12px;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-accent);
  border-radius: 50%;
}
.brand-mark span {
  width: 4px;
  height: 4px;
  background: var(--color-accent);
  border-radius: 50%;
}
.brand-name {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
}
.nav-list {
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
}
.nav-item {
  align-items: center;
  cursor: pointer;
  padding: 0;
  color: var(--color-muted);
  font-size: 14px;
  font-weight: 400;
  transition: color 0.2s ease;
}
.nav-item.is-active {
  color: var(--color-accent);
  font-weight: 600;
}
.nav-number {
  margin-right: 6px;
  color: var(--color-accent);
  font-size: 11px;
}
.locale-switcher {
  align-items: center;
  gap: 8px;
}
.locale-button {
  font-size: 12px;
  letter-spacing: 1px;
}
.locale-separator {
  color: rgba(143, 168, 178, 0.4);
  font-size: 12px;
}

.hero {
  position: relative;
  min-height: calc(100vh - 96px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.wave-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  filter: blur(14px);
  animation: wavePulse 10s ease-in-out infinite;
}
.wave-svg {
  display: block;
}
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 960px;
}
.eyebrow {
  margin-bottom: 16px;
  color: var(--color-accent);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 3px;
}
.hero-eyebrow {
  margin-bottom: 20px;
}
.hero-title {
  max-width: 920px;
  margin: 0;
  font-size: clamp(40px, 6vw, 84px);
  font-weight: 500;
  line-height: 1.05;
}
.hero-subtitle {
  max-width: 640px;
  margin: 28px 0 0;
  color: var(--color-muted);
  font-size: 19px;
  line-height: 1.6;
}
.coordinates {
  margin-top: 20px;
  color: var(--color-accent);
  cursor: pointer;
  font-size: 13px;
  letter-spacing: 1px;
  text-decoration: underline dotted;
  text-underline-offset: 4px;
}
.actions {
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 44px;
}
.button {
  display: inline-block;
  border-radius: 2px;
  padding: 14px 28px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
}
.button-primary {
  border: 1px solid var(--color-accent);
  background: var(--color-accent);
  color: var(--color-bg);
}
.button-secondary {
  border: 1px solid var(--color-muted);
  color: var(--color-text);
  font-weight: 500;
}
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.stack-title {
  margin: 0 0 20px;
  color: var(--color-muted);
  font-size: 22px;
  font-weight: 500;
}
.body-copy {
  margin: 0;
  color: var(--color-copy);
  font-size: 15px;
  line-height: 1.6;
}
.home-copy {
  max-width: 480px;
  color: var(--color-muted);
  font-size: 16px;
  line-height: 1.75;
}
.chip-list {
  flex-wrap: wrap;
  gap: 10px;
}
.chip {
  border: 1px solid var(--line-medium);
  border-radius: 2px;
  padding: 7px 14px;
  font-size: 13px;
}
.chip-light {
  padding: 8px 16px;
  color: var(--color-text);
}
.chip-muted {
  padding: 5px 12px;
  color: var(--color-muted);
  font-size: 12px;
}

.page-header {
  padding-top: 100px;
  padding-bottom: 40px;
}
.page-title {
  margin: 0;
  font-size: 56px;
  font-weight: 500;
}
.projects-grid {
  gap: 32px;
  padding-bottom: 140px;
}
.card {
  overflow: hidden;
  border: 1px solid rgba(143, 168, 178, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.02);
}
.card-body {
  padding: 28px;
}
.project-heading {
  align-items: baseline;
  gap: 12px;
  margin-bottom: 8px;
}
.project-number {
  color: var(--color-accent);
  font-size: 15px;
}
.project-title {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
}
.project-role,
.label {
  margin-bottom: 14px;
  color: var(--color-muted);
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
.project-copy {
  margin-bottom: 18px;
}
.project-chips {
  gap: 8px;
  margin-bottom: 18px;
}
.project-link,
.arrow {
  color: var(--color-bg);
  font-size: 14px;
  text-decoration: none;
}

.timeline {
  max-width: 820px;
  margin: 0 auto;
  padding-bottom: 140px;
}
.timeline-entry {
  gap: 28px;
  padding-bottom: 48px;
}
.timeline-year {
  width: 70px;
  flex-shrink: 0;
  padding-top: 2px;
  color: var(--color-accent);
  font-size: 18px;
}
.timeline-content {
  padding-bottom: 8px;
}
.timeline-title {
  margin: 0 0 4px;
  font-size: 22px;
  font-weight: 500;
}
.timeline-company {
  margin-bottom: 10px;
  color: var(--color-muted);
  font-size: 13px;
  letter-spacing: 0.5px;
}
.timeline-copy {
  max-width: 560px;
}

.skills-grid {
  max-width: 960px;
  gap: 28px;
}
.skill-group {
  border-left: 2px solid var(--color-accent);
  padding: 6px 0 6px 20px;
}
.skill-title {
  margin: 0 0 14px;
  color: var(--color-muted);
  font-size: 19px;
  font-weight: 500;
}
.writing {
  max-width: 820px;
  padding-top: 100px;
  padding-bottom: 140px;
}
.writing-title {
  margin: 0 0 24px;
  font-size: 26px;
  font-weight: 500;
}
.row-link {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s ease;
}
.writing-link,
.social-link {
  align-items: baseline;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid var(--line-subtle);
  padding: 16px 0;
}
.writing-link {
  font-size: 16px;
}
.row-source {
  color: var(--color-muted);
  font-size: 12px;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.contact-content {
  max-width: 1000px;
  gap: 64px;
  padding-bottom: 140px;
}
.contact-detail {
  margin-bottom: 32px;
}
.contact-detail .label {
  margin-bottom: 8px;
}
.contact-link {
  font-size: 20px;
}
.elsewhere-label {
  margin-bottom: 16px;
}
.social-link {
  align-items: center;
  font-size: 16px;
}

.map-modal {
  position: fixed;
  z-index: 200;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(11, 29, 38, 0.85);
}
.map-dialog {
  width: 100%;
  max-width: 640px;
  border: 1px solid var(--line-medium);
  border-radius: 4px;
  padding: 20px;
  background: var(--color-bg);
}
.map-header {
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.map-title {
  font-size: 18px;
}
.map-close {
  cursor: pointer;
  color: var(--color-muted);
  font-size: 20px;
}
.map-frame {
  border: 0;
  border-radius: 2px;
}
.footer {
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  border-top: 1px solid var(--line-subtle);
  padding-top: 32px;
  padding-bottom: 32px;
  color: var(--color-muted);
  font-size: 12px;
}

.card {
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
}
.card:hover {
  transform: translateY(-6px);
  border-color: var(--color-accent);
}

.shot {
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(143, 168, 178, 0.08);
  color: var(--color-muted);
  font-size: 13px;
  letter-spacing: 1px;
}

.row-link:hover {
  color: var(--color-accent);
}

.tl-line {
  position: relative;
}
.tl-line::before {
  content: "";
  position: absolute;
  left: -6px;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-accent);
}

.page-enter {
  animation: swellIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes swellIn {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes wavePulse {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Mobile : les grilles deux colonnes s'empilent, on resserre les marges. */
@media (max-width: 720px) {
  :root {
    --page-padding: 20px;
  }
  .two-col {
    grid-template-columns: 1fr;
  }
  .top {
    padding: 16px 20px;
  }
  .nav-list {
    gap: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-enter,
  .wave-wrap {
    animation: none;
  }
}
</style>
