export type Localized = { en: string; fr: string };

export function pickLocale(field: Localized, locale: string) {
  return field[locale as keyof Localized];
}
