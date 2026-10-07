<script setup lang="ts">
// i18n en/fr via @nuxtjs/i18n (stratégie no_prefix : bascule sans changer d'URL).
const { locale } = useI18n();

// <html lang> suit la locale active.
useHead({ htmlAttrs: { lang: locale } });
</script>

<template>
  <div class="root">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
:root {
  --color-bg: #0b1d26;
  --color-text: #edeee9;
  --color-accent: #b87333;
  --color-muted: #8fa8b2;
  --color-copy: #c8d2d6;
  --line-rgb: 143, 168, 178;
  --line-subtle: rgba(var(--line-rgb), 0.15);
  --line-medium: rgba(var(--line-rgb), 0.3);
  --nav-bg: rgba(11, 29, 38, 0.88);
  --overlay-bg: rgba(11, 29, 38, 0.85);
  --card-bg: rgba(255, 255, 255, 0.02);
  --page-padding: 48px;
  color-scheme: dark;
}

/* Thème clair : posé sur <html data-theme="light"> (voir ThemeToggle + script head). */
:root[data-theme="light"] {
  --color-bg: #f3f1eb;
  --color-text: #0b1d26;
  --color-accent: #9a5b24;
  --color-muted: #4d6873;
  --color-copy: #2a4350;
  --line-rgb: 77, 104, 115;
  --nav-bg: rgba(243, 241, 235, 0.88);
  --overlay-bg: rgba(11, 29, 38, 0.5);
  --card-bg: rgba(255, 255, 255, 0.5);
  color-scheme: light;
}

* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
}
button {
  font: inherit;
}

.root {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: "Space Grotesk", sans-serif;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.fr {
  font-family: "Fraunces", serif;
}

.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px var(--page-padding);
  background: var(--nav-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line-subtle);
}

.page {
  padding-top: 96px;
}

.pad-x {
  padding-left: var(--page-padding);
  padding-right: var(--page-padding);
}

.brand,
.nav-item,
.map-close {
  border: 0;
  background: transparent;
  color: inherit;
}

.brand,
.nav-list,
.locale-switcher,
.nav-item,
.brand-mark,
.actions,
.chip-list,
.project-heading,
.timeline-entry,
.map-header,
.footer {
  display: flex;
}
.brand {
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 0;
}
.brand-mark {
  width: 12px;
  height: 12px;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-accent);
  border-radius: 50%;
}
.brand-mark span {
  width: 4px;
  height: 4px;
  background: var(--color-accent);
  border-radius: 50%;
}
.brand-name {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 2px;
}
.nav-list {
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
}
.nav-item {
  align-items: center;
  cursor: pointer;
  padding: 0;
  color: var(--color-muted);
  font-size: 14px;
  font-weight: 400;
  transition: color 0.2s ease;
}
.nav-item.is-active {
  color: var(--color-accent);
  font-weight: 600;
}
.nav-number {
  margin-right: 6px;
  color: var(--color-accent);
  font-size: 11px;
}
.locale-switcher {
  align-items: center;
  gap: 8px;
}
.locale-button {
  font-size: 12px;
  letter-spacing: 1px;
}
.locale-separator {
  color: rgba(var(--line-rgb), 0.4);
  font-size: 12px;
}

.hero {
  position: relative;
  min-height: calc(100vh - 96px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.wave-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  filter: blur(14px);
  animation: wavePulse 10s ease-in-out infinite;
}
.wave-svg {
  display: block;
}
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 960px;
}
.eyebrow {
  margin-bottom: 16px;
  color: var(--color-accent);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 3px;
}
.hero-eyebrow {
  margin-bottom: 20px;
}
.hero-title {
  max-width: 920px;
  margin: 0;
  font-size: clamp(40px, 6vw, 84px);
  font-weight: 500;
  line-height: 1.05;
}
.hero-subtitle {
  max-width: 640px;
  margin: 28px 0 0;
  color: var(--color-muted);
  font-size: 19px;
  line-height: 1.6;
}
.coordinates {
  margin-top: 20px;
  color: var(--color-accent);
  cursor: pointer;
  font-size: 13px;
  letter-spacing: 1px;
  text-decoration: underline dotted;
  text-underline-offset: 4px;
}
.actions {
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 44px;
}
.button {
  display: inline-block;
  border-radius: 2px;
  padding: 14px 28px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
}
.button-primary {
  border: 1px solid var(--color-accent);
  background: var(--color-accent);
  color: var(--color-bg);
}
.button-secondary {
  border: 1px solid var(--color-muted);
  color: var(--color-text);
  font-weight: 500;
}
.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.stack-title {
  margin: 0 0 20px;
  color: var(--color-muted);
  font-size: 22px;
  font-weight: 500;
}
.body-copy {
  margin: 0;
  color: var(--color-copy);
  font-size: 15px;
  line-height: 1.6;
}
.home-copy {
  max-width: 480px;
  color: var(--color-muted);
  font-size: 16px;
  line-height: 1.75;
}
.chip-list {
  flex-wrap: wrap;
  gap: 10px;
}
.chip {
  border: 1px solid var(--line-medium);
  border-radius: 2px;
  padding: 7px 14px;
  font-size: 13px;
}
.chip-light {
  padding: 8px 16px;
  color: var(--color-text);
}
.chip-muted {
  padding: 5px 12px;
  color: var(--color-muted);
  font-size: 12px;
}

