<script setup lang="ts">
const { locale } = useI18n();

const { data: projectMeta } = await useAsyncData("projects", () =>
  queryCollection("projects").all(),
);

const projects = computed(() =>
  [...(projectMeta.value ?? [])]
    .sort((a, b) => a.num.localeCompare(b.num))
    .map((p) => ({
      ...p,
      role: pickLocale(p.role, locale.value),
      desc: pickLocale(p.desc, locale.value),
      linkLabel: p.linkLabel ? pickLocale(p.linkLabel, locale.value) : undefined,
      hasLink: !!p.link,
    })),
);
</script>

<template>
  <div class="page page-enter">
    <Container tag="header" class="page-header">
      <div class="eyebrow">{{ $t("sections.selectedWork") }}</div>
      <h2 class="fr page-title">{{ $t("sections.projects") }}</h2>
    </Container>
    <Container tag="section" class="two-col projects-grid">
      <article v-for="project in projects" :key="project.num" class="card">
        <div class="shot">
          <img
            v-if="project.image"
            :src="project.image"
            :alt="project.title"
            class="shot-image"
          />
          <template v-else>Project screenshot</template>
        </div>
        <div class="card-body">
          <div class="project-heading">
            <span class="fr project-number">{{ project.num }}</span>
            <NuxtLink
              v-if="project.hasLanding"
              :to="`/projects/${project.key}`"
              class="fr project-title"
            >
              {{ project.title }}
            </NuxtLink>
            <h3 v-else class="fr project-title">{{ project.title }}</h3>
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
            class="button button-primary"
            >{{ project.linkLabel }} →</a
          >
        </div>
      </article>
    </Container>
  </div>
</template>

<style scoped>
.shot-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
