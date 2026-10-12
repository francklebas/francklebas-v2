// Palette dominante de chaque page (définies dans assets/css/palettes.scss).
// Indexé par le premier segment d'URL : les sous-pages (ex. /projects/:slug)
// héritent de la palette de leur page parente.
export const pagePalettes = {
  "": "p3",
  projects: "p4",
  experience: "p5",
  skills: "p2",
  contact: "p1",
} as const;

export type Palette = (typeof pagePalettes)[keyof typeof pagePalettes];

export function paletteFor(path: string): Palette {
  const section = path.split("/")[1] ?? "";
  return pagePalettes[section as keyof typeof pagePalettes] ?? pagePalettes[""];
}
