<script setup lang="ts">
const { t } = useI18n();

// CV servi statiquement (edge Cloudflare = CDN). Déposer le PDF dans public/cv.pdf.
const cvUrl = "/cv.pdf";

const contact = {
  email: "francklebas@ik.me",
  phone: "+33 7 45 65 51 08",
};

// Titres de réseaux : noms propres, non traduits.
const socials = [
  { label: "LinkedIn", link: "https://linkedin.com/in/francklebas" },
  { label: "GitHub", link: "https://github.com/francklebas" },
  { label: "DEV.to", link: "https://dev.to/francklebas" },
  { label: "francklebas.com", link: "https://francklebas.com" },
];
</script>

<template>
  <div class="page page-enter">
    <Container tag="header" class="page-header">
      <div class="eyebrow">{{ t("sections.contactEyebrow") }}</div>
      <h2 class="fr page-title">{{ t("sections.letsTalk") }}</h2>
    </Container>
    <Container tag="section" class="two-col contact-content">
      <div>
        <div class="contact-detail">
          <div class="label">{{ t("contact.email") }}</div>
          <a :href="`mailto:${contact.email}`" class="fr row-link contact-link">
            {{ contact.email }}
          </a>
        </div>
        <div class="contact-detail">
          <div class="label">{{ t("contact.phone") }}</div>
          <a
            :href="`tel:${contact.phone.replace(/\s/g, '')}`"
            class="fr row-link contact-link"
          >
            {{ contact.phone }}
          </a>
        </div>
        <a :href="cvUrl" download class="button button-primary">{{
          t("cta.downloadCV")
        }}</a>
      </div>
      <div>
        <div class="label elsewhere-label">{{ t("contact.elsewhere") }}</div>
        <a
          v-for="social in socials"
          :key="social.link"
          :href="social.link"
          target="_blank"
          rel="noopener"
          class="row-link social-link"
        >
          <span>{{ social.label }}</span>
          <span class="arrow">→</span>
        </a>
      </div>
    </Container>
  </div>
</template>
