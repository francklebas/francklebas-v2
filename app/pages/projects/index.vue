<script setup lang="ts">
const { t, locale, setLocale } = useI18n();
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
</script>

<template>
  <div class="page page-enter">
    <header class="page-header pad-x">
      <div class="eyebrow">{{ $t("sections.selectedWork") }}</div>
      <h2 class="fr page-title">{{ $t("sections.projects") }}</h2>
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
  </div>
</template>
