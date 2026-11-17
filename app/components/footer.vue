<script lang="ts" setup>
const { locale } = useI18n();
</script>

<template>
  <footer class="footer pad-x">
    <span>© 2026 Franck Lebas · SIREN 510 919 970</span>
    <span>
      Marseille · Stockholm · Bordeaux ·
      <NuxtLink to="/mentions-legales" class="footer-link">{{
        locale === "fr" ? "Mentions légales" : "Legal notice"
      }}</NuxtLink>
    </span>
  </footer>
</template>

<style scoped>
.footer-link {
  color: inherit;
  text-decoration: underline dotted;
  text-underline-offset: 3px;
}
</style>
