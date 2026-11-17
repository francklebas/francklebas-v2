<script setup lang="ts">
// Aussi servie sur /blog/<locale>/<slug> : le chemin du fichier dans content/,
// celui qu'ouvre la prévisualisation de Nuxt Studio. La langue de l'URL prime alors.
definePageMeta({ alias: "/blog/:lang(en|fr|sv)/:slug" });

const { locale, t } = useI18n();
const route = useRoute();
const slug = route.params.slug as string;
const lang = computed(() => (route.params.lang as string | undefined) ?? locale.value);

// Les trois traductions sont chargées ensemble ; la langue active choisit (repli : anglais).
const { data: versions } = await useAsyncData(`blog-${slug}`, () =>
  queryCollection("blog").where("slug", "=", slug).all(),
);

if (!versions.value?.length) {
  throw createError({ statusCode: 404, statusMessage: "Post not found" });
}

const post = computed(
  () =>
    versions.value!.find((p) => p.locale === lang.value) ??
    versions.value!.find((p) => p.locale === "en") ??
    versions.value![0]!,
);

const date = computed(() =>
  new Date(post.value.date).toLocaleDateString(lang.value, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }),
);

// La canonical (absolue, sans la locale dans l'URL) est posée globalement dans app.vue.

useSeoMeta({
  title: () => `${post.value.title} — Franck Lebas`,
  description: () => post.value.description,
  ogTitle: () => post.value.title,
  ogDescription: () => post.value.description,
  ogImage: () => post.value.image,
});
</script>

<template>
  <div class="page page-enter">
    <Container tag="article" class="post" :max-width="720">
      <NuxtLink to="/blog" class="row-link back-link">← {{ t("blog.allPosts") }}</NuxtLink>
      <h1 class="fr post-title">{{ post.title }}</h1>
      <div class="post-meta">{{ date }} · {{ post.author }}</div>
      <img v-if="post.image" :src="post.image" :alt="post.title" class="post-image" />
      <ContentRenderer :value="post" class="prose" />
      <NuxtLink to="/contact" class="button button-primary post-cta"
        >{{ t("blog.contactCta") }} →</NuxtLink
      >
    </Container>
  </div>
</template>

<style lang="scss" scoped>
.post {
  padding-top: 64px;
  padding-bottom: 140px;
}
.back-link {
  display: inline-block;
  margin-bottom: 32px;
  color: var(--color-muted);
  font-size: 14px;
}
.post-title {
  margin: 0;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 500;
  line-height: 1.1;
}
.post-meta {
  margin: 16px 0 32px;
  color: var(--color-dominant-ink);
  font-size: 13px;
  letter-spacing: 1px;
}
.post-image {
  display: block;
  width: 100%;
  margin-bottom: 40px;
  border-radius: 8px;
}
.post-cta {
  margin-top: 48px;
}

.prose {
  color: var(--color-copy);
  font-size: 17px;
  line-height: 1.75;

  :deep(h2) {
    margin: 56px 0 16px;
    color: var(--color-text);
    font-family: "Fraunces", serif;
    font-size: 28px;
    font-weight: 500;
    line-height: 1.2;
  }
  :deep(h2 a) {
    color: inherit;
    text-decoration: none;
  }
  :deep(p) {
    margin: 0 0 20px;
  }
  :deep(ul) {
    margin: 0 0 24px;
    padding-left: 20px;
  }
  :deep(li) {
    margin-bottom: 12px;
  }
  :deep(li::marker) {
    color: var(--color-dominant-ink);
  }
  :deep(strong) {
    color: var(--color-text);
    font-weight: 600;
  }
  :deep(a) {
    color: var(--color-dominant-ink);
  }
  :deep(blockquote) {
    margin: 32px 0;
    border-left: 2px solid var(--color-dominant);
    padding: 4px 0 4px 20px;
    font-style: italic;
  }
}
</style>
