<script setup lang="ts">
// Thème porté par <html data-theme>, mémorisé en localStorage (lu par le script head).
// Les deux icônes sont rendues et le CSS choisit : pas d'écart SSR / hydratation.
function toggleTheme() {
  const root = document.documentElement;
  const next = root.dataset.theme === "light" ? "dark" : "light";
  if (next === "light") root.dataset.theme = "light";
  else delete root.dataset.theme;
  try {
    localStorage.setItem("theme", next);
  } catch {}
}
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="$t('theme.toggle')"
    :title="$t('theme.toggle')"
    @click="toggleTheme"
  >
    <!-- Soleil : visible en sombre, passe en clair -->
    <svg class="icon icon-sun" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
      />
    </svg>
    <!-- Lune : visible en clair, repasse en sombre -->
    <svg class="icon icon-moon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>

<style lang="scss" scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0;
  color: var(--color-muted);
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
  &:hover,
  &:focus-visible {
    color: var(--color-dominant-ink);
  }
}
.icon {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.75;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.icon-moon {
  display: none;
}
:root[data-theme="light"] .theme-toggle {
  .icon-sun {
    display: none;
  }
  .icon-moon {
    display: block;
  }
}
</style>
