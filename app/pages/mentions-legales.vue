<script setup lang="ts">
// Mentions légales (LCEN art. 6-III) : éditeur, hébergeur, contact, données personnelles.
const { locale } = useI18n();
const fr = computed(() => locale.value === "fr");

const company = {
  name: "Franck Lebas",
  form: { fr: "Entrepreneur individuel (micro-entreprise)", en: "Sole trader (French micro-entreprise)" },
  siren: "510 919 970",
  siret: "510 919 970 00069",
  ape: { fr: "62.01Z — Programmation informatique", en: "62.01Z — Computer programming" },
  vat: {
    fr: "TVA non applicable, art. 293 B du CGI",
    en: "VAT not applicable, art. 293 B of the French Tax Code",
  },
  city: { fr: "Marseille, France (adresse complète communiquée sur demande)", en: "Marseille, France (full address on request)" },
  email: "francklebas@ik.me",
  phone: "+33 7 45 65 51 08",
};

const host = {
  name: "Cloudflare, Inc.",
  address: "101 Townsend Street, San Francisco, CA 94107, USA",
  site: "https://www.cloudflare.com",
};

useHead({
  title: computed(() => (fr.value ? "Mentions légales — Franck Lebas" : "Legal notice — Franck Lebas")),
  meta: [{ name: "robots", content: "noindex" }],
});
</script>

<template>
  <div class="page page-enter">
    <Container tag="header" class="page-header" :max-width="720">
      <div class="eyebrow">{{ fr ? "INFORMATIONS LÉGALES" : "LEGAL" }}</div>
      <h1 class="fr page-title">{{ fr ? "Mentions légales" : "Legal notice" }}</h1>
    </Container>

    <Container tag="section" class="legal" :max-width="720">
      <h2 class="fr legal-title">{{ fr ? "Éditeur du site" : "Site publisher" }}</h2>
      <dl class="legal-list">
        <dt>{{ fr ? "Nom" : "Name" }}</dt>
        <dd>{{ company.name }}</dd>
        <dt>{{ fr ? "Forme juridique" : "Legal form" }}</dt>
        <dd>{{ fr ? company.form.fr : company.form.en }}</dd>
        <dt>SIREN</dt>
        <dd>{{ company.siren }}</dd>
        <dt>SIRET</dt>
        <dd>{{ company.siret }}</dd>
        <dt>{{ fr ? "Code APE" : "APE code" }}</dt>
        <dd>{{ fr ? company.ape.fr : company.ape.en }}</dd>
        <dt>{{ fr ? "TVA" : "VAT" }}</dt>
        <dd>{{ fr ? company.vat.fr : company.vat.en }}</dd>
        <dt>{{ fr ? "Siège" : "Registered office" }}</dt>
        <dd>{{ fr ? company.city.fr : company.city.en }}</dd>
        <dt>{{ fr ? "Contact" : "Contact" }}</dt>
        <dd>
          <a :href="`mailto:${company.email}`">{{ company.email }}</a> ·
          <a :href="`tel:${company.phone.replace(/\s/g, '')}`">{{ company.phone }}</a>
        </dd>
        <dt>{{ fr ? "Directeur de la publication" : "Publishing director" }}</dt>
        <dd>{{ company.name }}</dd>
      </dl>

      <h2 class="fr legal-title">{{ fr ? "Hébergement" : "Hosting" }}</h2>
      <p class="body-copy">
        {{ host.name }}, {{ host.address }} —
        <a :href="host.site" target="_blank" rel="noopener">{{ host.site }}</a>
      </p>

      <h2 class="fr legal-title">{{ fr ? "Données personnelles" : "Personal data" }}</h2>
      <p class="body-copy">
        {{
          fr
            ? "Ce site ne dépose aucun cookie de suivi et n'utilise aucun outil de mesure d'audience. Les seules données traitées sont celles que vous transmettez volontairement par e-mail ou par téléphone ; elles servent uniquement à répondre à votre demande et à exécuter la prestation, et sont conservées le temps de la relation commerciale puis des obligations comptables. Vous pouvez demander leur accès, rectification ou suppression à l'adresse ci-dessus."
            : "This site sets no tracking cookies and uses no analytics. The only data processed is what you send voluntarily by e-mail or phone; it is used solely to answer your request and deliver the service, and kept for the duration of the business relationship and legal accounting obligations. You may request access, correction or deletion at the address above."
        }}
      </p>

      <h2 class="fr legal-title">{{ fr ? "Propriété intellectuelle" : "Intellectual property" }}</h2>
      <p class="body-copy">
        {{
          fr
            ? "Les contenus de ce site (textes, images, code) sont la propriété de Franck Lebas, sauf mention contraire. Toute reproduction sans autorisation écrite est interdite."
            : "The contents of this site (texts, images, code) are the property of Franck Lebas unless stated otherwise. Reproduction without written permission is prohibited."
        }}
      </p>
    </Container>
  </div>
</template>

<style scoped>
.legal {
  padding-top: 48px;
  padding-bottom: 140px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.legal-title {
  margin: 24px 0 4px;
  font-size: 24px;
  font-weight: 500;
}
.legal-list {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 8px 16px;
  margin: 0;
}
.legal-list dt {
  color: var(--color-muted);
  font-size: 14px;
}
.legal-list dd {
  margin: 0;
}
.legal a {
  color: var(--color-dominant-ink);
}
@media (max-width: 600px) {
  .legal-list {
    grid-template-columns: 1fr;
  }
  .legal-list dd {
    margin-bottom: 8px;
  }
}
</style>
