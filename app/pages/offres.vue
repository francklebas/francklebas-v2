<script setup lang="ts">
import { offers, offerPage, offerLinks } from "~/data/offers";

const { locale, t } = useI18n();
const L = (field: { en: string; fr: string; sv?: string }) => pickLocale(field, locale.value);
const lang = computed(() => (locale.value === "fr" ? "fr" : "en"));

function mailto(subject: string, body: string) {
  return `mailto:${offerLinks.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// CTA d'une offre : lien Stripe si renseigné, sinon e-mail de commande pré-rempli.
function offerHref(key: string, name: string) {
  const stripe = (offerLinks.stripe as Record<string, string | null>)[key];
  if (stripe) return stripe;
  if (offerLinks.booking && (key === "takeover" || key === "mvp")) return offerLinks.booking;
  const subject = `${L(offerPage.emailSubject)} — ${name}`;
  return mailto(subject, L(offerPage.emailBody));
}

const contactHref = computed(() => mailto(L(offerPage.emailSubject), L(offerPage.emailBody)));

useHead({
  title: computed(() =>
    locale.value === "fr"
      ? "Sauvetage d'app IA (Lovable, Bolt, v0) — Franck Lebas"
      : "AI-built app rescue (Lovable, Bolt, v0) — Franck Lebas",
  ),
  meta: [
    {
      name: "description",
      content: computed(() => L(offerPage.subtitle)),
    },
  ],
});
</script>

<template>
  <div class="page page-enter">
    <Container tag="header" class="page-header offers-header" :max-width="840">
      <div class="eyebrow">{{ L(offerPage.eyebrow) }}</div>
      <h1 class="fr page-title offers-title">{{ L(offerPage.title) }}</h1>
      <p class="body-copy offers-subtitle">{{ L(offerPage.subtitle) }}</p>
      <div class="actions">
        <a :href="contactHref" class="button button-primary">{{ L(offerPage.emailCta) }}</a>
        <a
          v-if="offerLinks.booking"
          :href="offerLinks.booking"
          target="_blank"
          rel="noopener"
          class="button button-secondary"
          >{{ L(offerPage.bookCta) }}</a
        >
      </div>
    </Container>

    <Container tag="section" class="signs" :max-width="840">
      <h2 class="fr section-title">{{ L(offerPage.signsTitle) }}</h2>
      <ul class="signs-list">
        <li v-for="s in offerPage.signs[lang]" :key="s" class="body-copy">{{ s }}</li>
      </ul>
    </Container>

    <Container tag="section" class="offers-grid" :max-width="1180">
      <article
        v-for="o in offers"
        :key="o.key"
        class="card offer-card"
        :class="{ 'is-featured': o.featured }"
      >
        <div class="card-body offer-body">
          <div class="project-heading">
            <span class="project-number">{{ o.num }}</span>
            <h3 class="fr offer-name">{{ L(o.name) }}</h3>
          </div>
          <div class="offer-price">{{ L(o.price) }}</div>
          <div class="offer-delay">{{ L(o.delay) }}</div>
          <p class="body-copy offer-tagline">{{ L(o.tagline) }}</p>
          <ul class="offer-includes">
            <li v-for="line in o.includes[lang]" :key="line">{{ line }}</li>
          </ul>
          <a
            :href="offerHref(o.key, L(o.name))"
            :target="offerHref(o.key, L(o.name)).startsWith('http') ? '_blank' : undefined"
            rel="noopener"
            class="button offer-cta"
            :class="o.featured ? 'button-primary' : 'button-secondary'"
            >{{ L(o.cta) }} →</a
          >
        </div>
      </article>
    </Container>

    <Container tag="section" class="process" :max-width="840">
      <h2 class="fr section-title">{{ L(offerPage.processTitle) }}</h2>
      <ol class="process-list">
        <li v-for="(step, i) in offerPage.process[lang]" :key="step.t" class="process-step">
          <span class="project-number">0{{ i + 1 }}</span>
          <div>
            <div class="process-title">{{ step.t }}</div>
            <p class="body-copy process-desc">{{ step.d }}</p>
          </div>
        </li>
      </ol>
    </Container>

    <Container tag="section" class="why" :max-width="840">
      <h2 class="fr section-title">{{ L(offerPage.whyTitle) }}</h2>
      <p class="body-copy">{{ L(offerPage.why) }}</p>
    </Container>

    <Container tag="section" class="faq" :max-width="840">
      <h2 class="fr section-title">{{ L(offerPage.faqTitle) }}</h2>
      <details v-for="item in offerPage.faq[lang]" :key="item.q" class="faq-item">
        <summary class="faq-q">{{ item.q }}</summary>
        <p class="body-copy faq-a">{{ item.a }}</p>
      </details>
    </Container>

    <Container tag="section" class="final" :max-width="840">
      <h2 class="fr section-title">{{ L(offerPage.finalTitle) }}</h2>
      <p class="body-copy">{{ L(offerPage.finalBody) }}</p>
      <div class="actions final-actions">
        <a :href="contactHref" class="button button-primary">{{ L(offerPage.emailCta) }}</a>
        <a
          v-if="offerLinks.booking"
          :href="offerLinks.booking"
          target="_blank"
          rel="noopener"
          class="button button-secondary"
          >{{ L(offerPage.bookCta) }}</a
        >
        <NuxtLink to="/contact" class="button button-secondary">{{ t("nav.contact") }}</NuxtLink>
      </div>
    </Container>
  </div>
</template>

<style scoped>
.offers-header {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.offers-title {
  max-width: 820px;
}
.offers-subtitle {
  max-width: 680px;
  font-size: 18px;
}
.section-title {
  margin: 0 0 20px;
  font-size: 28px;
  font-weight: 500;
}
.signs,
.process,
.why,
.faq,
.final {
  padding-top: 72px;
}
.signs-list {
  margin: 0;
  padding-left: 22px;
  display: grid;
  gap: 10px;
}
.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  padding-top: 72px;
}
.offer-card {
  display: flex;
}
.offer-card.is-featured {
  border-color: var(--color-dominant);
  box-shadow: inset 0 3px 0 var(--color-dominant);
}
.offer-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.offer-name {
  margin: 0;
  font-size: 22px;
  font-weight: 500;
}
.offer-price {
  font-size: 26px;
  font-weight: 600;
  color: var(--color-dominant-ink);
}
.offer-delay {
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: var(--color-muted);
}
.offer-tagline {
  margin: 6px 0;
}
.offer-includes {
  margin: 0 0 12px;
  padding-left: 18px;
  display: grid;
  gap: 8px;
  font-size: 15px;
  line-height: 1.5;
  color: var(--color-muted);
  flex: 1;
}
.offer-cta {
  align-self: start;
  margin-top: auto;
}
.process-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 22px;
}
.process-step {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 12px;
  align-items: start;
}
.process-title {
  font-weight: 600;
  margin-bottom: 4px;
}
.process-desc {
  margin: 0;
}
.faq-item {
  border-top: 1px solid rgba(var(--line-rgb), 0.2);
  padding: 16px 0;
}
.faq-item:last-child {
  border-bottom: 1px solid rgba(var(--line-rgb), 0.2);
}
.faq-q {
  cursor: pointer;
  font-weight: 600;
  font-size: 17px;
}
.faq-a {
  margin: 12px 0 0;
}
.final {
  padding-bottom: 140px;
}
.final-actions {
  margin-top: 24px;
}
</style>
