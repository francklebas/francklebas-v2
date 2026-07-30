<script setup lang="ts">
const { t, locale, setLocale } = useI18n();
const nav = [
  { id: "accueil", key: "", num: "01" },
  { id: "projets", key: "projects", num: "02" },
  { id: "experience", key: "experience", num: "03" },
  { id: "competences", key: "skills", num: "04" },
  { id: "contact", key: "contact", num: "05" },
] as const;
</script>

<template>
  <div>
    <nav class="top">
      <NuxtLink class="brand" to="`/`">
        <span class="nav-number">01</span>{{ t(`nav.home`) }}
        Accueil
      </NuxtLink>
      <span class="brand-mark"><span /></span>
      <span class="brand-name">FRANCK LEBAS</span>
      <div class="nav-list">
        <NuxtLink v-for="n in nav" :key="n.id" :to="`/${n.key}`">
          <span class="nav-number">{{ n.num }}</span
          ><a class="nav-item">{{ $t(`nav.${n.key}`) }}</a>
        </NuxtLink>

        <div class="locale-switcher">
          <button
            class="nav-item locale-button"
            :class="{ 'is-active': locale === 'en' }"
            type="button"
            @click="setLocale('en')"
          >
            EN
          </button>
          <span class="locale-separator">/</span>
          <button
            class="nav-item locale-button"
            :class="{ 'is-active': locale === 'fr' }"
            type="button"
            @click="setLocale('fr')"
          >
            FR
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="css" scoped>
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
}
a {
  color: inherit;
  text-decoration: none;
}
</style>
