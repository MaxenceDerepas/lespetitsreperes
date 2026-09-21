import { site } from './site';

/**
 * Petites règles de longueur pour les titres et descriptions.
 *
 * Google tronque un titre au-delà d'environ 60 caractères et une description
 * au-delà d'environ 158. Une description trop courte (moins de 120) est
 * souvent ignorée au profit d'un extrait de page choisi par Google.
 *
 * Ces fonctions servent surtout aux pages générées (produits, articles) dont
 * on ne maîtrise pas la longueur à l'avance : elles garantissent qu'aucune
 * page ne part en ligne avec un titre coupé au milieu d'un mot.
 */

export const TITLE_MAX = 60;
export const DESCRIPTION_MIN = 120;
export const DESCRIPTION_MAX = 158;

const SUFFIX = ` — ${site.name}`;

/** Coupe sur un mot entier et ajoute une ellipse. */
function truncate(value: string, max: number): string {
  if (value.length <= max) return value;
  const cut = value.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:·—-]+$/, '')}…`;
}

/**
 * Ajoute le nom de la marque au titre, mais seulement s'il reste de la place.
 * Le nom de la marque est déjà visible dans l'URL et dans le fil d'Ariane :
 * mieux vaut un titre entier sans suffixe qu'un titre coupé avec.
 */
export function pageTitle(title: string): string {
  const trimmed = title.trim();
  if (trimmed.length + SUFFIX.length <= TITLE_MAX) return trimmed + SUFFIX;
  return truncate(trimmed, TITLE_MAX);
}

/**
 * Assemble une description dans la bonne fenêtre de longueur : on part du
 * texte principal, on ajoute les compléments tant qu'ils tiennent, et on
 * tronque proprement si le résultat dépasse.
 */
export function pageDescription(lead: string, ...extras: string[]): string {
  let out = lead.trim().replace(/\s+/g, ' ');
  for (const extra of extras) {
    const next = `${out} ${extra.trim()}`.replace(/\s+/g, ' ');
    if (next.length > DESCRIPTION_MAX) break;
    out = next;
  }
  return truncate(out, DESCRIPTION_MAX);
}

/**
 * Date de validité du prix exigée par Google pour les résultats enrichis
 * produit. Un an glissant : le prix reste valable tant qu'il ne change pas.
 */
export function priceValidUntil(): string {
  return `${new Date().getFullYear() + 1}-12-31`;
}