.page-header {
  padding-top: 100px;
  padding-bottom: 40px;
}
.page-title {
  margin: 0;
  font-size: 56px;
  font-weight: 500;
}
.projects-grid {
  gap: 32px;
  padding-bottom: 140px;
}
.card {
  overflow: hidden;
  border: 1px solid rgba(var(--line-rgb), 0.2);
  border-radius: 4px;
  background: var(--card-bg);
}
.card-body {
  padding: 28px;
}
.project-heading {
  align-items: baseline;
  gap: 12px;
  margin-bottom: 8px;
}
.project-number {
  color: var(--color-accent);
  font-size: 15px;
}
.project-title {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
}
.project-role,
.label {
  margin-bottom: 14px;
  color: var(--color-muted);
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}
.project-copy {
  margin-bottom: 18px;
}
.project-chips {
  gap: 8px;
  margin-bottom: 18px;
}
.project-chips .chip {
  user-select: none;
}
.project-link,
.arrow {
  color: var(--color-bg);
  font-size: 14px;
  text-decoration: none;
}

.skills-grid {
  gap: 28px;
}
.skill-group {
  border-left: 2px solid var(--color-accent);
  padding: 6px 0 6px 20px;
}
.skill-title {
  margin: 0 0 14px;
  color: var(--color-muted);
  font-size: 19px;
  font-weight: 500;
}
.row-link {
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s ease;
}
.row-source {
  color: var(--color-muted);
  font-size: 12px;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.contact-content {
  max-width: 1000px;
  gap: 64px;
  padding-bottom: 140px;
}
.contact-detail {
  margin-bottom: 32px;
}
.contact-detail .label {
  margin-bottom: 8px;
}
.contact-link {
  font-size: 20px;
}
.elsewhere-label {
  margin-bottom: 16px;
}
.social-link {
  align-items: center;
  font-size: 16px;
}

.map-modal {
  position: fixed;
  z-index: 200;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--overlay-bg);
}
.map-dialog {
  width: 100%;
  max-width: 640px;
  border: 1px solid var(--line-medium);
  border-radius: 4px;
  padding: 20px;
  background: var(--color-bg);
}
.map-header {
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}
.map-title {
  font-size: 18px;
}
.map-close {
  cursor: pointer;
  color: var(--color-muted);
  font-size: 20px;
}
.map-frame {
  border: 0;
  border-radius: 2px;
}
.footer {
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  border-top: 1px solid var(--line-subtle);
  padding-top: 32px;
  padding-bottom: 32px;
  color: var(--color-muted);
  font-size: 12px;
}

.card {
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
}
.card:hover {
  transform: translateY(-6px);
  border-color: var(--color-accent);
}

.shot {
  width: 100%;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(var(--line-rgb), 0.08);
  color: var(--color-muted);
  font-size: 13px;
  letter-spacing: 1px;
}

.row-link:hover {
  color: var(--color-accent);
}

.tl-line {
  width: 20px;
  flex-shrink: 0;
  position: relative;
  border-left: 2px solid rgba(var(--line-rgb), 0.25);
}
.tl-line::before {
  content: "";
  position: absolute;
  left: -6px;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-accent);
}

.page-enter {
  animation: swellIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes swellIn {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes wavePulse {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Mobile : les grilles deux colonnes s'empilent, on resserre les marges. */
@media (max-width: 720px) {
  :root {
    --page-padding: 20px;
  }
  .two-col {
    grid-template-columns: 1fr;
  }
  .top {
    padding: 16px 20px;
  }
  .nav-list {
    gap: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .page-enter,
  .wave-wrap {
    animation: none;
  }
}
</style>
