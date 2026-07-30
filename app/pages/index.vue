<script setup lang="ts">
// CV servi statiquement (edge Cloudflare = CDN). Déposer le PDF dans public/cv.pdf.
const cvUrl = "/cv.pdf";
const showMap = ref(false);
const stackChips = [
  "Vue 3",
  "Nuxt 4",
  "React",
  "TypeScript",
  "SCSS",
  "Tailwind",
  "Node.js",
  "Bun",
];
// Réglages repris des props du design (valeurs par défaut).
const motifDensity = ref<"subtle" | "moderate">("moderate");
const showCoordinates = computed(() => motifDensity.value !== "subtle");
</script>

<template>
  <div class="page page-enter">
    <section class="hero pad-x">
      <div class="wave-wrap">
        <svg
          width="100%"
          height="320"
          viewBox="0 0 800 320"
          preserveAspectRatio="none"
          class="wave-svg"
        >
          <defs>
            <linearGradient id="waveFade1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#8FA8B2" stop-opacity="0.35" />
              <stop offset="35%" stop-color="#8FA8B2" stop-opacity="0.16" />
              <stop offset="70%" stop-color="#8FA8B2" stop-opacity="0.05" />
              <stop offset="100%" stop-color="#8FA8B2" stop-opacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,320 L0,90 Q100,50 200,90 T400,90 T600,90 T800,90 L800,320 Z"
            fill="url(#waveFade1)"
          />
        </svg>
      </div>
      <div class="hero-content">
        <div class="eyebrow hero-eyebrow">{{ $t("hero.eyebrow") }}</div>
        <h1 class="fr hero-title">{{ $t("hero.headline") }}</h1>
        <p class="hero-subtitle">{{ $t("hero.subtitle") }}</p>
        <div v-if="showCoordinates" class="coordinates" @click="showMap = true">
          43.2965° N, 5.3698° E
        </div>
        <div class="actions">
          <NuxtLink to="/projects" class="button button-primary">
            {{ $t("hero.viewProjects") }}
          </NuxtLink>
          <a :href="cvUrl" download class="button button-secondary">{{
            $t("cta.downloadCV")
          }}</a>
        </div>
      </div>
    </section>

    <section class="two-col home-intro pad-x">
      <div>
        <h2 class="fr home-title">{{ $t("home.whatIdoHeading") }}</h2>
        <p class="body-copy home-copy">{{ $t("home.whatIdoBody") }}</p>
      </div>
      <div>
        <h2 class="fr stack-title">{{ $t("home.stack") }}</h2>
        <div class="chip-list">
          <span
            v-for="chip in stackChips"
            :key="chip"
            class="chip chip-light"
            >{{ chip }}</span
          >
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.home-intro {
  gap: 64px;
  padding-top: 100px;
  padding-bottom: 140px;
}
.home-title {
  margin: 0 0 20px;
  font-size: 32px;
  font-weight: 500;
}
</style>
