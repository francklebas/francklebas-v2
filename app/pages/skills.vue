<script setup lang="ts">
const { t, locale, setLocale } = useI18n();
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
const skillMeta = [
  { key: "core", items: ["Vue 3", "React", "TypeScript"] },
  { key: "meta", items: ["Nuxt 4"] },
  { key: "styling", items: ["SCSS", "Tailwind"] },
  { key: "runtime", items: ["Node.js", "Bun"] },
] as const;

const skillGroups = computed(() =>
  skillMeta.map((g) => ({ group: t(`skills.${g.key}`), items: g.items })),
);
</script>

<template>
  <div class="page page-enter">
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
  </div>
</template>

<style lang="scss" scoped>
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
</style>
