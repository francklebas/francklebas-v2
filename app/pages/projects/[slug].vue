<script setup lang="ts">
const { locale } = useI18n();
const route = useRoute();
const slug = route.params.slug as string;

const { data: landing } = await useAsyncData(`project-landing-${slug}`, () =>
  queryCollection("projectLandings").where("key", "=", slug).first(),
);

if (!landing.value) {
  throw createError({ statusCode: 404, statusMessage: "Project not found" });
}

const hero = computed(() => landing.value!.hero);
const heroTitle = computed(() => pickLocale(hero.value.title, locale.value));
const heroBody = computed(() => pickLocale(hero.value.body, locale.value));
const heroCta = computed(() =>
  hero.value.cta
    ? {
        label: pickLocale(hero.value.cta.label, locale.value),
        href: hero.value.cta.href,
      }
    : null,
);

// Sections libres d'une étude de cas — chacune optionnelle, affichée seulement si renseignée.
const caseSections = computed(() =>
  (["context", "approach", "results"] as const)
    .map((key) => landing.value![key])
    .filter((section): section is NonNullable<typeof section> => !!section)
    .map((section) => ({
      title: pickLocale(section.title, locale.value),
      body: pickLocale(section.body, locale.value),
    })),
);

const gallery = computed(() => landing.value!.gallery ?? []);
</script>

<template>
  <div class="page page-enter">
    <Container tag="section" class="hero-header" :max-width="720">
      <h1 class="fr hero-title">{{ heroTitle }}</h1>
      <p class="body-copy hero-body">{{ heroBody }}</p>
      <img v-if="hero.image" :src="hero.image" :alt="heroTitle" class="hero-image" />
      <a
        v-if="heroCta"
        :href="heroCta.href"
        target="_blank"
        rel="noopener"
        class="button button-primary hero-cta"
        >{{ heroCta.label }} →</a
      >
    </Container>

    <Container
      v-if="caseSections.length"
      tag="section"
      class="case-sections"
      :max-width="720"
    >
      <div v-for="section in caseSections" :key="section.title" class="case-section">
        <h2 class="fr case-title">{{ section.title }}</h2>
        <p class="body-copy">{{ section.body }}</p>
      </div>
    </Container>

    <Container v-if="gallery.length" tag="section" class="gallery" :max-width="960">
      <component
        :is="img.href ? 'a' : 'div'"
        v-for="img in gallery"
        :key="img.src"
        :href="img.href"
        :target="img.href ? '_blank' : undefined"
        :rel="img.href ? 'noopener' : undefined"
        class="gallery-item"
      >
        <img :src="img.src" :alt="img.alt ?? heroTitle" class="gallery-image" />
      </component>
    </Container>
  </div>
</template>

<style scoped>
.hero-header {
  padding-top: 96px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hero-image {
  width: 100%;
  border-radius: 8px;
}

.hero-cta {
  align-self: start;
}

.case-sections {
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding-top: 60px;
}

.case-title {
  margin: 0 0 12px;
  font-size: 26px;
  font-weight: 500;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding-top: 60px;
  padding-bottom: 140px;
}

.gallery-item {
  display: block;
}

.gallery-image {
  width: 100%;
  border-radius: 8px;
}
</style>
