<script setup lang="ts">
const { t, locale, setLocale } = useI18n();
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
</script>

<template>
  <div class="page page-enter">
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
  </div>
</template>

<style lang="scss" scoped>
.timeline-entry {
  display: flex;
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
</style>
