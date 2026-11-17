<script setup lang="ts">
const { locale, setLocale } = useI18n();
const locales = ["en", "fr", "sv"] as const;
const nav = [
  { id: "accueil", key: "", num: "01" },
  { id: "projets", key: "projects", num: "02" },
  { id: "experience", key: "experience", num: "03" },
  { id: "competences", key: "skills", num: "04" },
  { id: "blog", key: "blog", num: "05" },
  { id: "offres", key: "offres", num: "06" },
  { id: "contact", key: "contact", num: "07" },
] as const;
</script>

<template>
  <div>
    <nav class="top">
      <span class="brand-mark"><span /></span>
      <span class="brand-name">FRANCK LEBAS</span>
      <div class="nav-list">
        <NuxtLink
          v-for="n in nav"
          :key="n.id"
          :to="`${n.key === '' ? '/' : `/${n.key}`}`"
          class="nav-item"
        >
          <span class="nav-number">{{ n.num }}</span
          >{{ $t(`nav.${n.key || "home"}`) }}
        </NuxtLink>

        <div class="locale-switcher">
          <template v-for="(code, i) in locales" :key="code">
            <span v-if="i > 0" class="locale-separator">/</span>
            <button
              class="nav-item locale-button"
              :class="{ 'is-active': locale === code }"
              type="button"
              @click="setLocale(code)"
            >
              {{ code.toUpperCase() }}
            </button>
          </template>
        </div>

        <ThemeToggle class="theme-toggle-nav" />
      </div>
    </nav>

    <!-- Mobile : hors de .top, dont le backdrop-filter piègerait le position: fixed -->
    <ThemeToggle class="theme-toggle-fab" />
  </div>
</template>

<style lang="scss" scoped>
.nav-list {
  display: flex;
}
.nav-item {
  align-items: center;
  background: transparent;
  border: 0;
  color: var(--color-muted);
  cursor: pointer;
  font-size: 14px;
  font-weight: 400;
  padding: 0;
  transition: color 0.2s ease;
  text-decoration: none;
  &:hover,
  &.is-active {
    color: var(--color-dominant-ink);
    text-decoration: underline;
  }
}

.theme-toggle-fab {
  display: none;
}

@media (max-width: 720px) {
  .theme-toggle-nav {
    display: none;
  }
  .theme-toggle-fab {
    display: inline-flex;
    position: fixed;
    right: var(--page-padding);
    bottom: calc(20px + env(safe-area-inset-bottom));
    z-index: 100;
    width: 44px;
    height: 44px;
    border: 1px solid var(--line-medium);
    border-radius: 50%;
    background: var(--nav-bg);
    backdrop-filter: blur(10px);
  }
}
</style>
