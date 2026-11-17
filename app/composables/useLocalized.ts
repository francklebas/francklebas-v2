export type Localized = { en: string; fr: string; sv?: string };

// Les contenus YAML n'existent pas tous en suédois : repli sur l'anglais.
export function pickLocale(field: Localized, locale: string) {
  return field[locale as keyof Localized] ?? field.en;
}
