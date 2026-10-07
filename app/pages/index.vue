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

const { locale } = useI18n();

// Projets mis en avant : ceux qui ont un bloc `highlight` dans content/projects.
const { data: projectMeta } = await useAsyncData("home-highlights", () =>
  queryCollection("projects").all(),
);

const highlights = computed(() =>
  [...(projectMeta.value ?? [])]
    .filter((p) => p.highlight)
    .sort((a, b) => a.num.localeCompare(b.num))
    .map((p) => ({
      key: p.key,
      num: p.num,
      title: p.title,
      stack: p.stack,
      hasLanding: p.hasLanding,
      steps: (["problem", "solution", "result"] as const).map((step) => ({
        step,
        text: pickLocale(p.highlight![step], locale.value),
      })),
    })),
);
</script>

<template>
  <div class="page page-enter">
    <Container tag="section" class="hero">
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
              <stop
                offset="0%"
                style="stop-color: var(--color-muted)"
                stop-opacity="0.35"
              />
              <stop
                offset="35%"
                style="stop-color: var(--color-muted)"
                stop-opacity="0.16"
              />
              <stop
                offset="70%"
                style="stop-color: var(--color-muted)"
                stop-opacity="0.05"
              />
              <stop
                offset="100%"
                style="stop-color: var(--color-muted)"
                stop-opacity="0"
              />
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
    </Container>

    <Container tag="section" class="two-col home-intro">
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
    </Container>

    <Container v-if="highlights.length" tag="section" class="solved">
      <div class="eyebrow">{{ $t("home.solvedEyebrow") }}</div>
      <h2 class="fr home-title">{{ $t("home.solvedHeading") }}</h2>
      <article v-for="project in highlights" :key="project.key" class="solved-item">
        <div class="project-heading">
          <span class="fr project-number">{{ project.num }}</span>
          <h3 class="fr project-title">{{ project.title }}</h3>
        </div>
        <div class="solved-steps">
          <div v-for="item in project.steps" :key="item.step" class="solved-step">
            <div class="label">{{ $t(`home.${item.step}`) }}</div>
            <p class="body-copy">{{ item.text }}</p>
          </div>
        </div>
        <div class="solved-footer">
          <div class="chip-list project-chips">
            <span
              v-for="tech in project.stack"
              :key="tech"
              class="chip chip-muted"
              >{{ tech }}</span
            >
          </div>
          <NuxtLink
            v-if="project.hasLanding"
            :to="`/projects/${project.key}`"
            class="button button-secondary"
          >
            {{ $t("home.readCaseStudy") }} →
          </NuxtLink>
        </div>
      </article>
      <NuxtLink to="/projects" class="solved-all">
        {{ $t("home.allProjects") }} →
      </NuxtLink>
    </Container>

    <MapModal :show="showMap" @close="showMap = false" />
  </div>
</template>

<style lang="scss" scoped>
.home-intro {
  gap: 64px;
  padding-top: 100px;
  padding-bottom: 100px;
}
.home-title {
  margin: 0 0 20px;
  font-size: 32px;
  font-weight: 500;
}
.solved {
  padding-bottom: 140px;
}
.solved-item {
  border-top: 1px solid var(--line-subtle);
  padding: 32px 0;
}
.solved-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-top: 20px;
}
.solved-step {
  border-left: 2px solid var(--color-accent);
  padding-left: 16px;

  .label {
    margin-bottom: 8px;
  }
}
.solved-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 28px;

  .project-chips {
    margin-bottom: 0;
  }
}
.solved-all {
  color: var(--color-accent);
  font-size: 15px;
  text-decoration: none;
}
@media (max-width: 720px) {
  .solved-steps {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
