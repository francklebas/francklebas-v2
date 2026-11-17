<script setup lang="ts">
const { locale, t } = useI18n();

// Toutes les traductions d'un coup : la bascule de langue (sans changement d'URL)
// ne déclenche aucune requête.
const { data: posts } = await useAsyncData("blog", () =>
  queryCollection("blog").order("date", "DESC").all(),
);

const list = computed(() => {
  const bySlug = new Map<string, NonNullable<typeof posts.value>>();
  for (const post of posts.value ?? []) {
    bySlug.set(post.slug, [...(bySlug.get(post.slug) ?? []), post]);
  }
  return [...bySlug.values()].map(
    (versions) =>
      versions.find((p) => p.locale === locale.value) ??
      versions.find((p) => p.locale === "en") ??
      versions[0]!,
  );
});

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(locale.value, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
</script>

<template>
  <div class="page page-enter">
    <Container tag="header" class="page-header">
      <div class="eyebrow">{{ t("sections.writingEyebrow") }}</div>
      <h2 class="fr page-title">{{ t("blog.title") }}</h2>
    </Container>
    <Container tag="section" class="post-list" :max-width="820">
      <NuxtLink
        v-for="post in list"
        :key="post.slug"
        :to="`/blog/${post.slug}`"
        class="row-link post-row"
      >
        <img
          v-if="post.thumb ?? post.image"
          :src="post.thumb ?? post.image"
          alt=""
          class="post-thumb"
          loading="lazy"
        />
        <div class="post-text">
          <h3 class="fr post-title">{{ post.title }}</h3>
          <p class="body-copy post-desc">{{ post.description }}</p>
        </div>
        <span class="row-source">{{ formatDate(post.date) }}</span>
      </NuxtLink>
    </Container>
  </div>
</template>

<style scoped>
.post-list {
  padding-bottom: 140px;
}
.post-row {
  display: flex;
  align-items: baseline;
  gap: 24px;
  border-bottom: 1px solid var(--line-subtle);
  padding: 24px 0;
}
.post-thumb {
  align-self: center;
  flex-shrink: 0;
  width: 200px;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 4px;
  transition: transform 0.3s ease;
}
.post-row:hover .post-thumb {
  transform: scale(1.03);
}
.post-text {
  flex: 1;
}
.post-title {
  margin: 0 0 8px;
  font-size: 24px;
  font-weight: 500;
}
.post-desc {
  color: var(--color-muted);
}
@media (max-width: 720px) {
  .post-row {
    flex-direction: column;
    gap: 12px;
  }
  .post-thumb {
    width: 100%;
  }
  .row-source {
    order: -1;
  }
}
</style>
